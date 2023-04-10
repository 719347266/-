import Node from "../types/Node";

import { btPrint } from "hy-algokit";

class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;
}

class BSTree<T> {
  private root: TreeNode<T> | null = null;

  print() {
    btPrint(this.root);
  }

  /** 插入 */
  insert(value: T) {
    const newNode = new TreeNode(value);
    if (this.root == null) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  /** 插入函数 */
  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.value > node.value) {
      if (!node.right) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    } else {
      if (!node.left) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    }
  }

  /** 遍历的操作 */
  // 先序遍历
  preOrderTraverse() {
    this.preOrderTraverseNode(this.root);
  }
  private preOrderTraverseNode(node: TreeNode<T> | null) {
    if (node == null) return;
    console.log(node.value);
    this.preOrderTraverseNode(node.left);
    this.preOrderTraverseNode(node.right);
  }

  // 中序遍历
  inOrderTraverse() {
    this.inOrderTraverseNode(this.root);
  }
  private inOrderTraverseNode(node: TreeNode<T> | null) {
    if (node == null) return;
    this.preOrderTraverseNode(node.left);
    console.log(node.value);
    this.preOrderTraverseNode(node.right);
  }

  // 后序遍历
  postOrderTraverse() {
    this.postOrderTraverseNode(this.root);
  }
  private postOrderTraverseNode(node: TreeNode<T> | null) {
    if (node == null) return;
    this.preOrderTraverseNode(node.left);
    this.preOrderTraverseNode(node.right);
    console.log(node.value);
  }

  // 层序遍历
  levelOrderTraverse() {
    if (!this.root) return;
    const queue: TreeNode<T>[] | null = [];
    queue.push(this.root);
    while (queue.length) {
      const current = queue.shift();
      if (current?.left) queue.push(current.left);
      if (current?.right) queue.push(current.right);
    }
  }
}

const bst = new BSTree<number>();
bst.insert(11);
bst.insert(7);
bst.insert(15);
bst.insert(5);
bst.insert(3);
bst.insert(9);
bst.insert(8);
bst.insert(10);
bst.insert(13);
bst.insert(12);
bst.insert(14);
bst.insert(20);
bst.insert(18);
bst.insert(25);
bst.insert(6);

bst.print();

bst.preOrderTraverse();

export {};
