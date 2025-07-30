---
title: 面试经典 150 题之数组/字符串篇
date: 2025-07-14
updated: 2025-07-29
categories:
  - LeetCode
  - Top150
tags:
  - 数组
top: 1
---

LeetCode 链接：https://leetcode.cn/studyplan/top-interview-150/

## 88.合并两个有序数组

https://leetcode.cn/problems/merge-sorted-array/description/

【题干】

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

用两个指针 p1, p2 分别指向 nums1, nums2，比较当前指向元素 nums1[p1] 和 nums2[p2] 的大小。需要额外开辟一个存储新数组的空间。

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

## 27.移除元素

https://leetcode.cn/problems/remove-element/description/

【题干】

给你一个数组 nums 和 一个值 val，你需要原地移除所有数值等于 val 的元素。元素的顺序可能发生改变，然后返回 nums 中与 val 不同的元素的数量。

假设 nums 中不等于 val 的元素数量为 k，要通过此题，您需要执行如下操作：

- 更改 nums 数组，使得 nums 的前 k 个元素不包含等于 val 的元素。nums 的其余元素和 nums 的长度不重要。
- 返回 k。

【分析】

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

## 26.移除有序数组中的重复项

https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/

【题干】

【分析】

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

https://leetcode.cn/problems/remove-duplicates-from-sorted-array-ii/description/

