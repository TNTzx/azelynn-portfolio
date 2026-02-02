import './CarouselButton.css';
import type { CarouselButtonProps } from './carouselButtonTypes';

export default function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  return (
    <button
      onClick={onClick}
      className="carousel__button"
    >
      Right
    </button>
  )
}