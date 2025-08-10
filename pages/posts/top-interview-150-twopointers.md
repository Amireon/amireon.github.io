---
title: 面试经典 150 题之双指针篇
date: 2025-08-01
updated: 2025-08-10
categories:
  - LeetCode
  - Top150https://leetcode.cn/problems/move-zeroes/
tags:
  - 双指针
top: 1
---

## 283. 移动零

【题干】

给定一个数组 `nums`，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

【分析】

双指针，一个快指针和一个慢指针。快指针用与扫描数组元素，慢指针用于存储元素。

每当快指针指向非 0 元素时，则交换两个指针的元素，同时慢指针右移一位。

【代码】
```c
void swap(int *a, int *b){
    int t = *a;
    *a = *b;
    *b = t;
}

void moveZeros(int *nums, int numsSize){
  int fast = 0, slow = 0;
  while(fast < numsSize){
      if(nums[fast]){
          swap(nums + slow, nums + fast);
          slow++;
      }
      fast++;
  }
}
```