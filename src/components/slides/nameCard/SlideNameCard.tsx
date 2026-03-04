import type { CarouselVariants } from '@src/components';
import './SlideNameCard.scss';
import { motion } from 'motion/react';

function Name() {
  return (
    <div className="slide-name-card__name">
      Test
    </div>
  )
}

function Front() {
  return <>
    <div className="slide-name-card__name-container">
      <Name />
    </div>
  </>
}

export default function SlideNameCard() {
  return (
    <div className="slide-name-card">
      <div className="slide-name-card__layer slide-name-card__layer--front">
        <Front />
      </div>
    </div>
  )
}