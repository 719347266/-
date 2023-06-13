import { TreeNode } from "./00_二叉搜索树BSTree";
import { btPrint } from "hy-algokit";
class AVLTreeNode<T> extends TreeNode<T> {
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
}

const avlNode1 = new AVLTreeNode(10);
avlNode1.left = new AVLTreeNode(8);
avlNode1.left.parent = avlNode1;
avlNode1.left.left = new AVLTreeNode(5);
avlNode1.left.left.parent = avlNode1.left;
const parent = new AVLTreeNode(12);
parent.left = avlNode1;

// 设置parent
avlNode1.parent = parent;

btPrint(parent);

avlNode1.rightRotation();

btPrint(parent);
