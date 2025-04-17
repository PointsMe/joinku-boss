<template>
    <el-container>
        <el-main class="login-container">
            <div class="login-box el-fade-in"
                 style="margin-top: 80px;">
                <div class="logo-block">
                    <img src="../assets/logo.png"
                         class="logo-img" />
                </div>
                <el-dropdown @command="changeLanguage"
                             style="position: absolute;top:10px;right:10px">
                    <el-button type="primary"
                               style="width:97px;background:#fff;color:#444;border:none">
                        {{language}}
                        <i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="zh-CN">中文简体</el-dropdown-item>
                        <el-dropdown-item command="en-US">English</el-dropdown-item>
                        <el-dropdown-item command="it">Italiano</el-dropdown-item>
                        <el-dropdown-item command="de">Deutsch</el-dropdown-item>
                        <el-dropdown-item command="fr">French</el-dropdown-item>
                        <el-dropdown-item command="es">Spanish</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- <div class="tabBox">
          <div
            class="tabChange"
            :class="{'tabBd':!loginType}"
            @click="changeLoign"
          >{{$t('common.yxdl')}}</div>
          <div
            class="tabChange"
            :class="{'tabBd':loginType}"
            @click="changeLoign2"
          >{{$t('common.sjhdl')}}</div>
        </div> -->
                <el-form size="large"
                         ref="loginForm"
                         :model="loginForm"
                         :rules="loginRules"
                         label-position="left"
                         label-width="0">
                    <div v-if="!loginType">
                        <el-form-item prop="loginName">
                            <el-input type="text"
                                      v-model.trim="loginForm.loginName"
                                      auto-complete="off"
                                      :placeholder="$t('common.qsrdlzh')"
                                      prefix-icon="fa fa-envelope"
                                      :autofocus="true"></el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password"
                                      v-model.trim="loginForm.password"
                                      auto-complete="on"
                                      :placeholder="$t('common.qsrdlmm')"
                                      prefix-icon="fa fa-key"
                                      @keyup.enter.native="submit"></el-input>
                        </el-form-item>
                    </div>
                    <div v-if="loginType">
                        <el-form-item prop="loginName" v-if="loginType">
                            <!-- <span class="svg-container svg-container_login">
                                <i class="fa fa-envelope-o fa-fw"></i>
                            </span> -->
                            <el-input style="width: 100%;" v-model="loginForm.loginName" autocomplete="on" :placeholder="$t('common.insertUsername')">
                                <template slot="append">{{ emailHz }}</template>
                            </el-input>
                        </el-form-item>
                        <!-- <el-form-item prop="mobile">
                            <AreaCode v-on:excountry="showCode"
                                      class="area"
                                      :areaHeight="height"></AreaCode>
                            <el-input v-model.trim="loginForm.mobile"
                                      auto-complete="off"
                                      :placeholder="$t('common.qsrsjh')"
                                      class="talSy"
                                      :autofocus="true"></el-input>
                        </el-form-item> -->
                        <el-form-item prop="password">
                            <el-input type="password"
                                      v-model.trim="loginForm.password"
                                      auto-complete="on"
                                      :placeholder="$t('common.qsrdlmm')"
                                      prefix-icon="fa fa-key"
                                      @keyup.enter.native="submit"></el-input>
                        </el-form-item>
                        <!-- <el-form-item prop="verificationCode">
              <el-input
                type="password"
                v-model.trim="loginForm.verificationCode"
                auto-complete="on"
                :placeholder="$t('common.qsryzm')"
                prefix-icon="fa fa-key"
                @keyup.enter.native="submit"
              ></el-input>
              <el-button
                @click="getCode"
                :disabled="time != $t('common.hqyzm')"
                class="getCod"
                size="mini"
              >{{time}}</el-button>
            </el-form-item> -->
                    </div>
                    <el-form-item style="width: 100%;margin-top: 16px;">
                        <el-button type="primary"
                                   @click.native.prevent="submit"
                                   style="width: 100%; font-size: 14px;padding: 12px;">{{$t('common.dl')}}</el-button>
                    </el-form-item>
                </el-form>
                <!-- <div style="margin-top: 30px;">
                <span>没有账号？</span>
                <router-link to="register" style="color: #409eff;">注册>></router-link>
        </div> -->
            </div>
        </el-main>
        <el-footer class="login-footer">
            <!--<a href="#">关于我们</a>-->
            <!--&nbsp;|&nbsp;-->
            <!--<a href="#">服务条款</a>-->
            <!--&nbsp;|&nbsp;-->
            <!--<a href="#">客服中心</a>-->
            <!--&nbsp;|&nbsp;-->
            <!--<a href="#">帮助中心</a>-->
            <!--&nbsp;|&nbsp;-->
            <!-- <span>©2019 SoFattura. All Rights Reserved.</span> -->
        </el-footer>
    </el-container>
