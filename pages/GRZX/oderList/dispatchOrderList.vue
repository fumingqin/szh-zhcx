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
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==1?'tabactive':''" @click="tabclick(1)">待审核</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==2?'tabactive':''" @click="tabclick(2)">待派单</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==3?'tabactive':''" @click="tabclick(3)">已处理</view>
				</view>
			</view>
			<scroll-view v-bind:style="{height:scrowHeight+'px'}" scroll-y=true refresher-enabled=true @refresherrefresh="refreshClick"
			 :refresher-triggered="triggered">
				<!--全部-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
					<view v-for="(item,index) in orderArr" :key="index">
						<!-- 派单员开始 -->
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 60rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState != '待审核'||item.orderState != '待派单'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待审核'">
											<button @click="checkOrder(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">前往审核</button>
										</view>
										<view v-if="item.orderState == '待派单'">
											<button @click="dispatchOrder(item)" style="background-color: #FC4646;color: #FFF;width: auto;" type="default">前往派单</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 派单员结束 -->
					</view>
				</view>
				<!--待审核-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==1">
					<view v-for="(item,index) in examineArr" :key="index">
						<!-- 派单员开始 -->
						<view style="margin-top: 20rpx;">
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
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '待审核'">
											<button @click="checkOrder(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">前往审核</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 派单员结束 -->
					</view>
				</view>

				<!--待派单-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==2">
					<view v-for="(item,index) in distributeArr" :key="index">
						<!-- 派单员开始 -->
						<view style="margin-top: 20rpx;">
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
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '待派单'">
											<button @click="dispatchOrder(item)" style="background-color: #FC4646;color: #FFF;width: auto;" type="default">前往派单</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 派单员结束 -->
					</view>
				</view>
				<!--已处理-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==3">
					<view v-for="(item,index) in finishedArr" :key="index">
						<!-- 派单员开始 -->
						<view style="margin-top: 20rpx;">
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
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState != '待审核'||item.orderState != '待派单'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 派单员结束 -->
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
				examineArr: [], //待审核
				distributeArr: [], //待派单
				finishedArr: [], //已处理
				userInfo: '',
				menuButtonHeight: '',
				menuButtonTop: '',
				scrowHeight: '', //scroll-view的高度法
				triggered: false,

				timeId: 0, //定时器id
			}
		},
		onLoad(options) {
			let that = this;
			that.loadscrowHeight();
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			that.menuButtonHeight = menuButtonInfo.height;
			that.menuButtonTop = menuButtonInfo.top;
			that.current = options.current;
			console.log(that.current)
		},
		onUnload() {
			if (this.timeId != 0) {
				this.clearInterval(this.timeId); //清除定时器
			}
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.showToast('请先登录');
			} else {
				uni.showLoading({
					title: '加载订单中...',
				});
				that.getOrderList(); //第一次加载订单
				that.startTimeout(); //开启定时器
			}
		},
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					title: '加载订单中...',
				});
				that.getOrderList();
			}
		},
		methods: {
			//----------------加载scroll-view的高度--------------------
			loadscrowHeight: function() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						that.scrowHeight = res.windowHeight - 100 - that.menuButtonHeight - that.menuButtonTop;
					}
				});
			},
			//----------------返回--------------------
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
			//--------------------------获取订单列表-------------------------
			getOrderList: function() {
				let that = this;
				that.orderArr = [];
				that.examineArr = [];
				that.distributeArr = [];
				that.finishedArr = [];
				console.log(that.userInfo.volunteerId, 'id')
				uni.stopPullDownRefresh();
				uni.request({
					url: that.$Grzx.Interface.getOrders.value,
					method: that.$Grzx.Interface.getOrders.method,
					data: {
						// volunteerId:that.userInfo.volunteerId,
						volunteerId: 1,
					},
					success(res) {
						uni.hideLoading();
						that.triggered = false; //触发onRestore，并关闭刷新图标
						that._freshing = false;
						console.log(res)
						if (res.data.code == 200) {
							var obj = new Object();
							for (let item of res.data.data) {
								if ((item.state == "examine" || item.state == "fail") && item.parentId == null) {
									//显示父订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										//orderTime: item.createTime, //订单时间
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: that.formatState(item.state), //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
									};
									that.orderArr.push(obj);
								} else if (item.state == "waiting" && item.peoperNumber > 0 && item.parentId == null) {
									//显示父订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										//orderTime: item.createTime, //订单时间
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: '待派单', //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
									};
									that.orderArr.push(obj);
								} else if (item.parentId != null) {
									//显示子订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										//orderTime: item.createTime, //订单时间
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: that.formatState(item.state), //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
									};
									that.orderArr.push(obj);
								}
							};
							console.log(that.orderArr)
							//----------------待审核----------------
							that.examineArr = that.orderArr.filter(x => {
								return x.orderState == '待审核';
							});
							//----------------待派单----------------
							that.distributeArr = that.orderArr.filter(x => {
								return x.orderState == '待派单';
							});
							//----------------已处理----------------
							that.finishedArr = that.orderArr.filter(x => {
								return x.orderState != '待审核' && x.orderState != '待派单';
							});
						} else {
							that.showToast('获取订单失败');
						}
					},
					fail: function(err) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},

			//-----------------------详情----------------------------
			toDetail: function(item) {
				console.log(item.id)
				uni.navigateTo({
					url: './OrderDetail?orderNumber=' + item.id,
				});
			},

			//----------------- 订单状态格式化------------------------
			formatState: function(state) {
				switch (state) {
					case 'arrive':
						return '已完成';
						break;
					case 'examine':
						return '审核中';
						break;
					case 'waiting':
						return '待接单';
						break;
					case 'received':
						return '已接单';
						break;
					case 'setout':
						return '司机出发';
						break;
					case 'passenger':
						return '已上车';
						break;
					case 'departure':
						return '到达出发地';
						break;
					case 'refuse':
						return '待接单';
						break;
					case 'fault':
						return '故障';
						break;
					case 'fail':
						return '审核未通过';
						break;
					case 'cancel':
						return '已取消';
						break;
					default:
						return '';
				}
			},
			// -------------------时间格式化--------------------------
			formatTime: function(time) {
				return time;
			},
			//----------------------前往审核订单-----------------------
			checkOrder: function(item) {

			},
			//----------------------前往派单--------------------------
			dispatchOrder: function(item) {

			},
			//--------------scroll-view下拉刷新-----------------------
			refreshClick: function() {
				if (!this.triggered) { //界面下拉触发，triggered可能不是true，要设为true
					this.triggered = true;
					uni.showLoading({
						title: '加载订单中...',
					});
					this.getOrderList();
				}
			},
			//---------------------开启定时器---------------------------
			startTimeout: function() {
				var that = this;
				if (that.timeId == 0) {
					that.timeId = setInterval(function() {
						that.getOrderList();
					}, 10000);
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
		padding-left: 22rpx;
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
