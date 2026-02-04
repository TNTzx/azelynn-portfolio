import { FaArrowLeft } from 'react-icons/fa';
import './CarouselButton.scss';
import type { CarouselButtonProps, CarouselButtonVariants } from './carouselButtonTypes';
import { motion, useAnimationControls, useMotionValueEvent } from 'motion/react';
import { easeInOutQuint, easeOutQuint } from 'js-easing-functions';

export default function CarouselButton({ direction, keyPressed, onClick }: CarouselButtonProps) {
  const controls = useAnimationControls();

  function handleClick(event: React.PointerEvent<HTMLButtonElement>) {
    onClick();

    if (event.nativeEvent.pointerType === 'mouse') {
      controls.start('click').then(() => {
        controls.start('hover')
      });
    } else {
      controls.start('keyPressed').then(() => {
        controls.start('initial');
      });
    }
  }

  useMotionValueEvent(keyPressed, 'change', latestValue => {
    if (latestValue !== direction) return;

    onClick();
    controls.start('keyPressed').then(() => {
      controls.start('initial');
    });
  });


  const buttonVariants: CarouselButtonVariants = {
    initial: {},
    hover: {},
    click: {},
    keyPressed: {}
  };

  const flashVariants: CarouselButtonVariants = {
    initial: {
      opacity: 0.5,
      backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    hover: {
      opacity: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    click: {
      backgroundColor: [
        'rgba(255, 255, 255, 1)',
        'rgba(0, 0, 0, 0)',
      ],

      transition: {
        duration: 0.25
      }
    },
    keyPressed: {
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
    initial: {
      scale: 0.4,
      opacity: 0.2,
      rotateZ: 360 * direction
    },
    hover: {
      scale: 1,
      opacity: 1,
      rotateZ: 0
    },
    click: {
      opacity: 1,
      rotateZ: [45, 0]
    },
    keyPressed: {
      opacity: [1, 1],
      scale: [0.5, 0.5],
      rotateZ: [-45 * direction, 0].map(x => x + (360 * direction))
    }
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
      initial="initial"
      animate={controls}
      transition={{ duration: 0.25, ease: (t) => easeOutQuint(t, 0, 1, 1) }}
    >
      <motion.div className="carousel__control-bg carousel__control-bg--flash" variants={flashVariants} />
      <motion.div className="carousel__control-bg carousel__control-bg--rainbow" variants={rainbowVariants} />

      <motion.div className="carousel__button-contents" variants={contentVariants}>
        <motion.div variants={iconVariants}>
          <FaArrowLeft
            style={{
              color: 'white',
              width: '10vw',
              height: '10vw',
              stroke: '#000000',
              strokeWidth: '10px',
            }}
          />
        </motion.div>
      </motion.div>
    </motion.button>
  )
}