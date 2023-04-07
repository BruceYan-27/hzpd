<template>
  <gui-page>
    <template v-slot:gBody>
      <!--      <view style="height: 140rpx"></view>-->

      <!--   操作按钮组   -->
      <view class="bnts">
        <button type="default"  class="gui-button gui-button-mini gui-bg-blue gui-noborde" @click="add">
          <text class="gui-color-white gui-button-text-mini gui-icons">&#xe626;</text>
          <text class="gui-color-white" style="margin-left: 10rpx">添加</text>
        </button>
        <button type="default" :plain="true" class="gui-button gui-button-mini">
          <text class="gui-primary-color gui-button-text-mini gui-button-text">编辑</text>
        </button>
        <button type="default" :plain="true" class="gui-button gui-button-mini">
          <text class="gui-primary-color gui-button-text-mini gui-button-text">删除</text>
        </button>
        <button type="default" :plain="true" class="gui-button gui-button-mini">
          <text class="gui-primary-color gui-button-text-mini gui-button-text">重置密码</text>
        </button>
        <button type="default" :plain="true" class="gui-button gui-button-mini">
          <text class="gui-primary-color gui-button-text-mini gui-button-text">激活</text>
        </button>
        <button type="default" :plain="true" class="gui-button gui-button-mini">
          <text class="gui-primary-color gui-button-text-mini gui-button-text">禁用</text>
        </button>
      </view>
      <!--  检索    -->
      <view class="search">
        <view class="search-box">
          <text>姓名：</text>
          <input type="text" v-model="user" placeholder="请输入">
        </view>
        <view class="search-box">
          <text>账号：</text>
          <input type="text" v-model="username" placeholder="请输入">
        </view>
        <view class="search-box">
          <text>状态：</text>
          <view class="gui-form-body">
            <picker
                mode="selector"
                :range="gender.arr"
                @change="pickerChange">
              <view
                  class="gui-flex gui-row gui-nowrap gui-space-between gui-align-items-center">
                <text class="gui-text gui-secondary-text">{{gender.arr[genderIndex]}}</text>
                <text class="gui-form-icon gui-icons gui-text-center gui-color-gray">&#xe603;</text>
              </view>
            </picker>
          </view>
        </view>
        <view class="search-box">
          <button type="default" class="gui-button gui-button-mini gui-bg-blue gui-noborde" >
            <text class="gui-color-white">搜索</text>
          </button>
          <button type="default" :plain="true" class="gui-button gui-button-mini">
            <text class="gui-primary-color gui-button-text-mini gui-button-text">重置</text>
          </button>
        </view>
      </view>
      <!--  表格    -->
      <gui-empty v-if="students.arr.length < 1" class="gui-margin-top"
      >
        <template v-slot:img>
          <view class="gui-flex gui-row gui-justify-content-center">
            <text
                class="gui-icons gui-empty-icon gui-color-gray">&#xe644;</text>
          </view>
        </template>
        <template v-slot:text>
          <text
              class="gui-text-small gui-block gui-text-center gui-margin-top gui-color-gray">列表空空如也 ~</text>
        </template>
      </gui-empty>
      <view v-else style="margin-top:66rpx;" class="gui-bg-white gui-dark-bg-level-3 gui-padding gui-margin-top">
        <checkbox-group>
          <view class="gui-flex gui-rows gui-nowrap gui-border-l gui-border-t gui-bg-gray gui-dark-bg-level-2">
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.25">
              <label class="gui-check-item">
                <checkbox value="1"></checkbox>
              </label>
            </text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.25">序号</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.4">姓名</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.4">账号</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.4">部门</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.25">性别</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.4">状态</text>
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 1">创建时间</text>
          </view>
          <view class="gui-flex gui-rows gui-nowrap gui-border-l"
                v-for="(item, index) in students.arr"
                :key="index">
            <text class="gui-td gui-border-r gui-border-b gui-primary-text gui-text-center" style="flex: 0.25">
              <label class="gui-check-item">
                <checkbox value="2"></checkbox>
              </label>
            </text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.25">{{index+1}}</text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.4">{{item.name}}</text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.4">{{item.username}}</text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.4">{{item.department}}</text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.25">
              <!--              <gui-tags-->
              <!--                  :text="item.gender" borderColor="#1E88E5" padding="5" :margin="0"-->
              <!--                  :size="22"></gui-tags>-->
              <text class="sex"
                    :style="{background: item.gender === '男'? 'rgba(30, 136, 229, .4)' : 'rgba(255, 182, 193, .4)',
                    borderColor: item.gender === '男'? '#1E88E5' : '#FFB6C1',
                    color:item.gender === '男'? '#1E88E5' : '#FFB6C1',}">
                {{item.gender}}
              </text>
            </text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 0.4">
              <text class="ment" :style="{background: item.status === '已激活'? 'rgba(0, 250, 154, .2)' : 'rgba(255, 182, 193, .4)',
                    borderColor: item.status === '已激活'? '#00FA9A' : '#FFB6C1',
                    color:item.status === '已激活'? '#00FA9A' : '#FFB6C1',}">
                {{item.status}}
              </text>
            </text>
            <text class="gui-td gui-primary-text gui-text-center gui-border-r gui-border-b" style="flex: 1">{{item.creationtime}}</text>
          </view>
        </checkbox-group>
      </view>
    </template>
  </gui-page>
