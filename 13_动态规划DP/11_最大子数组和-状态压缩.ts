function maxArray(nums: number[]): number {
  const n = nums.length;

  let preValue = nums[0];
  let max = preValue;
  for (let i = 1; i < n; i++) {
    preValue = Math.max(nums[i], nums[i] + preValue);
    max = Math.max(max, preValue);
  }

  return max;
}

console.log(maxArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

export {};
