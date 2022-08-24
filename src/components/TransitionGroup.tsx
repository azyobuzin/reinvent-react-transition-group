import {
  Children,
  FC,
  Key,
  PropsWithChildren,
  ReactElement,
  ReactNode,
  cloneElement,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TransitionGroupContext } from "../contexts/TransitionGroupContext";

export const TransitionGroup: FC<PropsWithChildren> = ({ children }) => {
  // 初回レンダリングかどうか
  const [isMounting, setIsMounting] = useState(true);
  useEffect(() => setIsMounting(false), []);

  // レンダリングごとにコンテキストのインスタンスが変わらないようにする
  const contextValue = useMemo(() => ({ isMounting }), [isMounting]);

  // 現在レンダリングされている children
  // eslint-disable-next-line prefer-const
  let [currentChildren, setCurrentChildren] = useState<ReactElement[]>([]);

  // 前回の children プロパティ
  const [prevChildrenProp, setPrevChildrenProp] = useState<
    ReactNode | undefined
  >();

  // children が変更されたときだけ再計算する（無限ループを防ぐ）
  if (prevChildrenProp !== children) {
    // key が設定された Element 以外は無視
    const nextChildren = Children.toArray(children).filter(
      (x) => isValidElement(x) && x.key != null
    ) as ReactElement[];

    // 削除ハンドラー
    const deleteChild = (key: Key): void => {
      setCurrentChildren((currentChildren) =>
        currentChildren.filter((x) => x.key !== key)
      );
    };

    currentChildren = calculateNewChildren(
      currentChildren,
      nextChildren,
      deleteChild
    );

    setPrevChildrenProp(children);
    setCurrentChildren(currentChildren);
  }

  return (
    <TransitionGroupContext.Provider value={contextValue}>
      {currentChildren}
    </TransitionGroupContext.Provider>
  );
};

// 実際にレンダリングする children を計算する
function calculateNewChildren(
  currentChildren: ReactElement[],
  nextChildren: ReactElement[],
  deleteChild: (key: Key) => void
): ReactElement[] {
  const currentKeySet = new Set(currentChildren.map((x) => x.key));
  const nextKeySet = new Set(nextChildren.map((x) => x.key));
  const newChildren: ReactElement[] = [];
  let currentIndex = 0;
  let nextIndex = 0;

  while (
    currentIndex < currentChildren.length ||
    nextIndex < nextChildren.length
  ) {
    if (currentIndex < currentChildren.length) {
      const currentChild = currentChildren[currentIndex];
      if (!nextKeySet.has(currentChild.key)) {
        // 削除
        const key = currentChild.key!;
        const onExited = (): void => deleteChild(key);
        newChildren.push(cloneElement(currentChild, { in: false, onExited }));
        currentIndex++;
        continue;
      }
    }

    const nextChild = nextChildren[nextIndex];
    newChildren.push(cloneElement(nextChild, { in: true }));

    if (currentKeySet.has(nextChild.key)) {
      // 変更反映
      currentIndex++;
      nextIndex++;
    } else {
      // 追加
      nextIndex++;
    }
  }

  return newChildren;
}
