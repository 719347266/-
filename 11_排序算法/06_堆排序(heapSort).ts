import { testSort, swap, cbtPrint, measureSort } from "hy-algokit";

export default function heapSort(arr: number[]): number[] {
  // 1.获取数组的长度
  const n = arr.length;

  // 2.对arr进行原地建堆
  // 2.1. 从第一个非叶子节点开始进行下滤操作
  const start = Math.floor((n - 1) / 2);
  // 原地建堆 (最大堆)
  for (let i = start; i >= 0; i--) {
    console.log(i);
    // 2.2. 进行下滤操作
    heapifyDown(arr, n, i);
  }

  console.log(arr, "aaa");

  // 3.对最大堆进行排序的操作
  for (let i = n - 1; i > 0; i--) {
    // 将最大堆的第一个元素 放到最后一位
    swap(arr, 0, i);
    // 对第0个节点进行下滤操作
    heapifyDown(arr, i, 0);
  }

  return arr;
}

/**
 * 下滤操作函数
 * @param arr 在数组中进行下滤操作
 * @param n 下滤操作的范围
 * @param index 哪一个位置需要进行下滤操作
 */
function heapifyDown(arr: number[], n: number, index: number) {
  while (2 * index + 1 < n) {
    // 找到左子节点
    const leftChildIndex = 2 * index + 1;
    // 找到右子节点
    const rightChildIndex = leftChildIndex + 1;

    // 找出左右子节点最大的值
    let largerIndex = leftChildIndex;
    if (rightChildIndex < n && arr[leftChildIndex] < arr[rightChildIndex]) {
      largerIndex = rightChildIndex;
    }

    // 3.判断index位置的值比更大的子节点, 直接break
    if (arr[index] > arr[largerIndex]) break;

    // 4.和更大位置的进行交换操作
    swap(arr, index, largerIndex);
    index = largerIndex;
  }
}

// testSort(heapSort);
console.log(heapSort([143, 132, 165, 148, 76, 160, 6, 20, 2, 25]));

// cbtPrint([143, 132, 165, 148, 76, 160, 6, 20, 2, 25]);

// measureSort(heapSort);
