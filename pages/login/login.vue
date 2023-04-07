<template>
	<!-- <gui-page> -->
		<view class="from">
			<form class="from-box" @submit="submit">
				<view class="gui-h4" style="text-align: center;font-weight: bold;">
					弘兆后台
				</view>
				<view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">账号</text>
						<view class="gui-form-body">
							<input type="text" class="gui-form-input" v-model="list.formData.username" name="username" placeholder="请输入账号" />
						</view>
					</view>
				</view>
				<view class="gui-bg-white gui-dark-bg-level-3 gui-padding-x">
					<view class="gui-form-item gui-border-b">
						<text class="gui-form-label">密码</text>
						<view class="gui-form-body">
							<input type="password" class="gui-form-input" v-model="list.formData.password" name="password" placeholder="请输入密码" />
						</view>
					</view>
				</view>
				
				<view class="gui-margin-top gui-flex gui-row gui-nowrap gui-justify-content-end gui-padding-x">
					<button type="default" class="gui-button gui-bg-primary gui-noborder" style="width:168rpx;" formType="submit">
						<text class="gui-color-white gui-button-text">提交</text>
					</button>
				</view>
			</form>
		</view>
	<!-- </gui-page> -->
</template>

<script setup>
	import { onShow, onUnload, onReady } from '@dcloudio/uni-app'
	import {reactive} from 'vue'
	const list = reactive({
		formData: {
			username:'admin',
			password:'123'
		}
	})
	const submit = (e) => {
		console.log(e)
		if(list.formData.username === 'admin' && list.formData.password === '123'){
			uni.reLaunch({
				url:'/pages/switchPages/index'
			})
		}else {
			uni.showToast({
				title: '账号或密码错误',
				icon:'none',
				duration:1500,
				mask:true
			})
		}
	}
</script>

<style scoped lang="scss">
page{
	background-color: #0088f8;
}
.from{
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	&-box{
		width: 800rpx;
		height: 560rpx;
		background-color: white;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;
	}
}
</style>
