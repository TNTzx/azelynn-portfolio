import type { CarouselAnimationContext, CarouselVariants } from '@src/components';
import './HelloWorld.scss';
import { motion, type TargetAndTransition } from 'framer-motion';
import { easeInOutQuint, easeInQuint, easeOutQuint } from 'js-easing-functions';
import { useViewport } from '@src/hooks';
import { useEffect, useState } from 'react';


const delayDurationSeconds = 1;


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

  const [delay, setDelay] = useState(delayDurationSeconds);

  useEffect(() => {
    const handler = setTimeout(() => {
      const newCount = Math.ceil(viewportSize.width / mountainWidth);
      setDebouncedCount(newCount);
      setDelay(0);
    }, 200);

    return () => clearTimeout(handler);
  }, [viewportSize.width, mountainWidth]);

  
  const mountains = [...Array(debouncedCount).keys()];

  const mountainContainerVariant = {
    enter: {},
    center: { transition: {
      delayChildren: delay,
      staggerChildren: 0.03,
    } } satisfies TargetAndTransition,
    exit: { transition: {
      staggerChildren: 0.03,
    } } satisfies TargetAndTransition
  } satisfies CarouselVariants;

  const mountainContainerInverseVariant: CarouselVariants = {
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
              variants={mountainVariant}
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
              variants={mountainVariant}
              className="slide-hello-world__mountain slide-hello-world__mountain--bottom"
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
}


function FGBack() {
  const helloContainer: CarouselVariants = {
    enter: {
      opacity: 0,
      y: "50%",
      rotate: "0deg",
    },
    center: {
      opacity: 1,
      y: "0%",
      rotate: "0deg",
      transition: {
        duration: 2,
        delay: delayDurationSeconds,
        ease: (t) => easeOutQuint(t, 0, 1, 1)
      }
    },
    exit: {
      opacity: 0,
      y: "-100%",
      rotate: "-10deg",
      transition: {
        duration: 1,
        ease: (t) => easeInQuint(t, 0, 1, 1)
      }
    },
  }

  const worldContainer: CarouselVariants = {
    enter: {
      opacity: 0,
      y: "-50%"
    },
    center: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 2,
        delay: delayDurationSeconds + 1,
        ease: (t) => easeOutQuint(t, 0, 1, 1)
      }
    },
    exit: {
      opacity: 0,
      y: "100%",
      rotate: "10deg",
      transition: {
        duration: 1,
        ease: (t) => easeInQuint(t, 0, 1, 1)
      }
    },
  }
  return (
    <>
      <motion.div
        className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--hello"
        variants={helloContainer}
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
        variants={worldContainer}
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
    </>
  )
}

function BGBack() {
  const bgBackVariants: CarouselVariants = {
    enter: {
      opacity: 0,
      scaleY: "0%"
    },
    center: {
      opacity: 1,
      scaleY: "100%",
      transition: {
        duration: delayDurationSeconds * 2,
        ease: (t) => easeInOutQuint(t, 0, 1, 1)
      }
    },
    exit: {
      opacity: 0,
      scaleY: "100%",
      transition: {
        duration: 2
      }
    }
  }

  return (
    <motion.div
      className="slide-hello-world__bg-fill"
      variants={bgBackVariants}
    >
      <div className="slide-hello-world__line"></div>
    </motion.div>
  )
}

export default function HelloWorld({ _animationContext }: { animationContext: CarouselAnimationContext }) {
  const titleHelloVariants: CarouselVariants = {
    enter: {
      opacity: 0,
      y: "20%",
      letterSpacing: "-0.5em"
    },
    center: {
      opacity: 1,
      y: "0%",
      letterSpacing: "0.2em",
      transition: {
        duration: 1,
        delay: delayDurationSeconds,
        ease: (t) => easeOutQuint(t, 0, 1, 1)
      }
    },
    exit: {}
  }

  const titleWorldVariants: CarouselVariants = {
    enter: {
      opacity: 0,
      y: "-20%",
      letterSpacing: "-0.5em"
    },
    center: {
      opacity: 1,
      y: "0%",
      letterSpacing: "0.2em",
      transition: {
        duration: 1,
        delay: delayDurationSeconds + 1,
        ease: (t) => easeOutQuint(t, 0, 1, 1)
      }
    },
    exit: {}
  };


  return (
    <div className="slide-hello-world">
      <div className="slide-hello-world__layer slide-hello-world__layer--bg">
        <div className="slide-hello-world__layer slide-hello-world__layer--bg-front">
          <motion.div className="slide-hello-world__mountains">
            <Mountains />
          </motion.div>
        </div>
        

        <div className="slide-hello-world__layer slide-hello-world__layer--bg-back">
          <BGBack />
        </div>
      </div>

      <motion.div initial="enter" animate="center" exit="exit" className="slide-hello-world__layer slide-hello-world__layer--fg">
        <div className="slide-hello-world__layer slide-hello-world__layer--fg-front">
          <motion.h1
            className="slide-hello-world__title slide-hello-world__title--hello"
            variants={titleHelloVariants}
          >
            HELLO
          </motion.h1>
          <motion.h1
            className="slide-hello-world__title slide-hello-world__title--world"
            variants={titleWorldVariants}
          >
            WORLD
          </motion.h1>
        </div>

        <div className="slide-hello-world__layer slide-hello-world__layer--fg-back">
          <FGBack />
        </div>
      </motion.div>
    </div>
  )
}