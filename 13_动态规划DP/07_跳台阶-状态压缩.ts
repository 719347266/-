function jump(n: number): number {
  let pre = 1;
  let cur = 1;
  for (let i = 2; i <= n; i++) {
    const newValue = pre + cur;
    pre = cur;
    cur = newValue;
  }
  return cur;
}

console.log(jump(2));
console.log(jump(3));

export {};
