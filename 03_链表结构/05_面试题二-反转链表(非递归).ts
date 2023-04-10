import ListNode from "./ListNode";

function reverseList(head: ListNode | null): ListNode | null {
  if (head === null || head.next === null) return head;

  let newHead: ListNode | null = null;

  while (head) {
    // 用current保留剩下的节点信息
    let current: ListNode | null = head.next;
    // 修改head.next的指向到newHead中 newHead => head
    head.next = newHead;
    // 永远指向头节点
    newHead = head;
    // 重置旧头指针到current中
    head = current;
  }

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
