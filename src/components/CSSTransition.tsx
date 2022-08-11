import { FC, ReactElement, ReactNode, cloneElement, useState } from "react";
import { Transition, TransitionProps, TransitionStatus } from "./Transition";

interface ClassNames {
  enter?: string;
  enterActive?: string;
  enterDone?: string;
  exit?: string;
  exitActive?: string;
  exitDone?: string;
}

export interface CSSTransitionProps extends Omit<TransitionProps, "children"> {
  classNames?: ClassNames | string;

  // className を適用する必要があるので、子はひとつの Element とする
  children?:
    | ReactElement
    | ((state: TransitionStatus) => ReactElement | null)
    | null;
}

export const CSSTransition: FC<CSSTransitionProps> = ({
  classNames = "",
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
  const [transitionClassName, setTransitionClassName] = useState<
    (string | undefined)[]
  >([]);

  let classNamesObj: ClassNames;
  if (typeof classNames === "string") {
    const prefix = classNames ? classNames + "-" : "";
    classNamesObj = {
      enter: prefix + "enter",
      enterActive: prefix + "enter-active",
      enterDone: prefix + "enter-done",
      exit: prefix + "exit",
      exitActive: prefix + "exit-active",
      exitDone: prefix + "exit-done",
    };
  } else {
    classNamesObj = classNames;
  }

  // イベントハンドラ
  const eventHandlers = {
    onEnter(): void {
      setTransitionClassName([classNamesObj.enter]);
      if (onEnter) onEnter();
    },
    onEntering(): void {
      setTransitionClassName([classNamesObj.enter, classNamesObj.enterActive]);
      if (onEntering) onEntering();
    },
    onEntered(): void {
      setTransitionClassName([classNamesObj.enterDone]);
      if (onEntered) onEntered();
    },
    onExit(): void {
      setTransitionClassName([classNamesObj.exit]);
      if (onExit) onExit();
    },
    onExiting(): void {
      setTransitionClassName([classNamesObj.exit, classNamesObj.exitActive]);
      if (onExiting) onExiting();
    },
    onExited(): void {
      setTransitionClassName([classNamesObj.exitDone]);
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
