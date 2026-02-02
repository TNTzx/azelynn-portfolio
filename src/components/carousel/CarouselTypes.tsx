import type { Variant, Variants } from "motion";
import type { JSX } from "react";

export interface CarouselSlide {
  hash: string;
  element: JSX.Element;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
  onScreenChange?: (newSlide: CarouselSlide) => void;
}

export type CarouselDirection = -1 | 0 | 1;

export interface CarouselVariants extends Variants<CarouselDirection> {
  enter: Variant<CarouselDirection>;
  center: Variant<CarouselDirection>;
  exit: Variant<CarouselDirection>;
}