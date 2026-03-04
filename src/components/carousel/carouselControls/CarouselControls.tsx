import CarouselButtons from "./carouselButtons/CarouselButtons";
import CarouselSwipes from "./carouselSwipes/CarouselSwipes";
import type { CarouselControlsProps } from "./carouselControlsTypes";
import './CarouselControls.scss'
import { useViewport } from "@src/hooks";

export default function CarouselControls({ swipePercent, keyPressed, switchScreen = () => {}, isLeftDisabled, isRightDisabled }: CarouselControlsProps) {
  const viewport = useViewport();

  return (
    <div className="carousel__controls">
      <div className="carousel__control-container carousel__control-container--buttons">
        <CarouselButtons keyPressed={keyPressed} onClick={(direction) => switchScreen(direction)} isLeftDisabled={isLeftDisabled} isRightDisabled={isRightDisabled} />
      </div>

      {viewport.width < 992 && (
        <div className="carousel__control-container carousel__control-container--swipes">
          <CarouselSwipes swipePercent={swipePercent} switchScreen={switchScreen} isLeftDisabled={isLeftDisabled} isRightDisabled={isRightDisabled} />
        </div>
      )}
    </div>
  )
}