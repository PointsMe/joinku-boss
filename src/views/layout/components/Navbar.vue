<template>
    <div class="navbar">
        <div class="lisBoxSy">
            <div class="svgBox">
                <svg
                  t="1492500959545"
                  @click="toggleClick"
                  class="svg-icon hamburger"
                  :class="{'is-active':!sidebar.opened}"
                  style
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="1691"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  width="64"
                  height="64"
                >
                  <path
                    d="M966.8023 568.849776 57.196677 568.849776c-31.397081 0-56.850799-25.452695-56.850799-56.850799l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 543.397081 998.200404 568.849776 966.8023 568.849776z"
                    p-id="1692"
                  />
                  <path
                    d="M966.8023 881.527125 57.196677 881.527125c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.849776 56.850799-56.849776l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.849776l0 0C1023.653099 856.07443 998.200404 881.527125 966.8023 881.527125z"
                    p-id="1693"
                  />
                  <path
                    d="M966.8023 256.17345 57.196677 256.17345c-31.397081 0-56.850799-25.452695-56.850799-56.849776l0 0c0-31.397081 25.452695-56.850799 56.850799-56.850799l909.605623 0c31.397081 0 56.849776 25.452695 56.849776 56.850799l0 0C1023.653099 230.720755 998.200404 256.17345 966.8023 256.17345z"
                    p-id="1694"
                  />
                </svg>
            </div>
          <!-- <div  class="x-l-sy">{{generateTitle(item.meta.title)}}</div> -->
            <div class="list hide-scroll" v-if="childrenList.length > 1">
                <a class="nav-item" v-if="!item.hidden" :class="{'active':$route.name.includes(item.name)}" :href="'#' + resolvePath(item.path)" v-for="(item,$index) in childrenList" :key="$index">{{generateTitle(item.meta.title)}}</a>
            </div>
            <div class="header-right">
                <div class="header-user-con">
                    <!-- 消息中心 -->
                    <!-- <div class="btn-bell" style="cursor: pointer;margin-top: 6px;" @click="showMessageCenter">
                        <el-badge :value="msgUnread" class="item">
                            <i class="el-icon-bell" style="font-size: 20px;"></i>
                        </el-badge>
                    </div> -->
                    <!-- 用户头像 -->
                    <div class="user-avator">
                        <el-image :src="userInfo.avatar" class="image" fit="cover" style="border-radius: 50%; width: 30px;height: 30px;text-align: center;">
                            <div slot="error" class="image-slot">
                                <img src="../../../assets/images/default.png" style="width: 30px;height: 30px;border-radius: 50%;" />
                            </div>
                        </el-image>
                         <!-- <el-avatar :src="userInfo.avatar"></el-avatar> -->
                    </div>
                    <!-- 用户名下拉菜单 -->
                    <el-dropdown class="user-name" @command="userCommand">
                        <span class="el-dropdown-link">
                            {{userInfo.username}}
                            <i class="el-icon-caret-bottom"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item divided command="username"><i class="fa fa-user-o"></i>&nbsp; 修改用户名</el-dropdown-item>
                            <el-dropdown-item divided command="avatar"><i class="fa fa-user-circle"></i>&nbsp; 修改头像</el-dropdown-item>
                            <el-dropdown-item divided command="password"><i class="fa fa-lock"></i>&nbsp; 修改密码</el-dropdown-item>
                            <el-dropdown-item divided command="mobile"><i class="fa fa-mobile"></i>&nbsp; 修改手机号码</el-dropdown-item>
                            <el-dropdown-item divided command="logout"><i class="fa fa-power-off"></i>&nbsp; {{$t('common.zhuxiao')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </div>

          <!-- <div class="user">
            <el-dropdown @command="userCommand">
              <div class="el-dropdown-link" style="display: flex;align-items: center">
                <div
                  style="color: rgba(0, 0, 0, 0.8);white-space: pre-wrap;border:1px solid rgba(0, 0, 0, 0.5);border-radius: 2px;padding: 4px;font-size: 14px;"
                >{{$t('common.cz')}}</div>
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="logout" divided>
                  <i class="fa fa-power-off"></i>
                  &nbsp; {{$t('common.zhuxiao')}}
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div> -->
          <!-- <div class="info">
            <el-badge :value="3" class="item">
              <i class="el-icon-bell" style="font-size: 20px;"></i>
            </el-badge>
          </div> -->
        </div>
        <el-dialog  :visible.sync="showOp" width="30%" :close-on-click-modal="false" :show-close="true" :close-on-press-escape="false">
            <div slot="title">
                <span v-if="chooseItem == 'username'">修改用户名</span>
                <span v-if="chooseItem == 'avatar'">修改头像</span>
                <span v-if="chooseItem == 'password'">修改密码</span>
                <span v-if="chooseItem == 'mobile'">修改手机号码</span>
            </div>
            <div class="center">
                <el-form :rules="formRules" :model="form" ref="form" label-width="100px">
                    <template v-if="chooseItem == 'avatar'">
                        <el-upload
                            class="avatar-uploader"
                            :show-file-list="false"
                            action=""
                            :http-request="httpRequest"
                            accept="image/jpg,image/jpeg,image/png,image/gif">
                            <img :src="form.imageUrl" class="avatar" v-if="form.imageUrl">
                            <div class="avatar-icon">
                                <i class="el-icon-delete" @click.stop="handleRemoveImage" v-if="form.imageUrl"></i>
                                <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                            </div>
                        </el-upload>
                    </template>
                    <template v-if="chooseItem == 'username'">
                        <el-form-item label="用户名" prop="username">
                            <el-input size="middle" v-model="form.username" placeholder="长度不超过100个字符" maxlength="100" show-word-limit></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="chooseItem == 'password'">
                        <el-form-item label="旧密码" prop="oldPassword">
                            <el-input v-model="form.oldPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="newPassword">
                            <el-input v-model="form.newPassword" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="确认密码" prop="pwd">
                            <el-input v-model="form.pwd" type="password"></el-input>
                        </el-form-item>
                    </template>
                    <template v-if="chooseItem == 'mobile'">
                        <el-form-item label="手机号" prop="mobile" class="regiseter">
                            <AreaCode v-on:excountry="showCode" class="area" :areaHeight="height"></AreaCode>
                            <el-input v-model="form.mobile" class="mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码" prop="verificationCode">
                            <el-input v-model="form.verificationCode" placeholder="请输入验证码">
                                <template slot="append">
                                    <el-link type="success" @click="getCode" :disabled="time != $t('common.hqyzm')">{{time}}</el-link>
                                </template>
                            </el-input>
                        </el-form-item>
                    </template>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="showOp = false">取消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </span>
        </el-dialog>
        <el-dialog  :visible.sync="showMessage" width="50%" :modal="false" :close-on-click-modal="false" :close-on-press-escape="false"  class="messageDia" :show-close="false">
            <div class="msgHead">
                <span class="title">
                    消息中心
                </span>
                <span class="close" style="position: absolute;right: 20px;font-size: 20px;cursor: pointer;" @click="closeDialog"><i class="el-icon-circle-close"></i></span>
            </div>
            <div class="msgList">
                <ul class="msgCont">
                    <li class="msgItem" v-for="(item,$index) in messageList" :key="$index">
                        <div class="tp">
                            <span class="type">
                                {{item.title}}
                            </span>
                            <span class="time">
                                {{item.createdAt | timeChange}}
                            </span>
                        </div>
                        <div class="bt">
                            <span class="btContent">
                                {{item.content}}
                            </span>
                            <!-- <span class="arrow">
                                <i class="el-icon-arrow-right"></i>
                            </span> -->
                        </div>
                    </li>
                </ul>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    layout="total, prev, pager, next"
                    :total="totalCount"
                ></el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    userDetail,
    usernameUpdate,
    avatarUpdate,
    avatarUpload,
    pswUpdate,
    mobileUpdate,
    checkMobile,
    checkVerificationCode,
    verificationCodeSend,
    messageList,
    messageUnread,
    messageRead,
} from "@/api/api";
import AreaCode from "@/components/areaCode";
import { mapGetters } from 'vuex'
import path from "path";
import { generateTitle } from "@/utils/i18n";
import {uploadMenuImg} from "../../../api/api";
var moment = require("moment");
export default {
  components: {
    AreaCode
  },
  data() {
    const validatePwd = (rule, value, callback) => {
        if(value != this.form.newPassword){
            callback(new Error('确认密码不一致！'));
        }else{
          callback();
        }
    };
    const validateCode = (rule, value, callback) => {
        if(!this.form.mobile){
            callback(new Error('请输入手机号！'));
        }else{
            var params = new URLSearchParams();
            params.append("account", this.nums + "-" + this.form.mobile);
            params.append("verificationCode", this.form.verificationCode);
            params.append("type", 103);
            checkVerificationCode(params).then(res => {
                if(res.code != 20000){
                    callback(new Error(res.msg));
                }else{
                    callback();
                }
            });
        }
    };
    const validateMobile = (rule, value, callback) => {
        var params = new URLSearchParams();
        params.append("account", this.nums + "-" + this.form.mobile);
        checkMobile(params).then(res => {
            if(res.data.duplicate){
                callback(new Error('手机号重复！'));
            }else{
                callback();
            }
        });
    };
    return {
        // logo,
        height:'30px',
        item: "",
        childrenList: [],
        userInfo:{
            avatar:'',
            username:'',
        },
        showOp:false,
        chooseItem:'',
        form:{
            oldPassword:'',
            newPassword:'',
            pwd:'',
            username:'',
            imageUrl:'',
            mobile:'',
            verificationCode:'',
        },
        formRules:{
            username: [
                { required: true, message: this.$t("common.qsrnr"),trigger: "blur"}
            ],
            // imageUrl: [
            //     { required: true, message: '请选择图片',trigger: "change"}
            // ],
            oldPassword: [
                { required: true, message: this.$t("common.qsrnr"), trigger: "blur" }
            ],
            newPassword: [
                { required: true, message: this.$t("common.qsrnr"), trigger: "blur" }
            ],
            pwd: [
                { required: true, message: this.$t("common.qsrnr"), trigger: "blur" },
                { validator: validatePwd, trigger: "blur" },
            ],
            mobile:[
                { required: true, message: this.$t("common.qsrsjh"), trigger: "blur"},
                { validator: validateMobile, trigger: "blur" },
            ],
            verificationCode:[
                { required: true, message: this.$t("common.qsryzm"), trigger: "blur"},
            { validator: validateCode, trigger: "blur" },
            ],
        },
        nums:'',
        time: this.$t("common.hqyzm"),
        times:null,
        messageList:[],
        //默认数据总数
        totalCount: 0,
        //当前页码
        currentPage: 1,
        //默认每页数据量 €
        pagesize: 15,
        showMessage:false,
        msgUnread:0,
    }
  },
  computed: {
    ...mapGetters([
        'sidebar',
        'avatar',
        'permission_routers'
    ])
  },
  methods: {
    closeDialog(){
        this.showMessage = false;
    },
    showMessageCenter(){
        this.showMessage = true;
        this.getMessageList(this.currentPage,this.pagesize);
    },
    //消息已读
    readMessage(){
        messageRead().then(res => {
            if (res.code === 20000) {
                this.getUnread();
            } else {
                this.$message.error(res.msg);
            }
        });
    },
    //消息
    getMessageList(page, rows){
        var params = new URLSearchParams();
        params.append("page", page);
        params.append("rows", rows);
        messageList(params).then((res)=>{
            if (res.code == 20000) {
                this.totalCount = res.data.total;
                this.messageList = res.data.list;
                this.readMessage();
            }else{
                this.$message.error(res.msg);
            }
        }).catch(()=>{

        })
    },
    //每页显示数据量变更
    handleSizeChange: function(val) {
      this.pagesize = val;
    },
    //页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.getMessageList(this.currentPage, this.pagesize);
    },
    getUnread(){
        messageUnread().then((res)=>{
            if (res.code == 20000) {
                this.msgUnread = res.data;
                if(res.data > 99){
                    this.msgUnread == '99+';
                }
            }else{
                this.$message.error(res.msg);
            }
        }).catch(()=>{

        })
    },
    countTime() {
        this.time = 60;
        this.times = setInterval(() => {
            this.time--;
            if (this.time == 0) {
                clearInterval(this.times);
                this.time = this.$t("common.hqyzm");
            }
        }, 1000);
    },
    showCode(data) {
        this.nums = data.dialCode;
    },
    getCode(){
        var that = this;
        if(!this.form.mobile){
            this.$message({
                message:'请输入手机号！',
                type: "error"
            });
            return
        }
        var params = new URLSearchParams();
        params.append("account", this.nums + '-' + this.form.mobile);
        params.append("type", 103);
        this.countTime();
        verificationCodeSend(params).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.msg,
              type: "success"
            });
          }else{
            this.$message({
              message: res.msg,
              type: "error"
            });
          }
        }).catch(error => {
            clearInterval(this.times);
            this.times = null;
            this.time = _this.$t("common.hqyzm");
            this.$message.error(error.data);
        });
    },
    sure(){
        this.$refs["form"].validate(valid => {
            if (valid) {
                let requestObj = null;
                let params = '';
                if(this.chooseItem == 'avatar'){
                    params = new URLSearchParams();
                    params.append("avatar",  this.form.imageUrl);
                    requestObj = avatarUpdate;
                }else if(this.chooseItem == 'username'){
                    params = new URLSearchParams();
                    params.append("username",  this.form.username);
                    requestObj = usernameUpdate;
                }else if(this.chooseItem == 'password'){
                    params = new URLSearchParams();
                    params.append("oldPassword",  this.form.oldPassword);
                    params.append("newPassword",  this.form.newPassword);
                    requestObj = pswUpdate;
                }else if(this.chooseItem == 'mobile'){
                    params = new URLSearchParams();
                    params.append("mobile",  this.nums + '-' + this.form.mobile);
                    params.append("verificationCode",  this.form.verificationCode);
                    requestObj = mobileUpdate;
                }
                requestObj(params).then(res => {
                    if (res.code == 20000) {
                        this.$message({
                            message: res.msg,
                            type: "success"
                        });
                        if(this.chooseItem == 'password' || this.chooseItem == 'mobile'){
                            this.$store.dispatch("LogOut").then(resp => {
                                location.reload(); // 为了重新实例化vue-router对象 避免bug
                            });
                        }else{
                            this.getUserDetail();
                        }
                    } else {
                        this.$message.error(res.msg);
                    }
                    this.showOp = false;
                    this.chooseItem = '';
                    this.form={
                        password:'',
                        pwd:'',
                        username:'',
                        imageUrl:'',
                    }
                    this.nums = '';
                }).catch(function() {

                });
            }
        })
    },
    handleChange(file){
        this.file = file.raw;
    },
   
      // 上传头像
      httpRequest(val) {
          let formData = new FormData();
          formData.append("image", val.file);
          uploadMenuImg(formData)
              .then(res => {
                  if (Number(res.code) === 20000) {
                      this.$message({
                          showClose: true,
                          message: res.msg,
                          type: 'success'
                      })
                      this.form.imageUrl = res.data.url;
                  } else {
                      this.$message({
                          showClose: true,
                          message: res.msg,
                          type: 'error'
                      })
                  }
              }).catch(err => {
              this.$message.error(err);
          })
      },
      // 清除图片
      handleRemoveImage () {
          this.form.imageUrl = ''
      },
      
    //获取用户详情
    getUserDetail(){
        userDetail().then(res => {
            if (res.code === 20000) {
                this.userInfo ={...res.data};
            }
        });
    },
    // 登陆和忘记密码
    userCommand(value) {
        // 退出登录
        if (value === "logout") {
            this.$store.dispatch("LogOut").then(resp => {
                this.$message.success(this.$t("common.zxcg"));
                location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
        } else {
            this.chooseItem = value;
            this.showOp = true;
        }
    },
    toggleClick() {
        this.$store.dispatch('ToggleSideBar')
    },
    resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths);
    },
    switchActive() {
        for (var i = 0; i < this.permission_routers.length; i++) {
            if (!this.permission_routers[i].hidden) {
                this.permission_routers[i].meta["active"] = false;
                for (var j = 0; j < this.$route.matched.length; j++) {
                    if (this.permission_routers[i].name == this.$route.matched[j].name) {
                        this.permission_routers[i].meta["active"] = true;
                        this.item = this.permission_routers[i];
                        this.basePath = this.permission_routers[i].path;
                        this.childrenList = this.permission_routers[i].children;
                    }
                }
             }
        }
    },
    getReadStates(){//轮询方式完成状态变化
        var that = this;
        function runtimeStates(){
            that.getUnread();
            setTimeout(runtimeStates,30000);
        }
        runtimeStates();
    },
    generateTitle
  },
  watch: {
    $route() {
        this.switchActive()
    }
  },
  created() {
    this.getUserDetail();
  
    for (var i = 0; i < this.permission_routers.length; i++) {
        if (!this.permission_routers[i].hidden) {
            this.permission_routers[i].meta["active"] = false;
            for (var j = 0; j < this.$route.matched.length; j++) {
                if (this.permission_routers[i].name == this.$route.matched[j].name) {
                    this.permission_routers[i].meta["active"] = true;
                    this.item = this.permission_routers[i];
                    this.basePath = this.permission_routers[i].path;
                    this.childrenList = this.permission_routers[i].children;
                }
            }
        }
    }
  },
  filters: {
    timeChange(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD HH:mm");
      } else {
        return "-";
      }
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    .messageDia{
        .msgHead{
            width: 100%;
            height: 40px;
            line-height: 40px;
            padding-left: 10px;
            position: relative;
            border-bottom:1px solid #bfbfbf;
            .title{
                font-weight: bold;
                font-size: 14px;
                color: black;
            }
        }
        .msgList{
            width: 100%;
            height: 600px;
            overflow: auto;
            .msgCont{
                width: 100%;
                padding: 4px 16px;
                display: flex;
                flex-direction: column;
                .msgItem{
                    width: 100%;
                    cursor: pointer;
                    border-bottom: 1px solid #eaeaea;
                    .tp{
                        width: 100%;
                        padding: 6px 0;
                        position: relative;
                        .type{
                            font-size: 12px;
                            width: 76%;
                            display: inline-block;
                        }
                        .time{
                            width: 20%;
                            display: inline-block;
                            font-size: 12px;
                        }
                    }
                    .bt{
                        width: 100%;
                        padding: 0 0 10px 0;
                        display: inline-block;
                        .btContent{
                            font-size: 12px;
                            width: 76%;
                            display: inline-block;
                        }
                        .arrow{
                            width: 16%;
                            display: inline-block;
                            text-align: right;
                            transform: scale(2);
                        }
                    }
                }
            }
        }
    }
.header-right {
    height: 100%;
    position: absolute;
    right: 20px;
}
.header-user-con {
    display: flex;
    height: 60px;
    align-items: center;
}

.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.el-dropdown-link {
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: left;
}
.el-dropdown-menu__item i{
    margin-right: 2px;
    width: 14px;
    font-size: 14px;
    text-align: center;
}
.navbar {
  height: 60px;
  padding: 0 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -ms-flex-negative: 0;
  flex-shrink: 0;
  .info{
    cursor: pointer;
    position: absolute;
    right: 10px;
    top: 20px;
  }
  .user {
    position: absolute;
    right: 40px;
    top: 8px;
    padding: 10px 0 24px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    /*background: #272738;*/
  }
  .lisBoxSy{
    height: 100%;
    display: -webkit-box;
    position: relative;
    .svgBox{
      line-height: 70px;
      .hamburger{
        display: inline-block;
        cursor: pointer;
        width: 20px;
        height: 20px;
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
        -webkit-transition: 0.38s;
        transition: 0.38s;
        -webkit-transform-origin: 50% 50%;
        transform-origin: 50% 50%;
      }
      .is-active {
        transform: rotate(90deg);
      }
    }
    .x-l-sy{
      width: 180px;
      line-height: 60px;
      text-align: left;
      margin-left: 3px;
    }
    .list{
      width: 85%;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: start;
      -ms-flex-pack: start;
      justify-content: flex-start;
      /*position: absolute;
      right: 0;*/
      margin-left: 60px;
      height: 58px;
      .nav-item{
        max-width: 200px;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        cursor: pointer;
        text-align: center;
        line-height: 55px;
        padding: 0 20px;
        margin-bottom: -2px;
      }
      .active{
        border-bottom: 2px solid #444;
      }
    }
  }
  
}

    .avatar-uploader{
        /deep/ .el-upload{
            width: 158px;
            height: 158px;
            display: flex;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409EFF;
            }
            img{
                width: 100%;
                height: 100%;
            }
            .avatar-icon{
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 28px;
                }
                .el-icon-delete{
                    display: none;
                    color: red;
                }
                &:hover{
                    background-color: rgba(0, 0, 0, .3);
                    .el-icon-delete{
                        display: inline-block;
                    }
                }
            }
        }
    }
</style>
