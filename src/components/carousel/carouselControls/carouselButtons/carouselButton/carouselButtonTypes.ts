import type { Variants, Variant, MotionValue } from "motion/react";

export type CarouselButtonDirection = -1 | 1;

export type CarouselButtonKeyPressed = -1 | null | 1;

export interface CarouselButtonProps {
  direction: CarouselButtonDirection;
  keyPressed: MotionValue<CarouselButtonKeyPressed>;
  onClick: () => void;
  isDisabled: boolean;
}

export interface CarouselButtonVariants extends Variants<CarouselButtonDirection> {
  initial: Variant<CarouselButtonDirection>;
  hover: Variant<CarouselButtonDirection>;
  click: Variant<CarouselButtonDirection>;
  keyPressed: Variant<CarouselButtonDirection>;
}