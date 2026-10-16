#include <iostream>
#include <vector>
using namespace std;

class Solution {
    public: 
    vector<int> plusOne(vector<int> nums) {
        int n = nums.size();
        if(nums[n-1] < 9 ) {
            nums[n-1] += 1;
            return nums;
        }
        
        int i = n-1;
        while(i >= 0 && nums[i] == 9 ) {
            nums[i] = 0;
            i--;
        }
        if(i >= 0 ) {
            nums[i] += 1;
            return nums;
        } 
        else if (i < 0) {
            nums.insert(nums.begin(), 1);
            return nums;
        }

        return nums;
    }

};


int main(){
    Solution s1;
    vector<int> nums = {1,2,3,4};
    vector<int> nums1 = {1,9,9,9};
    vector<int> nums2 = {1,9,5,9};
    vector<int> nums3 = {9,9,9,9}; 
    
    vector<int> result = s1.plusOne(nums3);
    for(int x : result) {
        cout<< x <<" ";
    }
    return 0;
}