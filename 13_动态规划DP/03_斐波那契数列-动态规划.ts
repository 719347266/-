function fib(n: number): number {
  const memo: number[] = [];

  for (let i = 0; i < n; i++) {
    if (i <= 1) {
      memo[i] = i;
      continue;
    }
    memo[i] = memo[i - 1] + memo[i - 2];
  }

  return memo[n];
}
// console.log(fib(10)) // 55
console.log(fib(50)); //

export {};
