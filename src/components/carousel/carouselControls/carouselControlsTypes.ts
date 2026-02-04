import type { CarouselSwipeIndicatorSwipePercent } from "./carouselSwipes/carouselSwipeIndicator";

export interface CarouselControlsProps {
    switchScreen?: (direction: -1 | 1) => void;
    swipePercent: CarouselSwipeIndicatorSwipePercent
}