<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in passengers" :options="buttonOption" :key="index" @change="changeItem($event,item,index)" @click="clickItem($event,item,index)">
				<text class="cont">{{item}}</text>
			</uni-swipe-action-item>
		</uni-swipe-action>
		<view style="width: 750rpx;height: 200rpx;">
			
		</view>
		<view class="button-block">
			<button @click="manual" class="add-button" style="font-size: 30rpx;">手动输入</button>
			<button @click="scan" class="add-button" style="font-size: 30rpx;">扫码输入</button>
			<button @click="finish" class="add-button" style="font-size: 30rpx;">完成</button>
		</view>
		
		<uni-popup ref="addPassenger" type="center">
			<view class="popupBlock">
				<view class="popupTitle">
					<text>请输入编号</text>
				</view>
				<view class="popupInputBlock">
					<view class="popupInput">
						<input v-model="popupValue" placeholder="请输入编号" />
					</view>
				</view>
				<view class="popupButtonBlock">
					<view class="popupButtonItem itemRight" @click="popupClose">
						<text>取消</text>
					</view>
					<view class="popupButtonItem" @click="popupConfirm">
						<text class="popupOkColor">确定</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/Volunteer/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '@/components/Volunteer/uni-swipe-action-item/uni-swipe-action-item.vue';
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
		        uniSwipeAction,
		        uniSwipeActionItem,
				uniPopup, 
		},
		data() {
			return {
				buttonOption:[
					{
						text:'编辑',
						style:{
							backgroundColor:'#007aff'
						}
					},
					{
						text:'删除',
						style:{
							backgroundColor:'#dd524d'
						}
					}
				],
				passengers:[],
				popupValue:'',
				index:-1,
			}
		},
		methods: {
			showLoading:function(){
				uni.showLoading({
					mask:true,
					title:'加载中'
				});
			},
			openPopup:function(){
				let that = this;
				that.popupValue = '';
				that.index = -1;
				that.$refs.addPassenger.open();
			},
			closePopup:function(){
				let that = this;
				that.$refs.addPassenger.close();
			},
			//左滑编辑打开事件
			openPopupEdit:function(item,index){
				let that = this;
				that.showLoading();
				that.popupValue = item;
				that.index = index;
				that.$refs.addPassenger.open();
				uni.hideLoading();
			},
			
			changeItem:function(e,item,index){
				
			},
			clickItem:function(e,item,index){
				let that = this;
				if(e.content.text === '编辑'){
					that.edit(item,index);
				}else if(e.content.text === '删除'){
					that.delete(index);
				}
			},
			//手动输入
			manual:function(){
				let that = this;
				that.openPopup();
			},
			//扫码输入
			scan:function(){
				let that = this;
				that.showLoading();
				uni.scanCode({
					success:function(res){
						that.passengers.push(res.result);
					},
					fail:function(){
						uni.hideLoading();
					},
					complete:function(){
						uni.hideLoading();
					},
				})
			},
			finish:function(){
				let that = this;
				if(that.passengers.length > 0){
					uni.setStorageSync('passengers',that.passengers);
					uni.navigateBack();
				}else{
					uni.showToast({
						title:'请至少录入一个'
					});
				}
				
			},
			//左滑删除按钮
			delete:function(index){
				let that = this;
				that.passengers.splice(index,1);
			},
			//左滑编辑按钮
			edit:function(item,index){
				let that = this;
				that.openPopupEdit(item,index);
			},
			//弹出层取消按钮
			popupClose:function(){
				let that = this;
				that.closePopup();
			},
			//弹出层确定按钮
			popupConfirm:function(){
				let that = this;
				if(that.index === -1){
					that.passengers.push(that.popupValue);
				}else if(that.index > -1){
					that.passengers[that.index] = that.popupValue;
					console.log(that.passengers);
					that.$forceUpdate();
				}
				that.closePopup();
			}
		}
	}
</script>

<style lang="scss">
	
	.button-block{
		position: fixed;
		bottom: 50rpx;
		left: 0;
		right: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	
	.add-button{
		width: 200rpx;
		margin: 0 auto;
		color: #FFFFFF;
		background:linear-gradient(270deg,rgba(94,109,255,1),rgba(73,152,251,1));
		box-shadow:0px 7px 38px 8px rgba(70,103,252,0.15);
	}	
	.cont {
		flex: 1;
		height: 45px;
		line-height: 45px;
		padding: 0 15px;
		position: relative;
		background-color: #fff;
		font-size: 15px;
		border-bottom-color: #F5F5F5;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}
	.popupBlock {
		width: 550rpx;
		padding: 30rpx 0;
		background-color: #FFFFFF;
		border-radius: 12rpx;
	}
	.popupTitle{
		text-align: center;
		margin-bottom: 30rpx;
	}
	.popupTitle text{
		color: $uni-text-color-grey;
	}
	.popupInputBlock{
		padding:0 30rpx 30rpx 30rpx ;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #E6E6E6;
	}
	.popupInput{
		width: 450rpx;
		margin: 0 auto;
	}
	.popupButtonBlock{
		display: flex;
		flex-direction: row;
		width: 550rpx;
		margin: 0 auto;
	}
	.popupButtonItem{
		text-align: center;
		width: 275rpx;
	}
	.popupOkColor{
		color: $uni-color-primary;
	}
	.itemRight{
		border-right: 1px solid #E6E6E6;
	}
</style>
