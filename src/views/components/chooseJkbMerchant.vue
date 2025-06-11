<template>
    <el-dialog title="" v-if="showMer" append-to-body :visible.sync="show" width="1200px" :modal="true" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div slot="title">
        {{$t('common.chooseMer')}}
      </div>
      <div class="center">
        {{$t('common.mingcheng')}}：
        <el-input v-model="searchForm.name" size="mini" :placeholder="$t('common.qsrnr')" clearable style="width: 140px;" @change="bestSearch"></el-input>
        &nbsp;{{$t('common.gssh')}}：
        <el-input v-model="searchForm.companyTaxNo" size="mini" :placeholder="$t('common.qsrnr')" clearable style="width: 140px;" @change="bestSearch"></el-input>
        &nbsp;{{$t('common.tysh')}}：
        <el-input v-model="searchForm.generalTaxNo" size="mini" :placeholder="$t('common.qsrnr')" clearable style="width: 140px;" @change="bestSearch"></el-input>
        <el-button type="primary" size="mini" @click="bestSearch">{{$t('common.sousuo')}}</el-button>
        <el-button type="primary" size="mini" @click="bestRemove" style="margin-left: 0;">{{$t('common.qk')}}</el-button>
        <div class="productList">
          <el-table :data="merchantList" ref="multipleTable" style="width: 100%" row-key="id" height="500">
            <el-table-column prop="name" :label="$t('common.sjmc')" align="left" header-align="left">
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
            <el-table-column prop="channel" :label="$t('common.channel')" align="center" width="140px"></el-table-column>
            <el-table-column prop="description" :label="$t('common.miaoshu')" align="center" width="140px"></el-table-column>
            <el-table-column :label="$t('common.creatTime')" align="center" width="140px">
              <template slot-scope="scope">
                <span>{{scope.row.createdAt | timeChange}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" width="220" :label="$t('common.cz')">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="chooseItem(scope.row)">{{$t('common.seleziona')}}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="totalCount"></el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleChoose">{{$t('common.qx')}}</el-button>
        <!-- <el-button type="primary" @click="opChooseSupplier">{{$t('common.queding')}}</el-button> -->
      </span>
    </el-dialog>
  </template>
  <script>
  import {
    jkbMerchantPage,
  } from '@/api/api';
  import Vue from "vue";
  var moment = require('moment');
  import { isvalidNum } from '@/utils/validate'
  export default {
    props: {
      showMer: {
        default: false
      },
    },
    data() {
      return {
        show:true,
        // 默认数据总数
        totalCount: 0,
        // 当前页码
        currentPage: 1,
        // 默认每页数据量 €
        pagesize: 15,
        searchForm: {
          name: '',
          companyTaxNo: '',
          generalTaxNo: '',
        },
        merchantList: [],
      }
    },
    mounted() {
   
    },
    watch: {
      showMer(){
        if(this.showMer){
          this.getMerchantList(this.currentPage, this.pagesize);
        }
      }
    },
    components: {
      
    },
      
    methods: {
      chooseItem(dt){
        this.$emit('chooseMer',dt);
      },
      cancleChoose(){
        this.$emit('closeMer');
      },
      opChooseSupplier(){
        if(this.tmpChooseList.length > 1){
          this.$message({
              message: this.$t('common.justChooseOneMer') + '！',
              type: 'warning'
            });
          return
        }
        this.$emit('doSupplier',this.tmpChooseList);
      },
      // 页码变更
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getMerchantList(this.currentPage, this.pagesize);
      },
      // 每页显示数据量变更
      handleSizeChange(val) {
        
      },
      getMerchantList(page, rows) {
        let that = this;
        let params = {
          name:this.searchForm.name,
          vatNumber:this.searchForm.companyTaxNo,
          taxCode:this.searchForm.generalTaxNo,
          page:page,
          size:rows
        };
        jkbMerchantPage(params).then((res) => {
            if (res.code == 20000) {
              that.totalCount = res.data.total;
              that.merchantList = res.data.list;
            } else {
              that.$message.error(res.msg);
            }
          })
          .catch(function() {});
      },
      bestSearch() {
        this.currentPage = 1;
        this.pagesize = 15;
        this.getMerchantList(this.currentPage, this.pagesize);
      },
      bestRemove() {
        this.searchForm= {
          name: '',
          companyTaxNo: '',
          generalTaxNo: '',
        };
        this.currentPage = 1;
        this.pagesize = 15;
        this.getMerchantList(this.currentPage, this.pagesize);
      },
    },
    filters: {
      timeChange(val) {
        if (val) {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        } else {
          return '-';
        }
      },
      timeChange2(val) {
        if (val) {
          return moment(val).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      }
    }
  };
  
  </script>
  <style lang="scss" scoped>
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
  
  </style>
  