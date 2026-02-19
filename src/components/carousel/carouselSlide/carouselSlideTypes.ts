import type { JSX } from "react";

export type CarouselDirection = -1 | 1;

export interface CarouselAnimationContext {
  direction?: CarouselDirection;
}

export interface CarouselSlide {
  hash: string;
  displayName: string;
  getElement: (context: CarouselAnimationContext) => JSX.Element;
}