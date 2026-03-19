import { useState } from "react";
import "./Instructions.scss";
import type { InstructionsProps } from "./InstructionsTypes";
import { FaChevronDown } from "react-icons/fa";
import type { CarouselVariants } from "../carousel";
import { AnimatePresence, motion, useAnimationControls } from "motion/react";
import { EASEOUTBACK, EASEOUTQUINT } from "@src/utils";
import type { Variants } from "motion";

export default function Instructions(props: InstructionsProps) {
  const popupDelaySeconds = 2;
  const timerSeconds = (props.timerSeconds ?? 10) + popupDelaySeconds;
  const [isOpen, setIsOpen] = useState(true);
  const iconAnimationControls = useAnimationControls();
  const [isTimerShown, setIsTimerShown] = useState(true);
  let timerTimeout: number | null = null;

  function toggleIsShown() {
    setIsOpen(prev => {
      const newValue = !prev;
      iconAnimationControls.start(newValue ? "open" : "close")
      return newValue;
    });

    clearTimeout(timerTimeout ?? undefined);
    setIsTimerShown(false);
  }

  timerTimeout = setTimeout(() => {
    toggleIsShown();
  }, timerSeconds * 1000);



  const iconVariants: Variants = {
    open: {
      rotate: "0deg"
    },
    close: {
      rotate: "-180deg"
    }
  }


  const mainVariants: CarouselVariants = {
    enter: {},
    center: {
      transition: { delayChildren: popupDelaySeconds }
    },
    exit: {
    }
  };

  const innerVariants: CarouselVariants = {
    enter: {
      y: "100%",
    },
    center: {
      y: "0%",
      transition: {
        duration: 0.5,
        ease: EASEOUTBACK
      }
    },
    exit: {
      y: "100%",
      transition: {
        duration: 0.5,
        ease: EASEOUTQUINT
      }
    }
  };

  return (
    <motion.div variants={mainVariants} className="instructions">
      <motion.div variants={innerVariants} className="instructions__inner">
        <motion.div className="instructions__controls">
          <button onClick={toggleIsShown} className="instructions__close-button">
            <motion.i variants={iconVariants} animate={iconAnimationControls}>
              <FaChevronDown style={{ width: 20, height: 20 }}/>
            </motion.i>
          </button>
        </motion.div>
        <AnimatePresence>
          {isOpen &&
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto", transition: { duration: 0.5, ease: EASEOUTBACK } }}
              exit={{ height: 0, transition: { duration: 0.5, ease: EASEOUTQUINT } }}
              className="instructions__content-wrapper"
            >
              <motion.div
                onClick={toggleIsShown}
                className="instructions__content"
              >
                <h3
                  className="instructions__text"
                  data-desktop={props.desktop}
                  data-tablet={props.tablet}
                  data-mobile={props.mobile}
                />
              </motion.div>
              {isTimerShown &&
                <motion.div className="instructions__timer">
                  <motion.div animate={{
                    scaleX: ["100%", "0%"],
                    transition: {
                      duration: timerSeconds,
                      delay: 0
                    }
                  }} className="instructions__timer-bar" />
                </motion.div>
              }
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}