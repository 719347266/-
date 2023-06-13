function maxArray(nums: number[]): number {
  const n = nums.length;

  const dp: number[] = [];
  dp[0] = nums[0];
  for (let i = 1; i < n; i++) {
    dp[i] = Math.max(nums[i], nums[i] + dp[i - 1]);
  }

  return Math.max(...dp);
}

console.log(maxArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

export {};
