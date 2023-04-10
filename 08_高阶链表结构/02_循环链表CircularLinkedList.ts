import LinkedList from "./实现LinkedList";

class CircularLinkedList<T> extends LinkedList<T> {
  // 重新实现的方法: append方法
  append(value: T) {
    super.append(value);
    this.tail!.next = this.head;
  }

  insert(value: T, position: number): boolean {
    const isSuccess = super.insert(value, position);
    if (isSuccess && (position === 0 || position === this.size - 1)) {
      this.tail!.next = this.head;
    }
    return isSuccess;
  }

  removeAt(position: number): T | null {
    const value = super.removeAt(position);
    if (value && (position === 0 || position === this.size)) {
      this.tail!.next = this.head;
    }
    return value;
  }
}

const cLinkedList = new CircularLinkedList<string>();
console.log("------------ 测试append ------------");
cLinkedList.append("aaa");
cLinkedList.append("bbb");
cLinkedList.append("ccc");
cLinkedList.append("ddd");
cLinkedList.traverse();

console.log("------------ 测试insert ------------");
cLinkedList.insert("abc", 0);
cLinkedList.traverse();
cLinkedList.insert("cba", 2);
cLinkedList.insert("nba", 6);
cLinkedList.traverse();

// // 测试删除节点
console.log("------------ 测试removeAt ------------");
cLinkedList.removeAt(0);
cLinkedList.traverse();
cLinkedList.removeAt(2);
cLinkedList.traverse();
cLinkedList.removeAt(4);
cLinkedList.traverse();

export {};
