<template>
  <div class="fullDetail">
    <div class="contentContainer">
      <div class="contentDetail">
        <el-form :model="detailForm" :rules="detailRules" ref="fullDetailForm" size="middle">
          <div class="baseInfo">
            <div class="title">
              <span class="border"></span>
              <span class="tit">
                {{ $t('common.payZhanghao') }}
              </span>
            </div>
            <div class="content">
              <ul class="payList">
                <li class="payItem" v-for="item in payeeList" :key="item.id" :class="{'bgPay':item.enabled}">
                  <div class="head">
                    {{ item.name }}
                  </div>
                  <div class="info">
                    <span class="num">{{ item.iban }}</span>
                    <span class="name">{{ item.username }}</span>
                  </div>
                  <span class="choose" @click.stop="enablePayee(item)">
                    <i class="el-icon-check"></i>
                  </span>
                  <span class="edit" @click.stop="editPayee(item)">
                    <i class="el-icon-edit"></i>
                  </span>
                  <span class="delete" @click.stop="deletePayee(item)">
                    <i class="el-icon-delete"></i>
                  </span>
                </li>
                <li class="payItem2" @click="showPayeeInfo">
                  <div class="addInfo">
                    <span class="add"><i class="el-icon-plus"></i></span>
                    <span class="tips">{{ $t('common.addPayCount') }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="baseInfo">
            <div class="title">
              <span class="border"></span>
              <span class="tit">
                付款方式
              </span>
            </div>
            <div class="content">
              <ul class="payList">
                <li class="payItem" v-for="item in payModeList" :key="item.id" style="padding: 30px 10px;">
                  <div class="head" style="display: flex;justify-content: space-between;">
                    <span>{{ item.text }}</span>
                    <span>{{$t('common.serveFee')}} <span style="color: red;">€{{item.amount}}</span></span>
                  </div>
                  <span class="edit" @click.stop="editPayMode(item)">
                    <i class="el-icon-edit"></i>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </el-form>
        <!-- <div class="opBtn">
            <el-button size="mini" @click="goBack();">返回</el-button>
            <el-button type="primary" size="mini" @click="sure();">保存</el-button>
        </div> -->
      </div>
    </div>
    <el-dialog :title="$t('common.payZhanghao')" :visible.sync="showPayee" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form :model="payeeObj" ref="payeeObj" size="middle">
          <el-form-item class="sInfo" label-width="160px" :label="$t('common.mingcheng') + '：'" prop="name">
            <el-input v-model="payeeObj.name" :placeholder="$t('common.mingcheng')" size="medium" style="width: 80%;" clearable></el-input>
          </el-form-item>
          <el-form-item class="sInfo" label-width="160px" :label="$t('common.bank') + '：'" prop="bank">
            <el-input v-model="payeeObj.bank" :placeholder="$t('common.insertBank')" size="medium" style="width: 80%;" clearable></el-input>
          </el-form-item>
          <el-form-item class="sInfo" label-width="160px" :label="$t('common.cardNo') + '：'" prop="iban">
            <el-input v-model="payeeObj.iban" :placeholder="$t('common.insertCardNo')" size="medium" style="width: 80%;" clearable></el-input>
          </el-form-item>
          <el-form-item class="sInfo" label-width="160px" :label="$t('common.userName') + '：'" prop="username">
            <el-input v-model="payeeObj.username" :placeholder="$t('common.insertUsername')" size="medium" style="width: 80%;" clearable></el-input>
          </el-form-item>
          <el-form-item class="sInfo" label-width="160px" :label="$t('common.qy2') + '/' + $t('common.jy2') + '：'" prop="enabled">
            <el-switch v-model="payeeObj.enabled" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclePayee">{{$t('common.qx')}}</el-button>
        <el-button type="primary" @click="doPayee">{{$t('common.queding')}}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.payWayManage')" :visible.sync="showPayMode" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form :model="payModeObj" ref="payModeObj" size="middle">
          <el-form-item class="sInfo" label-width="120px" :label="$t('common.mingcheng') + '：'" prop="text">
             <el-input style="width: 80%" :placeholder="$t('common.qsrnr')" v-model="payModeObj.text" size="medium" clearable>
                <el-button slot="append" @click.native="addTranslation">
                  <el-tooltip effect="dark" :content="$t('common.addTran')" placement="right">
                    <i class="el-icon-plus"></i>
                  </el-tooltip>
                </el-button>
            </el-input>
          </el-form-item>
          <template v-for="(item,index) in payModeObj.translations">
              <el-form-item class="sInfo" label-width="120px">
                  <el-input v-model="item.text" style="width: 80%" :placeholder="$t('common.plaInputTran')" size="mini">
                    <el-select v-model="item.lang" slot="prepend" :placeholder="$t('common.multiLang')" style="width: 100px" @change="langChange">
                      <el-option v-for="(itm,idx) in langList" :key="idx" :label="itm.text" :value="itm.lang" :disabled="itm.active"></el-option>
                    </el-select>
                    <el-button slot="append" @click="delLang(item,index)">
                      <el-tooltip effect="dark" :content="$t('common.deleteTran')" placement="right">
                        <i class="el-icon-minus"></i>
                      </el-tooltip>
                    </el-button>
                  </el-input>
              </el-form-item>
          </template>
          <el-form-item class="sInfo" label-width="120px" :label="$t('common.serveFee')+':'" prop="amount">
            <el-input v-model="payModeObj.amount" :placeholder="$t('common.insertBank')" size="medium" style="width: 80%;" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclePayMode">{{$t('common.qx')}}</el-button>
        <el-button type="primary" @click="doPayMode">{{$t('common.queding')}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Vue from 'vue';
import {
  orderPayeeList,
  orderPayeeCreate,
  orderPayeeUpadate,
  orderPayeeDelete,
  orderPayeeEnable,
  paymodeList,
  paymodeUpdate,
  setLanguageList
} from '@/api/api';

var moment = require('moment');
export default {
  name: 'OrderSys',
  data() {
    return {
      // 收款账号
      payeeList: [],
      showPayee: false,
      payeeObj: {
        name: '',
        bank: '',
        iban: '',
        username: '',
        enabled: true
      },
      payModeList:[],
      showPayMode:false,
      payModeObj: {
        id: '',
        text: '',
        amount: '',
        translations: []
      },
      langList:[],
    };
  },
  methods: {
    canclePayee() {
      this.payeeObj = {
        name: '',
        bank: '',
        iban: '',
        username: '',
        enabled: true
      };
      this.showPayee = false;
      this.id = '';
    },
    editPayee(dt) {
      this.showPayee = true;
      this.payeeObj.name = dt.name;
      this.payeeObj.bank = dt.bank;
      this.payeeObj.iban = dt.iban;
      this.payeeObj.username = dt.username;
      this.payeeObj.enabled = dt.enabled;
      this.id = dt.id;
    },
    deletePayee(dt) {
      var params = new URLSearchParams();
      params.append('id', dt.id);
      orderPayeeDelete(params).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getPayeeList();
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](() => {

      });
    },
    showPayeeInfo() {
      this.showPayee = true;
    },
    enablePayee(dt) {
      var params = new URLSearchParams();
      params.append('id', dt.id);
      params.append('enabled', !dt.enabled);
      orderPayeeEnable(params).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getPayeeList();
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](() => {

      });
    },
    doPayee() {
      let params = {
        name: this.payeeObj.name,
        bank: this.payeeObj.bank,
        iban: this.payeeObj.iban,
        username: this.payeeObj.username,
        enabled: this.payeeObj.enabled
      };
      let requestObj = null;
      if (this.id) {
        params.id = this.id;
        requestObj = orderPayeeUpadate;
      } else {
        requestObj = orderPayeeCreate;
      }
      requestObj(params).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getPayeeList();
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](() => {

      });
      this.showPayee = false;
    },
    // 收款账号
    getPayeeList() {
      orderPayeeList().then(res => {
        if (res.code === 20000) {
          this.payeeList = res.data;
        }
      });
    },
    //付款方式
    getPaymodeList() {
      paymodeList().then(res => {
        if (res.code === 20000) {
          this.payModeList = res.data;
        }
      });
    },
    getSetLanguageList() {
        let that = this;
        setLanguageList().then(function(res) {
            if (res.code == 20000) {
                that.langList = res.data;
                for(let i = 0; i < that.langList.length;i++){
                    Vue.set(that.langList[i],'active',false)
                    for(let j = 0; j < that.payModeObj.translations.length;j++){
                        if(that.payModeObj.translations[j].lang == that.langList[i].lang){
                            Vue.set(that.langList[i],'active',true)
                        }
                    }
                }
            } else {
                that.$message.error(data.msg);
            }
            params = null;
        }).catch(function() {

        });
    },
    editPayMode(item){
      this.showPayMode = true;
      this.payModeObj.text = item.text;
      this.payModeObj.id = item.id;
      this.payModeObj.amount = item.amount;
      this.payModeObj.translations = item.translations == null?[]:item.translations;
      this.getSetLanguageList();
    },
    canclePayMode(){
      this.showPayMode = false;
      this.payModeObj = {
        id: '',
        text: '',
        amount: '',
        translations: []
      };
    },
    addTranslation() {
      var obj = {
        lang: "",
        text: ""
      };
      this.payModeObj.translations.push(obj);
    },
    delLang(item,index) {
      for(var i = 0; i < this.langList.length;i++){
        if(this.langList[i].lang == item.lang){
          this.langList[i].active = false;
        }
      }
      this.payModeObj.translations.splice(index, 1);
    },
    langChange(val) {
      for(var i = 0; i < this.langList.length;i++){
        this.langList[i].active = false;
        for(var j = 0; j < this.payModeObj.translations.length;j++){
            if(this.payModeObj.translations[j].lang == this.langList[i].lang){
                this.langList[i].active = true;
            }
        }
        if(this.langList[i].lang == val){
            this.langList[i].active = true;
        }
      }
    },
    doPayMode(){
      let params = {
        text: this.payModeObj.text,
        id: this.payModeObj.id,
        amount: this.payModeObj.amount,
        translations: this.payModeObj.translations,
      };
      paymodeUpdate(params).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getPaymodeList();
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](() => {

      });
      this.showPayMode = false;
    },
  },
  mounted() {
    this.getPayeeList();
    this.getPaymodeList();
  },
  computed: {},
  filters: {},
  watch: {}
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fullDetail {
  width: 100%;
  height: 100%;

  /*background: #ededed;*/
  .contentContainer {
    width: 100%;
    height: 100%;
    overflow: auto;

    .contentDetail {
      width: 1024px;
      height: 100%;
      /*padding-top: 20px;*/
      margin: 0 auto;

      /*overflow: auto;*/
      .baseInfo,
      .saleInfo {
        background: white;
        margin-bottom: 20px;

        .title {
          width: 100%;
          height: 60px;
          position: relative;
          line-height: 60px;
          border-bottom: 1px solid #F4F4F4;

          .tit {
            margin-left: 20px;
            font-weight: bold;
          }

          .border {
            position: absolute;
            left: 0;
            top: 15px;
            width: 3px;
            height: 30px;
            background: green;
          }
        }

        .content {
          padding: 10px 6px 10px 20px;

          .payDay {
            position: relative;
            width: 140px;
            height: 70px;
            border: 1px solid #f1f1f1;
            background-color: #f1f1f1;
            text-align: center;
            line-height: 70px;
            display: inline-block;
            margin-right: 10px;
            margin-bottom: 8px;

            .choose {
              display: inline-flex;
              position: absolute;
              top: 2px;
              left: 2px;
              cursor: pointer;
            }

            .edit {
              display: inline-flex;
              position: absolute;
              top: 2px;
              right: 2px;
              cursor: pointer;
            }

            .delete {
              display: inline-flex;
              position: absolute;
              bottom: 2px;
              right: 2px;
              cursor: pointer;
            }

            .name {}
          }

          .bgPay {
            background-color: #92f3ff;
          }
        }
      }

      .saleInfo {
        /*margin-top: 20px;*/
      }

      .opBtn {
        background: white;
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 70px;
        line-height: 70px;
        text-align: center;
      }

      .payList {
        .payItem {
          width: 296px;
          display: inline-block;
          border: 1px solid #e6e6e6;
          background-color: #f8fcfc;
          padding: 10px;
          margin-bottom: 10px;
          margin-right: 10px;
          border-radius: 6px;
          position: relative;

          .head {
            width: 100%;
            border-bottom: 1px solid #ccc;
            text-align: left;
            padding: 8px 0;
          }

          .info {
            width: 100%;
            position: relative;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;

            .num {
              font-size: 16px;
              font-weight: bold;
            }

            .name {
              position: absolute;
              bottom: 0;
              right: 10px;
              color: #909090;
            }
          }

          .choose {
            display: inline-flex;
            position: absolute;
            top: 2px;
            left: 2px;
            cursor: pointer;
          }

          .edit {
            display: inline-flex;
            position: absolute;
            top: 2px;
            right: 2px;
            cursor: pointer;
          }

          .delete {
            display: inline-flex;
            position: absolute;
            bottom: 2px;
            right: 2px;
            cursor: pointer;
          }
        }

        .bgPay {
          background-color: #92f3ff;
        }

        .payItem2 {
          width: 296px;
          height: 131px;
          display: inline-block;
          border: 1px solid #e6e6e6;
          background-color: #f8fcfc;
          padding: 10px;
          margin-bottom: 10px;
          margin-right: 10px;
          border-radius: 6px;
          vertical-align: bottom;
          cursor: pointer;

          .addInfo {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;

            .add {
              font-size: 30px;
            }

            .tips {
              font-size: 16px;
              margin-left: 10px;
            }
          }
        }
      }
    }
  }

}

</style>
