import { useMotionValue } from "motion/react";
import { useSwipeable } from "react-swipeable";
import type { CarouselSwipeIndicatorSwipePercent } from "./carouselSwipes/carouselSwipeIndicator";

export type CarouselCountrolsSwitchScreen = (direction: -1 | 1) => void

export interface CarouselControlsProps {
    switchScreen?: CarouselCountrolsSwitchScreen;
    swipePercent: CarouselSwipeIndicatorSwipePercent
}

export function useCarouselControls(switchScreen: CarouselCountrolsSwitchScreen) {
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

  function onKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      switchScreen(-1);
    }

    if (event.key === 'ArrowRight') {
      switchScreen(1);
    }
  }

  const handlers = {
    ...swipeHandlers,
    onKeyUp
  }

  return [swipePercent, handlers] as const;
}