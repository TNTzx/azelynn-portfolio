import type { CarouselControlsSwitchScreen } from "../carouselControlsTypes";
import type { CarouselSwipeIndicatorSwipePercent } from "./carouselSwipeIndicator";

export interface CarouselSwipesProps {
  swipePercent: CarouselSwipeIndicatorSwipePercent;
  switchScreen?: CarouselControlsSwitchScreen;
  isLeftDisabled: boolean;
  isRightDisabled: boolean;
}