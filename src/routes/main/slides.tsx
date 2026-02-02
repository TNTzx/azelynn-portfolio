import type { CarouselSlide } from "@src/components";
import { Hello } from "@src/components/slides";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export const slides: CarouselSlide[] = [
  { hash: 'hello', element: <Hello />},
  { hash: 'slide1', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div> },
  { hash: 'slide2', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div> },
  { hash: 'slide3', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 3</div> },
]