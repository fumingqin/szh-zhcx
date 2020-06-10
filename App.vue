<script>
	import homeJS from 'common/Home.js';
	import $taxi from '@/common/Czc.js';
	export default {
		globalData: {
			globalInterval: 0,
			carId:0,
			uploadMyLocation: function() {
				let that = this;
				uni.getLocation({
					type: 'gcj02 ',
					success: function(res) {
					
						uni.request({
							url: $taxi.Interface.reportAddress.value, 
							method:$taxi.Interface.reportAddress.method,
							data: {
								carId:that.carId,
							},
							success:function(res){
								console.log(res);
							},
							fail:function(res){
							    console.log(res);
							}
						});
					}
				});
			},
			constantly: function() {
				let that = this;
				if (that.globalInterval == 0) {
					that.globalInterval = setInterval(function() {
					    that.uploadMyLocation();
					}, 10000);
				}
			},
			closeUpload:function(){
				let that = this;
				clearInterval(that.globalInterval);
				that.globalInterval = 0; 
			}
		
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>
