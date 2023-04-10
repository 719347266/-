class Heap<T> {
  constructor(arr: T[] = []) {
    this.buildHeap(arr);
  }
  // 属性
  data: T[] = [];
  private length: number = 0;

  // 私有工具方法
  private swap(i: number, j: number) {
    const temp = this.data[i];
    this.data[i] = this.data[j];
    this.data[j] = temp;
  }

  // 方法
  insert(value: T) {
    // 1.将元素放到数组的尾部
    this.data.push(value);
    this.length++;

    // 下滤操作
    this.heapify_up();
  }

  heapify_up() {
    let index = this.length - 1;

    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.data[index] < this.data[parentIndex]) break;

      this.swap(index, parentIndex);

      index = parentIndex;
    }
  }

  extract(): T | undefined {
    if (this.length === 0) return undefined;
    if (this.length === 1) {
      this.length--;
      return this.data.pop();
    }

    // 删除最后一个
    let topValue = this.data[0];

    // 防止数组位移不允许改变数组长度 所以将最后一个元素放到第一个
    this.data[0] = this.data.pop()!;

    this.length--;

    // 下滤操作
    this.heapify_down(0);

    return topValue;
  }

  private heapify_down(start: number) {
    let index = start;

    // 左子节点不能大于数组长度
    while (2 * index + 1 < this.length) {
      // 找到左子节点
      let leftChildIndex = 2 * index + 1;
      // 找到右子节点
      let rightChildIndex = leftChildIndex + 1;

      // 3.3.找到左右子节点较大的值
      let largerIndex = leftChildIndex;
      // 完美二叉树右子节点可能没有节点所有要先边界判断 且当前右边的值不能大于左边的值
      if (
        rightChildIndex < this.length &&
        this.data[rightChildIndex] > this.data[leftChildIndex]
      ) {
        largerIndex = rightChildIndex;
      }

      // 3.4.较大的值和index位置进行比较
      if (this.data[index] >= this.data[largerIndex]) {
        break;
      }
      // 3.5.交换位置
      this.swap(index, largerIndex);
      index = largerIndex;
    }
  }

  peek(): T | undefined {
    return this.data[0];
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  buildHeap(arr: T[]) {
    this.data = arr;
    this.length = arr.length;

    // 算出第一个开始的非叶子节点
    let start = Math.floor((this.length - 1) / 2);

    for (let i = start; i >= 0; i--) {
      this.heapify_down(i);
    }
  }
}

const arr = [9, 11, 20, 56, 23, 45];
const heap = new Heap<number>(arr);

// heap.buildHeap(arr)
console.log(arr);
// console.log(heap.extract());

export {};
