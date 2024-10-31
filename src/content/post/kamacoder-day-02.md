---
date: '2024-10-31 08:00:00'
description: ''
hidden: true
urlname: kamacoder-day-02
title: 「代码随想录」算法训练营第2天｜209.长度最小的子数组、59.螺旋矩阵II
tags:
  - 算法训练营
updated: '2024-10-31 20:51:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


# 题目链接


## 209.长度最小的子数组


题目建议：本题关键在于理解滑动窗口，这个滑动窗口看文字讲解 还挺难理解的，建议大家先看视频讲解。  拓展题目可以先不做。


题目链接：[https://leetcode.cn/problems/minimum-size-subarray-sum/](https://leetcode.cn/problems/minimum-size-subarray-sum/)
文章讲解：[https://programmercarl.com/0209.长度最小的子数组.html](https://programmercarl.com/0209.%E9%95%BF%E5%BA%A6%E6%9C%80%E5%B0%8F%E7%9A%84%E5%AD%90%E6%95%B0%E7%BB%84.html)
视频讲解：[https://www.bilibili.com/video/BV1tZ4y1q7XE](https://www.bilibili.com/video/BV1tZ4y1q7XE)


## 59.螺旋矩阵II


题目建议：本题关键还是在转圈的逻辑，在二分搜索中提到的区间定义，在这里又用上了。


题目链接：[https://leetcode.cn/problems/spiral-matrix-ii/](https://leetcode.cn/problems/spiral-matrix-ii/)
文章讲解：[https://programmercarl.com/0059.螺旋矩阵II.html](https://programmercarl.com/0059.%E8%9E%BA%E6%97%8B%E7%9F%A9%E9%98%B5II.html)
视频讲解：[https://www.bilibili.com/video/BV1SL4y1N7mV/](https://www.bilibili.com/video/BV1SL4y1N7mV/)


## **区间和**


前缀和是一种思维巧妙很实用 而且 很有容易理解的一种算法思想，大家可以体会一下


文章讲解：[https://www.programmercarl.com/kamacoder/0058.区间和.html](https://www.programmercarl.com/kamacoder/0058.%E5%8C%BA%E9%97%B4%E5%92%8C.html)


## **开发商购买土地**


[https://www.programmercarl.com/kamacoder/0044.开发商购买土地.html](https://www.programmercarl.com/kamacoder/0044.%E5%BC%80%E5%8F%91%E5%95%86%E8%B4%AD%E4%B9%B0%E5%9C%9F%E5%9C%B0.html)


## 总结


题目建议：希望大家也做一个自己对数组专题的总结


文章链接：[https://programmercarl.com/数组总结篇.html](https://programmercarl.com/%E6%95%B0%E7%BB%84%E6%80%BB%E7%BB%93%E7%AF%87.html)


# 解题思路


## 209.长度最小的子数组


没啥头绪，看了好一会暴力解法才明白是怎么运行的。

- 外层用来循环整个数组
- 内层用来循环当前下标及其之后所有数的和
- 直到循环完后找到最小的length
- 相当于两个

滑动窗口的思想就不需要内层循环，用两个指针

- 指针i用来循环整个数组
- 指针j会在sum大于等于目标值时，从sum中减去当前值并向右移动
- 所以这个最坏的情况就是全是目标值-1的值组成的数组，指针j每走一步，i都需要走一步。即时间复杂度最坏为O(2n)

	![209.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/74d08477-dc9f-46b6-8755-7148f50d6628/209.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45GO43JXI4%2F20241031%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241031T125138Z&X-Amz-Expires=3600&X-Amz-Signature=a6b94996cc9465bed71b7868e1907348e6443d994c6e9959c436b0aad0a88200&X-Amz-SignedHeaders=host&x-id=GetObject)


### 59.螺旋矩阵II


## 题解


### 977.有序数组的平方


```javascript
/**
 * 暴力解法
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  // 直观明了的暴力解法
  return nums.map(item => {
    return item * item
  }).sort((a, b) => a-b)
};
```


```javascript
/**
 * 双指针解法
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  // i指向起始位置，j指向终止位置
  let i = 0, j = nums.length - 1, k = nums.length - 1
  // 定义一个新数组result，和A数组一样的大小，让k指向result数组终止位置。
  const res = new Array(nums.length).fill(0)
  while (i <= j) {
    // 得出平方值
    let left = nums[i] * nums[i]
    let right = nums[j] * nums[j]
    if (left < right) {
      // 右边的大，就把右边的平方值放到新数组
      // 新数组上的指针向左移动
      res[k--] = right
      // 并且右边的指针向左移动
      j--
    } else {
      // 左边的大，就把左边的平方值放到新数组
      // 新数组上的指针向左移动
      res[k--] = left
      // 并且左边的指针向右移动
      i++
    }
  }
  return res
};

/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
    // 双指针
    let res = []
    // 定义左右指针
    let left = 0, right = nums.length - 1

    while(left <= right) {
        const le = nums[left] * nums[left]
        const ri = nums[right] * nums[right]
        if(le < ri) {
            // 给数组前增加元素
            res.unshift(ri)
            // 右边的大，右边指针向左移动
            right --
        } else {
            // 左边的大，左边指针向右移动
            res.unshift(le)
            left ++
        }
    }

    return res

};
```


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


## 收获


题解能看懂，也能写出来，但是感觉没有什么通用性的收获。对我来说虽然都是数组的题目，但是解题思路不具备通用性。差不多是那种从没头绪⇒看题解⇒原来可以这样理解⇒理解了⇒下一道题又困住了。回头再刷几道数组题看看，估计还是我刷题刷少了。

