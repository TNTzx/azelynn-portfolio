import { useCursorPosition } from '@src/hooks/motionMouse';
import Back from './layers/back/Back';
import Front from './layers/front/Front';
import Mid from './layers/mid/Mid';
import './SlideNameCard.scss';
import { motion, useSpring, useTransform, type MotionStyle, type SpringOptions } from 'motion/react';
import Instructions from '@src/components/instructions/Instructions';
import { useViewport } from '@src/hooks';

export default function SlideNameCard() {
  const motionMouse = useCursorPosition();
  const viewport = useViewport();

  const springConfig: SpringOptions = { damping: 25, stiffness: 150 };
  const smooth = {
    x: useSpring(motionMouse.x, springConfig),
    y: useSpring(motionMouse.y, springConfig)
  }

  const style: MotionStyle = {
    rotateX: useTransform(smooth.y, [0, viewport.height], [10, -10]),
    rotateY: useTransform(smooth.x, [0, viewport.width], [-10, 10])
  }

  return (
    <div className="slide-name-card">
      <div className="slide-name-card__layer slide-name-card__layer--instructions">
        <Instructions 
          desktop='Move your mouse to change your perspective.'
          tablet='Move your mouse / tap to change your perspective.'
          mobile='Tap to change your perspective.'
        />
      </div>
      <div className="slide-name-card__layer slide-name-card__layer--content">
        <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--front">
          <Front />
        </motion.div>

        <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--mid">
          <Mid />
        </motion.div>

        <motion.div style={style} className="slide-name-card__layer slide-name-card__layer--back">
          <Back />
        </motion.div>
      </div>
    </div>
  )
}