<template>
	<view class="content">
		<image :src="imgSrc" class="imgClass"></image>
		<view class="bottomClass">
			<view class="btnClass1" @click="passClick">审核通过</view>
			<view class="btnClass2" @click="failClick">审核不通过</view>
		</view>
		<uni-popup ref="centerPopup" type="center">
			<view class="centerClass">
				<view class="uni-title">原&nbsp;&nbsp;因</view>
				<view class="uni-textarea">
					<textarea placeholder-class="textClass"  placeholder="占位符字体是红色的" />
				</view>
				<button @click="submitClick" class="btnClass">确定</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue";
	export default{
		data(){
			return{
				// imgSrc:'../../static/GRZX/test.png',
				OrderDetail:'',
			}
		},
		onLoad(options) {
			this.OrderDetail=options.OrderDetail;
		},
		onShow() {
			
		},
		components: { uniPopup },  //注册为子组件
		methods:{
			//---------------审核通过---------------
			passClick:function(){
				var that=this;
				that.$Grzx.showToast('审核通过','success');
				setTimeout(function(){
					uni.navigateBack();
				},200)
			},
			//---------------审核不通过---------------
			failClick:function(){
				this.openPopup('centerPopup');
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
	page{
		background-color: #F5F9FC;
	}
	.content{
		width: 100%;
		display: flex;
		flex-direction: column; //column:纵向 ，row横向
	}
	.imgClass{
		width: 90%;
		height: 800upx;
		margin-left: 5%;
		margin-top: 25upx;
		border-radius: 20upx;
	}
	.bottomClass{
		width: 100%;
		display: flex;
		flex-direction: row;//column:纵向 ，row横向
		margin-top: 50upx;
		// position: fixed;
		// bottom: 80upx;
	}
	.btnClass1{  //派单按钮
		color: #FFFFFF;
		font-size: 34upx;
		padding:30upx 80upx;
		background-color: #4C91FC;
		border-radius: 20upx;
		margin-left: 5%;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
	}
	.btnClass2{  //接单按钮
		color: #333333;
		font-size: 34upx;
		padding:30upx 80upx;
		border: 1upx solid #666666;
		border-radius: 20upx;
		margin-left: 50upx;
	}
	.centerClass{  //弹框的样式
		width: 102%;
		height: 500upx;
		background-color: #FFFFFF;
		border-radius: 20upx;
	}
	.uni-title{
		text-align: center;
		font-size: 42upx;
		color: #333333;
	}
	.uni-textarea{ //文本框的view
		margin-top: 20upx;
		margin-left: 2%;
	}
	.textClass{ //文本框的内容
		font-size: 42upx;
		padding-left: 2%;
	}
	.btnClass{ //确定按钮
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		width: 50%;
	}
</style>
