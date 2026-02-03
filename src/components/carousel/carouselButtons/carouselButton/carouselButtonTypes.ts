import type { Variants, Variant } from "motion/react";

export type CarouselButtonDirection = -1 | 1;

export interface CarouselButtonProps {
  direction: CarouselButtonDirection;
  onClick: () => void;
}

export interface CarouselButtonVariants extends Variants<CarouselButtonDirection> {
  initial: Variant<CarouselButtonDirection>;
  hover: Variant<CarouselButtonDirection>;
}