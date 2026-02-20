import Carousel from '@src/components/carousel/Carousel';
import { type CarouselSlide } from '@src/components';
import './style.css';
import { useLocation } from 'react-router';
import { slides } from './slides';
import SlideLoading from '@src/components/slides/loading/SlideLoading';

export default function Main() {
  const location = useLocation();

  const currentSlideHash = (() => {
    if (!location.hash) {
      return slides[0].hash;
    }

    const foundHash = /#([a-z0-9]+)/.exec(location.hash)?.[1];
    if (!foundHash) {
      throw new Error(`Invalid hash format: "${location.hash}"`);
    }

    return foundHash;
  })();

  function onScreenChange(newSlide: CarouselSlide) {
    window.location.hash = `#${newSlide.hash}`;
  }

  return (
    <Carousel
      slides={slides}
      currentSlide={currentSlideHash}
      onScreenChange={onScreenChange}
      loadingSlide={<SlideLoading />}
      debounceDelayMs={1000}
    />
  );
}