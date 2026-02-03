import type { CarouselAnimationContext, CarouselVariants } from '@src/components';
import './Hello.scss';
import { motion } from 'framer-motion';
import { easeInQuint, easeOutQuint } from 'js-easing-functions';

const testVariants: CarouselVariants = {
  enter: {
    y: "100vh"
  },
  center: animationContext => ({
    rotateZ: animationContext.direction === 1 ? "90deg" : "45deg",
    y: "0vh",
    transition: { type: "tween", ease: (t) => easeOutQuint(t, 0, 1, 1), duration: 1 }
  }),
  exit: {
    y: "100vh",
    transition: { type: "tween", ease: (t) => easeInQuint(t, 0, 1, 1), duration: 1 }
  }
}

export default function Hello({ animationContext }: { animationContext: CarouselAnimationContext }) {
  return (
    <motion.div variants={testVariants} custom={animationContext}>
      <h1 style={{ textAlign: "center" }}>Hello World</h1>
    </motion.div>
  )
}