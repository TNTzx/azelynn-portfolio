import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps } from './carouselSlideDotTypes';

export default function CarouselSlideDots({ text, isDisabled }: CarouselSlideDotProps) {
  return (
    <div className="carousel__slide-dot">
      {text}
    </div>
  );
}