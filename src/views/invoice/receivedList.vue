<template>
  <div>
    <el-container>
      <el-header>
        <el-row style="text-align: left">
          <el-col :span="24">
            <div style="padding-right: 10px;">
              <el-autocomplete type="text" autosize style=" width: 280px" :placeholder="$t('common.merchantName')" :fetch-suggestions="querySearchCustomer" @select="handleSelectQsc" v-model="search.merchantName" suffix-icon="el-icon-search"></el-autocomplete>
              <el-date-picker
                v-model="search.year"
                type="year"
                value-format="yyyy"
                :placeholder="$t('common.year')"
              ></el-date-picker>
              <el-date-picker
                  style="width: 250px;"
                  v-model="search.dateScope"
                  type="daterange"
                  range-separator="——"
                  :start-placeholder="$t('common.ksrq')"
                  :end-placeholder="$t('common.jsrq')"
                  size="mini"
                  class="time ipad-picker-css"
                ></el-date-picker>
              <el-button size="mini" type="primary" icon="el-icon-search" @click="searchInvoice">{{$t('common.cercas')}}</el-button>
              <el-button size="mini" type="info" @click="clearSearchForm">{{$t('common.svuota')}}</el-button>
              <el-button size="mini" type="primary" @click="showDrawer = true">{{$t('common.gjss')}}</el-button>
              <!-- <el-button type="success" size="mini" @click="exportInvoice" style="position: absolute;right: 0;">
                <i class="fa fa-download" style="margin-right: 5px"></i>{{$t('common.exportData')}}
              </el-button> -->
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main style="padding: 0">
        <div>
          <el-table
            :data="invList"
            v-loading="tableLoading"
            border
            stripe
            :height="heightDate"
            ref="table"
            @selection-change="handleSelectionChange"
            size="mini"
            style="width: 100%">
            <el-table-column
              prop="number"
              align="left"
              :label="$t('common.invoiceNo')"
              width="120">
            </el-table-column>
            <el-table-column
              prop="date"
              align="center"
              :label="$t('common.invoiceDate')"
              width="90">
            </el-table-column>
            <el-table-column
              align="center"
              :label="$t('common.bindState')"
              width="120">
              <template slot-scope="scope">
                <el-tag v-if="scope.row.merchantId" size="mini" type="success">{{$t('common.bound')}}</el-tag>
                <el-tag v-else size="mini" type="danger">{{$t('common.neverBind')}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              label="卖方"
              width="260">
              <template slot-scope="scope">
                <div v-if="scope.row.seller">
                  <div v-if="scope.row.seller.name!=null">{{scope.row.seller.name}}</div>
                  <div v-if="scope.row.seller.name==null">{{scope.row.seller.firstName}} {{scope.row.seller.lastName}}
                  </div>
                  <div v-if="scope.row.seller.vatNumber!=null">PIV. {{scope.row.seller.vatNumber}}</div>
                  <div v-if="scope.row.seller.vatNumber==null">C.F. {{scope.row.seller.taxCode}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              :label="$t('common.purchaser')"
              width="260">
              <template slot-scope="scope">
                <div v-if="scope.row.buyer">
                  <div v-if="scope.row.buyer.name!=null">{{scope.row.buyer.name}}</div>
                  <div v-if="scope.row.buyer.name==null">{{scope.row.buyer.firstName}} {{scope.row.buyer.lastName}}
                  </div>
                  <div v-if="scope.row.buyer.vatNumber!=null">PIV. {{scope.row.buyer.vatNumber}}</div>
                  <div v-if="scope.row.buyer.vatNumber==null">C.F. {{scope.row.buyer.taxCode}}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="netAmount"
              align="right"
              :label="$t('common.netWorth')+'(€)'"
              width="80">
            </el-table-column>
            <el-table-column
              prop="taxAmount"
              align="right"
              :label="$t('common.vat')+'(€)'"
              width="80">
            </el-table-column>
            <el-table-column
              prop="totalAmount"
              align="right"
              :label="$t('common.totalAmount2')+'(€)'"
              width="80">
            </el-table-column>
            <el-table-column
              prop="type"
              align="center"
              :label="$t('common.invoiceType')"
              style="width: 100%">
            </el-table-column>
            <el-table-column
              fixed="right"
              :label="$t('common.cz')"
              align="center"
              width="120">
              <template slot-scope="scope">
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary"
                           size="mini" @click="invoiceDetail(scope.row)">{{$t('common.invoiceDetails')}}
                </el-button>
                <el-button type="primary" size="mini" :disabled="(scope.row.merchantId && scope.row.merchantId!=='')"
                           @click="bindMch(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px">{{$t('common.bindMerchant')}}
                </el-button>
                 <el-button type="primary" size="mini" :disabled="(!scope.row.merchantId )"
                           @click="delBind(scope.row)" style="padding: 3px 4px 3px 4px;margin: 2px">{{$t('common.jcbd')}}
                </el-button>
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
      </el-main>
    </el-container>
    <el-drawer :before-close="closeDrawer" :show-close="false" :visible.sync="showDrawer" size="380px" direction="rtl" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="searchForm">
          <el-form-item :label="$t('common.buyerName')+':'" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.buyerKeyword"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.buyer') + 'VatNumber:'" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.buyerVatNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.buyerTfn')" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.buyerTaxCode"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.sellerName')" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.sellerKeyword"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.sellerGenTfn')+':'" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.sellerVatNumber"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.sellerTfn')" label-width="140px">
            <el-input size="mini" style="width: 160px;" v-model.trim="search.sellerTaxCode"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.ifImport')+':'" label-width="110px">
            <el-radio v-model="search.imported" :label="true">{{$t('common.yes')}}</el-radio>
            <el-radio v-model="search.imported" :label="false">{{$t('common.fou')}}</el-radio>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer" style="padding-left: 20px;">
          <el-button  size="mini" type="info" @click="cancleDrawer">{{$t('common.close')}}</el-button>
          <el-button type="primary" size="mini" @click="searchInvoice()">{{$t('common.cercas')}}</el-button>
          <el-button type="info" size="mini" @click="clearSearchForm()" style="margin:0px">{{$t('common.svuota')}}</el-button>
        </div>
      </div>
    </el-drawer>
    <inv-received-detail :id="invoiceId" v-if="dialogVisible" :visible.sync="dialogVisible"></inv-received-detail>

    <mch-select @transferItem="onSelectMch" v-if="mchSelectDialogVisible"
                :visible.sync="mchSelectDialogVisible"></mch-select>
  </div>
