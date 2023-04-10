import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null) return null;
  if (head.next === null) return head;

  const stack: ListNode[] = [];
  let current: ListNode | null = head;
  while (current) {
    stack.push(current);
    current = current.next;
  }

  let newHead = stack.pop()!;
  let newHeadCurrent = newHead;
  while (stack.length) {
    const node = stack.pop()!;
    newHeadCurrent.next = node;
    console.log(newHeadCurrent.val);
    // 重置头指针 到新添加的节点 第index位中
    newHeadCurrent = newHeadCurrent.next!;
  }

  newHeadCurrent.next = null;

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
