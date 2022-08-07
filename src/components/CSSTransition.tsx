import { FC, ReactElement, ReactNode, cloneElement, useState } from "react";
import { Transition, TransitionProps, TransitionStatus } from "./Transition";

export interface CSSTransitionProps extends Omit<TransitionProps, "children"> {
  classNames: {
    enter?: string;
    enterActive?: string;
    enterDone?: string;
    exit?: string;
    exitActive?: string;
    exitDone?: string;
  };

  // className を適用する必要があるので、子はひとつの Element とする
  children?:
    | ReactElement
    | ((state: TransitionStatus) => ReactElement | null)
    | null;
}

export const CSSTransition: FC<CSSTransitionProps> = ({
  classNames,
  children,
  onEnter,
  onEntering,
  onEntered,
  onExit,
  onExiting,
  onExited,
  ...rest
}) => {
  // 適用するクラス
  const [transitionClassName, setTransitionClassName] = useState(
    rest.in ? [classNames.enterDone] : [classNames.exitDone]
  );

  // イベントハンドラ
  const eventHandlers = {
    onEnter(): void {
      setTransitionClassName([classNames.enter]);
      if (onEnter) onEnter();
    },
    onEntering(): void {
      setTransitionClassName([classNames.enter, classNames.enterActive]);
      if (onEntering) onEntering();
    },
    onEntered(): void {
      setTransitionClassName([classNames.enterDone]);
      if (onEntered) onEntered();
    },
    onExit(): void {
      setTransitionClassName([classNames.exit]);
      if (onExit) onExit();
    },
    onExiting(): void {
      setTransitionClassName([classNames.exit, classNames.exitActive]);
      if (onExiting) onExiting();
    },
    onExited(): void {
      setTransitionClassName([classNames.exitDone]);
      if (onExited) onExited();
    },
  };

  if (typeof children === "function") {
    return (
      <Transition {...rest} {...eventHandlers}>
        {(state) => applyClassName(children(state), transitionClassName)}
      </Transition>
    );
  } else {
    return (
      <Transition {...rest} {...eventHandlers}>
        {applyClassName(children, transitionClassName)}
      </Transition>
    );
  }
};

function applyClassName(
  childElement: ReactElement | null | undefined,
  transitionClassName: (string | undefined)[]
): ReactNode {
  if (childElement == null) return null;

  // もともと指定されていた className に加えて、遷移状態の className を追加する
  const className = [childElement.props.className, ...transitionClassName]
    .filter((x) => x != null)
    .join(" ");
  return cloneElement(childElement, { className });
}
