import { measureSort } from "hy-algokit";
import { swap, testSort } from "./utils";

function quickSort(arr: number[]): number[] {
  partition(0, arr.length - 1);

  function partition(left: number, right: number) {
    if (left >= right) return;
    // 1.基准元素
    const pivot = arr[right];

    // 2.双指针进行交换操作(左边都是比pivot小的数字, 右边都是比pivot大的数字)
    let i = left;
    let j = right - 1;

    while (i <= j) {
      // 找到比基准元素大的
      while (arr[i] < pivot) {
        i++;
      }
      // 找到比基准元素小的
      while (arr[j] > pivot) {
        j--;
      }

      // 说明我们已经找到了(比pivot大的元素i)和(比pivot小的j的元素)
      if (i <= j) {
        swap(arr, i, j);
        i++;
        j--;
      }
    }

    // 将pivot放在正确的位置
    // 一轮循环已经完毕 已经没有比基准节点 小的节点
    // 需要将基准节点放入i的位置
    swap(arr, i, right);

    // 左右继续划分区域
    partition(left, j);
    partition(i + 1, right);
  }

  return arr;
}

// testSort(quickSort);
measureSort(quickSort, 1000000);
