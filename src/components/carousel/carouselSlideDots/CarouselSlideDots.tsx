import CarouselSlideDot from './carouselSlideDot/CarouselSlideDot';
import './CarouselSlideDots.scss';
import type { CarouselSlideDotsProps } from './carouselSlideDotsTypes';

export default function CarouselSlideDots({ slideCount, slideIndex }: CarouselSlideDotsProps) {
  return (
    <div className="carousel__slide-dots">
      <CarouselSlideDot text='test1' isActive={true} />
      <CarouselSlideDot text='test2' isActive={true} />
      <CarouselSlideDot text='test3' isActive={true} />
    </div>
  );
}