class HashTable<T = any> {
  storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 7;
  // 记录已存放的数组的最大长度
  private count: number = 0;

  private hashFunc(str: string, max: number): number {
    // 1.初始化hashCode
    let hashCode = 0;

    // 2.霍纳算法, 计算hashCode的值
    for (let i = 0; i < str.length; i++) {
      hashCode = 31 * hashCode + str.charCodeAt(i);
    }

    // 3.通过取模计算索引值
    return hashCode % max;
  }

  // 是否是质数
  private isPrime(num: number): boolean {
    const sqrt = Math.sqrt(num);
    for (let i = 2; i <= sqrt; i++) {
      if (num % i == 0) return false;
    }
    return true;
  }

  // 获取下一个质数
  private getNextPrime(num: number): number {
    let newNUmb = num;
    while (!this.isPrime(newNUmb)) {
      newNUmb++;
    }

    return newNUmb;
  }

  // 插入/修改
  put(key: string, value: T) {
    // 1.根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出对应的桶
    let bucket = this.storage[index];

    // 2.判断桶是否存在
    if (!bucket) {
      // 不存在, 创建桶
      bucket = [];
      this.storage[index] = bucket;
    }

    let isUpdate = false;

    for (let i = 0; i < bucket.length; i++) {
      // 第一个桶中的第一个元素
      const tuple = bucket[i];
      // 第一个桶中的第一个元素的第一个元素
      const tupleKey = tuple[0];
      if (tupleKey === key) {
        // 修改
        tuple[1] = value;
        isUpdate = true;
      }
    }

    // 不存在, 直接插入
    if (!isUpdate) {
      bucket.push([key, value]);
      this.count++;
      // 发现loadFactor比例已经大于0.75, 那么就直接扩容
      const loadFactor = this.count / this.length;
      if (loadFactor > 0.75) {
        this.resize(this.length * 2);
      }
    }
  }

  // 获取
  get(key: string) {
    // 1.根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);

    // 取出对应的桶
    const bucket = this.storage[index];

    // 2.判断桶是否存在
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      // 第一个桶中的第一个元素
      const tuple = bucket[i];
      // 第一个桶中的第一个元素的第一个元素
      const tupleKey = tuple[0];
      const tupleValue = tuple[0];
      if (tupleKey === key) return tupleValue;
    }

    return undefined;
  }

  // 删除
  delete(key: string) {
    // 1.根据key获取数组中对应的索引值
    const index = this.hashFunc(key, this.length);
    // 取出对应的桶
    const bucket = this.storage[index];

    // 2.判断桶是否存在
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      // 第一个桶中的第一个元素
      const tuple = bucket[i];
      // 第一个桶中的第一个元素的第一个元素
      const tupleKey = tuple[0];
      const tupleValue = tuple[1];
      if (tupleKey === key) {
        // 删除
        bucket.splice(i, 1);
        this.count--;
        // 发现loadFactor比例已经小于0.25, 那么就直接扩容
        const loadFactor = this.count / this.length;
        if (loadFactor < 0.25 && this.length > 7) {
          this.resize(Math.floor(this.length / 2));
        }
        return tupleValue;
      }
    }
  }

  // 扩容/缩容
  resize(newLength: number) {
    // 设置新的长度
    this.length = this.getNextPrime(newLength);

    // 保存旧的数据 需要重新插入
    const oldStorage = this.storage;

    // 重置
    this.storage = [];
    this.count = 0;

    // 重新插入
    oldStorage.forEach((bucket) => {
      for (let i = 0; i < bucket.length; i++) {
        const tuple = bucket[i];
        const tupleKey = tuple[0];
        const tupleValue = tuple[1];
        this.put(tupleKey, tupleValue);
      }
    });
  }
}

const hashTable = new HashTable();
// length: 7
// count: 8
// loadFactor: 8 / 7 = 1.1xxxxx
hashTable.put("aaa", 100);
hashTable.put("aaa", 200);
hashTable.put("bbb", 300);
hashTable.put("ccc", 400);
hashTable.put("abc", 111);
hashTable.put("cba", 222);

console.log(hashTable.storage);

hashTable.put("nba", 333);
hashTable.put("mba", 444);
console.log(hashTable.storage);

// 如果loadFactor > 0.75进行扩容操作

hashTable.delete("nba");
hashTable.delete("mba");
hashTable.delete("abc");
hashTable.delete("cba");
hashTable.delete("aaa");

console.log(hashTable.storage);

export {};
