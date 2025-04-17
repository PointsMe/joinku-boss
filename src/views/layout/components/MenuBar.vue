<template>
  <div class="left-container">
    <div class="accig0K_SCD4tCySKSXGa hide-scroll" id="app-nav-1">
      <div class="wrap">
        <div class="zent-popover-wrapper zent-pop-wrapper" style="display: block;margin: 80px 0px 20px;">
          <img class="logo" :src="image+ '_80x80.jpg'" v-if="image"/>
          <img class="logo" src="../../../assets/logo.png" alt="" v-else>
          <p class="companyName">{{ name }}</p>
        </div>
        <div style="margin-top: 40px">
          <a
            class="nav-item"
            :class="{'active':route.meta.active,'hover':route.hover}"
            :href="'#' + route.path"
            v-for="route in permission_routers"
            :key="route.name"
            v-if="!route.hidden"
            @click="switchActive(route)"
            @mouseenter="hoverChildren(route)"
            @mouseleave="leaveChildren(route)">
            <svg-icon :icon-class="route.meta.icon"></svg-icon>
            <span>&nbsp;&nbsp;{{ generateTitle(route.meta.title) }}</span>
          </a>
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
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import {mapGetters, mapState} from "vuex";
import {generateTitle} from "@/utils/i18n";
import path from "path";

export default {
  components: {},
  data() {
    return {
      // imgSrc: "",
      childrenList: [],
      item: "",
      // companyName: '',
    };
  },
  computed: {
    ...mapGetters(["permission_routers"]),
    ...mapState({
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      image: state => state.user.image || window.localStorage.getItem('image')
    }),

  },
  methods: {
    // // 登陆和忘记密码
    // userCommand(value) {
    //   // 退出登录
    //   if (value === "logout") {
    //     this.$store.dispatch("LogOut").then(resp => {
    //       this.$message.success(this.$t("common.zxcg"));
    //       // this.$router.replace({ path: 'login' })
    //       location.reload(); // 为了重新实例化vue-router对象 避免bug
    //     });
    //   } else {
    //     // this.$router.push('/revisePsws/revisePsw')
    //   }
    // },
    hoverChildren(dt) {
      for (var i = 0; i < this.permission_routers.length; i++) {
        this.permission_routers[i]['hover'] = false;
        if (dt.name == this.permission_routers[i].name) {
          this.permission_routers[i]['hover'] = true;
        }
      }
    },
    leaveChildren(dt) {
      for (var i = 0; i < this.permission_routers.length; i++) {
        if (dt.name == this.permission_routers[i].name) {
          this.permission_routers[i]['hover'] = false;
        }
      }
    },
    switchActive(dt) {
      for (var i = 0; i < this.permission_routers.length; i++) {
        if (!this.permission_routers[i].hidden) {
          this.permission_routers[i].meta["active"] = false;
          if (this.permission_routers[i].name == dt.name) {
            this.permission_routers[i].meta["active"] = true;
            this.item = this.permission_routers[i];
            this.basePath = this.permission_routers[i].path;
            this.childrenList = this.permission_routers[i].children;
          }
        }
      }
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
    },
    generateTitle
  },
  created() {
    for (var i = 0; i < this.permission_routers.length; i++) {
      Vue.set(this.permission_routers[i], 'hover', false)
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
  mounted() {
    // var navw = document.getElementById("app-nav-1").offsetWidth;
    // var nav2 = document.getElementById("app-nav-2");
    // var nav2w = document.getElementById("app-nav-2").offsetWidth;
    // nav2.style.left = navw + "px";

    // var nav3 = document.querySelector(".main-container");
    // nav3.style.marginLeft = navw + nav2w + "px";
    // this.imgSrc = localStorage.getItem("image");
    // this.companyName = localStorage.getItem('supplierInfo') ? JSON.parse(localStorage.getItem('supplierInfo')).name : '';
  },

  watch: {}
};
</script>
<style lang="scss" scoped>
.accig0K_SCD4tCySKSXGa {
  position: absolute;
  left: 0;
  top: 0;

  height: 100%;
  /*background: #272738;*/
  overflow-y: auto;
  z-index: 1;
}

.accig0K_SCD4tCySKSXGa .wrap {
  width: 200px;
  margin-bottom: 100px;
}

.accig0K_SCD4tCySKSXGa .user {
  bottom: 0;
  position: absolute;
  width: 100%;
  padding: 10px 0 24px;
  left: 0;
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

.accig0K_SCD4tCySKSXGa .nav-item {
  height: 36px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  /*margin-bottom: 8px;*/
  /*color: #fff;*/
  color: #333333;
  cursor: pointer;
  font-size: 14px;
  padding: 4px 20px 4px 20px;
  justify-content: center;
}

.accig0K_SCD4tCySKSXGa .nav-item.hover {
  background: #e5f3ff;
  color: #333333;
}

.accig0K_SCD4tCySKSXGa .nav-item.active {
  /*background: var(--c_main, #107c3f);*/
  background: #f5f7fa;
  color: #333333;
}

.accig0K_SCD4tCySKSXGa .logo {
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 4px;
  margin: 10px auto;
  object-fit: cover;
  -webkit-box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.3);
  box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.3);
  background: #fff;
}

.accig0K_SCD4tCySKSXGa .companyName {
  text-align: center;
  font-size: 14px;
  font-weight: bold;
  width: 100%;
}

.accig0K_SCD4tCySKSXGa .user .avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: block;
  margin-bottom: 10px;
  -webkit-box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.3);
  box-shadow: inset 0 0 1px 1px hsla(0, 0%, 100%, 0.3);
  background: #fff;
}

.accig0K_SCD4tCySKSXGa .nav-item > svg {
  width: 16px;
  height: 16px;
  /*opacity: 0.5;*/
}

.accig0K_SCD4tCySKSXGa .nav-item > span {
  margin-left: 4px;
  line-height: 20px;
  width: 100px;
  /*opacity: 0.5;*/
}

.accig0K_SCD4tCySKSXGa .nav-item.active > * {
  opacity: 1;
}

.svg-color {
  fill: var(--c_main, #8558fa);
}

.accig0K_SCD4tCySKSXGa + .nav2 {
  left: 92px;
}

._1cD4TBysfV8STJnvITnsjs {
  position: fixed;
  top: 0;
  width: 124px;
  height: 100%;
  left: 92px;
  border-right: 1px solid #ebedf0;
  background: #fff;
  z-index: 1;
}

._1cD4TBysfV8STJnvITnsjs h3 {
  padding: 0 24px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ebedf0;
  line-height: 51px;
}

._1cD4TBysfV8STJnvITnsjs .list {
  height: calc(100% - 77px);
  overflow-y: auto;
  padding: 0 10px;
}

._1cD4TBysfV8STJnvITnsjs .list .nav-item.active {
  background: #ffecc5;
}

._1cD4TBysfV8STJnvITnsjs .list .nav-item,
._1cD4TBysfV8STJnvITnsjs .list .nav-title {
  line-height: 36px;
  margin-bottom: 8px;
}

._1cD4TBysfV8STJnvITnsjs .list .nav-item {
  display: block;
  cursor: pointer;
  border-radius: 2px;
  color: #323232;
}

._1cD4TBysfV8STJnvITnsjs .list .nav-title,
._1cD4TBysfV8STJnvITnsjs .list > .nav-item {
  padding-left: 14px;
}
</style>
