import './Carousel.css';
import '@src/styles/layer.css';

export default function Carousel() {
  return (
    <div className="carousel">
      <div className="carousel__buttons layer">
        <button className="carousel__button carousel__button--left">Left</button>
        <button className="carousel__button carousel__button--right">Right</button>
      </div>
    </div>
  );
}