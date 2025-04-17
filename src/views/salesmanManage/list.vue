<template>
  <el-container>
    <el-header style="height: auto;padding: 0 0 20px 0">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="queryParams">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.userName')+':'" label-width="100px">
                  <el-input size="mini" v-model="queryParams.username" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.dianhua')+':'" label-width="100px">
                  <el-input size="mini" v-model="queryParams.mobile" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.ifEnabled')+':'" label-width="100px">
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
          :data="supplierList"
          :height="heightDate"
          ref="table"
          class="table-fixed"
          style="width: 100%"
        >
          <el-table-column align="left" header-align="center" prop="sales" :label="$t('common.mingcheng')">
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
          <el-table-column align="center" prop="enabled" :label="$t('common.ifEnabled')" width="80">
            <template slot-scope="scope">
              <span v-if="scope.row.enabled">{{ $t('common.qy2') }}</span>
              <span v-else>{{ $t('common.jy2') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" width="190" :label="$t('common.cz')" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini" v-if="scope.row.enabled" @click="doEnable(scope.row);">{{ $t('common.jy2') }}</el-button>
              <el-button type="text" size="mini" v-else @click="doEnable(scope.row);">{{ $t('common.qy2') }}</el-button>
              <el-button type="text" size="mini" @click="getPsw(scope.row);">{{$t('common.temporaryPwd')}}</el-button>
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
  getSalesmanList,
  salesmanEnabled,
  salesmanPwd,
} from "@/api/api";
import clip from '@/utils/clipboard'
var moment = require("moment");
export default {
  name: "supplierList",
  components: {},
  data() {
    return {
        heightDate: "100",
        //默认数据总数
        totalCount: 0,
        //当前页码
        currentPage: 1,
        //默认每页数据量 €
        pagesize: 15,
        supplierList: [],
        queryParams: {
          username:'',
          mobile:'',
          enabled:'',
        },
        enabledList:[
          {
            name: this.$t('common.qy2'),
            value:true
          },{
            name: this.$t('common.jy2'),
            value:false
          }
        ],
        opItem:'',
        password:'',
    };
  },
    methods: {
      handleCopy(text, event){
        clip(text, event);
      },
      getPsw(row){
        var params = new URLSearchParams();
        params.append("id", row.id);
        salesmanPwd(params).then((res)=>{
            if (res.code == 20000) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              for(let i = 0; i < this.supplierList.length;i++){
                if(this.supplierList[i].id == row.id){
                  this.supplierList[i].password = res.data.password;
                }
              }
            } else {
              this.$message.error(res.msg);
            }
          }).catch(()=>{

          });
      },
      doEnable(row){
        var params = new URLSearchParams();
        params.append("id", row.id);
        params.append("enabled", !row.enabled);
        salesmanEnabled(params).then((res)=>{
            if (res.code == 20000) {
              this.$message({
                message: res.msg,
                type: "success"
              });
              this.getSupplierList(this.currentPage, this.pagesize);
            } else {
              this.$message.error(res.msg);
            }
          }).catch(()=>{

          });
      },
      searchDo() {
        this.currentPage = 1;
        this.pagesize = 15;
        this.getSupplierList(this.currentPage, this.pagesize);
      },
      emptySearch() {
        this.queryParams = {
          username:'',
          mobile:'',
          enabled:'',
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
        var params = new URLSearchParams();
        params.append("page", page);
        params.append("rows", rows);
        params.append("username", this.queryParams.username);
        params.append("mobile", this.queryParams.mobile);
        params.append("enabled",this.queryParams.enabled);
        getSalesmanList(params).then(function(res) {
            if (res.code == 20000) {
              that.totalCount = res.data.total;
              that.supplierList = res.data.list;
              for(let i = 0; i < that.supplierList.length;i++){
                Vue.set(that.supplierList[i],'password','')
              }
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


