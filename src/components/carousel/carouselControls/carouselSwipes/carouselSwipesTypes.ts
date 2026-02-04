import { useMotionValue } from "motion/react";
import { useSwipeable } from "react-swipeable";
import type { CarouselSwipeIndicatorSwipePercent } from "./carouselSwipeIndicator";

export interface CarouselSwipesProps {
  swipePercent: CarouselSwipeIndicatorSwipePercent;
}

export function useCarouselSwipeHandler() {
  const swipePercent = useMotionValue<number | null>(0);

  const swipeHandlers = useSwipeable({
    delta: 0.2,
    onSwiping: (e) => {
      swipePercent.set(e.deltaX / window.innerWidth)
      console.log(swipePercent.get())
    },
    onSwiped: () => {
      swipePercent.set(null);
    }
  })

  return [swipePercent, swipeHandlers] as const;
}