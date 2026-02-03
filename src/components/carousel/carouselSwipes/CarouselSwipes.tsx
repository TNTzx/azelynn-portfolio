import { useSwipeable } from 'react-swipeable';
import './CarouselSwipes.scss';

export default function CarouselSwipes() {
  const wawa = useSwipeable({
    delta: 0.1,
    onSwiping: (e) => {
      console.log(e);
    }
  })

  return (
    <div>Carousel Swipes Component</div>
  );
}