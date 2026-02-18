import type { CarouselAnimationContext, CarouselVariants } from '@src/components';
import './HelloWorld.scss';
import { AnimatePresence, motion, type TargetAndTransition } from 'framer-motion';
import { easeInOutQuint, easeOutQuint } from 'js-easing-functions';
import { useViewport } from '@src/hooks';
import { useEffect, useState } from 'react';


function getMarqueeVariant(duration: number, direction: -1 | 1, textRepetitions: number): CarouselVariants {
  return {
    enter: {},
    center: {
      x: ["0%", `${100 / textRepetitions * direction}%`],
      transition: {
        repeat: Infinity,
        duration,
        ease: "linear"
      }
    },
    exit: {}
  }
}


const mountainHeights = Array.from({ length: 200 }, () => Math.random());

function Mountains() {
  const viewportSize = useViewport();

  const mountainWidth = 1080 / 15;

  const [debouncedCount, setDebouncedCount] = useState(
    Math.ceil(viewportSize.width / mountainWidth)
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      const newCount = Math.ceil(viewportSize.width / mountainWidth);
      setDebouncedCount(newCount);
    }, 200);

    return () => clearTimeout(handler);
  }, [viewportSize.width, mountainWidth]);

  
  const mountains = [...Array(debouncedCount).keys()];

  const mountainContainerVariant = {
    enter: {},
    center: { transition: {
      staggerChildren: 0.03,
    } } satisfies TargetAndTransition,
    exit: {}
  } satisfies CarouselVariants;

  const mountainContainerInverseVariant: CarouselVariants = {
    ...mountainContainerVariant,
    center: {
      ...mountainContainerVariant.center,
      transition: {
        ...mountainContainerVariant.center.transition,
        staggerDirection: -1
    }}
  };

  const mountainVariant: CarouselVariants = {
    enter: { scaleY: 0 },
    center: { scaleY: 1 },
    exit: { scaleY: 0 }
  };

  function getMountainContainerStyle(randomValue: number) {
    return {
      width: mountainWidth,
      height: randomValue * 100 + 50
    };
  }

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={`top-${debouncedCount}`}
        className="slide-hello-world__mountains-container slide-hello-world__mountains-container--top"
        variants={mountainContainerVariant}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {mountains.map(idx => (
          <div
            key={idx}
            className="slide-hello-world__mountain-container"
            style={getMountainContainerStyle(mountainHeights[idx])}
          >
            <motion.div
              variants={mountainVariant}
              className="slide-hello-world__mountain slide-hello-world__mountain--top"
            >
            </motion.div>
          </div>
        ))}
      </motion.div>

      <motion.div
        key={`bottom-${debouncedCount}`}
        className="slide-hello-world__mountains-container slide-hello-world__mountains-container--bottom"
        variants={mountainContainerInverseVariant}
        initial="enter"
        animate="center"
        exit="exit"
      >
        {mountains.map(idx => (
          <div
            key={idx}
            className="slide-hello-world__mountain-container"
            style={getMountainContainerStyle(mountainHeights[debouncedCount - idx - 1])}
          >
            <motion.div
              variants={mountainVariant}
              className="slide-hello-world__mountain slide-hello-world__mountain--bottom"
            >
            </motion.div>
          </div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

// const testVariants: CarouselVariants = {
//   enter: {
//     y: "100vh"
//   },
//   center: animationContext => ({
//     rotateZ: animationContext.direction === 1 ? "90deg" : "45deg",
//     y: "0vh",
//     transition: { type: "tween", ease: (t) => easeOutQuint(t, 0, 1, 1), duration: 1 }
//   }),
//   exit: {
//     y: "100vh",
//     transition: { type: "tween", ease: (t) => easeInQuint(t, 0, 1, 1), duration: 1 }
//   }
// }

export default function HelloWorld({ _animationContext }: { animationContext: CarouselAnimationContext }) {
  const delayDurationSeconds = 1;
  const [showAfterDelay, setShowAfterDelay] = useState(false);
  setTimeout(() => setShowAfterDelay(true), delayDurationSeconds * 1000)

  return (
    <div className="slide-hello-world">
      <div className="slide-hello-world__layer slide-hello-world__layer--bg">
        {showAfterDelay &&
          <div className="slide-hello-world__layer slide-hello-world__layer--bg-front">
            <div className="slide-hello-world__mountains">
              <Mountains />
            </div>
          </div>
        }
        

        <div className="slide-hello-world__layer slide-hello-world__layer--bg-back">
          <motion.div
            className="slide-hello-world__bg-fill"
            initial={{ opacity: 0, scaleY: "0%" }}
            animate={{ opacity: 1, scaleY: "100%" }}
            transition={{ duration: delayDurationSeconds * 2, ease: (t) => easeInOutQuint(t, 0, 1, 1) }}
          >
            <div className="slide-hello-world__line"></div>
          </motion.div>
        </div>
      </div>

      {showAfterDelay &&
        <motion.div initial="enter" animate="center" exit="exit" className="slide-hello-world__layer slide-hello-world__layer--fg">
          <div className="slide-hello-world__layer slide-hello-world__layer--fg-front">
            <motion.h1
              className="slide-hello-world__title slide-hello-world__title--hello"
              initial={{ opacity: 0, y: "20%", letterSpacing: "-0.5em" }}
              animate={{ opacity: 1, y: "0%", letterSpacing: "0.2em" }}
              transition={{ duration: 1, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
            >
              HELLO
            </motion.h1>
            <motion.h1
              className="slide-hello-world__title slide-hello-world__title--world"
              initial={{ opacity: 0, y: "-20%", letterSpacing: "-0.5em" }}
              animate={{ opacity: 1, y: "0%", letterSpacing: "0.2em" }}
              transition={{ duration: 1, delay: 0.5, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
            >
              WORLD
            </motion.h1>
          </div>

          <div className="slide-hello-world__layer slide-hello-world__layer--fg-back">
            <motion.div
              className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--hello"
              initial={{ opacity: 0, y: "50%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 2, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
            >
              <motion.h2
                variants={getMarqueeVariant(4, -1, 8)}
                className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--hello"
              >
                HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;
              </motion.h2>
              <motion.h2
                variants={getMarqueeVariant(2, -1, 8)}
                className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--hello"
              >
                HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;
              </motion.h2>
              <motion.h1
                variants={getMarqueeVariant(6, -1, 4)}
                className="slide-hello-world__title-shadow slide-hello-world__title-shadow--hello"
              >
                HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;HELLO&nbsp;
              </motion.h1>
            </motion.div>

            <motion.div
              className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--world"
              initial={{ opacity: 0, y: "-50%" }}
              animate={{ opacity: 1, y: "0%" }}
              transition={{ duration: 2, delay: 0.5, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
            >
              <motion.h1
                variants={getMarqueeVariant(6, 1, 4)}
                className="slide-hello-world__title-shadow slide-hello-world__title-shadow--world"
              >
                WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;
              </motion.h1>
              <motion.h2
                variants={getMarqueeVariant(2, 1, 8)}
                className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--world"
              >
                WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;
              </motion.h2>
              <motion.h2
                variants={getMarqueeVariant(4, 1, 8)}
                className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--world"
              >
                WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;WORLD&nbsp;
              </motion.h2>
            </motion.div>
          </div>
        </motion.div>
      }
    </div>
  )
}