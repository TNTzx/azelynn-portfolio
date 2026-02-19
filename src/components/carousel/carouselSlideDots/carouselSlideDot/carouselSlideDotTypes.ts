import type { Variant, Variants } from "motion/react";

export interface CarouselSlideDotProps {
  text: string;
  isActive: boolean;
}

export interface CarouselSlideDotVariants extends Variants<undefined> {
  active: Variant<undefined>;
  inactive: Variant<undefined>;
}