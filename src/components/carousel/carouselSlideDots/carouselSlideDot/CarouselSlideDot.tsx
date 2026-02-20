import { animationControls, motion } from 'motion/react';
import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps, CarouselSlideDotVariants } from './carouselSlideDotTypes';
import { useEffect } from 'react';
import { easeOutQuint } from 'js-easing-functions';

function measureTextWidth(text: string, className?: string) {
  // Create a temporary span
  const el = document.createElement('p');
  el.style.position = 'absolute';
  el.style.visibility = 'hidden';
  if (className) el.className = className;
  el.textContent = text;

  document.body.appendChild(el);
  const width = el.getBoundingClientRect().width;
  const height = el.getBoundingClientRect().height;
  document.body.removeChild(el);

  return [width, height] as const;
}


export default function CarouselSlideDot({ text, isActive }: CarouselSlideDotProps) {
  const controls = animationControls();

  const [textWidth, textHeight] = measureTextWidth(text, 'carousel__slide-dot-text carousel__slide-dot-text--calc');

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

  const sizeSetterVariants: CarouselSlideDotVariants = {
    active: {
      width: textWidth,
      height: textHeight,
      transition
    },
    inactive: {
      width: 0,
      height: 0,
      transition
    }
  };

  const clipVariants: CarouselSlideDotVariants = {
    active: {
      width: textWidth,
      transition: {
        duration: Math.min(1, (1 / 100) * textWidth),
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
          className="carousel__slide-dot-size-setter"
          variants={sizeSetterVariants}
        >
          <div className="carousel__slide-dot-text-container">
            <motion.div
              className="carousel__slide-dot-text-clip"
              variants={clipVariants}
            >
              <p className="carousel__slide-dot-text carousel__slide-dot-text--clipped" style={{ width: textWidth }}>
                {text}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}