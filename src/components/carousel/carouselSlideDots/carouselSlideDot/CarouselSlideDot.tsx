import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps } from './carouselSlideDotTypes';

export default function CarouselSlideDot({ text, isDisabled }: CarouselSlideDotProps) {
  return (
    <div className="carousel__slide-dot">
      <div className="carousel__slide-dot-counterskew">
        {text}
      </div>
    </div>
  );
}