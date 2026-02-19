import { useState, useRef } from 'react';
import type { CarouselProps, CarouselVariants as CarouselSlideVariants } from './carouselTypes';
import './Carousel.scss';
import { AnimatePresence, motion } from 'motion/react';
import CarouselControls from './carouselControls/CarouselControls';
import { useCarouselControls } from './carouselControls/carouselControlsTypes';
import CarouselSlideDots from './carouselSlideDots/CarouselSlideDots';
import type { CarouselAnimationContext } from './carouselSlide';

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
    const foundIndex = slides.findIndex(slide => slide.hash === currentSlide);
    if (foundIndex === -1) {
      throw new Error(`Slide with route "${currentSlide}" not found.`);
    }
    return foundIndex;
  });

  const [isSlideShown, setIsSlideShown] = useState<boolean>(true);
  const [animationProps, setAnimationProps] = useState<CarouselAnimationContext>({ direction: -1 });

  const isLeftDisabled = currentIndex === 0;
  const isRightDisabled = currentIndex === (slides.length - 1);

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

  const [swipePercent, keyPressed, handlers] = useCarouselControls();

  return (
    <div
      {...handlers}
      className="carousel"
    >
      <div className="carousel__controls-container">
        <CarouselControls
          switchScreen={switchScreen}
          keyPressed={keyPressed}
          swipePercent={swipePercent}
          isLeftDisabled={isLeftDisabled}
          isRightDisabled={isRightDisabled}
        />
      </div>

      <div className="carousel__slide-dots-container">
        <div className="carousel__slide-dots-position">
          <CarouselSlideDots slides={slides} activeSlideIndex={currentIndex} />
        </div>
      </div>

      <div className="carousel__slides layer">
        <div className="carousel__slide-container">
          <AnimatePresence mode="sync" custom={animationProps}>
            {isSlideShown ?
              <motion.main
                key={currentIndex}
                custom={animationProps}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className='carousel__slide'
              >{
                slides[currentIndex].getElement(animationProps)
              }</motion.main>
            :
              <motion.main
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="carousel__slide"
              >
                {loadingSlide}
              </motion.main>
            }
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}