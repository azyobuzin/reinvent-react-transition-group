import { FC, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { CSSTransition } from "react-transition-group";

const CSSTransitionApp: FC = () => {
  const [isIn, setIn] = useState(false);
  return (
    <div>
      <p>
        <label>
          <input
            type="checkbox"
            checked={isIn}
            onChange={(ev) => setIn(ev.target.checked)}
          />
          in
        </label>
      </p>

      <CSSTransition in={isIn} timeout={1000}>
        {(state) => <p>{state}</p>}
      </CSSTransition>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CSSTransitionApp />
  </StrictMode>
);
