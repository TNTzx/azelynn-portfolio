import type { CarouselVariants } from '@src/components';
import './SlideHelloWorld.scss';
import { motion } from 'motion/react';
import { EASEINOUTQUINT, EASEINQUINT, EASEOUTQUINT } from '@src/utils';
import Mountains from './mountains/Mountains';


const delayDurationSeconds = 1;


function FGFront() {
  const helloVariants: CarouselVariants = (() => ({
    enter: {
      opacity: 0,
      y: "100%",
      rotateX: "0deg",
      rotateZ: "0deg",
      z: "0px",
    },
    center: {
      opacity: 1,
      y: "0%",
      rotateX: "0deg",
      rotateZ: "0deg",
      z: "0px",
      transition: {
        duration: 1,
        delay: delayDurationSeconds,
        ease: EASEOUTQUINT
      }
    },
    exit: {
      opacity: 1,
      y: "0%",
      rotateX: "-45deg",
      rotateZ: "-15deg",
      z: "1000px",
      transition: {
        duration: 2,
        ease: EASEINOUTQUINT
      }
    }
  }))()

  const worldVariants: CarouselVariants = (() => ({
    enter: {
      opacity: 0,
      y: "-100%",
      z: "0px",
      rotateX: "0deg",
      rotateZ: "0deg",
    },
    center: {
      opacity: 1,
      y: "0%",
      z: "0px",
      transition: {
        duration: 1,
        delay: delayDurationSeconds + 0.5,
        ease: EASEOUTQUINT
      }
    },
    
    exit: {
      opacity: 1,
      y: "0%",
      z: "1000px",
      rotateX: "45deg",
      rotateZ: "-15deg",
      transition: {
        duration: 2,
        ease: EASEINOUTQUINT
      }
    }
  }))();

  return <>
    <motion.h1
      className="slide-hello-world__title slide-hello-world__title--hello"
      variants={helloVariants}
    >
      HELLO
    </motion.h1>
    <motion.h1
      className="slide-hello-world__title slide-hello-world__title--world"
      variants={worldVariants}
    >
      WORLD
    </motion.h1>
  </>
}


function FGBack() {
  const helloContainer: CarouselVariants = (() => ({
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
        ease: EASEOUTQUINT
      }
    },
    exit: {
      opacity: 0,
      y: "-100%",
      rotate: "-10deg",
      transition: {
        duration: 1,
        ease: EASEINQUINT
      }
    },
  }))()

  const worldContainer: CarouselVariants = (() => ({
    enter: {
      opacity: 0,
      y: "-50%"
    },
    center: {
      opacity: 1,
      y: "0%",
      transition: {
        duration: 2,
        delay: delayDurationSeconds + 0.5,
        ease: EASEOUTQUINT
      }
    },
    exit: {
      opacity: 0,
      y: "100%",
      rotate: "10deg",
      transition: {
        duration: 1,
        ease: EASEINQUINT
      }
    },
  }))()
  return (
    <>
      <motion.div
        className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--hello"
        variants={helloContainer}
      >
        <motion.h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--hello">
          {[...Array(8)].map((_, idx) =>
            <div key={idx}>HELLO&nbsp;</div>)
          }
        </motion.h2>
        <motion.h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--hello">
          {[...Array(16)].map((_, idx) =>
            <div key={idx}>HELLO&nbsp;</div>)
          }
        </motion.h2>
        <motion.h1 className="slide-hello-world__title-shadow slide-hello-world__title-shadow--hello">
          {[...Array(8)].map((_, idx) =>
            <div key={idx}>HELLO&nbsp;</div>)
          }
        </motion.h1>
      </motion.div>

      <motion.div
        className="slide-hello-world__title-shadow-container slide-hello-world__title-shadow-container--world"
        variants={worldContainer}
      >
        <motion.h1 className="slide-hello-world__title-shadow slide-hello-world__title-shadow--world">
          {[...Array(8)].map((_, idx) =>
            <div key={idx}>WORLD&nbsp;</div>)
          }
        </motion.h1>
        <motion.h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--world">
          {[...Array(16)].map((_, idx) =>
            <div key={idx}>WORLD&nbsp;</div>)
          }
        </motion.h2>
        <motion.h2 className="slide-hello-world__title-shadow-small slide-hello-world__title-shadow-small--world">
          {[...Array(8)].map((_, idx) =>
            <div key={idx}>WORLD&nbsp;</div>)
          }
        </motion.h2>
      </motion.div>
    </>
  )
}

function BGBack() {
  const bgBackVariants: CarouselVariants = (() => ({
    enter: {
      opacity: 0,
      scaleY: "0%",
      rotate: "0deg",
      z: "0px",
    },
    center: {
      opacity: 1,
      scaleY: "100%",
      rotate: "0deg",
      z: "0px",
      transition: {
        duration: delayDurationSeconds * 2,
        ease: EASEINOUTQUINT
      }
    },
    exit: {
      opacity: 0,
      scaleY: "100%",
      rotate: "-15deg",
      z: "-1000px",
      transition: {
        duration: 2,
        ease: EASEINOUTQUINT
      }
    }
  }))()

  return (
    <motion.div
      className="slide-hello-world__bg-fill"
      variants={bgBackVariants}
    >
      <div className="slide-hello-world__line"></div>
    </motion.div>
  )
}

export default function SlideHelloWorld() {
  return (
    <div className="slide-hello-world">
      <div className="slide-hello-world__layer slide-hello-world__layer--bg">
        <div className="slide-hello-world__layer slide-hello-world__layer--bg-front">
          <motion.div className="slide-hello-world__mountains">
            <Mountains delayDurationSeconds={delayDurationSeconds} />
          </motion.div>
        </div>
        

        <div className="slide-hello-world__layer slide-hello-world__layer--bg-back">
          <BGBack />
        </div>
      </div>

      <motion.div initial="enter" animate="center" exit="exit" className="slide-hello-world__layer slide-hello-world__layer--fg">
        <div className="slide-hello-world__layer slide-hello-world__layer--fg-front">
          <FGFront />
        </div>

        <div className="slide-hello-world__layer slide-hello-world__layer--fg-back">
          <FGBack />
        </div>
      </motion.div>
    </div>
  )
}