<template>
    <el-dialog title="" v-if="showWaiter" :visible.sync="show" width="1400px" :modal="true" top="60px" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div slot="title">
       {{$t('route.employeeManage')}}
      </div>
     <!--  <div>
        <el-row class="search_container">
          <el-col :span="24">
            {{$t('common.merchant')}}:
            <el-autocomplete type="text" clearable autosize style="margin-right: 10px;width:240px" :placeholder="$t('common.qsrnr')" :fetch-suggestions="querySearchCustomer" @select="handleSelectQsc" v-model="queryParams.merchantName" suffix-icon="el-icon-search"></el-autocomplete>
            &nbsp;{{$t('common.mendian')}}:
            <el-autocomplete type="text" clearable autosize style="margin-right: 10px;width:240px" :placeholder="$t('common.qsrnr')" :fetch-suggestions="querySearchShop" @select="handleSelectShop" v-model="queryParams.shopName" suffix-icon="el-icon-search"></el-autocomplete>
            <el-button type="primary" size="mini" @click="doQuery()">{{$t('common.sousuo')}}</el-button>
            <el-button type="info" size="mini" @click="removeFn()" style="margin:0px;margin-top: 6px;">{{$t('common.qk')}}</el-button>
          </el-col>
        </el-row>
      </div> -->
      <div class="center">
        <div class="productList">
          <el-table :data="employeeList" :height="heightDate" ref="table" style="width: 100%">
           <el-table-column prop="username" align="center" :label="$t('common.ygxm')">
              <template slot-scope="scope">
                <div style="display:flex;align-items: center;">
                  <el-image :src="scope.row.avatar" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                    <div slot="error" class="image-slot">
                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;"/>
                    </div>
                  </el-image>
                  <div style="display:flex; flex-direction: column;text-align: left; marginLeft:10px;width: 260px;">
                    <span style="font-weight: bold">{{ scope.row.username }}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="number" align="center" width="100" :label="$t('common.code')"></el-table-column>
            <el-table-column prop="mobile" align="center" width="120" :label="$t('common.sjh')"></el-table-column>
            <el-table-column prop="email" align="center" width="200" :label="$t('common.yx')"></el-table-column>
            <el-table-column prop="enabled" align="center" width="120" :label="$t('common.qy2')+'/'+$t('common.jy2')">
              <template slot-scope="scope">
                <span>{{ scope.row.enabled | enabledValue(qy,jy) }}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="240" :label="$t('common.cz')" fixed="right">
              <template slot-scope="scope">
                <el-button type="text" @click="doChange(scope.row,'email')" v-if="!scope.row.defaulted">{{ $t('common.reviseEmail') }}</el-button>
                <el-button type="text" @click="doChange(scope.row,'psw')" v-if="!scope.row.defaulted">{{ $t('common.czmm') }}</el-button>
                <el-button type="text" @click="doChange(scope.row,'mobile')" v-if="!scope.row.defaulted">{{ $t('common.reviseMobile') }}</el-button>
                <el-button type="text" slot="reference" @click="pwdTemporary(scope.row)">{{ $t('common.temporaryPwd') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="totalCount"></el-pagination>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleDiolag">{{$t('common.close')}}</el-button>
      </span>
      <el-dialog width="600px" :visible.sync="pwdTempFlag" v-if="pwdTempFlag" :close-on-click-modal="false" append-to-body>
        {{$t('common.temporaryPwd')}}:{{pwdTemp}}
      </el-dialog>
      <el-dialog width="600px" :title="$t('common.czmm')" :visible.sync="pwdFlag" v-if="pwdFlag" :close-on-click-modal="false" append-to-body>
        <div slot="title">
          <span v-if="chooseItem == 'psw'">{{ $t('common.czmm') }}</span>
          <span v-if="chooseItem == 'mobile'">{{ $t('common.reviseMobile') }}</span>
          <span v-if="chooseItem == 'email'">{{ $t('common.reviseEmail') }}</span>
        </div>
        <div class="center navbar">
          <el-form ref="form" :model="form" label-width="120px" :rules="forms"  size="middle">
            <el-form-item :label="$t('common.xmm')" prop="password" v-if="chooseItem == 'psw'">
              <el-input v-model="form.password" size="middle" maxlength="32" show-word-limit></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.sjh')" prop="mobile" v-if="chooseItem == 'mobile'"
            class="regiseter">
                            <AreaCode
                    @excountry="showCode"
                    class="area"
                    :areaHeight="height"
                    :countryCode="countryCode"></AreaCode>
                <el-input v-model="form.mobile" size="middle" class="mobile"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.yx')" prop="email" v-if="chooseItem == 'email'">
              <el-input v-model="form.email" size="middle"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="pwdFlag = false;">{{ $t('common.qx') }}</el-button>
          <el-button type="primary" @click="pwdSave">{{ $t('common.queding') }}</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </template>
  <script>
  import {
    jkbEmployeePage,
    jkbEmployeepswReset,
    jkbEmployeeEmailUpdate,
    jkbEmployeeMobileUpdate,
    jkbEmployeePswTemp,
    jkbMerchantPage,
      jkbShopPage,
  } from '@/api/api';
  import AreaCode from '@/components/areaCode';
    import Country from '@/components/areaCode/countryList.js';
  var moment = require('moment');
  export default {
    name: 'Waiter',
    props: {
      showWaiter: {
        default: false
      },
      merchantId:{
        default:''
      },
      shopId:{
        default:''
      }
    },
    components: {
        AreaCode
    },
    data() {
      return {
        show:true,
        allPerms: [],
        countryCode: 'it',
        height: '22px',
        nums: '',
        heightDate: '440',
        queryParams: {
          merchantId: '',
          merchantName:'',
          shopId: "",
          shopName:'',
        },
        shi: this.$t('common.yes'),
        fou: this.$t('common.fou'),
        qy: this.$t('common.qy2'),
        jy: this.$t('common.jy2'),
        pwdId: '',
        pwdFlag: false,
        roleAll: [],
        shopAll:[],
        addFlag: false,
        chooseTime: 0,
        // 默认数据总数
        totalCount: 0,
        // 当前页码
        currentPage: 1,
        // 默认每页数据量 €
        pagesize: 10,
        employeeList: [],
        chooseItem:'',
        form: {
          id: '',
          shopId:'',
          merchantId:'',
          mobile:'',
          email:'',
          password: '',
        },
        forms: {
            mobile: [{
                required: true,
                message: this.$t('common.qsrnr'),
                trigger: 'blur'
            }],
          password: [{
              required: true,
              message: this.$t('common.qsrnr'),
              trigger: 'blur'
            },
            {
              min: 6,
              max: 32,
              message: this.$t('common.validateLength6_32'),
              trigger: 'blur'
            }
          ],
          email: [{
            required: true,
            message: this.$t('common.qsrnr'),
            trigger: 'blur'
          }],
        },
        pwdTempFlag:false,
        pwdTemp:'',
      };
    },
    watch: {
      showWaiter(){
        if(this.showWaiter){
          this.getWaiterList(this.currentPage, this.pagesize);
        }
      }
    },
    methods: {
        dealCoutry(dialCode) {
            for (let item in Country) {
                for (let itm in Country[item]) {
                    if (Country[item][itm] == dialCode) {
                        return Country[item].code;
                    }
                }
            }
        },
        showCode(data) {
            this.nums = data.dialCode;
        },
      pwdTemporary(row){
        let that = this;
        let params = new URLSearchParams();
        params.append('id', row.id);
        jkbEmployeePswTemp(params).then(function(res) {
          if (res.code == 20000) {
              that.pwdTempFlag = true;
              that.pwdTemp=res.data;
          }else {
            that.$message.error(res.msg);
          }
        });
      },
      cancleDiolag(){
        this.$emit('closeWaiter');
      },
      // 每页显示数据量变更
      handleSizeChange: function(val) {
        this.pagesize = val;
      },
      // 页码变更
      handleCurrentChange: function(val) {
        this.currentPage = val;
        this.getWaiterList(this.currentPage, this.pagesize);
      },
      removeFn() {
        this.queryParams = {
          merchantId: '',
          merchantName:'',
          shopId: "",
          shopName:'',
        };
        this.doQuery();
      },
      doQuery() {
        this.currentPage = 1;
        this.pagesize = 10;
        this.getWaiterList(this.currentPage, this.pagesize);
      },
      getWaiterList(page, rows) {
        var that = this;
        let params = {
          page: page,
          size: rows,
          merchantId:this.merchantId,
          shopId:this.shopId,
        };
        jkbEmployeePage(params).then(function(res) {
          let data = res.data;
          if (res.code == 20000) {
            that.totalCount = data.total;
            that.employeeList = data.list;
          } else {
            that.$message.error(res.msg);
          }
        })['catch'](function() {});
      },
      doChange(row,type) {
        this.forms.mobile[0].required = true;
        this.forms.email[0].required = true;
        this.chooseItem = type;
        this.form.password = '';
        this.form.email = row.email;
        this.nums = row.mobile ? row.mobile.split('-')[0] : '';
        this.countryCode = this.nums ? this.dealCoutry(this.nums) : 'it';
        this.form.mobile = row.mobile ? row.mobile.split('-')[1] : '';
        this.pwdFlag = true;
        this.form.id = row.id;
      },
      pwdSave() {
        this.$refs.form.validate(valid => {
          if (valid) {
            let requestObj = null;
            let params = '';
            if (this.chooseItem == 'psw') {
              params = {
                id: this.form.id,
                password:this.form.password
              };
              requestObj = jkbEmployeepswReset;
            } else if (this.chooseItem == 'mobile') {
                params = {
                    id:this.form.id,
                    mobile:this.nums + '-' + this.form.mobile
                }
                requestObj = jkbEmployeeMobileUpdate;
            }else if (this.chooseItem == 'email') {
              params = {
                id: this.form.id,
                email:this.form.email
              };
              requestObj = jkbEmployeeEmailUpdate;
            }
            requestObj(params).then(res => {
              if (res.code === 20000) {
                this.$message({
                  message: res.msg,
                  type: 'success'
                });
                this.pwdFlag = false;
                  this.getWaiterList(this.currentPage, this.pagesize);
              } else {
                this.$message.error(res.msg);
              }
            }).catch(err => {
                this.$message.error(err);
            })
          }
        });
      },
      querySearchCustomer(queryString, cb) {
        var params = {
          name: this.queryParams.merchantName,
          page: 1,
          size: 100
        };
        jkbMerchantPage(params).then(res => {
          if (res.code === 20000) {
            for (let i = 0; i < res.data.list.length; i++) {
              res.data.list[i].value = res.data.list[i].name ? res.data.list[i].name : (res.data.list[i].firstName + ' ' + res.data.list[i].lastName);
              res.data.list[i].value += res.data.list[i].vatNumber ? ('-' + res.data.list[i].vatNumber) : '';
            }
            cb(res.data.list);
          }
        });
      },
      handleSelectQsc(item) {
        this.queryParams.merchantId = item.id;
        this.doQuery();
      },
      querySearchShop(queryString, cb) {
        var params = {
          name: queryString,
          page: 1,
          size: 100
        };
        jkbShopPage(params).then(res => {
          if (res.code === 20000) {
            for (let i = 0; i < res.data.list.length; i++) {
              res.data.list[i].value = res.data.list[i].name ? res.data.list[i].name : (res.data.list[i].firstName + ' ' + res.data.list[i].lastName);
              res.data.list[i].value += res.data.list[i].vatNumber ? ('-' + res.data.list[i].vatNumber) : '';
            }
            cb(res.data.list);
          }
        });
      },
      handleSelectShop(item) {
        this.queryParams.shopId = item.id;
        this.doQuery();
      },
    },
    created() {
      this.allPerms = JSON.parse(localStorage.getItem('perms'));
    },
    mounted() {
  
    },
  
    filters: {
      timeChange(val) {
        if (val) {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        } else {
          return '-';
        }
      },
      enabledValue(val, qy, jy) {
        if (val) {
          return qy;
        } else {
          return jy;
        }
      },
      stateValue(val, shi, fou) {
        return val ? shi : fou;
      }
    }
  };
  
  </script>
  <style lang="scss" scoped>
  .search_container .el-form-item--mini.el-form-item,
  .search_container .el-form-item--small.el-form-item {
    display: inline-block;
  }
  </style>
  