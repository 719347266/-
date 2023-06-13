function evalRPN(tokens: string[]): number {
  const stack: number[] = [];
  for (const token of tokens) {
    if (token === "+") {
      const nums2 = stack.pop()!;
      const nums1 = stack.pop()!;
      const result = nums1 + nums2;
      stack.push(result);
    } else if (token === "-") {
      const nums2 = stack.pop()!;
      const nums1 = stack.pop()!;
      const result = nums1 - nums2;
      stack.push(result);
    } else if (token === "*") {
      const nums2 = stack.pop()!;
      const nums1 = stack.pop()!;
      const result = nums1 * nums2;
      stack.push(result);
    } else if (token === "/") {
      const nums2 = stack.pop()!;
      const nums1 = stack.pop()!;
      const result = Math.trunc(nums1 / nums2);
      stack.push(result);
    } else {
      stack.push(Number(token));
    }
  }
  return stack.pop()!;
}

console.log(evalRPN(["4", "13", "5", "/", "+"]));
