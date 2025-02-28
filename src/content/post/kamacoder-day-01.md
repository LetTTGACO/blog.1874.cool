---
date: '2025-02-25 08:00:00'
description: 今日学习了二分查找、移除元素和有序数组的平方等算法，掌握了双指针法和暴力解法的实现思路，记录了学习收获和遇到的困难。
hidden: true
urlname: kamacoder-day-01
title: 算法训练营第1天｜704.二分查找、27.移除元素、977.有序数组的平方
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


### **数组理论基础**


文章链接：[https://programmercarl.com/数组理论基础.html](https://programmercarl.com/%E6%95%B0%E7%BB%84%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html)


**题目建议**：了解一下数组基础，以及数组的内存空间地址，数组也没那么简单。


### **704.二分查找**


**题目建议**： 大家能把 704 掌握就可以，35.搜索插入位置 和 34. 在排序数组中查找元素的第一个和最后一个位置 ，如果有时间就去看一下，没时间可以先不看，二刷的时候在看。


先把 704写熟练，要**熟悉 根据 左闭右开，左闭右闭 两种区间规则 写出来的二分法**。


题目链接：[https://leetcode.cn/problems/binary-search/](https://leetcode.cn/problems/binary-search/)


文章讲解：[https://programmercarl.com/0704.二分查找.html](https://programmercarl.com/0704.%E4%BA%8C%E5%88%86%E6%9F%A5%E6%89%BE.html)


视频讲解：[https://www.bilibili.com/video/BV1fA4y1o715](https://www.bilibili.com/video/BV1fA4y1o715)


### **27.移除元素**


**题目建议**：  暴力的解法，可以锻炼一下我们的代码实现能力，建议先把暴力写法写一遍。 **双指针法 是本题的精髓，今日需要掌握**，至于拓展题目可以先不看。


题目链接：[https://leetcode.cn/problems/remove-element/](https://leetcode.cn/problems/remove-element/)


文章讲解：[https://programmercarl.com/0027.移除元素.html](https://programmercarl.com/0027.%E7%A7%BB%E9%99%A4%E5%85%83%E7%B4%A0.html)


视频讲解：[https://www.bilibili.com/video/BV12A4y1Z7LP](https://www.bilibili.com/video/BV12A4y1Z7LP)


### **977.有序数组的平方**


题目链接：[https://leetcode.cn/problems/squares-of-a-sorted-array/](https://leetcode.cn/problems/squares-of-a-sorted-array/)


文章讲解：[https://programmercarl.com/0977.有序数组的平方.html](https://programmercarl.com/0977.%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.html#%E6%80%9D%E8%B7%AF)


视频讲解：[https://www.bilibili.com/video/BV1QB4y1D7ep](https://www.bilibili.com/video/BV1QB4y1D7ep/?vd_source=fdba29052394d0149cd1acfab0b79da9)


## 解题思路


### 704.二分查找


**关键词**

1. 有序数组
2. 无重复元素，因为一旦有了重复元素，二分查找法返回的元素下标不一定是唯一的

**思路**

- 找到数组中间的下标
- 如果中间下标对应的值大于目标值，则说明目标值在左半边数组
- 如果中间下标对应的值小于目标值，则说明目标值在右半边数组
- 循环往复，直到中间下标对应的值等于目标值，返回下标值，否则返回-1
- 可以构建两个指针，通过移动指针的位置来缩小区间范围
- 需要注意区间的边界值，也就是左闭右闭、左闭右开两种情况的取值和判断
- 如果选择左闭右闭，后续的判断也需要保持这个原则，需要使用`while(left ≤ right)`，在更新右边界`right`时也需要 `right = middle -1`
- 如果选择左闭右开，后续的判断也需要保持这个原则，需要使用`while(left < right)`，在更新右边界`right`时也需要 `right = middle`
- 左闭右开其实对while循环边界无要求，因为左不可能等于右，是无效空间

### 27.移除元素


**关键词**

1. 原地删除/修改

**思路**

- 没思路，不知道什么是原地修改，看了解析才知道什么是原地修改，暴力解法比较通俗易懂，就是后面的数组覆盖前面的数组。每一次覆盖后，最外层的下标需要减1，因为被后面新的数组覆盖了。数组的size也需要减1，因为元素被删除了。
- 当移除一个等于 val 的元素后，数组中该位置会被后面的元素覆盖。如果不进行 i-- 操作，外层循环的索引 i 会继续向后移动，这样就会跳过刚刚移动到当前位置的新元素。因此，执行 i-- 可以让外层循环再次检查当前位置的新元素，确保不会遗漏任何等于 val 的元素。
- 假设数组 nums = [3, 2, 2, 3]，val = 3。当 i = 0 时，nums[0] 等于 val，因此会将后面的元素向前移动一位，数组变为 [2, 2, 3, _]。如果不执行 i--，i 会变为 1，这样就会跳过新移动到 nums[0] 的元素 2。执行 i-- 后，i 仍然为 0，下一次循环会再次检查 nums[0]，确保不会遗漏任何等于 val 的元素。
- 双指针法。

	> 双指针法（快慢指针法）在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法。

	1. 定义一个快指针，用于寻找目标元素
	2. 定义一个慢指针，当寻找到目标元素时，就跳过前进。
	3. 最后返回慢指针的下标

### 977.有序数组的平方


**关键词**

1. 双指针

**思路**

- 使用头尾双指针，同时移动他们向中间靠拢，当头≤尾指针时终止执行
- 因为头指针所在的负数的平方可能会比原有的尾指针所在的正数的平方大，所以需要在双指针移动的过程中进行从大到小排序。那么就可以事先定义数组长度的下标值，在找到最大值时就更新结果数组的最后一位下标的值，然后下标减一
- 动画演示

	![%E6%9C%89%E5%BA%8F%E6%95%B0%E7%BB%84%E7%9A%84%E5%B9%B3%E6%96%B9.gif](https://image.cody.fan/blog/9b849a5c97234da46ee9049a0c43e314.gif)


## 题解


### 704.二分查找


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
      // 定义两个接近最大安全整数的数
			// const left = Number.MAX_SAFE_INTEGER;
			// const right = Number.MAX_SAFE_INTEGER;
			
			// 直接相加会导致溢出
			// const badMiddle = Math.floor((left + right) / 2);
			// console.log('直接相加得到的中间值:', badMiddle); // 输出一个错误的结果
			
			// 使用安全的方法计算中间值
			// const goodMiddle = Math.floor(left + (right - left) / 2);
			// console.log('安全方法得到的中间值:', goodMiddle); // 输出
      
      
      // const mid = left + ((right - left) >> 1); 简单位移动
      const mid = left + ((right - left) / 2);
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


### 27.移除元素


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
      // 当移除一个等于 val 的元素后，数组中该位置会被后面的元素覆盖。如果不进行 i-- 操作，外层循环的索引 i 会继续向后移动，这样就会跳过刚刚移动到当前位置的新元素。因此，执行 i-- 可以让外层循环再次检查当前位置的新元素，确保不会遗漏任何等于 val 的元素。
      // 假设数组 nums = [3, 2, 2, 3]，val = 3。当 i = 0 时，nums[0] 等于 val，因此会将后面的元素向前移动一位，数组变为 [2, 2, 3, _]。如果不执行 i--，i 会变为 1，这样就会跳过新移动到 nums[0] 的元素 2。执行 i-- 后，i 仍然为 0，下一次循环会再次检查 nums[0]，确保不会遗漏任何等于 val 的元素。
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


## 收获

- 位运算取中间下标`const mid = left + ((right - left) >> 1)`，相当于`Math.floor`舍掉多余
- 双指针法（快慢指针法）在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法。
- 好久没刷题，全忘光了，基本都是跟着题解的思路做题，希望第二遍的时候可以有点自己的思路
