import { ImageAzel, ImageBeach } from '@src/assets/images';
import './SlideNameCard.scss';

function Separator() {
  return (
    <b>// </b>
  )
}

function Name() {
  return (
    <div className="slide-name-card__name">
      <div className="slide-name-card__name-text-container">
        <h2 className="slide-name-card__name-text slide-name-card__name-text--intro">
          hello there, i'm
        </h2>
      </div>

      <div className="slide-name-card__name-text-container">
        <h1 className="slide-name-card__name-text slide-name-card__name-text--title">
          AZELYNN
        </h1>
      </div>

      <div className="slide-name-card__name-text-container">
        <h2 className="slide-name-card__name-text slide-name-card__name-text--subtitle">
          aka //TNTz
        </h2>
      </div>
  
      <div className="slide-name-card__name-text-container">
        <h3 className="slide-name-card__name-text slide-name-card__name-text--description">
          WEB & APPLICATION DEVELOPER <Separator />
          MOTION GRAPHICS ANIMATOR
        </h3>
      </div>

      <div className="slide-name-card__name-text-container">
        <h4 className="slide-name-card__name-text slide-name-card__name-text--small">
            musician <Separator />
            digital artist <Separator />
            storywriter
        </h4>
      </div>

    </div>
  )
}

function Picture() {
  return (
    <div className="slide-name-card__image-azel">
      <img src={ImageAzel} className="slide-name-card__image-azel-element" />
    </div>
  )
}

function Front() {
  return (
    <div className="slide-name-card__front">
      <div className="slide-name-card__name-container">
        <Name />
      </div>

      <div className="slide-name-card__image-azel-container">
        <Picture />
      </div>
    </div>
  )
}

function Back() {
  return (
    <div className="slide-name-card__back">
      <img src={ImageBeach} className="slide-name-card__image-beach-element" />
    </div>
  )
}

export default function SlideNameCard() {
  return (
    <div className="slide-name-card">
      <div className="slide-name-card__layer slide-name-card__layer--front">
        <Front />
      </div>

      <div className="slide-name-card__layer slide-name-card__layer--back">
        <Back />
      </div>
    </div>
  )
}