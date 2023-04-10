class Heap<T> {
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
    this.heapify_down();

    return topValue;
  }

  private heapify_down() {
    let index = 0;

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

  buildHeap(arr: T[]) {}
}

const arr = [19, 100, 36, 17, 3, 25, 1, 2, 7];

const heap = new Heap<number>();
for (const item of arr) {
  heap.insert(item);
}
console.log(heap.data);

// while (!heap.isEmpty()) {
//   console.log(heap.extract());
// }

export {};
