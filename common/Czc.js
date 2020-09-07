/* 接口参数区 */
// 示例

//接口域名
const Url = 'https://qzcln.com:10022';//许接口地址
const Url1 = 'https://szh.ipin8.com:3507';//叶接口地址
//接口对象
const Interface = {
	//世中会司机端----------------------------------
	callPolice :{
		value:Url + '/api/volunteer/call-police',
		name:'司机端一键报警',
		method:'GET',
		pages:[]
	},
	origin:{
		value:Url + '/api/driver/origin',
		name:'到达出发地',
		method:'GET',
		pages:[]
	},
	confirmBoarding:{
		value:Url + '/api/driver/confirm_boarding',
		name:'确认乘客上车',
		method:'GET',
		pages:[]
	},
	driverLeaves:{
		value:Url + '/api/driver/driver-leaves',
		name:'司机出发',
		method:'GET',
		pages:[]
	},
	getOrderDetail:{
		value:Url + '/api/driver/get-order-detail',
		name:'获取订单详情',
		method:'GET',
		pages:[]
	},
	getOrders :{
		value:Url + '/api/driver/get-orders',
		name:'获取可接单列表',
		method:'GET',
		pages:[],
	},
	getOrdersDriver:{
		value:Url + '/api/driver/get-orders-driver',
		name:'根据司机ID获取司机所属订单列表',
		method:'GET',
		pages:[]
	},
	receivingOrder:{
		value:Url + '/api/driver/receiving-order',
		name:'接单',
		method:'GET',
		pages:[]
	},
	rejectOrder:{
		value:Url + '/api/driver/reject-order',
		name:'拒接',
		method:'GET',
		pages:[]
	},
	/* reportAddress:{
		value:Url + '/api/driver/report-address',
		name:'司机端持续上报经纬度',
		method:'POST',
		pages:[]
	}, */
	terminus:{
		value:Url + '/api/driver/terminus',
		name:'到达目的地',
		method:'GET',
		pages:[]
	},
	track:{
		value:Url + '/api/driver/track',
		name:'获取起点到终点轨迹点',
		method:'GET',
		pages:[]
	}, 
	offLine:{
		value:Url + '/api/driver/offLine',
		name:'下班',
		method:'GET',
		pages:[]
	},
	onLine:{
		value:Url + '/api/driver/onLine',
		name:'上班',
		method:'GET',
		pages:[]
	},
	getCommutingList:{
		value:Url + '/api/driver/get-commuting-list',
		name:'获取司机上下班打卡记录',
		method:'GET',
		pages:[]
	},
	
	reportAddress:{
		value:Url1 + '/api/szh/report_address',
		name:'司机端持续上报经纬度',
		method:'POST',
		pages:[]
	},
	saveDriverRemark:{
		value:Url + '/api/driver/save-driver-remark',
		name:'保存司机备注',
		method:'POST',
		pages:[]
	}
}

export default {
	Interface,
}
