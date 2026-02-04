import { transform, useTransform } from 'motion/react';
import CarouselSwipeIndicator from './carouselSwipeIndicator/CarouselSwipeIndicator';
import './CarouselSwipes.scss';
import type { CarouselSwipesProps } from './carouselSwipesTypes';

export default function CarouselSwipes({ swipePercent }: CarouselSwipesProps) {
  const leftSwipePercent = useTransform(swipePercent, (val) => val === null ? null : transform(val, [0, 1], [0, 1]));
  const rightSwipePercent = useTransform(swipePercent, (val) => val === null ? null : transform(val, [-1, 0], [1, 0]));


  return (
    <div className="carousel__swipes">
      <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={-1} swipePercent={leftSwipePercent} />
      </div>

      <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={1} swipePercent={rightSwipePercent} />
      </div>
    </div>
  );
}