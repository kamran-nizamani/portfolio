// Hero background scene (wireframe knot + icosahedron + particle field).
// Kept in its own module so three.js is dynamically imported and tree-shaken (named imports only).
import {
  Scene, PerspectiveCamera, WebGLRenderer, Mesh, Points,
  TorusKnotGeometry, IcosahedronGeometry, BufferGeometry, BufferAttribute,
  MeshBasicMaterial, ShaderMaterial, AdditiveBlending,
} from 'three'

const FRAME_MS = 1000 / 30 // ambient motion is slow: 30fps looks identical and halves the GPU work

export function createHeroScene(canvas, { reduceMotion = false } = {}) {
  // Quality tier: weaker / smaller devices get a lighter scene.
  const cores = navigator.hardwareConcurrency || 4
  const mem = navigator.deviceMemory || 8
  const lite = cores <= 4 || mem <= 4 || window.innerWidth < 1100

  const dprCap = lite ? 1 : 1.5
  let ratio = Math.min(window.devicePixelRatio || 1, dprCap)
  const MIN_RATIO = 0.6

  const scene = new Scene()
  const camera = new PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.position.z = 5

  // No MSAA / depth / stencil: the scene is faint additive wireframe + points, so they cost a lot and add nothing.
  const renderer = new WebGLRenderer({
    canvas, alpha: true, antialias: false, depth: false, stencil: false, powerPreference: 'low-power',
  })
  renderer.setPixelRatio(ratio)
  renderer.setSize(window.innerWidth, window.innerHeight)

  const torus = new Mesh(
    new TorusKnotGeometry(1.5, 0.4, lite ? 90 : 130, lite ? 10 : 14, 2, 3),
    new MeshBasicMaterial({ color: 0x06B6D4, wireframe: true, transparent: true, opacity: 0.09 })
  )
  scene.add(torus)

  const ico = new Mesh(
    new IcosahedronGeometry(0.8, 1),
    new MeshBasicMaterial({ color: 0x818cf8, wireframe: true, transparent: true, opacity: 0.07 })
  )
  scene.add(ico)

  const N = lite ? 500 : 900
  const pos = new Float32Array(N * 3)
  const col = new Float32Array(N * 3)
  const sz = new Float32Array(N)
  for (let i = 0; i < N; i++) {
    const i3 = i * 3
    const r = 3 + Math.random() * 9
    const t = Math.random() * Math.PI * 2
    const p = Math.acos(2 * Math.random() - 1)
    pos[i3] = r * Math.sin(p) * Math.cos(t)
    pos[i3 + 1] = r * Math.sin(p) * Math.sin(t)
    pos[i3 + 2] = r * Math.cos(p)
    if (Math.random() > 0.72) { col[i3] = 0.02; col[i3 + 1] = 0.71; col[i3 + 2] = 0.83 }
    else { col[i3] = 0.31; col[i3 + 1] = 0.55; col[i3 + 2] = 0.97 }
    sz[i] = Math.random() * 1.2 + 0.2
  }
  const geo = new BufferGeometry()
  geo.setAttribute('position', new BufferAttribute(pos, 3))
  geo.setAttribute('aColor', new BufferAttribute(col, 3))
  geo.setAttribute('size', new BufferAttribute(sz, 1))
  const mat = new ShaderMaterial({
    vertexShader: `
      attribute float size; attribute vec3 aColor; varying vec3 vC;
      void main(){vC=aColor;vec4 mv=modelViewMatrix*vec4(position,1.);gl_PointSize=size*(140./-mv.z);gl_Position=projectionMatrix*mv;}
    `,
    fragmentShader: `
      varying vec3 vC;
      void main(){float d=length(gl_PointCoord-vec2(.5));if(d>.5)discard;gl_FragColor=vec4(vC,(1.-smoothstep(0.,.5,d))*.45);}
    `,
    transparent: true, depthWrite: false, depthTest: false, blending: AdditiveBlending,
  })
  scene.add(new Points(geo, mat))

  let mx = 0, my = 0, tx = 0, ty = 0
  const onMove = (e) => { tx = (e.clientX / window.innerWidth - 0.5) * 2; ty = (e.clientY / window.innerHeight - 0.5) * 2 }
  window.addEventListener('mousemove', onMove, { passive: true })

  const draw = () => {
    mx += (tx - mx) * 0.08; my += (ty - my) * 0.08
    const t = performance.now() * 0.001
    torus.rotation.x = t * 0.15 + my * 0.3
    torus.rotation.y = t * 0.2 + mx * 0.3
    torus.rotation.z = t * 0.05
    ico.rotation.x = -t * 0.3 + my * 0.5
    ico.rotation.y = t * 0.4 + mx * 0.5
    renderer.render(scene, camera)
  }

  // Frame loop: 30fps cap + adaptive resolution (drops pixel ratio if frames run long).
  let raf = 0
  let visible = true
  let last = 0
  let slow = 0
  const loop = (now) => {
    raf = requestAnimationFrame(loop)
    const dt = now - last
    if (dt < FRAME_MS - 2) return
    last = now
    const t0 = performance.now()
    draw()
    const cost = performance.now() - t0
    // CPU-side cost of a frame is a cheap proxy; also catch long gaps between frames.
    if (cost > 12 || dt > FRAME_MS * 1.8) slow++
    else slow = Math.max(0, slow - 1)
    if (slow > 20 && ratio > MIN_RATIO) {
      slow = 0
      ratio = Math.max(MIN_RATIO, ratio * 0.8)
      renderer.setPixelRatio(ratio)
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
  }
  const start = () => { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop) }
  const stop = () => { cancelAnimationFrame(raf); raf = 0 }

  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; visible ? start() : stop() })
  io.observe(canvas)
  const onVis = () => (document.hidden ? stop() : start())
  document.addEventListener('visibilitychange', onVis)
  if (reduceMotion) draw() // one static frame, no loop
  else start()

  let rz = 0
  const onResize = () => {
    clearTimeout(rz)
    rz = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (reduceMotion) draw()
    }, 150)
  }
  window.addEventListener('resize', onResize)

  return () => {
    stop()
    clearTimeout(rz)
    io.disconnect()
    document.removeEventListener('visibilitychange', onVis)
    window.removeEventListener('mousemove', onMove)
    window.removeEventListener('resize', onResize)
    torus.geometry.dispose(); torus.material.dispose()
    ico.geometry.dispose(); ico.material.dispose()
    geo.dispose(); mat.dispose()
    renderer.dispose()
  }
}
