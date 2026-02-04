import { MotionValue, useMotionValue } from "motion/react";
import { useSwipeable } from "react-swipeable";
import type { CarouselSwipeIndicatorSwipePercent } from "./carouselSwipes/carouselSwipeIndicator";
import type { CarouselButtonKeyPressed } from "./carouselButtons";

export type CarouselCountrolsSwitchScreen = (direction: -1 | 1) => void

export interface CarouselControlsProps {
    switchScreen?: CarouselCountrolsSwitchScreen;
    swipePercent: CarouselSwipeIndicatorSwipePercent;
    keyPressed: MotionValue<CarouselButtonKeyPressed>;
}

export function useCarouselControls() {
  const swipePercent = useMotionValue<number | null>(0);
  const keyPressed = useMotionValue<CarouselButtonKeyPressed>(null);

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
      keyPressed.set(-1);
    }

    if (event.key === 'ArrowRight') {
      keyPressed.set(1);
    }

    keyPressed.set(null);
  }

  const handlers = {
    tabIndex: 0,
    ...swipeHandlers,
    onKeyUp
  }

  return [swipePercent, keyPressed, handlers] as const;
}