import Back from './layers/back/Back';
import Front from './layers/front/Front';
import Mid from './layers/mid/Mid';
import './SlideNameCard.scss';

export default function SlideNameCard() {
  return (
    <div className="slide-name-card">
      <div className="slide-name-card__layer slide-name-card__layer--front">
        <Front />
      </div>

      <div className="slide-name-card__layer slide-name-card__layer--mid">
        <Mid />
      </div>

      <div className="slide-name-card__layer slide-name-card__layer--back">
        <Back />
      </div>
    </div>
  )
}