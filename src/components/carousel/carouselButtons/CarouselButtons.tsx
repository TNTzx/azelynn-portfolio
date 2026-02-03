import { CarouselButton } from './carouselButton';
import './CarouselButtons.css';
import type { CarouselButtonsProps } from './carouselButtonsTypes';

export default function CarouselButtons({ onClick }: CarouselButtonsProps) {
  return (
    <div className="carousel__buttons">
      <div className="carousel__button-container carousel__button-container--left">
        <CarouselButton direction={-1} onClick={() => onClick(-1)} />
      </div>

      <div className="carousel__button-container carousel__button-container--right">
        <CarouselButton direction={1} onClick={() => onClick(1)} />
      </div>
    </div>
  );
}