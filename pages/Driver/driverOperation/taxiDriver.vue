<template>
	<view>
		<view :style="{height:menuButtonHeight+'px','margin-top':menuButtonTop+'px'}" style="margin: 0 auto 30rpx auto;display: flex;width: 94%;flex-direction: row;align-items: center;">
			<view style="width: 40rpx;margin-right: 10px;">
				<uni-icons @click="toPersonal" type="contact" size="24"></uni-icons>
			</view>
			<view style="margin-right:220rpx;display: flex;flex-direction: row;align-items: center;">
				<text style="font-size:38rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);">司机接单</text>
			</view>
			<view style="text-align: right;">
				<uni-icons @click="toOrderList" type="list" size="24"></uni-icons>
			</view>
		</view>
		<view style="display: flex;flex-direction: row;justify-content: space-between;width: 94%;margin: 0 auto 20rpx auto;">
			<button @click="passengerBroadcast" class="broadcastButton">上车播报</button>
			<button @click="arriveBroadcast" class="broadcastButton">下车播报</button>
		</view>
		
		<!-- 接单信息-出租车 -->
		<scroll-view style="height: 1100rpx;" scroll-y=true>
			
			<view v-for='(item, index) in orderArr' :key='index' style="width: 94%;padding-bottom: 30rpx; background-color: #FFFFFF;margin-left: 22rpx; border-radius:20rpx; margin-bottom: 30rpx;">
				<!-- <view style="padding: 40rpx;display: flex;flex-direction: row;">
					<text class="destinationArea" style="width:160rpx;">订单类型:</text>
					<text class="destinationArea" style="margin-left: 10rpx;">{{item.orderType}}</text>
				</view> -->
				<view style="padding: 40rpx;display: flex;flex-direction: row;">
					<text class="destinationArea" style="width:160rpx;">目的区域:</text>
					<text class="destinationArea">{{item.line.area}}</text>
				</view>
				<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;margin-top: 0;">
					<text class="fontClass" style="width:140rpx;height:40rpx;">出发时间:</text>
					<text class="fontClass" style="height:40rpx;">{{item.orderTime}}</text>
				</view>
				<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;margin-top: 0;">
					<text class="fontClass" style="width:140rpx;height:40rpx;">线路名称:</text>
					<text class="fontClass" style="height:40rpx;">{{item.line.name}}</text>
				</view>
				<view style="margin: 20rpx 44rpx;display: flex;flex-direction: row;">
					<text class="fontClass" style="width:140rpx;height:40rpx;">预计里程:</text>
					<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatExpectMileage(item.line.expectMileage)}}</text>
					<text class="fontClass" style="width:140rpx;height:40rpx;margin-left: 40rpx;">预计时长:</text>
					<text class="fontClass" style="width:140rpx;height:40rpx;">{{formatExpectDuration(item.line.expectDuration)}}</text>
				</view>
				<view style="margin: -10rpx 40rpx;display: flex;flex-direction: row;">
					<text class="fontClass" style="width:110rpx;height:40rpx;">上车点:</text>
					<text class="fontClass" style="height:40rpx;">{{item.line.startName}}</text>
				</view>
				<view style="margin: 20rpx 40rpx;display: flex;flex-direction: row;">
					<text class="fontClass" style="width:110rpx;height:40rpx;">下车点:</text>
					<text class="fontClass" style="height:40rpx;">{{item.line.endName}}</text>
				</view>
				<view style="display: flex; margin-left: 4rpx;">
					<button v-show="item.state === 'waiting'" @click="receipt(item)" style="width:278rpx;border-radius:12rpx; margin-top: 20rpx; font-size: 34rpx;text-align: center;background-color: #ED766C; border: 1px solid #ED766C; color: #FFFFFF; align-items: center;">
						接单
					</button>
				</view>
			</view>
			
		</scroll-view>
	</view>
</template>

