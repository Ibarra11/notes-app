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
