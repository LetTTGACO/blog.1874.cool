---
date: '2025-03-03 08:00:00'
description: 学习了四个算法题的解法，包括使用哈希法和双指针法，重点在于优化时间复杂度和去重操作，特别是如何通过拆分和差值来提高效率。
hidden: true
urlname: kamacoder-day-06
title: 算法训练营第6天｜454.四数相加II、383.赎金信、15.三数之和、18.四数之和
tags:
  - 算法训练营
updated: '2025-03-03 21:40:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


## 题目链接


### 454.四数相加II


建议：本题是 使用map 巧妙解决的问题，好好体会一下 哈希法 如何提高程序执行效率，降低时间复杂度，当然使用哈希法 会提高空间复杂度，但一般来说我们都是舍空间 换时间， 工业开发也是这样。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0454.四数相加II.html](https://programmercarl.com/0454.%E5%9B%9B%E6%95%B0%E7%9B%B8%E5%8A%A0II.html)


### 383.赎金信


建议：本题 和 242.有效的字母异位词 是一个思路 ，算是拓展题


题目链接/文章讲解：[https://programmercarl.com/0383.赎金信.html](https://programmercarl.com/0383.%E8%B5%8E%E9%87%91%E4%BF%A1.html)


### 15.三数之和


建议：本题虽然和 两数之和 很像，也能用哈希法，但用哈希法会很麻烦，双指针法才是正解，可以先看视频理解一下 双指针法的思路，文章中讲解的，没问题 哈希法很麻烦。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0015.三数之和.html](https://programmercarl.com/0015.%E4%B8%89%E6%95%B0%E4%B9%8B%E5%92%8C.html)


### 18.四数之和


建议： 要比较一下，本题和 454.四数相加II 的区别，为什么 454.四数相加II 会简单很多，这个想明白了，对本题理解就深刻了。 本题 思路整体和 三数之和一样的，都是双指针，但写的时候 有很多小细节，需要注意，建议先看视频。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0018.四数之和.html](https://programmercarl.com/0018.%E5%9B%9B%E6%95%B0%E4%B9%8B%E5%92%8C.html)


## 解题思路


### 454.四数相加II


**关键词**

1. 拆分
2. 通过 0-sum 得到 gap 去另外的集合中找符合条件的数字
3. Map 存放次数

**思路**

- 暴力解法就是 4 层 for 循环去挨个查找相加，统计次数，时间复杂度是O(n^4)
- 但优化后的就是先两两相加得到新的 Map，然后在后续两两相加的过程中去寻找 gap 值

### 383.赎金信


**关键词**

1. Map 存放字母出现的次数

**思路**

- 统计`ransomNote`字母出现的次数，存放到 Map
- 遍历`magazine`时，如果出现，就更新 map 中字母的次数，减 1
- 一旦没出现过或者次数为 0 时，返回 false，否则循环结束的时候返回 true

### 15.三数之和


**关键词**

1. 双指针
2. 需要考虑去重

**思路**

- 先对数组进行排序，这样可以提前判断一些边界条件，例如当某个数值大于 0，就表示后面的数字和自己相加一定是大于 0
- 因为要求结果不能有重复，但不能对结果进行去重，因为会超时，只能在过程中去去重
- 可以在一层 `for` 循环中定义双指针，`left` 指向当前循环的 `i+1` 的位置，`right` 指向数组结尾
- 不断的在每一次循环中去判断 `nums[i] + nums[left] + nums[right]`的和
	- 如果大于 0，则表示 `right` 的值大了，调整 `right` 指针的位置：进行左移
	- 如果小于 0，则表示 `left` 的值大了，调整 `left` 指针的位置：进行右移
	- 如果等于 0，则表示找到了符合条件的三元数组，有两种情况
		1. 假设数组为`[-1,-1,0,1,2]`，当 `i指向第一个 -1, left指向第二个 -1, right指向 2`时，已经找到了其中一组解`[-1,-1,2]`，但还存在第二组解，也就是`[-1,0,1]`。所以找到元素之后还需要同时移动左右指针，来寻找 i 不变时另外可能的解。
		2. 假设数组为`[-1,-1,-1,0,1,2,2]`，当按照情况 1 去移动左右指针后，发现第二组解依旧是`[-1,-1,2]`。所以需要进行去重操作。这个时候就可以判断 `nums[left] === nums[left+1]`，如果相等则说明下一组解依旧是上一个解，就继续向右移动左指针。同时也要判断`nums[right] === nums[right-1]`，如果相等则说明下一组解依旧是上一个解，也需要继续向左移动右指针。
- 去重逻辑分为两层，外层在 for 循环中去重，使用`if (newArr[i] === newArr[i-1]) continue`来去重，但不能使用`newArr[i] === newArr[i+1]`，因为 `i+1` 会占用 `left` 指针的位置
- 内层去重逻辑一定要在拿到一次结果后进行，否则对于`[0,0,0,0]`来说，还没收获`[0,0,0]`的解时，就退出程序了

### 18.四数之和


**关键词**

1. 三数之和的加强版，剪枝条件需要额外注意，还有一些边界情况

**思路**

- 三数之和是用 i 和 左右指针三个下标来确定，那么四数之和就是 i，k 和左右指针四个下标来确定，所以需要两层 for 循环确定 i 和 k
- 这道题的 target 是指定的，也没确定正负，所以剪枝操作不能简单判断 `nums[i] > 0` 就 `return`，需要在target > 0 时才需要这样的剪枝操作。`if (target > 0 && newArr[k] > target) return res`
- 第一层 for 循环确定 k，第二层 for 循环确定`i = k+1, left = i + 1, right = nums.length - 1`
- 去重操作依旧使用`nums[right] === nums[right-1]`时 `continue`，但内层 i 循环时的去重，需要考虑 `i > k+1`。当`k=0，i=1`，如果`nums[1]=nums[0]`，此时`i=1`是`k+1`的位置，所以不应该跳过，否则会漏掉所有以`k=0`和`i=1`的组合

## 题解


### 454.四数相加II


```javascript
var fourSumCount = function(nums1, nums2, nums3, nums4) {
  // 用 map 存在 key = sum，value = 次数
  // 因为可能出现有多个相加为 0 的可能性例如[0,0],[0,0],[0,0],[0,0]，一共应该出现 8 次
  let map1 = new Map()
  for (let i = 0; i < nums1.length; i++) {
    for (let j = 0; j < nums2.length; j++) {
      let sum = nums1[i] + nums2[j]
      const v = map1.get(sum)
      if (v !== undefined) {
        map1.set(sum, v + 1)
      } else {
        map1.set(sum, 1)
      }

    }
  }
  let count = 0
  for (let i = 0; i < nums3.length; i++) {
    for (let j = 0; j < nums4.length; j++) {
      let sum = nums3[i] + nums4[j]
      const gap = 0 - sum
      const v = map1.get(gap)
      if (v !== undefined) {
        count += v
      }
    }
  }
  return count
};
```


### 383.赎金信


```javascript
var canConstruct = function(ransomNote, magazine) {
  const map = new Map()
  const arr1 = magazine.split('')
  // 记录magazine中数字的次数
  for (let i = 0; i < arr1.length; i++) {
    const v = map.get(arr1[i])
    if (v=== undefined) {
      map.set(arr1[i], 1)
    } else {
      map.set(arr1[i], v + 1)
    }
  }

  const arr2 = ransomNote.split('')
  for (let i = 0; i < arr2.length; i++) {
    const cur = arr2[i]
    const v = map.get(cur)
    console.log(cur, v)
    if (v === undefined || v <= 0 ) {
      // 只要没出现过或者次数用完了就返回 false
      return false
    } else {
      // ransomNote出现过一次就-1
      map.set(cur, v - 1)
    }
  }

  return true

};
```


### 15.三数之和


```javascript
var threeSum = function(nums) {
  let result = []
  const newArr = nums.sort((a,b) => a-b)
  for (let i = 0; i < newArr.length; i++) {
    // 排序完的数组，如果当前数字大于 0，则后续不可能比 0 小，不用继续了
    if (newArr[i] > 0) return result
    // 外层循环的去重逻辑，如果当前值和上一个值相等就跳过当前循环
    // 为什么不能判断newArr[i] === newArr[i+1]是因为对于[-1,-1,2]这个数组
    // i-> -1,left -> -1, right -> 2
    // newArr[i] === newArr[i+1] 会**占用** left 指针的位置，让[-1,-1,2]这个解被跳过
    if (newArr[i] === newArr[i-1]) continue
    let left = i + 1
    let right = newArr.length - 1
    while (right > left) {
      if (newArr[i] + newArr[left] + newArr[right] > 0) {
        right --
      } else if (newArr[i] + newArr[left] + newArr[right] < 0) {
        left ++
      } else {
        result.push([newArr[i], newArr[left], newArr[right]])
        // 去重
        // right > left 这里额外的判断其实是优化手段，不要也行，不需要判断那么多次
        while (right > left && newArr[left] === newArr[left+1]){
          left ++
        }
        while (right > left && newArr[right] === newArr[right-1]) {
          right --
        }
        // 这里为什么上面移动完指针后还需要移动指针，是因为
        // [1, -1,-1,0], i -> 1, left -> -1, right -> 0
        // result.push之后其实 left所在的第一个 -1 已经被用掉了
        // 判断newArr[left] === newArr[left+1] 后向右移动 left到第二个-1就终止了，因为下一次判断不满足newArr[left] === newArr[left+1]
        // 此时 left -> 第二个-1，所以这里还需要向右移动
        // 总的来说newArr[left] === newArr[left+1]是判断下一次是否相等，下一次不相等但指针对应的值已经被用过了，所以还需要移动
        left ++
        right --
      }
    }
  }
  return result
};
```


### 18.四数之和


```javascript
var fourSum = function(nums, target) {
  const newArr = nums.sort((a,b) => a - b)
  const res = []
  if(newArr.length < 4) return [];
  for (let k = 0; k < newArr.length; k++) {
    // 剪枝操作，当target>0时，如果newArr[k] > target，则说明后续的循环没有意义了
    if (target > 0 && newArr[k] > target) return res
    // 去重操作，当当前元素和上个元素相同时，会得到相同的答案，所以直接跳过
    if (k > 0 && newArr[k] === newArr[k-1]) continue
    for (let i = k + 1; i < newArr.length; i++) {
      // 去重操作，当当前元素和上个元素相同时，会得到相同的答案，所以直接跳过
      // 注意一定要判断i > k + 1
      // 当k=0，i=1，如果nums[1]等于nums[0]，此时i=1是k+1的位置，所以不应该跳过，否则会漏掉所有以k=0和i=1的组合
      if(i > k + 1 && nums[i] === nums[i - 1]) continue;
      let left = i + 1
      let right = newArr.length - 1
      while (right > left) {
        const sum = newArr[k] + newArr[i] + newArr[left] + newArr[right]
        if (sum > target) {
          right --
        } else if (sum < target) {
          left ++
        } else {
          res.push([newArr[k], newArr[i], newArr[left], newArr[right]])
          // 这里的逻辑和三数之和一样，去重操作
          while (right > left && newArr[left] === newArr[left + 1]) {
            left ++
          }
          while (right > left && newArr[right] === newArr[right - 1]) {
            right --
          }
          left ++
          right --
        }
      }

    }
  }

  return res

};
```


## 收获

- 双指针的应用，用来遍历三数、四数只和时，很好用，但也应该注意去重操作，去重操作确实意想不到，只能慢慢积累经验
- `gap` 差值用来寻找一些需要的元素很方便，结合哈希表可以很快判断某个元素的位置和次数
