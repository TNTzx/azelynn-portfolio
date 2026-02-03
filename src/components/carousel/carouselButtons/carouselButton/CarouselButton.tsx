import { FaArrowLeft } from 'react-icons/fa';
import './CarouselButton.scss';
import type { CarouselButtonProps, CarouselButtonVariants } from './carouselButtonTypes';
import { motion } from 'motion/react';
import { easeOutQuint } from 'js-easing-functions';

const buttonVariants: CarouselButtonVariants = {
  initial: {
    opacity: 0.5,
    padding: '0px'
  },
  hover: {
    opacity: 1,
    padding: '100px'
  }
}

const iconVariants: CarouselButtonVariants = {
  initial: {
    opacity: 0,
    rotateZ: 0
  },
  hover: {
    opacity: 1,
    rotateZ: 360
  }
}

export default function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className="carousel__button"
      style={{
        transform: direction === 1 ? 'rotate(180deg)' : undefined,
      }}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.25, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
    >
      <motion.span variants={iconVariants}>
        <FaArrowLeft
          style={{
            width: '10em',
            height: '10em'
          }}
        />
      </motion.span>
    </motion.button>
  )
}