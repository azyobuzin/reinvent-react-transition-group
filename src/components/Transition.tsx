import { FC, ReactNode, useContext, useEffect, useState } from "react";
import { TransitionGroupContext } from "../contexts/TransitionGroupContext";

// eslint-disable-next-line @typescript-eslint/sort-type-union-intersection-members
export type TransitionStatus = "entering" | "entered" | "exiting" | "exited";

export interface TransitionProps {
  // 遷移状態
  // true ならば enter, false なら exit
  in?: boolean;

  // entering, exiting の継続時間 (ms)
  timeout: number;

  // 遷移状態に対応するレンダー関数
  children?: ReactNode | ((state: TransitionStatus) => ReactNode);

  // 状態遷移時のイベント
  // entering になる前に発生
  onEnter?: () => void;
  // entering になった後に発生
  onEntering?: () => void;
  // entered になった後に発生
  onEntered?: () => void;
  // exiting になる前に発生
  onExit?: () => void;
  // exiting になった後に発生
  onExiting?: () => void;
  // exited になった後に発生
  onExited?: () => void;
}

interface InternalState {
  // 公開する遷移状態
  status: TransitionStatus;
  // この状態に遷移したときにイベントを発生したか
  emitted: boolean;
  // setTimeout の戻り値
  timeoutID?: number;
}

export const Transition: FC<TransitionProps> = (props) => {
  const isIn = props.in ?? false;

  // TransitionGroup 内で作成された Transition は entering から開始する
  const enterOnMount = useContext(TransitionGroupContext)?.isMounting === false;

  const [state, setState] = useState<InternalState>({
    status: isIn ? (enterOnMount ? "entering" : "entered") : "exited",
    emitted: true,
  });

  // 前回レンダーしたときの in の値
  const [prevIn, setPrevIn] = useState(isIn && !enterOnMount);

  // in が変化したならば、状態遷移を開始する
  useEffect(() => {
    if (isIn !== prevIn) {
      setPrevIn(isIn);

      if (isIn) {
        // enter

        // exiting ならばキャンセル
        if (state.timeoutID != null) clearTimeout(state.timeoutID);

        // 遷移開始
        if (props.onEnter) props.onEnter();
        setState({
          status: "entering",
          emitted: false,
          timeoutID: setTimeout(
            () => setState({ status: "entered", emitted: false }),
            props.timeout
          ),
        });
      } else {
        // exit

        // entering ならばキャンセル
        if (state.timeoutID != null) clearTimeout(state.timeoutID);

        // 遷移開始
        if (props.onExit) props.onExit();
        setState({
          status: "exiting",
          emitted: false,
          timeoutID: setTimeout(
            () => setState({ status: "exited", emitted: false }),
            props.timeout
          ),
        });
      }
    }
  }, [isIn, prevIn, state]);

  // 遷移後のレンダリングが終わったらイベントを発生する
  useEffect(() => {
    if (state.emitted) return;

    const eventHandler = {
      entering: props.onEntering,
      entered: props.onEntered,
      exiting: props.onExiting,
      exited: props.onExited,
    }[state.status];

    if (eventHandler) eventHandler();

    setState({ ...state, emitted: true });
  }, [state]);

  return (
    <>
      {(typeof props.children === "function"
        ? props.children(state.status)
        : props.children) ?? null}
    </>
  );
};
