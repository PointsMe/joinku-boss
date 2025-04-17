import axios from "axios";
import {
  Message,
  MessageBox,
  Loading
} from "element-ui";
import store from "../store";
import {
  getToken
} from "@/utils/auth";
// 定义loading变量
let loading;

function startLoading() {
  // 使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: "Loading……",
    background: "rgba(255,255,255,0)",
    target: document.querySelector(".app-main")
  });
}

function endLoading() {
  // 使用Element loading-close 方法
  loading.close();
}

// 那么 showFullScreenLoading() tryHideFullScreenLoading() 要干的事儿就是将同一时刻的请求合并。
// 声明一个变量 needLoadingRequestCount，每次调用showFullScreenLoading方法 needLoadingRequestCount + 1。
// 调用tryHideFullScreenLoading()方法，needLoadingRequestCount - 1。needLoadingRequestCount为 0 时，结束 loading。
let needLoadingRequestCount = 0;

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading();
  }
  needLoadingRequestCount++;
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return;
  needLoadingRequestCount--;
  if (needLoadingRequestCount === 0) {
    endLoading();
  }
}

// const tryCloseLoading = () => {
//   if (needLoadingRequestCount === 0) {
//     loading.close();
//   }
// };

function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

function guid() {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
}

var uuid = guid();
// 获取浏览器的语言
const getChromeLanguage = () => {
  var type = navigator.appName;
  if (type === "Netscape") {
    var lang = navigator.language; // 获取浏览器配置语言，支持非IE浏览器
  } else {
    var lang = navigator.userLanguage; // 获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
  }
  return lang.substr(0, 2);
};
// 判断前端传过来的参数个数
const checkNumOfParams = data => {
  if (data) {
    return Object.keys(data).length;
  } else {
    return 0;
  }
};
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // baseURL: "http://192.168.1.101:21884",
  // baseURL: "http://boss.pmall.ngrok.saonian.org",
  // baseURL: "https://boss.joyingo.com",
  timeout: 50000000 // 请求超时时间
  // headers: {
  //   'Content-Type': 'application/json'
  // }
});

// request拦截器
service.interceptors.request.use(
  config => {
   
    // 已登录
    if (getToken()) {
      config.headers = {
        ...config.headers,
        Authorization: getToken(),
        "X-Device-Id": uuid,
        "Accept-Language": localStorage.getItem('DefaultLanguage')
      };
    } else {
      // 未登录
      config.headers = {
        ...config.headers,
        "X-Device-Id": uuid,
        "Accept-Language": localStorage.getItem('DefaultLanguage')
      };
    }

    checkNumOfParams(config.data);

    if (config.url != "region/province/list") {
      // showFullScreenLoading();
    }

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    tryHideFullScreenLoading();
    if (res.code !== 20000) {
      // // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      // if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
      //   MessageBox.confirm(
      //     "你已被登出，可以取消继续留在该页面，或者重新登录",
      //     "确定登出",
      //     {
      //       confirmButtonText: "重新登录",
      //       cancelButtonText: "取消",
      //       type: "warning"
      //     }
      //   ).then(() => {
      //     store.dispatch("FedLogOut").then(() => {
      //       location.reload(); // 为了重新实例化vue-router对象 避免bug
      //     });
      //   });
      // } else
      if (res.code === 81003) {
        MessageBox.alert(res.msg, {
          confirmButtonText: '确定',
          callback: action => {

          }
        });
      }
      if (res.code == 40001) {
        // 登陆过期
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出", {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("LogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }
      return response.data;
      // return Promise.reject('error')
    } else {
      return response.data;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    tryHideFullScreenLoading();
    return Promise.reject(error);
  }
);



export default service;
