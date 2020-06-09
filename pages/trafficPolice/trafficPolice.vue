<template>
	<view>
		<view style="position: relative;z-index: -1;">
			<image src="../../static/trafficPolice/advertisement.png" style="width: 750rpx;height: 760rpx;"></image>
		</view>
		<view style="margin: 0 30rpx;background-color: #FFFFFF;border-radius: 20rpx; height: 450rpx; margin-top: -140rpx;">
			<view style="margin-left: 53upx;margin-right: 53upx;margin-top:76upx ;">
				<uniSegmentedControl :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#FFFFFF"></uniSegmentedControl>
			</view>
			<view v-if="current === 0" style="margin-top: 43rpx;margin-left: 53upx;margin-right: 53upx;">
				<validCode ref="code" :maxlength="7" :isPwd="false" @finish="getCode"></validCode>
			</view>
			<view v-if="current === 1" style="margin-top: 43rpx;margin-left: 53upx;margin-right: 53upx;">
				<validCode ref="code" :maxlength="8" :isPwd="false" @finish="getCode"></validCode>
			</view>
			<view style="margin-top: 68rpx;">
				<button @click="Confirm" style="background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));border-radius: 12rpx; width: 640rpx;">
					<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">确定</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import uniSegmentedControl from "../../components/uni-segmented-control/uni-segmented-control.vue";
	import validCode from "../../components/p-validCode/validCode.vue";
	export default {
		components: {
			uniSegmentedControl,
			validCode
		},
		data() {
			return {
				driverId: '',
				driverName: '',
				imgHeight: "",
				current: 0,
				items: ['燃油汽车', '新能源汽车'],
				vehicleType: "",
				vals: "",
				keyMode: 'car',
				keyType: 0,
				vehicleNumber: "",
				keyTitle: '汽车键盘',

			}
		},
		methods: {
			/* async load() {
				var that = this;
				console.log(1);
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						that.imgHeight = res.windowHeight;
					}
				});
			}, */
			//本页面统一调用此方法
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			isLicensePlate: function(str) { //验证是不车牌
				return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
					.test(str);
			},
			goBack: function() {
				uni.navigateBack();
			},
			onClickItem(e) { //tab点击事件
				var that = this;
				if (that.current !== e.currentIndex) {
					that.current = e.currentIndex;
				}
				that.$refs.code.clear();
			},
			getCode(val) {
				this.vehicleNumber = val;
			},
			Confirm(e) {
				var that = this;
				uni.showLoading({
					mask: true
				});
				// getApp().globalData.vehicleNumber = that.vehicleNumber;
				// getApp().globalData.constantly();
				var plate = this.vehicleNumber;

				if (that.isLicensePlate(plate)) {
					if ((this.current == 0 && plate.length == 7) || (this.current == 1 && plate == 8)) {
						uni.navigateTo({
							url: './policeSelect'
						})
						// uni.request({
						// 	url: that.$home.Interface.DriverVehicleBinding_Check.value,
						// 	method: that.$home.Interface.DriverVehicleBinding_Check.method,
						// 	data: {
						// 		vehicleNumber: that.vehicleNumber,
						// 		driverId: that.driverId,
						// 		vehicleType: that.vehicleType,
						// 		driverName:that.driverName
						// 	},
						// 	success: function(res) {
						// 		uni.hideLoading();
						// 		if (res.data.status) {
						// 			uni.setStorage({
						// 				key: 'vehicleInfo',
						// 				data: {
						// 					vehicleType: that.vehicleType,
						// 					vehicleNumber: that.vehicleNumber
						// 				},
						// 				success() {
						// 					uni.navigateTo({
						// 						url:'./policeSelect'
						// 					})
						// 				}
						// 			});
						// 		} else {
						// 			that.showToast(res.data.msg);
						// 		}
						// 	},
						// 	fail: function(res) {
						// 		uni.hideLoading();
						// 		that.showToast('网络连接失败');
						// 		console.log(res);
						// 	}
						// })
					} else {
						that.showToast('请输入正确车牌号');
					}
				} else {
					that.showToast('请输入正确车牌号');
				}
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F7F9;
	}
</style>
