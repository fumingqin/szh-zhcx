const Url = 'http://36.148.9.1:10022'; //https请求

const Interface={
	getlines:{
		value:Url+'/api/volunteer/get-lines',
		name:'获取志愿者站点',
		method:'GET',
		pages: [],
	},
	
}




// 接口声明区
export default {
	Interface,
}