import { useState } from "react";
import "./Instructions.scss";
import type { InstructionsProps } from "./InstructionsTypes";
import { FaChevronDown } from "react-icons/fa";

export default function Instructions(props: InstructionsProps) {
  const [isShown, setIsShown] = useState(true);

  return <>
    {isShown &&
      <div className="instructions">
        <div className="instructions__controls">
          <button className="instructions__close-button">
            <FaChevronDown style={{ width: 20, height: 20 }}/>
          </button>
        </div>
        <div className="instructions__content">
          <h3
            className="instructions__text"
            data-desktop={props.desktop}
            data-tablet={props.tablet}
            data-mobile={props.mobile}
          />
        </div>
      </div>
    }
  </>;
}