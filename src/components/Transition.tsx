import {
  FC,
  ReactNode,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
    status: isIn && !enterOnMount ? "entered" : "exited",
    emitted: true,
  });

  // 次の状態。変化しないなら null
  const nextStatus =
    isIn && state.status.includes("exit")
      ? "entering"
      : !isIn && state.status.includes("enter")
      ? "exiting"
      : null;

  // in が変化したならば、状態遷移を開始する
  useLayoutEffect(() => {
    if (nextStatus == null) return;

    // 前回の遷移をキャンセル
    if (state.timeoutID != null) clearTimeout(state.timeoutID);

    // 遷移前イベントを発生
    const eventHandler =
      nextStatus === "entering" ? props.onEnter : props.onExit;
    if (eventHandler) eventHandler();

    // 遷移開始
    setState({
      status: nextStatus,
      emitted: false,
      timeoutID: setTimeout(
        () =>
          setState({
            status: nextStatus === "entering" ? "entered" : "exited",
            emitted: false,
          }),
        props.timeout
      ),
    });
  }, [state, isIn]);

  // 遷移後のレンダリングが終わったらイベントを発生する
  useEffect(() => {
    // すでにイベント発生済みか、別の遷移が開始されたなら何もしない
    if (state.emitted || nextStatus) return;

    const eventHandler = {
      entering: props.onEntering,
      entered: props.onEntered,
      exiting: props.onExiting,
      exited: props.onExited,
    }[state.status];

    if (eventHandler) eventHandler();

    setState({ ...state, emitted: true });
  }, [state, nextStatus]);

  return (
    <>
      {(typeof props.children === "function"
        ? props.children(state.status)
        : props.children) ?? null}
    </>
  );
};
