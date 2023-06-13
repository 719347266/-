import { measureSort } from "hy-algokit";
// import { testSort, swap, measureSort } from "hy-algokit";
import { swap, testSort } from "./utils";

export default function bubbleSort(arr: number[]) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let swapped = false;
    // 外循环一次 等于内循环是i * n次 所以 j < i = 当前外循环的值, 1 = 每循环一次完成的值 (最后一位不需要比较)
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

// testSort(bubbleSort);
measureSort(bubbleSort);
