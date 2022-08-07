import { FC, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Transition } from "../components/Transition";

const TransitionApp: FC = () => {
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

      <Transition in={isIn} timeout={1000}>
        {(state) => <p>{state}</p>}
      </Transition>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransitionApp />
  </StrictMode>
);
