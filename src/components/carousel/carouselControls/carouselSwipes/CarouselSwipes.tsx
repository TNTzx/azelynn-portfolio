import { transform, useMotionValue, useMotionValueEvent, useTransform } from 'motion/react';
import CarouselSwipeIndicator from './carouselSwipeIndicator/CarouselSwipeIndicator';
import './CarouselSwipes.scss';
import type { CarouselSwipesProps } from './carouselSwipesTypes';

export default function CarouselSwipes({ swipePercent, switchScreen, isLeftDisabled, isRightDisabled }: CarouselSwipesProps) {
  const leftSwipePercent = useTransform(swipePercent, (val) => val === null ? null : transform(val, [0, 1], [0, 1]));
  const rightSwipePercent = useTransform(swipePercent, (val) => val === null ? null : transform(val, [-1, 0], [1, 0]));

  const persistSwipePercent = useMotionValue(0);

  useMotionValueEvent(swipePercent, 'change', latestValue => {
    if (latestValue === null) {
      const persistLatestValue = persistSwipePercent.get();
      switchScreen?.(persistLatestValue < 0 ? 1 : -1)
      return;
    };

    persistSwipePercent.set(latestValue);
  });


  return (
    <div className="carousel__swipes">
      <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={-1} swipePercent={leftSwipePercent} isDisabled={isLeftDisabled} />
      </div>

      <div className="carousel__swipe-indicator-container">
        <CarouselSwipeIndicator direction={1} swipePercent={rightSwipePercent} isDisabled={isRightDisabled} />
      </div>
    </div>
  );
}