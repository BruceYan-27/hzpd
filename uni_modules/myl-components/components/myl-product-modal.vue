<template>
    <view v-if="show" class="gui-modal">
        <view class="gui-modal-content">
            <view class="gui-modal-header">
                <view class="gui-modal-title">
                    <view @tap="product_back">
                        <!-- <text class="gui-icons gui-color-white">&#xe600;</text>-->
                        <text style="font-size: 28rpx;margin-right: 30rpx">添加分组</text>
                    </view>
                    <text>{{ Attribute }}设置</text>
                </view>
                <view class="gui-modal-close" @tap="addGroups" >
                    <text>保存</text>
                </view>
            </view>
            <!-- 输入框模糊查询 -->
            <view class="gui-input-group">
                <view class="gui-input-group-items">
                    <view class="gui-input-group-body">
                        <view class="gui-input-group-input">
                            <!-- 检索框 自动检索 -->
                            <input class="gui-input" type="text" placeholder="输入关键字检索" @input="retrieval" />
                        </view>
                    </view>
                </view>
            </view>
            <!-- 颜色尺码分组 ProductIndex==1 ProductIndex==2 展示  -->
            <view class="hzpb-list" v-if="ProductIndex === 0 || ProductIndex === 1">
                <view  v-for="(item, index) in data" :key="index">
                    <view class="hzpb-list-item" style="display: flex;justify-content: space-between">
                        <text class="hzpb-list-item-text">{{item.name}}</text>
                        <!-- 字体图标 -->
                        <view style="padding-right: 28rpx">
                            <text @tap="revise(item)" class="hzpb-list-item-icon gui-icons gui-color-orange" style="margin-right: 30rpx;font-size: 36rpx">&#xe69e;</text>
                            <text @tap="deleteGroups(item)" class="hzpb-list-item-icon gui-icons gui-color-red" style="font-size: 36rpx">&#xe794;</text>
                        </view>
                    </view>
                    <view class="hzpb-list-tage">
                        <gui-tags @tapme="tapme(items,indexs)" v-for="(items, indexs) in item.children" :borderColor="'rgba(69, 90, 100, 0.6)'" :key="indexs" :text="items.name" :customClass="[items.default === false ? 'gui-color-gray': 'gui-color-white', items.default === false ? 'gui-transparent-bg': 'gui-bg-primary']"  :size="26"></gui-tags>
                        <text class="hzpb-list-tage-addTag" @tap="newlyIncreased(item)">新增{{data[ProductIndex]}}</text>
                    </view>
                </view>
            </view>
            <view v-else class="hzpb-list">
                <!-- 提示语 -->
                <view class="hzpb-list-item" style="display: flex;align-items: center">
                    <!--字体图标-->
                    <text class="hzpb-list-item-icon gui-icons gui-color-orange" style="font-size: 36rpx;margin-right: 20rpx">&#xe645;</text>
                    <text class="hzpb-list-item-text" style="font-size: 24rpx">【向左滑动】选项可进行删除</text>
                </view>
                <!-- 实现左滑删除 -->
                <scroll-view :scroll-y="true">
                    <view v-for="(item,index) in data" :key="index" class="good-item" style="display: flex" :style="{ right: item.right + 'rpx'}" >
                        <view  class="good-item" @touchstart="startHandle($event,index)" @touchmove="moveHandle($event,index)"
                               @touchend="endHandle($event,index)" @click="revise(item)"   >
                            <view class="good-info">
                                <view class="name">{{item.name}}</view>
                            </view>
                        </view>
                        <view class="del-btn" @click="deleteGroups(item)">删除</view>
                    </view>
                </scroll-view>
            </view>
        </view>
    </view>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
defineProps({
    show: {
        type: Boolean,
        default: false
    },
    Attribute: {
        type: String,
        default: ''
    },
    ProductIndex: {
        type: Number,
        default: 0
    },
    modelValue: {
        type: String,
        default:''
    },
    data: {
        type: Array,
        default: () => []
    },

})


defineEmits(['close', 'addGroups', 'revise', 'deleteGroups', 'newlyIncreased', 'retrieval', 'tapme'])

const product_back = () => {
    emit('close')
}
const addGroups = () => {
    emit('addGroups')
}

const revise = (item) => {
    emit('revise', item)
}
const tapme = (items,indexs) => {
    emit('tapme', items,indexs)
}
const deleteGroups = (item) => {
    emit('deleteGroups', item)
}
const newlyIncreased = (item) => {
    emit('newlyIncreased', item)
}

const retrieval = (e) => {
    // console.log(modelValue)
    emit('update:modelValue', e.detail.value)
}
const startHandle = () => {

}

const moveHandle = () => {

}

const endHandle = () => {

}

</script>

<style scoped lang="scss">
// gui-modal
.gui-modal{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    //z-index: 998;
    display: flex;
    justify-content: center;
    align-items: center;
}
.gui-modal-content{
    width: 80%;
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
}
.gui-modal-header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    border-bottom: 1px solid #eee;
    background: #1E88E5;
    color: white;
}
.gui-modal-title{
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
}
.gui-modal-close{
    font-size: 28rpx;
}
.gui-modal-footer{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
    border-top: 1px solid #eee;
}
.gui-modal-button{
    padding: 10px 20px;
    color: #007aff;
    font-size: 16px;
}
// 输入框模糊查询
.gui-input-group{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 0;
}
.gui-input-group-items{
    width: 100%;
}
.gui-input-group-body{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
}
.gui-input-group-title{
    width: 100px;
    text-align: right;
    font-size: 14px;
    color: #333;
}
.gui-input-group-input{
    flex: 1;
}
.gui-input{
    height: 40px;
    padding: 0 10px;
    border: 1px solid #eee;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
}
.gui-input:focus{
    border: 1px solid #1E88E5;
}
.gui-input-group-button{
    width: 80px;
    height: 40px;
    margin-left: 10px;
    border: 1px solid #1E88E5;
    border-radius: 5px;
    font-size: 14px;
    color: #1E88E5;
    background-color: #fff;
}
.gui-input-group-button:hover{
    background-color: #1E88E5;
    color: #fff;
}
</style>
