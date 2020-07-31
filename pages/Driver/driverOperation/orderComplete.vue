<template>
	<view>
		<!-- 顶部背景图片 -->
		<view style="width: 100%;height: 300rpx;background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));">
		</view>
		<view style="position: fixed;top: 80rpx;left: 34rpx;right: 0px;align-items: center; display: flex;flex-direction: row;">
			<view style="width: 180rpx; font-family:Source Han Sans SC;color: #FFFFFF; font-size: 38rpx;font-weight:bold; margin-left: 244rpx;">订单完成</view>
		</view>
		
		<!-- 中间白色背景 -->
		<view style="width: 700rpx;margin-top: -80rpx;padding: 50rpx 0;background-color: #FFFFFF;margin-left: 25rpx; border-radius:20rpx;">
			<view class="content-block">
				<text>运行时长：{{getUseTime(orderInfo.orderTime,orderInfo.overTime)}}</text>
			</view>
			<view class="content-block" style="margin-top: 50rpx;">
				<text>里程数：{{getLong(orderInfo.expectMileage)}}</text>
			</view>
			<view style="display: flex;align-items: center;justify-content: center;margin-top: 50rpx;">
				<checkbox-group @change="corrChange" style="display: flex;justify-content: space-between;width: 600rpx;">
					<checkbox class="content-block" value="time">
						<text>时长有异议</text>
					</checkbox>
					<checkbox class="content-block" value="mileage">
						<text>里程有异议</text>
					</checkbox>
				</checkbox-group>
			</view>
			<view style="margin-top: 50rpx;">
				<textarea style="margin: 0 auto;border:1px solid #999999;padding: 20rpx;border-radius: 20rpx;" v-model="remarkVal"
				 placeholder="请输入备注,若无可不填"></textarea>
			</view>
		</view>
		
		<view style="margin-top: 30rpx;">
			<button @click="finished" class="button-class">
				<text class="button-text">保存并返回</text>
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remarkVal: '',
				orderNumber:'',
				orderInfo:{
					expectDuration:'',
					expectMileage:'',
					orderTime:'',
					overTime:'',
				},
				isCorrTime:0,
				isCorrMileage:0,
			}
		},
		onLoad(option) {
			var that = this;
			that.orderNumber = option.orderNumber;
			that.getOrderDetail();
		},
		methods: {
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			corrChange:function(res){
				let that = this;
				that.isCorrTime = 0;
				that.isCorrMileage = 0;
				for (let item of res.detail.value) {
					switch(item){
						case 'time' :
							that.isCorrTime = 1;
							break;
						case 'mileage' :
							that.isCorrMileage = 1;
							break;
						default:
							break;
					}
				}
			},
			finished:function() {
				let that = this;
				uni.request({
					url:that.$taxi.Interface.saveDriverRemark.value,
					method:that.$taxi.Interface.saveDriverRemark.method,
					data:{
						driverRemark:that.remarkVal,
						orderId:that.orderNumber,
						orderDuration:that.isCorrTime, //时长
						orderMileage:that.isCorrMileage,
					},
					success:function(res){
						uni.hideLoading();
						console.log(res);
						if(res.data.code===200){
							that.showToast('保存成功');
							setTimeout(function(){
								uni.redirectTo({
									url: './taxiDriver',
								});
							},1500);
							
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				});
				
				
			},
			
			getOrderDetail:function(){
				let that = this;
				uni.request({
					url: that.$taxi.Interface.getOrderDetail.value,
					method: that.$taxi.Interface.getOrderDetail.method,
					data: {
						orderId: that.orderNumber,
					},
					success: function(res) {
						console.log(res);
						let data = res.data.data;
						if (res.data.code===200) {
							that.orderInfo.orderTime = data.orderTime;
							that.orderInfo.overTime = data.overTime;
							that.orderInfo.expectDuration = data.line.expectDuration;
							that.orderInfo.expectMileage = data.line.expectMileage;
						}
					},
					fail: function(res) {
						that.showToast('网络连接失败');
					}
				});
			},
			
			getUseTime:function(start,end){
				var start = new Date(start.replace(/-/g,'/')).getTime();
				var end = new Date(end.replace(/-/g,'/')).getTime();
				var useTime = end - start;
				var time = useTime / 1000 / 60;
				return parseInt(time)  + '分钟'
			},
			getLong:function(long){
				return long + '公里';
			}
		}
	}
</script>

<style>
	page {
		background-color: #F5F9FC;
	}

	.content-block {
		text-align: center;
	}

	.content-block text {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: rgba(51, 51, 51, 1);
	}

	.button-text {
		font-size: 34rpx;
		text-align: center;
	}

	.button-class {
		width: 500rpx;
		background-color: #0073CE;
		border: 1px solid #0073CE;
		color: #FFFFFF;
	}
</style>
