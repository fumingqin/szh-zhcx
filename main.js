import Vue from 'vue'
import App from './App'
import Grzx from 'common/Grzx.js' //个人中心
import volunteer from './common/volunteer.js' //志愿者
import Ydpd from 'common/Ydpd.js' //移动派单
import taxi from './common/Czc.js'//司机端
import order from '@/common/Order.js'
Vue.config.productionTip = false
Vue.prototype.$Grzx=Grzx;  //个人中心
Vue.prototype.$volunteer=volunteer;  //志愿者
Vue.prototype.$Ydpd=Ydpd;  //移动派单
Vue.prototype.$taxi=taxi;  //司机端
Vue.prototype.$order=order;  //移动派单
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
