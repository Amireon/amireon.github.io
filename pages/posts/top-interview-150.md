---
title: 面试经典 150 题之数组/字符串篇
date: 2025-07-14
updated: 2025-07-15
categories:
  - 算法
  - Top150
tags:
  - 数组
top: 1
---

LeetCode 链接：https://leetcode.cn/studyplan/top-interview-150/

## 合并两个有序数组

[88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/merge-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150

题干:

给你两个按 非递减顺序 排列的整数数组 `nums1` 和 `nums2`，另有两个整数 `m` 和 `n` ，分别表示 `nums1` 和 `nums2` 中的元素数目。

请你 合并 `nums2` 到 `nums1` 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终，合并后数组不应由函数返回，而是存储在数组 `nums1` 中。为了应对这种情况，`nums1` 的初始长度为 `m + n`，其中前 m 个元素表示应合并的元素，后 `n` 个元素为 `0` ，应忽略。`nums2 `的长度为 `n `。

题目没有时间、空间上的任何要求

### 方法一：直接合并后排序

将 nums2 中的元素添加到 nums1 的尾部，然后对 nums1 整个数组进行排序。

```c
int cmp(int *a, int *b) {
    return *a - *b;
}

void merge(int* nums1, int m, int* nums2, int n) {
    for (int i = 0;i < n; i++) {
        nums1[m + i] = nums2[i];
    }
    qsort(nums1, m + n, sizeof(int), cmp);
}
```

复杂度分析

- 时间复杂度：复制元素 O(m), 套用快速排序的序列长度 m+ n, 复杂度为 O((m + n)log(m + n))。
- 空间复杂度：O(log(m + n))。排序序列长度为 m + n，套用快排的空间复杂度 O(log(m + n))。

### 方法二: 双指针

用两个指针 p1, p2 分别指向 nums1, nums2，比较当前指向元素 nums1[p1] 和 nums2[p2] 的大小。
需要额外开辟一个存储新数组的空间。

```c++
class Solution {
public:
    void merge(vector<int>& nums1, int m, vector<int>& nums2, int n) {
        int p1 = 0, p2 = 0, i = 0;
        while (p1 < m && p2 < n) {
            if (nums1[p1] <= nums2[p2]) {
                nums[i] = nums1[p1];
                p1++;
            }
            else {
                nums[i] = nums2[p2];
                p2++;
            }
            i++;
        }
        while (p1 < m) {
            nums[i++] = nums1[p1++];
        }
        while (p2 < n) {
            nums[i++] = nums2[p2++];
        }
        for(i = 0; i < m + n; i++) {
            nums1[i] = nums[i];
        }
    }
};
```

复杂度分析

- 时间复杂度: O(2(m + n)) = O(m + n)。指针单向移动两次序列。
- 空间复杂度: O(m + n)。需要一个额外的辅助空间存储 m + n 个元素。

### 方法三：逆向双指针

使用两个指针逆向遍历两个数组，从大到小将元素存储在 nums1 中。

```c
void merge(int* nums1, int m, int* nums2, int n) {
    int p1 = m - 1, p2 = n - 1;
    int cur = m + n - 1;
    while (p1 >= 0 && p2 >= 0) {
        if (nums1[p1] >= nums2[p2]) {
            nums1[cur--] = nums1[p1--];
        }
        else {
            nums1[cur--] = nums2[p2--];
        }
    }
    while (p1 >= 0) {
        nums1[cur--] = nums1[p1--];
    }
    while (p2 >= 0) {
        nums1[cur--] = nums2[p2--];
    }
}
```

复杂度分析：

- 时间复杂度: O(m + n)。遍历一次 nums1, nums2 的序列。
- 空间复杂度: O(1)。额外空间不随序列长度变化。

## 移除元素

[27.移除元素](https://leetcode.cn/problems/remove-element/description/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/remove-element/description/?envType=study-plan-v2&envId=top-interview-150

给你一个数组 nums 和 一个值 val，你需要原地移除所有数值等于 val 的元素。元素的顺序可能发生改变，然后返回 nums 中与 val 不同的元素的数量。

假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行如下操作：

- 更改 nums 数组，使得 nums 的前 k 个元素不包含等于 val 的元素。nums 的其余元素和 nums 的长度不重要。
- 返回 k。

### 分析

如果允许使用额外空间，可以将 nums 中不等于 val 的元素存储到 nums2 中，然后再将 nums2 中的元素复制回 nums1。

但是此题不允许使用额外空间。那可以试着记录下等于 val 的元素位置 l，然后将后面的不等于 val 的元素（位置记为 r）移动到位置 l。左右两个指针：右指针 r 指向当前要处理的元素，左指针 l 指向下一个要赋值的位置。

- 如果 r 指向的元素 e 不等于 val，e 一定要被输出，那么将 e 移动到 l 指向的位置，l，r 同时右移。
- 如果 r 指向的元素 e 等于 val，那么 e 不用管，r 右移，l 不动。

### 双指针

```c
int removeElement(int* nums, int numsSize, int val) {
    int l = 0, r = 0;
    for (; r < numsSize; r++) {
        if (nums[r] != val) {
            nums[l] = nums[r];
            l++;
        }
    }
    return l;
}
```

复杂度分析

- 时间复杂度：O(n)，n 为序列长度，只需要遍历序列一次。
- 空间复杂度：O(1)，只需要常数空间存储两个指针。

## 删除排序数组中的重复项

[26.移除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150

和上面那道“移除元素”非常相似。如果允许额外空间，可以用一个集合记录 nums 中的所有元素。但是只能用常数空间，还是采用双指针。右指针 r 指向当前要处理的元素，左指针 l 指向下一个要存储元素的位置。

第一个元素天然保留，从第 2 个元素思考, l 和 r 的初始值都是 1。需要判断当前位 r 和 上一位 r - 1 的元素是否相等，

- 如果相等，r 右移一位，l 不动。
- 如果不相等，nums[l] = nums[r]，r 和 l 同时右移一位.

```c
int removeDuplicates(int* nums, int numsSize) {
    if (numSize == 0) {
        return 0;
    }
    int l = 1, r = 1;
    while (r < n) {
        if (nums[r] != nums[r - 1]) {
            nums[l] = nums[r];
            ++l;
        }
        ++r;
    }
    return l;
}
```

复杂度分析

- 时间复杂度：O(n), 其中 n 是数组的长度。
- 空间复杂度：O(1)，只需要常数空间。

## 删除有序数组中的重复项 II

[删除有序数组中重复项 2](https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/?envType=study-plan-v2&envId=top-interview-150

此题是[26.移除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/?envType=study-plan-v2&envId=top-interview-150)的翻版。

元素可以重复两次，nums 前两个元素天然保留，从第 2 个元素思考，l 和 r 的初始值都是 2。需要判断 nums[r] 与 nums[l - 2] 是否相等。

```c
int removeDuplicate(int* nums, int numsSize) {
    if (numsSize <= 2) {
        return numSize;
    }
    int l = 2, r = 2;
    while (r < numSize) {
        if(nums[l - 2] != nums[r]) {
            nums[l] = nums[r];
            ++l;
        }
        ++r;
    }
    return l;
}
```

## 多数元素

[169.多数元素](https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/majority-element/?envType=study-plan-v2&envId=top-interview-150

【题干】

给定一个大小为 `n` 的数组 `nums` ，返回其中的多数元素。多数元素是指在数组中出现次数 大于 `⌊ n/2 ⌋` 的元素。

- 方法一：排序后返回`nums[n/2]`的值
- 方法二：用一个`map`统计每个元素出现的次数
- 方法三：投票统计。

### 方法二：统计元素出现次数

用一个`map`统计`nums`中各个数字的出现次数，返回出现次数最多的元素的值.

```c++
class Solution{
public:
    int majorityElement(vector<int>& nums){
        unordered_map<int, int> counts;
        int ans = 0 , cnt = 0;
        for(int num: nums){
            ++counts[num];
            if(counts[num] > cnt){
                ans = num;
                cnt = counts[num];
            }
        }
        return ans;
    }
};
```

复杂度分析：
- 时间复杂度：`O(n)`，遍历一次序列。
- 空间复杂度：`O(n)`，平均而言。

### 方法三：投票计数

假设某个数`candidate`是众数，无论序列如何排列，`candidate` 的出现次数大于等于其他元素出现次数的总和。维护一个候选值`candidate`和它的出现次数`count`，遍历数组，对于每个元素`x`，

- 如果 `x` 与 `candidate` 相等，那么计数器 `count` 的值增加 1；
- 如果 `x` 与 `candidate` 不等，那么计数器 `count` 的值减少 1。如果`count`值小于 0，则更换`candidate`为`x`， `count`设为 1。

遍历结束后，`candidate`即为整个数组的众数。

```c
int majorityElement(int* nums, int numsSize) {
    int ans = nums[0];
    int cnt = 1;
    for(int i = 1; i < numsSize; i++){
        if(nums[i] == ans){
            ++cnt;
        } else {
            --cnt;
            if(cnt < 0){
                ans = nums[i];
                cnt = 1;
            }
        }
    }
    return ans;
}
```

复杂度分析
- 时间复杂度：`O(n)`，只需遍历一次序列。
- 空间复杂度：`O(1)`，常数空间存储候选。


## 轮转数组

[189.轮转数组](https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150): https://leetcode.cn/problems/rotate-array/description/?envType=study-plan-v2&envId=top-interview-150

【题干】给定一个整数数组`nums`，将数组中的元素向右轮转`k`个位置，其中`k`是非负数。

1. 来回拷贝。用一个额外数组在正确位置存储轮转后的元素，然后将新数组拷贝回去。
2. 环状轮转。
3. 翻转数组。需要翻转三次，`[0, n-1]`, `[0, k-1]`, `[k, n-1]`。


### 方法二：环状轮转

方法一中需要一个额外空间存储中间数值，那么是否可以省略掉这个空间呢？

先考虑轮转步骤。不妨设从 `x0` 开始，中间值`temp==nums[x0]`，要移动到的位置为`x1`，
1. 计算移动位置 `x1 = (x0 + k) mod n`，
2. 交换`temp`和`nums[x0]`的值，`x0`设为`x1`，
3. 重复上述1,2，直到结束。

不妨设从 0 开始，那么一定会回到 0 的位置，但此时有的元素还没有完成更新（因为是跳跃式的），那么该怎么判断停止条件？

> 说实话，这里的逻辑链条比较跳跃，跟不上。

官解是考虑元素数量：从 0 开始不断遍历，最终回到起点 0 的过程中，遍历了多少个元素？由于最终回到了起点，故该过程恰好走了整数数量的圈，不妨设为 a 圈；再设该过程总共遍历了 b 个元素。因此，我们有 `an=bk`，即 an 一定为 n,k 的公倍数。又因为我们在第一次回到起点时就结束，因此 a 要尽可能小，故 `an` 就是 n,k 的最小公倍数 `lcm(n,k)`，因此 b 就为 `lcm(n,k)/k`。

这说明单次遍历会访问到 `lcm(n,k)/k` 个元素。为了访问到所有的元素，我们需要进行遍历的次数为
$$\dfrac{n}{\mathrm{lcm}(n, k)/k} = \dfrac{nk}{lcm(n,k)} = \gcd(n, k)$$
​
```c
int gcd(int a, int b){
    return b ? gcd(b, a % b) : a;
}

void swap(int *a, int* b){
    int t = *a;
    *a = *b;
    *b = t;
}

void rotate(int*nums, int n, int k){
    k = k % n;
    int count = gcd(k, n);
    for(int start = 0; start < count; start++){
        int cur = start;
        int prev = nums[strat];
        do{
            int next = (cur + k) % n;
            sawp(&nums[next], &prev);
            cur = next;
        } while(start != cur);
    }
}
```


### 方法三：翻转数组

观察给出的两个示例，可以总结出如下规律。
1. 现将整个数组逆序。
2. 逆序 `nums[0...(k-1)]`
3. 逆序 `nums[k...(n-1)]`

```c
void swap(int* a, int* b){
    int t = *a;
    *a = *b;
    *b = t;
}

void reverse(int nums*, int start, int end){
    while(start < end){
        swap(&nums[start++], &nums[--end]);
    }
}

void rotate(int nums*, int n, int k){
    k = k % n;
    reverse(nums, 0, n - 1);
    reverse(nums, 0, k - 1);
    reverse(nums, k, n - 1);
}
```


