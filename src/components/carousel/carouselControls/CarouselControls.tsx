import CarouselButtons from "./carouselButtons/CarouselButtons";
import CarouselSwipes from "./carouselSwipes/CarouselSwipes";
import type { CarouselControlsProps } from "./carouselControlsTypes";
import './CarouselControls.scss'

export default function CarouselControls({ swipePercent, keyPressed, switchScreen = () => {}, isLeftDisabled, isRightDisabled }: CarouselControlsProps) {
  return (
    <div className="carousel__controls">
      <div className="carousel__control-container carousel__control-container--buttons">
        <CarouselButtons keyPressed={keyPressed} onClick={(direction) => switchScreen(direction)} isLeftDisabled={isLeftDisabled} isRightDisabled={isRightDisabled} />
      </div>

      <div className="carousel__control-container carousel__control-container--swipes">
        <CarouselSwipes swipePercent={swipePercent} switchScreen={switchScreen} isLeftDisabled={isLeftDisabled} isRightDisabled={isRightDisabled} />
      </div>
    </div>
  )
}