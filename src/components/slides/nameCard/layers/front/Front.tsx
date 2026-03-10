import { ImageAzel } from "@src/assets/images"
import './Front.scss';
import type { CarouselVariants } from "@src/components/carousel";
import { EASEINOUTQUINT, EASEINQUINT, EASEOUTQUINT } from "@src/utils";
import { motion } from "motion/react";
import type { ReactElement } from "react";

function Separator() {
  return (
    <b>// </b>
  )
}

function TextSection(args: {
  tag: "h1" | "h2" | "h3",
  classVariant: string,
  shadow: boolean,
  delay: number,
  children: string | (ReactElement | string)[] | ReactElement
}) {
  const MotionTag = motion[args.tag];

  const SHADOW_OFFSET = 30;

  const mainVariants: CarouselVariants = args.shadow ? {
    enter: {
      opacity: 0,
      x: -100,
      y: 0,
      translateZ: 0
    },
    center: {
      opacity: [0, 0, 1],
      x: [0, 0, 0],
      y: [0, 0, 0],
      translateZ: [0, 0, SHADOW_OFFSET],
      transition: {
        ease: ['linear', EASEOUTQUINT],
        duration: 0.5 + 0.5,
        delay: args.delay
      }
    },
    exit: {
      opacity: 1,
      x: 0,
      y: 0,
      translateZ: SHADOW_OFFSET,
      transition: {
        ease: ['linear', EASEOUTQUINT],
        duration: 10,
        delay: args.delay
      }
    }
  } : {
    enter: {
      opacity: 0,
      x: -100
    },
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        ease: EASEOUTQUINT,
        duration: 0.5,
        delay: args.delay
      }
    },
    exit: {
      opacity: 1,
      x: 0,
      y: 0,
      translateZ: 0,
    }
  };

  const shadowVariants: CarouselVariants = {
    enter: {
      opacity: 0,
      x: -100
    },
    center: {
      opacity: [0, 1, 1],
      x: [-100, 0, 0],
      y: [0, 0, 0],
      translateZ: [0, 0, -SHADOW_OFFSET],
      transition: {
        ease: [EASEOUTQUINT, EASEOUTQUINT],
        duration: 0.5 + 0.5,
        delay: args.delay
      }
    },
    exit: {
      opacity: 1,
      x: 0,
      y: 0,
      translateZ: -SHADOW_OFFSET,
    }
  };

  return (
    <div className="slide-name-card__name-text-container">
      <MotionTag variants={mainVariants} className={`slide-name-card__name-text ${args.classVariant}`}>
        {args.children}
      </MotionTag>

      {args.shadow &&
        <MotionTag variants={shadowVariants} className={`slide-name-card__name-text ${args.classVariant} slide-name-card__name-text--shadow`}>
          {args.children}
        </MotionTag>
      }
    </div>
  );
}

function Name() {
  return (
    <div className="slide-name-card__name">
      <TextSection tag="h2" classVariant="slide-name-card__name-text--intro" shadow={true} delay={0}>
        hello there, i'm
      </TextSection>

      <TextSection tag="h1" classVariant="slide-name-card__name-text--title" shadow={true} delay={0.25}>
        AZELYNN
      </TextSection>

      <TextSection tag="h2" classVariant="slide-name-card__name-text--subtitle" shadow={true} delay={0.5}>
        aka //TNTz
      </TextSection>

      <TextSection tag="h3" classVariant="slide-name-card__name-text--description" shadow={false} delay={1}>
        WEB & APPLICATION DEVELOPER <Separator />
        MOTION GRAPHICS ANIMATOR
      </TextSection>

      <TextSection tag="h3" classVariant="slide-name-card__name-text--small" shadow={false} delay={1.5}>
        musician <Separator />
        digital artist <Separator />
        storywriter
      </TextSection>
    </div>
  )
}

function Picture() {
  const variants: CarouselVariants = {
    enter: {
      clipPath: 'inset(0 0 100% 0)',
    },
    center: {
      clipPath: 'inset(0 0 0 0)',
      transition: {
        ease: EASEINOUTQUINT,
        duration: 2,
        delay: 0.5
      }
    },
    exit: {
    }
  };

  return (
    <div className="slide-name-card__image-azel">
      <motion.img src={ImageAzel} variants={variants} className="slide-name-card__image-azel-element" />
    </div>
  )
}

export default function Front() {
  const variants: CarouselVariants = {
    enter: {
      visibility: 'visible',
      opacity: 0,
      rotateY: 0,
    },
    center: {
      visibility: 'visible',
      opacity: 1,
      rotateY: 0,
    },
    exit: {
      visibility: ['visible', 'visible', 'hidden'],
      rotateY: [0, 90, 90],
      transition: {
        ease: [EASEINQUINT, "linear"],
        duration: 0.8,
        times: [0, 0.99, 1],
        delay: 0
      }
    }
  }
  return (
    <motion.div className="slide-name-card__front-wrapper">
      <motion.div variants={variants} className="slide-name-card__front">
        <div className="slide-name-card__name-container">
          <Name />
        </div>

        <div className="slide-name-card__image-azel-container">
          <Picture />
        </div>
      </motion.div>
    </motion.div>
  )
}