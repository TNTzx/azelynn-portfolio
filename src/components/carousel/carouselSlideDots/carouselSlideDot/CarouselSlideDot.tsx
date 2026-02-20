import { animationControls, motion } from 'motion/react';
import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps, CarouselSlideDotVariants } from './carouselSlideDotTypes';
import { useEffect, useState } from 'react';
import { easeOutQuint } from 'js-easing-functions';
import { useViewport } from '@src/hooks';

function measureTextWidth(text: string, className?: string) {
  const el = document.createElement('p');
  el.style.position = 'absolute';
  if (className) el.className = className;
  el.textContent = text;

  document.body.appendChild(el);
  const rect = el.getBoundingClientRect();
  const width = Math.ceil(rect.width) + 1;;
  const height = rect.height;
  document.body.removeChild(el);

  return [width, height] as const;
}


export default function CarouselSlideDot({ text, isActive, isAnimated = true }: CarouselSlideDotProps) {
  const viewport = useViewport();
  const controls = animationControls();

  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  const textWidth = dimensions.width;
  const textHeight = dimensions.height;

  useEffect(() => {
    document.fonts.ready.then(() => {
      const [width, height] = measureTextWidth(text, 'carousel__slide-dot-text carousel__slide-dot-text--calc');
      setDimensions({ width, height });
    });
  }, [text, viewport.width]);

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

  const textVariants: CarouselSlideDotVariants = {
    active: {
      transition: {
        duration: Math.min(1, (1 / 100) * textWidth),
      }
    },
    inactive: {
      transition
    }
  }

  return isAnimated ? (
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
              <motion.p
                className="carousel__slide-dot-text carousel__slide-dot-text--clipped"
                style={{ width: textWidth }}
                variants={textVariants}
              >
                {text}
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>

  ) : (

    <div
      className="carousel__slide-dot"
      style={(isActive ? mainVariants.active : mainVariants.inactive) as object}
    >
      <div className="carousel__slide-dot-counterskew">
        <div
          className="carousel__slide-dot-size-setter"
          style={(isActive ? sizeSetterVariants.active : sizeSetterVariants.inactive) as object}
        >
          <div className="carousel__slide-dot-text-container">
            <div
              className="carousel__slide-dot-text-clip"
              style={(isActive ? clipVariants.active : clipVariants.inactive) as object}
            >
              <p
                className="carousel__slide-dot-text carousel__slide-dot-text--clipped"
                style={{
                  ...(isActive ? textVariants.active : textVariants.inactive),
                  width: textWidth
                } as React.CSSProperties}
              >
                {text}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}