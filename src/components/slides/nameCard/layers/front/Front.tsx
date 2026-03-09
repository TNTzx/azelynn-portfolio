import { ImageAzel } from "@src/assets/images"
import './Front.scss';
import type { CarouselVariants } from "@src/components/carousel";
import { EASEOUTQUINT } from "@src/utils";
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

  const OFFSET = 5;

  const mainVariants: CarouselVariants = args.shadow ? {
    enter: {
      opacity: 0,
      x: -100
    },
    center: {
      opacity: [0, 0, 1],
      x: [0, 0, -OFFSET],
      y: [0, 0, -OFFSET],
      transition: {
        ease: ['linear', EASEOUTQUINT],
        duration: 0.5 + 0.5,
        delay: args.delay
      }
    },
    exit: {

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

    }
  };

  const shadowVariants: CarouselVariants = {
    enter: {
      opacity: 0,
      x: -100
    },
    center: {
      opacity: [0, 1, 1],
      x: [-100, 0, OFFSET],
      y: [0, 0, OFFSET],
      transition: {
        ease: [EASEOUTQUINT, EASEOUTQUINT],
        duration: 0.5 + 0.5,
        delay: args.delay
      }
    },
    exit: {

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

      <TextSection tag="h1" classVariant="slide-name-card__name-text--title" shadow={true} delay={0.5}>
        AZELYNN
      </TextSection>

      <TextSection tag="h2" classVariant="slide-name-card__name-text--subtitle" shadow={true} delay={1}>
        aka //TNTz
      </TextSection>

      <TextSection tag="h3" classVariant="slide-name-card__name-text--description" shadow={false} delay={2}>
        WEB & APPLICATION DEVELOPER <Separator />
        MOTION GRAPHICS ANIMATOR
      </TextSection>

      <TextSection tag="h3" classVariant="slide-name-card__name-text--small" shadow={false} delay={2.5}>
        musician <Separator />
        digital artist <Separator />
        storywriter
      </TextSection>
    </div>
  )
}

function Picture() {
  return (
    <div className="slide-name-card__image-azel">
      <img src={ImageAzel} className="slide-name-card__image-azel-element" />
    </div>
  )
}

export default function Front() {
  return (
    <div className="slide-name-card__front">
      <div className="slide-name-card__name-container">
        <Name />
      </div>

      <div className="slide-name-card__image-azel-container">
        <Picture />
      </div>
    </div>
  )
}