import { measureSort, testSort } from "hy-algokit";

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;
  // 1.1. 切割数组
  const mid = Math.floor(arr.length / 2);
  const leftArr = arr.slice(0, mid);
  const rightArr = arr.slice(mid);
  console.log(leftArr, "leftArr");
  console.log(rightArr, "rightArr");

  // 1.2.递归的切割leftArr和rightArr
  const newLeftArr = mergeSort(leftArr);
  const newRightArr = mergeSort(rightArr);
  console.log(newLeftArr, "newLeftArr");
  console.log(newRightArr, "newRightArr");

  // 2.合并(merge): 将两个子数组进行合并(双指针)
  // 2.1.定义双指针
  const newArr: number[] = [];
  let i = 0;
  let j = 0;
  while (i < newLeftArr.length && j < newRightArr.length) {
    if (newLeftArr[i] <= newRightArr[j]) {
      newArr.push(newLeftArr[i]);
      i++;
    } else {
      newArr.push(newRightArr[j]);
      j++;
    }
  }

  // 2.2.判断是否某一个数组中还有剩余的元素
  // 循环完左边还有剩余
  if (i < newLeftArr.length) {
    newArr.push(...newLeftArr.slice(i));
  }
  // 循环完右边还有剩余
  if (j < newRightArr.length) {
    newArr.push(...newLeftArr.slice(j));
  }

  return newArr;
}

testSort(mergeSort);
// measureSort(mergeSort, 1000000);
