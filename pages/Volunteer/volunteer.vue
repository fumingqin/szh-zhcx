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
				<!-- <scroll-view style="height: 750rpx;" :scroll-y='true'> -->
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
						<text class="titleFont">人数</text>
					</view>
					<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;">
						<input class="contentFont" v-model="people" type="number" />
						<text>人</text>
					</view>
				</view>

				<view>
					<view style="padding-top: 20rpx ;">
						<text class="titleFont">上车时间</text>
					</view>
					<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;">
						<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}}</text>
					</view>
					<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" :begin-text="'入住'"
					 :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onCancle" />
				</view>

				<view>
					<view style="padding-top: 20rpx ;">
						<text class="titleFont">乘车原因</text>
					</view>
					<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;">
						<input v-model="remark" class="contentFont" placeholder="请输入乘车原因" />
						<!-- <text>人</text> -->
					</view>
				</view>
				<!-- <view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">剩余座位</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;"> 
								<input class="contentFont" v-model="seat" type="number"  />
								<text>个</text>
							</view>
						</view> -->
				<!-- </scroll-view> -->
				<view style="margin-top: 50rpx;">
					<button @click="submit" style="background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));border-radius: 12rpx;">
						<text style="font-size:36rpx;font-family:Source Han Sans SC;font-weight:400;color:#FFFFFF;">提交</text>
					</button>
				</view>
			</view>
		</view>
		<!-- 签名的弹窗 -->
		<uni-popup ref="centerPopup" type="center">
			<view style="font-size:40rpx;font-family:Source Han Sans SC;font-weight:400;color:#ffff00;">请手动签名!</view>
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
				datestring: '',
				date: '',
				Week: '',
				value: '',
				type: '',
				showPicker: false,
				remark: '',
				startSiteName: '请选择起点',
				startLon: '',
				startLat: '',

				endSiteName: '请选择终点',
				endLon: '',
				endLat: '',
				mileage: 0,
				people: 0,
				userInfo: '',
				// vehicleInfo:null,
				seat: 0,
				volunteerImg:'',
				signImage:'',
			}
		},
		onLoad() {
			let that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			// that.vehicleInfo = uni.getStorageSync('vehicleInfo') || '';
			that.getTodayDate();
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
		methods: {
			// ---------------------------加载图片----------------------------
			loadImg(){
				var that=this;
				uni.request({
					url:that.$volunteer.GetImage.url,
					data:{
						model:10,
					},
					method:'POST',
					success(res) {
						var image=res.data.data.filter(item => {
							return item.type=='shizhonghui2';
						})
						that.volunteerImg=image[0].imageUrl;
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
				that.endSiteName="请选择终点";
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
			},
			onSelected: function(e) { //选择
				this.showPicker = false;
				this[this.type] = e.value;
				this.datestring = this[this.type];
				// this.queryWeek(e.date.toString().substring(0, 3));
				this.date = e.value;
			},
			onCancle: function() {
				this.showPicker = false;
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
				}else if (that.remark ==='') {
					that.showToast('请说明乘车原因');
					return false;
				}
				return true;
			},
			onShowDatePicker: function(type) {
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
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
			submitClick(e){
				var that=this;
				console.log(e,"that.signImage")
				uni.request({
					url: that.$volunteer.Interface.uploadFile.value,
					method: that.$volunteer.Interface.uploadFile.method,
					data: {
						image:e
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
			getOrder(e){
				var that = this;
				uni.request({
					url: that.$volunteer.Interface.placeorder.value,
					method: that.$volunteer.Interface.placeorder.method,
					data: {
						startName: that.startSiteName,
						endName: that.endSiteName,
						seatCount: that.people,
						startDate: that.date + ':00',
						remark: that.remark,
						volunteerId: that.userInfo.volunteerId,
						signaturePhoto:e,
					},
					success: function(res) {
						console.log(res);
						if (res.data.code == 200) {
							that.showToast('提交成功,请等待后台审核！');
							that.clearData();
							setTimeout(function() {
								// uni.navigateBack({});
								uni.navigateTo({
									// url:'./CallAndDrive?orderNumber='+res.data.data.id
									url: '../GRZX/oderList/volunteerOrderList'
								})
							}, 1500)
						} else {
							that.showToast('提交失败');
						}
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
			load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight-175; //scroll-view的高度
						that.canvasw = res.windowWidth;
						that.canvash = (that.canvasw) * 9 / 16;
						console.log(that.imgHeight)
				    }
				});
			},
			clearData(){
				var that=this;
				that.startSiteName = '请选择起点';
				that.endSiteName="请选择终点";
				that.people=0;
				that.remark="";
				that.clearClick();
				that.closePopup('centerPopup');
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
		font-size: 38rpx;
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
	.centerClass{
		height: 800upx;
	}
	//重置按钮
	.clearClass{
		width: 50%;
		text-align: center;
		background-color: #ffaa00;
		color: #FFFFFF;
		height: 100upx;
		line-height:100upx;
		font-size: 36upx;
		border-bottom-left-radius: 20upx;
	}
	//保存按钮
	.saveClass{
		width: 50%;
		text-align: center;
		background-color: #00aaff;
		color: #FFFFFF;
		height: 100upx;
		line-height:100upx;
		font-size: 36upx;
		border-bottom-right-radius: 20upx;
	}
</style>
