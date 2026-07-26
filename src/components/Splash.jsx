import { motion } from 'framer-motion'

function Ring({ size, delay, color }) {
  return (
    <motion.span
      className="absolute rounded-[6px] border-2"
      style={{
        width: size,
        height: size,
        borderColor: color,
        top: '50%',
        left: '50%',
        marginTop: -size / 2,
        marginLeft: -size / 2,
      }}
      initial={{ opacity: 0, scale: 0.4, rotate: 45 }}
      animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1, 1.15], rotate: 45 }}
      transition={{
        duration: 2.2,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    />
  )
}

export default function Splash({ visible }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-zamin-teal"
      initial={{ opacity: 1 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ pointerEvents: visible ? 'auto' : 'none' }}
      aria-hidden={!visible}
    >
      <div className="relative flex h-40 w-40 items-center justify-center">
        <Ring size={70} delay={0} color="#C89B3C" />
        <Ring size={110} delay={0.4} color="#E4C374" />
        <Ring size={150} delay={0.8} color="#C89B3C" />
        <motion.span
          className="relative h-3.5 w-3.5 rotate-45 bg-zamin-gold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5, ease: 'easeOut' }}
        className="mt-8 font-display text-5xl font-semibold tracking-wide text-zamin-cream"
      >
        Zamin
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.85, ease: 'easeOut' }}
        className="mt-2 text-xs font-medium uppercase tracking-[0.35em] text-zamin-goldLight"
      >
        Milliylik va Zamonaviylik
      </motion.p>

      <motion.div
        initial={{ opacity: 0, width: 0 }}
        animate={{ opacity: 1, width: 64 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="ikat-strip mt-7 rounded-full"
      />
    </motion.div>
  )
}
