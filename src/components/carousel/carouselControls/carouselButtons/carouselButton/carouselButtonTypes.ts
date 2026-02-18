import type { Variants, Variant, MotionValue } from "motion/react";

export type CarouselButtonDirection = -1 | 1;

export type CarouselButtonKeyPressed = -1 | null | 1;

export interface CarouselButtonProps {
  direction: CarouselButtonDirection;
  keyPressed: MotionValue<CarouselButtonKeyPressed>;
  onClick: () => void;
  isDisabled: boolean;
}

export interface CarouselButtonVariantsArgs {
  direction: CarouselButtonDirection;
  isDisabled: boolean;
}

export interface CarouselButtonVariants extends Variants<CarouselButtonVariantsArgs> {
  initial: Variant<CarouselButtonVariantsArgs>;
  hover: Variant<CarouselButtonVariantsArgs>;
  click: Variant<CarouselButtonVariantsArgs>;
  keyPressed: Variant<CarouselButtonVariantsArgs>;
}