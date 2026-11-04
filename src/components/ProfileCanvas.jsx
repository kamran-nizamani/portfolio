import { useEffect, useRef } from 'react'

/* 3D profile photo (2.5D depth parallax) with eyes that follow the cursor.
   - /profile.png        : the cut-out photo (unchanged)
   - /profile-depth.png  : depth map (near = bright), built from the photo's silhouette + a head model
   Parts of the photo nearer to the camera shift more than far parts as the pointer moves, the
   lighting leans toward the pointer, and the eyes are shifted inside their lids.
   Pure WebGL, no extra dependency. If anything fails, onFail() lets the caller show the plain <img>. */

const VERT = `
attribute vec2 p;
varying vec2 v;
void main(){ v = vec2(p.x*0.5+0.5, 0.5-p.y*0.5); gl_Position = vec4(p,0.,1.); }`

// Image is 408x612; the whole portrait is shown, fading out toward the bottom and sides.
const FRAG = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D img;
uniform sampler2D dep;
uniform vec2 gaze;     // -1..1, where the pointer is relative to the face
varying vec2 v;
const vec2 SZ = vec2(408., 612.);
float eyeMask(vec2 px, vec2 c){
  vec2 q = (px - c) / vec2(12.5, 4.6);
  return 1.0 - smoothstep(0.55, 1.0, dot(q, q));
}
void main(){
  vec2 uv = v;
  float d = texture2D(dep, uv).r;
  vec2 st = uv - gaze * (d - 0.3) * vec2(0.016, 0.011);       // depth parallax (near parts move more)
  vec2 px = st * SZ;
  float m = max(eyeMask(px, vec2(167.5, 188.)), eyeMask(px, vec2(239.7, 188.)));
  st -= m * gaze * vec2(3.4, 1.3) / SZ;                        // irises/eyeballs look toward the pointer
  vec4 c = texture2D(img, st);
  float dx = texture2D(dep, uv + vec2(2./408., 0.)).r - texture2D(dep, uv - vec2(2./408., 0.)).r;
  float dy = texture2D(dep, uv + vec2(0., 2./612.)).r - texture2D(dep, uv - vec2(0., 2./612.)).r;
  float shade = dot(vec2(dx, dy), gaze) * 0.9;                 // subtle light leaning toward the pointer
  c.rgb *= 1.0 + shade;
  // soft fade: bottom (hides the rough cut-out edge) and the left/right edges where the shoulders end
  float f = smoothstep(0.94, 0.68, v.y) * smoothstep(0.0, 0.07, v.x) * smoothstep(1.0, 0.93, v.x);
  gl_FragColor = c * f;
}`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || 'shader')
  return s
}

function loadImage(src) {
  return new Promise((res, rej) => {
    const i = new Image()
    i.onload = () => res(i)
    i.onerror = rej
    i.src = src
  })
}

export default function ProfileCanvas({ onReady, onFail }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    let gl
    try {
      gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false })
      if (!gl) throw new Error('no webgl')
    } catch { onFail?.(); return }

    let raf = 0
    let dead = false
    const target = { x: 0, y: 0 }
    const cur = { x: 0, y: 0 }
    let gazeLoc
    let ready = false

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.round(canvas.clientWidth * dpr)
      const h = Math.round(canvas.clientHeight * dpr)
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = () => {
      raf = 0
      cur.x += (target.x - cur.x) * 0.14
      cur.y += (target.y - cur.y) * 0.14
      gl.uniform2f(gazeLoc, cur.x, cur.y)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      // keep animating only while the eyes are still catching up
      if (Math.abs(target.x - cur.x) > 0.002 || Math.abs(target.y - cur.y) > 0.002) raf = requestAnimationFrame(draw)
    }
    const kick = () => { if (ready && !raf && !dead) raf = requestAnimationFrame(draw) }

    // Pointer anywhere on the page steers the eyes (mouse, pen, and touch while a finger is down).
    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.45
      const clamp = (n) => Math.max(-1, Math.min(1, n))
      target.x = clamp((e.clientX - cx) / (Math.max(window.innerWidth, 500) * 0.35))
      target.y = clamp((e.clientY - cy) / (Math.max(window.innerHeight, 500) * 0.35))
      kick()
    }
    const onLeave = () => { target.x = 0; target.y = 0; kick() }
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    window.addEventListener('blur', onLeave)
    const onResize = () => { if (ready) { resize(); draw() } }
    window.addEventListener('resize', onResize)

    const onLost = (e) => { e.preventDefault(); dead = true; cancelAnimationFrame(raf); onFail?.() }
    canvas.addEventListener('webglcontextlost', onLost)

    Promise.all([loadImage('/profile.png'), loadImage('/profile-depth.png')])
      .then(([imgEl, depEl]) => {
        if (dead) return
        const prog = gl.createProgram()
        gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT))
        gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(prog)
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link')
        gl.useProgram(prog)

        const buf = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buf)
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
        const loc = gl.getAttribLocation(prog, 'p')
        gl.enableVertexAttribArray(loc)
        gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

        const tex = (unit, el, premult) => {
          const t = gl.createTexture()
          gl.activeTexture(gl.TEXTURE0 + unit)
          gl.bindTexture(gl.TEXTURE_2D, t)
          gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, premult)
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, el)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
          gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
          return t
        }
        tex(0, imgEl, true)
        tex(1, depEl, false)
        gl.uniform1i(gl.getUniformLocation(prog, 'img'), 0)
        gl.uniform1i(gl.getUniformLocation(prog, 'dep'), 1)
        gazeLoc = gl.getUniformLocation(prog, 'gaze')

        resize()
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        ready = true
        draw()
        onReady?.()
      })
      .catch(() => { if (!dead) onFail?.() })

    return () => {
      dead = true
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onMove)
      document.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('blur', onLeave)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('webglcontextlost', onLost)
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label="Kamran Khan — AI & Full-Stack Developer"
      className="absolute inset-0 w-full h-full"
      style={{
        // same soft fade at the bottom as the plain <img>
        WebkitMaskImage: 'linear-gradient(to bottom, #000 68%, transparent 94%)',
        maskImage: 'linear-gradient(to bottom, #000 68%, transparent 94%)',
      }}
    />
  )
}
