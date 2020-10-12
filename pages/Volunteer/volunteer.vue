<template>
	<view>
		<view style="position: relative;">
			<image :src="volunteerImg" style="width: 750rpx;height: 400rpx;"></image>
			<view style="position: fixed;top: 56rpx;left: 20rpx; z-index: 99999;" @click="toPersonal">
				<uni-icons type="contact" size="34"></uni-icons>
			</view>
		</view>
		<view style="margin-top: -80rpx;z-index: 1;position: relative;">
			<view style=" margin: 0 20rpx;padding: 50rpx;background-color: #FFFFFF;border-radius: 20rpx; height: 880rpx;">
				<scroll-view style="height: 880rpx;" :scroll-y='true' v-if="nextOperation==0">
					<view >
						<view>
							<view>
								<text class="titleFont">起点</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
								<text @click="startStationTap" v-model="startSiteName" class="contentFont">{{startSiteName}}</text>
							</view>
						</view>

						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">终点</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
								<text @click="endStationTap" v-model="endSiteName" class="contentFont">{{endSiteName}}</text>
							</view>
						</view>

						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">出发时间</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
								<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}}</text>
							</view>
							<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true"
							 :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onCancle" />
						</view>

						<view v-if="estimateState==1">
							<view>
								<!-- <view style="padding-top: 20rpx ;">
									<text class="titleFont">预计里程和时间</text>
								</view> -->
								<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;">
									<text>预计里程:</text>
									<text style="color: #007AFF;">{{estimateMileage}}公里</text>
									<text style="margin-left: 20rpx;">预计时间:</text>
									<text style="color: #007AFF;">{{estimateTime}}分钟</text>
								</view>
							</view>
							<view style="display: flex;padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
								<view>
									<text>预计到达时间:</text>
								</view>
								<view style="margin-left: 30rpx;">
									<text style="color: #007AFF;">{{totalTime}}</text>
								</view>
							</view>
						</view>

						<view style="padding-top: 40rpx ;">
							<view style="margin-left: 100rpx;">
								<radio-group name="orderType">
									<label v-for="(item, index) in orderMode" :key="index" @click="radioClick(index)">
										<radio style="transform: scale(0.8);margin-left: 40rpx;" :value="orderType" :checked="index===orderType" />{{item.orderType}}
									</label>
								</radio-group>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">

							</view>
						</view>

						<view v-if="orderType==1">
							<view style="padding-top: 20rpx ;">
								<text style="color: #ff0000;">请在下面选择返程时间</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
								<text style="letter-spacing:1px" @click="onShowDatePicker1('datetime')">{{datestring1}}</text>
							</view>
							<mx-date-picker :show="showPicker1" :showSeconds="false" :type="type1" :value="value1" :show-tips="true"
							 :begin-text="'入住'" :end-text="'离店'" :show-seconds="true" @confirm="onSelected1" @cancel="onCancle1" />
						</view>

					</view>
				</scroll-view>
				<view v-if="nextOperation==0" style="margin-top: 100rpx;">
					<button @click="nextButton" style="background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));border-radius: 12rpx;">
						<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">下一步</text>
					</button>
				</view>
				<!-- ------------------下一步----------------------- -->
				<view v-if="nextOperation==1">
					<view>
						<text @click="backButton" style="font-size:34rpx;font-family:Source Han Sans SC;font-weight:400;color:#55aaff;">＜返回上一步</text>
					</view>

					<view>
						<view style="padding-top: 20rpx ;">
							<text class="titleFont">人数</text>
						</view>
						<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;">
							<input class="contentFont" v-model="people" type="number" />
							<text style="margin-left: 124rpx;">人</text>
						</view>
					</view>

					<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
						<text>是否允许拼车</text>
						<switch style="margin-left: 280rpx;" :checked="isCarpool" color="#00aa00" @change="switchChange" />
					</view>

					<view>
						<view style="padding-top: 20rpx ;">
							<text class="titleFont">乘车原因</text>
						</view>
						<view style="display: flex;flex-wrap: wrap;">
							<view v-for="(item,index) in byCarArr" :key='index' @click="thisReason(item)" style="margin-bottom: 15rpx;margin-right: 35rpx;padding: 10rpx;justify-content: flex-start;margin-top: 10rpx;">
								<text style="border-radius: 10rpx;border-width: 1px;border-style: solid;padding: 8rpx;background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));color: #ffffff;">{{item}}</text>
							</view>
						</view>
						<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;">
							<input class="contentFont" v-model="remark" placeholder="请选择或填写原因" />
						</view>
					</view>

					<view>
						<view style="padding-top: 20rpx ;">
							<text class="titleFont">乘车人信息</text>
						</view>
						<view style="display: flex;">
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;">
								<input v-model="passengerMessage" :disabled="true" class="contentFont" />
								<view style="margin-left: 106rpx;" @click="toAddMessage">
									<uni-icons type="plus" size="34"></uni-icons>
								</view>
							</view>
						</view>
					</view>

					<view style="margin-top: 40rpx;">
						<button @click="submit" style="background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));border-radius: 12rpx;">
							<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">提交</text>
						</button>
					</view>
				</view>

			</view>
		</view>
		<!-- 签名的弹窗 -->
		<uni-popup ref="centerPopup" type="center">
			<view style="font-size:40rpx;font-family:Source Han Sans SC;font-weight:400;color:#ffff00;">请手动写出清晰签名!</view>
			<view class="centerClass">
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
				 @touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
				<view style="display: flex;flex-direction: row;">
					<view @click='clearClick' class="clearClass">重置</view>
					<view @click='saveClick' class="saveClass">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue';
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	import utils from '@/components/Driver/shoyu-date/utils.filter.js';
	import {
		pathToBase64,
		base64ToPath
	} from '@/components/YDPD/pathTobase64/gsq-image-tools/image-tools/index.js';
	var content = null;
	var touchs = [];
	export default {
		components: {
			MxDatePicker,
			uniPopup
		},
		data() {
			return {
				orderMode: [{
						orderType: '单程'
					},
					{
						orderType: '往返'
					}
				],
				datestring: '',
				datestring1: '',
				date: '',//出发时间
				date1: '',//返程时间
				Week: '',
				Week1: '',
				value: '',
				value1: '',
				type: '',
				type1: '',
				showPicker: false,
				showPicker1: false,
				remark: '',
				passengerMessage: '',
				orderType: 1,
				startSiteName: '请选择起点',
				startLon: '',
				startLat: '',
				statusTip: '',
				isCarpool: false,
				endDefault: false,


				endSiteName: '请选择终点',
				endLon: '',
				endLat: '',
				mileage: 0,
				people: 0,
				userInfo: '',
				// vehicleInfo:null,
				seat: 0,
				volunteerImg: '',
				signImage: '',
				byCarArr: [
					'紧急用车',
					'临时任务',
					'赛场监督',
				],
				estimateTime: '', //预计时间单位分钟
				estimateMileage: '', //预计里程
				totalTime: '', //预计总时间
				estimateState: 0, //预估时间状态
				nextOperation: 0, //下一步操作
			}
		},
		onLoad() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			uni.removeStorageSync('passengers');
			that.getTodayDate();
			that.getTodayDate1();
			that.load();
			//获得Canvas的上下文
			content = uni.createCanvasContext('firstCanvas')
			//设置线的颜色
			content.setStrokeStyle("#000")
			//设置线的宽度
			content.setLineWidth(5)
			//设置线两端端点样式更加圆润
			content.setLineCap('round')
			//设置两条线连接处更加圆润
			content.setLineJoin('round')
			that.loadImg();
		},
		onShow() {
			var that = this;
			that.passengerMessage = uni.getStorageSync('passengers') || '';
			//监听事件,监听下个页面返回的值，预计时间赋值
			uni.$on('expectDuration', function(data) {
				// data即为传过来的值
				that.estimateTime = data.data;
				//清除监听，不清除会消耗资源
				uni.$off('expectDuration');
			});
			uni.$on('expectMileage', function(data) {
				// data即为传过来的值
				var num = parseFloat(data.data);
				if (data.data.indexOf(".") == -1) {
					that.estimateMileage = num;
				} else {
					that.estimateMileage = num.toFixed(1);
				}
				//清除监听，不清除会消耗资源
				uni.$off('expectMileage');
			});
			uni.getStorage({ //获取起点
				key: "StartPoint",
				success: function(res) {
					console.log(res);
					that.startSiteName = res.data;				
					uni.removeStorageSync('StartPoint');
				}
			});
			uni.getStorage({ //获取终点
				key: "EndPoint",
				success: function(res) {
					that.endSiteName = res.data;
				    uni.removeStorageSync('EndPoint');
				}
			});
			that.getTodayDate();
			that.getTodayDate1();
		},
		methods: {
			// ---------------------------加载图片----------------------------
			loadImg() {
				var that = this;
				uni.request({
					url: that.$volunteer.GetImage.url,
					data: {
						model: 10,
						companyid: '世中会',
						systemtype: 'XCX',
					},
					method: 'POST',
					success(res) {
						console.log(res);
						var image = res.data.data.filter(item => {
							return item.type == 'shizhonghui2';
						})
						that.volunteerImg = image[0].imageUrl;
					}
				})
			},
			//---------------------------------点击起点站---------------------------------
			startStationTap() {
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
					// data即为传过来的值，给上车点赋值
					that.startSiteName = data.data;
					//清除监听，不清除会消耗资源
					uni.$off('startstaionChange');
				});
				that.endSiteName = "请选择终点";
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url: '/pages/Volunteer/homeSattionPick?&station=' + 'qidian' + '&pointType=start',
					fail(res) {
						console.log(res)
					}
				})
			},
			//---------------------------------点击终点站---------------------------------
			endStationTap() {
				var that = this;
				console.log(that.startSiteName);
				if (that.startSiteName === '请选择起点') {
					that.showToast('请先选择起点');
				} else {
					//监听事件,监听下个页面返回的值，给下车点赋值
					uni.$on('endStaionChange', function(data) {
						// data即为传过来的值
						that.endSiteName = data.data;
						that.estimateState = 1; //选择完终点站才出现预计时间
						//清除监听，不清除会消耗资源
						uni.$off('endStaionChange');
					});
					uni.navigateTo({
						//跳转到下个页面的时候加个字段，判断当前点击的是下车点
						url: '/pages/Volunteer/homeSattionPick?&station=' + 'zhongdian' + '&startSiteName=' + that.startSiteName +
							'&pointType=end', //startSiteName
					})
				}
			},
			toPersonal: function() {
				uni.navigateTo({
					url: '../GRZX/user'
				});
			},
			toAddMessage: function() {
				uni.navigateTo({
					url: '/pages/Volunteer/passengerList'
				});
			},
			showToast: function(title, icon = 'none') {
				uni.showToast({
					title: title,
					icon: icon
				});
			},
			getTodayDate: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + '' + ' ' + hour + ':' + minutes;
				this.datestring = timer;
				this.date = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;

				this.totalTime = this.formatExpectArriveTime(this.date, this.estimateTime);
			},
			getTodayDate1: function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + '' + ' ' + hour + ':' + minutes;
				this.datestring1 = timer;
				this.date1 = year + '-' + month + '-' + day + ' ' + hour + ':' + minutes;
			},
			onSelected: function(e) { //选择
				this.showPicker = false;
				this[this.type] = e.value;
				this.datestring = this[this.type];
				// this.queryWeek(e.date.toString().substring(0, 3));
				this.date = e.value;
				this.totalTime = this.formatExpectArriveTime(this.date, this.estimateTime);
			},
			onSelected1: function(e) { //选择
				this.showPicker1 = false;
				this[this.type1] = e.value;
				this.datestring1 = this[this.type1];
				// this.queryWeek(e.date.toString().substring(0, 3));
				this.date1 = e.value;
			},
			onCancle: function() {
				this.showPicker = false;
			},
			onCancle1: function() {
				this.showPicker1 = false;
			},
			queryWeek: function(e) {
				switch (e) {
					case "Mon":
						this.Week = '周一';
						break;
					case "Tue":
						this.Week = "周二";
						break;
					case "Wed":
						this.Week = "周三";
						break;
					case "Thu":
						this.Week = "周四";
						break;
					case "Fri":
						this.Week = "周五";
						break;
					case "Sat":
						this.Week = "周六";
						break;
					case "Sun":
						this.Week = "周日";
						break;
					default:
						break;
				}
			},
			submit: function() {
				let that = this;
				if (that.isVerify()) {
					that.openPopup('centerPopup');
				}
				// uni.navigateTo({
				// 	url:'./CallAndDrive?orderNumber=2020052510512702662305'
				// })
			},
			nextButton: function() {
				let that = this;
				if (that.startSiteName === '请选择起点') {
					that.showToast('请选择起点');
				} else if (that.endSiteName === '请选择终点') {
					that.showToast('请选择终点');
				} else if(that.date>that.date1){
					that.showToast('返程时间不能小于出发时间');
				}else {
					that.nextOperation = 1;
				}
			},
			backButton: function() {
				let that = this;
				that.nextOperation = 0;
			},
			isVerify: function() {
				let that = this;
				if (that.startSiteName === '请选择起点') {
					that.showToast('请选择起点');
					return false
				} else if (that.endSiteName === '请选择终点') {
					that.showToast('请选择终点');
					return false;
				}
				/* else if (that.mileage == 0){
					that.showToast('请输入预计里程');
					return false;
				} */
				else if (that.people == 0) {
					that.showToast('请输入人数');
					return false;
				} else if (that.people < 0) {
					that.showToast('人数输入有误');
					return false;
				} else if (that.remark === '') {
					that.showToast('请说明乘车原因');
					return false;
				} else if (that.passengerMessage === '') {
					that.showToast('请录入乘车人信息');
					return false;
				}
				return true;
			},
			onShowDatePicker: function(type) {
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			onShowDatePicker1: function(type1) {
				this.type1 = type1;
				this.showPicker1 = true;
				this.value1 = this[type1];
			},
			//-----------------------------------手机签名------------------------------------------------
			//-------- 画布的触摸移动开始手势响应----------
			start: function(e) {
				// console.log(e)
				// console.log("触摸开始" + event.changedTouches[0].x)
				// console.log("触摸开始" + event.changedTouches[0].y)
				//获取触摸开始的 x,y
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y,
				}
				// console.log(touchs)
				touchs.push(point);
			},
			// 画布的触摸移动手势响应
			move: function(e) {
				let point = {
					x: e.touches[0].x,
					y: e.touches[0].y
				}
				touchs.push(point)
				if (touchs.length >= 2) {
					this.draw(touchs)
				}
			},
			// 画布的触摸移动结束手势响应
			end: function(e) {
				// console.log("触摸结束" + e)
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
			},
			// 画布的触摸取消响应
			cancel: function(e) {
				// console.log("触摸取消" + e)
			},
			// 画布的长按手势响应
			tap: function(e) {
				// console.log("长按手势" + e)
			},
			error: function(e) {
				// console.log("画布触摸错误" + e)
			},
			//绘制
			draw: function(touchs) {
				let point1 = touchs[0]
				let point2 = touchs[1]
				touchs.shift()
				content.moveTo(point1.x, point1.y)
				content.lineTo(point2.x, point2.y)
				content.stroke()
				content.draw(true)
				this.endDefault = true;
			},
			//清除操作
			clearClick: function() {
				console.log(this.endDefault);
				//清除画布
				this.endDefault = false;
				content.clearRect(0, 0, this.canvasw, 500) //canvash
				content.draw(true)
			},
			//确认签名
			saveClick: function() {
				var that = this;
				if (that.endDefault) {
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success: function(res) {
							//打印图片路径
							console.log(res.tempFilePath)
							//设置保存的图片
							// that.signImage
							pathToBase64(res.tempFilePath)
								.then(base64 => {
									that.signImage = base64;
									that.submitClick(that.signImage);
								})
						}
					})
				} else {
					uni.showToast({
						title: '请您先签名',
						icon: 'none',
					})
				}
			},
			//签名图片接口
			submitClick(e) {
				this.endDefault = false;
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				var that = this;
				console.log(e, "that.signImage")
				uni.request({
					url: that.$volunteer.Interface.uploadFile.value,
					method: that.$volunteer.Interface.uploadFile.method,
					data: {
						image: e
					},
					success(res) {
						console.log(res)
						that.getOrder(res.data.data);
					},
					fail(res) {
						uni.showToast({
							title: "网络连接失败",
							icon: "none"
						})
					}
				})
			},
			//下单
			getOrder(e) {
				uni.showLoading({
					title: '加载中...',
					mask: true
				})
				var that = this;
				if (that.orderType == 0) {
					that.orderType = '单程';
				} else if (that.orderType == 1) {
					that.orderType = '往返';
				}
				uni.request({
					url: that.$volunteer.Interface.placeorder.value,
					method: that.$volunteer.Interface.placeorder.method,
					data: {
						startName: that.startSiteName,
						endName: that.endSiteName,
						isReturn: that.orderType,
						returnTime: that.date1 + ':00',
						seatCount: that.people,
						startDate: that.date + ':00',
						remark: that.remark,
						passengers: that.passengerMessage,
						volunteerId: that.userInfo.volunteerId,
						signaturePhoto: e,
					},
					success: function(res) {
						console.log(res);
						if (res.data.code == 200) {
							that.showToast('提交成功,请等待后台审核！');
							that.clearData(); //清除数据
							setTimeout(function() {
								// uni.navigateBack({});
								uni.navigateTo({
									// url:'./CallAndDrive?orderNumber='+res.data.data.id
									url: '../GRZX/oderList/volunteerOrderList?current=4'
								})
							}, 1500)
						} else {
							that.showToast('提交失败');
						}
						uni.hideLoading();
					},
					fail: function(res) {
						console.log(res);
						that.showToast('网络连接失败');
					}
				})
			},
			//-----------开启弹窗------------
			openPopup: function(value) {
				this.$nextTick(function() {
					this.$refs[value].open();
				});
			},
			//-----------关闭弹窗------------
			closePopup: function(value) {
				// if(this.selector==""){
				// 	this.selector="请选择(可多选) >";
				// }
				// console.log(this.items[0])
				this.$nextTick(function() {
					this.$refs[value].close();
				});
			},
			//--------------计算scroll-view的高度--------------
			load() {
				var that = this;
				uni.getSystemInfo({
					success: function(res) { // res - 各种参数
						that.imgHeight = res.windowHeight - 175; //scroll-view的高度
						that.canvasw = res.windowWidth;
						that.canvash = (that.canvasw) * 9 / 16;
						console.log(that.imgHeight)
					}
				});
			},
			clearData() {
				var that = this;
				that.startSiteName = '请选择起点';
				that.endSiteName = "请选择终点";
				that.people = 0;
				that.orderType = 1;
				that.estimateState = 0;
				that.nextOperation = 0;
				that.remark = "";
				that.clearClick();
				that.closePopup('centerPopup');
				uni.removeStorageSync('passengers');
			},
			//------------------选择订单类型-----------
			radioClick: function(e) {
				this.orderType = e;
			},
			//是否拼车开关转换
			switchChange(e) {
				this.statusTip = e.detail.value ? true : false;
			},
			thisReason: function(item) {
				let that = this;
				//that.focus = false;
				that.remark = item;
				// setTimeout(function(){
				// 	that.focus = true;
				// 	that.cursor = item.length;
				// },50);
			},

			//------------------预计到达时间-----------
			formatExpectArriveTime: function(startTime, duration) {
				startTime = startTime.replace(/-/g, '/');
				var time = new Date(startTime).getTime();
				var endTime = new Date(time + duration * 60 * 1000);
				return utils.timeTodate('Y-m-d H:i', endTime)
			},
		}
	}
</script>

<style>
	page {
		background-color: #F5F7F9;
	}

	.titleFont {
		font-size: 32rpx;
		font-family: Source Han Sans SC;
		font-weight: 300;
		color: #999999;
	}

	.contentFont {
		font-size: 34rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #2C2D2D;
	}

	//--------------弹窗-------------
	//画布的样式
	.firstCanvas {
		background-color: #ddd;
		height: 570upx;
		width: 640upx;
		border-top-left-radius: 20upx;
		border-top-right-radius: 20upx;
	}

	//画布距离顶部的高度
	.centerClass {
		height: 800upx;
	}

	//重置按钮
	.clearClass {
		width: 50%;
		text-align: center;
		background-color: #ffaa00;
		color: #FFFFFF;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		border-bottom-left-radius: 20upx;
	}

	//保存按钮
	.saveClass {
		width: 50%;
		text-align: center;
		background-color: #00aaff;
		color: #FFFFFF;
		height: 100upx;
		line-height: 100upx;
		font-size: 36upx;
		border-bottom-right-radius: 20upx;
	}

	/* 隐藏滚动条 */
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
</style>
