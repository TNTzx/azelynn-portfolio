import { ImageAzel } from '@src/assets/images';
import './SlideNameCard.scss';

function Separator() {
  return (
    <b>// </b>
  )
}

function Name() {
  return (
    <div className="slide-name-card__name">
      <h2 className="slide-name-card__name-text slide-name-card__name-text--intro">
        hello there, i'm
      </h2>
      <h1 className="slide-name-card__name-text slide-name-card__name-text--title">
        AZELYNN
      </h1>
      <h2 className="slide-name-card__name-text slide-name-card__name-text--subtitle">
        aka //TNTz
      </h2>
      <h3 className="slide-name-card__name-text slide-name-card__name-text--description">
        WEB & APPLICATION DEVELOPER <Separator />
        MOTION GRAPHICS ANIMATOR
      </h3>
      <h4 className="slide-name-card__name-text slide-name-card__name-text--small">
          musician <Separator />
          digital artist <Separator />
          storywriter
      </h4>
    </div>
  )
}

function Picture() {
  return (
    <div className="slide-name-card__picture">
      <img src={ImageAzel} className="slide-name-card__picture-image" />
    </div>
  )
}

function Front() {
  return (
    <div className="slide-name-card__front">
      <div className="slide-name-card__name-container">
        <Name />
      </div>

      <div className="slide-name-card__picture-container">
        <Picture />
      </div>
    </div>
  )
}

export default function SlideNameCard() {
  return (
    <div className="slide-name-card">
      <div className="slide-name-card__layer slide-name-card__layer--front">
        <Front />
      </div>
    </div>
  )
}