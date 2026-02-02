import { useState, useRef } from 'react';
import type { CarouselDirection, CarouselProps, CarouselVariants as CarouselSlideVariants } from './carouselTypes';
import './Carousel.css';
import '@src/styles/layer.css';
import { AnimatePresence, motion } from 'motion/react';
import debounce from 'debounce';

const slideVariants: CarouselSlideVariants = {
  enter: {
    position: 'absolute',
    zIndex: 0
  },
  center: {
    position: 'relative',
    zIndex: 1
  },
  exit: {
    position: 'absolute',
    zIndex: 2
  }
}

export default function Carousel({ slides, currentSlide, onScreenChange, loadingSlide = <></>, debounceDelayMs = 1000 }: CarouselProps) {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(() => {
    let foundIndex = slides.findIndex(slide => slide.hash === currentSlide);
    if (foundIndex === -1) {
      throw new Error(`Slide with route "${currentSlide}" not found.`);
    }
    return foundIndex;
  });
  const [targetIndex, setTargetIndex] = useState<number>(visibleIndex ?? 0);
  const [direction, setDirection] = useState<CarouselDirection>(-1);

  const [showLoadingSlide, setShowLoadingSlide] = useState<boolean>(false);

  let visibleIndexDebounce = useRef(
    debounce(value => {
      setVisibleIndex(value);
      setShowLoadingSlide(false);
    }, debounceDelayMs)
  );

  function switchScreen(offset: number) {
    setDirection((
      offset !== 0
      ? (offset / Math.abs(offset))
      : -1
    ) as CarouselDirection);

    let newIndex = targetIndex + offset;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= slides.length) newIndex = slides.length - 1;

    if (targetIndex !== newIndex) {
      onScreenChange?.(slides[newIndex]);
    }

    setTargetIndex(newIndex);
    setVisibleIndex(null);
    setShowLoadingSlide(true);
    visibleIndexDebounce.current(newIndex);
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
        <div className="carousel__slide-container">
          <AnimatePresence custom={direction}>
            <motion.div
              key={visibleIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className='carousel__slide'
            >{
              visibleIndex !== null
              ? slides[visibleIndex].element
              : (showLoadingSlide ? loadingSlide : null)
            }</motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}