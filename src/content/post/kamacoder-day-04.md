---
date: '2025-02-28 08:00:00'
description: 学习了链表相关的算法，包括两两交换节点、删除倒数第N个节点、链表相交和环形链表的入口。掌握了虚拟节点、双指针和快慢指针的解题思路，理解了环的入口计算方法。
hidden: true
urlname: kamacoder-day-04
title: 算法训练营第4天｜24.两两交换链表节点、19.删除链表的倒数第N个节点、160.链表相交、142.环形链表II
tags:
  - 算法训练营
updated: '2025-02-28 22:52:00'
draft: false
---

> 1. 今日学习的文章链接和视频链接  
> 2. 自己看到题目的第一想法  
> 3. 看完代码随想录之后的想法  
> 4. 自己实现过程中遇到哪些困难  
> 5. 今日收获，记录一下自己的学习时长


## 题目链接


### 24.两两交换链表中的节点


用虚拟头结点，这样会方便很多。


本题链表操作就比较复杂了，建议大家先看视频，视频里我讲解了注意事项，为什么需要temp保存临时节点。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0024.两两交换链表中的节点.html](https://programmercarl.com/0024.%E4%B8%A4%E4%B8%A4%E4%BA%A4%E6%8D%A2%E9%93%BE%E8%A1%A8%E4%B8%AD%E7%9A%84%E8%8A%82%E7%82%B9.html)


### 19.删除链表的倒数第N个节点


双指针的操作，要注意，删除第N个节点，那么我们当前遍历的指针一定要指向 第N个节点的前一个节点，建议先看视频。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0019.删除链表的倒数第N个节点.html](https://programmercarl.com/0019.%E5%88%A0%E9%99%A4%E9%93%BE%E8%A1%A8%E7%9A%84%E5%80%92%E6%95%B0%E7%AC%ACN%E4%B8%AA%E8%8A%82%E7%82%B9.html)


### 160.链表相交


本题没有视频讲解，大家注意 数值相同，不代表指针相同。


题目链接/文章讲解：[https://programmercarl.com/面试题02.07.链表相交.html](https://programmercarl.com/%E9%9D%A2%E8%AF%95%E9%A2%9802.07.%E9%93%BE%E8%A1%A8%E7%9B%B8%E4%BA%A4.html)


### 142.环形链表II


算是链表比较有难度的题目，需要多花点时间理解 确定环和找环入口，建议先看视频。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0142.环形链表II.html](https://programmercarl.com/0142.%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8II.html)


## 解题思路


### 24.两两交换链表中的节点


**关键词**

1. 虚拟节点
2. 循环终止条件
3. 保存临时节点

**思路**

- 定义虚拟节点，主要是为了统一后续的节点循环条件统一
- 手动分析循环终止条件
	- 如果是奇数链表，`[1,2,3,4,5]`，当 `cur = 4` 的时候，剩下最后一个 5 可以不用操作，也就是说 `cur.next.next`为空就终止，对应循环条件就是 `while(cur.next && cur.next.next !== null)`
	- 如果是偶数链表，`[1,2,3,4]`，当 `cur = 4`时，后续也不用操作，也就是说`cur.next`为空就终止，对应循环条件就是 `while(cur.next !== null)`
	- 所以循环终止的条件就是`cur.next`（偶数）为空，或者`cur.next.next`（奇数）为空，就不用操作了。但因为奇数的终止条件其实已经包含偶数的终止条件。因为需要同时满足奇数和偶数的终止条件，那么只需要用奇数的循环终止条件就行。所以最终的循环条件就是`while (cur.next && cur.next.next !== null)`
- 交换节点就按照虚拟节点 → 节点 2，节点 2 → 节点 1，节点 1 → 节点 3。但因为虚拟节点 → 节点 2时，节点 1 就无法获取，所以需要保存临时变量。同样的节点 2 → 节点 1时，节点 3 也无法获取，所以也需要保存临时变量
- 交换过后的链表为虚拟节点 → 节点 2 → 节点 1 → 节点 3。而当前指针还是在虚拟节点，所以只需要将当前指针`cur`指向`cur.next.next`，也就是节点 1 就行
- 流程演示

	![image.png](https://image.cody.fan/blog/ecdcf8227b053b6697229389231022a4.png)

- 交换结果

	![image.png](https://image.cody.fan/blog/d91c496b0d0475cfa63f935b7e0dc432.png)


### 19.删除链表的倒数第N个节点


**关键词**

1. 虚拟节点
2. 快慢指针

**思路**

- 让快指针先走，当快指针走过目标 n 的次数后，快慢指针一起移动，当快指针指向最后一个节点时，慢指针刚好指向的时候目标节点的上一个节点。此时再做删除目标节点的操作

### 160.链表相交


**关键词**

1. 交点不是数值相等，而是指针相等。
2. 对齐链表

**思路**

- 对齐链表，将长链表放上面，短链表放下面，那么后续的指针走的时候就同步了。所以最主要就是对齐链表指针
- 分别得到两条链表的长度，如果不相同，则使用代码将 `curA` 始终指向长链表，`curB` 始终指向短链表。`lenA` 和 `lenB` 也一样，这样就能统一操作。
- 让长链表指针先走。通过 `lenA - lenB` 找到 `gap` 差值，让长链表指针`curA`先走。走到 `i = 0`时，则两个链表指针位置相同，然后就可以同时移动指针并且判断两个指针知否相同

### 142.环形链表II


**关键词**

1. 判断链表是否有环
2. 用快慢指针是否相遇判断是否有环

**思路**

- 用 2 步走的快指针和 1 步走的慢指针进行遍历，当快指针和慢指针相遇的时候，X 和 Z 的距离时一样的，所以重新定义两个新指针同时一步一步走到它们相遇时，就是环的起点。
- 相遇的动画

	![%E7%9B%B8%E9%81%87%E5%8A%A8%E7%94%BB.gif](https://image.cody.fan/blog/908cb2b25794e34f533d17c62da6b38e.gif)

- 计算公式

	![%E8%AE%A1%E7%AE%97%E5%85%AC%E5%BC%8F.png](https://image.cody.fan/blog/909cadd9f63be3b2b9033205fdd2ffa0.png)


	当快慢指针相遇时，快指针走过的路程为 `x + y + n(y+z)`，慢指针走过的路程为 `x+y`，由于快指针是 2 步着走，所以`快指针走过的路程 = 慢指针走过的路程 x 2`。


	由此得出公式


	$$
	(x + y) * 2 = x + y + n (y + z)
	$$


	两边消除之后得到


	$$
	x + y = n (y + z)
	$$


	环的入口其实就是 x 的距离，所以关于 x 的方程就变成了


	$$
	x = n (y + z) - y
	$$


	再从`n(y+z)`中提出一个`(y+z)`来，整理公式之后为如下公式


	$$
	x = (n - 1) (y + z) + z
	$$


	由于 n 一定是大于 1 的，因为他们不可能不在圈里面相遇。那么当`n=1`时，公式就简化为了


	$$
	x = z
	$$


	那么就可以知道，当在相遇点同时定义两个指针，**一个从相遇点出发，一个从起点出发，他们走过的路程时一样的。**


	**当他们相遇时的节点即为环的入口**

- 计算相遇点动画展示

	![%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8_II_%E5%85%A5%E5%8F%A3.gif](https://image.cody.fan/blog/a339012da8513708605a5b095c11f38d.gif)


## 题解


### 24.两两交换链表中的节点


```javascript
//  指针法
var swapPairs = function(head) {
  // 定义虚拟节点，主要是为了统一后续的节点循环条件统一
  let node = new ListNode(0, head)
  // 定义指针指向虚拟节点
  let cur = node
  // 如果是奇数链表，1,2,3,4,5，当 cur = 4的时候，剩下最后一个 5 可以不用操作，也就是说 cur.next.next 为空就终止，对应循环条件就是 while(cur.next && cur.next.next !== null)
  // 如果是偶数链表，1,2,3,4，当 cur = 4时，后续也不用操作，也就是说cur.next为空就终止，对应循环条件就是 while(cur.next !== null)
  // 所以循环终止的条件就是cur.next（偶数）为空，或者cur.next.next（奇数）为空，就不用操作了
  // 但因为奇数的终止条件其实已经包含偶数的终止条件，如果想两个都满足，那么只需要用奇数的循环终止条件就行
  while (cur.next && cur.next.next !== null) {
    // 节点 1
    let temp = cur.next
    // 节点 3
    let temp1 = cur.next.next.next
    // node - 节点 2
    cur.next = cur.next.next
    // 节点 2 - 节点 1
    cur.next.next = temp
    // 节点 1 - 节点 3
    temp.next = temp1
    // 移动指针
    cur = cur.next.next
  }
  return node.next
};
```


```javascript
// 递归法
var swapPairs = function(head) {
  let node = new ListNode(0, head)
  function tempfun(cur) {
    // 递归终止条件
    if (cur.next === null || cur.next.next === null) return node.next
    // 保存节点 1,3
    let temp = cur.next
    let temp1 = cur.next.next.next
    // cur -> 2
    cur.next = cur.next.next
    // 2 -> 1
    cur.next.next = temp
    // 1 -> 3
    temp.next = temp1
    return tempfun(cur.next.next)
  }
```


### 19.删除链表的倒数第N个节点


```javascript
//  暴力解法，先统计长度再找到目标节点
var removeNthFromEnd = function(head, n) {
  let node = new ListNode(0, head)
  let cur = node
  let size = 0
  // 先统计长度
  while (cur) {
    size ++
    cur = cur.next
  }
  // 找到目标节点的 index
  i = size - n
  let pre = node
  let cur1 = node.next
  while (i>=0) {
    i--
    if (i=== 0) {
      // 找到目标节点就进行删除
      pre.next = cur1.next
      // 返回目标节点
      return node.next
    }
    pre = cur1
    cur1 = cur1.next
  }
};
```


```javascript
// 双指针，快慢指针解法
var removeNthFromEnd = function(head, n) {
  // 双指针
  let node = new ListNode(0, head)
  let fast = node
  let slow = node
  let i = 0
  while (fast) {
    // 快指针的 next 为空，说明走到了头
    if (fast.next === null) {
      // 就删除慢指针的下一个节点
      slow.next = slow.next.next
      // 返回头节点
      return node.next
    } else {
      i++
      fast = fast.next
      // 让快指针先走，走到＞n 的时候，再让慢指针走
      if (i>n) {
        slow = slow.next
      }
    }
  }
};
```


### 160.相交链表


```javascript
// 遍历链表，获取链表长度
const getLength = function (head) {
  let len = 0
  let cur = head
  while (cur) {
    len ++
    cur = cur.next
  }
  return len
}

var getIntersectionNode = function(headA, headB) {

  let curA = headA
  let curB = headB
  let lenA = getLength(headA)
  let lenB = getLength(headB)
  if (lenA < lenB) {
    // 保证长的在上面
    [curA, curB] = [curB, curA];
    [lenA, lenB] = [lenB, lenA]
  }
  // 对齐两个链表的指针，找出差值，让长链表指针先走
  let i = lenA - lenB
  while (i > 0) {
    i--
    curA = curA.next
  }
  // 这个时候就一起走指针，后续的长度都相同，所以无论是判断curA还是curB，返回curA或者curB 都行
  while (curA) {
    // 如果指针相同，则返回任意一个指针
    if (curA === curB) {
      return curA
    }
    curA = curA.next
    curB = curB.next
  }

}; 
```


### 142.环形链表II


```javascript
var detectCycle = function(head) {
  let slow = head
  let fast = head
  while(fast && fast.next) {
    // 快指针 2 步走
	  fast = fast.next.next
	  // 慢指针 1 步走
	  slow = slow.next
	  // 当快慢指针相遇时
	  if(slow === fast) {
	    // 当 n = 1 时 x 的距离和 z 的距离相等
	    // 所以 x 和 z 相遇时的节点就是环的入口
	    let x = head
	    let z = fast
	    while(x !== z) {
	      x = x.next
	      z = z.next
	    }
	    return x
	  }
  }
  // 没找到就返回 null
  return null
};
```


## 收获

- 环型链表的数学计算过程真的很抽象，很难想到是这么计算环的入口。不过一旦掌握的时候，在做其他题目的时候就能想到该怎么找到环的入口，其他题目无非是之前做过题目的整合和一些变通，多刷刷多背一背就知道怎么解题了。
