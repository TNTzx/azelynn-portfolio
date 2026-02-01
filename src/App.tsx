import './App.css'
import { Carousel, type CarouselSlide } from './components'

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const slides: CarouselSlide[] = [
  { route: 'slide1', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div> },
  { route: 'slide2', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div> },
  { route: 'slide3', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 3</div> },
]

export default function App() {

  return (
    <Carousel slides={slides} currentSlide='slide1'/>
  )
}