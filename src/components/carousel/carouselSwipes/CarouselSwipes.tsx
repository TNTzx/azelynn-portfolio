import CarouselSwipeIndicator from './carouselSwipeIndicator/CarouselSwipeIndicator';
import './CarouselSwipes.scss';
import type { CarouselSwipesProps } from './carouselSwipesTypes';

export default function CarouselSwipes({ swipePercent }: CarouselSwipesProps) {
  return (
    <div className="carousel__swipes">
      <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={-1} swipePercent={swipePercent} />
      </div>

      {/* <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={1} swipePercent={swipePercent} isSwiping={isSwiping} />
      </div> */}
    </div>
  );
}