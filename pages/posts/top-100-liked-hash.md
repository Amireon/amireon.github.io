---
title: 力扣热题 100 之哈希
date: 2025-07-29
updated: 2025-07-29
categories:
  - LeetCode
  - Hot100
tags:
  - 哈希
top: 1
---

## 1. 两数之和
https://leetcode.cn/problems/two-sum/description/?envType=study-plan-v2&envId=top-100-liked

【题干】

给定一个整数数组 `nums` 和一个整数目标值 `target`，请你在该数组中找出和为目标值 `target` 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，并且你不能使用两次相同的元素。

你可以按任意顺序返回答案。

【分析】

暴力法，双重循环一个一个元素找，时间复杂度为 $O(N^2)$。

[官方题解](https://leetcode.cn/problems/two-sum/solutions/434597/liang-shu-zhi-he-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)：

暴力法中时间复杂度高的原因是对于元素`x`，寻找`target-x`的时间复杂度高。因此，因此，我们需要一种更优秀的方法，能够快速寻找数组中是否存在目标元素。如果存在，我们需要找出它的索引。

使用哈希表，可以将寻找 `target - x` 的时间复杂度降低到从 `O(N)` 降低到 `O(1)`。

对于每一个`x`，首先在哈希表中查询是否存在`target-x`，然后将`x`插入哈希表。如果存在，皆大欢喜；如果不存在，继续遍历。

```c++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        unordered_map<int, int> hashtable;
        for (int i = 0; i < nums.size(); ++i) {
            auto it = hashtable.find(target - nums[i]);
            if (it != hashtable.end()) {
                return {it->second, i};
            }
            hashtable[nums[i]] = i;
        }
        return {};
    }
};
```

## 49. 字母异位词分组

https://leetcode.cn/problems/group-anagrams/description/?envType=study-plan-v2&envId=top-100-liked

【题干】

给你一个字符串数组，请你将`字母异位词`组合在一起。可以按任意顺序返回结果列表。

【分析】

字母异位词：两个字符串包含的字母相同。因此可以将排序后的字符串字母作为哈希表的键，字符串作为值的一部分（若干个值可以用可变数组存放）。

```c++
class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        vector<vector<string>> ans;
        unordered_map<string, vector<string>> mp;
        for(int i = 0; i < strs.size();i++){
            string key = strs[i];
            sort(key.begin(), key.end());
            mp[key].emplace_back(move(strs[i]));
        }
        for(auto& it: mp){
            ans.emplace_back(move(it.second));
        }
        return move(ans);
    }
};
```

## 128. 最长连续序列

https://leetcode.cn/problems/longest-consecutive-sequence/description/?envType=study-plan-v2&envId=top-100-liked

【题干】

给定一个未排序的整数数组 `nums` ，找出数字连续的最长序列（不要求序列元素在原数组中连续）的长度。

请你设计并实现时间复杂度为 `O(n)` 的算法解决此问题。

【分析】

暴力法，直接快速排序，时间复杂度 `O(nlogn)`，不满足要求。

[官方题解](https://leetcode.cn/problems/longest-consecutive-sequence/solutions/276931/zui-chang-lian-xu-xu-lie-by-leetcode-solution/?envType=study-plan-v2&envId=top-100-liked)没看懂


【代码】

```c++
class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        unordered_set<int> num_set;
        for (const int& num : nums) {
            num_set.insert(num);
        }

        int longestStreak = 0;

        for (const int& num : num_set) {
            if (!num_set.count(num - 1)) {
                int currentNum = num;
                int currentStreak = 1;

                while (num_set.count(currentNum + 1)) {
                    currentNum += 1;
                    currentStreak += 1;
                }

                longestStreak = max(longestStreak, currentStreak);
            }
        }

        return longestStreak;           
    }
};
```