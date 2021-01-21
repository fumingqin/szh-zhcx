<template>
	<view>
		<view style="display: flex;background-color: #FFFFFF;height: 100rpx;">
			<!-- <view style="margin-top: 20rpx;color: #000000;">2021-01-18</view> -->
			<view class="uni-list">
				<view class="uni-list-cell">
					<!-- <view class="uni-list-cell-left">
						当前日期
					</view> -->
					<view class="uni-list-cell-db">
						<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
							<view class="uni-input">{{date}}</view>
						</picker>
					</view>
				</view>
			</view>
			<button class="button3" :class="buttonColor==0?'button1':'button2'" @click="button1">进港</button>
			<button class="button4" :class="buttonColor==1?'button1':'button2'" @click="button2">出港</button>
		</view>
		<view v-if="fType=='进港'" style="background-color: #f7f5f3;">
			<view style="display: flex;margin-left: 8rpx;font-size: 26rpx;">
				<view style="width: 116rpx;">航班号</view>
				<view style="width: 104rpx;">始发地</view>
				<view style="width: 116rpx;">计划起飞</view>
				<view style="width: 112rpx;">计划到达</view>
				<view style="width: 116rpx;">实际起飞</view>
				<view style="width: 112rpx;">实际到达</view>
				<view>状态</view>
			</view>
			<view v-for="(item,index) in planeArr" :key="index" style="display: flex;margin-top: 20rpx;font-size: 28rpx;align-items: center;">
				<view style="width: 132rpx;">{{item.JFlightnum}}</view>
				<view style="width: 122rpx;">{{item.City}}</view>
				<view style="width: 110rpx;">{{item.Etd}}</view>
				<view style="width: 110rpx;">{{item.Eta}}</view>
				<view style="width: 110rpx;">{{item.Atd}}</view>
				<view style="width: 100rpx;">{{item.Ata}}</view>
				<view v-if="item.State=='到达' || item.State=='起飞' || item.State=='延误' || item.State=='返航' || item.State=='备降'" style="border-radius: 8rpx;background: #007AFF;color: #FFFFFF;">{{item.State}}</view>
				<view v-if="item.State=='计划'" style="border-radius: 8rpx;background: #00aa00;color: #FFFFFF;">{{item.State}}</view>
				<view v-if="item.State=='取消'" style="border-radius: 8rpx;background: #98868d;color: #FFFFFF;">{{item.State}}</view>
			</view>
		</view>
		<view v-if="fType=='出港'" style="background-color: #f7f5f3;">
			<view style="display: flex;margin-left: 8rpx;font-size: 26rpx;">
				<view style="width: 116rpx;">航班号</view>
				<view style="width: 104rpx;">目的地</view>
				<view style="width: 116rpx;">计划起飞</view>
				<view style="width: 112rpx;">计划到达</view>
				<view style="width: 116rpx;">实际起飞</view>
				<view style="width: 112rpx;">实际到达</view>
				<view>状态</view>
			</view>
			<view v-for="(item,index) in outplaneArr" :key="index" style="display: flex;margin-top: 20rpx;font-size: 28rpx;align-items: center;">
				<view style="width: 132rpx;">{{item.JFlightnum}}</view>
				<view style="width: 122rpx;">{{item.Cityx}}</view>
				<view style="width: 110rpx;">{{item.Etd}}</view>
				<view style="width: 110rpx;">{{item.Eta}}</view>
				<view style="width: 110rpx;">{{item.Atd}}</view>
				<view style="width: 100rpx;">{{item.Ata}}</view>
				<view v-if="item.State=='到达' || item.State=='起飞' || item.State=='延误' || item.State=='返航' || item.State=='备降' " style="border-radius: 8rpx;background: #007AFF;color: #FFFFFF;">{{item.State}}</view>
				<view v-if="item.State=='计划'" style="border-radius: 8rpx;background: #00aa00;color: #FFFFFF;">{{item.State}}</view>
				<view v-if="item.State=='取消'" style="border-radius: 8rpx;background: #98868d;color: #FFFFFF;">{{item.State}}</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				buttonColor: 0,
				JFlightnum: '', //航班号
				City: '', //始发地
				Cityx: '', //目的地
				Etd: '', //计划起飞
				Eta: '', //计划到达
				Atd: '', //实际起飞
				Ata: '', //实际到达
				Stop: '', //机位
				State: '', //状态
				fDate: '', //日期
				fType: '进港', //类型：进港还是出港
				flightState:0,//航班切换状态
				planeArr: [], //全部航班
				outplaneArr: [], //出港全部航班
				date: currentDate,
			};
		},
		onLoad() {
			this.getFlightDyn();
		},
		// onShow() {
		// 	let that = this;
		// 	that.getFlightDyn(currentDate);
		// },
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			bindDateChange: function(e) {
				let that = this;
				that.date = e.target.value;
				that.getFlightDyn();
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
			
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			button1() {
				let that = this;
				that.flightState=0;
				that.fType = '进港',
				that.getFlightDyn();
				that.buttonColor = 0;
			},
			button2() {
				let that = this;
				that.flightState=1;
				that.fType = '出港',
				that.getFlightDyn();
				that.buttonColor = 1;
			},
			getFlightDyn() {
				let that = this;
				console.log(that.date);
				that.planeArr=[];
				that.outplaneArr=[];
				uni.request({
					url: that.$volunteer.Interface.getFlightDyn.value,
					method: that.$volunteer.Interface.getFlightDyn.method,
					data: {
						ip: '58.218.240.21',
						fDate: that.date,
						fType: that.fType
					},
					success: res => {
						console.log(res, '航班动态');
						var obj = new Object();
						if(that.fType=='进港'){
							for (var item of res.data.data.records) {
								obj = {
									JFlightnum: item.JFlightnum, //航班号
									City: item.City, //始发地
									Etd: item.Etd, //计划起飞
									Eta: item.Eta, //计划到达
									Atd: item.Atd, //实际起飞
									Ata: item.Ata, //实际到达
									State: item.State, //状态
								};
								that.planeArr.push(obj);
							}
						}else if(that.fType=='出港'){
							for (var item of res.data.data.records) {
								obj = {
									JFlightnum: item.JFlightnum, //航班号
									Cityx:item.Cityx, //目的地
									Etd: item.Etd, //计划起飞
									Eta: item.Eta, //计划到达
									Atd: item.Atd, //实际起飞
									Ata: item.Ata, //实际到达
									State: item.State, //状态
								};
								that.outplaneArr.push(obj);
							}
						}
						
					},
					fail: () => {
						console.log(res);
						uni.showToast({
							title:'暂无数据',
							icon: 'none'
						})
					},
					complete: () => {}
				});

			},
		}
	}
</script>

<style lang="scss">
	page {
		background: #fbfbfb;
	}

	.button3 {
		height: 88rpx;
		margin-left: 30rpx;
		font-size: 36rpx;
		font-family: Source Han Sans CN;
		background-color: #484f54;
	}

	.button4 {
		height: 88rpx;
		font-size: 36rpx;
		margin-left: -180rpx;
		font-family: Source Han Sans CN;
		background-color: #484f54;
	}

	.button1 {
		color: #FFFFFF;
	}

	.button2 {
		color: #000000;
	}
	.uni-input {
		height: 50rpx;
		padding: 15rpx 25rpx;
		line-height: 50rpx;
		font-size: 28rpx;
		background: #FFF;
		flex: 1;
	}
	
	.uni-list {
		// background-color: #FFFFFF;
		position: relative;
		// width: 100%;
		display: flex;
		flex-direction: column;
	}
	
	.uni-list-cell {
		position: relative;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}
	
	.uni-list-cell-left {
		white-space: nowrap;
		font-size: 28rpx;
		padding: 0 30rpx;
	}
	
	.uni-list-cell-db,
	.uni-list-cell-right {
		flex: 1;
	}
</style>