<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import Map from '@/common/my-openMap/openMap.js';
	import utils from '@/components/Driver/shoyu-date/utils.filter.js';
	import Voice from '@/components/Driver/QS-baiduyy/QS-baiduyy.js';
	export default {
		components: {
			uniIcons,
		},
		data() {
			return {
				orderArr: [],
				getOrderInterval: 0,
				userInfo: '',
				vehicleInfo: '',
				taxiOrderNum: 0,
				//taxiLastIndex: 0,
				menuButtonHeight:'',
				menuButtonTop:'',
			}
		},
		onLoad() {
			let that = this;
			let menuButtonInfo  = uni.getMenuButtonBoundingClientRect();
			that.menuButtonHeight = menuButtonInfo.height;
			that.menuButtonTop = menuButtonInfo.top;
			
			
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync("vehicleInfo") || '';
			
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				//在getOrder里面会关闭
				that.getOrder(that.userInfo.driverId);
				that.realTimeOrder(that.userInfo.driverId);
			}
		},
		onShow() {
			getApp().globalData.constantly();
		},
		onUnload() {
			let that = this;
			clearInterval(that.getOrderInterval);
			that.orderArr = [];
		},
		/* onHide() {
			let that = this;
			clearInterval(that.getOrderInterval);
			that.orderArr = [];
		}, */
		methods: {
			//本页面统一调用此方法
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			toPersonal: function() {
				uni.navigateTo({
					url:'../../GRZX/user'
				});
			},
			receipt: function(item) {
				//接单
				let that = this;
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				uni.request({
					url: that.$taxi.Interface.receivingOrder.value,
					method: that.$taxi.Interface.receivingOrder.method,
					data: {
						orderId: item.id,
					},
					success: function(res) {
						uni.hideLoading();
						if (res.data.code===200) {
							that.showToast('接单成功，请到订单列表查看');
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			
			toDetail:function(item){
				uni.navigateTo({
					url: '/pages/driver/driverOperation/confirmgetonCar?orderNumber=' + item.id,
				});
			},
			
			realTimeOrder: function(userId) {
				//定时器开启
				let that = this;
				if (that.getOrderInterval == 0) {
					that.getOrderInterval = setInterval(function() {
						that.getOrder(userId);
					}, 5000);
				}
			},
			
			//获取可接单订单列表
			getOrder: function(userId) {
				let that = this;
				uni.request({
					url: that.$taxi.Interface.getOrders.value,
					method: that.$taxi.Interface.getOrders.method,
					data: {
						driverId: userId,
					},
					success: function(res) {
						uni.hideLoading();
						if (res.data.code===200) {
							that.orderArr = [];
							let data = res.data.data;
							that.orderArr = data;
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			
			formatExpectDuration:function(expectDuration){
				//时间
				return parseInt(expectDuration) + '分钟'
			},
			
			formatExpectMileage:function(expectMileage){
				//公里数
				// var mileage = parseFloat(expectMileage);
				// var long = mileage / 1000;
				// if(long > 1){
				// 	return long.toFixed(1) + '公里';
				// }else{
				// 	return mileage + '米';
				// }
				return expectMileage + '公里';
			},
			
			toOrderList:function(){
				uni.navigateTo({
					url:'../order/Order'
				});
			},
			
			passengerBroadcast:function(){
				Voice('请系好安全带，注意出行安全。');
				Voice('Please fasten your seat belt and pay attention to travel safety.');
			},
			
			arriveBroadcast:function(){
				Voice('目的地已到达，请携带好您的随身物品。');
				Voice('The destination has arrived. Please take your belongings with you.');
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}

	.destinationArea {
		height: 40rpx;
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(44, 45, 45, 1);
		line-height: 36rpx;
	}

	.userType {
		width: 140rpx;
		height: 40rpx;
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		color: #666666;
		line-height: 36rpx;
	}

	.userType1 {
		height: 40rpx;
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		color: #666666;
		line-height: 36rpx;
	}

	.fontClass {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		color: #666666;
		line-height: 36rpx;
	}

	.buttonActive {
		background: linear-gradient(270deg, #FA7465, #F95C75);
		box-shadow: 0px 7px 38px 8px rgba(216, 48, 75, 0.15);
	}

	.buttonFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FFFFFF;
	}

	.buttonFont1 {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FC4646;
	}

	.unButtonFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #000000;
	}

	.chooseBorder {
		border-bottom: #FC4646 1px solid;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}
	
	.broadcastButton{
		background-color: #FFFFFF;
		border-radius:20rpx;
		color: #333333;
		font-family:Source Han Sans SC;
		font-size: 38rpx;
		font-weight: 500;
		box-shadow:0px 6px 20px 0px #E7E7E7;
		width: 280rpx;
		margin: 0;
	}
	.broadcastButton::after{
		border: none;
	}
</style>
