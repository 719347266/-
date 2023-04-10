class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

class LinkedList<T> {
  // 头部节点
  protected head: Node<T> | null = null;
  // 长度
  protected size: number = 0;

  // 新增属性: 总是指向链表的位置
  protected tail: Node<T> | null = null;

  // 判断是否是最后一个节点
  private isTail(node: Node<T>) {
    return this.tail === node;
  }

  protected getNode(position: number) {
    if (position < 0 || position > this.size) return null;
    let current = this.head;
    let index = 0;
    while (index++ < position && current) {
      current = current.next;
    }
    return current;
  }

  // 追加
  append(value: T) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      this.tail!.next = node;
    }
    this.tail = node;
    this.size++;
  }

  // 插入
  insert(value: T, position: number) {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(value);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
      // this.tail = newNode;
    } else {
      // 拿到要插入位置的上一个节点
      let previous = this.getNode(position - 1);
      // 当前节点
      let current = previous!.next;
      newNode.next = current;
      previous!.next = newNode;

      if (position === this.size) {
        this.tail = newNode;
      }
    }

    this.size++;
    return true;
  }

  // 删除
  removeAt(position: number): T | null {
    if (position < 0 || position > this.size) return null;
    let current = this.head;
    if (position === 0) {
      this.head = this.head?.next || null;

      if (this.size === 1) {
        this.tail = null;
      }
    } else {
      // 拿到要删除的上一个节点
      const previous = this.getNode(position - 1);
      current = previous!.next;
      previous!.next = current?.next ?? null;
      if (position === this.size - 1) {
        this.tail = previous;
      }
    }
    this.size--;

    return current?.value ?? null;
  }

  // 根据索引获取元素
  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null;

    return this.getNode(position)?.value ?? null;
  }

  // 打印
  traverse() {
    const values: T[] = [];
    let cuttrnt = this.head;
    while (cuttrnt) {
      values.push(cuttrnt.value);
      if (this.isTail(cuttrnt!)) {
        cuttrnt = null;
      } else {
        // 不是最后一个节点
        cuttrnt = cuttrnt!.next;
      }
    }

    // 循环链表
    if (this.head && this.tail?.next === this.head) {
      values.push(this.head.value);
    }
    console.log(values.join(" => "));
  }

  // 根据值, 获取对应位置的索引
  indexOf(value: T): number {
    // 从第一个节点开始, 向后遍历
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) {
        return index;
      }

      if (this.isTail(current)) {
        current = null;
      } else {
        current = current.next;
      }

      index++;
    }

    return -1;
  }
}

// const linkedList = new LinkedList<string>();
// console.log("------------ 测试append ------------");
// linkedList.append("aaa");
// linkedList.append("bbb");
// linkedList.append("ccc");
// linkedList.append("ddd");
// linkedList.traverse();

export default LinkedList;
