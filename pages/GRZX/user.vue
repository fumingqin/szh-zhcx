<template>
	<view class="content">
		<image src="../../static/GRZX/return.png" class="returnClass" @click="returnClick"></image>
		<view class="returnStyle" @click="returnClick">返回</view>
		<view class="backImg">
			<image src="../../static/GRZX/backImg.png" class="imgClass"></image>
			<view class="userInfoClass" @click="personClick">
				<image class="portraitClass" :src="portrait || '/static/GRZX/missing-face.png'"></image>
				<text class="usernameClass">{{nickname || '请输入您的昵称'}}</text>
				
			</view>
			<view v-if="userType=='司机'" class="licenseClass">{{licensePlate}}</view>
			<view v-if="userType!='司机'" class="typeBox">
				<image src="../../static/GRZX/huangguan.png" class="imgTubiao"></image>
				<text class="fontClass">{{userType}}</text>
			</view>
			
			<view class="grzyClass" @click="personClick">
				<text>个人主页</text>
				<image src="../../static/GRZX/btnRight_Home.png" class="rightClass"></image>
			</view>
			
			<view class="myBox" v-if="userType=='司机'">
				<view class="collection" @click="orderClick(0)">
					<image src="../../static/GRZX/tubiao_pay1.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">全部</text>
				</view>
				<view class="order" @click="orderClick(1)">
					<image src="../../static/GRZX/tubiao_pay2.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">进行中</text>
				</view>
				<view class="history" @click="orderClick(2)">
					<image src="../../static/GRZX/tubiao_pay3.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">已完成</text>
				</view>
			</view>
			
			<view class="myBox" v-if="userType=='志愿者'||userType=='随车志愿者'">
				<view class="collection" @click="orderClick(0)">
					<image src="../../static/GRZX/tubiao_pay1.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">全部</text>
				</view>
				<view class="order" @click="orderClick(1)">
					<image src="../../static/GRZX/tubiao_pay2.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">进行中</text>
				</view>
				<view class="history" @click="orderClick(2)">
					<image src="../../static/GRZX/tubiao_pay3.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">已完成</text>
				</view>
			</view>
			
			<view class="myBox" v-if="userType=='派单员'">
				<view class="collection" @click="orderClick(1)">
					<image src="../../static/GRZX/tubiao_pay1.png" class="imgStyle1" mode="aspectFill"></image>
					<text class="myFont">待审核</text>
				</view>
				<view class="order" @click="orderClick(2)">
					<image src="../../static/GRZX/tubiao_pay2.png" class="imgStyle2" mode="aspectFill"></image>
					<text class="myFont">待派单</text>
				</view>
				<view class="history" @click="orderClick(3)">
					<image src="../../static/GRZX/tubiao_pay3.png" class="imgStyle3" mode="aspectFill"></image>
					<text class="myFont">已处理</text>
				</view>
			</view>
		</view>
	
		<view v-if="userType!='交警'">
			<image :src="advert" class="advertClass1"></image>
		</view>
		<view v-if="userType=='交警'">
			<image :src="advert" class="advertClass2"></image>
		</view>
	
		<view class="serviceBox">
			<text class="moreClass">更多服务</text>
			<view class="boxClass marginTop" @click="phoneClick">
				<image src="../../static/GRZX/tubiao_kefu.png" class="iconClass2"></image>
				<text class="fontStyle">电话客服</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop">
				<image src="../../static/GRZX/tubiao_kefu.png" class="iconClass2"></image>
				<button open-type="contact" class="contactClass">在线客服</button>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop" @click="exitClick">
				<image src="../../static/GRZX/tubiao_tuichu.png" class="iconClass3"></image>
				<text class="fontStyle">退出登录</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
			<view class="boxClass borderTop" @click="setClick">
				<image src="../../static/GRZX/tubiao_shezhi.png" class="iconClass1"></image>
				<text class="fontStyle">设&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;置</text>
				<image src="../../static/GRZX/tubiao_Right.png" class="btnClass"></image>
			</view>
		</view>	
		
		<view v-show="false" class="workClass" @click="switchState" v-if="userType=='司机'">
			{{workState}}
		</view>
	</view>
</template>

