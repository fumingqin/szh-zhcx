// const Url = 'http://36.148.9.1:10022'; //http请求
const Url = 'https://xmjdt.cn:10022'; //https请求

const Interface={
	login:{
		value:Url+'/api/account/login',
		name:'用户登录',
		header:{'content-type':'application/json'},
		method:'POST',
		pages: [],
	},
	
	getOrders:{
		value:Url+'/api/volunteer/get-orders',
		name:'获取订单列表',
		header:{'content-type':'application/json'},
		method:'GET',
		pages: [],
	},
}

const MainPackage='/pages/GRZX';   //主包
const SubPackage='/pages_GRZX/pages/GRZX'; //分包
const Route={
	//主包里页面的路径
	addPassenger:{
		url:MainPackage+'/addPassenger',
		name:'添加乘车人页面',
	},
	
}

// 接口声明区
export default {
	Interface,
	Route
}