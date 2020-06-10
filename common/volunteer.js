const Url = 'http://36.148.9.1:10022'; //https请求

const Interface={
	getlines:{
		value:Url+'/api/volunteer/get-lines',
		name:'获取志愿者站点',
		method:'GET',
		pages: [],
	},
	placeorder:{
		value:Url+'/api/volunteer/place-order',
		name:'志愿者下单',
		method:'POST',
		pages: [],
	},
	getorderDetail:{
		value:Url+'/api/volunteer/get-order-detail',
		name:'根据订单id获取详情',
		method:'GET',
		pages: [],
	},
}




// 接口声明区
export default {
	Interface,
}