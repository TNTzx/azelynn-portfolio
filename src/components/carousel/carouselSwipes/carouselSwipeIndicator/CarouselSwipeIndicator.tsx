import { motion, useAnimationControls, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import './CarouselSwipeIndicator.scss';
import type { CarouselSwipeIndicatorProps } from './carouselSwipeIndicatorTypes';
import { FaArrowLeft } from 'react-icons/fa';
import { easeInOutQuint } from 'js-easing-functions';

export default function CarouselSwipeIndicator({/*  direction, */ swipePercent }: CarouselSwipeIndicatorProps) {
  const latchedSwipePercent = useMotionValue(0);

  const animationControls = useAnimationControls();

  const style = {
    x: useTransform(latchedSwipePercent, [0, 1], ['-100%', '0%'])
  };

  useMotionValueEvent(swipePercent, 'change', latestValue => {
    if (latestValue !== null) {
      animationControls.stop();

      latchedSwipePercent.set(latestValue);
      return;
    };

    animationControls.start({
      x: '-100%',
      transition: {
        duration: 1,
        ease: (t) => easeInOutQuint(t, 0, 1, 1)
      }
    });
  });

  return (
    <div 
      className="carousel__swipe-indicator"
      // style={{
      //   transform: direction === -1 ? 'rotateZ(180deg)' : undefined
      // }}
    >
      <motion.div
        animate={animationControls}
        style={style}
        className="carousel__swipe-indicator-animator"
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
      </motion.div>
    </div>
  );
}