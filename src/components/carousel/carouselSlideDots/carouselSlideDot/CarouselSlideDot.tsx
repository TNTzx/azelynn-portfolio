import { animationControls, motion } from 'motion/react';
import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps, CarouselSlideDotVariants } from './carouselSlideDotTypes';
import { useEffect } from 'react';
import { easeOutQuint, easeOutSine } from 'js-easing-functions';

function measureTextWidth(text: string, className?: string) {
  // Create a temporary span
  const span = document.createElement('span');
  span.style.position = 'absolute';
  span.style.visibility = 'hidden';
  span.style.whiteSpace = 'nowrap';
  if (className) span.className = className;
  span.textContent = text;

  document.body.appendChild(span);
  const width = span.getBoundingClientRect().width;
  document.body.removeChild(span);

  return width;
}


export default function CarouselSlideDot({ text, isActive }: CarouselSlideDotProps) {
  const controls = animationControls();

  const textWidth = measureTextWidth(text, 'carousel__slide-dot-text');

  controls.start('inactive');

  useEffect(() => {
    if (isActive) {
      controls.start('active');
    } else {
      controls.start('inactive');
    }
  }, [isActive, controls])

  const transition = {
    duration: 0.5,
    ease: (t: number) => easeOutQuint(t, 0, 1, 1)
  }

  const mainVariants: CarouselSlideDotVariants = {
    active: {
      padding: "0.5em 2em",
      transition
    },
    inactive: {
      padding: "0",
      transition
    }
  };

  const clipVariants: CarouselSlideDotVariants = {
    active: {
      width: textWidth,
      transition
    },
    inactive: {
      width: 0,
      transition
    }
  };

  const clipDelayVariants: CarouselSlideDotVariants = {
    active: {
      width: textWidth,
      transition: {
        duration: 1,
        ease: (t) => easeOutSine(t, 0, 1, 1)
      }
    },
    inactive: {
      width: 0,
      transition
    }
  };

  return (
    <motion.div
      variants={mainVariants}
      animate={controls}
      className="carousel__slide-dot"
    >
      <div className="carousel__slide-dot-counterskew">
        <motion.div
          className="carousel__slide-dot-clip"
          variants={clipVariants}
        >
          <motion.div
            className="carousel__slide-dot-clip"
            variants={clipDelayVariants}
          >
            <p className="carousel__slide-dot-text">
              {text}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}