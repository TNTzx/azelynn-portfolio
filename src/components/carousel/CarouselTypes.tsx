import type { Variant, Variants } from "motion/react";
import type { JSX } from "react";

export interface CarouselSlide {
  hash: string;
  getElement: (context: CarouselAnimationContext) => JSX.Element;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
  onScreenChange?: (newSlide: CarouselSlide) => void;
  loadingSlide?: JSX.Element;
  debounceDelayMs?: number;
}

export type CarouselDirection = -1 | 1;

export interface CarouselAnimationContext {
  direction?: CarouselDirection;
}

export interface CarouselVariants extends Variants<CarouselAnimationContext> {
  enter: Variant<CarouselAnimationContext>;
  center: Variant<CarouselAnimationContext>;
  exit: Variant<CarouselAnimationContext>;
}