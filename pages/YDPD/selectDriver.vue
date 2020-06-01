<template>
	<view class="content">
		<!-- 选择列表 -->
		<view class="selectBox">
			<view class="itemClass">
				<xfl-select  :list="typeList" :clearable="false" :showItemNum="5"  :listShow="false" :isCanInput="false" @change="selectType"
				:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "''" :initValue="carType" :selectHideType="'hideAll'">
				</xfl-select>
			</view>
			<view class="itemClass ml">
				<xfl-select  :list="addressList" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectAddress"
				:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "''" :initValue="closestStartAddress" :selectHideType="'hideAll'">
				</xfl-select>
			</view>
			<view class="itemClass ml">
				<xfl-select  :list="seatList" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectSeat"
				:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "''" :initValue="carSeat" :selectHideType="'hideAll'">
				</xfl-select>
			</view>
		</view>
		<!-- 派单列表 -->
		<scroll-view class="scrollClass"  v-bind:style="{height:imgHeight+'px'}" scroll-y="true" >
			<view class="driverListClass" v-for="(item, index) in DriverList" :key="index" :class="{'cur': List.indexOf(index)!=-1}" @tap="selectDriver(index)">
				<view style="display: flex;flex-direction: row;">
					<image :src="imgSrc" class="imgClass"></image>
					<view class="style1">
						<view style="display: flex;flex-direction: row;" class="mb">
							<view class="fontClass mr1">姓名：{{item.driverName}}</view>
							<view class="fontClass">车型：{{item.carType}}</view>
						</view>
						<view style="display: flex;flex-direction: row;" class="mb">
							<view class="fontClass mr2">距离起点：{{item.distance}}</view>
							<view class="fontClass">状态：{{item.state}}</view>	
						</view>
						<view class="fontClass mb" >电话：{{item.phone}}</view>	
					</view>
				</view>
				<view style="display: flex;flex-direction: row;" class="mb1">
					<view class="fontClass style2">可乘坐人数：{{item.passengerNum}}</view>
					<view class="fontClass">车牌号：{{item.carNum}}</view>
				</view>
			</view>
		</scroll-view>
		<view class="btnClass" @click="successClick">
			确认派单
		</view>
		<!-- 签名的弹窗 -->
		<uni-popup ref="centerPopup" type="center">
			<view class="centerClass">
				<canvas class='firstCanvas' canvas-id="firstCanvas" @touchmove='move' @touchstart='start($event)' @touchend='end'
				@touchcancel='cancel' @longtap='tap' disable-scroll='true' @error='error'>
				</canvas>
				<view style="display: flex;flex-direction: row;">
					<view @click='clearClick' class="clearClass">重置</view>
					<!-- <button @click='clearClick' class="clearClass">清除</button> -->
					<view @click='saveClick' class="saveClass">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import xflSelect from '@/components/YDPD/xfl-select/xfl-select.vue';
	import uniPopup from "@/components/YDPD/uni-popup/uni-popup.vue";
	import { pathToBase64, base64ToPath } from '@/components/YDPD/pathTobase64/gsq-image-tools/image-tools/index.js';
	var content = null;
	var touchs = [];
	export default{
		data(){
			return{
				carType:'车辆类型',
				closestStartAddress:'最近起点',
				carSeat:'车辆座位',
				typeList:['大型高一','大型高二','中巴','出租车','大巴'],
				addressList:['1km','2km','3km','4km'],
				seatList:['10人','20人','30人','50人'],
				// 司机列表
				List:[],
				index:-1,
				DriverList:[
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.5km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:'86人',
						carNum:'闽C76182',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.7km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:'86人',
						carNum:'闽C76183',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.8km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:'86人',
						carNum:'闽C76184',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.9km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:'86人',
						carNum:'闽C76185',
					}
				],
				
				//列表的默认高度
				imgHeight:0,
				imgSrc:'../../static/YDPD/default.png',
				canvasw:0,
				canvash:0,
				signImage: '',
				endDefault:false,
			}
		},
		onLoad: function(options) {
			this.load();
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
		},
		components: { uniPopup,xflSelect },  //注册为子组件
		methods:{
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
			//--------------选择车型--------------
			selectType(e){
				
			},
			//--------------选择起点--------------
			selectAddress(e){
				
			},
			//--------------车辆座位--------------
			selectSeat(e){
				
			},
			//--------------选择司机--------------
			selectDriver(e){
				if (this.List.indexOf(e) == -1) {
					this.List=[];
					console.log(e)//打印下标
					this.List.push(e);//选中添加到数组里
					this.index=e;
				} else {
					this.List.splice(this.List.indexOf(e), 1); //取消
					this.index=-1;
				}
			},
			//--------------确认派单--------------
			successClick(){
				if(this.index==-1){
					uni.showToast({
						title:'请先选择司机',
						icon:'none',
					})
				}else{
					this.openPopup('centerPopup');
				}
			},
			submitClick(e){
				//回调接口
				console.log(e)
				var driver=this.DriverList[this.index];
				console.log(driver)
				//返回上一页
				uni.showToast({
					title:'派单成功！',
					icon:'success',
				})
				setTimeout(function(){
					uni.navigateBack();
				},1000)
			},
		
			//-------- 画布的触摸移动开始手势响应----------
			start: function(e) {
				console.log(e)
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
				console.log("触摸结束" + e)
				//清空轨迹数组
				for (let i = 0; i < touchs.length; i++) {
					touchs.pop()
				}
			},
			// 画布的触摸取消响应
			cancel: function(e) {
				console.log("触摸取消" + e)
			},
			// 画布的长按手势响应
			tap: function(e) {
				console.log("长按手势" + e)
			},
			error: function(e) {
				console.log("画布触摸错误" + e)
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
				this.endDefault=true;
			},
			//清除操作
			clearClick: function() {
				//清除画布
				this.endDefault=false;
				content.clearRect(0, 0, this.canvasw, 500)//canvash
				content.draw(true)
			},
			//保存图片
			saveClick: function() {
				var that = this;
				if(that.endDefault){
					uni.canvasToTempFilePath({
						canvasId: 'firstCanvas',
						success: function(res) {
							//打印图片路径
							console.log(res.tempFilePath)
							//设置保存的图片
							// that.signImage
							pathToBase64(res.tempFilePath)
							.then(base64 => {
								that.signImage=base64;
								console.log(that.signImage)
								that.submitClick(that.signImage);
							})
						}
					})
				}else{
					uni.showToast({
						title:'请您先签名',
						icon:'none',
					})
				}
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
		flex-direction: column; //column纵向，row横向
	}
	//顶部选择下拉列表
	.selectBox{
		width: 93%;
		// height: 106upx;
		margin-left: 3.5%;
		margin-top: 20upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
		display: flex;
		flex-direction: row;
	}
	//顶部选择下拉列表的每一项
	.itemClass{
		margin-left: 5%;
		width: 24%;
		color: #333333;
		font-size: 30upx;
		margin-top: 10upx;
		margin-bottom: 10upx;
	}
	.ml{
		margin-left: 8%;
	}
	//派单列表
	.scrollClass{ 
		width: 93.06%;
		margin-top: 30upx;
		margin-left: 3.47%;
		background-color: #F5F9FC;
	}
	//单个司机
	.driverListClass{
		display: flex;
		flex-direction: column;
		width: 99%;
		background-color: #FFFFFF;
		border-radius: 20upx;
		margin-bottom: 20upx;
		box-shadow:0px 6px 20px 0px rgba(231,231,231,0.53);
	}
	//选中司机的样式
	.cur{
		// color: white;
		border: 1px solid red;
		// background-color: #ff5d00;
	}
	//司机头像
	.imgClass{
		margin-top: 54upx;
		margin-left: 4.53%;
		width: 100upx;
		height: 100upx;
	}
	//司机信息的字体
	.fontClass{
		font-size: 30upx;
		color: #333333;
	}
	.style1{
		margin-top: 41upx;
		margin-left: 31upx;
	}
	.mb{
		margin-bottom: 20upx;
	}
	.mb1{
		margin-bottom: 30upx;
	}
	.mr1{
		margin-right: 100upx;
	}
	.mr2{
		margin-right: 64upx;
	}
	.style2{
		margin: 0 95upx 0 50upx;
	}
	//.确认派单按钮
	.btnClass{
		position: fixed;
		bottom: 30upx;
		margin-left: 4%;
		width: 92%;
		text-align: center;
		font-size: 34upx;
		border-radius: 20upx;
		color: #FFFFFF;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		padding: 30upx 0;
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
