<template>
	<view class="Cr_background">
		<!-- <image class="bg" :src="backImg||'/static/GRZX/backImg.png'" mode="aspectFill" name="backImg"></image> -->
		<view class="topClass">
			<image class="tx" :src="portrait||'/static/GRZX/missing-face.png'" name="portrait"></image>
		</view>
		
		<view class="boxClass">
			<view class="itemClass">
				<text class="fontClass">姓&nbsp;名：</text>
				<text class="fontStyle">{{name}}</text>
			</view>
			
			<!-- 志愿者 -->
			<view class="itemClass">
				<text class="fontClass">电&nbsp;话：</text>
				<text class="fontStyle">{{phoneNumber}}</text>
			</view>
			
			<!-- 司机 -->
			<view class="itemClass" v-if="userType=='司机'">
				<text class="fontClass">性&nbsp;别：</text>
				<text class="fontStyle">{{gender}}</text>
			</view>
			<view class="itemClass" v-if="userType=='司机'">
				<text class="fontClass">车牌号：</text>
				<text class="fontStyle">{{licensePlate}}</text>
			</view>
			<view class="itemClass" v-if="userType=='司机'"> 
				<text class="fontClass">地&nbsp;址：</text>
				<text class="fontStyle">{{address}}</text>
			</view>
			<view class="itemClass" v-if="userType=='司机'">
				<text class="fontClass">公&nbsp;司：</text>
				<text class="fontStyle">{{company}}</text>
			</view>		
			<view class="itemClass" v-if="userType=='司机'">
				<text class="fontClass">驾驶证类型：</text>
				<text class="fontStyle">{{licenseType}}</text>
			</view>
		</view>
	</view>
	 
</template>
<script>
	import { pathToBase64, base64ToPath } from '@/components/YDPD/pathTobase64/gsq-image-tools/image-tools/index.js';
	export default {
		data() {
			return {
				userType:'',  //用户类型
				name:'',  //姓名
				portrait:'',  //头像
				//志愿者
				phoneNumber:'',  //志愿者电话
				volunteerType:'', //志愿者类型
				
				//司机
				gender:'',  //司机性别
				address:'',  //司机地址
				company:'',  //司机公司
				licenseType:'',  //驾驶证类型
				licensePlate:'',  //车牌号
			};
		},
		onLoad:function(){
			this.loadUserInfo();
		},
		methods:{
			//------------------------加载用户信息------------------------
			loadUserInfo(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success(res){
						that.userType=that.formatData(res.data.type);
						that.name=that.formatData(res.data.userName);
						that.portrait=res.data.portrait;
						that.phoneNumber=that.formatData(res.data.phoneNumber);
						if(res.data.type=="司机"){
							if(res.data.gender==null || res.data.gender==""){
								that.gender= "保密";
							}else{
								that.gender=res.data.gender;
							}
							that.licensePlate=that.formatData(res.data.licensePlate);
							that.address=that.formatData(res.data.address);
							that.company=that.formatData(res.data.company);
							that.licenseType=that.formatData(res.data.driverType);
						}
					}
				})
			},
			
			//------------------------------格式化------------------------------
			formatData:function(data){
				if(data==null || data==""){
					return "暂无";
				}else{
					return data;
				}
			},
			
			//------------------------判断是否为base64格式------------------------
			isBase64:function(str) {
			    if (str ==='' || str.trim() ===''){ return false; }
			    try {
			        return btoa(atob(str)) == str;
			    } catch (err) {
			        return false;
			    }
			},
	}
}
</script>
<style lang="scss">	
	.Cr_background{
		widows: 100%;
		height: 100%;
		.bg{
			width: 100%;
			height: 500upx;
			filter: blur(0.5px);
			// opacity: .7;
		}
		.topClass{
			widows: 100%;
			background:linear-gradient(0deg,rgba(93,184,250,1),rgba(11,140,233,1));
		}
		.tx{
			width: 200upx;
			height: 200upx; 
			margin: 80upx 36%;
			border-radius: 50%;
		}
		.boxClass{
			display: flex;
			flex-direction: column;
			width: 96%;
			margin-left: 2%;
			margin-top:40upx ;
		}
		.itemClass{
			width: 100%;
			border-bottom: 1upx solid #EAEAEA;
			display: flex;
			flex-direction: row;
		}
		.fontClass{
			padding:40upx 0upx;
			font-size: 32upx;
			color: #2C2D2D;
			width: 27%;
			margin-left: 3%;
		}
		.fontStyle{
			width: 65%;
			padding:40upx 0upx;
			font-size: 32upx;
			color: #2C2D2D;
			text-align: right;
			display: block;
			text-overflow: ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}
	}

</style>