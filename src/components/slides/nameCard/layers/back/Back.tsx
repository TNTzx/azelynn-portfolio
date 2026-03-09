import { ImageBeach } from "@src/assets/images";
import './Back.scss'
import type { CarouselVariants } from "@src/components/carousel";
import { motion, useSpring, useTransform } from "motion/react";
import { useMotionMouse } from "@src/hooks/motionMouse";
import type { MotionStyle, SpringOptions } from "motion";

export default function Back() {
  const motionMouse = useMotionMouse();

  const variants: CarouselVariants = {
    enter: {
      opacity: 0
    },
    center: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 1
      }
    },
    exit: {
      opacity: 0
    }
  }

  
  const springConfig: SpringOptions = { damping: 25, stiffness: 150 };

  const style: MotionStyle = {
    x: useTransform(
      useSpring(motionMouse.x, springConfig),
      [0, window.innerWidth],
      [30, -30]
    ),
    y: useTransform(
      useSpring(motionMouse.y, springConfig),
      [0, window.innerHeight],
      [30, -30]
    )
  }

  return (
    <div className="slide-name-card__back">
      <motion.img
        src={ImageBeach}
        style={style}
        variants={variants}
        className="slide-name-card__image-beach-element"
      />
    </div>
  )
}