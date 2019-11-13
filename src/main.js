import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/assets/js/axios.config.js'
// 按需加载
import { Button, Icon, Field, Tabbar, TabbarItem, NavBar, Swipe, SwipeItem, List, Tab, Tabs, Uploader, RadioGroup, Radio, Stepper, Checkbox, CheckboxGroup, Cell, CellGroup, Row, Col, Popup, Search, PullRefresh, Toast, Notify,GoodsAction, GoodsActionIcon,GoodsActionButton,SubmitBar} from 'vant';
Vue.use(Button).use(Icon).use(Field).use(Tabbar).use(TabbarItem).use(NavBar).use(Swipe).use(SwipeItem)
  .use(List).use(Tab).use(Tabs).use(Uploader).use(RadioGroup).use(Radio).use(Stepper).use(Checkbox).use(Checkbox, CheckboxGroup).use(Cell).use(CellGroup).use(Row).use(Col).use(Popup).use(Search).use(PullRefresh).use(Toast).use(Notify)
  .use(GoodsAction).use(GoodsActionIcon).use(GoodsActionButton).use(SubmitBar)
Vue.prototype.$http = axios
Vue.config.productionTip = false
// 引入时间格式化 moment 定义全局过滤器
import Moment from 'moment'
Moment.locale('zh-cn')
Vue.filter('zctime', function (data) {
  return Moment(data).fromNow()
})
Vue.filter('convertTime', function(data, formatStr){
  return Moment(data).format(formatStr)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
