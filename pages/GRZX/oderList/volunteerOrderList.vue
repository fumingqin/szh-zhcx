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
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==4?'tabactive':''" @click="tabclick(4)">待审核</view>
					<view style="height: 55rpx;font-weight: bold;color: #2C2D2;" :class="current==5?'tabactive':''" @click="tabclick(5)">已审核</view>
				</view>
			</view>
			<scroll-view v-bind:style="{height:scrowHeight+'px'}" scroll-y=true refresher-enabled=true @refresherrefresh="refreshClick"
			 :refresher-triggered="triggered">

				<!--全部-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==0">
					<view v-for="(item,index) in orderArr" :key="index">
						<!-- 志愿者开始 -->
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 60rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
										<view v-if="item.orderState == '未通过'" style="margin-top: 10rpx;">未通过原因：{{item.reason}}</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<view style="display: flex;">
												<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;margin-right: 20rpx;" type="default">扫码验证</button>
												<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
											</view>
										</view>
										<view v-if="item.orderState == '已上车'">
											<button @click="confirmGetToDestination(item)" style="background-color: #FC4646;color: #FFF;width: auto;"
											 type="default">确认到达</button>
										</view>
										<view v-if="item.orderState == '审核中'">
											<button @click="examine(item)" style="width: auto;" type="default">审核</button>
										</view>
										<view v-if="item.orderState == '审核中'||item.orderState == '待派单'">
											<button @click="cancelOrder(item.id)" style="width: auto;" type="default">取消订单</button>
										</view>
									</view>
									<!-- <view class="btnarea">
										<view v-if="item.orderState == '待上车'">
											<button @click="confirmgetonCar(item)" style="width: auto;" type="default">确认上车</button>
										</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '接到乘客'">
											<button @click="confirmGetToDestination(item)" style="width: auto;" type="default">确认到达</button>
										</view>
									</view> -->
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
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;" type="default">扫码验证</button>
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '已上车'">
											<button @click="confirmGetToDestination(item)" style="background-color: #FC4646;color: #FFF;width: auto;"
											 type="default">确认到达</button>
										</view>
										<view v-if="item.orderState == '审核中'">
											<button @click="examine(item)" style="width: auto;" type="default">审核</button>
										</view>
										<view v-if="item.orderState == '审核中'||item.orderState == '待派单'">
											<button @click="cancelOrder(item.id)" style="width: auto;" type="default">取消订单</button>
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
						<view style="margin-top: 20rpx;">
							<view class="booktime" v-if="item.orderType == '预约'">
								预约日期：{{formatTime(item.appointmentTime)}}
							</view>
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;" type="default">扫码验证</button>
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '已上车'">
											<button @click="confirmGetToDestination(item)" style="background-color: #FC4646;color: #FFF;width: auto;"
											 type="default">确认到达</button>
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
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;" type="default">扫码验证</button>
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '已上车'">
											<button @click="confirmGetToDestination(item)" style="background-color: #FC4646;color: #FFF;width: auto;"
											 type="default">确认到达</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
				<!--待审核-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==4">
					<view v-for="(item,index) in unexamineArr" :key="index">
						<!-- 志愿者开始 -->
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;" type="default">扫码验证</button>
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '审核中'">
											<button @click="examine(item)" style="width: auto;" type="default">审核</button>
										</view>
										<view v-if="item.orderState == '审核中'||item.orderState == '待派单'">
											<button @click="cancelOrder(item.id)" style="width: auto;" type="default">取消订单</button>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 志愿者结束 -->
					</view>
				</view>
				<!--已审核-->
				<view style="padding: 10rpx 0; margin-top: 50rpx;" v-if="current==5">
					<view v-for="(item,index) in examineArr" :key="index">
						<!-- 志愿者开始 -->
						<view style="margin-top: 20rpx;">
							<view class="order">
								<view style="padding: 35rpx 30rpx;">
									<view style="display: flex;justify-content: space-between;align-items: center;">
										<view style="display: flex;align-items: center;">
											<image src="@/static/driver/Car.png" style="width: 50rpx;" mode="widthFix"></image>
											<view class="ordertitle">{{item.title}}</view>
										</view>
										<view class="orderstatus stateClass">{{item.orderState}}</view>
									</view>
									<view style="padding-left: 45rpx;padding-top: 10rpx;" class="orderstatus">
										<view style="margin-top: 10rpx;">上车点：{{item.startAddress}}</view>
										<view style="margin-top: 10rpx;">目的地：{{item.endAddress}}</view>
										<!-- <view style="margin-top: 10rpx;">下单时间：{{formatTime(item.orderTime)}}</view> -->
										<view style="margin-top: 10rpx;">出发时间：{{formatTime(item.runTime)}}</view>
										<view style="margin-top: 10rpx;">乘车人数：{{formatTime(item.peoperNumber)}}人</view>
									</view>
									<view class="btnarea">
										<view v-if="item.orderState == '已接单'||item.orderState == '待上车'||item.orderState == '已上车'||item.orderState == '司机出发' ||item.orderState == '已完成'">
											<button @click="toDetail(item)" style="width: auto;" type="default">详情</button>
										</view>
										<view v-if="item.orderState == '待上车'">
											<button @click="scan(item)" style="width: auto;background-color: #55aaff;color: #FFF;" type="default">扫码验证</button>
											<button @click="confirmgetonCar(item)" style="width: auto;background-color: #FC4646;color: #FFF;" type="default">确认上车</button>
										</view>
										<view v-if="item.orderState == '已上车'">
											<button @click="confirmGetToDestination(item)" style="background-color: #FC4646;color: #FFF;width: auto;"
											 type="default">确认到达</button>
										</view>
										<view v-if="item.orderState == '审核中'||item.orderState == '待派单'">
											<button @click="cancelOrder(item.id)" style="width: auto;" type="default">取消订单</button>
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
	import $taxi from '@/common/Czc.js';
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
				unexamineArr: [], //待审核
				examineArr: [], //已审核
				userInfo: '',
				menuButtonHeight: '',
				menuButtonTop: '',
				scrowHeight: '', //scroll-view的高度法
				triggered: false,
				timeId: 0, //定时器的id
			}
		},
		onLoad(options) {
			let that = this;
			let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			that.menuButtonHeight = menuButtonInfo.height;
			that.menuButtonTop = menuButtonInfo.top;
			that.loadscrowHeight();
			that.current = options.current;
		},
		onUnload() {
			if (this.timeId != 0) {
				clearInterval(this.timeId); //清除定时器
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
				that.getVolunteerOrder();
				//开启定时器
				if (that.timeId == 0) {
					that.timeId = setInterval(function() {
						that.getVolunteerOrder();
					}, 10000);
				}
			}
		},
		// --------------------------下拉刷新----------------------------
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					title: '加载订单中...',
				});
				that.getVolunteerOrder();
			}
		},
		methods: {
			//--------------------加载scroll-view的高度--------------------------
			loadscrowHeight: function() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						that.scrowHeight = res.windowHeight - 50 - that.menuButtonHeight - that.menuButtonTop;
					}
				});
			},
			//---------------------------返回上一页--------------------------
			back: function() {
				uni.navigateBack();
			},
			//--------------------showToast--------------------------
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			//--------------------切换tab--------------------------
			tabclick: function(e) {
				this.current = e;
			},
			show: function(el) {
				el.IsShow = !el.IsShow
			},
			//--------------------获取订单--------------------------
			getVolunteerOrder: function() {
				let that = this;
				that.orderArr = [];
				that.underwayArr = [];
				that.finishedArr = [];
				that.cancleArr = [];
				that.unexamineArr = [];
				that.examineArr = [];
				// console.log(that.userInfo.volunteerId, 'id')
				uni.stopPullDownRefresh();
				uni.request({
					url: that.$Grzx.Interface.getOrders.value,
					method: that.$Grzx.Interface.getOrders.method,
					data: {
						volunteerId: that.userInfo.volunteerId,
					},
					success(res) {
						uni.hideLoading();
						that.triggered = false; //触发onRestore，并关闭刷新图标
						that._freshing = false;
						console.log(res,'订单数据')
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
										reason: item.failReason, //未通过原因
										passengers:item.passengers,//乘车人信息
									};
									that.orderArr.push(obj);
								} else if (item.state == "waiting" && item.peoperNumber > 0 && item.parentId == null) {
									//显示父订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: '待派单', //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
										passengers:item.passengers,//乘车人信息
									};
									that.orderArr.push(obj);
								} else if (item.parentId != null) {
									//显示子订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: that.formatState(item.state), //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
										passengers:item.passengers,//乘车人信息
									};
									that.orderArr.push(obj);
								}else if (item.parentId == null&&item.state=='cancel') {
									//显示已取消的订单
									obj = {
										id: item.id, //订单ID
										title: item.line.name, //线路名称
										runTime: item.orderTime, //出发时间
										endAddress: item.line.endName, //目的地
										startAddress: item.line.startName, //出发点
										orderState: that.formatState(item.state), //订单状态
										state: item.state, //订单状态
										peoperNumber: item.peoperNumber, //乘车人数
										passengers:item.passengers,//乘车人信息
									};
									that.orderArr.push(obj);
								}
							};
							// console.log(that.orderArr)
							that.underwayArr = that.orderArr.filter(x => {
								return x.orderState != '已完成' && x.orderState != '已取消' && x.orderState != '未通过';
							});
							that.finishedArr = that.orderArr.filter(x => {
								return x.orderState == '已完成';
							});
							that.cancleArr = that.orderArr.filter(x => {
								return x.orderState == '已取消';
							});
							that.unexamineArr = that.orderArr.filter(x => {
								return x.orderState == '审核中';
							});
							that.examineArr = that.orderArr.filter(x => {
								return x.orderState == '待派单';
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

			//--------------------详情按钮--------------------------
			toDetail: function(item) {
				if (this.timeId != 0) {
					clearInterval(this.timeId); //清除定时器
				}
				uni.navigateTo({
					url: './OrderDetail?orderNumber=' + item.id,
				});
			},
			//--------------------订单审核--------------------------
			examine: function() {
				uni.navigateTo({
					url: '../../Volunteer/examineOrder',
				});
			},
			//--------------------订单取消--------------------------
			cancelOrder: function(orderNumber) { //取消订单
				let that = this;
				// console.log(orderNumber)
				uni.showModal({
					content: "您确定要取消订单吗",
					success(res) {
						if (res.confirm) {
							uni.request({
								url: that.$volunteer.Interface.cancelorder.value,
								method: that.$volunteer.Interface.cancelorder.method,
								data: {
									orderId: orderNumber,
								},
								success(res) {
									// console.log(res)
									if (res.data.code == 200) {
										uni.showToast({
											title: "取消成功",
											icon: "none"
										})
										setTimeout(function() {
											uni.startPullDownRefresh();
										}, 1000)
									}
								},
								fail() {
									uni.showToast({
										title: "网络连接失败",
										icon: "none"
									})
								}
							})
						}
					}
				})
			},

			//--------------------订单状态格式化--------------------------
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
						return '待上车';
						break;
					case 'refuse':
						return '待接单'; //拒接
						break;
					case 'fault':
						return '故障';
						break;
					case 'fail':
						return '未通过';
						break;
					case 'cancel':
						return '已取消';
						break;
					default:
						return '';
				}
			},
			//--------------------时间格式化------------------------------
			formatTime: function(time) {
				// var dateTime = time.replace('T', ' ');
				// if (dateTime.indexOf('1900') > -1) {
				// 	return '';
				// } else {
				// 	return dateTime;
				// }
				return time;
			},
			//-------------------扫码验证------------------------------
			scan: function(item) {
				let that = this;
				console.log(item);
				console.log(item.passengers);
				uni.scanCode({
					success: function(res) {
						if (item.passengers.indexOf(res.result) > -1) {
							Voice('通过');
							uni.showToast({
								title: '验证通过',
								icon: 'none',
								duration: 2000,
								mask: true
							});
						} else {
							uni.showToast({
								title: '验证不通过',
								icon: 'none',
								duration: 2000,
								mask: true
							});
							// that.showToast('不通过');
						}
					},
					fail: function(res) {

					}
				});
			},
			//-------------------确认乘客上车------------------------------
			confirmgetonCar: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				uni.request({
					url: $taxi.Interface.confirmBoarding.value,
					method: $taxi.Interface.confirmBoarding.method,
					data: {
						orderId: item.id
					},
					success: function(res) {
						uni.hideLoading();
						let data = res.data.data;
						uni.startPullDownRefresh(); //刷新订单列表
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			//-------------------确认到达目的地-----------------------------
			confirmGetToDestination: function(item) {
				let that = this;
				uni.showLoading({
					mask: true
				});
				uni.request({
					url: $taxi.Interface.terminus.value,
					method: $taxi.Interface.terminus.method,
					data: {
						orderId: item.id
					},
					success: function(res) {
						uni.hideLoading();
						uni.startPullDownRefresh(); //刷新订单列表
					},
					fail: function(res) {
						uni.hideLoading();
						that.showToast('网络连接失败');
					}
				})
			},
			//---------------------------scroll-view下拉刷新---------------------
			refreshClick: function() {
				if (!this.triggered) { //界面下拉触发，triggered可能不是true，要设为true
					this.triggered = true;
					uni.showLoading({
						title: '加载订单中...',
					});
					this.getVolunteerOrder();
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

	.stateClass {
		width: 140rpx;
		margin-left: 10rpx;
		text-align: center;
	}
</style>