此题是[26.移除有序数组中的重复项](https://leetcode.cn/problems/remove-duplicates-from-sorted-array/description/)的翻版。

【分析】

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

## 169.多数元素

https://leetcode.cn/problems/majority-element/

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


## 189.轮转数组

https://leetcode.cn/problems/rotate-array/description/

【题干】

给定一个整数数组`nums`，将数组中的元素向右轮转`k`个位置，其中`k`是非负数。

【分析】

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


## 121.买卖股票的最佳时机

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock/description/

【题干】

给定一个数组`prices`，它的第`i`个元素`prices[i]`表示一支股票在第`i`天的价格。

你只能选择某一天买入这只股票，并选择在未来的某一个不同的日子卖出该股票。

设计一个算法来计算你所能获取的最大利润。返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 `0` 。

【分析】

假设给定的数组为：`[7, 1, 5, 3, 6, 4]`，如果我们在图表上绘制给定数组中的数字，我们将会得到：

![](https://pic.leetcode-cn.com/cc4ef55d97cfef6f9215285c7573027c4b265c31101dd54e8555a7021c95c927-file_1555699418271)

如果想要得到最大收益，那肯定是在最低点买入，在最高点卖出。那么我们只需要使用一个变量`minprice`记录历史最低价格，假设在这一天买入股票。现在第`i`天卖出，那么所得收益为`prices[i] - minprice`。

因此，只需要遍历一次数组，记录下到第`i`天的历史最低价格，每一天都考虑买入卖出，比较最大收益。

```c
int maxProfit(int* prices, int pricesSize) {
    int maxprofit = 0;
    int minprice = 1e4 + 10;

    for (int i = 0; i < pricesSize; i++) {
        maxprofit = prices[i] - minprice > maxprofit ? prices[i] - minprice : maxprofit;
        minprice = prices[i] < minprice ? prices[i] : minprice;
    }

    return maxprofit;
}
```

## 122.买卖股票的最佳时机II

https://leetcode.cn/problems/best-time-to-buy-and-sell-stock-ii/description/

【题干】

给你一个整数数组`prices` ，其中 `prices[i]` 表示某支股票第 `i` 天的价格。

在每一天，你可以决定是否购买和/或出售股票。你在任何时候最多只能持有一股股票。你也可以先购买，然后在同一天出售。

返回你能获得的最大利润 。

【分析】

与 121.买卖股票的最佳时机 不同的是，这次可以多次买入卖出。那么如果明天价格比今天高，就今天买明天卖。如果后天比明天还高呢？有两种方法，一种还是今天买明天卖，等到下一天，后天就是下一个明天。第二种方法是，等到价格最高点卖（递增子序列的最高点）。当然这两种方法没有本质区别。

这里使用第二种，求一个数组中各个递增子序列的`最大值-最小值`的和。

```c
int maxProfit(int* prices, int pricesSize) {
    // 查找递增子序列中的最大值
    int maxprofit = 0, maxprice = 0; // 最大收益, 递增子序列中的最大元素值
    int i = 0, j = 0;     // 遍历起始点, 查找递增序列
    while(i < pricesSize){
        maxprice = prices[i];
        j = i + 1;
        while(j < pricesSize){ // 找不到递增序列就停下
            if(prices[j] >= maxprice){
                maxprice = prices[j];
                j++;
            }else{
                break;
            }
        }
        maxprofit = maxprofit + maxprice - prices[i];
        i = j;  // 跳转到下一个递增子序列的起始位置
    }
    return maxprofit;
}
```

## 55.跳跃游戏

https://leetcode.cn/problems/jump-game/description/

【题干】

给你一个非负整数数组 `nums` ，你最初位于数组的 第一个下标 。数组中的每个元素代表你在该位置可以跳跃的最大长度。

判断你是否能够到达最后一个下标，如果可以，返回 `true` ；否则，返回 `false` 。

【分析】

分析下给定的示例，可以发现能否到达数组尾部，取决于能否跳过数组中的元素 0。如果刚好卡在了 0 的位置，那么到此为止。数组最后一个元素值是几不用理会。

这里选择逆序检查是否能跳过 0.

```c
bool canJump(int* nums, int numsSize) {
    // 从后到前检查 0
    int step = 1; // 走到目标所需的步数
    for(int i = numsSize - 2; i >= 0; i--){
        if(nums[i] >= step){
            // 可以走到"下一个"位置(可能是后面好几位的位置)
            step = 0;
        }
        ++step;
    }
    return step == 1; // 正确情况下应该是 1, 大于 1 说明无法跳过 0
}
```

## 45.跳跃游戏2

https://leetcode.cn/problems/jump-game-ii/description/

【题干】

给定一个长度为 `n` 的 0 索引整数数组 `nums`。初始位置为 `nums[0]`。

每个元素 `nums[i]` 表示从索引 `i` 向后跳转的最大长度。换句话说，如果你在 `nums[i] `处，你可以跳转到任意 `nums[i + j]` 处:

返回到达 `nums[n - 1]`的最小跳跃次数。生成的测试用例可以到达 `nums[n - 1]`。

- `0 <= j <= nums[i] `
- `i + j < n`

【分析】

这次是要求出最小跳跃次数。可以用动态规划做。求从`0`到达`i`的最小步数，可以从 `[0..i-1]` 中求到 `i` 的最小步数 + 1 ，然后与原有最小步数（可以初始化为一个极大值）比较。

递推公式为：`dp[i] = min(dp[j] + 1, dp[i]), 0 <= j <= i - 1` 

时间复杂度为`O(n*2)`，很高的一个值。

```c
int min(int a, int b){
    return a > b ? b : a;
}

int jump(int* nums, int numsSize) {
    if(nums[0] == 0 || numsSize <= 1){
        return 0;
    }
    // 到达最后一个索引的最小跳跃次数
    int dp[numsSize]; // 从 0 到 i 的最小步数
    // 前两个值固定
    dp[0] = 0;
    dp[1] = 1;

    for(int i = 2; i < numsSize; i++){
        dp[i] = 1e4 + 10;
        for(int j = i - 1; j >= 0; j--){
            if(j + nums[j] >= i){// 可以到达
                dp[i] = min(dp[j] + 1, dp[i]);
            }
        }
    }

    return dp[numsSize - 1];
}
```

## 274.H 指数

https://leetcode.cn/problems/h-index/description/

【题干】

给你一个整数数组 `citations` ，其中 `citations[i]` 表示研究者的第 `i` 篇论文被引用的次数。计算并返回该研究者的 `h` 指数。

根据维基百科上 `h` 指数的定义：`h` 代表“高引用次数” ，一名科研人员的 `h` 指数 是指他（她）至少发表了 `h` 篇论文，并且 至少 有 `h`篇论文被引用次数大于等于 `h` 。如果 `h` 有多种可能的值，`h` 指数 是其中最大的那个。

【分析】

问题本质是：有若干个元素 `e` ，其满足条件： 数组中有不少于 `e` 个元素的值不小于 `e`。求 `e`的最大值
1. 统计数组各个元素值的数量`h[0...maxcitation]`
2. 倒序遍历数组，遇到的第一个满足`sum >= i`即为所求, `sum`是`h[i...maxciataion]`的和

```c
int hIndex(int* citations, int citationsSize) {
    // 某个元素 e 满足条件： 数组中有不少于 e 个元素的值 >= e, 求 e 的最大值
    int h[1001] = {0}; // 引用次数为 i 的论文数量为 h[i]
    int max = 0, sum = 0, tmp = 0;
    for(int i = 0; i < citationsSize; i++){
        tmp = citations[i];
        h[tmp]++;
        max = tmp > max ? tmp : max;
    }
    for(int i = max; i > 0; i--){
        sum += h[i];
        if(sum >= i){
            return i;
        }
    }
    return 0;
}
```

## 380. O(1) 时间插入、删除和获取随机元素
https://leetcode.cn/problems/insert-delete-getrandom-o1/description/?envType=study-plan-v2&envId=top-interview-150

【题干】

实现 `RandomizedSet` 类：

- `RandomizedSet()` 初始化 `RandomizedSet` 对象
- `bool insert(int val)` 当元素 `val` 不存在时，向集合中插入该项，并返回 `true` ；否则，返回 `false` 。
- `bool remove(int val)` 当元素 `val` 存在时，从集合中移除该项，并返回 `true` ；否则，返回 `false` 。
- `int getRandom()` 随机返回现有集合中的一项（测试用例保证调用此方法时集合中至少存在一个元素）。每个元素应该有相同的概率被返回。

你必须实现类的所有函数，并满足每个函数的 平均 时间复杂度为 `O(1)` 。

【分析】

变长数组可以在 O(1)的时间内随机获取元素，但无法保证元素是否存在。如果加上判断操作，时间复杂度为 O(n)。同样地，插入和删除操作都无法在 O(1)的时间内完成。

哈希表可以在 O(1) 的时间内完成插入和删除操作，但在不提供下标的情况下，无法在 O(1)的时间内随机获取某个元素。

因此，结合变长数组和哈希表：
- 变长数组：存储元素
- 哈希表：键为元素，值为元素在数组中的下标

插入操作：
1. 判断 `val` 是否在哈希表中，在就返回 `true`，不在进入 2.
2. 将 `val` 插入数组末尾，记录下标 idx
3. 将 `val - idx` 插入哈希表

删除操作：
1. 判断 `val` 是否在哈希表中，不在返回 `false`，在进入 2.
2. 从哈希表中得到 `val` 的下标 `idx`
3. 将数组的最后一个元素`last` 复制到 `idx`, 在哈希表中将 `last`的下标改为`idx`
4. 在数组中删除最后一个元素，在哈希表中删除 `val`

【代码】

```c++
class RandomizedSet {
private:
    vector<int> nums;
    unordered_map<int, int> indices;

public:
    RandomizedSet() {
        srand((unsigned)time(NULL));
    }
    
    bool insert(int val) {
        if (indices.count(val)) {
            return false;
        }
        int index = nums.size();
        nums.emplace_back(val);
        indices[val] = index;
        return true;
    }
    
    bool remove(int val) {
        if (!indices.count(val)) {
            return false;
        }
        int index = indices[val];
        int last = nums.back();
        nums[index] = last;
        indices[last] = index;
        nums.pop_back();
        indices.erase(val);
        return true;
    }
    
    int getRandom() {
        int randomIndex = rand() % nums.size();
        return nums[randomIndex];
    }
};
```

## 238. 除自身以外数组的乘积

https://leetcode.cn/problems/product-of-array-except-self/description/?envType=study-plan-v2&envId=top-interview-150

【题干】

给你一个整数数组 `nums`，返回 数组 `answer` ，其中 `answer[i]` 等于 `nums` 中除 `nums[i]` 之外其余各元素的乘积 。

题目数据保证数组 `nums` 之中任意元素的全部前缀元素和后缀的乘积都在 32 位整数范围内。

请不要使用除法，且在 `O(n)` 时间复杂度内完成此题。

进阶：你可以在 O(1) 的额外空间复杂度内完成这个题目吗？（ 出于对空间复杂度分析的目的，输出数组 不被视为 额外空间。）

【分析】

官方题解：https://leetcode.cn/problems/product-of-array-except-self/solutions/272369/chu-zi-shen-yi-wai-shu-zu-de-cheng-ji-by-leetcode-/?envType=study-plan-v2&envId=top-interview-150

暴力法，将所有元素乘在一起，然后对数组的每个元素`x`，将总乘积除以`x`获得答案，但不允许使用除法。

题干中提到了前缀积和后缀积。我们不必将所有数字的乘积除以给定索引处的数字得到相应的答案，而是利用索引左侧所有数字的乘积和右侧所有数字的乘积（即前缀与后缀）相乘得到答案。
> 真没想到这个做法

**算法**
- 初始化两个空数组 `L` 和 `R`。对于给定索引 `i`，`L[i]` 代表的是 `i` 左侧所有数字的乘积，`R[i]` 代表的是 `i` 右侧所有数字的乘积。
- 我们需要用两个循环来填充 `L` 和 `R` 数组的值。对于数组 `L`，`L[0]` 应该是 1，因为第一个元素的左边没有元素。对于其他元素：`L[i] = L[i-1] * nums[i-1]`。
- 同理，对于数组 `R`，`R[length-1]` 应为 1。`length` 指的是输入数组的大小。其他元素：`R[i] = R[i+1] * nums[i+1]`。
- 当 `R` 和 `L` 数组填充完成，我们只需要在输入数组上迭代，且索引 `i` 处的值为：`L[i] * R[i]`。

官解还给了两个优化版本
- 优化一：将`answer` 数组当做 `L` 用，那么索引 `i` 处的值为：`answer[i] = answer[i] * R[i]`
- 优化二：将 `R[]` 省略掉，用一个累乘值 `r == 1` 作为后缀积，那么索引 `i` 处的值为：`answer[i] = answer[i] * r, r = r * nums[i]`

【代码】

```c++
class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        int length = nums.size(), R = 1;
        vector<int> answer(length);

        // answer[i] 为索引 i 左侧所有元素的乘积
        answer[0] = 1;
        for (int i = 1; i < length; i++) {
            answer[i] = nums[i - 1] * answer[i - 1];
        }

        // R 为索引 i 右侧所有元素的乘积
        for (int i = length - 1; i >= 0; i--) {
            answer[i] = answer[i] * R;
            R = R * nums[i];
        }

        return answer;
    }
};
```