/* 接口参数区 */
// 示例

//接口域名
const Url = 'https://zntc.145u.net:9099';
const Url1 = 'http://36.148.9.1:10022';

const InterfaceAddress = [
	//根据起终点经纬度获取线路规划
	//使用页面 - /CZC/CallAndDrive - 
	Url +'/api/zhcx/getPlanningLineByLonLat',
	//获取所有车辆定位数据
	Url +'/api/zhcx/getAllVehiclePosition',
	//根据经纬度获取附近一定范围的经纬度
	Url +'/api/zhcx/getLonLatRangeVehiclePosition',
]





//接口对象
const Interface = {
	//世中会司机端----------------------------------
	callPolice :{
		value:Url1 + '/api/driver/call-police',
		name:'司机端一键报警',
		method:'GET',
		pages:[]
	},
	confirmBoarding:{
		value:Url1 + '/api/driver/confirm_boarding',
		name:'确认乘客上车',
		method:'GET',
		pages:[]
	},
	driverLeaves:{
		value:Url1 + '/api/driver/driver-leaves',
		name:'司机出发',
		method:'GET',
		pages:[]
	},
	getOrderDetail:{
		value:Url1 + '/api/driver/get-order-detail',
		name:'获取订单详情',
		method:'GET',
		pages:[]
	},
	getOrders :{
		value:Url1 + '/api/driver/get-orders',
		name:'获取可接单列表',
		method:'GET',
		pages:[],
	},
	getOrdersDriver:{
		value:Url1 + '/api/driver/get-orders-driver',
		name:'根据司机ID获取司机所属订单列表',
		method:'GET',
		pages:[]
	},
	receivingOrder:{
		value:Url1 + '/api/driver/receiving-order',
		name:'接单',
		method:'GET',
		pages:[]
	},
	rejectOrder:{
		value:Url1 + '/api/driver/reject-order',
		name:'拒接',
		method:'GET',
		pages:[]
	},
	reportAddress:{
		value:Url1 + '/api/driver/report-address',
		name:'司机端持续上报经纬度',
		method:'GET',
		pages:[]
	},
	terminus:{
		value:Url1 + '/api/driver/terminus',
		name:'到达目的地',
		method:'GET',
		pages:[]
	},
	track:{
		value:Url1 + '/api/driver/track',
		name:'获取起点到终点轨迹点',
		method:'GET',
		pages:[]
	},
	
	//综合出行司机端---------------------------------
	GetCanReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/GetCanReceiptExpressOrder_Driver',
		name: '司机端-出租车-获取可接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	ReceiptExpressOrder_Driver: {
		value: Url + '/api/taxi/ReceiptExpressOrder_Driver',
		name: '司机端-出租车-接单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	CancelExpressOrderByOrderNum_Driver: {
		value: Url + '/api/taxi/CancelExpressOrderByOrderNum_Driver',
		name: '司机端-出租车-取消订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver','/index/Order']
	},
	RefuseExpressOrderByOrderNumDriverID_Driver: {
		value: Url + '/api/taxi/RefuseExpressOrderByOrderNumDriverID_Driver',
		name: '司机端-出租车-拒接订单',
		method: 'POST', //GET-POST
		pages: ['/driver/taxiDriver']
	},
	InputAmountExpressOrder_Driver: {
		value: Url + '/api/taxi/InputAmountExpressOrder_Driver',
		name: '司机端-出租车-订单支付',
		method: 'POST', //GET-POST
		pages: ['/driver/otherExpenses']
	},
	GetExpressOrderByOrderNumber_Driver:{
		value:Url + '/api/taxi/GetExpressOrderByOrderNumber_Driver',
		name:'司机端-出租车-根据司机Id和订单Id获取订单详情',
		method:'POST',
		page:['/dirver/confirmgetonCar','/driver/orderDetail']
	},
	RunExpressOrder_Driver:{
		value:Url + '/api/taxi/RunExpressOrder_Driver',
		name:'司机端-出租车-长按确认乘客上车',
		method:'POST',
		page:['/dirver/confirmgetonCar']
	},
	FinishExpressOrder_Driver:{
		value:Url + '/api/taxi/FinishExpressOrder_Driver',
		name:'司机端-出租车-长按到达目的地',
		method:'POST',
		page:['/dirver/confirmgetonCar','/index/Order']
	},
	SetoutExpressOrder_Driver:{
		value:Url + '/api/taxi/SetoutExpressOrder_Driver',
		name:'司机端-出租车-长按发车',
		method:'POST',
		page:['/index/Order']
	},
	GetExpressOrderCountByDriverID_Driver:{
		value:Url + '/api/taxi/GetExpressOrderCountByDriverID_Driver',
		name:'司机端-出租车-统计接单量',
		method:'POST',
		page:['/driver/taxiDriver']
	},
	InputAmountExpressOrderNeedPay_Driver:{
		value:Url + '/api/taxi/InputAmountExpressOrderNeedPay_Driver',
		name:'司机端-出租车-统计接单量',
		method:'POST',
		page:['/driver/taxiDriver']
	},
	GetExpressOrderCountRevenueByDriverID_Driver:{
		value:Url + '/api/taxi/GetExpressOrderCountRevenueByDriverID_Driver',
		name:'司机端-出租车-营收',
		method:'POST',
		page:[]
	},
	QueryTaxiExpressOrderByDriverIDAndDate_Passenger:{
		value:Url + '/api/taxi/QueryTaxiExpressOrderByDriverIDAndDate_Passenger',
		name:'司机端-出租车-营收详情',
		method:'POST',
		page:[]
	},
}

export default {
	InterfaceAddress,
	Interface,
}
