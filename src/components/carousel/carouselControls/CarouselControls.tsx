import CarouselButtons from "./carouselButtons/CarouselButtons";
import CarouselSwipes from "./carouselSwipes/CarouselSwipes";
import type { CarouselControlsProps } from "./carouselControlsTypes";
import './CarouselControls.scss'

export default function CarouselControls({ swipePercent, switchScreen = () => {} }: CarouselControlsProps) {
  function onKeyUp(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowLeft') {
      switchScreen(-1);
    }

    if (event.key === 'ArrowRight') {
      switchScreen(1);
    }
  }

  return (
    <div
      tabIndex={0}
      onKeyUp={onKeyUp}
      className="carousel__controls"
    >
      <div className="carousel__control-container carousel__control-container--buttons">
        <CarouselButtons onClick={(direction) => switchScreen(direction)} />
      </div>

      <div className="carousel__control-container carousel__control-container--swipes">
        <CarouselSwipes swipePercent={swipePercent} />
      </div>
    </div>
  )
}