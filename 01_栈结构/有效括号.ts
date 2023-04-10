function isValid(s: string) {
  let state: string[] = [];
  for (var i = 0; i < s.length; i++) {
    const c = s[i];
    switch (c) {
      case "(":
        state.push(")");
        break;
      case "[":
        state.push("]");
        break;
      case "{":
        state.push("}");
        break;
      default:
        const pop = state.pop();
        if (pop !== c) return false;
        break;
    }
  }
  return !state.length;
}
// 每次push都是把当前的括号压入栈中，然后遇到右括号的时候，就把栈顶的括号弹出来，
// 然后判断是否匹配，如果不匹配（不匹配说明是 })的情况），就返回false，如果匹配(两个都是相同的右括号)，就继续遍历下一个字符，
// 直到遍历完所有的字符，如果栈中还有元素，就返回false，如果栈中没有元素，就返回true
console.log(isValid("()"));
console.log(isValid("(){}"));
console.log(isValid("(}"));
