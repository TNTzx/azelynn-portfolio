import { useCursorPosition } from '@src/hooks/motionMouse';
import Back from './layers/back/Back';
import Front from './layers/front/Front';
import Mid from './layers/mid/Mid';
import './SlideNameCard.scss';
import { motion, useSpring, useTransform, type MotionStyle, type SpringOptions } from 'motion/react';

export default function SlideNameCard() {
  const motionMouse = useCursorPosition();

  const springConfig: SpringOptions = { damping: 25, stiffness: 150 };
  const smooth = {
    x: useSpring(motionMouse.x, springConfig),
    y: useSpring(motionMouse.y, springConfig)
  }

  const style: MotionStyle = {
    rotateX: useTransform(smooth.y, [0, window.innerHeight], [10, -10]),
    rotateY: useTransform(smooth.x, [0, window.innerWidth], [-10, 10])
  }

  return (
    <motion.div
      className="slide-name-card"
    >
      <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--front">
        <Front />
      </motion.div>

      <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--mid">
        <Mid />
      </motion.div>

      <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--back">
        <Back />
      </motion.div>
    </motion.div>
  )
}