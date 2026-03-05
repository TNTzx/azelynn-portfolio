import { useViewport } from '@src/hooks';
import './Debug.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { EASEOUTQUINT } from '@src/utils';
import { useFps } from "react-fps";

const TOGGLE_TIMEOUT_MS = 1000;
const TOUCH_TIMEOUT_BEFORE_RESET_MS = 150;
const TOUCH_COUNT = 10;

export default function Debug() {
  const [isOpen, setIsOpen] = useState(false);
  const viewport = useViewport();
  const fpsInfo = useFps(viewport.width);

  const toggleTimeout = useRef<number | null>(null);

  const touchTimeout = useRef<number | null>(null);
  const touches = useRef<number>(0);

  const toggleIsOpen = useCallback(() => {
    if (toggleTimeout.current !== null) return;
    toggleTimeout.current = window.setTimeout(() => {
      window.clearTimeout(toggleTimeout.current ?? undefined);
      toggleTimeout.current = null;
    }, TOGGLE_TIMEOUT_MS)
    setIsOpen(!isOpen)
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '3') toggleIsOpen();
    };

    const handleTouchEnd = () => {
      window.clearTimeout(touchTimeout.current ?? undefined);
      touchTimeout.current = null;

      function reset() {
        touches.current = 0;
      }

      touches.current++;
      if (touches.current >= TOUCH_COUNT) {
        toggleIsOpen();
        reset();
        return;
      }

      touchTimeout.current = window.setTimeout(() => {
        reset();
        window.clearTimeout(touchTimeout.current ?? undefined);
        touchTimeout.current = null;
      }, TOUCH_TIMEOUT_BEFORE_RESET_MS);
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [toggleIsOpen]);

  const screenWidth = viewport.width;

  let breakpoint: string;
  if (screenWidth < 576) breakpoint = 'xs';
  else if (screenWidth < 768) breakpoint = 'sm';
  else if (screenWidth < 992) breakpoint = 'md';
  else if (screenWidth < 1200) breakpoint = 'lg';
  else breakpoint = 'xl';

  return (
    <AnimatePresence>
      {isOpen &&
        <motion.div
          onClick={toggleIsOpen}
          initial={{ opacity: 0, originY: '0%', scaleY: '0%' }}
          animate={{ opacity: 1, originY: '0%', scaleY: '100%', transition: { duration: 0.5, ease: EASEOUTQUINT } }}
          exit={{ opacity: 0, originY: '0%', scaleY: '0%', transition: { duration: 0.5, ease: EASEOUTQUINT } }}
          className="debug"
        >
          <div className="debug__header">
            <h1 className="debug__header-text debug__header-text--title">DEBUG PANEL</h1>
            <p className="debug__header-text">
              This panel is meant for debugging purposes. You might ask, "Why create this panel?", and to that I say, "Why not?" --
              Open or close by hitting 3 on keyboards or tapping the screen incredibly fast on mobile devices.
            </p>
          </div>

          <div className="debug__content">
            <div className="debug__content-section debug__content-section--red">
              <h2 className="debug__content-section-text debug__content-section-text--label">Screen Width</h2>
              <h1 className="debug__content-section-text debug__content-section-text--value">{screenWidth}px</h1>
            </div>
            <div className="debug__content-section debug__content-section--orange">
              <h2 className="debug__content-section-text debug__content-section-text--label">Breakpoint</h2>
              <h1 className="debug__content-section-text debug__content-section-text--value">{breakpoint}</h1>
            </div>
            <div className="debug__content-section debug__content-section--yellow">
              <h2 className="debug__content-section-text debug__content-section-text--label">Current FPS</h2>
              <h1 className="debug__content-section-text debug__content-section-text--value">{fpsInfo.currentFps}</h1>
            </div>
          </div>
        </motion.div>
      }
    </AnimatePresence>
  )
}