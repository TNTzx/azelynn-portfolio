import type { MotionValue, Variant, Variants } from "motion/react";

export type CarouselSwipeIndicatorDirection = -1 | 1;

export type CarouselSwipeIndicatorSwipePercent = MotionValue<number | null>;

export interface CarouselSwipeIndicatorProps {
  direction: CarouselSwipeIndicatorDirection;
  swipePercent: CarouselSwipeIndicatorSwipePercent
}

export interface CarouselSwipeIndicatorVariants extends Variants<undefined> {
  active: Variant<undefined>;
  close: Variant<undefined>;
}