import Vue from 'vue'
import App from './App'
import Grzx from 'common/Grzx.js' //个人中心
import Ydpd from 'common/Ydpd.js' //移动派单
Vue.config.productionTip = false
Vue.prototype.$Grzx=Grzx;  //个人中心
Vue.prototype.$Ydpd=Ydpd;  //移动派单
App.mpType = 'app'


const app = new Vue({
    ...App
})
app.$mount()
