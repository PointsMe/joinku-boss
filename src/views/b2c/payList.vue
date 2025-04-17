<template>
  <el-container>
    <el-header style="height: auto;">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="searchForm">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('route.supplierManage')+':'" label-width="80px">
                  <el-autocomplete type="text" clearable autosize style=" width: 200px" :fetch-suggestions="remoteMethod" v-model="searchForm.supplierName" suffix-icon="el-icon-search"  @select="handleSelect" @change="doQuery2"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('common.onlineStore')" label-width="80px">
                  <el-autocomplete type="text" clearable autosize style=" width: 200px" :fetch-suggestions="remoteMethod2" v-model="searchForm.merchantName" suffix-icon="el-icon-search"  @select="handleSelect2"  @change="doQuery3"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('common.payTime')+':'" label-width="80px">
                  <el-date-picker v-model="searchForm.minPaidAt" type="date" size="mini" :placeholder="$t('common.minPayTime')" clearable style="width: 170px;"></el-date-picker>
                  <el-date-picker v-model="searchForm.maxPaidAt" type="date" size="mini" :placeholder="$t('common.maxPayTime')" clearable style="width: 170px;"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('common.je')+':'" label-width="50px">
                  <el-input size="mini" v-model="searchForm.minAmount" :placeholder="$t('common.zxje')" clearable style="width: 140px;"></el-input> -
                  <el-input size="mini" v-model="searchForm.maxAmount" :placeholder="$t('common.zdje')" clearable style="width: 140px;"></el-input>
                </el-form-item>
                <el-form-item label-width="72px" :label="$t('common.payZhanghao')+':'" prop="payeeAccountId">
                  <el-select v-model="searchForm.payeeAccountId" style="width: 150px;" clearable>
                    <el-option v-for="item in payeeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.approvalState')+':'" label-width="80px">
                  <el-select v-model="searchForm.state" size="mini" clearable style="width: 150px;">
                    <el-option v-for="item in stateLsit" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <!-- <el-form-item :label="$t('common.type')+':'" label-width="50px">
                  <el-select v-model="searchForm.type" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in typeLsit" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item> -->
                <el-button type="primary" size="mini" @click="searchDo()">{{$t('common.sousuo')}}</el-button>
                <el-button type="primary" size="mini" @click="emptySearch()" style="margin:0px">{{$t('common.qk')}}</el-button>
              </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.type')+':'" label-width="90px">
                  <el-select v-model="searchForm.type" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in typeLsit" :key="item.id" :label="item.value" :value="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-button type="primary" size="mini" @click="searchDo()">{{$t('common.sousuo')}}</el-button>
                <el-button type="primary" size="mini" @click="emptySearch()" style="margin:0px">{{$t('common.qk')}}</el-button>
              </el-col>
            </el-row> -->
          </el-form>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <div class="table_container">
        <el-table :data="fullReductionList" ref="fullTable" style="width: 100%" row-key="id" :height="heightDate" class="table-fixed">
          <el-table-column prop="number" align="center" :label="$t('common.singleNum')" width="180"></el-table-column>
          <el-table-column prop="paidAt" align="center" :label="$t('common.getPayTime')" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.paidAt | timeChange}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" align="center" :label="$t('common.requestTime')" width="130">
            <template slot-scope="scope">
              <span>{{scope.row.createdAt | timeChange}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="customer" align="left" header-align="center" width="120" :label="$t('common.payee')">
            <template slot-scope="scope">
              <div v-if="scope.row.member">
                <p>{{scope.row.member.username}}</p>
                <p>{{scope.row.member.mobile}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="customer" align="left" header-align="center" width="180" :label="$t('route.onlineShopManage')">
            <template slot-scope="scope">
              <div v-if="scope.row.merchant">
                <p>{{scope.row.merchant.name}}</p>
                <p>{{scope.row.merchant.contactName}} {{scope.row.merchant.contactPhone}}</p>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="customer" align="left" header-align="center" width="180" :label="$t('common.supplier')">
            <template slot-scope="scope">
              <div v-if="scope.row.supplier">
                <p>{{scope.row.supplier.name}}</p>
                <p>{{scope.row.supplier.contactName}} {{scope.row.supplier.contactPhone}}</p>
              </div>
            </template>
          </el-table-column>
          <!-- <el-table-column prop="type" align="center" :label="$t('common.type')">
            <template slot-scope="scope">
              <p v-if="scope.row.type == 101">{{ $t('common.purchaseOrder') }}</p>
              <p v-if="scope.row.type == 103">{{ $t('common.retailOrder') }}</p>
            </template>
          </el-table-column> -->
          <el-table-column prop="amount" width="140" align="right" :label="$t('common.doPayAmount') + '(€)'">
            <template slot-scope="scope">
              <span style="color: #f56954;font-size: 14px;">{{scope.row.amount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="payeeAccount" width="140" align="center" :label="$t('common.payZhanghao')">
            <template slot-scope="scope">
              <p v-if="scope.row.payeeAccount">{{scope.row.payeeAccount.name}}</p>
              <p v-if="scope.row.payeeAccount">{{scope.row.payeeAccount.iban}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" :label="$t('common.approvalState')" width="100">
            <template slot-scope="scope">
              <el-tag type="error" v-if="scope.row.state == 101">{{ $t('common.waitReview2') }}</el-tag>
              <el-tag type="success" v-if="scope.row.state == 102">{{ $t('common.reviewPass2') }}</el-tag>
              <el-tag type="info" v-if="scope.row.state == 103">{{ $t('common.reviewNotPass') }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="status" align="center" :label="$t('common.payMethod')" width="100">
            <template slot-scope="scope">
              <el-tag type="info" size="mini" effect="plain" v-if="scope.row.paymode == 101">{{$t('common.deliveryPay')}}</el-tag>
              <el-tag type="danger" size="mini" effect="plain" v-if="scope.row.paymode == 102">{{$t('common.onLinePay')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="remark" align="center" :label="$t('common.bz')" width="130"></el-table-column>
          <el-table-column prop="createdAt" align="center" :label="$t('common.relativeOrder')" width="130">
            <template slot-scope="scope">
              <el-link type="primary" style="font-size: 12px" @click="goTodetail(scope.row)">{{ $t('common.watch') }}</el-link>
            </template>
          </el-table-column>
          <el-table-column align="center" width="340" :label="$t('common.cz')" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" @click="showDetail(scope.row)">{{ $t('common.detail') }}</el-button>
              <el-button type="primary" @click="approve(scope.row)" v-if="scope.row.state == 101">{{ $t('common.reviewPass') }}</el-button>
              <el-button type="primary" @click="disApprove(scope.row)" v-if="scope.row.state == 101">{{ $t('common.dispatch') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
    </el-main>
    <el-dialog :title="$t('common.detail')" :visible.sync="detailShow" width="700px" :close-on-click-modal="true" :show-close="true" :close-on-press-escape="false">
      <div class="center">
        <el-form ref="detailForm" @submit.native.prevent :model="chooseItem">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="$t('common.singleNum') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.number}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.reviewer') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.auditorName}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.requester') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.operatorName}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.payee') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <p v-if="chooseItem.member">{{chooseItem.member.username}}</p>
                <p v-if="chooseItem.member">{{chooseItem.member.mobile}}</p>
              </el-form-item>
              <el-form-item :label="$t('common.doPayAmount') + '(€)'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.amount}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.payZhanghao') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <p v-if="chooseItem.payeeAccount">{{chooseItem.payeeAccount.name}}</p>
                <p v-if="chooseItem.payeeAccount">{{chooseItem.payeeAccount.iban}}</p>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="$t('common.zt') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <el-tag type="error" v-if="chooseItem.state == 101">{{ $t('common.waitReview') }}</el-tag>
                <el-tag type="success" v-if="chooseItem.state == 102">{{ $t('common.doneComplete') }}</el-tag>
                <el-tag type="info" v-if="chooseItem.state == 103">{{ $t('common.doneNone') }}</el-tag>
              </el-form-item>
              <el-form-item :label="$t('common.getPayTime') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.paidAt | timeChange}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.requestTime') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.createdAt | timeChange}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.bz') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <span>{{chooseItem.remark}}</span>
              </el-form-item>
              <el-form-item :label="$t('common.tupian') + ':'" label-width="120px" style="margin-bottom: 10px;">
                <el-image v-if="chooseItem.images && chooseItem.images.length > 0" style="width: 60px;height: 60px;border-radius: 4px;margin-right: 4px;" :src="item" fit="contain" :key="$index" v-for="(item,$index) in chooseItem.images" :preview-src-list="[item]"></el-image>
                <div v-if="!chooseItem.images">
                  <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="canclePayee">取 消</el-button>
          <el-button type="primary" @click="doPayee">确 定</el-button> -->
      </span>
    </el-dialog>
  </el-container>
</template>
<script>
import { paymentList, paymentApprove, paymentDisapprove, orderPayeeList, supplierMerchantList ,getSupplierList,onlineShopList } from '@/api/api';
var moment = require('moment');
export default {
  name: 'pay',
  components: {},
  data() {
    return {
      customerList: [],
      payeeList: [],
      stateLsit: [{
        id: 101,
        value: this.$t('common.waitReview2')
      }, {
        id: 102,
        value: this.$t('common.reviewPass2')
      }, {
        id: 103,
        value: this.$t('common.reviewNotPass')
      }],
      // typeLsit: [{
      //   id: 101,
      //   value: this.$t('common.purchaseOrder')
      // }, {
      //   id: 103,
      //   value: this.$t('common.retailOrder')
      // }],
      fullReductionList: [],
      heightDate: '42',
      searchForm: {
        name: '',
        supplierId: '',
        merchantId:'',
        supplierName:'',
        merchantName:'',
        minPaidAt: '',
        maxPaidAt: '',
        minAmount: '',
        maxAmount: '',
        payeeAccountId: '',
        state: '',
        type:''
      },
      // 默认数据总数
      totalCount: 0,
      // 当前页码
      currentPage: 1,
      // 默认每页数据量 €
      pagesize: 15,
      detailShow: false,
      chooseItem: {}
    };
  },
  methods: {
    doQuery2(dt){
      if(!dt){
        this.searchForm.supplierId = '';
        this.getFullDiscount(this.currentPage, this.pagesize);
      }
    },
    doQuery3(dt){
      if(!dt){
        this.searchForm.merchantId = '';
        this.getFullDiscount(this.currentPage, this.pagesize);
      }
    },
    handleSelect(item){
      this.searchForm.supplierId = item.id;
    },
    handleSelect2(item){
      this.searchForm.merchantId = item.merchantId;
    },
    remoteMethod2(queryString, cb) {
      let params = new URLSearchParams();
      params.append("page", 1);
      params.append("rows", 15);
      params.append("keyword", queryString);
      onlineShopList(params).then((res) => {
        if (res.code === 20000) {
          for(let i = 0; i < res.data.list.length;i++){
            res.data.list[i].value = res.data.list[i].name?res.data.list[i].name:(res.data.list[i].firstName + ' ' + res.data.list[i].lastName);
            res.data.list[i].value += res.data.list[i].vatNumber?('-' + res.data.list[i].vatNumber):'';
          }
          cb(res.data.list);
        }
      })
      .catch(() => {
      });
    },
    remoteMethod(queryString, cb) {
      let params = {
        page:1,
        size:15,
        name:queryString
      }
      getSupplierList(params).then((res) => {
        if (res.code === 20000) {
          for(let i = 0; i < res.data.list.length;i++){
            res.data.list[i].value = res.data.list[i].name?res.data.list[i].name:(res.data.list[i].firstName + ' ' + res.data.list[i].lastName);
            res.data.list[i].value += res.data.list[i].vatNumber?('-' + res.data.list[i].vatNumber):'';
          }
          cb(res.data.list);
        }
      })
      .catch(() => {
      });
    },
    downloadImg() {
      var a = document.createElement('a');
      a.download = 'pic';
      // 设置图片地址
      a.href = this.chooseItem.images;
      a.click();
    },
    goTodetail(dt) {
      // if(dt.type == 101){
        this.$router.push({ name: 'b2cOrderDetail', query: { id: dt.orderId } });
      // }else if(dt.type == 103){
      //   this.$router.push({ name: 'RetailDetail', query: { id: dt.orderId } });
      // }
    },
    showDetail(dt) {
      this.chooseItem = dt;
      this.detailShow = true;
    },
    // 收款账号
    getPayeeList() {
      orderPayeeList().then(res => {
        if (res.code === 20000) {
          this.payeeList = res.data;
        }
      });
    },
    approve(dt) {
      let params = new URLSearchParams();
      params.append('id', dt.id);
      paymentApprove(params).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getFullDiscount(this.currentPage, this.pagesize);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    disApprove(dt) {
      let params = new URLSearchParams();
      params.append('id', dt.id);
      paymentDisapprove(params).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getFullDiscount(this.currentPage, this.pagesize);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    searchDo() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getFullDiscount(this.currentPage, this.pagesize);
    },
    emptySearch() {
      this.searchForm = {
        name: '',
        supplierId: '',
        merchantId:'',
        supplierName:'',
        merchantName:'',
        minPaidAt: '',
        maxPaidAt: '',
        minAmount: '',
        maxAmount: '',
        payeeAccountId: '',
        state: '',
        type:''
      };
      this.currentPage = 1;
      this.pagesize = 15;
      this.getFullDiscount(this.currentPage, this.pagesize);
    },
    add() {
      this.$router.push({ name: 'fullDetail' });
    },
    revise(row) {
      this.$router.push({ name: 'fullDetail', query: { id: row.id } });
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getFullDiscount(this.currentPage, this.pagesize);
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    getFullDiscount(page, rows) {
      var params = new URLSearchParams();
      params.append('page', page);
      params.append('rows', rows);
      params.append('merchantId', this.searchForm.merchantId);
      params.append('supplierId', this.searchForm.supplierId);
      params.append('minPaidAt', this.searchForm.minPaidAt ? moment(this.searchForm.minPaidAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '');
      params.append('maxPaidAt', this.searchForm.maxPaidAt ? moment(this.searchForm.maxPaidAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '');
      params.append('minAmount', this.searchForm.minAmount);
      params.append('maxAmount', this.searchForm.maxAmount);
      params.append('payeeAccountId', this.searchForm.payeeAccountId);
      params.append('state', this.searchForm.state);
      params.append('type', this.searchForm.type);
      paymentList(params).then((res) => {
        if (res.code == 20000) {
          if (res.data.size == 0 && !res.data.hasNextPage && res.data.list.length != 0) {
            // 最后一页删除往前一页重新请求
            this.getFullDiscount(this.currentPage - 1, this.pagesize);
            return;
          }
          this.totalCount = res.data.total;
          this.fullReductionList = res.data.list;
          // 展示数据内容优化
          let lookHeight = 0;
          if (this.fullReductionList.length > 0) {
            if (this.$refs && this.$refs.fullTable && this.$refs.fullTable.$el) {
              lookHeight = window.innerHeight - this.$refs.fullTable.$el.offsetTop;
            }
          }
          this.$nextTick(() => {
            let headHeight = document.querySelectorAll('thead')[0].offsetHeight;
            this.heightDate = lookHeight - headHeight - 100;
          });
        } else {
          this.$message.error(res.msg);
        }
      });
    }
  },
  watch: {

  },
  created() {
    if (this.$route.query.state) {
      this.searchForm.state = Number(this.$route.query.state);
    }
    this.getFullDiscount(this.currentPage, this.pagesize);
    this.getPayeeList();
  },
  mounted() {

  },
  computed: {},
  filters: {
    timeChange(val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
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
