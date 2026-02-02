import type { JSX } from "react";

export interface CarouselSlide {
  hash: string;
  element: JSX.Element;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
}