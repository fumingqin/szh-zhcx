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
			<view style="position: fixed;left: 30rpx;right: 30rpx;z-index: 9999;background-color: #F6F8FE;" :style="{top:menuButtonHeight}">
				<view class="tab">
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==0?'tabactive':''" @click="tabclick(0)">全部</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">进行中</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">已完成</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">已取消</view>
				</view>
			</view>
			<scroll-view style="height: 1100rpx;" scroll-y=true refresher-enabled=true>

				<!--全部-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
					<view v-for="(item,index) in orderArr" :key="index">
						<!-- 志愿者开始 -->
						<view v-if="item.title == '志愿者'" style="margin-top: 20rpx;">
							<view class="booktime" v-if="item.orderType == '预约'">
								预约日期：{{taxiFormatTime(item.appointmentTime)}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.orderNumber}}</view>
										<view style="display: flex;justify-content: space-between;">
											<view>
												客户类型：{{taxiFormatUserType(item.userType)}}
											</view>
											<view v-if="item.state == 6" style="padding-left: 40rpx;">
												￥{{item.factPayPrice}}
											</view>
										</view>
										<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
										<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
										<view>上车点：{{item.startAddress}}</view>
										<view>目的地：{{item.endAddress}}</view>
									</view>
									<view class="btnarea">
										<view v-if="item.state==1 || item.state==2">
											<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
										</view>

										<view v-if="item.state != 1">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
										<view v-if="item.state == 1">
											<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
										</view>
										<!-- <view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view> -->
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
				<!--进行中-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
					<view v-for="(item,index) in underwayArr" :key="index">
						<!-- 志愿者开始 -->
						<view v-if="item.title == '志愿者'" style="margin-top: 20rpx;">
							<view class="booktime" v-if="item.orderType == '预约'">
								预约日期：{{taxiFormatTime(item.appointmentTime)}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus">{{item.orderState}}</view>

									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.orderNumber}}</view>
										<view style="display: flex;justify-content: space-between;">
											<view>
												客户类型：{{taxiFormatUserType(item.userType)}}
											</view>
											<view v-if="item.state == 6" style="padding-left: 40rpx;">
												￥{{item.factPrice}}
											</view>
										</view>
										<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
										<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
										<view>上车点：{{item.startAddress}}</view>
										<view>目的地：{{item.endAddress}}</view>
									</view>
									<view class="btnarea">
										<view v-if="item.state==1 || item.state==2">
											<button @click="toCallPassenger(item)" style="width: auto;">联系乘客</button>
										</view>

										<view v-if="item.state != 1">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
										<view v-if="item.state == 1">
											<button @click="toDepart(item)" style="background-color: #FC4646;color: #FFF;width: auto;">发车</button>
										</view>
										<!-- <view v-if="item.state == 4">
										<button @click="toArrive(item)" style="background-color: #FC4646;color: #FFF;width: auto;">到达</button>
									</view> -->
										<view v-if="item.state == 4">
											<button @click="toInputPrice(item)" style="background-color: #FC4646;color: #FFF;width: auto;">输入价格</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
				<!--已完成-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
					<view v-for="(item,index) in finishedArr" :key="index">
						<!-- 志愿者开始 -->
						<view v-if="item.title == '志愿者'" style="margin-top: 20rpx;">
							<view class="booktime" v-if="item.orderType == '预约'">
								预约日期：{{taxiFormatTime(item.appointmentTime)}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus">{{item.orderState}}</view>

									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.orderNumber}}</view>
										<view style="display: flex;justify-content: space-between;">
											<view>
												客户类型：{{taxiFormatUserType(item.userType)}}
											</view>
											<view v-if="item.state == 6" style="padding-left: 40rpx;">
												￥{{item.factPayPrice}}
											</view>
										</view>
										<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
										<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
										<view>上车点：{{item.startAddress}}</view>
										<view>目的地：{{item.endAddress}}</view>
									</view>
									<view class="btnarea">
										<view v-if="item.state != 1">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
				<!--已取消-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==3">
					<view v-for="(item,index) in cancleArr" :key="index">
						<!-- 志愿者开始 -->
						<view v-if="item.title == '志愿者'" style="margin-top: 20rpx;">
							<view class="booktime" v-if="item.orderType == '预约'">
								预约日期：{{taxiFormatTime(item.appointmentTime)}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus">{{item.orderState}}</view>

									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view>订单号：{{item.orderNumber}}</view>
										<view style="display: flex;justify-content: space-between;">
											<view>
												客户类型：{{taxiFormatUserType(item.userType)}}
											</view>
										</view>
										<view>下单时间：{{taxiFormatTime(item.orderTime)}}</view>
										<view>出发时间：{{taxiFormatTime(item.runTime)}}</view>
										<view>上车点：{{item.startAddress}}</view>
										<view>目的地：{{item.endAddress}}</view>

									</view>
									<view class="btnarea">
										<view v-if="item.state != 1">
											<button @click="toDetail(item)" style="width: auto;">详情</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import uniTransition from '@/components/uni-transition/uni-transition.vue';
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
				menuButtonTop: ''
			}
		},
		onLoad() {
			let that = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			that.menuButtonHeight = menuButtonInfo.height;
			that.menuButtonTop = menuButtonInfo.top;
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				uni.showLoading({
					mask: true
				});
				that.getTaxiOrder();
			}
		},
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					mask: true
				});
				that.getTaxiOrder();
			}
		},
		methods: {
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
					url: that.$order.Interface.GetExpressOrderByDriverID_Driver.value,
					method: that.$order.Interface.GetExpressOrderByDriverID_Driver.method,
					data: {
						driverId: that.userInfo.driverId,
						state: -1
					},
					success: function(res) {
						uni.hideLoading();
						if (res.data.status) {
							that.orderArr = [];
							for (let item of res.data.data) {
								var obj = {
									title: '出租车',
									orderType: item.orderType, //实时/预约
									orderTime: item.orderTime,
									appointmentTime: item.appointmentTime, //预约时间
									userType: item.userType, //用户类型：普通/会员
									runTime: item.runTime, //出发时间
									endAddress: item.endAddress,
									startAddress: item.startAddress,
									orderState: that.taxiFormatState(item.state),
									factPrice: item.factPrice,
									factPayPrice: item.factPayPrice,
									orderNumber: item.orderNumber,
									state: item.state,
									passengersPhone: item.passengersPhone
								};
								that.orderArr.push(obj);
							};
							that.underwayArr = that.orderArr.filter(x => {
								return x.orderState == '进行中';
							});
							that.finishedArr = that.orderArr.filter(x => {
								return x.orderState == '已完成';
							});
							that.cancleArr = that.orderArr.filter(x => {
								return x.orderState == '已取消';
							});
						} else {
							that.showToast(res.data.msg);
						}
					},
					fail: function(res) {
						//console.log(res);
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
		
			//详情
			toDetail: function(item) {
				let that = this;
				if (item.state == 0 || item.state == 1 || item.state == 2 || item.state == 3 || item.state == 4) {
					uni.navigateTo({
						url: '../driverOperation/confirmgetonCar?orderNumber=' + item.orderNumber
					});
				} else {
					uni.navigateTo({
						url: './orderDetail?orderNumber=' + item.orderNumber
					});
				}
			},
			//联系乘客
			toCallPassenger: function(item) {
				let that = this;
				if (item.passengersPhone == null) {
					that.showToast('获取手机号出错');
					return;
				}
				uni.makePhoneCall({
					phoneNumber: item.passengersPhone
				});
			},
			//到达
			toArrive: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				let url = '';
				let method = '';
				let data = '';
				url = that.$taxi.Interface.FinishExpressOrder_Driver.value;
				method = that.$taxi.Interface.FinishExpressOrder_Driver.method;
				data = {
					orderNumber: item.orderNumber
				};
				that.taxiRequest(url, method, data).then(res => {
					if (res.data.status) {
						that.showToast('到达成功');
						uni.navigateTo({
							url: '/pages/driver/otherExpenses?orderNumber=' + item.orderNumber,
						})
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					that.showToast('网络连接失败');
				});
			},
			
		
			//发车
			toDepart: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				let url = '';
				let method = '';
				let data = '';
				url = that.$taxi.Interface.SetoutExpressOrder_Driver.value;
				method = that.$taxi.Interface.SetoutExpressOrder_Driver.method;
				data = {
					orderNumber: item.orderNumber
				};
		
				that.taxiRequest(url, method, data).then(res => {
					//成功回调
					if (res.data.status) {
						uni.navigateTo({
							url: '../driver/confirmgetonCar?orderNumber=' + item.orderNumber
						});
					} else {
						that.showToast(res.data.msg);
					}
				}).catch(rej => {
					//失败回调
					that.showToast('网络连接失败');
				});
			},
			//出租车、专线车出发按钮
			taxiRequest: function(url, method, data) {
				return new Promise((resolve, reject) => {
					uni.request({
						url: url,
						method: method,
						data: data,
						success: function(res) {
							uni.hideLoading();
							resolve(res);
						},
						fail: function(res) {
							uni.hideLoading();
							reject(res);
						}
					})
				});
			},
		
			// 出租车格式化
			taxiFormatState: function(state) {
				if (state == 6) {
					return '已完成';
				} else if (state == 0 || state == 1 || state == 2 || state == 3 || state == 4 || state == 5 || state == 9) {
					return '进行中';
				} else if (state == 8) {
					return '已取消';
				} else {
					return '';
				}
			},
			taxiFormatUserType: function(userType) {
				if (userType == 0) {
					return '普通用户';
				} else if (userType == 1) {
					return '普通会员';
				} else if (userType == 2) {
					return '超级会员';
				} else if (userType == 3) {
					return '其他用户';
				} else if (userType == 9) {
					return '体验会员';
				}
			},
			taxiFormatTime: function(time) {
				var dateTime = time.replace('T', ' ');
				if (dateTime.indexOf('1900') > -1) {
					return '';
				} else {
					return dateTime;
				}
			},
		}
	}
</script>

<style lang="scss">
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