<script>
	import { pathToBase64, base64ToPath } from '@/components/YDPD/pathTobase64/gsq-image-tools/image-tools/index.js';
	export default{
		data(){
			return{
				nickname:'',	//昵称
				portrait:'',	//头像
				advert:'/static/GRZX/advert.png', //广告
				userType:'',	//用户类型
				licensePlate:'',//车牌号加颜色
				workState:'',	//司机的工作状态
				driverId:'',//司机ID
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.loadData();
		},
		methods:{
			// ---------------------------加载数据----------------------------
			loadData(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res) {
						that.driverId = res.data.driverId;
						that.nickname=res.data.userName;
						that.portrait=res.data.portrait;
						that.userType=res.data.type;
						if(that.userType=="司机"){
							that.licensePlate=res.data.licensePlate;
							that.loadWorkState();	//加载司机工作状态
						}
					}
				})
			},
			
			// ---------------------------加载司机工作状态----------------------------
			loadWorkState(){
				var that=this;
				uni.getStorage({
					key:'workState',
					success(res) {
						if(res.data=="online"){
							that.workState="下班";
						}else if(res.data=="offline"){
							that.workState="上班";
						}
					},
					fail() {
						// that.workState="上班";
					}
				})
			},
			
			// ---------------------------司机切换上下班状态----------------------------
			switchState(){
				uni.showLoading({
					title:'加载中',
					mask:true,
				});
				let that = this;
				var url = '';
				var method = '';
				if(that.workState === '上班'){
					//下班调下班接口
					url = that.$taxi.Interface.onLine.value;
					method = that.$taxi.Interface.onLine.method;
				} else if (that.workState === '下班'){
					url = that.$taxi.Interface.offLine.value;
					method = that.$taxi.Interface.offLine.method;
				}
				if(url !== '' && method !== ''){
					uni.request({
						url: url,
						method: method,
						data: {
							driverId: that.driverId,
						},
						success: function(res) {
							uni.hideLoading();
							if (res.data.code===200) {
								if(that.workState === '上班'){
									that.workState = '下班';
									uni.setStorageSync('workState','online');
									uni.showToast({
										title:'已上班',
										icon:'none'
									});
								} else if(that.workState === '下班'){
									that.workState = '上班';
									uni.setStorageSync('workState','offline');
									uni.showToast({
										title:'已下班',
										icon:'none'
									});
								}
							} else {
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								});
							}
						},
						fail: function(res) {
							uni.hideLoading();
							uni.showToast({
								title:'网络连接失败',
								icon:'none'
							});
						},
					});
				}
			},
			
			// ---------------------------跳转订单的点击-----------------------
			orderClick(e){
				var that=this;
				if(that.userType=="司机"){
					uni.navigateTo({
						url:'/pages/driver/order/Order?current='+e,
					})
				}else if(that.userType=="志愿者"||that.userType=="随车志愿者"){
					uni.navigateTo({
						url:'/pages/GRZX/oderList/volunteerOrderList?current='+e,
					})
				}else if(that.userType=="派单员"){
					uni.navigateTo({
						url:'/pages/GRZX/oderList/dispatchOrderList?current='+e,
					})
				}
			},
			
			// ---------------------------进入个人主页--------------------------
			personClick(){
				uni.navigateTo({
					url:'/pages/GRZX/personal',
				})
			},
			
			// ---------------------------返回上一页--------------------------
			returnClick(){
				uni.navigateBack();
			},
			
			// ---------------------------电话客服--------------------------
			phoneClick(){
				uni.makePhoneCall({
					phoneNumber: '18065328329', //仅为示例
				});
			},
			
			// ---------------------------设置--------------------------
			setClick(){
				uni.navigateTo({
					url:'/pages/GRZX/set',
				})
			},
			
			// ---------------------------退出登录--------------------------
			exitClick(){
				uni.showModal({
					content: '确定要退出登录么',
					success: (e)=>{
						if(e.confirm){
							uni.removeStorageSync('userInfo'); 		//清除用户信息缓存
							uni.removeStorageSync('vehicleInfo'); 	//清除车辆信息缓存
							uni.removeStorageSync('passengers'); 	//清除乘客信息缓存
							uni.removeStorageSync('workState'); 	//清除司机上下班状态缓存
							getApp().globalData.driverID = '';
							getApp().globalData.licensePlate = '';
							getApp().globalData.closeUpload();
							setTimeout(()=>{
								uni.reLaunch({
									url:'/pages/GRZX/userLogin'
								})
							}, 200)
						}
					}
				})
			},
			
			//----------------------判断是否为base64格式-------------------
			isBase64:function(str) {
			    if (str ==='' || str.trim() ===''){ return false; }
			    try {
			        return btoa(atob(str)) == str;
			    } catch (err) {
			        return false;
			    }
			},
			
			//----------------------判断是否为数字-----------------------
			judgeNum(val){
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if(regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
		}
		
	}
</script>
 
