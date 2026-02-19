import type { Variant, Variants } from "motion/react";
import type { JSX } from "react";
import type { CarouselAnimationContext, CarouselSlide } from "./carouselSlide";

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
  onScreenChange?: (newSlide: CarouselSlide) => void;
  loadingSlide?: JSX.Element;
  debounceDelayMs?: number;
}

export interface CarouselVariants extends Variants<CarouselAnimationContext> {
  enter: Variant<CarouselAnimationContext>;
  center: Variant<CarouselAnimationContext>;
  exit: Variant<CarouselAnimationContext>;
}