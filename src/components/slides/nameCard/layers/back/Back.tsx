import { ImageBeach } from "@src/assets/images";
import './Back.scss'

export default function Back() {
  return (
    <div className="slide-name-card__back">
      <img src={ImageBeach} className="slide-name-card__image-beach-element" />
    </div>
  )
}