import { BSTree } from "./00_二叉搜索树BSTree";
import AVLTreeNode from "./04_封装AVLTreeNode(左旋转操作)";

class AVLTree<T> extends BSTree<T> {
  // 假设已经找到了, 那么我们如何让这个节点变的平衡
  protected createNode(value: T) {
    return new AVLTreeNode(value);
  }

  // 如何去找到不平衡的节点
  checkBalance(node: AVLTreeNode<T>) {
    let current = node.parent;
    while (current) {
      if (!current.isBalanced) {
        this.rebalance(current);
      }
      current = current.parent;
    }
  }

  /**
   * 根据不平衡的节点的情况(LL/RR/LR/RL)让子树平衡
   * @param root 找到的不平衡的节点
   */
  rebalance(root: AVLTreeNode<T>) {
    // 先获取到不平衡节点的子树
    const pivot = root.higherChild;
    // 不平衡子树中的不平衡节点
    const cuurent = pivot?.higherChild;

    let resultNode: AVLTreeNode<T> | null = null;
    if (pivot?.isLeft) {
      if (cuurent?.isLeft) {
        // 左左
        resultNode = root.rightRotation();
      } else {
        // 左右
        // 1.左旋
        pivot.leftRotation();
        // 2.右旋
        resultNode = root.rightRotation();
      }
    } else {
      if (cuurent?.isRight) {
        // 右左
        // 1.右旋转
        pivot?.rightRotation();
        // 2.左旋转
        resultNode = root.leftRotation();
      } else {
        // 右右
        resultNode = root.leftRotation();
      }
    }
    return resultNode;
  }
}

const avlTree = new AVLTree<number>();

for (let i = 0; i < 20; i++) {
  avlTree.insert(Math.floor(Math.random() * 200));
}

avlTree.print();
