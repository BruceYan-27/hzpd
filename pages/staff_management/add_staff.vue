<template>
  <gui-page>
    <!-- 页面主体 -->
    <template v-slot:gBody>
      <view>
        <form @submit="submit">
          <view style="height:28rpx;"></view>
          <view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label gui-secondary-text">姓名：</text>
              <view class="gui-form-body">
                <input type="text" class="gui-form-input"
                       v-model="formData.arr[0].name" name="name" placeholder="请输入内容" />
              </view>
            </view>
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label gui-secondary-text">用户名：</text>
              <view class="gui-form-body">
                <input type="text" class="gui-form-input"
                       v-model="formData.arr[0].username" name="username" placeholder="请输入内容" />
              </view>
            </view>
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">性别：</text>
              <view class="gui-form-body">
                <picker
                    mode="selector"
                    :range="gender"
                    @change="sexChange">
                  <view
                      class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
                    <text class="gui-text gui-secondary-text">{{ gender[genderIndex] }}</text>
                    <text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
                  </view>
                </picker>
              </view>
            </view>
            <view class="gui-form-item gui-border-b">
              <text class="gui-form-label">部门维护：</text>
              <view class="gui-form-body">
                <picker
                    mode="selector"
                    :range="departments.department"
                    @change="departmentChange">
                  <view
                      class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
                    <text class="gui-text gui-secondary-text">{{departments.department[departmentIndex]}}</text>
                    <text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
                  </view>
                </picker>
              </view>
            </view>
          </view>
          <view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
            <view style="padding-top:5rpx;">
              <text
                  class="gui-text-small gui-color-gray">是否激活</text>
            </view>
            <view style="padding:15rpx 0;">
              <switch checked="true" name="status" @change="switchChange" color="#008AFF" />
            </view>
          </view>
          <view
              class="gui-margin-top gui-flex gui-row gui-nowrap gui-justify-content-end gui-padding-x">
            <button
                type="default"
                class="gui-button gui-bg-primary gui-noborder"
                style="width:200rpx;"
                formType="submit">
              <text class="gui-icons gui-color-white gui-button-text">&#xe642; 提交</text>
            </button>
          </view>
          <view style="height:60rpx;"></view>
        </form>
      </view>

    </template>
  </gui-page>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";

const formData = reactive<any>({
  arr: [{
      name: '',
      username: '',
      gender: '',
      department: '',
      status: '已激活'
    }]
})

const gender = ref<any>(['请选择性别', '男', '女',])
const genderIndex = ref<number>(0)

const departments = reactive<any>({
  department: ['请选择部门', '技术部', '运营部',  '采购部'],
})
const departmentIndex = ref<number>(0)

const sexChange = (e:any) => {
	console.log(e)
  genderIndex.value  = e.detail.value;
  formData.arr[0].gender = gender.value[genderIndex.value];
  // 判断如果genderIndex.value === 0 等于未知性别，如果不等于0，就等于选择的性别
  if(genderIndex.value === 0){
    formData.arr[0].gender = '未知性别'
  }else if(genderIndex.value === 1){
    formData.arr[0].gender = '男'
  }else {
    formData.arr[0].gender = '女'
  }
}
const departmentChange = (e:any) => {
  departmentIndex.value = e.detail.value
  formData.arr[0].department = departments.department[departmentIndex.value]
  departmentIndex.value == 0 ? formData.arr[0].department = '' : formData.arr[0].department = departments.department[departmentIndex.value]
}
const switchChange = (e:any) => {
  let flgh = e.detail.value;
  flgh === true ? formData.arr[0].status = '已激活' : formData.arr[0].status = '禁用'
}
// 提交表单
const submit = (e:any) => {
  // console.log(e)
  // 随机生成id
  formData.arr[0].id = Math.floor(Math.random() * 1000000)
// 添加当前创建时间
  formData.arr[0].createTime = new Date().toLocaleString()

  // 把对象转成json数组
  let arr = JSON.stringify(formData.arr)
  // 把json数组转成对象
  arr = JSON.parse(arr)
  console.log(arr)
 // 获取本地存储的数据
  let staff = uni.getStorageSync('staff')
  console.log(staff)
  // staff = JSON.parse(staff)
  // console.log(staff)
  if(staff){
    // staff.push(arr)
    staff = staff.concat(arr)
    uni.setStorageSync('staff', staff)
  }else {
    uni.setStorageSync('staff', arr)
  }
  uni.showToast({
    title: '添加成功',
    icon: 'success',
    duration: 2000,
    success: () => {
      uni.navigateBack({
        delta: 1
      })
    }
  })
}
</script>
<style scoped>
.gui-form-label{
  width: 160rpx;
}
</style>
