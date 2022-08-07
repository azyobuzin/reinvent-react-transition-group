import { FC, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { Transition } from "../components/Transition";
import { TransitionGroup } from "../components/TransitionGroup";

interface ItemProps {
  name: string;
  state: string;
  onDelete: () => void;
}

const Item: FC<ItemProps> = ({ name, state, onDelete }) => {
  return (
    <li>
      {`(${state}) ${name} `}
      <button onClick={onDelete}>Delete</button>
    </li>
  );
};

const TransitionGroupApp: FC = () => {
  const [{ itemCounter, items }, setState] = useState({
    itemCounter: 2,
    items: ["Item 1"],
  });
  const setItems = (items: string[]): void =>
    setState({ itemCounter: itemCounter + 1, items });

  const handleAddFirst = (): void => {
    setItems([`Item ${itemCounter}`, ...items]);
  };

  const handleAddMiddle = (): void => {
    const half = Math.floor(items.length / 2);
    setItems([
      ...items.slice(0, half),
      `Item ${itemCounter}`,
      ...items.slice(half),
    ]);
  };

  const handleAddLast = (): void => {
    setItems([...items, `Item ${itemCounter}`]);
  };

  return (
    <div>
      <p>
        <button onClick={handleAddFirst}>先頭に追加</button>
        <button onClick={handleAddMiddle}>中央に追加</button>
        <button onClick={handleAddLast}>末尾に追加</button>
      </p>

      <ul>
        <TransitionGroup>
          {items.map((x, i) => {
            const handleDelete = (): void => {
              const newItems = [...items];
              newItems.splice(i, 1);
              setState({ itemCounter, items: newItems });
            };
            return (
              <Transition key={x} timeout={1000}>
                {(state) => (
                  <Item name={x} state={state} onDelete={handleDelete} />
                )}
              </Transition>
            );
          })}
        </TransitionGroup>
      </ul>
    </div>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <TransitionGroupApp />
  </StrictMode>
);
