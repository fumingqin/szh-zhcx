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
			<view class="driverListClass" v-for="(item, index) in driverList" :key="index" :class="{'cur': List.indexOf(index)!=-1}" @tap="selectDriver(index)">
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
					<view class="fontClass style2">可乘坐人数：{{item.passengerNum}}人</view>
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
					<view @click='saveClick' class="saveClass">确定</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import xflSelect from '@/components/YDPD/xfl-select/xfl-select.vue';
	export default{
		data(){
			return{
				carType:'车辆类型', //车辆类型
				closestStartAddress:'最近起点',//最近起点
				carSeat:'车辆座位', //车辆座位
				typeList:['大型高一','大型高二','中巴','出租车','大巴'], //下拉列表(车型)
				addressList:['1km','2km','3km','4km'], //下拉列表(距离)
				seatList:['10人','20人','30人','50人'], //下拉列表(座位数)
				
				List:[], // 司机列表
				index:-1, //默认值
				driverList:[], //司机列表
				
				imgHeight:0,//列表的默认高度
				imgSrc:'../../static/trafficPolice/HeadPhoto.png', //司机头像
				userInfo:[], //用户信息
			}
		},
		onLoad: function(options) {
			this.load();
		},
		onShow() {
			var that = this;
			that.userInfo = uni.getStorageSync('userInfo') || '';
			if (that.userInfo == '') {
				that.$Grzx.showToast('请先登录');
			} else {
				uni.showLoading({
					title:'加载订单中...',
				});
			}
		},
		onPullDownRefresh() {
			var that = this;
			if (that.userInfo != '') {
				uni.showLoading({
					title:'加载订单中...',
				});
			}
		},
		components: { xflSelect },  //注册为子组件
		methods:{
			//--------------计算scroll-view的高度--------------
			load:function(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight-175; //scroll-view的高度
						console.log(that.imgHeight)
				    }
				});
			},
			//--------------选择车型--------------
			selectType:function(e){
				
			},
			//--------------选择起点--------------
			selectAddress:function(e){
				
			},
			//--------------车辆座位--------------
			selectSeat:function(e){
				
			},
			//--------------获取司机列表--------------
			getDriverList:function(){
				var that=this;
				that.driverList=[]; //加载司机列表时，先清空司机列表
				that.driverList=[
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.5km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:86,
						carNum:'闽C76182',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.7km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:50,
						carNum:'闽C76183',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.8km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:40,
						carNum:'闽C76184',
					},
					{
						driverName:'张师傅',
						carType:'大型高一',
						distance:'1.9km',
						state:'空闲中',
						phone:'15260769755',
						passengerNum:20,
						carNum:'闽C76185',
					}
				];
			},
			//--------------选择司机--------------
			selectDriver:function(e){
				if (this.List.indexOf(e) == -1) {
					// this.List=[];
					console.log(e)//打印下标
					this.List.push(e);//选中添加到数组里
					this.index=e;
				} else {
					this.List.splice(this.List.indexOf(e), 1); //取消
					this.index=-1;
				}
			},
			//--------------确认派单--------------
			successClick:function(){
				var that=this;
				if(this.index==-1){
					uni.showToast({
						title:'请先选择司机',
						icon:'none',
					})
				}else{
					that.$Grzx.showToast('派单成功','success');
				}
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
</style>
