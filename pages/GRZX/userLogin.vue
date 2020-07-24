<template>
	<view class="content" v-bind:style="{height:imgHeight+'px'}">
		<!-- 背景图 -->
		<image src="../../static/GRZX/backgroudimg.png" style="width: 100%; position: absolute; bottom: 0; height: 100%;"></image>
		
		<!-- 司机登录 -->
		<view class="inputContent height" v-if="userType=='司机'">
			<view class="inputItem1">
				<image src="../../static/GRZX/usertype.png" class="iconClass3"></image>
				<view class="selectClass">
					<xfl-select  :list="list" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectClick"  
					:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "'请选择用户类型'" :initValue="userType" :selectHideType="'hideAll'">
			        </xfl-select>
				</view>
			</view>
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/phone.png" class="iconClass1"></image>
				<input placeholder="请输入司机编号或手机号"  class="inputClass" name="number" data-key="number" @input="inputChange" :value="number" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/pwd.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" name="password" data-key="password" :value="password" @input="inputChange" />
			</view>
			<!-- <view class="inputItem CarNum">
				<image src="../../static/GRZX/carNum.png" class="iconClass4"></image>
				<input placeholder="请绑定车牌号" maxlength="8" class="inputClass" name="carNum" data-key="carNum" :value="carNum" @input="inputChange" @blur="checkCarNum"/>
			</view> -->
			<text class="fontStyle top" @click="pwdClick">登录</text>
		</view>
		
		<!-- 志愿者登录 -->
		<view class="inputContent height" v-if="userType=='志愿者'">
			<view class="inputItem1">
				<image src="../../static/GRZX/usertype.png" class="iconClass3"></image>
				<view class="selectClass">
					<xfl-select  :list="list" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectClick"  
					:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "'请选择用户类型'" :initValue="userType" :selectHideType="'hideAll'">
			        </xfl-select>
				</view>
			</view>
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/phone.png" class="iconClass1"></image>
				<input placeholder="请输入志愿者编号或手机号"  class="inputClass" name="number" data-key="number" @input="inputChange" :value="number" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/pwd.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" name="password" data-key="password" :value="password" @input="inputChange" />
			</view>
			<text class="fontStyle top" @click="pwdClick">登录</text>
		</view>
		
		<!-- 交警登录 -->
		<view class="inputContent height" v-if="userType=='交警'">
			<view class="inputItem1">
				<image src="../../static/GRZX/usertype.png" class="iconClass3"></image>
				<view class="selectClass">
					<xfl-select  :list="list" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectClick"  
					:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "'请选择用户类型'" :initValue="userType" :selectHideType="'hideAll'">
			        </xfl-select>
				</view>
			</view>
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="请输入交警编号"  class="inputClass" name="number" data-key="number" @input="inputChange" :value="number" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/pwd.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" name="password" data-key="password" :value="password" @input="inputChange" />
			</view>
			<text class="fontStyle top" @click="pwdClick">登录</text>
		</view>
		
		<!-- 派单员登录 -->
		<view class="inputContent height" v-if="userType=='派单员'">
			<view class="inputItem1">
				<image src="../../static/GRZX/usertype.png" class="iconClass3"></image>
				<view class="selectClass">
					<xfl-select  :list="list" :clearable="false" :showItemNum="4"  :listShow="false" :isCanInput="false" @change="selectClick"  
					:style_Container="'height: 50px;font-size: 16px;'" :placeholder = "'请选择用户类型'" :initValue="userType" :selectHideType="'hideAll'">
			        </xfl-select>
				</view>
			</view>
			<view class="inputItem phoneNum">
				<image src="../../static/GRZX/phone.png" class="iconClass1"></image>
				<input type="number" placeholder="请输入派单员编号或手机号"  class="inputClass" name="number" data-key="number" @input="inputChange" :value="number" />
			</view>
			<view class="inputItem Captcha">
				<image src="../../static/GRZX/pwd.png" class="iconClass2"></image>
				<input type="password" placeholder="请输入密码" class="inputClass" name="password" data-key="password" :value="password" @input="inputChange" />
			</view>
			<text class="fontStyle top" @click="pwdClick">登录</text>
		</view>
		
		<!-- logo -->
		<image src="../../static/GRZX/logo.png" class="logoClass"></image>
	</view>
</template>