</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from 'vue'
import { onLoad, onShow } from '@dcloudio/uni-app'
const gender = reactive({
  arr: ['请选择状态', '已激活', '禁用'],
});
const students = reactive({
  arr: [
    {id:1, name: '张三', username:'001', gender: '男', department: '技术部', status: '已激活', creationtime: '2011-11-30 09:46:03'},
    {id:2, name: '小红', username:'001', gender: '女', department: '运营部', status: '禁用', creationtime: '2011-11-30 09:46:03'},
    {id:2, name: '李四', username:'001', gender: '女', department: '采购部', status: '已激活', creationtime: '2011-11-30 09:46:03'},
    {id:2, name: '华佗', username:'001', gender: '男', department: '采购部', status: '已激活', creationtime: '2011-11-30 09:46:03'},
    {id:2, name: '孙思邈', username:'001', gender: '男', department: '采购部', status: '已激活', creationtime: '2011-11-30 09:46:03'},
    {id:2, name: '孙尚香', username:'001', gender: '女', department: '运营部', status: '已激活', creationtime: '2011-11-30 09:46:03'},
  ]
})
let genderIndex = ref<number>(0)
let user = ref<string>('')
let username = ref<string>('')
let option = ref<any>()

onLoad((option) => {
  console.log()
  let arr1 = decodeURIComponent(option.formData)
  if(arr1 !== '{}'){
    arr1.id = 1
    arr1.creationtime = '2011-11-30 09:46:03'
    students.arr.push(arr1)
  }
})

const pickerChange = (e:any) => {
  console.log(e)
  genderIndex.value = e.detail.value;
  console.log(genderIndex)
}
let add = () => {
  uni.navigateTo({
    url:"../../pages/adduser/adduser",
  })
  console.log(1)
}
// const uniqueById = (arr:any[]) => {
// const map = new Map();
//   arr.forEach(item => {
//     if(!map.has(item.id)){
//       map.set(item.id, item);
//     }
//   })
//   return [...map.values()];
// }
// students.arr = uniqueById(students.arr);


</script>

<style lang="scss">
.bnts{
  display: flex;
  .gui-button{
    margin: 20rpx 28rpx !important;
    padding: 0 20rpx !important;
  }
}

.search{
  display: flex;
  //padding: 0 28rpx;
  &-box{
    display: flex;
    align-items: center;
    margin: 0 28rpx;

    .gui-button{
      //margin: 20rpx 28rpx !important;
      padding: 0 20rpx !important;
      margin-right: 20rpx !important;
    }
    input{
      border: 1px solid #1E88E5;
      padding: 6rpx 20rpx;
      color: white;
      width: 160rpx;
    }
    .gui-form-body{
      border: #1E88E5 1px solid;
      width: 100%;
      padding-left: 20rpx;
    }
  }
}
.gui-td{width:100rpx; flex:1; overflow:hidden; padding:20rpx 10rpx; display:flexbox;}
.gui-primary-text{line-height:60rpx !important; font-size:24rpx;}
.sex{
  background: rgba(30, 136, 229, .4);
  padding: 8rpx 20rpx;
  border-radius: 4rpx;
  border: #1E88E5 1px solid;
}
.ment{
  padding: 8rpx 20rpx;
  border-radius: 4rpx;
  border: 1px solid;
}
</style>
