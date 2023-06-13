function lengthOfLongestSubstring(s: string): number {
  const n = s.length;

  // 1.定义需要用到的变量
  const map = new Map<string, number>();
  let left = 0;
  let maxLength = 0;

  for (let right = 0; right < n; right++) {
    const rightChar = s[right];

    // 如果left指针指向的值是right出现过的，那么left指针就要移动到right出现的位置的下一个位置
    if (map.has(rightChar) && map.get(rightChar)! >= left) {
      left = map.get(rightChar)! + 1;
    }

    // 每一步都要计算一下最大值
    const currentLength = right - left + 1;
    maxLength = Math.max(maxLength, currentLength);

    // 将right每一步都存入map中
    map.set(rightChar, right);
  }

  return maxLength;
}
console.log(lengthOfLongestSubstring("abcabcbb"));

export {};
