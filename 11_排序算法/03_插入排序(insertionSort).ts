import { measureSort } from "hy-algokit";
import { testSort } from "./utils";

export function insertionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 1; i < n; i++) {
    let newNum = arr[i];
    let j = i - 1;
    while (arr[j] > newNum && j >= 0) {
      arr[j + 1] = newNum;
      j--;
    }

    arr[j + 1] = newNum;
  }
  return arr;
}
testSort(insertionSort);
// measureSort(insertionSort);
