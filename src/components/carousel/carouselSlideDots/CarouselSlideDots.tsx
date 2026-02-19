import { animationControls, motion } from 'motion/react';
import CarouselSlideDot from './carouselSlideDot/CarouselSlideDot';
import './CarouselSlideDots.scss';
import type { CarouselSlideDotsProps, CarouselSlideDotsVariants } from './carouselSlideDotsTypes';
import { easeInBack, easeOutBack } from 'js-easing-functions';
import { useEffect } from 'react';

export default function CarouselSlideDots({ slides, activeSlideIndex }: CarouselSlideDotsProps) {
  const controls = animationControls();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      await controls.start("shown");
      await new Promise(r => setTimeout(r, 2000));
      if (!cancelled) {
        await controls.start("hidden");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [controls, activeSlideIndex])

  const dotsVariants: CarouselSlideDotsVariants = {
    shown: {
      y: "0%",
      transition: {
        duration: 0.5,
        ease: (t) => easeOutBack(t, 0, 1, 1)
      }
    },
    hidden: {
      y: "100%",
      transition: {
        duration: 0.5,
        ease: (t) => easeInBack(t, 0, 1, 1)
      }
    },
  };

  return (
    <motion.div
      className="carousel__slide-dots-position"
      variants={dotsVariants}
      animate={controls}
    >
      <div className="carousel__slide-dots">
        {slides.map((slide, index) => {
          return <CarouselSlideDot
            key={`carouselslidedot-${slide.hash}`}
            text={slide.displayName}
            isActive={activeSlideIndex === index}
          />;
        })}
      </div>
    </motion.div>
  );
}