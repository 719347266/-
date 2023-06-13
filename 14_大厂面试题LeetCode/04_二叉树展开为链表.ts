import TreeNode from "./TreeNode";
function flatten(root: TreeNode | null): void {
  if (!root) return;

  const stack = [root];
  let previous: TreeNode | null = null;

  while (stack.length) {
    const currnt = stack.pop()!;

    // 如果有上一个节点 将上一个节点的左节点置空 右节点指向当前节点 形成链表的结构
    if (previous) {
      previous.left = null;
      previous.right = currnt;
    }

    const left = currnt?.left;
    const right = currnt?.right;

    if (right) stack.push(right);
    if (left) stack.push(left);

    // 存储当前节点做为上一个节点
    previous = currnt;
  }
}
