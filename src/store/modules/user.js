import {
  loginOn,
  loginOut,
  supplierDetail
} from "@/api/api";
import Vue from "vue";
import {
  getToken,
  setToken,
  removeToken,
  setLoginMsg
} from "@/utils/auth";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    perms: [],
    loginInfo: localStorage.getItem("loginInfo"),
    image: ""
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_LoginInfo: (state, loginInfo) => {
      state.loginInfo = loginInfo;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMS: (state, perms) => {
      state.perms = perms;
    },
    SET_IMAGE: (state, perms) => {
      state.image = perms;
    }
  },

  actions: {
    // 登录
    Login({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        // setToken('43oierjo3434lk');
        // resolve()
        // return
        var params = new URLSearchParams();
        params.append("account", userInfo.account);
        params.append("password", userInfo.password);
        loginOn(params)
          .then(response => {
            if (response.code === 20000) {
              const data = response.data;
              setToken(data.token);
              commit("SET_TOKEN", data.token);
              commit("SET_LoginInfo", data.account);
              commit("SET_PERMS", data.account.perms);
              // localStorage.setItem(
              //   "loginInfo",
              //   JSON.stringify(response.data.account)
              // );
              localStorage.setItem(
                "perms",
                JSON.stringify(response.data.account.perms)
              );
              // supplierDetail().then(res => {
              //   if (res.code === 20000) {
              //     commit("SET_IMAGE", res.data.logo);
              //     commit("SET_NAME", res.data.name);
              //     // localStorage.setItem("image", res.data.logo);
              //     localStorage.setItem("supplierInfo", JSON.stringify(res.data));
              //   }
              // });
            } else {
              let $el = new Vue();
              $el.$message.error(response.msg);
            }
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    // 获取用户信息
    GetInfo({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit('SET_ROLES', [101])
        // commit("SET_ROLES", JSON.parse(localStorage.getItem("perms")));
        var userInfo = JSON.parse(localStorage.getItem("supplierInfo"));
        if (userInfo) {
          commit("SET_NAME", userInfo.name);
          commit("SET_IMAGE", userInfo.logo);
        }
        // console.log('===> GetInfo' + userInfo.userType)
        // if (userInfo.userType === 101) {

        // commit(
        //   "SET_AVATAR",
        //   "https://www.pointsme.it/static/home/images/favicon.png"
        // );
        // } else if (userInfo.userType === 102) {
        //   commit('SET_ROLES', [102])
        // } else if (userInfo.userType === 103) {
        //   commit('SET_ROLES', [103])
        // }
        resolve();
      });
    },

    // 登出
    LogOut({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        commit("SET_TOKEN", "");
        commit("SET_ROLES", []);
        commit("SET_PERMS", []);
        commit("SET_IMAGE", '');

        removeToken();
        resolve();
        return;
        loginOut()
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
            // window.location.reload()
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;