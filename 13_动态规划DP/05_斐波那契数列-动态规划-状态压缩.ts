function fib(n: number): number {
  if (n <= 1) return n;
  // 定义状态
  let pre = 0;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    // 定义转移方程
    const newValue = pre + cur;
    pre = cur;
    cur = newValue;
  }

  // 返回结果
  return cur;
}

console.log(fib(50));

export {};
