<template>
	<gui-page :customHeader="true">
		<!-- <template v-slot:gHeader>
			<view style="height:20px;"></view>
		</template> -->
		<!-- 请开始您的开发 ~ -->
		<template v-slot:gBody>
			<view class="container">
				<view class="container-left">
					<view class="container-left-list" v-for="(item, index) in list.menu" @tap="route(item.route)">
						<text class="my-icons" v-html="item.icon"></text>
						<text>{{item.name}}</text>
					</view>
				</view>
				<view class="container-right">
					<view class="container-right-title">
						<text class="my-icons">&#xe622;</text>
						<view class="container-right-title-icon">
							<text class="my-icons">&#xe60e;</text>
							<text class="my-icons">&#xe62f;</text>
							<view class="container-right-title-username" @tap="login">
								<image class="gui-list-image ucenter-face-image" 
									src="https://images.unsplash.com/photo-1662695094714-966fc339a2e8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyNnx8fGVufDB8fHx8&auto=format&fit=crop&w=100&q=80" 
									mode="aspectFill"></image>
								<text>用户名</text>
							</view>
						</view>
					</view>
					
					<view class="container-right-body">
						<view class="charts-box" style="flex: 6;background-color: white;">
							 <qiun-data-charts 
							      type="bar"
							      :opts="list.opts"
							      :chartData="list.chartData"
							    />
						</view>
						<view class="charts-box note-order" style="flex: 4;">
							<!-- 注意事项 -->
							<view class="note" style="background-color: white;padding: 30rpx 0 60rpx 0;border-radius: 20rpx;">
								<view class="note-title">
									注意事项
								</view>
								<view class="note-title-list">
									<view class="note-title-list-item">
										<text class="my-icons">&#xe60a;</text>
										<text>待发货</text>
									</view>
									<view class="note-title-list-item">
										<text class="my-icons">&#xe60a;</text>
										<text>待发货</text>
									</view>
									<view class="note-title-list-item">
										<text class="my-icons">&#xe60a;</text>
										<text>待发货</text>
									</view>
									<view class="note-title-list-item">
										<text class="my-icons">&#xe60a;</text>
										<text>待发货</text>
									</view>
									<view class="note-title-list-item">
										<text class="my-icons">&#xe60a;</text>
										<text>待发货</text>
									</view>
								</view>
							</view>
							<!-- 订单查询 -->
							<view class="order" style="background-color: white;padding: 30rpx 0 60rpx 0;border-radius: 20rpx;">
								<view class="order-title">
									订单查询
								</view>
								<view class="order-input">
									<input type="text" value="" placeholder="请输入产品/商品编号" />
								</view>
								<view class="order-bth">
									<button type="default" class="gui-button gui-bg-blue gui-noborder">
										<text class="gui-color-white gui-button-text">查询</text>
									</button>
								</view>
							</view>
						</view>
					</view>
					
					<view class="container-right-footer">
						<view class="charts-box" style="flex: 4;">
							<view class="charts-box" style="flex: 6;background-color: white;">
								 <qiun-data-charts 
								      type="mix"
								      :opts="list.opts1"
								      :chartData="list.chartData1"
								    />
							</view>
						</view>
						<view class="charts-box charts-box-list" style="flex: 6;">
							<view class="charts-box-list-item">
								<qiun-data-charts type="arcbar" :opts="list.opts2" :chartData="list.chartData2" />
							</view>
							<view class="charts-box-list-item">
								<view class="charts-box-list-item-title" style="padding: 20rpx;">
									最新订单
								</view>
								<view class="charts-box-list-item-goods" v-for="(item, index) in 5">
									<text>item-{{index+1}}</text>
									<text>2023-04-06 09:20:30</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</template>
	</gui-page>
