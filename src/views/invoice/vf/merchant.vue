<template>
    <div>
      <el-container>
        <el-header style="padding: 0;display:flex;justify-content:space-between;align-items: center">
          <div style="display: inline;">
            <el-input
              clearable
              @change="keywordsChange"
              style="width:320px; margin:0; padding:0;"
              size="mini"
              :disabled="advanceSearchViewVisible"
              @keyup.enter.native="searchMerchant"
              prefix-icon="el-icon-search"
              v-model="keywords">
            </el-input>
            <el-input
                clearable
                size="mini"
                style="width: 160px;"
                v-model.trim="vatNumber"
                @keyup.enter.native="searchMerchant"
                @change="keywordsChange"
                placeholder="SIF"
              ></el-input>
              <!-- <el-input
                clearable
                size="mini"
                style="width: 160px;"
                v-model.trim="taxCode"
                @keyup.enter.native="searchMerchant"
                @change="keywordsChange"
                placeholder="Codice Fiscale"
              ></el-input> -->
              <el-input
                clearable
                size="mini"
                style="width: 160px;"
                v-model.trim="merchantId"
                @keyup.enter.native="searchMerchant"
                @change="keywordsChange"
                placeholder="Mid"
              ></el-input>
            <el-button type="primary" size="mini" style="margin-left: 5px" icon="el-icon-search" @click="searchMerchant">
              {{$t('common.sousuo')}}
            </el-button>
            <el-button type="primary" size="mini" style="margin-left: 5px" @click="addMerchant">
              {{$t('common.xz')}}
            </el-button>
          </div>
          <div style="margin-left: 5px;display: inline">
          </div>
        </el-header>
        <el-main style="padding: 0">
          <div>
            <el-table
              :data="mchList"
              v-loading="tableLoading"
              border
              @selection-change="handleSelectionChange"
              size="mini"
              :height="heightDate"
              ref="table"
              style="width: 100%">
              <el-table-column type="expand">
                <template slot-scope="props">
                  <el-form label-position="left" label-width="120px" size="mini" inline class="table-expand">
                    <div>
                      <el-form-item :label="$t('common.gsmc2')">
                        <span>{{ props.row.name }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.gj')">
                        <span>{{ props.row.country.name }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item :label="$t('common.companyTfn')">
                        <span>{{ props.row.vatNumber }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.sheng')" v-if="props.row.province">
                        <span>{{ props.row.province.name }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <!-- <el-form-item :label="$t('common.generalTfn')">
                        <span>{{ props.row.taxCode }}</span>
                      </el-form-item> -->
                      <el-form-item :label="$t('common.cs')">
                        <span>{{ props.row.city }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item :label="$t('common.yb')">
                        <span>{{ props.row.zipcode }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.fullName')">
                        <span>{{ props.row.firstName }}</span>
                        <span>{{ props.row.lastName }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item :label="$t('common.telephone')">
                        <span>{{ props.row.contactPhone }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.dz')">
                        <span>{{ props.row.address }}</span>
                      </el-form-item>
                    </div>
                    <div>
                      <el-form-item :label="$t('common.linkmanEmail')">
                        <span>{{ props.row.contactEmail }}</span>
                      </el-form-item>
                    </div>
                    <!-- <div>
                      <el-form-item :label="$t('common.faxes')">
                        <span>{{ props.row.contactFax }}</span>
                      </el-form-item>
                      <el-form-item>
                      </el-form-item>
                    </div> -->
                  </el-form>
                </template>
              </el-table-column>
              <el-table-column
                prop="name"
                align="left"
                :label="$t('common.gsmc2')">
              </el-table-column>
              <el-table-column
                prop="vatNumber"
                align="center"
                :label="$t('common.companyTfn')">
              </el-table-column>
              <el-table-column
                align="left"
                :label="$t('common.fullName')">
                <template slot-scope="scope">
                  <span>{{scope.row.firstName}}</span>
                  <span>{{scope.row.lastName}}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column
                align="left"
                header-align="center"
                :label="$t('common.package')">
                <template slot-scope="scope">
                  <div v-if="scope.row.currentPackage">
                    <p>{{$t('common.packageName')}}: {{scope.row.currentPackage.name}}</p>
                    <p>{{$t('common.overTime')}}: {{scope.row.currentPackage.expiredAt}}</p>
                    <p>{{$t('common.invoiceSum')}}: {{scope.row.currentPackage.totalCount}}</p>
                    <p>{{$t('common.residueNum')}}: {{scope.row.currentPackage.totalCount - scope.row.currentPackage.usedCount}}</p>
                  </div>
                </template>
              </el-table-column> -->
              <!-- <el-table-column
                align="left"
                header-align="center"
                :label="$t('common.account')">
                <template slot-scope="scope">
                  <div v-if="scope.row.user">
                    <p v-if="scope.row.user.email">{{scope.row.user.email}}</p>
                    <p v-if="scope.row.user.mobile">{{scope.row.user.mobile}}</p>
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column
                fixed="right"
                :label="$t('common.cz')"
                align="center"
                width="260">
                <template slot-scope="scope">
                  <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="updateMerchant(scope.row)">{{$t('common.xg')}}
                  </el-button>
                  <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindMerchant(scope.row)">
                    {{$t('common.binding')}}
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
      <MchBind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindMerchantDialog"
                         :visible.sync="bindMerchantDialog"></MchBind>
    </div>
  </template>
  <script>
    import {
    getToken
  } from '@/utils/auth';
    import MchBind from "./MchBind"
    import Vue from 'vue';
    import {
        vfMerchantPage,
    } from '@/api/api';
    export default {
      data() {
        return {
          heightDate: '42',
          keywords: '',
          vatNumber:'',
          taxCode:'',
          merchantId:'',
          mchList: [],
          currentPage: 1,
          pageSize: 15,
          totalCount: 0,
          fileUploadBtnText: this.$t('common.importMerchant'),
          dialogVisible: false,
          tableLoading: false,
          advanceSearchViewVisible: false,
          renewMerchantId: '',
          renewDialogVisible: false,
          upgradeMerchantId: '',
          upgradeDialogVisible: false,
          bindMerchantId: '',
          lenderId:'',
          bindPointsMeDialogVisible: false,
          bindAmyDialogVisible:false,
          bindJoyingoShopDialog:false,
          bindJoyingo_merchantShopDialog:false,
          bindMerchantDialog:false,
          showUser:false,
          pswId:'',
          showPsw:false,
          pswForm:{
             password:''
          },
          pswFormRules:{
            password: [{required: true, message: this.$t('common.qsrmm'), trigger: 'blur'}]
          },
          showMerchant:false,
        }
      },
      components: {
        MchBind,
      },
      mounted() {
        this.loadMerchant(this.currentPage, this.pageSize);
      },
      methods: {
        addMerchant(){
          this.$router.push({ name: 'vfMerchantDetail' });
        },
        updateMerchant(row){
          this.$router.push({name: "vfMerchantDetail", query: {id: row.id}});
        },
        loadMerchant(page, rows) {
          var that = this;
          let params = {
            page:page,
            size:rows,
            name:that.keywords,
            vatNumber:that.vatNumber,
            taxCode:that.taxCode,
            targetId:that.merchantId
          }
          vfMerchantPage(params).then(function(res) {
            if (res.code == 20000) {
              if (res.data.size == 0 && !res.data.hasNextPage && res.data.list.length != 0) {
                // 最后一页删除往前一页重新请求
                that.loadMerchant(that.currentPage - 1, that.pageSize);
                return;
              }
              that.totalCount = res.data.total;
              that.mchList = res.data.list;
  
              // 展示数据内容优化
              let lookHeight = 0;
              if (that.mchList.length > 0) {
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
        keywordsChange(val) {
          if (val === '') {
            this.loadMerchant(this.currentPage, this.pageSize);
          }
        },
        handleSelectionChange(val) {
        },
        searchMerchant() {
          this.loadMerchant(this.currentPage, this.pageSize);
        },
        showBindMerchant(row){
          this.bindMerchantId = row.merchantId;
          this.lenderId = row.id;
          this.bindMerchantDialog = true;
        },
        onSuccess() {
          this.loadMerchant(this.currentPage, this.pageSize);
        },
        currentChange(currentChange) {
          this.currentPage = currentChange;
          this.loadMerchant(this.currentPage, this.pageSize);
        },
      }
    }
  </script>
  <style>
    .table-expand {
      text-align: left;
    }
  
    .table-expand {
      color: #99a9bf;
    }
  
    .table-expand .el-form-item {
      margin-bottom: 5px;
    }
  
    .table-expand .el-form-item__label {
      width: 80px;
    }
  
    .table-expand .el-form-item__content {
      width: 320px;
    }
  
    .el-form-item__label {
      font-size: 12px;
    }
  </style>
