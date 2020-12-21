<script>
	import homeJS from 'common/Home.js';
	import $taxi from '@/common/Czc.js';
	import Voice from '@/components/Driver/QS-baiduyy/QS-baiduyy.js';
	export default {
		globalData: {
			globalInterval: 0,
			carId: 0,
			driverID: '', //司机ID
			licensePlate: '', //车牌号
			uploadMyLocation: function() {
				let that = this;

				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
						uni.request({
							url: $taxi.Interface.reportAddress.value,
							method: $taxi.Interface.reportAddress.method,
							data: {
								//carId:that.carId,
								driverID: that.driverID,
								license_plate: that.licensePlate,
								lon: res.longitude,
								lat: res.latitude,
							},
							success: function(res) {
								console.log(true);
							},
							fail: function(res) {
								console.log(false);
							}
						});
					},
				});
			},
			constantly: function() {
				let that = this;
				if (that.globalInterval == 0) {
					that.globalInterval = setInterval(function() {
						that.uploadMyLocation();
					}, 20000);
				}
			},
			closeUpload: function() {
				let that = this;
				clearInterval(that.globalInterval);
				that.globalInterval = 0;
			}

		},
		onLaunch: function() {
			console.log('App Launch')
			// 第一步：初始化微信云函数
			wx.cloud.init({
					env: 'test-2gt0mbv78a4941a-3bb0a0d2fe2', // 打开微信云开发控制平台，右上角点击[设置] - [环境设置] 
					traceUser: true
				}),
				// 第二步：获取用户的openid
				wx.cloud.callFunction({
					name: 'getOpenId', // 打开微信云开发控制平台，左上角点击[云函数]
					data: {},
					success: res => {
						// debugger
						// 第三步(可省略)：缓存用户openid，方便后续再次调用
						wx.setStorage({
							key: "user",
							data: res.result.userInfo.openId
						})
						// console.log('成功获取openid: ', res.result.userInfo.openId)
					},
					fail: err => {
						console.error('获取失败：', err)
					}
				})
		},
		onShow: function() {
			Voice.reset();
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
