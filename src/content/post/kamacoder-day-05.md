---
date: '2025-03-01 08:00:00'
description: 学习了哈希表的基本理论及其在四个算法题中的应用，包括有效的字母异位词、两个数组的交集、快乐数和两数之和，强调了使用数组和set的场景。提供了相关链接和解题思路。
hidden: true
urlname: kamacoder-day-05
title: 算法训练营第5天｜242.有效的字母异位词、349.两个数组的交集、202.快乐数、1.两数之和
tags:
  - 算法训练营
updated: '2025-03-01 19:29:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


## 题目链接


### 哈希表理论基础


建议：大家要了解哈希表的内部实现原理，哈希函数，哈希碰撞，以及常见哈希表的区别，数组，set 和map。


什么时候想到用哈希法，**当我们遇到了要快速判断一个元素是否出现集合里的时候，就要考虑哈希法**。  这句话很重要，大家在做哈希表题目都要思考这句话。


文章讲解：[https://programmercarl.com/哈希表理论基础.html](https://programmercarl.com/%E5%93%88%E5%B8%8C%E8%A1%A8%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html)


### 242.有效的字母异位词


建议： 这道题目，大家可以感受到 数组 用来做哈希表 给我们带来的遍历之处。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0242.有效的字母异位词.html](https://programmercarl.com/0242.%E6%9C%89%E6%95%88%E7%9A%84%E5%AD%97%E6%AF%8D%E5%BC%82%E4%BD%8D%E8%AF%8D.html)


### 349.两个数组的交集


建议：本题就开始考虑 什么时候用set 什么时候用数组，本题其实是使用set的好题，但是后来力扣改了题目描述和 测试用例，添加了 `0 <= nums1[i], nums2[i] <= 1000` 条件，所以使用数组也可以了，不过建议大家忽略这个条件。 尝试去使用`Set`。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0349.两个数组的交集.html](https://programmercarl.com/0349.%E4%B8%A4%E4%B8%AA%E6%95%B0%E7%BB%84%E7%9A%84%E4%BA%A4%E9%9B%86.html)


### 202.快乐数


建议：这道题目也是 `Set` 的应用，其实和上一题差不多，就是 套在快乐数一个壳子


题目链接/文章讲解：[https://programmercarl.com/0202.快乐数.html](https://programmercarl.com/0202.%E5%BF%AB%E4%B9%90%E6%95%B0.html)


### 1.两数之和


建议：本题虽然是 力扣第一题，但是还是挺难的，也是 代码随想录中 数组，set之后，使用map解决哈希问题的第一题。


建议大家先看视频讲解，然后尝试自己写代码，在看文章讲解，加深印象。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0001.两数之和.html](https://programmercarl.com/0001.%E4%B8%A4%E6%95%B0%E4%B9%8B%E5%92%8C.html)


## 解题思路


### 242.有效的字母异位词


**关键词**

1. 有限的字符，判断重复性问题，就用 hash 表来解决

**思路**

- 当两个字符长度不同，直接返回 false
- 收集第一个字符s出现的次数，当遍历第二个字符 t的时候，如果出现次数为 0 的情况就说明t比 s 多了某个字符，直接返回 false，而不用再收集了。只有遍历下来，s 中所有的字符都出现在了 t 中，就不会再循环中出现字符数量为 0 的情况

### 349.两个数组的交集


**关键词**

1. Set 的构造方法和 Set 转 Array

**思路**

- 不需要记录数字出现的次数，所以不需要用 `map`，直接用两个 `Set`即可
- 将 `nums1` 转换为 Set 1，然后遍历 `nums2`，将在Set1 中出现过的相同的数字存放在一个新的 Set2 中，最后返回新的 Set2
- 思路图

	![image.png](https://image.cody.fan/blog/a7a3a66a36a196d72ab486184d3d323a.png)


### 202.快乐数


**关键词**

1. 拆分数字
2. 善用 reduce 累加器
3. 用 set 存放 totalCount

**思路**

- 只要totalCount不为 1，就一直循环
- 用 set 存放 totalCount，如果totalCount出现过 1 次以上，说明进入了无限循环，直接返回 false

### 1.两数之和


**关键词**

1. 用差值来寻找元素
2. Map 存放元素和其下标

**思路**

- 用Map 存放元素和其下标，用给定的目标值和当前元素做差值，在 Map 中寻找差值即可
- 如果找到了就返回当前元素的下标和 Map 中差值元素的下标
- 能判断当前值比目标元素大就跳过，因为可能存在负数

## 题解


### 242.有效的字母异位词


```javascript
var isAnagram = function(s, t) {
  // 如果两个字符长度不相等，直接返回 false
  if(s.length !== t.length) return false;
  // 用 hash map来存储 字符和字符出现的次数
  const map = new Map()
  for (let i = 0; i < s.length; i++) {
    const char = s[i]
    const ex = map.get(char)
    if (ex) {
      map.set(char, ex + 1)
    } else {
      map.set(char, 1)
    }
  }
  for (let i = 0; i < t.length; i++) {
    const char = t[i]
    const ex = map.get(char)
    if (ex) {
      // 如果 t 字符也出现了已有的字符，直接--次数
      map.set(char, ex -1 )
    } else {
      // 一旦 t 字符中出现了小于等于 0 的字符，说明 t 字符数量比 s 字符多了，直接返回 false
      return false
    }
  }
  // 如果字母出现的次数都相等，就返回 true
  return true
};
```


### 349.两个数组的交集


```javascript
var intersection = function(nums1, nums2) {
  // 可以直接使用 Set 的构造方法，将数组变成 Set
  const set1 = new Set(nums1)

  const set2 = new Set()

  for (let i = 0; i < nums2.length; i++) {
    set1.has(nums2[i]) && set2.add(nums2[i])
  }
  // 可以直接使用 Array.from 将 Set 转为 Array
  return Array.from(set2)

};
```


### 202.快乐数


```javascript
var isHappy = function(n) {
  //  记录累加数，最后要拿这个判断时候是 等于 1
  let totalCount = 0
  const set = new Set()
  // 当totalCount不为 1 时循环继续
  while (totalCount !== 1) {
    // 对数字进行拆分为单个数字，第一次运行时应该使用传入的 n 作为其实数字
    arr = String(totalCount || n).split('')
    for (let i = 0; i < arr.length; i++) {
      // totalCount += arr[i] * arr[i]
      // 这里使用reduce累加器更简单。reduce第二个参数为初始值 0
      // pre 就是上一次计算的值，也就是 total， cur 就是这一次的值
      totalCount = arr.reduce((pre, cur) => {
        return pre + cur * cur
      }, 0)
    }
    // 这里要防止某些数字即使拆分和累加之后一直是无限循环下去的，可以使用 Set 进行去重
    // 如果totalCount出现过一次以上，说明这个数即使拆分下去还是会出现相同的结果，会变成无限循环，那就直接判断为 false
    if (set.has(totalCount)) {
      return false
    }
    // 否则用 Set 记录下totalCount的值
    set.add(totalCount)
  }
  // 如果循环完就意味着没有出现重复的，结果一定是 1
  // 原本写的是 return totalCount === 1，但后面想了下如果totalCount不为 1，while 循环会一直持续下去，不可能走到这里
  return true
};
```


### 1.两数之和


```javascript
var twoSum = function(nums, target) {
  // map 中存放 key 为元素，value 为元素的 index
  const map = new Map()
  for (let i = 0; i < nums.length; i++) {
    const cur = nums[i]
    // 这里不能判断比目标元素大就跳过，因为可能存在负数
    // if (cur > target) continue
    const gap = target - cur
    // 从 map 中找差值
    const v = map.get(gap)
    if (v !== undefined) {
      // 找到差值就直接返回对应两个元素的下标
      return [v, i]
    }
    // 没找到就 set 当前元素和下标
    map.set(cur, i)
  }
};
```


## 收获

- 当遇到要快速判断某个元素是否出现在集合中的时候，就要考虑哈希法
