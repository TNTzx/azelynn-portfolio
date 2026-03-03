import type { CarouselVariants } from '@src/components';
import './SlideLoading.scss';
import { motion } from 'motion/react';
import { EASEINQUINT, EASEOUTQUINT } from '@src/utils';

function IconPathSegment({ isReverse }: { isReverse: boolean }) {
  const pathLength = 23.456764221191406;
  const offsetPercent = 0.2782;
  const offsetLength = pathLength * offsetPercent;

  const variants: CarouselVariants = {
    enter: {
      strokeDashoffset: 0,
    },
    center: {
      strokeDashoffset: [0, pathLength * 0.5].map(x => x + offsetLength),
      transition: {
        delay: 0.1,
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        repeat: Infinity,
      },
    },
    exit: {
      strokeDashoffset: pathLength * 0.5 + offsetLength,
      transition: {
        duration: 0.5,
        ease: EASEOUTQUINT
      }
    }
  }

  return (
    <svg
      viewBox="30.7 60.4 7.5 9.2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="white"
    >
      <motion.path
        d="m 33.334596,68.750799
          c -0.299935,0.524431 -0.929801,0.755447 -1.493258,0.547681
          -0.563456,-0.207766 -0.897533,-0.794221 -0.792015,-1.39034
          0.105519,-0.59612 0.620115,-1.029487 1.21998,-1.027406
          l 3.264291,-5.653918
          c 0.299935,-0.524431 0.929801,-0.755447 1.493258,-0.547681
          0.563456,0.207766 0.897533,0.794221 0.792015,1.39034
          -0.105519,0.59612 -0.620115,1.029487 -1.21998,1.027406
          z"
        strokeWidth="0.264583"
        variants={variants}
        className={`slide-loading__icon-path ${isReverse ? 'slide-loading__icon-path--reversed' : ''}`}
      />
    </svg>
  );
}

function IconPaths() {
  const moveOffsetVh = 60;

  function getVariants(isReverse: boolean): CarouselVariants {
    const signedIsReverse = isReverse ? -1 : 1;

    const endPosition = {
      x: `${moveOffsetVh / Math.tan(Math.PI / 3) * signedIsReverse * -1}vh`,
      y: `${moveOffsetVh * signedIsReverse}vh`
    }

    return {
      enter: {
        x: endPosition.x,
        y: endPosition.y,
      },
      center: {
        x: '0vh',
        y: '0vh',
        transition: {
          duration: 0.1,
          ease: 'linear'
        }
      },
      exit: {
        x: endPosition.x,
        y: endPosition.y,
        transition: {
          duration: 0.7,
          ease: EASEINQUINT
        }
      }
    }
  }

  return (
  <>
    <motion.div variants={getVariants(false)} className="slide-loading__icon-part-layer">
      <IconPathSegment isReverse={false} />
    </motion.div>

    <motion.div variants={getVariants(true)} className="slide-loading__icon-part-layer">
      <IconPathSegment isReverse={true} />
    </motion.div>
  </>
  );
}

function IconLayer() {
  return <>
    <div className="slide-loading__icon-container">
      <IconPaths />
    </div>

    <div className="slide-loading__icon-container-blur">
      <IconPaths />
    </div>
  </>
}

export default function SlideLoading() {
  return (
    <div className="slide-loading">
      <div className="slide-loading__layer--icon">
        <div className="slide-loading__icon">
          <IconLayer />
        </div>
      </div>
    </div>
  )
}