<style lang="scss">
	page{
		background-color: #F5F9FA;
	}
	.content{
		
	}
	.backImg{ 
		width: 100%;
		height: 490upx;
	}
	.imgClass{ //背景图片
		width: 100%;
		height: 490upx;
	}
	.userInfoClass{ 	//包括头像昵称
		position: absolute;
		left: 4.53%;
		top:161upx;
		height: 127upx;
		width: 68.4%;
		// background-color: #06B4FD;
		display: flex;
		flex-direction: row;
	}
	.portraitClass{ 	//头像
		border-radius: 50%;
		width: 127upx;
		height: 127upx;
	}
	.usernameClass{		//昵称
		font-size: 42upx;
		color: #FFFFFF;
		margin-top: 20upx;
		margin-left: 5%;
		width: 350upx;
		display: block;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.grzyClass{  		//个人主页
		width: 20%;
		height: 34upx;
		position: absolute;
		left:75.47%;
		top: 200upx;
		color: #FFFFFF;
		font-size: 28upx;
		line-height: 27upx;
	}
	.rightClass{
		width: 10%;
		height: 29upx;
		position: absolute;
		left:82%;
		top:0upx;
	}
	.licenseClass{
		position: absolute;
		top: 245upx;
		left: 25%;
		color: #FFFFFF;
	}
	.typeBox{  
		width: 142upx;
		height: 42upx;
		background-color: #3280B8;
		position: absolute;
		top: 245upx;
		left: 25%;
		border-radius: 8upx;
	}
	.imgTubiao{
		width: 15%;
		height: 21upx;
		position: absolute;
		left: 9upx;
		top: 10upx;
	}
	.fontClass{
		width: 74%;
		text-align: center;
		font-size: 20upx;
		color: #FFFFFF;
		line-height: 42upx;
		height: 42upx;
		position: absolute;
		left: 34upx;
		top: 1upx;
	}
	.myBox{			//包括我的收藏，我的订单，我的历史
		width: 91.47%;
		height: 170upx;
		position: absolute;
		left: 4.27%;
		top:341upx;
		background-color: #FFFFFF;
		display: flex;
		flex-direction: row;
		border-radius: 12upx;
	}
	.collection{		//我的收藏
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle1{
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.order{				//我的订单
		width: 33.33%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle2{
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.history{			//我的历史
		width: 33.34%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.imgStyle3{
		width: 61upx;
		height: 59upx;
		margin-top: 31upx;
		margin-left: 36.68%;
	}
	.myFont{		//文字的样式
		color: #2C2D2D;
		height: 27upx;
		line-height: 27upx;
		font-size:28upx;
		font-family: SourceHanSansSC-Regular;
		margin-top: 22upx;
		text-align: center;
	}
	.advertClass1{		//广告
		width: 91.47%;
		height: 160upx;
		margin-top: 42upx;
		margin-left: 4.27%;
	}
	.advertClass2{		//广告
		width: 91.47%;
		height: 160upx;
		margin-top: -125upx;
		margin-left: 4.27%;
	}
	.serviceBox{		//更多服务
		width:91.47%;
		padding-bottom: 10upx;
		background-color: #FFFFFF;
		border-radius: 12upx;
		margin-top: 10upx;
		margin-left: 4.27%;
		display: flex;
		flex-direction: column;
		margin-bottom: 30upx;
	}
	.moreClass{		
		font-size:32upx ;
		font-weight: bold;
		color: #000000;
		margin-top: 34upx;
		margin-left: 3.55%;
	}
	.boxClass{
		width: 620upx;
		height: 104upx;
		margin-top: 0upx;
		margin-left: 4.27%;	
		position: relative;
	}
	.marginTop{
		margin-top: 18upx;
	}
	.iconClass1{  //设置
		width: 50upx;
		height: 51upx;
		margin-top: 28upx;
		margin-left: 9upx;
	}
	.iconClass2{  //在线客服图标
		width: 47upx;
		height: 43upx;
		margin-top: 33upx;
		margin-left: 9upx;
	}
	.iconClass3{  //退出登录
		width: 41upx;
		height: 41upx;
		margin-top: 32upx;
		margin-left: 14upx;
	}
	.btnClass{
		width: 11upx;
		height: 22upx;
		position: absolute;
		left: 610upx;
		top:43upx;
	}
	.fontStyle{
		font-size: 28upx;
		color: #2C2D2D;
		position: absolute;
		left: 80upx;
		top:33upx;
	}
	.borderTop{
		border-top: 1upx solid #EAEAEA;
	}
	
	//在线客服
	.contactClass{
		width: 91%;
		height: 100upx;
		line-height: 100upx;
		position: absolute;
		left: 8%;
		top:0upx;
		background-color: #FFFFFF;
		border: 1upx solid #FFFFFF;
		font-size: 28upx;
		color: #2C2D2D;
		text-align: left;
	}
	.contactClass::after{
		border: none; 
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 90upx;
		left: 4.13%;
		position: absolute;
	}
	.returnStyle{
		width: 10%;
		height: 35upx;
		top: 86upx;
		left: 9.13%;
		position: absolute;
		color: #FFFFFF;
	}

	.workClass{
		margin-left: 5%;
		margin-bottom: 20upx;
		width: 90%;
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		padding: 25upx 0;
	}

</style>
