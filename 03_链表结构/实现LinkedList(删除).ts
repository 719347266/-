class Node<T> {
  constructor(public value: T, public next: Node<T> | null = null) {}
}

class LinkedList<T> {
  // 头部节点
  private head: Node<T> | null = null;
  // 长度
  private size: number = 0;

  // 追加
  append(value: T) {
    const node = new Node(value);
    if (this.head === null) {
      this.head = node;
    } else {
      let cuttrnt = this.head;
      while (cuttrnt.next) {
        cuttrnt = cuttrnt.next;
      }
      cuttrnt.next = node;
    }
    this.size++;
  }

  // 插入
  insert(value: T, position: number) {
    if (position < 0 || position > this.size) return false;
    const newNode = new Node(value);

    if (position === 0) {
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 当前节点
      let current = this.head;
      // 上一个节点
      let previous: Node<T> | null = null;
      let index = 0;
      while (index++ < position && current) {
        // 记录一下上一个节点
        previous = current;
        // 将当前阶段的下一个节点赋值给当前节点
        current = current.next;
      }
      // 交换位置
      previous!.next = newNode;
      newNode.next = current;
    }

    this.size++;
  }

  // 删除
  removeAt(position: number) {
    if (position < 0 || position > this.size) return null;
    let current = this.head;
    if (position === 0) {
      this.head = this.head?.next || null;
    } else {
      let previous: Node<T> | null = null;
      let index = 0;
      while (index++ < position && current) {
        previous = current;
        current = current.next;
      }
      previous!.next = current?.next ?? null;
    }
    this.size--;
  }

  // 根据索引获取元素
  get(position: number): T | null {
    if (position < 0 || position >= this.size) return null;
    let index = 0;
    let current = this.head;
    while (index++ < position && current) {
      current = current.next;
    }
    return current?.value ?? null;
  }

  // 打印
  traverse() {
    const values: T[] = [];
    let cuttrnt = this.head;
    while (cuttrnt) {
      values.push(cuttrnt.value);
      cuttrnt = cuttrnt.next;
    }
    console.log(values.join(" => "));
  }
}

const linkedList = new LinkedList<number>();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.append(4);
linkedList.append(5);

linkedList.traverse();

linkedList.insert(6, 2);
linkedList.traverse();
linkedList.removeAt(0);
linkedList.traverse();
linkedList.removeAt(0);
linkedList.traverse();
linkedList.removeAt(2);
linkedList.traverse();

export {};
