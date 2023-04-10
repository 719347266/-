import Node from "../types/Node";

import { btPrint } from "hy-algokit";

class TreeNode<T> extends Node<T> {
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  // 当前节点的父节点
  parent: TreeNode<T> | null = null;

  // 判断当前节点是父节点的左子节点
  get isLeft(): boolean {
    return !!(this.parent && this.parent.left === this);
  }

  // 判断当前节点是父节点的右子节点
  get isRight(): boolean {
    return !!(this.parent && this.parent.right === this);
  }
}

class BSTree<T> {
  private root: TreeNode<T> | null = null;

  private searchNode(value: T): TreeNode<T> | null {
    let current = this.root;
    let parent: TreeNode<T> | null = null;
    while (current) {
      if (current.value === value) {
        return current;
      }
      parent = current;
      if (current.value > value) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current) current.parent = parent;
    }
    return null;
  }

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

  /** 搜索特定的值: 20 => boolean */
  search(value: T): boolean {
    return !!this.searchNode(value);
  }

  /** 实现删除操作 */
  remove(value: T): boolean {
    const current = this.searchNode(value);
    if (!current) return false;

    // 删除叶子节点
    if (!current.left && !current.right) {
      if (current === this.root) {
        this.root = null;
      } else if (current.isLeft) {
        current.parent!.left = null;
      } else {
        current.parent!.right = null;
      }
    }
    return true;
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

// bst.print();

// bst.preOrderTraverse();

// console.log(bst.search(20));
// console.log(bst.search(18));
// console.log(bst.search(6));
// console.log(bst.search(30));

// 删除功能:
// 删除叶子节点
bst.remove(3);
bst.remove(8);
bst.remove(12);
bst.print();

console.log("----------------------");

bst.remove(6);
bst.remove(10);
bst.remove(25);
bst.print();

export {};
