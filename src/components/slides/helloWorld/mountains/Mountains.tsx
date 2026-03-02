import type { CarouselVariants } from '@src/components/carousel';
import { useViewport } from '@src/hooks';
import type { TargetAndTransition } from 'motion';
import { motion } from 'motion/react';
import { useState, useEffect, useMemo } from 'react';
import './Mountains.scss';

const mountainHeights = Array.from({ length: 50 }, () => Math.random());

export default function Mountains({ delayDurationSeconds }: { delayDurationSeconds: number }) {
  const viewportSize = useViewport();

  const mountainWidth = 1080 / 8;

  const [debouncedCount, setDebouncedCount] = useState(
    Math.ceil(viewportSize.width / mountainWidth)
  );

  const [delay, setDelay] = useState(delayDurationSeconds);

  useEffect(() => {
    const handler = setTimeout(() => {
      const newCount = Math.ceil(viewportSize.width / mountainWidth);
      setDebouncedCount(newCount);
      setDelay(0);
    }, 200);

    return () => clearTimeout(handler);
  }, [viewportSize.width, mountainWidth]);

  
  const mountains = useMemo(() => [...Array(debouncedCount).keys()], [debouncedCount]);

  const mountainContainerVariant = (() => ({
    enter: {},
    center: { transition: {
      delayChildren: delay,
      staggerChildren: 0.06,
    } } satisfies TargetAndTransition,
    exit: { transition: {
      staggerChildren: 0.06,
    } } satisfies TargetAndTransition
  } satisfies CarouselVariants))();

  const mountainContainerInverseVariant: CarouselVariants = (() => ({
    ...mountainContainerVariant,
    center: {
      ...mountainContainerVariant.center,
      transition: {
        ...mountainContainerVariant.center.transition,
        staggerDirection: -1
    }},
    exit: {
      ...mountainContainerVariant.exit,
      transition: {
        ...mountainContainerVariant.exit.transition,
        staggerDirection: -1
    }}
  }))();


  const topMountainVariant: CarouselVariants = {
    enter: { y: "-100%" },
    center: { y: 0 },
    exit: { y: "-100%" }
  };

  const bottomMountainVariant: CarouselVariants = {
    enter: { y: "100%" },
    center: { y: 0 },
    exit: { y: "100%" }
  };

  function getMountainContainerStyle(randomValue: number) {
    return {
      width: mountainWidth,
      height: randomValue * 100 + 50
    };
  }

  return (
    <>
      <motion.div
        key={`top-${debouncedCount}`}
        className="slide-hello-world__mountains-container slide-hello-world__mountains-container--top"
        variants={mountainContainerVariant}
        initial="enter" animate="center" exit="exit"
      >
        {mountains.map(idx => (
          <motion.div
            key={idx}
            className="slide-hello-world__mountain-container"
            style={getMountainContainerStyle(mountainHeights[idx])}
          >
            <motion.div
              variants={topMountainVariant}
              className="slide-hello-world__mountain slide-hello-world__mountain--top"
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        key={`bottom-${debouncedCount}`}
        className="slide-hello-world__mountains-container slide-hello-world__mountains-container--bottom"
        variants={mountainContainerInverseVariant}
        initial="enter" animate="center" exit="exit"
      >
        {mountains.map(idx => (
          <motion.div
            key={idx}
            className="slide-hello-world__mountain-container"
            style={getMountainContainerStyle(mountainHeights[debouncedCount - idx - 1])}
          >
            <motion.div
              variants={bottomMountainVariant}
              className="slide-hello-world__mountain slide-hello-world__mountain--bottom"
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}