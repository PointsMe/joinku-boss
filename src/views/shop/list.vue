<template>
  <el-container>
    <el-header style="height: auto;padding: 0 0 20px 0">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="queryParams">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.gjz')" label-width="100px">
                  <el-input size="mini" v-model="queryParams.keyword" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.zt')" label-width="100px">
                  <el-select v-model="queryParams.state" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in stateList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.qy3')" label-width="100px">
                  <el-select v-model="queryParams.enabled" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in enabledList" :key="item.value" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary" size="mini" @click="searchDo()">{{ $t('common.sousuo') }}</el-button>
                <el-button type="primary" size="mini" @click="emptySearch()" style="margin:0px">{{ $t('common.qk') }}</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding: 0">
      <!-- :summary-method="getSummaries"
          show-summary -->
      <div class="table_container">
        <el-table
          :data="shopList"
          :height="heightDate"
          ref="table"
          class="table-fixed"
          style="width: 100%"
        >
          <el-table-column prop="name" header-align="center" align="left" :label="$t('common.onlineStoreName')"></el-table-column>
          <el-table-column prop="customerInfo" align="left" header-align="center" :label="$t('common.companyInfo')">
            <template slot-scope="scope">
              <p style="color: black;">{{scope.row.companyName}}</p>
              <p style="color: #989898;font-size: 13px;"><span>{{scope.row.taxCode}}</span>&nbsp;<span>{{scope.row.vatNumber}}</span></p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="companyName" header-align="center" align="left" label="公司名称"></el-table-column>
          <el-table-column prop="vatNumber" header-align="center" align="center" label="公司税号" width="160"></el-table-column>
          <el-table-column prop="taxCode" header-align="center" align="center" label="通用税号" width="160"></el-table-column> -->
          <!-- <el-table-column prop="country.name" header-align="center" align="center" label="国家" width="100"></el-table-column>
          <el-table-column prop="province.name" header-align="center" align="center" label="省份" width="100"></el-table-column>
          <el-table-column prop="city" header-align="center" align="center" label="城市" width="80"></el-table-column> -->
          <el-table-column prop="address" header-align="center" align="left" :label="$t('common.addressInfo')" width="300">
            <template slot-scope="scope">
              <p v-if="scope.row.address">{{scope.row.address}}</p>
              <p style="color: #777"><span>{{scope.row.city}}</span>&nbsp;<span v-if="scope.row.province">{{scope.row.province.name}}</span>&nbsp;<span v-if="scope.row.country">{{scope.row.country.name}}</span>&nbsp;<span>{{scope.row.zipcode}}</span> </p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="zipcode" header-align="center" align="center" label="邮编" width="80"></el-table-column> -->
          <el-table-column prop="contactName" header-align="center" align="left" :label="$t('common.linkmanInfo')" width="300">
            <template slot-scope="scope">
              <p v-if="scope.row.contactName">{{scope.row.contactName}}</p>
              <p v-if="scope.row.contactPhone">{{scope.row.contactPhone}}</p>
              <p v-if="scope.row.contactEmail">{{scope.row.contactEmail}}</p>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="contactName" header-align="center" align="center" label="联系人" width="100"></el-table-column>
          <el-table-column prop="contactPhone" header-align="center" align="center" label="联系人电话" width="120"></el-table-column>
          <el-table-column prop="contactEmail" header-align="center" align="center" label="联系人邮箱" width="100"></el-table-column> -->
          <el-table-column prop="state" header-align="center" align="center" :label="$t('common.zt')" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 101">{{$t('common.underReview')}}</span>
              <span v-if="scope.row.state == 102">{{$t('common.reviewPass')}}</span>
              <span v-if="scope.row.state == 103">{{$t('common.refuse')}}</span>
              <span v-if="scope.row.state == 104">{{$t('common.syncData')}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" width="200" :label="$t('common.cz')" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini" style="margin-left:0px;" @click="enableShop(scope.row);" v-if="!scope.row.enabled">{{$t('common.qy2')}}</el-button>
              <el-button type="text" size="mini" style="margin-left:0px;" @click="disableShop(scope.row);" v-else>{{$t('common.jy2')}}</el-button>
              <el-button type="text" size="mini" style="margin-left:0px;" @click="approveGo(scope.row);" v-if="scope.row.state == 101">{{$t('common.reviewPass')}}</el-button>
              <el-button type="text" size="mini" style="margin-left:0px;" @click="approveNotGo(scope.row);" v-if="scope.row.state == 101">{{$t('common.reviewNoPass')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
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
      </div>
    </el-main>
  </el-container>
</template>
<script>
import Vue from "vue";
import {
  onlineShopList,
  onlineShopDisable,
  onlineShopEnable,
  onlineShopApprove,
  onlineShopDisApprove
} from "@/api/api";
var moment = require("moment");
export default {
  name: "shopList",
  components: {
  
  },
  data() {
    return {
        heightDate: "100",
        //默认数据总数
        totalCount: 0,
        //当前页码
        currentPage: 1,
        //默认每页数据量 €
        pagesize: 15,
        shopList: [],
        queryParams: {
          keyword:'',
          state:'',
          enabled:''
        },
        enabledList:[
          {
            name:'启用',
            value:true
          },{
            name:'禁用',
            value:false
          }
        ],
        stateList:[
          {
            name:'审核中',
            value:101
          },{
            name:'审核通过',
            value:102
          },{
            name:'拒绝',
            value:103
          },{
            name:'同步数据中',
            value:104
          }
        ]
    };
  },
  methods: {
    searchDo() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getShopList(this.currentPage, this.pagesize);
    },
    emptySearch() {
      this.queryParams = {
        keyword:'',
        state:'',
        enabled:''
      };
      this.currentPage = 1;
      this.pagesize = 15;
      this.getShopList(this.currentPage, this.pagesize);
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getShopList(this.currentPage, this.pagesize);
    },
    doQuery() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getShopList(this.currentPage, this.pagesize);
    },

    getShopList(page, rows) {
      var that = this;
      var params = new URLSearchParams();
      params.append("page", page);
      params.append("rows", rows);
      params.append("keyword",this.queryParams.keyword);
      params.append("state", this.queryParams.state);
      params.append("enabled", this.queryParams.enabled);
      onlineShopList(params).then(function(res) {
          if (res.code == 20000) {
            that.totalCount = res.data.total;
            that.shopList = res.data.list;
            // 展示数据内容优化
            let lookHeight = 0;
            if (that.shopList.length > 0) {
              if (that.$refs && that.$refs.table && that.$refs.table.$el) {
                lookHeight = window.innerHeight - that.$refs.table.$el.offsetTop;
              }
            }
            that.$nextTick(() => {
              let headHeight = document.querySelectorAll("thead")[0]
                .offsetHeight;

              that.heightDate = lookHeight - headHeight - 100;
            });
          } else {
            that.$message.error(res.msg);
          }
        })
        .catch(function() {});
    },
    enableShop(dt){
      let params = new URLSearchParams();
      params.append("merchantId", dt.merchantId);
      onlineShopEnable(params).then((res)=>{
        if (res.code == 20000) {
          this.$message.success(res.msg);
          this.getShopList(this.currentPage, this.pagesize);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    disableShop(dt){
      let params = new URLSearchParams();
      params.append("merchantId", dt.merchantId);
      onlineShopDisable(params).then((res)=>{
        if (res.code == 20000) {
          this.$message.success(res.msg);
          this.getShopList(this.currentPage, this.pagesize);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    approveGo(dt){
      let params = new URLSearchParams();
      params.append("merchantId", dt.merchantId);
      onlineShopApprove(params).then((res)=>{
        if (res.code == 20000) {
          this.$message.success(res.msg);
          this.getShopList(this.currentPage, this.pagesize);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    approveNotGo(dt){
      let params = new URLSearchParams();
      params.append("merchantId", dt.merchantId);
      onlineShopDisApprove(params).then((res)=>{
        if (res.code == 20000) {
          this.$message.success(res.msg);
          this.getShopList(this.currentPage, this.pagesize);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
  },
  watch: {
  
  },
  created() {
  
  },
  mounted() {
    this.getShopList(this.currentPage, this.pagesize);
  },
  computed: {},
  filters: {
    timeChange(val) {
      if (val) {
        return moment(val).format("YYYY-MM-DD HH:mm:ss");
      } else {
        return "-";
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.search_container .el-form-item--mini.el-form-item,
.search_container .el-form-item--small.el-form-item {
  display: inline-block;
}
.searchClick {
  width: 23px;
  height: 40px;
  padding: 0;
  border-radius: 0;
  position: absolute;
  top: 10px;
  right: -23px;
}
.show-css {
  position: absolute;
  top: 50%;
  right: 63px;
}
.show-active {
  right: 423px;
}
</style>


