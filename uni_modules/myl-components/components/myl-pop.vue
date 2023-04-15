<template>
    <view class="gui-sex" v-if="show">
        <view class="gui-sex-list" :style="'width:'+width">
            <view class="gui-sex-list-item" v-for="(item, index) in data" :key="index" @tap="pop_up(index, item)">
                {{item}}
            </view>
        </view>
    </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"
defineProps({
    data: {
        type: Array,
        default: () => []
    },
    show: {
        type: Boolean,
        default: false
    },
    width: {
        type: String,
        default: '40%'
    }
})
const emit = defineEmits(['on-click'])

const pop_up = (index, item) => {
    emit('on-click', index, item)
}



</script>

<style scoped lang="scss">
.gui-sex{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    &-list{
        //width: 40%;
        background-color: #fff;
        border-radius: 10px;
        &-item{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            &:last-child{
                border-bottom: none;
            }
        }
    }
}
</style>
