<template>
	<view class="content">
		<mckou-weather :weatherData="weatherData" ref="mckouWeather"></mckou-weather>
	</view>
</template>

<script>
	import mckouWeather from '@/components/mckou-weather/mckouWeather.vue';

	export default {
		data() {
			return {
				title: 'Hello',
				weatherData:[],
				// weatherData: [{
				// 	dayWeek: "周二",
				// 	dayLabel: "8/11",
				// 	weatherLabel: "阴",
				// 	weatherIcon: "../../static/GRZX/cloudy.png",
				// 	max: 34,
				// 	min: 27,
				// 	wind: "西南风",
				// 	air: "良"
				// }, {
				// 	dayWeek: "周三",
				// 	dayLabel: "8/12",
				// 	weatherLabel: "阴",
				// 	weatherIcon: "../../static/GRZX/cloudy.png",
				// 	max: 34,
				// 	min: 27,
				// 	wind: "西南风",
				// 	air: "良"
				// }, {
				// 	dayWeek: "周四",
				// 	dayLabel: "8/13",
				// 	weatherLabel: "阴",
				// 	weatherIcon: "../../static/GRZX/cloudy.png",
				// 	max: 36,
				// 	min: 27,
				// 	wind: "西南风",
				// 	air: "良"
				// }, {
				// 	dayWeek: "周五",
				// 	dayLabel: "8/14",
				// 	weatherLabel: "阴",
				// 	weatherIcon: "../../static/GRZX/cloudy.png",
				// 	max: 35,
				// 	min: 26,
				// 	wind: "西南风",
				// 	air: "良"
				// }, {
				// 	dayWeek: "周六",
				// 	dayLabel: "8/15",
				// 	weatherLabel: "阴",
				// 	weatherIcon: "../../static/GRZX/cloudy.png",
				// 	max: 35,
				// 	min: 28,
				// 	wind: "西南风",
				// 	air: "良"
				// }]
			}
		},
		components: {
			mckouWeather
		},
		onLoad() {
			var that = this;
			
			that.weatherList();
		},
		methods: {
			weatherList(){
				var that = this;
				uni.request({
					url:'http://api.k780.com/?app=weather.future&weaid=117.26.63.39&&appkey=10003&sign=b59bc3ef6191eb9f747dd4e83c99f2a4&format=json',
					// url:'http://wthrcdn.etouch.cn/weather_mini?city=泉州',
					method: 'GET',
					success: res => {
						console.log(res);
						var obj = new Object();
						for (var item of res.data.result) {
							obj = {
								// 	dayWeek: "周二",
								// 	dayLabel: "8/11",
								// 	weatherLabel: "阴",
								// 	weatherIcon: "../../static/GRZX/cloudy.png",
								// 	max: 34,
								// 	min: 27,
								// 	wind: "西南风",
								// 	air: "良"
								// dayWeek:item.date,
								// weatherLabel:item.type,
								// weatherIcon: "../../static/GRZX/cloudy.png",
								// max:item.high.replace(/[^0-9]/ig,""),
								// min:item.low.replace(/[^0-9]/ig,""),
								// wind:item.fengxiang,
								// air: "良",
								dayWeek:item.week,
								dayLabel: item.days.substring(5,10),
								weatherLabel:item.weather.substring(0,2),
								weatherIcon: item.weather_icon,
								max:item.temp_high,
								min:item.temp_low,
								wind:item.wind,
								air: "良",
							};
							that.weatherData.push(obj);
						}
						that.$nextTick(() => {
							that.$refs.mckouWeather.init();
						});
					},
					fail: () => {},
					complete: () => {}
				});
			},

		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
