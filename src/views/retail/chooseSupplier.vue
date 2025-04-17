<template>
  <div class="chooseSupplier">
    <div class="tab">
      <div class="left" :class="{active:enabledAgent}" @click="agentTab('agent')">{{$t('common.haveSetProxy')}}</div>
      <div class="right" :class="{active:!enabledAgent}" @click="agentTab('unAgent')">{{$t('common.notSetProxy')}}</div>
    </div>
    <div class="productList" style="height: 400px;overflow: auto;margin-top: 10px;">
      <ul>
        <li v-for="(item,$index) in supplierList" :key="$index" style="width: 240px;display: inline-block;margin-right: 10px;cursor: pointer;" class="supplierList" @click="doChoose(item);">
          <el-card class="box-card">
            <div class="tp" style="display: flex;justify-content: space-between;align-items: center;">
              <el-image :src="item.logo" style="width: 50px;height: 50px;">
                <div slot="error" class="image-slot">
                    <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                  </div>
              </el-image>
              <span class="name">
                {{item.name}}
              </span>
            </div>
            <div class="agent" style="margin-top: 4px;height: 60px;position: relative;">
              <el-divider>{{$t('common.proxyInfo')}}</el-divider>
              <div v-if="item.agent" style="margin-top: 10px;">
                <!-- <p>{{item.agent.name}}</p> -->
                <p v-if="item.agent.raisePrice">{{$t('common.changePrice')}}:€<span style="color: #f56954;">{{item.agent.raisePrice}}</span></p>
                <p v-if="item.agent.raisePercent" style="margin-top: 6px;">{{$t('common.percentDiscount')}}:<span style="color: #f56954;">{{item.agent.raisePercent}}</span>%</p>
                <p v-if="item.agent.minOrderAmount" style="margin-top: 6px;">{{$t('common.ordersMoney')}}:€<span style="color: #f56954;">{{item.agent.minOrderAmount}}</span></p>
                <p v-if="item.agent.postageAmount" style="margin-top: 6px;">{{$t('common.postage')}}:€<span style="color: #f56954;">{{item.agent.postageAmount}}</span></p>
                <p v-if="item.tester" style="position: absolute;right: 6px;top: 12px;">
                  <el-tag type="info" size="mini" effect="plain">{{$t('common.test')}}</el-tag>
                </p>
                <p v-if="item.owned" style="position: absolute;right: 6px;top: 36px;">
                  <el-tag type="success" size="mini" effect="plain">{{$t('common.selfSupport')}}</el-tag>
                </p>
              </div>
              <div v-else style="margin-top: 10px;text-align: center;">
                {{$t('common.noProxyInfo')}}
              </div>
            </div>
            <span v-if="item.active" class="chooseIcon">
              <i class="el-icon-check"></i>
            </span>
          </el-card>
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
    <div style="margin-top:10px; text-align: right;" v-if="enabledAgent">
      <el-button size="medium" @click="cancleChoose">{{ $t('common.qx') }}</el-button>
      <el-button type="primary" size="medium" @click="reviseAgent">{{$t('common.distriSet')}}</el-button>
      <el-button type="primary" size="medium" @click="gotoCategory">{{$t('common.clasDistri')}}</el-button>
      <el-button type="primary" size="medium" @click="goToProduct">{{$t('common.goChooseGoods')}}</el-button>
    </div>
    <div style="margin-top:10px; text-align: right;" v-if="!enabledAgent">
      <el-button size="medium" @click="cancleChoose">{{ $t('common.qx') }}</el-button>
      <el-button type="primary" size="medium" @click="addAgent">{{$t('common.distriSet')}}</el-button>
    </div>
    <Agent :showAgent="showAgent" :opType="opType" :agentInfo="agentInfo" :isModal="false" @cancleAgent="cancleAgent" @successAgent="successAgent"></Agent>
  </div>
