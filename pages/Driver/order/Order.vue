<template>
	<view>
		<view :style="{height:menuButtonHeight + 'px','margin-top':menuButtonTop+'px'}" style=" margin-left: auto;margin-right: auto;margin-bottom: 30rpx;display: flex;width: 94%;flex-direction: row;align-items: center;">
			<view style="width: 40rpx;margin-right: 10px;">
				<uni-icons @click="back" type="arrowleft" size="24"></uni-icons>
			</view>
			<view style="margin-right:220rpx;display: flex;flex-direction: row;align-items: center;">
				<text style="font-size:38rpx;font-family:Source Han Sans SC;font-weight:bold;color:rgba(44,45,45,1);">订单列表</text>
			</view>
		</view>

		<view style="margin:0 30rpx;">
			<view style="height: 30px;position: fixed;left: 30rpx;right: 30rpx;z-index: 9999;background-color: #F6F8FE;" :style="{top:menuButtonHeight}">
				<view class="tab">
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">进行中</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">已完成</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">被取消</view>
				</view>
			</view>
			<scroll-view :style="{height:scrowHeight+'px'}" :refresher-triggered='refresherTriggered' scroll-y=true refresher-enabled=true @refresherrefresh='refresherRefresh'>
				<!--全部-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
					<view v-for="(item,index) in orderArr" :key="index">
						<!-- 出租车开始 -->
						<view style="margin-top: 20rpx;">
							<view class="booktime">
								上车时间：{{item.orderTime}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.line.name}}</view>
										</view>
										<view class="orderstatus statusWidth">{{formatState(item.state)}}</view>
									</view>
									
									<view style="padding-left: 50rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.no}}</view>
										<view>上车时间：{{item.orderTime}}</view>
										<view>起点：{{item.line.startName}}</view>
										<view>终点：{{item.line.endName}}</view>
										<view v-show="item.state === 'arrive'">用时：{{costTime(item.orderTime,item.overTime)}}</view>
									</view>
									
									<view class="btnarea">
										<view v-show="item.state === 'received' || item.state === 'setout' || item.state === 'departure'">
											<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
										</view>
										<view v-show="item.state === 'passenger' || item.state === 'setout' || item.state === 'arrive' || item.state === 'departure'">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
										<view v-show="item.state === 'received'">
											<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
										</view>
										<view v-show="item.state === 'passenger'">
											<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 出租车结束 -->
					</view>
				</view>
				<!--进行中-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
					<view v-for="(item,index) in underwayArr" :key="index">
						<!-- 出租车开始 -->
						<view style="margin-top: 20rpx;">
							<view class="booktime">
								上车时间：{{item.orderTime}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.line.name}}</view>
										</view>
										<view class="orderstatus statusWidth">{{formatState(item.state)}}</view>
									</view>
									
									<view style="padding-left: 50rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.no}}</view>
										<view>上车时间：{{item.orderTime}}</view>
										<view>起点：{{item.line.startName}}</view>
										<view>终点：{{item.line.endName}}</view>
										<view v-show="item.state === 'arrive'">用时：{{costTime(item.orderTime,item.overTime)}}</view>
									</view>
									
									<view class="btnarea">
										<view v-show="item.state === 'received' || item.state === 'setout'">
											<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
										</view>
										<view v-show="item.state === 'passenger' || item.state === 'setout' || item.state === 'arrive' || item.state === 'departure'">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
										<view v-show="item.state === 'received'">
											<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
										</view>
										<view v-show="item.state === 'passenger'">
											<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
										</view>
									</view>
									
								</view>
							</view>
						</view>
						<!-- 出租车结束 -->
					</view>
				</view>
				<!--已完成-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
					<view v-for="(item,index) in finishedArr" :key="index">
						<!-- 出租车开始 -->
						<view style="margin-top: 20rpx;">
							<view class="booktime">
								上车时间：{{item.orderTime}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.line.name}}</view>
										</view>
										<view class="orderstatus statusWidth">{{formatState(item.state)}}</view>

									</view>
									<view style="padding-left: 50rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.no}}</view>
										<view>上车时间：{{item.orderTime}}</view>
										<view>起点：{{item.line.startName}}</view>
										<view>终点：{{item.line.endName}}</view>
										<view v-show="item.state === 'arrive'">用时：{{costTime(item.orderTime,item.overTime)}}</view>
									</view>
									<view class="btnarea">
										<view>
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 出租车结束 -->
					</view>
				</view>
				<!--已取消-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==3">
					<view v-for="(item,index) in cancleArr" :key="index">
						<!-- 出租车开始 -->
						<view style="margin-top: 20rpx;">
							<view class="booktime">
								上车时间：{{item.orderTime}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.line.name}}</view>
										</view>
										<view class="orderstatus statusWidth">{{formatState(item.state)}}</view>

									</view>
									<view style="padding-left: 50rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.no}}</view>
										<view>上车时间：{{item.orderTime}}</view>
										<view>起点：{{item.line.startName}}</view>
										<view>终点：{{item.line.endName}}</view>
										<view v-show="item.state === 'arrive'">用时：{{costTime(item.orderTime,item.overTime)}}</view>
									</view>
									<view class="btnarea">
										<view>
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 出租车结束 -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue';
	import Voice from '@/components/Driver/QS-baiduyy/QS-baiduyy.js';
	export default {
		components: {
			uniTransition
		},
		data() {
			return {
				//carTypeid: 0,
				ani: ['slide-top', 'zoom-in'],
				current: 0,
				orderArr: [],
				underwayArr: [], //进行中
				finishedArr: [], //已完成
				cancleArr: [], //已取消
				userInfo: '',
				menuButtonHeight: '',
				menuButtonTop: '',
				refresherTriggered :false,
				scrowHeight:'',
			}
		},
		onLoad(option) {
			let that = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			that.menuButtonHeight = menuButtonInfo.height;
			that.menuButtonTop = menuButtonInfo.top;
			that.loadscrowHeight();
			that.current = option.current;
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				that.getTaxiOrder();
			}
		},
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				that.getTaxiOrder();
			}
		},
		methods: {
			loadscrowHeight:function(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.scrowHeight=res.windowHeight-that.menuButtonHeight - 50 - that.menuButtonTop;//选项卡50，底部50
					}
				});
			},
			refresherRefresh:function(){
				let that = this;
				that.refresherTriggered = true;
				that.getTaxiOrder();
			},
			back: function() {
				uni.navigateBack({});
			},
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			tabclick: function(e) {
				this.current = e;
			},
			show: function(el) {
				el.IsShow = !el.IsShow
			},
			getTaxiOrder: function() {
				let that = this;
				uni.stopPullDownRefresh();
				uni.request({
					url: that.$taxi.Interface.getOrdersDriver.value,
					method: that.$taxi.Interface.getOrdersDriver.method,
					data: {
						driverId: that.userInfo.driverId,
					},
					success: function(res) {
						uni.hideLoading();
						let data = res.data.data;
						console.log(data);
						if (res.data.code===200) {
							that.orderArr = [];
							that.orderArr = data;
						
							that.underwayArr = that.orderArr.filter(x => {
								return x.state === 'received' || x.state === 'departure' || x.state === 'passenger' || x.state === 'setout'
							});
							that.finishedArr = that.orderArr.filter(x => {
								return x.state === 'arrive';
							});
							that.cancleArr = that.orderArr.filter(x => {
								return x.state === 'cancle';
							}); 
							that.refresherTriggered = false;
						}
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},

			//详情
			toDetail: function(item) {
				let that = this;
				if (item.state === 'received' || item.state === 'departure' || item.state === 'passenger' || item.state === 'setout') {
					uni.navigateTo({
						url: '../driverOperation/confirmgetonCar?orderNumber=' + item.id
					});
				} else {
					uni.navigateTo({
						url: './orderDetail?orderNumber=' + item.id
					});
				}
			},
			//联系乘客
			toCallPassenger: function(item) {
				let that = this;
				if (item.volunteer.tel === null) {
					that.showToast('获取手机号出错');
					return;
				}
				uni.makePhoneCall({
					phoneNumber: item.volunteer.tel
				});
			},
			toArrive:function(item){
				let that = this;
				uni.navigateTo({
					url:'../driverOperation/orderComplete?orderNumber=' + item.id
				});
			},
			/* toArrive: function(item) {
				//到达
				let that = this;
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				uni.request({
					url:that.$taxi.Interface.terminus.value,
					method:that.$taxi.Interface.terminus.method,
					data:{
						orderId:item.id
					},
					success:function(res){
						uni.hideLoading();
						if (res.data.code===200) {
							that.showToast('到达成功');
							Voice('目的地已到达，请携带好您的随身物品。');
							Voice('The destination has arrived. Please take your belongings with you.');
							setTimeout(function(){
								that.getTaxiOrder();
							},1500);
						}else{
							that.getTaxiOrder();
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				});
			}, */

			toDepart: function(item) {
				//发车
				let that = this;
				uni.showLoading({
					mask: true,
					title:'加载中'
				});
				uni.request({
					url:that.$taxi.Interface.driverLeaves.value,
					method:that.$taxi.Interface.driverLeaves.method,
					data:{
						orderId:item.id
					},
					success:function(res){
						uni.hideLoading();
						if (res.data.code===200) {
							that.showToast('发车成功');
							setTimeout(function(){
								uni.navigateTo({
									url: '/pages/driver/driverOperation/confirmgetonCar?orderNumber=' + item.id,
								});
							},1500);
						}
					},
					fail:function(res){
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				});
			},
			
			formatState:function(state){
				if(state === 'examine'){
					//调度员审核
					return '待审核'
				}else if(state === 'waiting'){
					//待接单
					return '待接单'
				}else if(state === 'received'){
					//已接单
					return '已接单'
				}else if(state === 'departure'){
					//到达出发地
					return '待上车'
				}else if(state === 'passenger'){
					//接到乘客
					return '进行中'
				}else if(state === 'setout'){
					//出发
					return '已出发' 
				}else if(state === 'arrive'){
					//到达
					return '已到达'
				}else if(state === 'refuse'){
					//拒接
					return '已拒接'
				}else if(state === 'fault'){
					//故障
					return '故障'
				}else if(state === 'fail'){
					//审核未通过
					return '未通过'
				}
			},
			//时间差值计算
			costTime:function(startTime,endTime){
				var ret = '';
				if(startTime !== null && endTime !== null){
					var start = new Date(startTime).getTime();//开始
					var end = new Date(endTime).getTime();
					var diff = end - start; //时间毫秒差
					if(diff > 0){
						var m = Math.ceil(diff / 1000 / 60); //分钟 向前取整
						ret = m + '分钟'
						if(m > 60){
							var h = Math.floor(m / 60);//小时 向后取整
							var remainder = m % 60 ;
							ret = h + '小时' + remainder + '分钟'
						}
					}
				}
				return ret;
			}
		}
	}
</script>

<style>
	page {
		background-color: #F6F8FE;
	}

	.tab {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 32rpx;
		padding: 0 20rpx 20rpx 20rpx;
	}

	.tabactive {
		border-bottom: solid 1px #FC4646;
		color: #FC4646;
	}

	.booktime {
		width: 375rpx;
		background-color: #06B4FD;
		color: #FFF;
		font-size: 24rpx;
		height: 48rpx;
		border-radius: 24rpx;
		text-align: center;
		line-height: 48rpx;
	}

	.order {
		background-color: #FFF;
		margin-top: 20rpx;
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		border-radius: 20rpx;
	}

	.ordertitle {
		font-size: 36rpx;
		padding-left: 5rpx;
		font-family: Source Han Sans SC;
		font-weight: bold;
		color: rgba(44, 45, 45, 1);
		line-height: 42rpx;
	}

	.orderstatus {
		font-size: 30rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: rgba(51, 51, 51, 1);
		line-height: 50rpx;
		
	}
	
	.statusWidth{
		width: 100rpx;
		margin-left: 10rpx;
	}

	.btnarea {
		display: flex;
		justify-content: flex-end;
		padding-top: 40rpx;
		flex-wrap: nowrap
	}

	.btnarea view {
		padding-left: 20rpx;
	}

	.btnarea button {
		background-color: #FFF;
		font-size: 32rpx;
		color: #333333;
		width: 140rpx;
	}

	.one {
		width: 150rpx;
		height: 80rpx;
		background: rgba(255, 255, 255, 1);
		box-shadow: 0px 6px 20px 0px rgba(231, 231, 231, 0.53);
		/*相对位置*/
		position: absolute;
		bottom: -95rpx;
		z-index: 555;
		text-align: center;
		font-size: 32rpx;
		color: #333333;
		line-height: 80rpx;
	}

	.one0 {
		width: 0;
		height: 0;
		border: 20rpx solid white;
		border-top: none;
		border-right-color: transparent;
		border-left-color: transparent;
		/*绝对位置*/
		position: absolute;
		top: -20rpx;
		left: 40rpx;
	}

	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		box-sizing: content-box;
	}
</style>
