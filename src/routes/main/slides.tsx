import type { CarouselSlide } from "@src/components";
import Hello from "@src/components/slides/hello/Hello";
import HelloWorld from "@src/components/slides/helloWorld/HelloWorld";

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color + "88";
}

export const slides: CarouselSlide[] = [
  {
    hash: 'helloworld',
    displayName: 'Hello World',
    getElement: (animationContext) =>
      <HelloWorld animationContext={animationContext} />
  },
  {
    hash: 'slide1',
    displayName: 'Slide 1',
    getElement: () =>
      <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div>
  },
  {
    hash: 'hello',
    displayName: 'Hello',
    getElement: (animationContext) =>
      <Hello animationContext={animationContext} />
  },
  {
    hash: 'slide2',
    displayName: 'Slide 2',
    getElement: () =>
      <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div>
  },
]