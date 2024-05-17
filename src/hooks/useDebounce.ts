import { useEffect, useMemo, useRef } from "react";
import { debounce } from "../lib/utils";

export const useDebounce = <TCallback extends (...args: any[]) => any>(
  callback: TCallback
) => {
  const ref = useRef<TCallback>();

  useEffect(() => {
    ref.current = callback;
  }, [callback]);

  const debouncedCallback = useMemo(() => {
    const func = () => {
      ref.current?.();
    };

    return debounce(func, 5000);
  }, []);

  return debouncedCallback;
};
