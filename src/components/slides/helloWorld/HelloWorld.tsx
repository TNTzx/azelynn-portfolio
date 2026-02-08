import type { CarouselAnimationContext } from '@src/components';
import './HelloWorld.scss';
import { motion } from 'framer-motion';
import { easeOutQuint } from 'js-easing-functions';
import { useViewport } from '@src/hooks';

const openingDuration = 1;

const mountainWidth = 1080 / 15;

const mountainContainerVariant = {
  hidden: {},
  show: { transition: {
    delayChildren: openingDuration,
    staggerChildren: 0.03,
  }}
};

const mountainContainerInverseVariant = {
  ...mountainContainerVariant,
  show: {
    ...mountainContainerVariant.show,
    transition: {
      ...mountainContainerVariant.show.transition,
      staggerDirection: -1
  }}
};

const mountainVariant = {
  hidden: { scaleY: 0 },
  show: { scaleY: 1 },
};

function getMountainContainerStyle() {
  return {
    width: mountainWidth,
    height: Math.random() * 100 + 50
  };
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

export default function HelloWorld({ animationContext }: { animationContext: CarouselAnimationContext }) {
  const viewportSize = useViewport();
  const mountainCount = Math.ceil(viewportSize.width / mountainWidth);
  const mountains = [...Array(mountainCount).keys()];
  
  return (

    <div className="slide-hello-world">
      <div className="slide-hello-world__layer slide-hello-world__layer--bg">
        <div className="slide-hello-world__layer slide-hello-world__layer--bg-front">
          <div className="slide-hello-world__mountains">
            <motion.div
              className="slide-hello-world__mountains-container slide-hello-world__mountains-container--top"
              variants={mountainContainerVariant}
              initial="hidden"
              animate="show"
            >
              {mountains.map(idx => (
                <div
                  key={idx}
                  className="slide-hello-world__mountain-container"
                  style={getMountainContainerStyle()}
                >
                  <motion.div
                    variants={mountainVariant}
                    className="slide-hello-world__mountain slide-hello-world__mountain--top"
                  >
                  </motion.div>
                </div>
              ))}
            </motion.div>

            <div className="slide-hello-world__mountains-container slide-hello-world__mountains-container--bottom">
              <motion.div
                className="slide-hello-world__mountains-container slide-hello-world__mountains-container--bottom"
                variants={mountainContainerInverseVariant}
                initial="hidden"
                animate="show"
              >
                {mountains.map(idx => (
                  <div
                    key={idx}
                    className="slide-hello-world__mountain-container"
                    style={getMountainContainerStyle()}
                  >
                    <motion.div
                      variants={mountainVariant}
                      className="slide-hello-world__mountain slide-hello-world__mountain--bottom"
                    >
                    </motion.div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        <div className="slide-hello-world__layer slide-hello-world__layer--bg-back">
          <div className="slide-hello-world__bg-fill">
            <div className="slide-hello-world__line"></div>
          </div>
        </div>
      </div>

      <div className="slide-hello-world__layer slide-hello-world__layer--fg">
        <div className="slide-hello-world__layer slide-hello-world__layer--fg-front">
          <motion.h1
            className="slide-hello-world__title slide-hello-world__title--hello"
            initial={{ opacity: 0, y: "20%", letterSpacing: "-0.5em" }}
            animate={{ opacity: 1, y: "0%", letterSpacing: "0.2em" }}
            transition={{ duration: 1, delay: openingDuration, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
          >
            HELLO
          </motion.h1>
          <motion.h1
            className="slide-hello-world__title slide-hello-world__title--world"
            initial={{ opacity: 0, y: "-20%", letterSpacing: "-0.5em" }}
            animate={{ opacity: 1, y: "0%", letterSpacing: "0.2em" }}
            transition={{ duration: 1, delay: openingDuration + 0.5, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
          >
            WORLD
          </motion.h1>
        </div>

        <div className="slide-hello-world__layer slide-hello-world__layer--fg-back">
          <motion.div
            className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--hello"
            initial={{ opacity: 0, y: "50%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 2, delay: openingDuration, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
          >
            <h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--hello">HELLO HELLO HELLO HELLO HELLO HELLO HELLO HELLO&nbsp;</h2>
            <h1 className="slide-hello-world__title-shadow slide-hello-world__title-shadow--hello">HELLO HELLO HELLO HELLO&nbsp;</h1>
          </motion.div>
          <motion.div
            className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--world"
            initial={{ opacity: 0, y: "-50%" }}
            animate={{ opacity: 1, y: "0%" }}
            transition={{ duration: 2, delay: openingDuration + 0.5, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
          >
            <h1 className="slide-hello-world__title-shadow slide-hello-world__title-shadow--world">WORLD WORLD WORLD WORLD&nbsp;</h1>
            <h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--world">WORLD WORLD WORLD WORLD WORLD WORLD WORLD WORLD&nbsp;</h2>
          </motion.div>
        </div>
      </div>
    </div>
  )
}