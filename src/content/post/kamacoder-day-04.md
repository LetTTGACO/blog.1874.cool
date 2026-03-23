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

	![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/c23d8218-2e27-48fc-9662-0220c4431b62/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WU7WVGQ4%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSbl%2FGPuIgQhjevs0g6cY6CvpioG2qg8mJcY33hdPq0AIhAKOlZuN8d%2BLzQTuSJmq3pTWdC7bqRGdnESKkKjFo7Iq4Kv8DCHEQABoMNjM3NDIzMTgzODA1IgzXiORkNehD7tfZy%2BYq3ANJX%2FN6AuNC7VE31acO3TzpSiLfq4HngB5NiswAl9Gb4gKrVVHIUZKn9cM7fQ4rRXprXZchetnrD7QKS%2F7pIQbvOrSlwsesZQZQYzbD86Iry7E%2BrKKHI6B1b6OLTucuT9C%2FvukZ3KcOc%2BVhpbhZlHVNtrZNo1VuMd1TMcERCQpAuzLCJ%2FCV6EvMI2yYjeduR%2BQOx0hEgTMOUqGX6J3bEd9E3Cz31R7Z%2F8NshZlXo9nAG3BQ6RvK63QxnyD3UjWC9L3q17Z448vCM1r%2FvaKkGz64y1z8iAMgXEPcsk2G1hHvutml5rwDEmaFU2l3QiJFJcH2UkHcn%2Bdy3r7krz4VA1dMldcCy5BU%2FDXvpJfQBs6BgZ0fNQYZpTRQ2CtMaUfx1DaAJ672xSI8Wl2Jyc%2FxyirdN3I4wm%2FsNQaaGBu4sgzDUQZSsVhlIFsDWSvdK9SeujeygL47N%2Fmf08WtB4IAhiFZRskHy%2FctYAYsekq6fppkQrtxdHyRq0j2JWMOXnDk8rc%2Ba3%2Fygh48PBrH3M5Ly5Z1vcloYf%2F%2B%2B185Q5cI%2FcN79bcReqAjB2KV19hH18Yr5RuTWBcKqIAXaSYEPdT6kSS6eAFEVuloo1z8RzMEZHnUNvIfNweCtpnxV3h1ozCV94HOBjqkAedsIFNS4iVt1Nvh02twvFNPEc2GQE16a4VCqfsKl%2Bp9PqvEqORbbPbiGCZR%2FROjDfztqFWSFtS0safRj3TpUJ4IwkQ9PygBAcXh6p4SzRMlt%2Bz4HuSx0RIuQQJjIdEjQL1mFaxEv%2BroDqa2%2BOKB%2FPbzIuXcXeE2rNjmkwG3wj2g5AFSBYkk0r8CaJII9u74CNwTttTLzNJnOiA9urzA9%2F%2FE7Tv1&X-Amz-Signature=b261059b4147749753ed52492f866b913652f89cefb5a9ec5a17ba987487cd70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- 交换结果

	![image.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/7d172c42-0a80-443e-861c-3fbaf9406434/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROTNV6JW%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004629Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhqKD0POS3Bpq0zEuD5vY5CDGF7lSbRTvZZjDpzh2TIAIgMNFo3ExnZOTX9Xy4YkUGlQ4J1tO993ftmT2BHcdm7aIq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDAdQPNhHTjK6cz7gPCrcA%2BjVmDXfT6OQuoHljpwQ%2BSmkUyy0lJTjHG07TCUonjEsMdu9wWBjaGJG5tTFT0kR%2BAqo8xYmMgRzeYw82YZ8sD%2Fl8nEx7vMatlAVRfVZEHWNxAbO%2FGALrGQPSjv4B1e%2FCjOf2DH%2FePkS%2FU0VDlVgzopiFzocRPf6MfrTb4PPrzmtlj64Ynp3Cil50C1kCduCrDAfxYNMzhqEvf0KTeKSLHDH82z17FJQPOCCvEBpSAeylnB2zbvFsBcRsiFYjGEXXNMjS5jTmgLKsGAUwn1SiNn%2BvMpRFb23EVo9rJlhgrkrH9ODoban2cOXgFAzyU7K9ESD2OZ28N28cQKVguduy%2F9miu0tnqshZZdJ%2FL6tmBzjeuiPOK%2BEH3AP6lyesjZr32RdVK1ut01w1raxLMyHuF24iFWJFQNpsnM2Wp4dUgX2GqVDxSoiG7DWD1%2Bfz%2FY7uYm3CsmD5%2FaXV2a2%2BLqL8H6HueEixJqQFU%2FpwLXP2rH9iG%2F5z27eCg8GlnotjL%2B9a7YlcaicS8hpmc5dc8zTBqW1tdJ1PvR2PxL22cOx3epHp7frN9uWtcZlq9IEgMwKpE%2F4OYAEsV4f9hGImm32GXRFINI1sPnZeZ29caO5y%2BptNWhzWCk8SD6gwpGoMO72gc4GOqUBM3Xx9Ng7Go10YcyOrXxe97zzcbv3BOTOl4M59Z8wZA8mALBEEGGrK1dp41EzbyRf0tldK13VssyaLCJ7KKpDws58vOOUCLyuyxnCIeN9NhI6D5z7G7PCI0PM%2BG5GdkeV9TJoegkJH6BHSF4LpEjIUVpuAn%2F7fMrotfkrGQDqbZvApuarSycLr%2B8WLiFcekgm8SmVSXqqOGnT0%2F7QN9SnY9imhxta&X-Amz-Signature=2b97e846b7ddc1d34bb13277bb7ce83105c89831eaa98e3d27c964f5123bf263&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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

	![%E7%9B%B8%E9%81%87%E5%8A%A8%E7%94%BB.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/462de2a9-520a-4c98-a989-949b74f16fa4/%E7%9B%B8%E9%81%87%E5%8A%A8%E7%94%BB.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663HP276I5%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BLr40V2RkBovcAXVxrrwI2Zll0CfrD%2FHZKlU8eEzfLgIgUYGSQWDFKzrkRxKCLQGSzm95Ls4X6jHwMfGmInI41vYq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDDB6DmWlrHP6CmWtNyrcA5hZ4DQMHohssGmltkxptbTkR3%2FWPLm3XbV6v%2FsQBis0%2FLeJNrYJ06jzh39iPl9%2FCWb5ujReioG5p%2F6j44s4ViBJfSXpq42eZi60sfN7VXGiIPCQAsL7mxp0ONfCujjNOEwU7o0mYSB1iFaJT%2FtkglaAnLv0iy3tVMU9GBcQEpxY0jKuhPFW%2BWzvqDtXg4jK87ehwuE%2Bpds2EH86BAdmHCDj0JLOP5YO7h0Bk7%2FvAiA0OrULc56AUyV20kVhc816byxWwlJyH86k5ehZtdUfmVMse%2FLFVlYzMyzE3uPSpH14PdfTKvJn6mCLItqGYHCW6TPOtvLl9pJBT2Jgsb7876pG%2FydF8sS3ENGair4s85Va4K5HGhvKgHPJ0o1%2FnzWq7cKe5t19eJFsO%2F9x4l6VkujLxx2JR2x2A1jIPvz6clDa7XHorn9XiGGYcXx8P5eP89SJ%2FM0BhZY%2FOshDucc%2B37s3yFW6qT7h1pAtZdAsKMTAsVXzf%2FCsiDRu9SRbWafxzVwWTXxTadd01jCgDibh5YM7umQmPCDuJQtvfDsRnj%2FmHlV1wY9xRBMr%2BHCWc6im8M6wmA4tUT06wj8Px%2FlTVL6HKq6Y44d8BsQYUroTnzy5qrBLLvYENgIdynnSMOv2gc4GOqUBwfrdzIQn3fs%2BaSS8xffsv4bucq5xLAKfEACJeqFYEea5r2Yr74Vao4VRQtQ7Fg%2Bxi5PtkbFqneF3ulD1UH5%2FzMS9SH%2F8QLgHKJGjzKG8v8hTs4W0W3%2FZErHtExTwno1kqh959K%2Bb%2Be0Jiy6Dkojih7djUJwIwX3yHIis7%2FDpTVysucnDItHKFux7tLMe0%2BOtvsYf1g52WogNOZ%2Bf9%2FsC%2F%2B5uDeyX&X-Amz-Signature=8a673cbbfd8d596715f04331ed349f9836813eabea8f7256830e8dcdcb8fce2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- 计算公式

	![%E8%AE%A1%E7%AE%97%E5%85%AC%E5%BC%8F.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/229e4ad2-8c33-4158-af42-dac6899bfa75/%E8%AE%A1%E7%AE%97%E5%85%AC%E5%BC%8F.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X6BZ3ZX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004630Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDfnU9%2BfNI1g98pyakvGm2kXD%2Bnq4PyIwDX8DHk7pmYvAiEAh01ivtOhJ7m%2B%2FHcPx7py9G4uDGiPXcnQORaGAA8lypEq%2FwMIcRAAGgw2Mzc0MjMxODM4MDUiDEghWLR%2BgKrf%2FOaCSircA3%2By6cTmJ7cfUy%2FvmDjKYKeeAkpP6PBACueyL6dhXeQD%2FlEbsI3WNMO4diXmvehabtxCfF%2BZjDsbJVg7Dysxc3Yb7qTJzsDjxIIDutdwG%2FL6Qgs3nFupNVzcepFJfqprYSSWyIB3e3ET0gP8RTqRotx8%2BE2R2UNKbsvbGpbCM7Lp6AvRTGe%2B6n%2F8CSUqi7F6%2F4g0jGNxe51rfMvYccdajw8wpuuLeipHRfhhEcQawbTTPVEX%2B3JoQWxzRo35BpgB5zzOOX6noWPsndbRM%2FL5su6VxQMhpZbnhtlmIjBImq1AZRkQxcSsgqoajSvNW4w9r%2FIvGcKD%2BbsbPa%2B1eL1T79Th4nJdM4db5o9ATIN3bTCOpBvrypAdjQzS6tkuWkL3RwictBbXVlTFB19qhXklbtrA2e2gD1driaYUq1klYhtAbTSIxPdC0C74nyfSKwBIU%2BBUIFGQclY9P3rW%2B1Oczij7saP48xThZRJOLBbzVD6T1t09eZsYuQFk4bKRE2ygJPvTYjoFP%2Bjodbko3piT%2BrppoETH9FqOP%2F372lh5a4rGR9ufhDhKY6pzZz4CffXjxiHibFKZBXcED6kgROZnGnbemofOS8Q1aYCXwq6CYhZ%2BqCPH17tD3GiEzJywMNf3gc4GOqUBsl2ATv0KY7MXxvLQeT8%2Bcyf9qqkC3clVpdHB4PS0vt162%2BhHFJMB2Js4jjtQQxxdIznjVBV6mH%2BhIqXr8jpYNCA2RyGd4YDN73DoKpS%2BBcJZo52lBOpIVDqrMo891hadS5qwrORHE1b1qGwF2Q9%2BiKrHAaNBy2NbaXwWU4TLeHyi45wXsWUcND3SatnbLZeTzpdTMsMJWr5MHBpFHR%2BFcAL5ycW0&X-Amz-Signature=dc5f8944f94a98a3becf6157b36195cc442f45f3f6ac2adce69ee428e408988c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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

	![%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8_II_%E5%85%A5%E5%8F%A3.gif](https://prod-files-secure.s3.us-west-2.amazonaws.com/13a508a2-de5b-47bc-b05f-367d31c13e36/51437ad6-7b42-49a4-9c0f-eb310790b9ee/%E7%8E%AF%E5%BD%A2%E9%93%BE%E8%A1%A8_II_%E5%85%A5%E5%8F%A3.gif?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPM6TRUX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T004634Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEKj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHTzPtVykBeMhuS%2FKlPWEPz%2FlpEN0p6hwVl3G%2FfPJ33aAiA20qXEPoZjQ0IPMTlwpVw8Y9dbwAsVunRsOCqxcRJCQCr%2FAwhxEAAaDDYzNzQyMzE4MzgwNSIMaD0tOEKIp2z5J8G%2FKtwDN8AgtFGdBQ%2FZA5FDvoj9XCk9Vc26ZVuDQb0tkF12J%2BSqgaemfQouEqVXoajVTaA50xk5iNbIFx1CQK7U0w7t5ctykvs6Ho3Nsq8rs1wdHTWUjsdvjgx8a4qkkt8nVN7HBtXrydsoLTgxxPv0Vde2rbBSd1xffTXGMcfPClVJ0qwyVps%2FG1BwEIYeu0FGAHYCIzdvl8OZQekRqjmxtbVv2gAIj%2B8KopykAR4YBLtCpcKa81E5c24E1nQ8fD9144xbNbyh1UpjfkAWs59dFGlofaTmhywoIcG3aiVzy%2FXeMuaUZnyEn0ga4Q69WH%2BQNJnbf5GP55oySyatZ40FvtEOv6Qcb1u26fG3PeqPgOEYI30sTiZX8UVF0b5GAgAfj8igIia4A6ck6wWnCiK2aw3bvWDy0qIVo7Fwz5bqi2%2B2loQBdKNOKzpNRIyg5ZPdxn7GKhOJM0j7Whcjhjzrye6%2FBSLnnBU6HqZKTICvbz7ky8I8bJW15105qFyPTtStmJJ36ScPtYRArb7KoEQIz8D4apxkHJ2LPdmkpbQOLUi9969WCTkJgX0To1RWZBm451ME8zDiD2GtNVUAOhfnZp%2Bbtl2GxrcoKcKOcDZVlF5Y0AfTWsrCU1ey1YNdoT0wn%2FeBzgY6pgH9edbOgIjAdaRahZ8chj3I2tkkYk10jzLbSvXXr3IwwoXBHuTy9w%2FoPEPiG4rs6a5tz3DWrxkrxny3mfgYimy7q0%2BfF%2FvrretxCSlXHyAosrOzLGTa6CR%2Fr7NfVrtPJHm8zC%2FI6Z1WrNL7L8bHjvp8U%2FP3UZqCsUQqP9bI0z90BvAhlGb7LynaaYVH9B3sLy1P6hgEOHDOTKxBxmoqdk7%2BNkGqb52h&X-Amz-Signature=dfb78d5800516f0e2fd03ff7fc4ff9752ed51e8ebee35b6d1f2cf693da75adc2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


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
