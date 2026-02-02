import type { CarouselSlide } from "@src/components";
import { Hello } from "@src/components/slides";

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "88";
}

export const slides: CarouselSlide[] = [
  {
    hash: 'slide1',
    getElement: () =>
      <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div>
  },
  {
    hash: 'hello',
    getElement: (animationContext) =>
      <Hello animationContext={animationContext} />
  },
  {
    hash: 'slide2',
    getElement: () =>
      <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div>
  },
]