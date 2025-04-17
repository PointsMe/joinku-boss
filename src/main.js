import Vue from "vue";
import axios from "axios";
import ElementUI from "element-ui";
import echarts from "echarts";
// import "element-ui/lib/theme-chalk/index.css";
// import locale from 'element-ui/lib/locale/lang/en'
// global css
import "@/styles/index.scss";
import App from "./App";
import router from "./router";
import store from "./store";
// icon
import "@/icons";
import i18n from "./lang";

// 引入自定义指令
import '@/utils/directives.js'

// 引入字体图标样式
// import "@/assets/css/font-awesome.min.css";
// import VueHtmlToPaper from "vue-html-to-paper";
import permission from "./permission";
import { message } from "@/utils/resetMessage.js";
 import Print from 'vue-print-nb'
Vue.use(Print);  //注册
// Vue.use(ElementUI, { locale })
Vue.prototype.$echarts = echarts;
Vue.use(ElementUI, {
  size: "mini", // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
});
// Vue.use(ElementUI);

// 引入qs
import qs from 'qs'
// 注册qs
Vue.prototype.$qs = qs

import GoogleMapsLoader from "google-maps";
GoogleMapsLoader.URL = "https://maps.googleapis.com/maps/api/js";
GoogleMapsLoader.LIBRARIES = ["geometry", "places", "drawing"];
GoogleMapsLoader.KEY = "AIzaSyBCYome9V8usj0pctJ4PFPHPysGKtgHOyE";
GoogleMapsLoader.LANGUAGE = "en";
GoogleMapsLoader.REGION = "id";
Vue.prototype.GoogleMapsLoader = GoogleMapsLoader;

Vue.prototype.$message = message;
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

window.eventBus = new Vue();

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  template: "<App/>",
  components: {
    App
  }
});
