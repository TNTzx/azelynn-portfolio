import { FaArrowLeft, FaBan } from 'react-icons/fa';
import './CarouselButton.scss';
import type { CarouselButtonProps, CarouselButtonVariants } from './carouselButtonTypes';
import { motion, useAnimationControls, useMotionValueEvent } from 'motion/react';
import { easeInOutQuint, easeOutQuint } from 'js-easing-functions';
import { useEffect } from 'react';

export default function CarouselButton({ direction, keyPressed, onClick, isDisabled }: CarouselButtonProps) {
  const controls = useAnimationControls();

  useEffect(() => {
    if (!isDisabled) {
      controls.start('initial');
    }
  }, [controls, isDisabled])

  function animateKeyPress() {
    setTimeout(() => {
      controls.start('keyPressed').then(() => {
        controls.start('initial');
      });
    }, 0);
  }

  function handleClick(event: React.PointerEvent<HTMLButtonElement>) {
    onClick();

    if (event.nativeEvent.pointerType === 'mouse') {
      controls.start('click').then(() => {
        controls.start('hover')
      });
    } else {
      animateKeyPress()
    }
  }

  useMotionValueEvent(keyPressed, 'change', latestValue => {
    if (latestValue !== direction) return;

    onClick();

    animateKeyPress();
  });


  const buttonVariants: CarouselButtonVariants = {
    initial: {},
    hover: {},
    click: {},
    keyPressed: {}
  };

  const flashVariants: CarouselButtonVariants = {
    initial: (args) => ({
      opacity: args.isDisabled ? 0 : 0.5,
      backgroundColor: 'rgba(0, 0, 0, 1)',
    }),
    hover: {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    click: (args) => ({
      opacity: 1,
      backgroundColor: [
        args.isDisabled ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
        'rgba(0, 0, 0, 0.8)'
      ],

      transition: {
        duration: 0.25
      }
    }),
    keyPressed: (args) => ({
      opacity: 1,
      backgroundColor: [
        args.isDisabled ? 'rgba(255, 0, 0, 1)' : 'rgba(255, 255, 255, 1)',
        'rgba(0, 0, 0, 0.8)'
      ],

      transition: {
        duration: 0.25
      }
    })
  };

  const rainbowVariants: CarouselButtonVariants = {
    initial: {
      opacity: 0,
    },
    hover: {
      opacity: 1,
    },
    click: {},
    keyPressed: {
      opacity: [1, 0],
      transition: {
        duration: 2,
      }
    }
  };

  const contentVariants: CarouselButtonVariants = {
    initial: {
      padding: '0px'
    },
    hover: {
      padding: '100px'
    },
    click: {

    },
    keyPressed: {
      padding: ['20px', '0px'],
      transition: {
        duration: 1,
        ease: (t) => easeInOutQuint(t, 0, 1, 1)
      }
    }
  };

  const iconVariants: CarouselButtonVariants = {
    initial: (args) => ({
      scale: 0.4,
      opacity: args.isDisabled ? 0 : 0.2,
      rotateZ: 360 * args.direction
    }),
    hover: {
      scale: 1,
      opacity: 1,
      rotateZ: 0
    },
    click: {
      opacity: 1,
      rotateZ: [45, 0]
    },
    keyPressed: (args) => ({
      opacity: [1, 1],
      scale: [0.5, 0.5],
      rotateZ: [-45 * args.direction, 0].map(x => x + (360 * args.direction))
    })
  };

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
      custom={{ direction, isDisabled }}
      initial="initial"
      animate={controls}
      transition={{ duration: 0.25, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
    >
      <motion.div className="carousel__control-bg carousel__control-bg--flash" variants={flashVariants} custom={{ direction, isDisabled }} />
      {!isDisabled &&
        <motion.div className="carousel__control-bg carousel__control-bg--rainbow" variants={rainbowVariants} custom={{ direction, isDisabled }} />
      }

      <motion.div className="carousel__button-contents" variants={contentVariants} custom={{ direction, isDisabled }}>
        <motion.div variants={iconVariants} custom={{ direction, isDisabled }}>
          <FaArrowLeft
            style={{
              color: 'white',
              width: '10vw',
              height: '10vw',
              stroke: '#000000',
              strokeWidth: '10px',
              display: isDisabled ? 'none' : 'block',
            }}
          />
          <FaBan
            style={{
              color: 'red',
              width: '10vw',
              height: '10vw',
              stroke: '#000000',
              strokeWidth: '10px',
              display: isDisabled ? 'block' : 'none',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}