import type { Variant, Variants } from "motion/react";
import type { JSX } from "react";

export interface CarouselSlide {
  hash: string;
  element: JSX.Element;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
  onScreenChange?: (newSlide: CarouselSlide) => void;
  loadingSlide?: JSX.Element;
  debounceDelayMs?: number;
}

export type CarouselDirection = -1 | 1;

export interface CarouselVariants extends Variants<CarouselDirection> {
  enter: Variant<CarouselDirection>;
  center: Variant<CarouselDirection>;
  exit: Variant<CarouselDirection>;
}