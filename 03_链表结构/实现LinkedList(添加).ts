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

export {};
