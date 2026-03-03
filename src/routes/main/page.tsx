import Carousel from '@src/components/carousel/Carousel';
import { type CarouselSlide } from '@src/components';
import './style.css';
import { useNavigate, useParams } from 'react-router';
import { slides } from './slides';
import SlideLoading from '@src/components/slides/loading/SlideLoading';

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
    <Carousel
      slides={slides}
      currentSlide={currentSlideHash}
      onScreenChange={onScreenChange}
      loadingSlide={<></>}
      debounceDelayMs={1000}
    />
  );
}