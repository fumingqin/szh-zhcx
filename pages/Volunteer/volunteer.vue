<template>
	<view>
		<view style="position: relative;z-index: -1;">
			<image src="../../static/Volunteer/advertisement.png" style="width: 750rpx;height: 400rpx;"></image>
		</view>
			<view style="margin-top: -80rpx;">
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
								<input class="contentFont" v-model="price" type="number"  />
								<text>人</text>
							</view>
						</view>
						
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">出发时间</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;"> 
								<text style="letter-spacing:1px" @click="onShowDatePicker('datetime')">{{datestring}} {{Week}}</text>
							</view>
							<mx-date-picker :show="showPicker" :showSeconds="false" :type="type" :value="value" :show-tips="true" :begin-text="'入住'"
							 :end-text="'离店'" :show-seconds="true" @confirm="onSelected" @cancel="onCancle" />
						</view>
						
						<view>
							<view style="padding-top: 20rpx ;">
								<text class="titleFont">备注</text>
							</view>
							<view style="padding: 20rpx 0;border-bottom: #EAEAEA 1px solid;display: flex;flex-direction: row;justify-content: space-between;"> 
								<input class="contentFont"/>
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
	</view>
</template>

<script>
	import MxDatePicker from '@/components/mx-datepicker/mx-datepicker.vue'
	export default {
		components: {
			MxDatePicker,
		},
		data() {
			return {
				datestring:'',
				date:'',
				Week:'',
				value:'',
				type:'',
				showPicker:false,
				
				startSiteName:'请选择起点',
				startLon:'',
				startLat:'',
				
				endSiteName:'请选择终点',
				endLon:'',
				endLat:'',
				mileage:0,
				price:0,
				userInfo:null,
				vehicleInfo:null,
				seat:0,
			}
		},
		onLoad() {
			let that =this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			that.vehicleInfo = uni.getStorageSync('vehicleInfo') || '';
			
			
			that.getTodayDate();
		},
		methods: {
			//---------------------------------点击起点站---------------------------------
			startStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值
				uni.$on('startstaionChange', function(data) {
				    // data即为传过来的值，给上车点赋值
					that.startSiteName = data.data;
				    //清除监听，不清除会消耗资源
				    uni.$off('startstaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是上车点
					url:'/pages/Volunteer/homeSattionPick?&station=' + 'qidian',
					fail(res) {
						console.log(res)
					}
				})
			},
			//---------------------------------点击终点站---------------------------------
			endStationTap(){
				var that = this;
				//监听事件,监听下个页面返回的值，给下车点赋值
				uni.$on('endStaionChange', function(data) {
				    // data即为传过来的值
					that.endSiteName = data.data;
				    //清除监听，不清除会消耗资源
				    uni.$off('endStaionChange');
				});
				uni.navigateTo({
					//跳转到下个页面的时候加个字段，判断当前点击的是下车点
					url:'/pages/Volunteer/homeSattionPick?&station=' + 'zhongdian',
				})
			},
			showToast:function(title,icon='none'){
				uni.showToast({
					title:title,
					icon:icon
				});
			},
			getTodayDate:function() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minutes;
				this.datestring = timer;
				this.date = year + '/' + month + '/' + day + ' ' + hour + ':' + minutes;
			},
			onSelected:function(e) { //选择
				this.showPicker = false;
				this[this.type] = e.value;
				this.datestring = this[this.type];
				this.queryWeek(e.date.toString().substring(0, 3));
				this.date = e.value;
			},
			onCancle:function(){
				this.showPicker = false;
			},
			queryWeek:function(e) {
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
			submit:function(){
				let that = this;
				if(! that.isVerify()){
					return;
				}
				uni.navigateTo({
					url:'./CallAndDrive?orderNumber=2020052510512702662305'
				})
				// uni.request({
				// 	url:that.$downwindCar.Interface.CreateLine_Driver.value,
				// 	method:that.$downwindCar.Interface.CreateLine_Driver.method,
				// 	data:{
				// 		StartLon:that.startLon,
				// 		StartLat:that.startLat,
				// 		EndLon:that.endLon,
				// 		EndLat:that.endLat,
				// 		StartSiteName:that.startSiteName,
				// 		EndSiteName:that.endSiteName,
				// 		Mileage:that.mileage,
				// 		DepartureTime:that.date,
				// 		LineName :that.startSiteName + '-' + that.endSiteName,
				// 		DriverID:that.userInfo.driverId,
				// 		DriverName:that.userInfo.userName,
				// 		Price:that.price,
				// 		Seat:that.seat,
				// 		VehicleNumber:that.vehicleInfo.vehicleNumber
				// 	},
				// 	success:function(res){
				// 		console.log(res);
				// 		if(res.data.status){
				// 			that.showToast('提交成功');
				// 			setTimeout(function(){
				// 				// uni.navigateBack({});
				// 				uni.navigateTo({
				// 					url:'../trafficPolice/trafficPolice'
				// 				})
				// 			},1500)
				// 		}else{
				// 			that.showToast('提交失败');
				// 		}
				// 	},
				// 	fail:function(res){
				// 		console.log(res);
				// 		that.showToast('网络连接失败');
				// 	}
				// })
			},
			isVerify:function(){
				let that = this;
				if(that.startSiteName === '请选择上车点'){
					that.showToast('请选择上车点');
					return false
				} else if (that.endSiteName === '请选择下车点'){
					that.showToast('请选择下车点');
					return false;
				} /* else if (that.mileage == 0){
					that.showToast('请输入预计里程');
					return false;
				} */ else if (that.price == 0){
					that.showToast('请输入人数');
					return false;
				} else if (that.price < 0){
					that.showToast('人数输入有误');
					return false;
				} 
				return true;
			},
			onShowDatePicker:function(type){
				this.type = type;
				this.showPicker = true;
				this.value = this[type];
			},
			// chooseStartSite:function(){
			// 	let that = this;
			// 	uni.chooseLocation({
			// 		success:function(res){
			// 			that.startSiteName = res.name
			// 			that.startLon = res.longitude
			// 			that.startLat = res.latitude
			// 		},
			// 	});
			// },
			// chooseEndSite:function(){
			// 	let that = this;
			// 	uni.chooseLocation({
			// 		success:function(res){
			// 			that.endSiteName = res.name
			// 			that.endLon = res.longitude
			// 			that.endLat = res.latitude
			// 		},
			// 	});
			// },
			
		}
	}
</script>

<style>
	page{
		background-color: #F5F7F9;
	}
	.titleFont{
		font-size:32rpx;
		font-family:Source Han Sans SC;
		font-weight:300;
		color:#999999;
	}
	.contentFont{
		font-size:38rpx;
		font-family:Source Han Sans SC;
		font-weight:400;
		color:#2C2D2D;
	}
	
</style>
