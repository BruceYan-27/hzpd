<template>
    <view v-if="show" class="gui-groups">
        <view class="gui-groups-content">
            <view class="gui-groups-title">
                {{ Attribute }}添加/分组
            </view>
            <view class="gui-groups-body">
                <input class="gui-input" @input="inputf" type="text" placeholder="颜色分组名称/颜色" />
            </view>
            <view class="gui-groups-footer">
                <view class="gui-modal-button" @tap="close">取消</view>
                <view class="gui-modal-button" @tap="submit">确定</view>
            </view>
        </view>
    </view>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
defineProps({
    show: {
        type: Boolean,
        default: false
    },
    ProductIndex: {
        type: Number,
        default: 0
    },
    group: {
        type: String,
        default: ''
    },
    Attribute: {
        type: String,
        default: ''
    },
    modelValue: {
        type: String,
        default:''
    }
})
const emit = defineEmits(['on-close', 'on-submit', 'update:modelValue'])

const close = () => {
    emit('on-close')
}

const submit = () => {
  emit('on-submit')
}
const inputf = (e) => {
    // console.log(modelValue)

    emit('update:modelValue', e.detail.value)
}

</script>

<style scoped lang="scss">
.gui-groups{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    .gui-groups-content{
        width: 50%;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        .gui-groups-title{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 20px;
            border-bottom: 1px solid #eee;
            background: #1E88E5;
            color: white;
        }
        .gui-groups-body{
            padding: 10px 20px;
        }
        .gui-groups-footer {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            padding: 10px 20px;
            border-top: 1px solid #eee;
        }
    }
}

.gui-modal-button{
    padding: 10px 20px;
    color: #007aff;
    font-size: 16px;
}
</style>
