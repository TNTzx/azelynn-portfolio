import { FaArrowLeft } from 'react-icons/fa';
import './CarouselButton.scss';
import type { CarouselButtonProps, CarouselButtonVariants } from './carouselButtonTypes';
import { motion, useAnimationControls } from 'motion/react';
import { easeOutQuint } from 'js-easing-functions';

const buttonVariants: CarouselButtonVariants = {
  initial: {

  },
  hover: {

  },
  click: {

  }
};

const flashVariants: CarouselButtonVariants = {
  initial: {
    opacity: 0.5,
    backgroundColor: 'rgba(0, 0, 0, 1)',
  },
  hover: {
    opacity: 1,
  },
  click: {
    backgroundColor: [
      'rgba(255, 255, 255, 1)',
      'rgba(0, 0, 0, 1)',
    ],

    transition: {
      duration: 0.25
    }
  }
};

const rainbowVariants: CarouselButtonVariants = {
  initial: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    backgroundPosition: ['0% 50%', '100% 50%'],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'linear'
    }
  },
  click: {

  }
};

const contentVariants: CarouselButtonVariants = {
  initial: {
    padding: '20px'
  },
  hover: {
    padding: '100px'
  },
  click: {

  }
};

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
    rotateZ: [45, 0]
  }
};

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
      onHoverStart={() => controls.start('hover')}
      onHoverEnd={() => controls.start('initial')}
      className="carousel__button"
      style={{
        transform: direction === 1 ? 'rotate(180deg)' : undefined,
      }}
      variants={buttonVariants}
      initial="initial"
      animate={controls}
      transition={{ duration: 0.25, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
    >
      <motion.div className="carousel__button-bg carousel__button-bg--flash" variants={flashVariants} />
      <motion.div className="carousel__button-bg carousel__button-bg--rainbow" variants={rainbowVariants} />

      <motion.div className="carousel__button-contents" variants={contentVariants}>
        <motion.p variants={iconVariants}>
          <FaArrowLeft
            style={{
              color: 'white',
              width: '10em',
              height: '10em'
            }}
          />
        </motion.p>
      </motion.div>
    </motion.button>
  )
}