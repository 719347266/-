import { TreeNode } from "./00_二叉搜索树BSTree";
// import { btPrint } from "hy-algokit";

export default class AVLTreeNode<T> extends TreeNode<T> {
  // 保证获取到的left/right节点的类型是AVLTreeNode
  left: AVLTreeNode<T> | null = null;
  right: AVLTreeNode<T> | null = null;
  parent: AVLTreeNode<T> | null = null;

  height: number = 1;

  /** 获取每个节点的高度 */
  getHeight(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /** 权重: 平衡因子(左边height - 右边height) */
  getBalanceFactor(): number {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    return leftHeight - rightHeight;
  }

  /** 直接判断当前节点是否平衡 */
  get isBalanced(): boolean {
    if (this.getBalanceFactor() <= 1 && this.getBalanceFactor() >= -1)
      return true;

    return false;
  }

  /** 获取最高的子节点 */
  get higherChild(): AVLTreeNode<T> | null {
    const leftHeight = this.left ? this.left.getHeight() : 0;
    const rightHeight = this.right ? this.right.getHeight() : 0;

    if (leftHeight > rightHeight) return this.left;
    if (leftHeight < rightHeight) return this.right;
    return this.isLeft ? this.left : this.right;
  }

  /** 右旋转 */
  rightRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    /** 处理基准节点 */
    const pivot = this.left!;
    pivot!.parent = this.parent;

    // 需要将右节点指向当前节点
    this.left = pivot?.right;
    if (pivot.right) {
      pivot.right.parent = this;
    }

    /** 处理pivot节点 */
    pivot.right = this;
    this.parent = pivot;

    /** 处理父节点 */
    if (!pivot.parent) {
      return pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    } else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }

  /** 左旋转 */
  leftRotation() {
    const isLeft = this.isLeft;
    const isRight = this.isRight;

    const pivot = this.right!;
    pivot.parent = this.parent;

    this.right = pivot.left;
    if (pivot.left) {
      pivot.left.parent = this;
    }

    pivot.left = this;
    this.parent = pivot;

    /** 处理父节点 */
    if (!pivot.parent) {
      return pivot;
    } else if (isLeft) {
      pivot.parent.left = pivot;
    } else if (isRight) {
      pivot.parent.right = pivot;
    }

    return pivot;
  }
}

// // // 测试某一个节点的高度
// const avlNode1 = new AVLTreeNode(10);
// avlNode1.right = new AVLTreeNode(15);
// avlNode1.right.parent = avlNode1;
// avlNode1.right.right = new AVLTreeNode(20);
// avlNode1.right.right.parent = avlNode1.right;
// const parent = new AVLTreeNode(6);
// parent.right = avlNode1;

// // 设置parent
// avlNode1.parent = parent;

// btPrint(parent);

// avlNode1.leftRotation();

// btPrint(parent);
