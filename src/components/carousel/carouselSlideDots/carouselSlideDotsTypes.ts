import type { Variant, Variants } from "motion/react";
import type { CarouselSlide } from "../carouselSlide/carouselSlideTypes";

export interface CarouselSlideDotsProps {
  slides: CarouselSlide[];
  activeSlideIndex: number;
}

export interface CarouselSlideDotsVariants extends Variants<undefined> {
  shown: Variant<undefined>;
  hidden: Variant<undefined>;
}