---
date: '2025-02-27 08:00:00'
description: ''
hidden: true
urlname: kamacoder-day-03
title: 算法训练营第3天｜203.移除链表元素、707.设计链表、206.反转链表
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


### **链表理论基础**


了解一下链表基础，以及链表和数组的区别


文章链接：[https://programmercarl.com/链表理论基础.html](https://programmercarl.com/%E9%93%BE%E8%A1%A8%E7%90%86%E8%AE%BA%E5%9F%BA%E7%A1%80.html)


### 203.移除链表元素


**题目建议：**本题最关键是要理解 虚拟头结点的使用技巧，这个对链表题目很重要。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0203.移除链表元素.html](https://programmercarl.com/0203.%E7%A7%BB%E9%99%A4%E9%93%BE%E8%A1%A8%E5%85%83%E7%B4%A0.html)


### **707.设计链表**


建议： 这是一道考察 链表综合操作的题目，不算容易，可以练一练**使用虚拟头结点**


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0707.设计链表.html](https://programmercarl.com/0707.%E8%AE%BE%E8%AE%A1%E9%93%BE%E8%A1%A8.html)


### **206.反转链表**


建议先看我的视频讲解，视频讲解中对 反转链表需要注意的点讲的很清晰了，看完之后大家的疑惑基本都解决了。


题目链接/文章讲解/视频讲解：[https://programmercarl.com/0206.翻转链表.html](https://programmercarl.com/0206.%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.html)


## 解题思路


### 203.移除链表元素


**关键词**

1. 头节点和后续节点的删除不太一样

**思路**

- 最好的办法就是虚拟一个头节点，删除链表节点，就是把当前节点的 next 指向下个节点的 next

### **707.设计链表**


**思路**

- 需要先定义一个 `LinkNode` 用来描述链表的节点，而`MyLinkedList`是用来记录整个链表的，包括链表的长度 `size`、链表的首节点、尾节点
- 在往链表中添加节点时，需要注意同时注意以上三个变量的更新。首节点和尾节点一定是同时存在，也就是说当没有尾节点时，首节点也一定不存在。
- 还需要注意 `size` 的更新，一定要更新在 `return` 之前

### 206.反转链表


**思路**

- 先使用双指针的写法，然后推出递归写法
- 注意指针只是保存了链表的引用，在循环的过程中只需要改变指针的引用，就不会对原链表造成影响。只有对引用链表的 `next` 进行赋值，才回改变原链表
- 动画演示

![%E7%BF%BB%E8%BD%AC%E9%93%BE%E8%A1%A8.gif](https://image.cody.fan/blog/cb0471076e21b04496e8f8e217ee299c.gif)


## 题解


### 203.移除链表元素


```javascript
var removeElements = function(head, val) {
  // 创建一个虚拟的头节点，使其统一循环的方式
  const newList = new ListNode(0, head)
  // 定义一个指针来遍历链表，但它只是个引用
  // 注意：
  // 用户可能认为cur是一个独立的副本，修改它不会影响原链表。
  // 但实际上，对象（包括链表节点）是通过引用传递的。
  // cur变量存储的是对链表节点的引用，而不是副本。
  let cur = newList
  // 只需要循环cur.next，就能循环原有的链表，因为cur.next 就等于 原有的链表head
  while(cur.next) {
    // 判断相等就改变指针
    if (cur.next.val === val) {
      // 将当前节点的 next 指向下个节点的 next，就能把当前下个节点删除
      cur.next = cur.next.next
    } else {
      // 否则将指针指向链表的下个节点
      // 因此，cur = cur.next只是将cur变量指向下一个节点，而不会改变原链表的结构。
      // 但如果是cur.next = newNext，则会直接修改链表节点之间的连接关系，从而改变原链表
      cur = cur.next
    }
  }
  return newList.next
};
```


### **707.设计链表**


```javascript

class LinkNode {
  constructor(val, next) {
    this.val = val
    this.next = next
  }

}

var MyLinkedList = function() {
  this._size = 0
  this._head = null
  this._tail = null

};

MyLinkedList.prototype.getNode = function(index) {
  // 注意边界清理
  if (index < 0 || index >= this._size) return null
  let node = new LinkNode(0, this._head)
  // 使用指针来遍历链表
  while (index >= 0) {
    index --
    node = node.next
  }
  return node


};

/**
 * @param {number} index
 * @return {number}
 */
MyLinkedList.prototype.get = function(index) {
  if (index < 0 || index >= this._size) return -1
  return this.getNode(index).val
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtHead = function(val) {
  let node = new LinkNode(val, this._head)
  this._size ++
  this._head = node
  // 每次的新增操作都需要考虑 size、head、tail 三个赋值的情况
  // 有头就一定有尾，所以在赋值的时候如果发现 tail 为空，就得赋值
  if (!this._tail) {
    this._tail = node
  }
};

/**
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtTail = function(val) {
  let node = new LinkNode(val, null)
  // 这里要先++
  this._size ++
  if (this._tail) {
	  // 如果添加的时候有尾节点，就得把已存在的尾节点的 next 指向新添加的
    this._tail.next = node
    this._tail = node
    return
  }
  // 如果没有尾节点，说明头尾节点都不存在
  this._tail = node
  this._head = node
};

/**
 * @param {number} index
 * @param {number} val
 * @return {void}
 */
MyLinkedList.prototype.addAtIndex = function(index, val) {
  if (index > this._size) return;
  // 边界条件，可以复用上面的函数
  if (index <= 0) {
    this.addAtHead(val)
    return
  }
  if (index === this._size) {
    this.addAtTail(val)
    return;
  }
  // 需要找到上一个节点，然后对其进行插入新的节点
  let pre = this.getNode(index-1)
  pre.next = new LinkNode(val, pre.next)
  // 别忘了++
  this._size ++
};

/**
 * @param {number} index
 * @return {void}
 */
MyLinkedList.prototype.deleteAtIndex = function(index) {
  if (index < 0 || index >= this._size) return
  // 判断边界，如果就是删除的首节点
  if (index === 0) {
    // 则需要把首节点的 next 赋值给首节点
    this._head = this._head.next
    // 还需要额外判断是否链表就只有一个节点的情况
    if (index === this._size -1) {
      this._tail = this._head
    }
    this._size --
    return;
  }
  // 没有边界情况就通用处理，删除指定位置的节点
  let pre = this.getNode(index-1)
  pre.next = pre.next.next
  if (index === this._size -1) {
    this._tail = pre
  }
  this._size --
};
```


### 206.反转链表


```javascript
//  双指针写法
var reverseList = function(head) {
  let temp = null, pre = null, cur = head
  while(cur) {
	  temp = cur.next
	  // 改变引用，会改变原链表
	  cur.next = pre
	  // 移动指针
	  pre = cur
	  cur = temp
  }
  // 当 cur = null时， 循环终止，此时 pre 就处在新的链表的头节点
  return pre
}
```


```javascript
// 递归法
var reverseList = function(head) {
  // 定义递归函数
	function reverse(cur, pre) {
	  // 当 cur = null时， 循环终止，此时 pre 就处在新的链表的头节点，递归结束的条件
		if(cur === null) return pre
		// 翻转节点指针
		const temp = cur.next
		cur.next = pre
		// 递归函数就不需要变更指针，只需要向下个循环函数参数中赋值新的 cur 和 pre 即可
		// 下一个 cur 就是 temp，pre 就是 cur
		return reverse(temp, cur)
	}
	
	return reverse(head, null)
}
```


## 收获

- `let cur = newList`使用指针，也就是定义一个对原有链表的引用，这样在遍历的过程中，只需要改变 cur 对链表的引用，就能安全的遍历链表，而不用改变原有链表。只有当`cur.next = newNext`，对 next 进行赋值时，则会直接修改链表节点之间的连接关系，从而改变原链表。
- 递归可以从双指针法推导而来。改变指针的位置，其实就是为了进入下一次循环，而递归函数只需要向下个循环函数参数中赋值新的 cur 和 pre 即可
