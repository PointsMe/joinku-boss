<template>
  <el-container>
    <!-- <el-header style="height: auto;padding: 0 0 20px 0">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="queryParams">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.userName')+':'" label-width="100px">
                  <el-input size="mini" v-model="queryParams.username" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label=" 电话:" label-width="100px">
                  <el-input size="mini" v-model="queryParams.mobile" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item label="启用禁用:" label-width="100px">
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
    </el-header> -->
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
          <el-table-column align="center" prop="username" :label="$t('common.mingcheng')" width="240">
            <template slot-scope="scope">
              <div class="info" style="display: inline-block;text-align: left;vertical-align: middle;">
                <p class="name">{{scope.row.username}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="email" :label="$t('common.yx')" width="180"></el-table-column>
          <el-table-column align="center" prop="createdAt" :label="$t('common.creatTime')" width="180">
            <template slot-scope="scope">
              <div class="info" style="display: inline-block;text-align: left;vertical-align: middle;">
                <p class="name">{{scope.row.createdAt | timeChange}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="content" :label="$t('common.content')"></el-table-column>
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
  contactList,
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
        // queryParams: {
        //   username:'',
        //   mobile:'',
        //   enabled:'',
        // },
        // enabledList:[
        //   {
        //     name:'启用',
        //     value:true
        //   },{
        //     name:'禁用',
        //     value:false
        //   }
        // ],
        opItem:'',
        password:'',
    };
  },
    methods: {
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
        // params.append("username", this.queryParams.username);
        // params.append("mobile", this.queryParams.mobile);
        // params.append("enabled",this.queryParams.enabled);
        contactList(params).then(function(res) {
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


