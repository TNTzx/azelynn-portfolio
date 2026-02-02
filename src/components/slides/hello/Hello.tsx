import type { CarouselVariants } from '@src/components';
import './Hello.css';
import { motion } from 'framer-motion';
import { easeOutQuint } from 'js-easing-functions';

const testVariants: CarouselVariants = {
  enter: {
    y: "100vh"
  },
  center: {
    y: "0vh",
    transition: { type: "tween", ease: (t) => easeOutQuint(t, 0, 1, 1), duration: 2 }
  },
  exit: {
    y: "-100vh"
  }
}

export default function Hello() {
  return (
    <motion.div variants={testVariants}>
      <h1>Hello World</h1>
    </motion.div>
  )
}