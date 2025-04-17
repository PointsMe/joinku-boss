<template>
    <el-dialog
      :title="$t('common.account')"
      width="1200px"
      :visible.sync="visible"
      class="pointsme-bind-container"
      :before-close="modalClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 20px 20px; min-height: 120px">
          <el-table
            :data="userList"
            border
            size="mini"
            style="width: 100%; margin-top: 10px;">
            <el-table-column prop="username" align="center" width="240" :label="$t('common.ygxm')">
                <template slot-scope="scope">
                    <div style="display:flex;align-items: center;">
                        <el-image :src="scope.row.avatar" class="image" fit="cover"
                                    style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                            <div slot="error" class="image-slot">
                                <img src="@/assets/logo.png" style="width: 50px;height: 50px;"/>
                            </div>
                        </el-image>
                        <div
                            style="display:flex; flex-direction: column;text-align: left; marginLeft:10px;width: 260px;">
                            <span style="font-weight: bold">{{ scope.row.username }}</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('common.code')">
                <template slot-scope="scope">
                    <span>{{scope.row.number}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('common.yx')" width="130">
                <template slot-scope="scope">
                    <span>{{scope.row.email}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('common.sjh')" width="130">
                <template slot-scope="scope">
                    <span>{{scope.row.mobile}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="enabled" align="center" width="120" :label="$t('common.qy3')">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.enabled">{{ $t('common.qy2') }}</el-tag>
                    <el-tag type="info" v-else>{{ $t('common.jy2') }}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" :label="$t('common.creatTime')">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | timeChange }}</span>
                </template>
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('common.cz')"
              width="200px">
              <template slot-scope="scope">
                <el-button type="text" @click="doChange(scope.row,'mobile')">{{ $t('common.reviseMobile') }}</el-button>
                <el-button type="text" @click="doChange(scope.row,'email')">{{ $t('common.reviseEmail') }}</el-button>
                <br/>
                <el-button type="text" @click="doChange(scope.row,'psw')">{{ $t('common.czmm') }}</el-button>
                <el-button type="text" @click="pwdTemporary(scope.row)">{{ $t('common.temporaryPwd') }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="display: flex;justify-content: space-between;margin: 2px">
            <el-pagination
              background
              :page-size="pageSize"
              :current-page="currentPage"
              @current-change="currentChange"
              layout="total, prev, pager, next"
              :total="totalCount">
            </el-pagination>
          </div>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="medium" @click="modalClose" style="margin-right: 20px;">{{ $t('common.close') }}</el-button>
      </div>
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
                <el-form ref="form" :model="form" label-width="120px" :rules="forms" @submit.native.prevent size="middle">
                    <el-form-item :label="$t('common.xmm')" prop="password" v-if="chooseItem == 'psw'">
                        <el-input v-model="form.password" size="middle" maxlength="32" show-word-limit></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('common.sjh')" prop="mobile" v-if="chooseItem == 'mobile'"
                                  class="regiseter">
                        <AreaCode v-on:excountry="showCode" class="area" :areaHeight="height"
                                  :countryCode="countryCode"></AreaCode>
                        <el-input v-model="form.mobile" size="middle" class="mobile"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('common.yx')" prop="email" v-if="chooseItem == 'email'">
                        <el-input v-model="form.email" size="middle"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="pwdFlag = false;">{{ $t('common.annulla') }}</el-button>
                <el-button type="primary" @click="pwdSave">{{ $t('common.conferma') }}</el-button>
            </span>
        </el-dialog>
    </el-dialog>
  </template>
  <script>
  var moment = require('moment');
    import {
        sfEmployeePage,
        sfEmployeeTempPsw,
        lenderRePsw,
        employeeMobileUpdt,
employeeEmailUpdt,
    } from '@/api/api';
    import AreaCode from '@/components/areaCode';
    import Country from '@/components/areaCode/countryList.js';
    export default {
      name: 'User',
      components: {
        AreaCode
      },
      props: {
        visible: {
          type: Boolean,
          default: false
        },
        merchantId: {
          type: Number
        },
        id: {
          type: Number
        }
      },
      data() {
        return {
            height: '30px',
            countryCode: 'it',
            heightDate: '120',
            nums: '',
            userList: [],
            currentPage: 1,
            pageSize: 15,
            totalCount: 0,
            pwdTempFlag:false,
            pwdTemp:'',
            chooseItem:'',
            pwdId: '',
            pwdFlag: false,
            form: {
                mobile: '',
                email: '',
                password: '',
                
            },
            forms: {
                mobile: [{
                    required: true,
                    message: this.$t('common.qsrnr'),
                    trigger: 'blur'
                }],
                email: [{
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
                        message: this.$t('common.lengthNot32Charact'),
                        trigger: 'blur'
                    }
                ],
            },
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
            sfEmployeeTempPsw(params).then(function(res) {
                if (res.code == 20000) {
                    that.pwdTempFlag = true;
                    that.pwdTemp=res.data.password;
                }else {
                that.$message.error(res.msg);
                }
            });
        },
        doChange(row, type) {
            this.forms.mobile[0].required = true;
            this.forms.email[0].required = true;
            this.chooseItem = type;
            this.form.password = '';
            this.form.email = row.email;
            this.nums = row.mobile ? row.mobile.split('-')[0] : '';
            this.countryCode = this.nums ? this.dealCoutry(this.nums) : 'it';
            this.form.mobile = row.mobile ? row.mobile.split('-')[1] : '';
            this.pwdFlag = true;
            this.pwdId = row.id;
        },
        pwdSave() {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let that = this;
                    let requestObj = null;
                    let params = '';
                    if (this.chooseItem == 'psw') {
                        params = {
                            id:this.pwdId,
                            password:this.form.password
                        }
                        requestObj = lenderRePsw;
                    } else if (this.chooseItem == 'mobile') {
                        params = {
                            id:this.pwdId,
                            mobile:this.nums + '-' + this.form.mobile
                        }
                        requestObj = employeeMobileUpdt;
                    } else if (this.chooseItem == 'email') {
                        params = {
                            id:this.pwdId,
                            email:this.form.email
                        }
                        requestObj = employeeEmailUpdt;
                    }
                    requestObj(params).then(res => {
                        if (res.code === 20000) {
                            that.$message({
                                message: res.msg,
                                type: 'success'
                            });
                            that.loadUserList();
                            that.pwdFlag = false;
                        } else {
                            that.$message.error(res.msg);
                        }
                    })['catch'](() => {
                    });
                }
            });
        },
        loadUserList() {
            let params = {
                page:this.currentPage,
                size:this.pageSize,
                merchantId:this.id
            }
            this.userList = [];
            sfEmployeePage(params).then(res => {
                if (res.code === 20000) {
                    this.totalCount = res.data.total;
                    this.userList = res.data.list;
                }
            })
        },
        currentChange(currentChange) {
            this.currentPage = currentChange;
            this.loadUserList();
        },
        modalClose() {
          // 直接修改父组件的属性
          this.$emit('update:visible', false)
        }
      },
      mounted() {
        this.loadUserList()
      },
      filters: {
        timeChange(val) {
                if (val) {
                    return moment(val).format('YYYY-MM-DD HH:mm:ss');
                } else {
                    return '-';
                }
            },
        }
    }
  </script>
  <style scopped lang="scss">
 
  </style>
  