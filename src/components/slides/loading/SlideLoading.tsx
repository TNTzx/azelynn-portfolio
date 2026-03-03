import type { CarouselVariants } from '@src/components';
import './SlideLoading.scss';
import { motion } from 'motion/react';

function IconPathSegment({ isReverse }: { isReverse: boolean }) {
  const pathLength = 23.456764221191406;
  const offsetPercent = 0.2782;
  const offsetLength = pathLength * offsetPercent;

  const variants: CarouselVariants = {
    enter: {},
    center: {
      strokeDashoffset: [0, pathLength * 0.5].map(x => x + offsetLength),
      transition: {
        duration: 0.9,
        ease: [0.22, 1, 0.36, 1],
        repeat: Infinity,
      }
    },
    exit: {}
  }

  return (
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
      stroke-width="0.264583"
      variants={variants}
      className={`slide-loading__icon-path ${isReverse ? 'slide-loading__icon-path--reversed' : ''}`}
    />
  );
}

function IconPaths() {
  return (
   <svg
      viewBox="30.7 60.4 7.5 9.2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="white"
    >
      <IconPathSegment isReverse={false} />
      <IconPathSegment isReverse={true} />
    </svg>
  );
}

export default function SlideLoading() {
  return (
    <div className="slide-loading">
      <div className="slide-loading__icon">
        <div className="slide-loading__icon-inner">
          <IconPaths />
        </div>
      </div>
    </div>
  )
}