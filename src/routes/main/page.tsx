import { Carousel, type CarouselSlide } from '@src/components';
import './style.css';
import { useLocation } from 'react-router';
import { slides } from './slides';

const loadingSlide = (
  <h1>Loading...</h1>
)

export default function Main() {
  const location = useLocation();

  let currentSlideHash = slides[0].hash;
  if (location.hash !== '') {
    const foundHash = /#([a-z0-9]+)/.exec(location.hash)?.[1];
    if (foundHash === undefined) throw new Error(`Invalid hash format: "${location.hash}"`);
    currentSlideHash = foundHash;
  } else {
    window.location.hash = `#${currentSlideHash}`;
  }


  function onScreenChange(newSlide: CarouselSlide) {
    window.location.hash = `#${newSlide.hash}`;
  }
 
  return (
    <Carousel
      slides={slides}
      currentSlide={currentSlideHash}
      onScreenChange={onScreenChange}
      loadingSlide={loadingSlide}
      debounceDelayMs={1000}
    />
  )
}