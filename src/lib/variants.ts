import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

export { tv };

export function cn(...inputs: (string | undefined | null | false | 0)[]) {
  return twMerge(...inputs.filter((x): x is string => typeof x === "string"));
}