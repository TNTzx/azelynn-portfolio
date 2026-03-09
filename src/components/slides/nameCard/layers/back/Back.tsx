import { ImageBeach } from "@src/assets/images";
import './Back.scss'
import type { CarouselVariants } from "@src/components/carousel";
import { motion } from "motion/react";

export default function Back() {
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

  return (
    <div className="slide-name-card__back">
      <motion.img src={ImageBeach} variants={variants} className="slide-name-card__image-beach-element" />
    </div>
  )
}