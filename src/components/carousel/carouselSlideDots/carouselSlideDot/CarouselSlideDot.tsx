import './CarouselSlideDot.scss';
import type { CarouselSlideDotProps } from './carouselSlideDotTypes';

export default function CarouselSlideDot({ text, isActive }: CarouselSlideDotProps) {
  return (
    <div className="carousel__slide-dot" style={{ padding: isActive ? "0.5em 2em" : "0em" }}>
      <div className="carousel__slide-dot-counterskew">
        {isActive && 
          <p className="carousel__slide-dot-text">
            {text}
          </p>
        }
      </div>
    </div>
  );
}