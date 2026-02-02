import { Carousel, type CarouselSlide } from '@src/components';
import './style.css';
import { useLocation } from 'react-router';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const slides: CarouselSlide[] = [
  { hash: 'slide1', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div> },
  { hash: 'slide2', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div> },
  { hash: 'slide3', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 3</div> },
]

export default function Main() {
  const location = useLocation();

  let currentSlideHash = slides[0].hash;
  if (location.hash !== '') {
    const foundHash = /#([a-z0-9]+)/.exec(location.hash)?.[1];
    if (foundHash === undefined) throw new Error(`Invalid hash format: "${location.hash}"`);
    currentSlideHash = foundHash;
  }
 
  return (
    <Carousel slides={slides} currentSlide={currentSlideHash} />
  )
}