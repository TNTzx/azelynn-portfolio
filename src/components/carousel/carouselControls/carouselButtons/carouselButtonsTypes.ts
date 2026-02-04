import type { CarouselButtonDirection } from "./carouselButton";

export interface CarouselButtonsProps {
    onClick: (direction: CarouselButtonDirection) => void;
}