</template>
<script>
  import InvReceivedDetail from './InvReceivedDetail';
  import MchSelect from './MchSelect';
  import {
    getToken
  } from '@/utils/auth';
    import Vue from 'vue';
    const INVOICE_TYPE_LIST = require('@/assets/data/invoice-type.json')
    import {
      invoiceReceivedList,
      invoiceReceivedBind,
invoiceReceivedUntied,
getInoviceMerList
    } from '@/api/api';
      var moment = require('moment')
  export default {
    data() {
      return {
        heightDate:'120',
        invList: [],
        search: {
          merchantId:'',
          merchantName:'',
          year:moment(new Date()).format('YYYY'),
          buyerKeyword:'',
          buyerVatNumber:'',
          buyerTaxCode:'',
          sellerKeyword:'',
          sellerVatNumber:'',
          sellerTaxCode:'',
          imported:'',
          dateScope: '',
        },
        invoiceTypeList: [],
        bindList:[
          {
            code:'0',
            name: this.$t('common.neverBind')
          },
           {
            code:'1',
            name: this.$t('common.bound')
          }

        ],
        currentPage: 1,
        pageSize: 12,
        totalCount: -1,
        invoiceId: '',
        bindInvoiceId: '',
        dialogVisible: false,
        mchSelectDialogVisible: false,
        tableLoading: false,
        showDrawer:false
      }
    },
    mounted: function () {
      this.loadReceivedInvoice(this.currentPage, this.pageSize);
      this.loadInvoiceTypeList();
    },
    methods: {
      querySearchCustomer(queryString, cb){
        let params = {
          page:1,
          size:15,
          name:this.search.merchantName
        }
        getInoviceMerList(params).then(res => {
          if (res.code === 20000) {
            for(let i = 0; i < res.data.list.length;i++){
              res.data.list[i].value = res.data.list[i].name?res.data.list[i].name:(res.data.list[i].firstName + ' ' + res.data.list[i].lastName);
              res.data.list[i].value += res.data.list[i].vatNumber?('-' + res.data.list[i].vatNumber):'';
            }
            cb(res.data.list);
          }
        });
      },
      handleSelectQsc(item){
        this.search.merchantId = item.id;
      },
      closeDrawer() {
        this.showDrawer = false
      },
      cancleDrawer() {
        this.showDrawer = false
      },
      searchInvoice() {
        this.showDrawer = false
        this.loadReceivedInvoice(this.currentPage, this.pageSize)
      },
      clearSearchForm() {
        this.showDrawer = false
        this.search = {
          merchantId:'',
          merchantName:'',
          year:moment(new Date()).format('YYYY'),
          buyerKeyword:'',
          buyerVatNumber:'',
          buyerTaxCode:'',
          sellerKeyword:'',
          sellerVatNumber:'',
          sellerTaxCode:'',
          state:'',
          imported:'',
          dateScope: '',
        }
        this.loadReceivedInvoice(this.currentPage, this.pageSize)
      },
      loadReceivedInvoice(page, rows) {
        let that = this;
        this.tableLoading = true;
        let startDate = '';
        let endDate = '';
        if (that.search.dateScope !== null && that.search.dateScope !== '') {
          startDate = that.search.dateScope[0];
          endDate = that.search.dateScope[1];
        }
        let params = {
          page:page,
          size:rows,
          merchantId:this.search.merchantId,
          year:this.search.year,
          buyerKeyword:this.search.buyerKeyword,
          buyerVatNumber:this.search.buyerVatNumber,
          buyerTaxCode:this.search.buyerTaxCode,
          sellerKeyword:this.search.sellerKeyword,
          sellerVatNumber:this.search.sellerVatNumber,
          sellerTaxCode:this.search.sellerTaxCode,
          imported:this.search.imported,
          startDate:startDate === '' ? startDate : moment(startDate).format('YYYY-MM-DD'),
          endDate:endDate === '' ? endDate : moment(endDate).format('YYYY-MM-DD')
        }
        invoiceReceivedList(params).then(function(res) {
          that.tableLoading = false;
          if (res.code == 20000) {
            that.totalCount = res.data.total;
            that.invList = res.data.list;

            // 展示数据内容优化
            let lookHeight = 0;
            if (that.invList.length > 0) {
              if (that.$refs && that.$refs.table && that.$refs.table.$el) {
                lookHeight = window.innerHeight - that.$refs.table.$el.offsetTop;
              }
            }

            that.$nextTick(() => {
              let headHeight = document.querySelectorAll('thead')[0].offsetHeight;
              that.heightDate = lookHeight - headHeight - 100;
            });
          } else {
            that.$message.error(res.msg);
          }
        })['catch'](function() {});
      },
      loadInvoiceTypeList() {
        this.invoiceTypeList = INVOICE_TYPE_LIST
      },
      handleSelectionChange(val) {
      },
      exportInvoice() {
        var _this = this;
        var startDate = '';
        var endDate = '';
        if (_this.search.dateScope !== null && _this.search.dateScope !== '') {
          startDate = _this.search.dateScope[0];
          endDate = _this.search.dateScope[1];
        }
        window.open("api/v1/inv/invoice/received/export/excel?" +
          'merchantId=' + _this.search.merchantId +
          '&year=' + _this.search.year +
          '&buyerKeyword=' + _this.search.buyerKeyword +
          '&buyerVatNumber=' + _this.search.buyerVatNumber +
          '&buyerTaxCode=' + _this.search.buyerTaxCode +
          '&sellerKeyword=' + _this.search.sellerKeyword +
          '&sellerVatNumber=' + _this.search.sellerVatNumber +
          '&sellerTaxCode=' + _this.search.sellerTaxCode +
          '&imported=' + _this.search.imported +
          '&startDate=' +  startDate === '' ? startDate : moment(startDate).format('YYYY-MM-DD') +
          '&endDate=' +  endDate === '' ? endDate : moment(endDate).format('YYYY-MM-DD') +
          "&authorization=" + getToken(), "_parent");
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadReceivedInvoice(this.currentPage, this.pageSize);
      },
      invoiceDetail(row) {
        this.dialogVisible = true;
        this.invoiceId = row.id;
      },
      bindMch(row) {
        this.bindInvoiceId = row.id;
        this.mchSelectDialogVisible = true;
      },
      delBind(row){
        let params = {
          id:row.id
        }
        invoiceReceivedUntied(params).then((resp)=>{
          if(resp.code === 20000) {
                 this.loadReceivedInvoice(this.currentPage, this.pageSize);
          }else {
             this.$message.error(resp.msg);
          }
        })
      },
      onSelectMch(item) {
        let params = {
          id:this.bindInvoiceId,
          merchantId:item.id
        }
        invoiceReceivedBind(params).then((resp)=>{
          if(resp.code === 20000) {
            this.$message.success(resp.msg);
            this.loadReceivedInvoice(this.currentPage, this.pageSize)
          }else {
             this.$message.error(resp.msg);
          }
        })
      }
    },
    components: {
      'inv-received-detail': InvReceivedDetail,
      'mch-select': MchSelect
    }
  }
</script>
<style>
  .adv-search-container {
    font-size: 12px;
    background-color: #ffffff;
    margin-bottom: 10px;
    border-radius: 3px;
    padding: 8px 0;
    box-sizing: border-box;
  }

  .el-select-dropdown__item {
    font-size: 12px;
  }

</style>
