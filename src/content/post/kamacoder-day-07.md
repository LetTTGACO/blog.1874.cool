---
date: '2025-03-06 08:00:00'
description: 学习了344.反转字符串和541.反转字符串II的解题思路与代码实现，强调了双指针和边界处理的重要性，并通过示例加深理解。
hidden: true
urlname: kamacoder-day-07
title: 算法训练营第7天｜344.反转字符串、541.反转字符串II
tags:
  - 算法训练营
updated: '2025-03-06 18:28:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


## 题目链接


### **344.反转字符串**


建议： 本题是字符串基础题目，就是考察 reverse 函数的实现，同时也明确一下 平时刷题什么时候用 库函数，什么时候 不用库函数


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0344.反转字符串.html](https://programmercarl.com/0344.%E5%8F%8D%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2.html)


### **541.反转字符串II**


建议：本题又进阶了，自己先去独立做一做，然后在看题解，对代码技巧会有很深的体会。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0541.反转字符串II.html](https://programmercarl.com/0541.%E5%8F%8D%E8%BD%AC%E5%AD%97%E7%AC%A6%E4%B8%B2II.html)


## 解题思路


### **344.反转字符串**


**关键词**

1. 双指针

**思路**

- 直接使用双指针进行翻转赋值

### **541.反转字符串II**


**关键词**

1. 边界问题，左闭右开好理解一些

**思路**

- 题目其实就这两个条件，每计数至 `2k` 个字符，就反转这 `2k` 字符中的前 `k` 个字符。其实就包含在条件 2 之中
	1. 如果剩余字符少于 k 个，则将剩余字符全部反转。
	2. 如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。
- 例如当字符是 `a,b,c,d,e,f,g,h,i,j,k`，`k=3`时，第一次翻转是`i=6`时，`a,b,c,d,e,f`中翻转 `a,b,c`，剩下的`g,h,i,j`满足条件 2， `g,h,i`进行翻转，剩下的 `j,k`不翻转。
- 当字符串是`a,b,c,d,e,f,g,h`，`k=3`时，第一次翻转是`i=6`时，`a,b,c,d,e,f`中翻转 `a,b,c`，剩下的`g,h`不满足条件2，满足条件 1，所以`g,h`全部进行翻转
- 所以这两个条件其中有一个满足，当前循环就应该跳过，但条件2 其实已经包含题干了

## 题解


### **344.反转字符串**


```javascript
var reverseString = function(s) {
  let left = 0
  let right = s.length - 1
  while (right > left) {
    const temp = s[left]
    s[left] = s[right]
    s[right] = temp
    left ++
    right --
  }
  return s
};
```


### **541.反转字符串II** 


```javascript

// 翻转指定起始结束位置的字符串，左闭右开
// [a,b,c,d,e] i=0, j=2 会翻转 a 和 b，不会翻转 c
const refunc = function (arr, i, j) {
  let left = i
  let right = j - 1
  while (right > left) {
    const t = arr[left]
    arr[left] = arr[right]
    arr[right] = t
    left ++
    right --
  }
  return arr
}

var reverseStr = function(s, k) {
  let arr = s.split('')
  for (let i = 0; i < arr.length; i += 2 * k) {
    if (i + k <= arr.length) {
      // 注意此翻转方法是左闭右开，所以当i + k <= arr.length时
      // i=0,k=2, i+k=3时，只会翻转 0,1 两个位置的字幕
      arr = refunc(arr, i, i + k)
      continue
    }
    // 这里是其他情况的翻转，也就是如果剩余字符少于 k 个，则将剩余字符全部反转。
    arr = refunc(arr, i, arr.length)
  }
  return arr.join('')
};
```


## 收获

- 对于题目的理解，一定要用笔多写几个示例才能明白，不要着急写代码
- 对于左右边界的处理也是需要多在纸上写一写才能确定
