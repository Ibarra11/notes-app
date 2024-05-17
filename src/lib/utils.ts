import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function minDelay<T>(result: Promise<T>, ms: number) {
  const promise = new Promise((res) => {
    setTimeout(res, ms);
  });
  const [p] = await Promise.all([result, promise]);

  return p;
}
export function debounce<TArgs extends any[]>(
  callback: (...args: TArgs) => any,
  wait: number
) {
  let timeoutId: undefined | number = undefined;
  return (...args: TArgs) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  };
}
