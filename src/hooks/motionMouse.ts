import { useMotionValue } from "motion/react";
import { useEffect } from "react";

export function useCursorPosition(includeTouch: boolean = false) {
  const cursorPosX = useMotionValue(window.innerWidth / 2);
  const cursorPosY = useMotionValue(window.innerHeight / 2);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      cursorPosX.set(e.clientX);
      cursorPosY.set(e.clientY);
    };

    function handleTouchMove(event: TouchEvent) {
      // Prevent scrolling while moving the card to reduce jitter
      if (event.cancelable) event.preventDefault();
      const first = event.touches[0];
      cursorPosX.set(first.clientX);
      cursorPosY.set(first.clientY);
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    }
  }, [includeTouch, cursorPosX, cursorPosY]);

  return {
    x: cursorPosX,
    y: cursorPosY
  };
}