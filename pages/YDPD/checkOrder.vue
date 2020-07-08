<template>
	<view class="content">
		<image :src="imgSrc" class="imgClass"></image>
		<view class="bottomClass">
			<view class="btnClass1" @click="passClick">审核通过</view>
			<view class="btnClass2" @click="failClick">审核不通过</view>
		</view>
		
		<uni-popup ref='centerPopup' :animation='true' type='center' :maskClick='false'>
			<!--审核不通过的原因-->
			<view class="popupBlock" style="margin: 0 auto;">
				<view class="popupTitle">
					<view style="width: 72rpx;"></view>
					<text class="popupTitleFont">原&nbsp;&nbsp;因</text>
					<view style="width: 72rpx;text-align: right;">
						<uni-icons @click="closePopup('centerPopup')" color='#999999' size='24' type='closeempty'></uni-icons>
					</view>
				</view>
				<view>
					<textarea maxlength="200" class="popupTitleFont borderTextArea" placeholder-style="font-size:30rpx;" style="margin-top: 20rpx;height: 200rpx;width: 550rpx;margin: 0 auto;" name='failReason' v-model="failReason" placeholder="请输入审核不通过的原因"></textarea>
					<button @click="submitClick" class="popupButtonOk">
						<text class="btnClass">确定</text>
					</button>
				</view>
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
				imgSrc:'',	//签名的路径
				OrderDetail:'', //订单详情
				failReason:'',//审核不通过的原因
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
				},500)
			},
			//---------------审核不通过---------------
			failClick:function(){
				this.openPopup('centerPopup');
			},
			//---------------提交审核不通过原因---------------
			submitClick:function(){
				var that=this;
				console.log(that.failReason)
				if(that.failReason==""){
					that.$Grzx.showToast('请输入审核不通过的原因');
				}else{
					this.closePopup('centerPopup');
					that.$Grzx.showToast('提交成功','success');
					that.failReason="";//清空不通过的原因
					setTimeout(function(){
						uni.navigateBack();
					},500)
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

	.btnClass{ //确定按钮
		// background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		// box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		// width: 50%;
		// margin-top: 20upx;
		// color: #FFFFFF;
		
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FFFFFF;
	}
	
	.popupBlock {
		width: 575rpx;
		padding: 30rpx;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}
	
	.popupTitle {
		margin-bottom: 50rpx;
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
	}
	
	.popupTitleFont {
		font-size: 38rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #333333;
	}
	
	.popupButtonOk {
		width: 50%;
		margin-top: 50rpx;
		padding-top: 10rpx;
		padding-bottom: 10rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
		border-radius: 12rpx;
	}
	
	.borderTextArea {
		border: 1rpx solid #333333;
		border-radius: 12rpx;
		padding: 10rpx;
	}
	
	.popupButtonOkFont {
		font-size: 36rpx;
		font-family: Source Han Sans SC;
		font-weight: 400;
		color: #FFFFFF;
	}
</style>
