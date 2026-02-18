import type { MotionValue } from "motion";
import type { CarouselButtonDirection, CarouselButtonKeyPressed } from "./carouselButton";

export interface CarouselButtonsProps {
    onClick: (direction: CarouselButtonDirection) => void;
    keyPressed: MotionValue<CarouselButtonKeyPressed>;
    isLeftDisabled: boolean;
    isRightDisabled: boolean;
}