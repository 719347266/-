export interface IQueue<T = any> {
  enqueuq: (element: T) => void;
  dequeue: (element: T) => T | undefined;
  peek: () => T | undefined;
  isEmpty: () => boolean;
  size: () => number;
}