</template>

<script>
import { getToken, setToken, removeToken, setLoginMsg } from "@/utils/auth";
import {isValidUsername} from "@/utils/validate";
import AreaCode from "../components/areaCode";
import {
    loginOn,
    loginQuickLogin,
    verificationCodeSend,
    supplierDetail,
    checkVerificationCode
} from "@/api/api";
import { commonRouterMap, constantRouterMap } from "@/router";
export default {
    data () {
        const validateCode = (rule, value, callback) => {
            if (!this.loginForm.mobile) {
                callback(new Error('请输入手机号！'));
            } else {
                var params = new URLSearchParams();
                params.append("account", this.nums + "-" + this.loginForm.mobile);
                params.append("verificationCode", this.loginForm.verificationCode);
                params.append("type", 104);
                checkVerificationCode(params).then(res => {
                    if (res.code != 20000) {
                        callback(new Error(res.msg));
                    } else {
                        callback();
                    }
                });
            }
        };
        const validateUsername = (rule, value, callback) => {
            if (!isValidUsername(value)) {
                callback(new Error(this.$t('common.insertUsername')));
            } else {
                callback();
            }
        };
        return {
            time: this.$t("common.hqyzm"),
            loginType: true,
            language: "中文简体",
            nums: "",
            height: "34px",
            times: null,
            loginRules: {
                loginName: [
                    {required: true, trigger: "blur", validator: validateUsername}
                ],
                username: [
                    {
                        required: true,
                        message: this.$t("common.qsrdlzh"),
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 200,
                        message: this.$t("common.validateLength6_18"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("common.qsrmm"),
                        trigger: "blur"
                    },
                    {
                        min: 6,
                        max: 18,
                        message: this.$t("common.validateLength6_18"),
                        trigger: "blur"
                    }
                ],
                mobile: [
                    {
                        required: true,
                        message: this.$t("common.qsrsjh"),
                        trigger: "blur"
                    }
                ],
                verificationCode: [
                    {
                        required: true,
                        message: this.$t("common.qsryzm"),
                        trigger: "blur"
                    },
                    { validator: validateCode, trigger: "blur" },
                ]
            },
            checked: true,
            loginForm: {
                loginName: "",
                password: "",
                mobile: "",
                verificationCode: ""
            },
            emailHz: '@pointsme.it',
            loading: false
        };
    },
    mounted () {
        this.getLanguage();
        this.$store.dispatch("LogOut").then(resp => { });
    },
    components: {
        AreaCode
    },
    methods: {
        goToPsw () {
            this.$router.push({ path: '/password' })
        },
        showCode (data) {
            this.nums = data.dialCode;
        },
        changeLoign () {
            this.loginType = false;

            this.loginForm.mobile = "";
            this.loginForm.verificationCode = "";
        },
        changeLoign2 () {
            this.loginType = true;
            this.loginForm.username = "";
            this.loginForm.password = "";
        },
        getCode () {
            var _this = this;

            if (_this.nums == "") {
                _this.$message.error(_this.$t("common.qxzgjqh"));
                return;
            }

            _this.$refs["loginForm"].validateField("mobile", err => {
                if (!err) {
                    _this.compute();
                    var params = new URLSearchParams();
                    params.append("account", _this.nums + "-" + _this.loginForm.mobile);
                    params.append("type", "104");
                    verificationCodeSend(params)
                        .then(resp => {
                            if (resp.code === 20000) {
                            } else {
                                _this.$message.error(resp.msg);
                            }
                        })
                        .catch(error => {
                            clearInterval(_this.times);
                            _this.times = null;

                            _this.time = _this.$t("common.hqyzm");
                            _this.$message.error(error.data);
                        });
                }
            });
        },
        compute () {
            this.time = 60;
            this.times = setInterval(() => {
                this.time--;
                if (this.time == 0) {
                    clearInterval(this.times);
                    this.time = this.$t("common.hqyzm");
                }
            }, 1000);
        },
        submit: function () {
            var that = this;
            if (that.loginType) {
                this.$refs.loginForm.validate(valid => {
                    if (valid) {
                        this.loading = true;
                        // let params = { ...this.loginForm };
                        // params.mobile = this.nums + '-' + this.loginForm.mobile;
                        let params = {
                            account: this.loginType ? (this.loginForm.loginName + this.emailHz) : (this.nums + '-' + this.loginForm.mobile),
                            password: this.loginForm.password
                        };
                        this.$store
                            .dispatch("Login", params)
                            .then(res => {
                                this.loading = false;
                                if (
                                    JSON.parse(window.localStorage.getItem("perms")).indexOf(
                                        "home"
                                    ) >= 0
                                ) {
                                    this.$router.push({ path: "homes/home" });
                                } else {
                                    this.$router.push({ path: "/" });
                                    // this.goFn();
                                }
                            })
                            .catch(() => {
                                this.loading = false;
                            });
                    } else {
                        this.loading = false;
                        return false;
                    }
                });
            } else {
                this.$refs["loginForm"].validateField("mobile", err => {
                    if (err) {
                        this.loading = false;
                    } else {
                        this.$refs["loginForm"].validateField("verificationCode", error => {
                            if (error) {
                                this.loading = false;
                            } else {
                                var para = new URLSearchParams();
                                para.append("account", this.nums + "-" + this.loginForm.mobile);
                                para.append(
                                    "verificationCode",
                                    this.loginForm.verificationCode
                                );

                                loginQuickLogin(para)
                                    .then(res => {
                                        this.loading = false;
                                        if (res && res.code === 20000) {
                                            setToken(res.data.token);
                                            this.$store.commit("SET_TOKEN", res.data.token);
                                            this.$store.commit("SET_LoginInfo", res.data.account);
                                            this.$store.commit("SET_PERMS", res.data.account.perms);
                                            // commit('SET_NAME', data.entity.username);
                                            // localStorage.setItem('email', username);
                                            localStorage.setItem(
                                                "loginInfo",
                                                JSON.stringify(res.data.account)
                                            );
                                            localStorage.setItem(
                                                "perms",
                                                JSON.stringify(res.data.account.perms)
                                            );
                                            supplierDetail().then(res => {
                                                if (res.code === 20000) {
                                                    this.$store.commit("SET_IMAGE", res.data.logoUrl);
                                                    localStorage.setItem("image", res.data.logoUrl);
                                                }
                                            });
                                            // this.$router.push({ path: "homes/home" });
                                            this.goFn();
                                        } else {
                                            this.$message.error(res.msg);
                                        }
                                    })
                                    .catch(error => { });
                            }
                        });
                    }
                });
            }
        },
        goFn () {
            let box = [];
            for (var i = 0; i < constantRouterMap.length; i++) {
                if (
                    constantRouterMap[i].meta &&
                    constantRouterMap[i].meta.roles &&
                    constantRouterMap[i].meta.roles[0]
                ) {
                    box.push(constantRouterMap[i].meta.roles[0]);
                }
            }

            let pem = JSON.parse(window.localStorage.getItem("perms"));
            let pemFlag = false;
            for (var i = 0; i < box.length; i++) {
                if (pem.indexOf(box[i]) >= 0) {
                    pemFlag = true;
                    let child = [];
                    for (var j = 0; j < constantRouterMap[i + 2].children.length; j++) {
                        child.push(constantRouterMap[i + 2].children[j].meta.roles[0]);
                    }
                    for (var k = 0; k < child.length; k++) {
                        if (pem.indexOf(child[k]) >= 0) {
                            this.$router.push({
                                path:
                                    constantRouterMap[i + 2].path +
                                    "/" +
                                    constantRouterMap[i + 2].children[k].path
                            });
                            break;
                        }
                    }
                    break;
                }
            }

            if (!pemFlag) {
                this.$message.error("You don" + "'" + "t have permission");
                throw new Error("角色权限分配不完整！");
            }
        },
        changeLanguage (command) {
            this.$i18n.locale = command;
            if (command == "zh-CN") {
                this.language = "中文简体";
            } else if (command == "it") {
                this.language = "Italiano";
            } else if (command == "en-US") {
                this.language = "English";
            } else if (command == "de") {
                this.language = "Deutsch";
            } else if (command == "fr") {
                this.language = "French";
            } else if (command == "es") {
                this.language = "Spanish";
            }
            localStorage.setItem("DefaultLanguage", this.$i18n.locale);
            this.time = this.$t("common.hqyzm");
        },
        getLanguage () {
            if (localStorage.getItem("DefaultLanguage")) {
                if (localStorage.getItem("DefaultLanguage") == "it") {
                    this.language = "Italiano";
                } else if (localStorage.getItem("DefaultLanguage") == "zh-CN") {
                    this.language = "中文简体";
                } else if (localStorage.getItem("DefaultLanguage") == "en-US") {
                    this.language = "English";
                } else if (localStorage.getItem("DefaultLanguage") == "de") {
                    this.language = "Deutsch";
                } else if (localStorage.getItem("DefaultLanguage") == "fr") {
                    this.language = "French";
                } else if (localStorage.getItem("DefaultLanguage") == "es") {
                    this.language = "Spanish";
                }
            } else {
                this.language = "中文简体";
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.login-container {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #f6f6f6;
}

.login-box {
    position: relative;
    /*position: absolute;*/
    /*height: 568px;*/
    width: 520px;
    text-align: center;
    background-color: #fff;
    margin: 0 auto;
    /*margin: auto auto auto -240px;*/
    padding: 44px 92px 50px 92px;
    /*bottom: 0;
  top: 0;
  left: 50%;*/
}

.login-box .el-input__inner {
    line-height: 40px;
    height: 40px;
    font-size: 14px;
}

.logo-block {
    margin-bottom: 20px;
}

.logo-block .logo-img {
    width: 300px;
}

.login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 35px !important;
    line-height: 25px !important;
    padding: 5px !important;
    text-align: center;
    overflow: hidden;
    background: #fff;
    color: #666;
    font-size: 12px;
}

.login-footer a {
    color: #666;
    text-decoration: none;
}

.login-footer a:hover {
    color: #409eff;
}
.tabBox {
    margin-bottom: 35px;
    border: 1px solid #f6f6f6;
    display: flex;
    justify-content: space-between;
}
.tabChange {
    width: 50%;
    line-height: 40px;
    cursor: pointer;
}
.tabBd {
    background: #f6f6f6;
}
.getCod {
    position: absolute;
    top: 2px;
    right: 1px;
    border: none !important;
    padding: 11px 8px !important;
}
</style>
