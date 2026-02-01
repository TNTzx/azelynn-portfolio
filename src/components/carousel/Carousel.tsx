import './Carousel.css';
import '@src/styles/layer.css';

export default function Carousel() {
  return (
    <div className="carousel">
      <div className="carousel__buttons layer">
        <div className="carousel__button-container carousel__button-container--left">
          <button className="carousel__button carousel__button--left">Left</button>
        </div>

        <div className="carousel__button-container carousel__button-container--right">
          <button className="carousel__button carousel__button--right">Right</button>
        </div>
      </div>
    </div>
  );
}