<script>
	import xflSelect from '@/components/GRZX/xfl-select/xfl-select.vue';
	export default {
		data() {
			return {
				number:'', 		//手机号或者编号
				password:'',	//密码
				imgHeight:'',	//背景图的高度
				userType:'司机', //用户类型
				carNum:'',		//车牌号
				list: [       //下拉列表
				    // {value: '', disabled: true}, //无法点击
					'司机',
				    '志愿者',
				    // '交警',
				    // '派单员',
				],
			}
		},
		components: { xflSelect },  //注册为子组件
		onLoad() {
			this.load();
		},
		onShow() {
			//--------------读取缓存(获取登录信息)-------------
			this.getStorage();
		},
		methods: {
			//--------------加载数据-------------
			load: function(){
				var that=this;
				uni.getSystemInfo({
				　　success: function(res) { // res - 各种参数
						that.imgHeight=res.windowHeight;
				       }
				});
			},
			
			//--------------读取缓存-------------
			getStorage:function(){
				var that=this;
				uni.getStorage({
					key:'userInfo',
					success:function(res){
						var message=that.checkDate(res.data.expireTime); //显示是否过期
						// console.log(message)
						if(message=="未过期"){
							uni.showLoading({
								title:'自动登录中...'
							})
							that.login(res.data.phoneNumber,res.data.password,res.data.type,res.data.expireTime);
						}else if(message=="已过期"){
							that.$Grzx.showToast('登录已过期，请重新登录');
							// console.log("登录已过期");
						}
					},
					fail:function(){
						// console.log("未获取到登录信息");
					},
				})
			},
			
			//--------------只能输入数字-------------
			judgeNum: function(val){  
				var regPos = /^\d+(\.\d+)?$/; //非负浮点数
				var regNeg = /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
				if(regPos.test(val) || regNeg.test(val)) {
					return true;
				} else {
					return false;
				}
			},
			
			//--------------输入框改变时，触发-------------
			inputChange: function(e){
				const key = e.currentTarget.dataset.key;
				this[key] = e.detail.value;
			},
			
			//--------------校验车牌号-------------
			checkCarNum: function(e){
				// console.log(e)
				if(!this.isLicensePlate(e.detail.value)){
					uni.showToast({
						title:'请输入正确的车牌号',
						icon:'none'
					})
				}
			},
			
			//--------------密码登录-------------
			pwdClick: function(){
				var that=this;
				if(that.number==""){
					uni.showToast({
						title:'请输入编号或手机号',
						icon:'none',
					})
				}else if(that.password==""){
					uni.showToast({
						title:'请输入密码',
						icon:'none',
					})
				}else{
					var time=that.getSpecifiedTime(30);		//获得登录过期时间(30天)
					uni.showLoading({
						title:'登录中...'
					})
					that.login(that.number,that.password,that.userType,time);
				}
			},
			
			//--------------登录-------------
			login: function(number,password,userType,expireTime){
				var type='';
				if(userType=="司机"){
					type='driver';
				}else if(userType=="志愿者"){
					type='volunteer';
				}
				var that=this;
				uni.request({
					url:that.$Grzx.Interface.login.value,
					header:that.$Grzx.Interface.login.header,
					data:{
						mobile:number,
						no:number,
						password:password,
						type:type,
					},
					method:that.$Grzx.Interface.login.method,
					success(res) {
						console.log(res)
						if(res.data.code===200){
							uni.hideLoading();
							uni.showToast({
								title:"登录成功",
								icon:'success',
							})
							var data=res.data.data;
							// -------------------------------司机登录-------------------------------
							if(type=="driver"){
								uni.setStorageSync('workState',data.state);
								var driverList={
									address:data.address,	//地址
									company:data.company,	//公司
									driverType:data.driverType,	//司机类型
									portrait:data.headPic,	//头像
									driverId:data.id,	//id
									userName:data.name,	//姓名
									driverNo:data.no,	//编号
									phoneNumber:data.tel,	//手机号码
									state:data.state,	//状态
									gender:data.sex,	//性别
									type:'司机',		//用户类型
									carId:data.car.id,	//车辆id
									password:password,	//密码
									expireTime:expireTime,	//登录过期时间
									licensePlate:data.car.licensePlate+data.car.licenseColor, //车牌号加颜色
								}
								uni.setStorageSync('userInfo',driverList)
								uni.setStorageSync('vehicleInfo',data.car);
								getApp().globalData.driverID = data.id;
								getApp().globalData.licensePlate = data.car.licensePlate + data.car.licenseColor;
								getApp().globalData.constantly();
								uni.redirectTo({
									url:'/pages/driver/driverOperation/taxiDriver',
								})	
							// -------------------------------志愿者登录-------------------------------
							}else if(type=="volunteer"){
								var volunteerList={
									portrait:data.headPic,	 //头像	
									volunteerNo:data.no,	//志愿者编号
									volunteerId:data.id,	//志愿者id
									userName:data.name,		//志愿者姓名
									phoneNumber:data.tel,	//志愿者电话号码
									type:'志愿者',			//用户类型
									password:password,		//密码	
									expireTime:expireTime,	//登录过期时间
								}
								uni.setStorageSync('userInfo',volunteerList)
								uni.redirectTo({
									url:'/pages/Volunteer/volunteer',
								})	
							}
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
							})
						}
					}
				})
			},
			
			//--------------获取指定的时间-------------
			getSpecifiedTime:function(e){
				var num  = parseInt(e,10); //30天过期
				var date=new Date();
				var currentDate=JSON.stringify(date).substring(1,11);
				var arry  = currentDate.split("-");
				var year = parseInt(arry[0],10);
				var month = parseInt(arry[1],10);
				var day = parseInt(arry[2],10); 
				//月份的方法：getMonth()从 Date 对象返回月份 (0 ~ 11)。
				var structDate = new Date(year , month - 1, day);
				//setDate增减天数
				structDate.setDate(structDate.getDate()+num); 
				 //如果月份长度少于2，则前加 0 补位   
				 if((structDate.getMonth() + 1).toString().length == 1) {  
					month = 0 + "" + (structDate.getMonth() + 1).toString();  
				 } else {    
					 month = (structDate.getMonth() + 1).toString();  
				 }   
				 //如果天数长度少于2，则前加 0 补位   
				 if (structDate.getDate().toString().length == 1) {   
					day = 0 + "" + structDate.getDate().toString();   
				 } else {    
					 day = structDate.getDate().toString();   
				 }    
				 var newDate = structDate.getFullYear() + "-" + month + "-" + day;
				 return newDate;
			},
			
			//--------------检查是否过期-------------
			checkDate:function(date1){
				var date2=this.getSpecifiedTime(0); 
				// console.log(date1,"登录过期时间")
				// console.log(date2,"当前时间")
				var arry1  = date1.split("-");
				var arry2  = date2.split("-");
				var time1=parseInt(arry1[0]+arry1[1]+arry1[2],10);
				var time2=parseInt(arry2[0]+arry2[1]+arry2[2],10);
				// console.log(time1-time2)
				if(time1>=time2){
					return "未过期";
				}else{
					return "已过期";
				}
			},
			
			//--------------下拉选择-------------
			selectClick: function(e){
				// console.log(e.newVal)
				this.userType=e.newVal;
			},
			
			//--------------校验车牌号-------------
			isLicensePlate: function(str) { 
				return /^(([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z](([0-9]{5}[DF])|([DF]([A-HJ-NP-Z0-9])[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-Z][A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳使领]))$/
					.test(str);
			},
			
		}
	}
