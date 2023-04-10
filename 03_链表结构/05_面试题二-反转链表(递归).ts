import ListNode from "./ListNode";

let index = 0;

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  if (head.next === null) return head;

  const newHead = reverseList(head.next);

  // 从尾部开始反转
  // 将最后一个节点的next指向前一个节点
  head.next.next = head;
  // 将当前一个节点的next指向null
  head.next = null;

  return newHead;
}

const node1 = new ListNode(111);
node1.next = new ListNode(222);
node1.next.next = new ListNode(333);
node1.next.next.next = new ListNode(444);
node1.next.next.next.next = new ListNode(555);
let newNode = reverseList(node1);

let current = newNode;

while (current) {
  console.log(current?.val);
  current = current.next;
}
export {};
