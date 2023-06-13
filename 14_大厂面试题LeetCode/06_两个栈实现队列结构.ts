class CQueue {
  private stack1: number[] = [];
  private stack2: number[] = [];

  constructor() {}

  appendTail(value: number): void {
    this.stack1.push(value);
  }

  deleteHead(): number {
    if (this.stack2.length) {
      return this.stack2.pop()!;
    } else if (this.stack1.length) {
      while (this.stack1.length) {
        this.stack2.push(this.stack1.pop()!);
      }
      return this.stack2.pop()!;
    } else {
      return -1;
    }
  }
}

export {};
