import { useStore } from "@nanostores/react";
import { type WritableAtom } from "nanostores";

type Updater<T> = T | ((prevState: T) => T);

const useNanoStor = <T extends WritableAtom<any>>(
  store: T,
): [ReturnType<T["get"]>, (updater: Updater<ReturnType<T["get"]>>) => void] => {
  const state = useStore(store);

  const setState = (updater: Updater<ReturnType<T["get"]>>) => {
    if (typeof updater === "function") {
      store.set(
        (updater as (prevState: ReturnType<T["get"]>) => ReturnType<T["get"]>)(
          state as ReturnType<T["get"]>,
        ),
      );
    } else {
      store.set(updater);
    }
  };

  return [state as ReturnType<T["get"]>, setState];
};

export default useNanoStor;
