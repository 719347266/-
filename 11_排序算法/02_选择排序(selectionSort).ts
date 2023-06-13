import { testSort, measureSort } from "hy-algokit";
import { swap } from "./utils";
function selectionSort(arr: number[]): number[] {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minNuber = i;
    for (let j = i; j < n; j++) {
      if (arr[j] < arr[minNuber]) {
        minNuber = j;
      }
    }
    swap(arr, i, minNuber);
  }
  return arr;
}

// testSort(selectionSort);
measureSort(selectionSort);
