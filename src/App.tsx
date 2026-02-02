import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
// import { Carousel, type CarouselSlide } from './components'
import { Main } from './routes'

// function getRandomColor() {
//   var letters = '0123456789ABCDEF';
//   var color = '#';
//   for (var i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// const slides: CarouselSlide[] = [
//   { route: 'slide1', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 1</div> },
//   { route: 'slide2', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 2</div> },
//   { route: 'slide3', element: <div style={{ width: '100%', height: '100%', backgroundColor: getRandomColor() }}>Slide 3</div> },
// ]

export default function App() {
  // return (
  //   <Carousel slides={slides} currentSlide='slide1'/>
  // )

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Navigate to="/main" />} />
        <Route path='/main' element={<Main />} />
      </Routes>
    </BrowserRouter>
  )
}