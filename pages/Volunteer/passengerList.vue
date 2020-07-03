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
			<button @click="manual" class="add-button">手动输入</button>
			<button @click="scan" class="add-button">扫码输入</button>
		</view>
		
		<uni-popup ref="passenger" type="dialog">
			<uni-popup-dialog type="info" mode="input" :before-close='false' :value='popupValue' @close="popupClose" @confirm="popupConfirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/Volunteer/uni-swipe-action/uni-swipe-action.vue';
	import uniSwipeActionItem from '@/components/Volunteer/uni-swipe-action-item/uni-swipe-action-item.vue';
	import uniPopup from '@/components/Volunteer/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/Volunteer/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/Volunteer/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
		        uniSwipeAction,
		        uniSwipeActionItem,
				uniPopup,
				uniPopupMessage,
				uniPopupDialog,
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
				passengers:[
					'123',
					'123',
				],
				popupValue:''
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
				this.$refs.passenger.open();
			},
			//左滑编辑打开事件
			openPopupEdit:function(item,index){
				this.$refs.passenger.open();
			},
			closePopup:function(){
				this.$refs.passenger.close();
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
				that.popupValue = '';
				that.openPopup();
			},
			//扫码输入
			scan:function(){
				let that = this;
				that.showLoading();
				uni.scanCode({
					success:function(res){
						that.passengers.push(res.result);
						uni.hideLoading();
					}
				})
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
			popupClose:function(done){
				let that = this;
				done();
			},
			//弹出层确定按钮
			popupConfirm:function(done,value){
				let that = this;
				that.passengers.push(value);
				done();
			}
		}
	}
</script>

<style>
	
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
		width: 300rpx;
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
</style>
