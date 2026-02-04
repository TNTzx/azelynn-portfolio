import { useState, useRef } from 'react';
import type { CarouselProps, CarouselAnimationContext, CarouselVariants as CarouselSlideVariants } from './carouselTypes';
import './Carousel.scss';
import { AnimatePresence, motion, useMotionValue } from 'motion/react';
import CarouselButtons from './carouselControls/carouselButtons/CarouselButtons';
import { useSwipeable } from 'react-swipeable';
import CarouselSwipes from './carouselControls/carouselSwipes/CarouselSwipes';

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
  const swipePercent = useMotionValue<number | null>(0);
  const swipeHandlers = useSwipeable({
    delta: 0.2,
    onSwiping: (e) => {
      swipePercent.set(e.deltaX / window.innerWidth)
    },
    onSwiped: () => {
      swipePercent.set(null);
    }
  })

  const [currentIndex, setCurrentIndex] = useState<number>(() => {
    const foundIndex = slides.findIndex(slide => slide.hash === currentSlide);
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
      {...swipeHandlers}
      className="carousel"
    >
      <div className="carousel__controls layer">
        <div className="carousel__control carousel__control--buttons">
          <CarouselButtons onClick={(direction) => switchScreen(direction)} />
        </div>

        <div className="carousel__control carousel__control--swipes">
          <CarouselSwipes swipePercent={swipePercent} />
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