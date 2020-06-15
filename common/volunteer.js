const Url = 'https://xmjdt.cn:10022'; //https请求

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
	uploadFile:{
		value:Url+'/api/file/upload-base64',
		name:'上传签名文件',
		method:'POST',
		pages: [],
	},
}
const GetImage={
	url:'https://zntc.145u.net:9099/api/zhcx/GetImage',
	name:'获取图片',
	method:'POST',
	pages: [],
}




// 接口声明区
export default {
	Interface,
	GetImage
}