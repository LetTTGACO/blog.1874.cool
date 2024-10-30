---
date: '2024-10-30 08:00:00'
description: ''
hidden: true
urlname: kamacoder-day-01
title: 代码随想录算法训练营第1天｜704. 二分查找、27. 移除元素
tags:
  - 算法训练营
updated: '2024-10-31 00:18:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


# 题目链接


## **数组理论基础**


文章链接：[https://programmercarl.com/数组理论基础.html](https://programmercarl.com/%E6%95%B0%E7%BB%84%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html)


**题目建议**： 了解一下数组基础，以及数组的内存空间地址，数组也没那么简单。


## **704. 二分查找**


**题目建议**： 大家能把 704 掌握就可以，35.搜索插入位置 和 34. 在排序数组中查找元素的第一个和最后一个位置 ，如果有时间就去看一下，没时间可以先不看，二刷的时候在看。


先把 704写熟练，要**熟悉 根据 左闭右开，左闭右闭 两种区间规则 写出来的二分法**。


题目链接：[https://leetcode.cn/problems/binary-search/](https://leetcode.cn/problems/binary-search/)


文章讲解：[https://programmercarl.com/0704.二分查找.html](https://programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html)


视频讲解：[https://www.bilibili.com/video/BV1fA4y1o715](https://www.bilibili.com/video/BV1fA4y1o715)


## **27. 移除元素**


**题目建议**：  暴力的解法，可以锻炼一下我们的代码实现能力，建议先把暴力写法写一遍。 **双指针法 是本题的精髓，今日需要掌握**，至于拓展题目可以先不看。


题目链接：[https://leetcode.cn/problems/remove-element/](https://leetcode.cn/problems/remove-element/)


文章讲解：[https://programmercarl.com/0027.移除元素.html](https://programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html)


视频讲解：[https://www.bilibili.com/video/BV12A4y1Z7LP](https://www.bilibili.com/video/BV12A4y1Z7LP)


# 解题思路


## 704.二分查找


### 关键词

1. **有序数组**
2. **无重复元素**，因为一旦有了重复元素，二分查找法返回的元素下标不一定是唯一的

### 思路

- 找到数组中间的下标
- 如果中间下标对应的值大于目标值，则说明目标值在左半边数组
- 如果中间下标对应的值小于目标值，则说明目标值在右半边数组
- 循环往复，直到中间下标对应的值等于目标值，返回下标值，否则返回-1
- 可以构建两个指针，通过移动指针的位置来缩小区间范围
- 需要注意区间的边界值，也就是左闭右闭、左闭右开两种情况的取值和判断
- 左闭右闭测试用例为单个元素数组，即左===右，所以while循环需要≤
- 左闭右开其实对while循环边界无要求，因为左不可能等于右，是无效空间

## 27.移除元素


### 关键词

1. 原地删除/修改

### 思路

- 没思路，不知道什么是原地修改，看了解析才知道什么是原地修改，暴力解法比较通俗易懂，就是后面的数组覆盖前面的数组。每一次覆盖后，最外层的下标需要减1，因为被后面新的数组覆盖了。数组的size也需要减1，因为元素被删除了
- 双指针法。

	> 双指针法（快慢指针法）在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法。

	1. 定义一个快指针，用于寻找目标元素
	2. 定义一个慢指针，当寻找到目标元素时，就跳过前进。
	3. 最后返回慢指针的下标

# 题解


## 704.二分查找


```javascript
/**
 * 左闭右开
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // right是数组最后一个数的下标+1，nums[right]不在查找范围内，是左闭右开区间
    let left = 0, right = nums.length;    
    // 当left=right时，由于nums[right]不在查找范围，所以没必要包括此情况。
    // 但是这种情况稳妥，可以不考虑边界
    while (left < right) {
      // 位运算 + 防止大数溢出
      const mid = left + ((right - left) >> 1);
      // const mid = left + ((right - left) / 2);
      // 如果中间值大于目标值，中间值不应在下次查找的范围内，但中间值的前一个值应在；
      // 由于right本来就不在查找范围内，所以将右边界更新为中间值，如果更新右边界为mid-1则将中间值的前一个值也踢出了下次寻找范围
      if (nums[mid] > target) {
        right = mid;  // 去左区间寻找
      } else if (nums[mid] < target) {
        left = mid + 1;  // 去右区间寻找
      } else {
        return mid;
      }
    }
    return -1;
};
```


```javascript
/**
 * 左闭右闭
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function(nums, target) {
    // right是数组最后一个数的下标，num[right]在查找范围内，是左闭右闭区间
    let left = 0, right = nums.length - 1
    // 当left=right时，由于nums[right]在查找范围内，所以要包括此情况
    while(left <= right) {
      // 位运算 + 防止大数溢出 取中间值
      const mid = left + ((right - left) >> 1);
      if(nums[mid] === target) {
        return mid
      // 如果中间数大于目标值，要把中间数排除查找范围，所以右边界更新为mid-1；
      // 如果右边界更新为mid，那中间数还在下次查找范围内
      } else if(nums[mid] < target) {
        // 去右面闭区间寻找
        left = mid + 1
      } else {
        // 去左面闭区间寻找
        right = mid - 1
      }
    }
    return -1
};
```


## 27.移除元素


```javascript
/**
 * 暴力解法
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let size = nums.length
  for (let i = 0; i < size; i++) {
    if (nums[i] === val) {
      // 将后面的元素整体前移
      for (let j = i; j < size; j++) {
        // 赋值操作，将后面的元素赋给前一个元素
        nums[j] = nums[j + 1]
      }
      // 每一次成功前移，都会造成外层下标需要前移，才能保证下一个元素能被正确检测
      i = i - 1
      // 每一次成功前移，都会造成数组的长度减1
      size = size - 1
    }
  }
  return size
};
```


```javascript
/**
 * 双指针法（快慢指针）
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  // 慢指针
  let slowIndex = 0
  // 快指针
  for (let falseIndex = 0; falseIndex < nums.length; falseIndex++) {
    // 如果慢指针所对应的值不为目标值
    if (nums[slowIndex] !== val) {
      // 并且把快指针的值赋值给慢指针
      // 如果相等过，则当下一次不相等时，慢指针指向的元素就会被覆盖为不相等的元素，
      // 也就相当于和目标值相等的元素被原地删除了
      nums[slowIndex] = nums[falseIndex]
      // 慢指针+1
      slowIndex = slowIndex + 1
    }
  }
};
```


# 收获

- 位运算取中间下标`const mid = left + ((right - left) >> 1)`，相当于`Math.floor`舍掉多余
- 双指针法（快慢指针法）在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法。
- 好久没刷题，全忘光了，基本都是跟着题解的思路做题，希望第二遍的时候可以有点自己的思路
