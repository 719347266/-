import LinkedList from "./实现LinkedList";
import { DoublyNode } from "./LinkedNode";

class DoublyLinkedList<T> extends LinkedList<T> {
  protected head: DoublyNode<T> | null = null;
  protected tail: DoublyNode<T> | null = null;

  append(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail!.next = newNode;
      // 不能将一个父类的对象, 赋值给一个子类的类型
      // 可以将一个子类的对象, 赋值给一个父类的类型(多态)
      newNode.prev = this.tail;
      this.tail = newNode;
    }

    this.size++;
  }

  prepend(value: T) {
    const newNode = new DoublyNode(value);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;
  }

  postTraverse() {
    const values: T[] = [];
    let current = this.tail;
    while (current) {
      values.push(current.value);
      current = current.prev;
    }

    console.log(values.join(" -> "));
  }

  insert(value: T, position: number): boolean {
    if (position < 0 && position > this.size) return false;

    if (position === 0) {
      this.prepend(value);
    } else if (position === this.size) {
      this.append(value);
    } else {
      const newNode = new DoublyNode(value);
      const current = this.getNode(position) as DoublyNode<T>;

      current.prev!.next = newNode;
      newNode.next = current;
      newNode.prev = current.prev;
      current.prev = newNode;
      this.size++;
    }

    return true;
  }

  removeAt(position: number): T | null {
    if (position < 0 || position >= this.size) return null;
    let current = this.head;
    if (position === 0) {
      if (this.size === 1) {
        this.head = null;
        this.tail = null;
      } else {
        this.head = this.head!.next;
        this.head!.prev = null;
      }
    } else if (position === this.size - 1) {
      current = this.tail;
      this.tail = this.tail!.prev;
      this.tail!.next = null;
    } else {
      current = this.getNode(position) as DoublyNode<T>;
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }
    this.size--;
    return current?.value ?? null;
  }
}

// 测试append方法
console.log("-------------- append/prepend --------------");
const dLinkedList = new DoublyLinkedList<string>();
dLinkedList.append("aaa");
dLinkedList.append("bbb");
dLinkedList.append("ccc");
dLinkedList.append("ddd");

dLinkedList.prepend("abc");
dLinkedList.prepend("cba");

dLinkedList.traverse();
dLinkedList.postTraverse();

dLinkedList.insert("why", 0);
dLinkedList.insert("kobe", 7);
dLinkedList.insert("james", 3);
dLinkedList.traverse();
// dLinkedList.postTraverse();

console.log("-------------- removeAt --------------");
dLinkedList.removeAt(0);
dLinkedList.removeAt(7);
dLinkedList.removeAt(2);
dLinkedList.traverse();
// dLinkedList.postTraverse();

export {};
