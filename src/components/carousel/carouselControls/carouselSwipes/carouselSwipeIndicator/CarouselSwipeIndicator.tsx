import { motion, useAnimationControls, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import './CarouselSwipeIndicator.scss';
import type { CarouselSwipeIndicatorProps } from './carouselSwipeIndicatorTypes';
import { FaArrowLeft } from 'react-icons/fa';
import { easeInOutCirc, easeOutCirc, easeOutExpo } from 'js-easing-functions';
import type { MotionStyle } from 'motion';

export default function CarouselSwipeIndicator({ direction, swipePercent }: CarouselSwipeIndicatorProps) {
  const containerAnimationControls = useAnimationControls();
  const flashAnimationControls = useAnimationControls();
  const contentAnimationControls = useAnimationControls();
  const iconAnimationControls = useAnimationControls();

  const latchedSwipePercent = useMotionValue(0);

  useMotionValueEvent(swipePercent, 'change', latestValue => {
    if (latestValue !== null) {
      contentAnimationControls.stop();

      latchedSwipePercent.set(latestValue);
      return;
    };

    flashAnimationControls.start({
      opacity: [1, 0],
      transition: {
        duration: 2
      }
    });

    containerAnimationControls.start(latchedSwipePercent.get() === 0 ? {} : {
      x: '0%',
      width: '70%',
      transition: {
        duration: 0.1,
        ease: (t) => easeOutCirc(t, 0, 1, 1)
      }
    }).then(() => containerAnimationControls.start({
      x: `${direction === -1 ? '-' : ''}100%`,
      width: '50%',
      transition: {
        duration: 0.75,
        ease: (t) => easeInOutCirc(t, 0, 1, 1)
      }
    }));

    iconAnimationControls.start({
      opacity: 1,
      scale: 1,
      rotate: [`${direction === -1 ? '' : '-'}90deg`, '0deg']
    })
  });


  const containerStyle: MotionStyle = {
    x: useTransform(
      latchedSwipePercent,
      [0, 1],
      [`${direction === -1 ? '-' : ''}100%`, '0%'],
      { ease: (t) => easeOutCirc(t, 0, 1, 1) }
    )
  }

  const contentStyle: MotionStyle = {
    alignItems: direction === -1 ? 'end' : 'start',
  };

  const iconStyle: MotionStyle = {
    opacity: useTransform(
      latchedSwipePercent,
      [0, 0.75],
      [0.5, 0.8]
    ),
    scale: useTransform(
      latchedSwipePercent,
      [0, 0.75],
      [0.5, 0.8]
    ),
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
        animate={containerAnimationControls}
        style={containerStyle}
        className="carousel__swipe-indicator-content-container"
      >
        <motion.div
          animate={flashAnimationControls}
          className="carousel__control-bg carousel__control-bg--flash"
          style={{ opacity: 0, backgroundColor: 'white', rotate: direction === 1 ? '180deg' : undefined }}
        />
        <motion.div
          className="carousel__control-bg carousel__control-bg--rainbow"
          style={{ opacity: 0.5, rotate: direction === 1 ? '180deg' : undefined }}
        />

        <motion.div
          animate={contentAnimationControls}
          style={contentStyle}
          className="carousel__swipe-indicator-content"
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
                rotate: direction === 1 ? '180deg' : undefined
              }}
            />
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}