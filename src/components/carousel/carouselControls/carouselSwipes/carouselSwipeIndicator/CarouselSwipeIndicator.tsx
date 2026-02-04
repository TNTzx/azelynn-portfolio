import { motion, useAnimationControls, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import './CarouselSwipeIndicator.scss';
import type { CarouselSwipeIndicatorProps } from './carouselSwipeIndicatorTypes';
import { FaArrowLeft } from 'react-icons/fa';
import { easeInOutQuint, easeOutCirc, easeOutExpo } from 'js-easing-functions';
import type { MotionStyle } from 'motion';

export default function CarouselSwipeIndicator({ direction, swipePercent }: CarouselSwipeIndicatorProps) {
  const animatorAnimationControls = useAnimationControls();
  const iconAnimationControls = useAnimationControls();

  const latchedSwipePercent = useMotionValue(0);

  useMotionValueEvent(swipePercent, 'change', latestValue => {
    if (latestValue !== null) {
      animatorAnimationControls.stop();

      latchedSwipePercent.set(latestValue);
      return;
    };

    animatorAnimationControls.start({
      x: `${direction === -1 ? '-' : ''}100%`,
      transition: {
        duration: 1,
        ease: (t) => easeInOutQuint(t, 0, 1, 1)
      }
    });

    iconAnimationControls.start({
      rotate: [`${direction === -1 ? '' : '-'}45deg`, '0deg']
    })
  });


  const animatorStyle: MotionStyle = {
    alignItems: direction === -1 ? 'end' : 'start',
    x: useTransform(
      latchedSwipePercent,
      [0, 1],
      [`${direction === -1 ? '-' : ''}100%`, '0%'],
      { ease: (t) => easeOutCirc(t, 0, 1, 1) }
    )
  };

  const iconStyle: MotionStyle = {
    rotate: useTransform(
      latchedSwipePercent,
      [0, 0.75],
      [-360 * direction, 0],
      { ease: (t) => easeOutExpo(t, 0, 1, 1) }
    )
  }

  return (
    <div 
      className="carousel__swipe-indicator"
      style={{
        alignItems: direction === -1 ? 'start' : 'end'
      }}
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
              margin: '10px',
              rotate: direction === 1 ? '180deg' : undefined
            }}
          />
        </motion.span>
      </motion.div>
    </div>
  );
}