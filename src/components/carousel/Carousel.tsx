import { useState } from 'react';
import type { CarouselDirection, CarouselProps, CarouselVariants as CarouselSlideVariants } from './carouselTypes';
import './Carousel.css';
import '@src/styles/layer.css';
import { AnimatePresence, motion } from 'motion/react';

const slideVariants: CarouselSlideVariants = {
  enter: {},
  center: {},
  exit: {}
}

export default function Carousel({ slides, currentSlide, onScreenChange }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    let foundIndex = slides.findIndex((slide) => slide.hash === currentSlide);
    if (foundIndex === -1) {
      throw new Error(`Slide with route "${currentSlide}" not found.`);
    }
    return foundIndex;
  });

  const [direction, setDirection] = useState<CarouselDirection>(0);

  function switchScreen(offset: number) {
    setCurrentIndex(currentIndex => {
      let newIndex = currentIndex + offset;
      if (newIndex < 0) newIndex = 0;
      if (newIndex >= slides.length) newIndex = slides.length - 1;

      if (currentIndex !== newIndex) {
        onScreenChange?.(slides[newIndex]);

        setDirection(offset / Math.abs(offset) as CarouselDirection);
      }

      return newIndex;
    })
  }


  function onKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      switchScreen(-1);
    }

    if (event.key === 'ArrowRight') {
      switchScreen(1);
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyUp={onKeyUp}
      className="carousel"
    >
      <div className="carousel__buttons layer">
        <div className="carousel__button-container carousel__button-container--left">
          <button
            onClick={() => switchScreen(-1)}
            className="carousel__button carousel__button--left"
          >
            Left
          </button>
        </div>

        <div className="carousel__button-container carousel__button-container--right">
          <button
            onClick={() => switchScreen(1)}
            className="carousel__button carousel__button--right"
          >
            Right
          </button>
        </div>
      </div>

      <div className="carousel__slides layer">
        <AnimatePresence custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {slides[currentIndex].element}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}