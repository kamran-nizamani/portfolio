import { useScroll, motion } from 'framer-motion'

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] origin-left"
      style={{
        height: '2px',
        scaleX: scrollYProgress,
        background: 'linear-gradient(to right, #06B6D4, #818cf8)',
      }}
    />
  )
}
