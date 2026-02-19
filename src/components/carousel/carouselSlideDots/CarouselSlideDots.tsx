import CarouselSlideDot from './carouselSlideDot/CarouselSlideDot';
import './CarouselSlideDots.scss';
import type { CarouselSlideDotsProps } from './carouselSlideDotsTypes';

export default function CarouselSlideDots({ slides, activeSlideIndex }: CarouselSlideDotsProps) {
  return (
    <div className="carousel__slide-dots">
      {slides.map((slide, index) => {
        return <CarouselSlideDot
          key={`carouselslidedot-${slide.hash}`}
          text={slide.displayName}
          isActive={activeSlideIndex === index}
        />;
      })}
    </div>
  );
}