</template>
<script setup>
	import { onShow, onUnload, onReady } from '@dcloudio/uni-app'
	import {reactive} from 'vue'
	
	const list = reactive({
		menu:[
			{name: '首页', icon: '&#xe600;', route: '/'},
			{name: '个人信息', icon: '&#xe635;'},
			{name: '员工管理', icon: '&#xe64d;', route: '/pages/staff_management/staff_management'},
			{name: '产品管理', icon: '&#xe60a;', route: '/pages/product_management/product_management'},
			{name: '财务管理', icon: '&#xe64a;'},
			{name: '财务管理', icon: '&#xe64a;'},
			{name: '数据统计', icon: '&#xe63e;'},
			{name: '设置', icon: '&#xe615;'},
		],
		chartData:{},
		chartData1:{},
		chartData2: {},
		opts: {
			color: ["#1890FF","#63DAAB","#657798","#EE6666","#73C0DE","#91CB74","#FAC858","#9A60B4","#ea7ccc"],
			padding: [15,30,0,5],
			enableScroll: false,
			legend: {},
			xAxis: {
			  boundaryGap: "justify",
			  disableGrid: false,
			  min: 0,
			  axisLine: false,
			  max: 70
			},
			yAxis: {},
			extra: {
			  bar: {
				type: "stack",
				width: 30,
				meterBorde: 1,
				meterFillColor: "#FFFFFF",
				activeBgColor: "#000000",
				activeBgOpacity: 0.08,
				categoryGap: 2
			  }
			}
		},
		opts1: {
		        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
		        padding: [15,15,0,15],
		        enableScroll: false,
		        legend: {},
		        xAxis: {
		          disableGrid: true,
		        },
		        yAxis: {
		          disabled: false,
		          disableGrid: false,
		          splitNumber: 5,
		          gridType: "dash",
		          dashLength: 4,
		          gridColor: "#CCCCCC",
		          padding: 10,
		          showTitle: true,
		          data: [
		            {
		              position: "left",
		              title: "折线"
		            },
		            {
		              position: "right",
		              min: 0,
		              max: 200,
		              title: "柱状图",
		              textAlign: "left"
		            },
		          ]
		        },
		        extra: {
		          mix: {
		            column: {
		              width: 20
		            }
		          }
		        }
		      },
		opts2: {
		        color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
		        padding: undefined,
		        title: {
		          name: "80%",
		          fontSize: 35,
		          color: "#2fc25b"
		        },
		        subtitle: {
		          name: "正确率",
		          fontSize: 25,
		          color: "#666666"
		        },
		        extra: {
		          arcbar: {
		            type: "circle",
		            width: 12,
		            backgroundColor: "#E9E9E9",
		            startAngle: 1.5,
		            endAngle: 0.25,
		            gap: 2
		          }
		        }
		      }
	})
	
	onReady(() => {
		getServerData()
		getServerData1()
		getServerData2()
	})
	const getServerData = () => {
		//模拟从服务器获取数据时的延时
		setTimeout(() => {
			let res = {
				categories: ["2018","2019","2020","2021","2022","2023"],
				series: [
					{
						name: "周数据",
						data: [35,36,31,33,13,34]
					},
					{
						name: "月数据",
						data: [18,27,21,24,6,28]
					},
					{
						name: "年数据",
						data: [48,36,48,66,67,40]
					}
				]
			}
			list.chartData = JSON.parse(JSON.stringify(res));
		},500)
		console.log(list.chartData)
	}
	
	const getServerData1 = () => {
	      //模拟从服务器获取数据时的延时
	      setTimeout(() => {
	        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
	        let res = {
	            categories: ["2018","2019","2020","2021","2022","2023"],
	            series: [
	              {
	                name: "柱2",
	                index: 1,
	                type: "column",
	                data: [50,20,75,60,34,38]
	              },
	              {
	                name: "折线",
	                type: "line",
	                color: "#2fc25b",
	                data: [120,140,105,170,95,160]
	              },
	            ]
	          };
	        list.chartData1 = JSON.parse(JSON.stringify(res));
	      }, 500)
	    }
		const getServerData2 = () => {
			//模拟从服务器获取数据时的延时
			setTimeout(() => {
				//模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
				let res = {
					series: [{
						name: "正确率",
						color: "#2fc25b",
						data: 0.8,
					}]
				};
				list.chartData2 = JSON.parse(JSON.stringify(res));
			}, 500);
		}
		
		const login = () => {
			uni.reLaunch({
				url: '/pages/login/login'
			})
		}
		
		const route = (item) => {
			console.log(item)
			if(item === undefined){
				uni.showToast({
					title: '此功能暂未开放，敬请期待',
					icon:'none',
					duration:1500,
					mask:true
				})
				return
			}
			uni.navigateTo({
				url:item,
			})
			
		}
		
