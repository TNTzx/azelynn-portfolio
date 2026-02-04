import CarouselButtons from "./carouselButtons/CarouselButtons";
import CarouselSwipes from "./carouselSwipes/CarouselSwipes";
import type { CarouselControlsProps } from "./carouselControlsTypes";
import './CarouselControls.scss'

export default function CarouselControls({ swipePercent, switchScreen = () => {} }: CarouselControlsProps) {
  return (
    <div className="carousel__controls">
      <div className="carousel__control-container carousel__control-container--buttons">
        <CarouselButtons onClick={(direction) => switchScreen(direction)} />
      </div>

      <div className="carousel__control-container carousel__control-container--swipes">
        <CarouselSwipes swipePercent={swipePercent} />
      </div>
    </div>
  )
}