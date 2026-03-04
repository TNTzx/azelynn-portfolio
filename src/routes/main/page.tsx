import Carousel from '@src/components/carousel/Carousel';
import { type CarouselSlide } from '@src/components';
import './style.scss';
import { useNavigate, useParams } from 'react-router';
import { slides } from './slides';
import SlideLoading from '@src/components/slides/loading/SlideLoading';
import Debug from '@src/components/debug/debug';

export const ROUTE_NAME = "main";

export default function Main() {
  const { slide } = useParams();
  const navigate = useNavigate();

  const currentSlideHash =
    slides.find(s => s.hash === slide)?.hash ?? slides[0].hash;

  function onScreenChange(newSlide: CarouselSlide) {
    navigate(`/main/${newSlide.hash}`, { replace: true });
  }

  return (
    <div className="page-main">
      <div className="page-main__layer page-main__layer--debug">
        <Debug />
      </div>

      <div className="page-main__layer page-main__layer--carousel">
        <Carousel
          slides={slides}
          currentSlide={currentSlideHash}
          onScreenChange={onScreenChange}
          loadingSlide={<SlideLoading />}
          debounceDelayMs={1000}
        />
      </div>
    </div>
  );
}