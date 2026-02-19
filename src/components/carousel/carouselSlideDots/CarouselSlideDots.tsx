import CarouselSlideDot from './carouselSlideDot/CarouselSlideDot';
import './CarouselSlideDots.scss';
import type { CarouselSlideDotsProps } from './carouselSlideDotsTypes';

export default function CarouselSlideDots({ slides, slideIndex }: CarouselSlideDotsProps) {
  return (
    <div className="carousel__slide-dots">
      <CarouselSlideDot text='test1' isActive={false} />
      <CarouselSlideDot text='test2' isActive={false} />
      <CarouselSlideDot text='test3' isActive={false} />
      <CarouselSlideDot text='test4' isActive={false} />
      <CarouselSlideDot text='test5' isActive={true} />
      <CarouselSlideDot text='test6' isActive={false} />
      <CarouselSlideDot text='test7' isActive={false} />
    </div>
  );
}