</script>

<style lang="scss">
	//该界面的全局样式
	.content {
		width: 100%;
		position: relative;
	}
	.returnClass{  //返回按钮
		width: 2.53%;
		height: 35upx;
		top: 110upx;
		left: 4.13%;
		position: absolute;
	}
	.logoClass{		//logo的样式
		width: 34.4%;
		height: 250upx;
		top: 200upx;
		left: 33.87%;
		position: absolute;
	}
	.iconClass1{   //手机图标
		width: 28upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass2{	//验证码图标
		width: 31upx;
		height: 38upx;
		top: 54upx;
		left: 2%;
		position: absolute;
	}
	.iconClass3{   //用户类型图标
		width: 33upx;
		height: 36upx;
		top: 57upx;
		left:2%;
		position: absolute;
	}
	.iconClass4{ //绑定车牌号图标
		width: 36upx;
		height: 32upx;
		top: 58upx;
		left: 2%;
		position: absolute;
	}
	.inputContent{  //登录区域的样式
		width: 90.4%;
		position: absolute;
		top:324upx;
		left: 4.8%;
		background-color: white;
		border-radius: 50upx;
		display: flex;
		flex-direction: column;
	}
	.height1{
		height: 900upx;
	}
	.height{
		height: 770upx;
	}
	.inputItem{		//输入区域的样式
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.phoneNum{
		position: absolute;
		top:270upx;
		left: 6.19%;
	}
	.Captcha{
		position: absolute;
		top:410upx;  
		left: 6.19%;
	}
	.CarNum{
		position: absolute;
		top:550upx;  
		left: 6.19%;
	}
	.inputClass{	//输入框的位置
		position: absolute;
		left: 12%;
		top:51upx;
		font-size: 32upx;
		height: 30upx;
		line-height: 30upx;
		color: #999999;
	}
	.btnLogin{ //按钮
		position: absolute;
		top:630upx;
		width: 100%;
		height: 180upx;
	}
	.leftLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top:920upx;
		left: 11.73%;
	}
	.rightLine{
		border: 1upx solid #EAEAEA;
		height: 1upx;
		width: 22.48%;
		position: absolute;
		top: 920upx;
		left: 64.78%;
	}
	.getCode{  //获取验证码
		position: absolute;
		top:448upx;
		left: 64%;
		width:30%;
		font-size: 28upx;
		border-radius: 12upx;
		text-align: center;
		line-height: 64upx;
		height: 64upx;
	}
	.style1{	
		border:1px solid #0073ce;
		color: #0073ce;
	}	
	.fontStyle{		//确定字体样式
		position: absolute;
		left: 5%;
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
	.top1{
		top: 740upx;
	}
	.top{
		top:600upx;
	}
	.switchClass{ //切换登录方式
		position: absolute;
		top:584upx;
		left: 65%; //8%;
		font-size: 30upx;
		color: #1D2087;
	}
	.inputItem1{ //下拉框样式
		position: absolute;
		top:130upx;
		left: 6.19%;
		width: 87.6%;
		height: 140upx;
		border-bottom: 1upx solid #EAEAEA;
	}
	.selectClass{
		position: absolute;
		top:30upx;
		left: 8.19%;
		width: 93.6%;
	}
</style>
