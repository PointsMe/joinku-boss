<template>
  <div class="header">
    <div class="logo">
      <!-- <img src="../../../assets/images/logo_fapiao.png" alt> -->
    </div>
    <div class="right">
      <el-dropdown @command="userCommand">
        <span class="el-dropdown-link" style="display: flex;align-items: center">
          <span>{{ name }}</span>
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item><i class="fa fa-cog"></i>&nbsp; 修改密码</el-dropdown-item> -->
          <el-dropdown-item command="logout" divided><i class="fa fa-power-off"></i>&nbsp; {{$t('common.zhuxiao')}}</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  // import logo from '@/assets/images/logo.png'
  import {mapState} from 'vuex'

  export default {
    name: 'Header',
    data() {
      return {
        // logo,
        language: [
          {
            value: 'en-US',
            label: 'English'
          },
          {
            value: 'zh-CN',
            label: '中文'
          }
        ],
        years: [
          {
            value: '2018',
            label: '2018'
          }
        ],
        mch: [],
        userOptions: [
          {
            label: this.$t('common.xgmm'),
            value: 2
          },
          {
            label: this.$t('common.tcdl'),
            value: 1
          }
        ]
      }
    },

    methods: {
      // 登陆和忘记密码
      userCommand(value) {
        // 退出登录
        if (value === 'logout') {
          this.$store.dispatch('LogOut').then(resp => {
            this.$message.success(this.$t('common.zxcg'))
            this.$router.push({ path: 'login' })
          })
        } else {
          // this.$router.push('/revisePsws/revisePsw')
        }
      }
    },
    computed: {
      ...mapState({
        name: state => state.user.name,
      }),
      langVal: {
        get() {
          if (this.$i18n.locale === 'zh-CN') {
            return '中文'
          } else if (this.$i18n.locale === 'en-US') {
            return 'English'
          }
        },
        set(langVal) {
        }
      }
    },
    created() {
    },
    mounted() {
      
    }
  }
</script>

<style scoped>
  .header {
    height: 50px;
    line-height: 50px;
    box-shadow: 0 2px 5px #ccc;
    background-color: #fff;
    z-index: 999;
    width: 100%;
    position: relative;
  }

  .logo {
    display: inline-block;
    width: 180px;
    height: 100%;
    margin-left: 3px;
    vertical-align: text-bottom;
  }

  img {
    height: 100%;
    vertical-align: middle;
  }

  .name {
    display: inline-block;
    font-size: 24px;
    vertical-align: text-bottom;
  }

  .right {
    display: inline-block;
    position: absolute;
    right: 30px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }

  .userName {
    display: inline-block;
    font-size: 20px;
    vertical-align: middle;
  }

  /*.el-dropdown {*/
    /*vertical-align: middle;*/
  /*}*/

  /*.el-dropdown .lang span {*/
    /*font-size: 14px;*/
  /*}*/
</style>
