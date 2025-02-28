---
date: '2025-02-26 08:00:00'
description: 学习了209.长度最小的子数组和59.螺旋矩阵II的解题思路，重点在滑动窗口和边界处理，收获了对数组题目的理解，但感觉解题思路缺乏通用性。建议总结数组专题。
hidden: true
urlname: kamacoder-day-02
title: 算法训练营第2天｜209.长度最小的子数组、59.螺旋矩阵II
tags:
  - 算法训练营
updated: '2025-02-28 22:07:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


## 题目链接


### 209.长度最小的子数组


题目建议：本题关键在于理解滑动窗口，这个滑动窗口看文字讲解 还挺难理解的，建议大家先看视频讲解。  拓展题目可以先不做。


题目链接：[https://leetcode.cn/problems/minimum-size-subarray-sum/](https://leetcode.cn/problems/minimum-size-subarray-sum/)


文章讲解：[https://programmercarl.com/0209.长度最小的子数组.html](https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html)


视频讲解：[https://www.bilibili.com/video/BV1tZ4y1q7XE](https://www.bilibili.com/video/BV1tZ4y1q7XE)


### 59.螺旋矩阵II


题目建议：本题关键还是在转圈的逻辑，在二分搜索中提到的区间定义，在这里又用上了。


题目链接：[https://leetcode.cn/problems/spiral-matrix-ii/](https://leetcode.cn/problems/spiral-matrix-ii/)


文章讲解：[https://programmercarl.com/0059.螺旋矩阵II.html](https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html)


视频讲解：[https://www.bilibili.com/video/BV1SL4y1N7mV/](https://www.bilibili.com/video/BV1SL4y1N7mV/)


### **58.区间和**


前缀和是一种思维巧妙很实用 而且很有容易理解的一种算法思想


文章讲解：[https://www.programmercarl.com/kamacoder/0058.区间和.html](https://www.programmercarl.com/kamacoder/0058.%E5%8C%BA%E9%97%B4%E5%92%8C.html)


### **44.开发商购买土地**


[https://www.programmercarl.com/kamacoder/0044.开发商购买土地.html](https://www.programmercarl.com/kamacoder/0044.%E5%BC%80%E5%8F%91%E5%95%86%E8%B4%AD%E4%B9%B0%E5%9C%9F%E5%9C%B0.html)


### 总结


题目建议：希望大家也做一个自己对数组专题的总结


文章链接：[https://programmercarl.com/数组总结篇.html](https://programmercarl.com/%E6%95%B0%E7%BB%84%E6%80%BB%E7%BB%93%E7%AF%87.html)


## 解题思路


### 209.长度最小的子数组


没啥头绪，看了好一会暴力解法才明白是怎么运行的。

- 外层用来循环整个数组
- 内层用来循环当前下标及其之后所有数的和
- 直到循环完后找到最小的length
- 相当于两个

滑动窗口的思想就不需要内层循环，用两个指针

- 指针i用来循环整个数组
- 指针j会在sum大于等于目标值时，从sum中减去当前值并向右移动
- 所以这个最坏的情况就是全是目标值-1的值组成的数组，指针j每走一步，i都需要走一步。即时间复杂度最坏为O(2n)

	![209.gif](https://image.cody.fan/blog/4810ceee21047ff4b3cce41d95196203.gif)


### 59.螺旋矩阵II

- 需要想好边界问题，一直保持左闭右开的规则，不停的更新二维数组的值
- 需要找出循环次数，也就是转几次圈
- 如何转内圈，需要定义偏移量，保证在转内圈的时候能正确赋值
- 特殊处理 n 为奇数的情况，也就是最中间的值的更新，找到最中间值的下标

## 题解


### 209.长度最小的子数组


```javascript
/**
 * 暴力解法
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  // 定义一个足够大的长度
  let result = 999999999999
  let subLength = 0; // 子数组长度
  for (let i = 0; i < nums.length; i++) {
    let sum = 0 // 每次从头开始计时
    for (let j = i; j < nums.length; j++) {
      sum = sum + nums[j] // 计算和
      if (sum >= target) { // 如果大于等于目标值
        subLength = j - i + 1 // 得到数组长度
        result = result < subLength ? result : subLength // 和之前的长度做比较，谁短就是谁
        break  // 找符合条件最短的子序列，所以一旦符合条件就break，没必要再加sum了
      }
    }
  }
  // 如果result没有被赋值的话，就返回0，说明没有符合条件的子序列
  return result === 999999999999 ? 0 : result
};
```


```javascript
/**
 * 滑动窗口解法
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(target, nums) {
  // 定义一个长度结果
  let res = 999999999999
  // 子数组的长度
  let subLen = 0
  // 定义一个窗口初始下标
  let i = 0
  // 和 
  let sum = 0
  for (let j = 0; j < nums.length; j++) {
    // 相对于暴力解法，这里的sum在相加之后不用break
    sum = sum + nums[j]
    // 一旦大于等于目标值，就检查最小长度
    // 这里一定要用 while，因为可能会出现[1,1,1,1,100]，target 为 100
    // 滑动窗口为[1,1,1,1,100]时，当 j 移动到 100 时，只会判断一次
    // 如果i不继续往右移动，得出的 length = 5， 实际上是 2，[1,100]
    while (sum >= target) {
      // 得到子数组长度
      subLen = j - i + 1
      // 检查最小长度
      res = res < subLen ? res : subLen
      // 减去初始位置的值，直到让sum小于目标值
      sum = sum - nums[i]
      // 并且移动窗口起始位置，
      i++
    }
  }
  return res === 999999999999 ? 0 : res
};
```


### 59.螺旋矩阵II


```javascript
const generateMatrix = function(n) {
  //  定义矩阵，用 0 填满
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0))
  // 整体要循环的次数，n= 3，则转一圈就行，中间的特殊处理，n=4，则要转两圈
  let loop = Math.floor(n/2)
  // 如果n 为奇数，则需要特殊处理最中间的值，它的坐标就是 n/2 
  let mid = Math.floor(n/2)
  // 定义起始值，[i,j]，startX在二维数组为为 i 的起始值，但在坐标轴上为 Y轴，startY为 j 的值
  let startX = 0
  let startY = 0
  // 偏移量，每转一圈，就需要加 1，就可能转内圈
  let offset = 1
  // 填充数字
  let count = 1
  // loop > 0 才转
  while (loop--) {
    // i坐标
    let row = startX
    // j 坐标
    let col = startY
    // 左上到右上（左闭右开）
    // n-offset 就是为了左闭右开
    // 假设 n = 5， 则 n-offset = 4，只需要循环1,2,3,4。5 则留给其他边处理
    // 不停推动 col，也就是 j 向右移动
    for (;col < n-offset; col ++) {
      res[row][col] = count ++
    }
   
    // 右上到右下（左闭右开）
    // 不停推动 row，也就是 i 向下移动
    for (;row < n-offset;row ++) {
      res[row][col] = count ++
    }
    
    // 右下到左下（左闭右开）
    // 不停推动 col，也就是 j 向左移动
    for (;col> startY; col --) {
      res[row][col] = count ++
    }
    // 左下到左上
    // // 不停推动 row，也就是 i 向上移动
    for (;row > startX; row --) {
      res[row][col] = count ++
    }
    // 进入第二圈的时候，起始坐标[i,j]都需要+1，才能进内圈
    startX ++
    startY ++
    // 偏移量也需要+1，保证左闭右开
    offset ++
  }
  // 特殊处理奇数 n 的情况，手动更新最中间的值
  if (n%2 === 1) {
    res[mid][mid] = count
  }

  return res

};
```


## 收获


题解能看懂，也能写出来，但是感觉没有什么通用性的收获。对我来说虽然都是数组的题目，但是解题思路不具备通用性。差不多是那种从没头绪⇒看题解⇒原来可以这样理解⇒理解了⇒下一道题又困住了。回头再刷几道数组题看看，估计还是我刷题刷少了。

