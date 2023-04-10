class HashTable<T = any> {
  storage: [string, T][][] = [];
  // 定义数组的长度
  private length: number = 0;
  // 记录已存放的数组的最大长度
  private count: number = 8;

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
}

const hashTable = new HashTable();
hashTable.put("aaa", 100);
hashTable.put("aaa", 200);
hashTable.put("bbb", 300);
hashTable.put("ccc", 400);

console.log(hashTable.get("aaa"));
console.log(hashTable.get("bbb"));
console.log(hashTable.get("ccc"));

console.log(hashTable.get("ddd"));
console.log(hashTable.get("abc"));

export {};
