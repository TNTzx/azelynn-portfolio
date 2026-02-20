import { animationControls, motion } from 'motion/react';
import CarouselSlideDot from './carouselSlideDot/CarouselSlideDot';
import './CarouselSlideDots.scss';
import type { CarouselSlideDotsProps, CarouselSlideDotsPositionVariants, CarouselSlideDotsTrackVariants } from './carouselSlideDotsTypes';
import { easeInBack, easeOutBack } from 'js-easing-functions';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

export default function CarouselSlideDots({ slides, activeSlideIndex }: CarouselSlideDotsProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackTranslateX, setTrackTranslateX] = useState(0);

  const positionControls = animationControls();

  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    document.fonts.ready.then(() => setFontLoaded(true));
  }, []);

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (track === null) return;

    const activeDot = track.children[0].children[activeSlideIndex] as HTMLElement;
    if (activeDot === undefined) return;

    const dotCenter = activeDot.offsetLeft + (activeDot.offsetWidth / 2);
    setTrackTranslateX(dotCenter);
  }, [trackRef, activeSlideIndex, fontLoaded]);
  
  useEffect(() => {
    let cancelled = false;

    (async () => {
      await positionControls.start("shown");
      await new Promise(r => setTimeout(r, 2000));
      if (!cancelled) {
        await positionControls.start("hidden");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [positionControls, activeSlideIndex])

  const positionVariants: CarouselSlideDotsPositionVariants = {
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

  const trackVariants: CarouselSlideDotsTrackVariants = {
    animate: (trackTranslateX) => ({
      translateX: `-${trackTranslateX}px`,
      transition: {
        duration: 0.5,
        ease: (t) => easeOutBack(t, 0, 1, 1)
      }
    })
  };

  return (
    <motion.div
      className="carousel__slide-dots-position"
      variants={positionVariants}
      animate={positionControls}
    >
      <motion.div
        className="carousel__slide-dots-track"
        variants={trackVariants}
        animate="animate"
        custom={trackTranslateX}
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

      <motion.div
        ref={trackRef}
        className="carousel__slide-dots-track carousel__slide-dots-track--ghost"
      >
        <div className="carousel__slide-dots">
          {slides.map((slide, index) => {
            return <CarouselSlideDot
              key={`carouselslidedot-${slide.hash}`}
              text={slide.displayName}
              isActive={activeSlideIndex === index}
              isAnimated={false}
            />;
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}