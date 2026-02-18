import CarouselButton from './carouselButton/CarouselButton';
import './CarouselButtons.scss';
import type { CarouselButtonsProps } from './carouselButtonsTypes';

export default function CarouselButtons({ onClick, keyPressed, isLeftDisabled, isRightDisabled }: CarouselButtonsProps) {
  return (
    <div className="carousel__buttons">
      <div className="carousel__button-container carousel__button-container--left">
        <CarouselButton direction={-1} keyPressed={keyPressed} isDisabled={isLeftDisabled} onClick={() => onClick(-1)} />
      </div>

      <div className="carousel__button-container carousel__button-container--right">
        <CarouselButton direction={1} keyPressed={keyPressed} isDisabled={isRightDisabled} onClick={() => onClick(1)} />
      </div>
    </div>
  );
}