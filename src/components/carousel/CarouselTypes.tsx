import type { JSX } from "react";

export interface CarouselSlide {
  route: string;
  element: JSX.Element;
}

export interface CarouselProps {
  slides: CarouselSlide[];
  currentSlide: string;
}