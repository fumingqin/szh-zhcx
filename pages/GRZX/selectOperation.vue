<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/GRZX/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		<view class="boxClass">
			<text class="fontClass" @click="loginClick">登录</text>
			<text class="registerClass" @click="openPopup('centerPopup')">注册</text>
		</view>
		<image src="../../static/GRZX/logo.png" class="logoClass"></image>
		
		

	</view>
</template>

<script>
	import xflSelect from '@/components/YDPD/xfl-select/xfl-select.vue';
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default {
		data() {
			return {
				imgHeight:'',
				address:'',
				list: [       //要展示的数据
				    // {value: '香蕉', disabled: true},
					'司机',
				    '志愿者',
				    '交警',
				    '派单员',
				],
			}
		},
		onLoad(options) {
			this.address=options.address;
			this.load();
		},
		components: { uniPopup,xflSelect },  //注册为子组件
		methods: {
			//--------加载数据---------
			async load(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			//--------返回个人中心---------
			returnClick(){		
				if(this.address==1){
					uni.navigateBack();
				}else{
					uni.switchTab({
						url:'/pages/GRZX/user'
					});
				}
			},
			//--------登录---------
			loginClick(){
				uni.navigateTo({
					url:'/pages/GRZX/userLogin',
				})
			},
			//--------注册---------
			registerClick(){
				uni.navigateTo({
					url:'/pages/GRZX/registerPage1',
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
				this.$nextTick(function() {
					this.$refs[value].close();
				});
			},
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		//height: 1000upx;
		position: relative;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	.loginClass{ //登录
		position: absolute;
		top:200upx;
		left: 0%;
		width: 100%;
		height: 180upx;
	}
	.registerClass{ //注册
		position: absolute;
		top:400upx;
		left: 5%;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		border-radius: 20upx;
		border: 1upx solid #666666;
		color: #333333;
		font-size: 36upx;
		text-align: center;
	}
	.fontClass{
		position: absolute;
		left: 5%;
		top: 250upx;
		text-align: center;
		font-size: 36upx;
		color: #FFFFFF;
		width: 90%;
		height: 100upx;
		line-height: 100upx;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		border-radius: 20upx;
	}
	.boxClass{
		width: 90.4%;
		height: 720upx;
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 50upx;
	}
	.logoClass{		//logo的样式
		width: 34.4%;
		height: 250upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
	}
	.textClass{
		font-size: 28upx;
		color: #333333;
		width: 100%;
		text-align: center;
		top: 620upx;
		position: absolute;
	}
	.selectClass{
		background-color: #FFFFFF;
		width: 200upx;
		height: 200upx;
		border-radius: 20upx;
	}
</style>
