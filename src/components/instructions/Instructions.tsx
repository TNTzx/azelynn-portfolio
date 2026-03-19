import { useState } from "react";
import "./Instructions.scss";
import type { InstructionsProps } from "./InstructionsTypes";

export default function Instructions(props: InstructionsProps) {
  const [isShown, setIsShown] = useState(true);

  return (
    <div className="instructions">
      <div className="instructions__inner">
        <h3
          className="instructions__text"
          data-desktop={props.desktop}
          data-tablet={props.tablet}
          data-mobile={props.mobile}
        />
      </div>
    </div>
  );
}