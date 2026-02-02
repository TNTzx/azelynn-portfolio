import { useState, useRef } from 'react';
import type { CarouselProps, CarouselAnimationContext, CarouselVariants as CarouselSlideVariants } from './carouselTypes';
import './Carousel.css';
import '@src/styles/layer.css';
import { AnimatePresence, motion } from 'motion/react';
import { CarouselButton } from '../carouselButton';

const slideVariants: CarouselSlideVariants = {
  enter: {
    zIndex: 0
  },
  center: {
    zIndex: 1
  },
  exit: {
    zIndex: 2
  }
}

export default function Carousel({ slides, currentSlide, onScreenChange, loadingSlide = <></>, debounceDelayMs = 1000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    let foundIndex = slides.findIndex(slide => slide.hash === currentSlide);
    if (foundIndex === -1) {
      throw new Error(`Slide with route "${currentSlide}" not found.`);
    }
    return foundIndex;
  });

  const [isSlideShown, setIsSlideShown] = useState<boolean>(true);
  const [animationProps, setAnimationProps] = useState<CarouselAnimationContext>({ direction: -1 });

  const loadingTimeout = useRef<number | null>(null);

  function switchScreen(offset: number) {
    let newIndex = currentIndex + offset;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= slides.length) newIndex = slides.length - 1;

    if (currentIndex === newIndex) {
      return;
    }

    const direction = offset > 0 ? 1 : -1
    setAnimationProps({ direction });

    setIsSlideShown(false);
    setCurrentIndex(newIndex);

    if (loadingTimeout.current) {
      clearTimeout(loadingTimeout.current);
    }
    loadingTimeout.current = window.setTimeout(() => {
      setIsSlideShown(true);
    }, debounceDelayMs);

    onScreenChange?.(slides[newIndex]);
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
          <CarouselButton direction="left" onClick={() => switchScreen(-1)} />
        </div>

        <div className="carousel__button-container carousel__button-container--right">
          <CarouselButton direction="right" onClick={() => switchScreen(1)} />
        </div>
      </div>

      <div className="carousel__slides layer">
        <div className="carousel__slide-container">
          <AnimatePresence mode="sync" custom={animationProps}>
            {isSlideShown ?
              <motion.div
                key={currentIndex}
                custom={animationProps}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className='carousel__slide'
              >{
                slides[currentIndex].getElement(animationProps)
              }</motion.div>
            :
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="carousel__slide"
              >
                {loadingSlide}
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}