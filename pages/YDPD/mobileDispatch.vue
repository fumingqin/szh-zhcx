<template>
	<view class="content">
		<text class="titleClass">派单员</text>
		<!-- <image src="../../static/btnGrzx.png" class="btnGrzx" @click="navTouser"></image> -->
		<view class="boxClass">
			<view class="box1">
				<text class="fontStyle">平台接单量</text>
				<text class="fontClass">{{receiveOrderNum}}</text>
			</view>
			<view class="box2">
				<text class="fontStyle">今日派单量</text>
				<text class="fontClass">{{dispatchOrderNum}}</text>
			</view>
			<view class="box3">
				<text class="fontStyle">司机完成量</text>
				<text class="fontClass">{{finishedOrderNum}}</text>
			</view>
		</view>
		
		<scroll-view class="scrollClass" v-bind:style="{height:imgHeight+'px'}" scroll-y="true">
			<view class="orderListClass" v-for="(item, index) in OrderList" :key="index">
				<view class="style1 styleClass">乘车人数：{{item.passengerNum}}</view>
				<view class="style2 styleClass">上车时间：{{item.getOntime}}</view>
				<view class="style3 styleClass">
					<view>预计里程：{{item.estimatedMileage}}</view>
					<view style="margin-left: 40px;">预计时长：{{item.estimatedDuration}}</view>
				</view>
				<view class="style4 styleClass">起点：{{item.startAddress}}</view>
				<view class="style5 styleClass">终点：{{item.endAddress}}</view>
				<view class="style6">
					<view class="btnClass1" @click="dispatchOrder(item)">派单</view>
					<view class="btnClass2" @click="rejectOrder(item)">拒接</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				//数量
				dispatchOrderNum:150,
				receiveOrderNum:100,
				finishedOrderNum:300,
				//订单列表
				OrderList:[{
					id:0,
					passengerNum:"45人",
					getOntime:"2020-05-27  18:30",
					estimatedMileage:"44km",
					estimatedDuration:"2小时",
					startAddress:"茶叶大厦",
					endAddress:"晋江机场",
				},{
					id:1,
					passengerNum:"488人",
					getOntime:"2020-05-28  18:30",
					estimatedMileage:"520km",
					estimatedDuration:"2小时15分",
					startAddress:"茶叶大厦路口",
					endAddress:"晋江机场",
				},
				{
					id:2,
					passengerNum:"488人",
					getOntime:"2020-05-28  18:30",
					estimatedMileage:"520km",
					estimatedDuration:"2小时15分",
					startAddress:"茶叶大厦路口",
					endAddress:"晋江机场",
				},
				{
					id:3,
					passengerNum:"488人",
					getOntime:"2020-05-28  18:30",
					estimatedMileage:"520km",
					estimatedDuration:"2小时15分",
					startAddress:"茶叶大厦路口",
					endAddress:"晋江机场",
				},
				{
					id:4,
					passengerNum:"488人",
					getOntime:"2020-05-28  18:30",
					estimatedMileage:"520km",
					estimatedDuration:"2小时15分",
					startAddress:"茶叶大厦路口",
					endAddress:"晋江机场",
				}],
				//手机屏幕的高度
				imgHeight:0,
			}
		},
		onLoad() {
			this.load();
		},
		methods:{
			//----------------加载scroll-wiew的高度----------------
			load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight-220;
						console.log(that.imgHeight)
				    }
				});
			},
			//----------------派单----------------
			dispatchOrder(e){
				console.log(e)
				uni.navigateTo({
					url:'/pages/YDPD/selectDriver'
				})
			},
			//----------------拒接----------------
			rejectOrder(e){
				console.log(e)
			},
			//----------------跳转个人中心----------------
			navTouser(){
				uni.navigateTo({
					url:'/pages/GRZX/user'
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F9FC;
	}
	.content{
		width: 100%;
		display: flex;
		flex-direction: column;
	}
	.titleClass{
		width: 100%;
		margin-top: 90upx;
		text-align: center;
		color: #333333;
		font-size: 38upx;
	}
	.boxClass{
		width: 100%;
		// height: 180upx;
		display: flex;
		flex-direction: row;
		margin-top: 50upx;
	}
	.box1{ //今日派单量
		background-color: #FFFFFF;
		border-radius: 20upx;
		width: 29.07%;
		margin-left: 3.47%;
		display: flex;
		flex-direction: column;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
	}
	.box2{  //今日接单量
		background-color: #FFFFFF;
		border-radius: 20upx;
		width: 29.07%;
		margin-left: 2.36%;
		display: flex;
		flex-direction: column;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
	}
	.box3{ //今日完成量
		background-color: #FFFFFF;
		border-radius: 20upx;
		width: 29.07%;
		margin-left: 2.36%;
		display: flex;
		flex-direction: column;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
	}
	.fontStyle{ //文字样式
		color: #333333;
		font-size: 33upx;
		width: 100%;
		text-align: center;
		margin-top: 32upx;
	}
	.fontClass{ //数字样式
		color:#000000;
		font-size: 46upx;
		width: 100%;
		text-align: center;
		margin-top: 18upx;
		margin-bottom: 20upx;
	}
	.scrollClass{ //订单列表
		background-color:#F5F9FC;
		width: 93.06%;
		margin-top: 30upx;
		margin-left: 3.47%;
		// border: 1upx solid red;
	}
	.orderListClass{ //单个订单
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-bottom: 20upx;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
	}
	.style1{  //乘车人数
		margin-top: 46upx;
	}
	.style2{  //上车时间
		margin-top: 30upx;
	}
	.style3{  //预计里程和预计时长
		margin-top: 30upx;
		display: flex;
		flex-direction: row;
	}
	.style4{  //起点
		margin-top: 30upx;
	}
	.style5{  //终点
		margin-top: 30upx;
	}
	.styleClass{  //通用的样式
		margin-left: 5.44%;
		color: #333333;
		font-size: 30upx;
	}
	.style6{  //按钮
		margin-top: 42upx;
		margin-bottom: 40upx;
		display: flex;
		flex-direction: row;
	}
	.btnClass1{  //派单按钮
		color: #FFFFFF;
		font-size: 34upx;
		padding:30upx 105upx;
		background-color: #4C91FC;
		border-radius: 20upx;
		margin-left: 40upx;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
	}
	.btnClass2{  //接单按钮
		color: #333333;
		font-size: 34upx;
		padding:30upx 105upx;
		border: 1upx solid #666666;
		border-radius: 20upx;
		margin-left: 60upx;
	}
	.btnGrzx{
		width: 121upx;
		height: 121upx;
		position: fixed;
		top: 66upx;
		left: 1%;
	}
</style> 
