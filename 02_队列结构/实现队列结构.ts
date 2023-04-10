import { IQueue } from "./IQueue";

class ArrayQueue implements IQueue {
  enqueuq: (element: any) => void;
  dequeue: (element: any) => any;
  peek: () => any;
  isEmpty: () => boolean;
  size: () => number;
}
