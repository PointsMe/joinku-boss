<template>
  <el-container>
    <el-header style="height: auto;padding: 0 0 20px 0">
      <el-row class="search_container">
        <el-col :span="24">
          <el-form ref="customerSearch" @submit.native.prevent :model="queryParams">
            <el-row>
              <el-col :span="24">
                <el-form-item :label="$t('common.gjz')+':'" label-width="100px">
                  <el-input size="mini" v-model="queryParams.keyword" clearable style="width: 160px;"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.supplier')+':'" label-width="100px">
                  <el-autocomplete type="text" clearable autosize style=" width: 200px" :fetch-suggestions="remoteMethod" v-model="queryParams.supplierName" suffix-icon="el-icon-search"  @select="handleSelect" @change="doQuery2"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('common.onlineStore')+':'" label-width="100px">
                  <el-autocomplete type="text" clearable autosize style=" width: 200px" :fetch-suggestions="remoteMethod2" v-model="queryParams.merchantName" suffix-icon="el-icon-search"  @select="handleSelect2"  @change="doQuery3"></el-autocomplete>
                </el-form-item>
                <el-form-item :label="$t('common.zt')+':'" label-width="100px">
                  <el-select v-model="queryParams.state" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in orderLang" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.fkzt')+':'" label-width="100px">
                  <el-select v-model="queryParams.paymentState" size="mini" clearable style="width: 160px;">
                    <el-option v-for="item in payStateLang" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.sj')+':'" label-width="100px">
                  <el-date-picker v-model="queryParams.minCreatedAt" type="date" size="mini" :placeholder="$t('common.startDate')" clearable style="width: 160px;"></el-date-picker>
                  <el-date-picker v-model="queryParams.maxCreatedAt" type="date" size="mini" :placeholder="$t('common.endDate')" clearable style="width: 160px;"></el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('common.je')" label-width="100px">
                  <el-input size="mini" v-model="queryParams.minOrderAmount" clearable style="width: 160px;" :placeholder="$t('common.minOrdersMoney')"></el-input> -
                  <el-input size="mini" v-model="queryParams.maxOrderAmount" clearable style="width: 160px;" :placeholder="$t('common.maxOrdersMoney')"></el-input>
                </el-form-item>
                <el-button type="primary" size="mini" @click="searchDo()">{{ $t('common.sousuo') }}</el-button>
                <el-button type="primary" size="mini" @click="emptySearch()" style="margin:0px">{{ $t('common.qk') }}</el-button>
                <el-button type="primary" size="mini" @click="exportFile()" style="margin:0px">{{ $t('common.export') }}</el-button>
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
          :data="orderList"
          :height="heightDate"
          ref="table"
          class="table-fixed"
          style="width: 100%"
        >
          <el-table-column prop="number" header-align="center" align="left" :label="$t('common.orderNo')" width="120"></el-table-column>
          <el-table-column prop="createdAt" align="center" width="140px" :label="$t('common.xdsj')">
            <template slot-scope="scope">
              <span v-if="scope.row.createdAt">{{ scope.row.createdAt | timeChange }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="member" header-align="center" align="left" :label="$t('common.purchaser')" width="180">
            <template slot-scope="scope">
              <div v-if="scope.row.member">
                <p>{{scope.row.member.username}} {{scope.row.member.mobile}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="merchant" header-align="center" align="left" :label="$t('route.onlineShopManage')" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.merchant">
                <p>{{scope.row.merchant.name}}</p>
                <!-- <p>{{scope.row.merchant.vatNumber}}  {{scope.row.merchant.taxCode}}</p>
                <p>{{scope.row.merchant.companyName}}</p>
                <p>{{scope.row.merchant.contactEmail}}</p> -->
                <p>{{scope.row.merchant.contactName}} {{scope.row.merchant.contactPhone}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="supplier" header-align="center" align="left" :label="$t('route.supplierManage')" width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.supplier">
                <p>{{scope.row.supplier.name}}</p>
                <!-- <p>{{scope.row.supplier.vatNumber}}  {{scope.row.supplier.taxCode}}</p>
                <p>{{scope.row.supplier.companyName}}</p>
                <p> {{scope.row.supplier.contactEmail}}</p>  -->
                <p>{{scope.row.supplier.contactName}} {{scope.row.supplier.contactPhone}}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="totalAmount" header-align="center" align="left" :label="$t('common.totalAmount2')" width="100">
            <template slot="header">
              <span style="color: #f56954;font-weight: bold;">{{ $t('common.totalAmount2') }} (€)</span>
            </template>
            <template slot-scope="scope">
              <p>
                <span style="color: #ccc;text-decoration: line-through;" v-if="scope.row.totalDiscountAmount > 0">{{(scope.row.finalAmount + scope.row.totalDiscountAmount).toFixed(2)}}</span>
                <span style="font-size: 14px;color: #f56954;">{{scope.row.finalAmount}}</span>
              </p>
              <p>
                <span style="color: #00a65a;cursor: pointer;" @click="showDiscountList(scope.row)" v-if="scope.row.totalDiscountAmount > 0"><span style="width: 16px;height: 16px;border: 1px solid black;border-radius: 50%;text-align: center;line-height: 16px;display: inline-block;vertical-align: middle;font-size: 12px;margin-right: 4px;">€</span>{{ $t('common.yhRecord')}}</span>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="province.name" header-align="center" align="left" :label="$t('common.paied')" width="100">
            <template slot="header">
              <span style="color: #00a65a;font-weight: bold;">{{ $t('common.paied') }} (€)</span>
            </template>
            <template slot-scope="scope">
              <span style="color: #00a65a;">{{scope.row.paidAmount}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="number" header-align="center" align="left" :label="$t('common.profit')" width="140">
            <template slot="header">
              <span style="color: #00a65a;font-weight: bold;">{{$t('common.profit')}} (€)</span>
            </template>
            <template slot-scope="scope">
              <div v-if="scope.row.incomes && scope.row.incomes.length > 0">
                <div v-for="item in scope.row.incomes" :key="item.type"  style="color: #00a65a;">
                  <p v-if="item.type == 101">
                    {{$t('common.platProfit')}}:{{item.incomeAmount}}
                  </p>
                  <p v-if="item.type == 102">
                      {{$t('common.merchantProfit')}}:{{item.incomeAmount}}
                  </p>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="state" align="center" width="120px" :label="$t('common.ddzt')">
            <template slot-scope="scope">
              <span v-if="scope.row.state == 101">{{ $t('common.orderState[0].label') }}</span>
              <span v-if="scope.row.state == 102">{{ $t('common.orderState[1].label') }}</span>
              <span v-if="scope.row.state == 103">{{ $t('common.orderState[2].label') }}</span>
              <span v-if="scope.row.state == 106">{{ $t('common.orderState[3].label') }}</span>
              <span v-if="scope.row.state == 108">{{ $t('common.orderState[4].label') }}</span>
              <span v-if="scope.row.state == 109">{{ $t('common.orderState[5].label') }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="paymentState" align="center" width="120px" :label="$t('common.fkzt')">
            <template slot-scope="scope">
              <p>
                <span v-if="scope.row.paymentState == 101">{{ $t('common.neverPay') }}</span>
                <span v-if="scope.row.paymentState == 102">{{ $t('common.halfPay') }}</span>
                <span v-if="scope.row.paymentState == 103">{{ $t('common.paied') }}</span>
              </p>
              <p>
                <el-tag type="info" size="mini" effect="plain" v-if="scope.row.paymode == 101">{{$t('common.deliveryPay')}}</el-tag>
                <el-tag type="danger" size="mini" effect="plain" v-if="scope.row.paymode == 102">{{$t('common.onLinePay')}}</el-tag>
              </p>
            </template>
          </el-table-column>
          <el-table-column prop="deliveryAddress" align="left" :label="$t('common.deliveryAddress')">
            <template slot-scope="scope">
              <p v-if="scope.row.deliveryAddress">{{scope.row.deliveryAddress.address}}</p>
              <p v-if="scope.row.deliveryAddress" style="color: #777">{{scope.row.deliveryAddress.city}} {{scope.row.deliveryAddress.province}} {{scope.row.deliveryAddress.country}}</p>
            </template>
          </el-table-column>
          <el-table-column align="center" header-align="center" width="130" :label="$t('common.cz')" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" size="mini" style="margin-left:0px;width: 80px;" v-if="(scope.row.paymentState == 101 || scope.row.paymentState == 102) && !(scope.row.state == 108 || scope.row.state == 101)" @click="showPayInfo(scope.row)">{{$t('common.shoukuan')}}</el-button>
              <el-button type="text" size="mini" style="margin-left:0px;" @click="goToDetail(scope.row)">{{$t('common.detail')}}</el-button>
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
    <el-dialog :title="$t('common.getPayInfo')" :visible.sync="showPay" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form @submit.native.prevent ref="payInfo" :model="payInfo" :rules="payRules">
          <el-form-item label-width="100px" :label="$t('common.payTime')" prop="paidAt">
            <el-date-picker v-model="payInfo.paidAt" type="datetime" :placeholder="$t('common.chooseGetPayTime')" style="width: 80%;"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.payAmount')" prop="amount">
            <el-input v-model="payInfo.amount" clearable style="width: 80%;" type="number"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.payZhanghao')" prop="payeeAccountId">
            <el-select v-model="payInfo.payeeAccountId" style="width:80%" clearable>
              <el-option v-for="item in payeeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.bz')" prop="remark">
            <el-input v-model="payInfo.remark" clearable style="width: 80%;" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.tupian')" prop="images">
            <el-upload list-type="picture-card" class="avatar-uploader" style="display: inline-block;" action :limit="5" :file-list="fileListCover" :on-change="handleChangeCover" :http-request="uploadFileCover" :on-remove="removeFileCover" accept="image/jpg, image/jpeg, image/png, image/gif">
              <i class="el-icon-plus avatar-uploader-icon" style="line-height:120px;width:120px;height:120px"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleOrderPay">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="orderPayFn">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.yhRecord')" :visible.sync="showDiscount" width="40%" :close-on-click-modal="true" :show-close="true" :close-on-press-escape="false">
      <div class="center">
        <el-table :data="discounts" style="width: 100%">
          <el-table-column prop="eventName" :label="$t('common.type')">
            <template slot-scope="scope">
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 101">{{ $t('common.activetyReduce') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 101">{{ $t('common.activetyDiscount') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 103">{{ $t('common.salesmanReduce') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 103">{{ $t('common.salesmanDiscount') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 109">{{ $t('common.cusDiscount') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 106">{{ $t('common.supplierReduce') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 106">{{ $t('common.supplierDiscount') }}</el-tag>
              <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 1">{{$t('common.goodsDisco')}}</el-tag>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name" :label="$t('common.mingcheng')"></el-table-column>
          <el-table-column prop="amount" :label="$t('common.dicountAmount') + '(€)'" width="108"></el-table-column>
          <el-table-column prop="createdAt" :label="$t('common.dicountAmountTime')" width="108">
            <template slot-scope="scope">
              <span>{{scope.row.createdAt | timeChange}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.cz')" width="108">
            <template slot-scope="scope">
              <!-- <el-button type="text" size="mini" v-if="scope.row.type != 1" @click="deleteDiscount(scope.row)" :disabled="chooseItem.state == 108 || chooseItem.state == 109">{{ $t('common.sc') }}</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Vue from "vue";
import {
  b2cOrderList,
  getSupplierList,
  orderPayCharge,
  orderPayeeList,
  orderPay,
  payUpload,
  onlineShopList
} from "@/api/api";
import { getToken } from "@/utils/auth";
var moment = require("moment");
export default {
  name: "b2cOrderList",
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
        orderList: [],
        supplierList: [],
        merchantList:[],
        queryParams: {
          keyword:'',
          supplierId:'',
          merchantId:'',
          supplierName:'',
          merchantName:'',
          state:'',
          paymentState:'',
          minCreatedAt:'',
          maxCreatedAt:'',
          minOrderAmount:'',
          maxOrderAmount:''
        },
        orderLang: this.$t('common.orderState'),
        payStateLang: this.$t('common.payState'),
        type: '',
        showPay: false,
        fileListCover: [],
        fileCover: '',
        payInfo: {
          orderId: '',
          paidAt: new Date(),
          amount: '',
          payeeAccountId: '',
          remark: '',
          images: []
        },
        payRules: {

        },
        showDiscount: false,
        discounts: [],
        chooseItem:''
    };
  },
  methods: {
    goToDetail(dt){
      this.$router.push({ name: 'b2cOrderDetail', query: { id: dt.id } });
    },
    handleSelect(item){
      this.queryParams.supplierId = item.id;
    },
    handleSelect2(item){
      this.queryParams.merchantId = item.merchantId;
    },
    remoteMethod2(queryString, cb) {
      let params = new URLSearchParams();
      params.append("page", 1);
      params.append("rows", 15);
      params.append("name", queryString);
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
    searchDo() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getOrderList(this.currentPage, this.pagesize);
    },
    emptySearch() {
      this.queryParams = {
        keyword:'',
        supplierId:'',
        merchantId:'',
        supplierName:'',
        merchantName:'',
        state:'',
        paymentState:'',
        minCreatedAt:'',
        maxCreatedAt:'',
        minOrderAmount:'',
        maxOrderAmount:''
      };
      this.currentPage = 1;
      this.pagesize = 15;
      this.getOrderList(this.currentPage, this.pagesize);
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      this.pagesize = val;
    },
    //页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getOrderList(this.currentPage, this.pagesize);
    },
    doQuery2(dt){
      if(!dt){
        this.queryParams.supplierId = '';
        this.getOrderList(this.currentPage, this.pagesize);
      }
    },
    doQuery3(dt){
      if(!dt){
        this.queryParams.merchantId = '';
        this.getOrderList(this.currentPage, this.pagesize);
      }
    },
    doQuery() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getOrderList(this.currentPage, this.pagesize);
    },

    getOrderList(page, rows) {
      var that = this;
      var params = new URLSearchParams();
      params.append("page", page);
      params.append("rows", rows);
      params.append("keyword",this.queryParams.keyword);
      params.append('supplierId', that.queryParams.supplierId);
      params.append('merchantId', that.queryParams.merchantId);
      params.append('state', that.queryParams.state);
      params.append('paymentState', that.queryParams.paymentState);
      params.append('minCreatedAt', this.queryParams.minCreatedAt ? moment(that.queryParams.minCreatedAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '');
      params.append('maxCreatedAt', this.queryParams.maxCreatedAt ? moment(that.queryParams.maxCreatedAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '');
      params.append('minOrderAmount', that.queryParams.minOrderAmount);
      params.append('maxOrderAmount', that.queryParams.maxOrderAmount);
      b2cOrderList(params).then(function(res) {
          if (res.code == 20000) {
            that.totalCount = res.data.total;
            that.orderList = res.data.list;
            // 展示数据内容优化
            let lookHeight = 0;
            if (that.orderList.length > 0) {
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
          this.getOrderList(this.currentPage, this.pagesize);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    showPayInfo(row) {
      var params = new URLSearchParams();
      params.append('orderId', row.id);
      orderPayCharge(params).then(res => {
        if (res.code === 20000) {
          if (res.data.enabled) {
            this.type = 'pay';
            this.showPay = true;
            this.getPayeeList();
            this.payInfo.paidAt = new Date();
            this.chooseItem = row;
          } else {
            this.$message.error(this.$t('common.afterPayDeal'));
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    // 收款账号
    getPayeeList() {
      orderPayeeList().then(res => {
        if (res.code === 20000) {
          this.payeeList = res.data;
        }
      });
    },
    cancleOrderPay() {
      this.payInfo = {
        orderId: '',
        paidAt: new Date(),
        amount: '',
        payeeAccountId: '',
        remark: '',
        images: []
      };
      this.showPay = false;
      this.chooseItem = '';
    },
    handleChangeCover(file) {
      this.fileCover = file.raw;
    },
    uploadFileCover(item) {
      var that = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append('image', that.fileCover);
      payUpload(form).then(res => {
        if (res.code == 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          if (that.type == 'pay') {
            that.payInfo.images.push({
              img: res.data.url,
              name: item.file.name
            });
          }
        } else {
          that.$message.error(res.msg);
        }
        form = null;
      })['catch'](() => {

      });
    },
    removeFileCover(file) {
      let removeArr = [];
      if (this.type == 'pay') {
        removeArr = this.payInfo.images;
      }

      for (var i = 0; i < removeArr.length; i++) {
        if (removeArr[i].name === file.name) {
          removeArr.splice(i, 1);
          break;
        }
      }
    },
    orderPayFn() {
      let images = [];
      if (this.payInfo.images.length > 0) {
        for (var i = 0; i < this.payInfo.images.length; i++) {
          images.push(this.payInfo.images[i].img);
        }
      }
      let params = {
        orderId: this.chooseItem.id,
        paidAt: this.payInfo.paidAt ? moment(this.payInfo.paidAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '',
        amount: this.payInfo.amount,
        payeeAccountId: this.payInfo.payeeAccountId,
        remark: this.payInfo.remark,
        images: images
      };
      orderPay(params).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.showPay = false;
          this.getOrderList(this.currentPage, this.pagesize);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    exportFile(){
      if (!this.queryParams.minCreatedAt || !this.queryParams.maxCreatedAt) {
        this.$message({
            message: this.$t('common.pleChooseTime') + '!',
            type: 'warning'
          });
        return
      }

      var param = "?minCreatedAt=" + encodeURIComponent(this.queryParams.minCreatedAt ? moment(this.queryParams.minCreatedAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '') +
        "&maxCreatedAt=" + encodeURIComponent(this.queryParams.maxCreatedAt ? moment(this.queryParams.maxCreatedAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '') +
        "&keyword=" + this.queryParams.keyword +
        "&page=" + this.currentPage +
        "&rows=" + this.pagesize +
        "&supplierId=" + this.queryParams.supplierId +
        "&merchantId=" + this.queryParams.merchantId +
        "&state=" + this.queryParams.state +
        "&paymentState=" + this.queryParams.paymentState +
        "&minOrderAmount=" + this.queryParams.minOrderAmount +
        "&maxOrderAmount=" + this.queryParams.maxOrderAmount +
        "&authorization=" + getToken();
      const url = "api/v1/b2c/order/export" + param;
      window.open(url);
    },
    deleteDiscount(dt) {
      var that = this;
      that.$confirm(that.$t('common.cancleDis') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.conferma'),
        cancelButtonText: that.$t('common.annulla'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('orderId', this.chooseItem.id);
        params.append('discountId', dt.id);
        orderDiscountDelete(params).then(res => {
          if (res.code === 20000) {
            that.$message({
              message: res.msg,
              type: 'success'
            });
            for (let i = 0; i < that.discounts.length; i++) {
              if (dt.id == that.discounts[i].id) {
                that.discounts.splice(i, 1);
              }
            }
            that.getOrderList(that.currentPage, that.pagesize);
          } else {
            that.$message.error(res.msg);
          }
        })['catch'](() => {

        });
      })['catch'](() => {

      });
    },
    // 优惠记录
    showDiscountList(dt) {
      this.showDiscount = true;
      this.chooseItem = dt;
      this.discounts = JSON.parse(JSON.stringify(dt.discounts));
      if(dt.originalAmount - dt.totalAmount > 0){
        let obj = {
          type:1,
          name: this.$t('common.goodsDisco'),
          amount:(dt.originalAmount - dt.totalAmount).toFixed(2),
          createdAt:'',
        }
        this.discounts.unshift(obj);
      }
    },
  },
  watch: {
  
  },
  created() {
  
  },
  mounted() {
    this.getOrderList(this.currentPage, this.pagesize);
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


