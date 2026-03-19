import { useState } from "react";
import "./Instructions.scss";
import type { InstructionsProps } from "./InstructionsTypes";
import { FaChevronDown } from "react-icons/fa";
import type { CarouselVariants } from "../carousel";
import { AnimatePresence, motion } from "motion/react";
import { EASEOUTBACK, EASEOUTQUINT } from "@src/utils";

export default function Instructions(props: InstructionsProps) {
  const [isShown, setIsShown] = useState(true);

  function toggleIsShown() {
    setIsShown(prev => !prev);
  }


  const mainVariants: CarouselVariants = {
    enter: {},
    center: {
      transition: { delayChildren: 2 }
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
            <FaChevronDown style={{ width: 20, height: 20 }}/>
          </button>
        </motion.div>
        <AnimatePresence>
          {isShown &&
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
            </motion.div>
          }
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}