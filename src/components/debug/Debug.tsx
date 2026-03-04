import { useViewport } from '@src/hooks';
import './Debug.scss';

export default function Debug() {
  const viewport = useViewport();
  const screenWidth = viewport.width;

  let breakpoint: string;
  if (screenWidth < 576) breakpoint = 'xs';
  else if (screenWidth < 768) breakpoint = 'sm';
  else if (screenWidth < 992) breakpoint = 'md';
  else if (screenWidth < 1200) breakpoint = 'lg';
  else breakpoint = 'xl';

  return (
    <div className="debug">
      <div className="debug__header">
        <h1 className="debug__header-text debug__header-text--title">DEBUG PANEL</h1>
        <p className="debug__header-text">
          This panel is meant for debugging purposes. You might ask, "Why create this panel?", and to that I say, "Why not?" --
          Open or close by hitting F3 on keyboards or tapping the screen incredibly fast on mobile devices.
        </p>
      </div>

      <div className="debug__content">
        <div className="debug__content-section debug__content-section--red">
          <h2 className="debug__content-section-text debug__content-section-text--label">Screen Width</h2>
          <h1 className="debug__content-section-text debug__content-section-text--value">{screenWidth}px</h1>
        </div>
        <div className="debug__content-section debug__content-section--orange">
          <h2 className="debug__content-section-text debug__content-section-text--label">Breakpoint</h2>
          <h1 className="debug__content-section-text debug__content-section-text--value">{breakpoint}</h1>
        </div>
      </div>
    </div>
  )
}