</script>
<style scoped lang="scss">
	/* page{
		background-color: #0088f8;
	} */
	.charts-box-list-item-goods{
		display: flex;
		flex-direction: column;
		margin-bottom: 20rpx;
		padding-left: 20rpx;
	}
	.container{
		width: 100%;
		height: calc(100vh - 20px);
		background-color: aqua;
		display: flex;
		overflow: hidden;
		&-left{
			width: 300rpx;
			background-color: #0088f8;
			border-top-right-radius:20rpx ;
			border-bottom-right-radius: 20rpx;
			display: flex;
			flex-direction: column;
			color: white;
			padding-top: 60rpx;
			&-list{
				height: 88rpx;
				padding-left: 20rpx;
				display: flex;
				align-items: center;
				.my-icons{
					font-size: 48rpx;
					margin-right: 20rpx;
				}
			}
		}
		&-right{
			flex: 1;
			// height: 100%;
			display: flex;
			flex-direction: column;
			background-color: #EEEFF8;
			&-title{
				height: 88rpx;
				background-color: white;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.my-icons{
					font-size: 48rpx;
					margin-left: 20rpx;
				}
				&-icon{
					display: flex;
					justify-content: space-between;
					align-items: center;
				}
				&-username{
					display: flex;
					align-items: center;
					margin-right: 20rpx;
					margin-left: 20rpx;
				}
			}		
			&-body{
				height: 650rpx;
				// background-color: #0088f8;
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				padding: 0 50rpx;
				.note-order{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
				}
				.charts-box{
					// background-color: white;
					
					border-radius: 20rpx;
					.note{
						display: flex;
						flex-direction: column;
						.note-title{
							padding: 20rpx;
							font-size: 28rpx;
							font-weight: bold;
						}
						.note-title-list{
							display: flex;
							justify-content: space-between;
							.note-title-list-item{
								display: flex;
								flex-direction: column;
								align-items: center;
								font-size: 24rpx;
								padding: 0 20rpx;
								.my-icons{
									font-size: 48rpx;
									margin-bottom: 10rpx;
								}
							}
						}
					}
					.order-title{
						padding: 20rpx;
						font-size: 28rpx;
						font-weight: bold;
					}
					.order-input{
						
						padding: 0 20rpx;
						input{
							background-color: #f0f1f6;
							height: 72rpx;
							line-height: 72rpx;
							text-align: center;
						}
					}
					.order-bth{
						padding: 0 20rpx;
						margin-top: 20rpx;
					}
				}
				.charts-box:nth-child(1){
					margin-right: 50rpx;
				}
			}
			
			&-footer{
				height: 650rpx;
				// background-color: #0088f8;
				margin-top: 50rpx;
				display: flex;
				justify-content: space-between;
				padding: 0 50rpx;
				.charts-box{
					background-color: white;
					border-radius: 20rpx;
				}
				.charts-box:nth-child(1){
					margin-right: 50rpx;
				}
				.charts-box:nth-child(2){
					background-color: #EEEFF8;
					display: flex;
					justify-content: space-between;
					.charts-box-list-item{
						background-color: white;
						flex: 1;
						border-radius: 20rpx;
					}
					.charts-box-list-item:nth-child(1){
						margin-right: 50rpx;
					}
				}
			}
		}
	}
	.ucenter-face-image{width:60rpx; height:60rpx;margin-right: 20rpx;}
</style>
