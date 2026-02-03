import { FaArrowLeft } from 'react-icons/fa';
import './CarouselButton.scss';
import type { CarouselButtonProps, CarouselButtonVariants } from './carouselButtonTypes';
import { motion, useAnimationControls } from 'motion/react';
import { easeOutQuint } from 'js-easing-functions';

const buttonVariants: CarouselButtonVariants = {
  initial: {
    opacity: 0.5,
    padding: '20px'
  },
  hover: {
    opacity: 1,
    padding: '100px'
  },
  click: {
    backgroundImage: [
      'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)',
      'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)'
    ],
    transition: {
      duration: 0.25,
    }
  }
}

const iconVariants: CarouselButtonVariants = {
  initial: {
    scale: 0.5,
    opacity: 0.2,
    rotateZ: -360
  },
  hover: {
    scale: 1,
    opacity: 1,
    rotateZ: 0
  },
  click: {
    opacity: 1,
    rotateZ: [45, 0],
  }
}

export default function CarouselButton({ direction, onClick }: CarouselButtonProps) {
  const controls = useAnimationControls();

  function handleClick() {
    onClick();
    controls.start('click').then(() => {
      controls.start('hover');
    });
  }

  return (
    <motion.button
      onClick={handleClick}
      className="carousel__button"
      style={{
        transform: direction === 1 ? 'rotate(180deg)' : undefined,
      }}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      animate={controls}
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