</template>
<script>
import Vue from "vue";
import Agent from '@/views/retail/agent'
import {
  getSupplierList
} from "@/api/api";
export default {
  components: {
    Agent
  },
  props: {
  
  },
  data() {
    return {
      //当前页码
      currentPage: 1,
      //默认每页数据量 €
      pagesize: 15,
      totalCount: 0,
      enabledAgent: true,
      supplierList: [],
      showAgent: false,
      opType: '',
      agentInfo: '',
      chooseSupplier: ''
    }
  },
  methods: {
    doChoose(dt) {
      this.chooseSupplier = '';
      for (let i = 0; i < this.supplierList.length; i++) {
        if (dt.id == this.supplierList[i].id) {
          this.supplierList[i].active = !this.supplierList[i].active;
          if (this.supplierList[i].active) {
            this.chooseSupplier = this.supplierList[i];
          }
        } else {
          this.supplierList[i].active = false;
        }
      }
    },
    showAgentAdd(dt,type) {
      this.opType = type;
      this.agentInfo = dt;
      this.showAgent = true;
    },
    cancleAgent() {
      this.opType = '';
      this.agentInfo = '';
      this.showAgent = false;
    },
    successAgent() {
      this.showAgent = false;
      this.getSupplierList(this.currentPage, this.pagesize);
    },
    cancleChoose() {
      this.enabledAgent = true;
      this.getSupplierList(this.currentPage, this.pagesize);
      this.$emit('cancleChoose');
    },
    reviseAgent() {
      if (!this.chooseSupplier) {
        this.$message({
          message: this.$t('common.chooseWholesaler2') + '!',
          type: 'warning'
        });
      } else {
        this.showAgentAdd(this.chooseSupplier,'revise');
      }
    },
    addAgent() {
      if (!this.chooseSupplier) {
        this.$message({
          message: this.$t('common.chooseWholesaler2') + '!',
          type: 'warning'
        });
      } else {
        this.showAgentAdd(this.chooseSupplier,'add');
      }
    },
    goToProduct() {
      if (!this.chooseSupplier) {
        this.$message({
          message: this.$t('common.chooseWholesaler2') + '!',
          type: 'warning'
        });
      } else {
        this.$emit('goToProduct',this.chooseSupplier);
      }
    },
    gotoCategory(){
      if (!this.chooseSupplier) {
        this.$message({
          message: this.$t('common.chooseWholesaler2') + '!',
          type: 'warning'
        });
      } else {
        this.$emit('gotoCategory',this.chooseSupplier);
      }
    },
    agentTab(tp) {
      if (tp == 'agent') {
        this.enabledAgent = true;
      } else {
        this.enabledAgent = false;
      }
      for (let i = 0; i < this.supplierList.length; i++) {
        Vue.set(this.supplierList[i],'active',false);
      }
      this.chooseSupplier = '';
      this.agentInfo = '';
      this.getSupplierList(this.currentPage, this.pagesize);
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSupplierList(this.currentPage, this.pagesize);
    },
    getSupplierList(page, rows) {
      var that = this;
      // var params = new URLSearchParams();
      // params.append("page", page);
      // params.append("rows", rows);
      // params.append("biz",101);
      // params.append("enabledAgent", this.enabledAgent);
      // params.append("owned",true);
      let params = {
        page:1,
        size:15,
        enabledAgent:this.enabledAgent,
        owned:true
      }
      getSupplierList(params).then((res) => {
          if (res.code == 20000) {
            that.totalCount = res.data.total;
            that.supplierList = res.data.list;
            for (let i = 0; i < that.supplierList.length; i++) {
              Vue.set(that.supplierList[i],'active',false);
              if (that.chooseSupplier && that.chooseSupplier.id == that.supplierList[i].id) {
                that.chooseSupplier = that.supplierList[i];
                Vue.set(that.supplierList[i],'active',true);
              }
            }
          } else {
            that.$message.error(res.msg);
          }
        })
        .catch(function() {});
    }
  },
  computed: {
  
  },
  watch: {
  
  },
  created() {
    this.getSupplierList(this.currentPage, this.pagesize);
  },
}
</script>

<style lang="scss" scoped>
.chooseSupplier{
  .supplierList{
    position: relative;
    .chooseIcon{
      position: absolute;
      right: 10px;
      bottom: 0px;
      font-size: 40px;
      color: green;
    }
  }
  .tab{
    display: flex;
    width: 300px;
    height: 44px;
    border: 1px solid #ccc;
    justify-content: space-between;
    .left,.right{
      width: 50%;
      height: 100%;
      position: relative;
      line-height: 2.5;
      font-size: 16px;
      text-align: center;
      cursor: pointer;
      &.active{
        background: #107c3f;
        color: white;
      }
    }
    .right::before{
      content: '';
      width: 1px;
      height: 100%;
      background-color: #d4d4d4;
      position: absolute;
      left: 0;
      top: 0;
    }
    .right{

    }
  }
}

</style>
