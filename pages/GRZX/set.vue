<template>
	<view class="container">
	
		<view class="list-cell m-t b-b" @click="clearStorage" hover-class="cell-hover" :hover-stay-time="50">
			<text class="cell-tit">清除缓存</text>
			<text style="font-size: 28upx;">{{currentSize}}</text>
			<text class="cell-more jdticon icon-you"></text>
		</view>
		<!-- <view class="list-cell log-out-btn" @click="toLogout">
			<text class="cell-tit">退出登录</text>
		</view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				statu:{
					check1:true,
					check2:true,
				},
				currentSize:'',
			};
		},
		onLoad(){
			
		},
		onShow() {
			this.load();
		},
		methods:{
			navTo(url){
				uni.navigateTo({
					url:url
				})
			},
			async load(){
				var that=this;
				const res = uni.getStorageInfoSync();
				console.log(res,"res3");
				console.log(res.currentSize,"currentSize");
				var size=res.currentSize;
				if(size>=1024){
					var size=(size/1024).toFixed(2);
					that.currentSize=size+" M";
				}else{
					that.currentSize=size+" KB";
				}
			},
			//退出登录
			toLogout(){				
				uni.showModal({
					content: '确定要退出登录么',
					success: (e)=>{
						if(e.confirm){
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('vehicleInfo');
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
			//清除缓存
			clearStorage(){
				var user=uni.getStorageSync('userInfo');
				var vehicle=uni.getStorageSync('vehicleInfo')||'';
				uni.showModal({
				    content: '是否清除数据',
				    success: (e)=>{
				    	if(e.confirm){
							uni.clearStorageSync();
							uni.setStorageSync('userInfo',user);
							if(vehicle!=""){
								uni.setStorageSync('vehicleInfo',vehicle);
							}
							uni.redirectTo({
								url:'/pages/GRZX/set'
							})
				    	}
				    }
				});
			},
		}
	}
</script>

<style lang='scss'>
	page{
		background: #f8f8f8;
	}
	.list-cell{
		display:flex;
		align-items:baseline;
		padding: 20upx 30upx;
		line-height:60upx;
		position:relative;
		background: #fff;
		justify-content: center;
		&.log-out-btn{
			margin-top: 40upx;
			.cell-tit{
				color: #007aff;
				text-align: center;
				margin-right: 0;
			}
		}
		&.cell-hover{
			background:#fafafa;
		}
		&.b-b:after{
			left: 30upx;
		}
		&.m-t{
			margin-top: 16upx; 
		}
		&.b-l{
			border-top: 1upx solid #EAEAEA;
		}
		.cell-more{
			align-self: baseline;
			font-size:32upx;
			color:#909399;
			margin-left:10upx;
		}
		.cell-tit{
			flex: 1;
			font-size: 30upx;
			color: #303133;
			margin-right:10upx;
		}
		.cell-tip{
			font-size: 28upx;
			color: #909399;
		}
		switch{
			transform: translateX(16upx) scale(.84);
		}
	}
</style>
