import { motion, useAnimationControls, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import './CarouselSwipeIndicator.scss';
import type { CarouselSwipeIndicatorProps } from './carouselSwipeIndicatorTypes';
import { FaArrowLeft } from 'react-icons/fa';
import { easeInOutQuint, easeOutCirc, easeOutExpo } from 'js-easing-functions';
import type { MotionStyle } from 'motion';

export default function CarouselSwipeIndicator({/*  direction, */ swipePercent }: CarouselSwipeIndicatorProps) {
  const latchedSwipePercent = useMotionValue(0);

  const animatorAnimationControls = useAnimationControls();
  const iconAnimationControls = useAnimationControls();

  const animatorStyle: MotionStyle = {
    x: useTransform(latchedSwipePercent, [0, 1], ['-100%', '0%'], { ease: (t) => easeOutCirc(t, 0, 1, 1) })
  };

  const iconStyle: MotionStyle = {
    rotate: useTransform(latchedSwipePercent, [0, 1], [360, 0], { ease: (t) => easeOutExpo(t, 0, 1, 1) })
  }

  useMotionValueEvent(swipePercent, 'change', latestValue => {
    if (latestValue !== null) {
      animatorAnimationControls.stop();

      latchedSwipePercent.set(latestValue);
      return;
    };

    animatorAnimationControls.start({
      x: '-100%',
      transition: {
        duration: 1,
        ease: (t) => easeInOutQuint(t, 0, 1, 1)
      }
    });

    iconAnimationControls.start({
      rotate: ['-45deg', '0deg']
    })
  });

  return (
    <div 
      className="carousel__swipe-indicator"
      // style={{
      //   transform: direction === -1 ? 'rotateZ(180deg)' : undefined
      // }}
    >
      <motion.div
        animate={animatorAnimationControls}
        style={animatorStyle}
        className="carousel__swipe-indicator-inner"
      >
        <motion.span
          animate={iconAnimationControls}
          style={iconStyle}
        >
          <FaArrowLeft
            style={{
              color: 'white',
              width: '10em',
              height: '10em',
              stroke: '#000000',
              strokeWidth: '10px',
              margin: '10px'
            }}
          />
        </motion.span>
      </motion.div>
    </div>
  );
}