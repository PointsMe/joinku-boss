<template>
  <el-container>
    <el-header style="height: auto;padding: 0 0 20px 0">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="queryParams">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.gysmc')" label-width="100px">:
                  <el-input size="mini" v-model="queryParams.name" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <!-- <el-form-item :label="$t('common.gsmc2')" label-width="100px">:
                  <el-input size="mini" v-model="queryParams.companyName" clearable style="width: 160px;"></el-input>
                </el-form-item> -->
                <el-form-item :label="$t('common.companyTfn')" label-width="100px">:
                  <el-input size="mini" v-model="queryParams.vatNumber"clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.generalTfn')" label-width="100px">:
                  <el-input size="mini" v-model="queryParams.taxCode" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-button type="primary" size="mini" @click="searchDo()">{{ $t('common.sousuo') }}</el-button>
                <el-button type="info" size="mini" @click="emptySearch()" style="margin:0px">{{ $t('common.qk') }}</el-button>
                <el-button type="primary" size="mini" @click="add();">{{ $t('common.add') }}</el-button>
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
          :data="supplierList"
          :height="heightDate"
          ref="table"
          class="table-fixed"
          style="width: 100%"
        >
          <el-table-column prop="name" :label="$t('common.supplier')" min-width="300" align="left" header-align="left">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-image :src="scope.row.logoUrl" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;" v-if="scope.row.logoUrl">
                    <div slot="error" class="image-slot">
                      <img src="../../assets/images/default.png" style="width: 50px;height: 50px;"/>
                    </div>
                </el-image>
                <div v-if="!scope.row.logoUrl" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                    <img src="../../assets/images/default.png" style="width: 50px;height: 50px;">
                </div>
                <div style="display:flex;flex-direction: column;text-align: left;marginLeft:10px;">
                  <span>{{ scope.row.name }}</span>
                  <span>{{ scope.row.id }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="company" :label="$t('common.companyInfo')" align="left" header-align="left" width="300">
            <template slot-scope="scope">
              <p>
                <span>{{scope.row.company.firstName}} {{scope.row.company.lastName}}</span>
              </p>
              <p>
                <span>{{scope.row.company.name}}</span>
              </p>
              <p style="color: #777777">
                <span>{{scope.row.company.vatNumber}}</span>&nbsp;&nbsp;<span>{{scope.row.company.taxCode}}</span>
              </p>
              <p style="color: #777777">
                <span>{{scope.row.company.address}} {{scope.row.company.houseNumber}} <span v-if="scope.row.company.city">-{{scope.row.company.city}}</span><span v-if="scope.row.company.province">-{{scope.row.company.province.name}}</span> </span><span v-if="scope.row.company.country">-{{scope.row.company.country.name}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="address" :label="$t('common.addrInfo')" align="left" header-align="left" width="300">
            <template slot-scope="scope">
              <div v-if="scope.row.address">
                  <p>{{ scope.row.address.address }}</p>
                  <p style="color: #777777">
                      <span>
                        <span v-if="scope.row.address.city">{{scope.row.address.city}}</span>
                        <span v-if="scope.row.address.province">-{{ scope.row.address.province.name }}</span>
                      </span>
                      <span v-if="scope.row.address.country">-{{ scope.row.address.country.name }}</span>
                      <span>-{{ scope.row.address.zipcode }}</span>
                  </p>
                  <p style="color: #777777">
                      {{ scope.row.address.contactName }}
                      {{ scope.row.address.contactPhone }}
                      <!-- {{ scope.row.address.contactEmail }} -->
                  </p>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="raisePrice" align="left" header-align="center" width="240" :label="$t('common.proxyInfo')">
            <template slot-scope="scope">
              <div v-if="scope.row.agent">
                <p>{{scope.row.agent.name}}</p>
                <p v-if="scope.row.agent.raisePrice">changePrice:€<span style="color: #f56954;">{{scope.row.agent.raisePrice}}</span></p>
                <p v-if="scope.row.agent.raisePercent">{{ $t('common.percentDiscount') }}:<span style="color: #f56954;">{{scope.row.agent.raisePercent}}</span>%</p>
                <p v-if="scope.row.agent.minOrderAmount">{{$t('common.ordersMoney')}}:€<span style="color: #f56954;">{{scope.row.agent.minOrderAmount}}</span></p>
              </div>
            </template>
          </el-table-column> -->
          <el-table-column prop="contactName" header-align="center" align="left" :label="$t('common.linkmanInfo')" width="240">
            <template slot-scope="scope">
              <p v-if="scope.row.company">{{scope.row.company.contactName}}</p>
              <p v-if="scope.row.company">{{scope.row.company.contactPhone}}</p>
              <p v-if="scope.row.company">{{scope.row.company.contactEmail}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" width="180" :label="$t('common.cz')" fixed="right">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="mini" style="margin-left:0px;" @click="showAgentAdd(scope.row,'add');">{{$t('common.distriSet')}}</el-button> -->

              <!-- <el-button type="text" size="mini" style="margin-left:0px;" v-if="!scope.row.agent" @click="showAgentAdd(scope.row,'add');">添加代理</el-button>
              <el-button type="text" size="mini" style="margin-left:0px;" v-if="scope.row.agent" @click="showAgentAdd(scope.row,'revise');">修改代理</el-button> -->
              <!-- <el-button type="text" size="mini" style="margin-left:0px;" @click="deleteAgent(scope.row.id);">{{$t('common.forbidDistri')}}</el-button> -->
              <el-button type="text" size="mini" style="margin-left:0px;" @click="showEmploee(scope.row);">{{$t('common.employeeList')}}</el-button>
              <el-button size="mini" type="text" @click="revise(scope.row)">{{$t("common.xg")}}</el-button>
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

    <el-dialog :title="$t('common.employeeList')" :visible.sync="employee" width="60%" :close-on-click-modal="true" :show-close="true" :close-on-press-escape="false">
      <div class="center">
          <el-table :data="employeeList" style="width: 100%">
              <el-table-column align="center" prop="number" :label="$t('common.wkno')" width="100"></el-table-column>
              <el-table-column align="left" header-align="center" prop="sales" :label="$t('route.employeeManage')">
                <template slot-scope="scope">
                  <div class="logo" style="display: inline-block;vertical-align: middle;line-height: 1;">
                    <el-image style="width: 50px;height: 50px;border-radius: 50%; margin-right: 5px" :src="scope.row.avatar" fit="contain">
                      <div slot="error" class="image-slot">
                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                      </div>
                    </el-image>
                  </div>
                  <div class="info" style="display: inline-block;text-align: left;vertical-align: middle;">
                    <p class="name">{{scope.row.username}}</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="email" :label="$t('common.yx')"  width="180"></el-table-column>
              <el-table-column align="center" prop="mobile" :label="$t('common.sjh')"  width="140"></el-table-column>
              <el-table-column align="center" prop="enabled" :label="$t('common.qy3')" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.enabled">{{ $t('common.qy2') }}</span>
                  <span v-else>{ $t('common.jy2') }}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="owner" :label="$t('common.owner')" width="80">
                <template slot-scope="scope">
                  <span v-if="scope.row.owner">{{$t('common.yes')}}</span>
                  <span v-else>{{$t('common.fou')}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" :label="$t('common.cz')" width="160">
                  <template slot-scope="scope">
                      <el-button type="text" size="mini" @click="getPsw(scope.row)">{{$t('common.temporaryPwd')}}</el-button>
                      <span v-if="scope.row.password" style="color: #f56c6c;">
                        {{(scope.row.password)}}
                        <span @click="handleCopy(scope.row.password,$event)">{{$t('common.copy')}}</span>
                      </span>
                  </template>
              </el-table-column>
          </el-table>
          <div class="pagination">
              <el-pagination
                  background
                  @size-change="handleSizeChangePro"
                  @current-change="handleCurrentChangePro"
                  :current-page="currentPagePro"
                  :page-size="pagesizePro"
                  layout="total, prev, pager, next"
                  :total="totalCountPro">
              </el-pagination>
          </div>
      </div>
    </el-dialog>
    <Agent :showAgent="showAgent" :opType="opType" :agentInfo="agentInfo" @cancleAgent="cancleAgent" @successAgent="successAgent"></Agent>
  </el-container>
</template>
<script>
import Vue from "vue";
import {
  getSupplierList,
  supplierEmpList,
  supplierEmpPwd,
  agentDelete
} from "@/api/api";
import Agent from '@/views/wholesale/agent'
import clip from '@/utils/clipboard'
var moment = require("moment");
export default {
  name: "supplierList",
  components: {
    Agent
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
        currentPagePro: 1,
        pagesizePro: 15,
        totalCountPro: 0,
        supplierList: [],
        queryParams: {
          categoryId:'',
          name:'',
          companyName:'',
          vatNumber:'',
          taxCode:'',
        },
        employee:false,
        employeeList:[],
        opItem:'',
        password:'',
        showAgent: false,
        opType: '',
        agentInfo: ''
    };
  },
  methods: {
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
    deleteAgent(id) {
      var that = this;
      that.$confirm(that.$t('common.deleteIs') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.queding'),
        cancelButtonText: that.$t('common.qx'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('merchantId', id);
        agentDelete(params)
          .then(function(res) {
            if (res.code == 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.getSupplierList(that.currentPage, that.pagesize);
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](function() {});
      })['catch'](() => {});
    },
    handleCopy(text, event){
      clip(text, event);
    },
    getPsw(row){
      var params = new URLSearchParams();
      params.append("id", row.id);
      supplierEmpPwd(params).then((res)=>{
          if (res.code == 20000) {
            this.$message({
              message: res.msg,
              type: "success"
            });
            for(let i = 0; i < this.employeeList.length;i++){
              if(this.employeeList[i].id == row.id){
                this.employeeList[i].password = res.data.password;
              }
            }
          } else {
            this.$message.error(res.msg);
          }
        }).catch(()=>{

        });
    },
    showEmploee(row){
      this.opItem = row;
      this.employee = true;
      this.password = '';
      this.getEmployeeList(this.currentPagePro, this.pagesizePro);
    },
    getEmployeeList(page, rows){
      var that = this;
      var params = new URLSearchParams();
      params.append("page", page);
      params.append("rows", rows);
      params.append("merchantId", this.opItem.id);
      supplierEmpList(params).then(function(res) {
          var data = res.data;
          if (res.code == 20000) {
            that.totalCountPro = res.data.total;
            that.employeeList = data.list;
            for(let i = 0; i < that.employeeList.length;i++){
              Vue.set(that.employeeList[i],'password','')
            }
          } else {
            that.$message.error(res.msg);
          }
      }).catch(function() {});
    },
    handleSizeChangePro(val) {
      this.pagesize = val;
    },
    handleCurrentChangePro(val) {
      this.currentPage = val;
      this.getEmployeeList(this.currentPagePro, this.pagesizePro);
    },
    searchDo() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getSupplierList(this.currentPage, this.pagesize);
    },
    emptySearch() {
      this.queryParams = {
        categoryId:'',
        name:'',
        companyName:'',
        vatNumber:'',
        taxCode:'',
      };
      this.currentPage = 1;
      this.pagesize = 15;
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
    doQuery() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getSupplierList(this.currentPage, this.pagesize);
    },

    getSupplierList(page, rows) {
      var that = this;
      var params = {
        page:page,
        size:rows,
        categoryId: this.queryParams.categoryId,
        name:this.queryParams.name,
        companyName:this.queryParams.companyName,
        vatNumber:this.queryParams.vatNumber,
        taxCode:this.queryParams.taxCode
      };
      getSupplierList(params).then(function(res) {
          if (res.code == 20000) {
            that.totalCount = res.data.total;
            that.supplierList = res.data.list;
            // 展示数据内容优化
            let lookHeight = 0;
            if (that.supplierList.length > 0) {
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
    add(){
      this.$router.push({ name: 'SupplierDetail' });
    },
    revise(row) {
      this.$router.push({name: "SupplierDetail", query: {id: row.id}});
    },
  },
  watch: {
  
  },
  created() {
  
  },
  mounted() {
    this.getSupplierList(this.currentPage, this.pagesize);
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


