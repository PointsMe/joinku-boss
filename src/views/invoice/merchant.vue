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
              placeholder="P.IVA"
            ></el-input>
            <el-input
              clearable
              size="mini"
              style="width: 160px;"
              v-model.trim="taxCode"
              @keyup.enter.native="searchMerchant"
              @change="keywordsChange"
              placeholder="Codice Fiscale"
            ></el-input>
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
          <!--<el-button slot="reference" type="primary" size="mini" style="margin-left: 5px"-->
          <!--@click="showAdvanceSearchView"><i-->
          <!--class="fa fa-lg"-->
          <!--style="margin-right: 5px"></i>高级搜索-->
          <!--</el-button>-->
        </div>
        <div style="margin-left: 5px;display: inline">
          <!--<el-button type="success" size="mini">-->
          <!--<i class="fa fa-share-alt" style="margin-right: 5px"></i>下载模板-->
          <!--</el-button>-->
          <!--<el-upload-->
          <!--:show-file-list="false"-->
          <!--accept="application/vnd.ms-excel"-->
          <!--action="merchant/import"-->
          <!--:on-success="fileUploadSuccess"-->
          <!--:on-error="fileUploadError" :disabled="fileUploadBtnText==='正在导入'"-->
          <!--:before-upload="beforeFileUpload" style="display: inline">-->
          <!--<el-button size="mini" type="success" :loading="fileUploadBtnText==='正在导入'">-->
          <!--<i class="fa fa-upload" style="margin-right: 5px"></i>{{fileUploadBtnText}}-->
          <!--</el-button>-->
          <!--</el-upload>-->
          <!-- <el-button type="success" size="mini" @click="exportMerchant">
            <i class="fa fa-download" style="margin-right: 5px"></i>{{$t('common.exportData')}}
          </el-button> -->
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
                    <el-form-item :label="$t('common.sheng')">
                      <span>{{ props.row.province.name }}</span>
                    </el-form-item>
                  </div>
                  <div>
                    <el-form-item :label="$t('common.generalTfn')">
                      <span>{{ props.row.taxCode }}</span>
                    </el-form-item>
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
                  <div>
                    <el-form-item :label="$t('common.faxes')">
                      <span>{{ props.row.contactFax }}</span>
                    </el-form-item>
                    <el-form-item>
                    </el-form-item>
                  </div>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="name"
              align="left"
              :label="$t('common.gsmc2')"
              width="240">
            </el-table-column>
            <el-table-column
              prop="vatNumber"
              align="center"
              :label="$t('common.companyTfn')"
              width="100">
            </el-table-column>
            <el-table-column
              align="left"
              :label="$t('common.fullName')"
              width="90">
              <template slot-scope="scope">
                <span>{{scope.row.firstName}}</span>
                <span>{{scope.row.lastName}}</span>
              </template>
            </el-table-column>
            <el-table-column
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
            </el-table-column>
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
                <!-- <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="enableDo(scope.row)" v-if="!scope.row.enabled">{{$t('common.qy2')}}</el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="disableDo(scope.row)" v-else>{{$t('common.jy2')}}</el-button> -->
                <!-- <el-button v-if="scope.row.user" style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="revisePsw(scope.row)">{{$t('common.xgmm')}}</el-button> -->
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="updateMerchant(scope.row)">{{$t('common.xg')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showUpgrade(scope.row)">{{$t('common.upgrade')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showRenew(scope.row)">{{$t('common.renew')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindMerchant(scope.row)">
                  {{$t('common.binding')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="doShowAccount(scope.row)">{{$t('common.account')}}</el-button>
                <!-- <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindPointsMeMch(scope.row)">
                  {{$t('common.bindOrdMer')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindAmyMch(scope.row)">
                  {{$t('common.bindAmyMer')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindJoyingo(scope.row)">
                  {{$t('common.bindAthShop')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="showBindJoyingo_merchant(scope.row)">
                  {{$t('common.bindJoyMer')}}
                </el-button> -->
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="doTaxSearch(scope.row)" v-if="!scope.row.enableCreditSafe">
                  {{$t('common.enaTaxSearch')}}
                </el-button>
                <el-button style="padding: 3px 4px 3px 4px;margin: 2px" type="primary" size="mini" @click="stopTaxSearch(scope.row)" v-else>
                    {{$t('common.disTaxSearch')}}
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
    <el-dialog
      :title="$t('common.xgmm')"
      width="20%"
      :visible.sync="showPsw"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
        <div>
          <el-form size="mini" ref="pswForm" :model="pswForm" :rules="pswFormRules" label-width="80px">
            <el-form-item :label="$t('common.mima')" style="text-align: left;" prop="password">
              <el-input style="width: 220px;" :placeholder="$t('common.qsrmm')" v-model.trim="pswForm.password">
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="medium" @click="showPsw = false" style="margin-right: 20px;">{{$t('common.annulla')}}</el-button>
        <el-button size="medium" type="primary" @click="doPsw">{{$t('common.conferma')}}</el-button>
      </div>
    </el-dialog>
    <mch-package-renew @onSuccess="onSuccess" :merchantId="renewMerchantId" v-if="renewDialogVisible"
                       :visible.sync="renewDialogVisible"></mch-package-renew>

    <mch-package-upgrade @onSuccess="onSuccess" :merchantId="upgradeMerchantId" v-if="upgradeDialogVisible"
                         :visible.sync="upgradeDialogVisible"></mch-package-upgrade>

    <!-- <mch-pointsme-bind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindPointsMeDialogVisible"
                       :visible.sync="bindPointsMeDialogVisible"></mch-pointsme-bind>
    <mch-amy-bind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindAmyDialogVisible"
                       :visible.sync="bindAmyDialogVisible"></mch-amy-bind>
   <mch-shop-bind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindJoyingoShopDialog"
                       :visible.sync="bindJoyingoShopDialog"></mch-shop-bind>
    <MchJoyingoBind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindJoyingo_merchantShopDialog"
                       :visible.sync="bindJoyingo_merchantShopDialog"></MchJoyingoBind> -->
    <MchBind @onSuccess="onSuccess" :merchantId="bindMerchantId" :id="lenderId" v-if="bindMerchantDialog"
                       :visible.sync="bindMerchantDialog"></MchBind>
    <UserList :merchantId="bindMerchantId" :id="lenderId" v-if="showUser" :visible.sync="showUser"></UserList>
  </div>
</template>
<script>
  import {
  getToken
} from '@/utils/auth';
  import MchPackageRenew from "./MchPackageRenew"
  import MchPackageUpgrade from "./MchPackageUpgrade"
  // import MchPointsMeBind from "./MchPointsMeBind"
  // import MchShopBind from "./MchShopBind"
  // import MchAmyBind from "./MchAmyBind"
  // import MchJoyingoBind from "./MchJoyingoBind"
  import MchBind from "./MchBind"
  import UserList from "./UserList"
  import Vue from 'vue';
  import {
    getInoviceMerList,
    lenderRePsw,
    invLenderEnable,
    invLenderDisable,
    invLenderSearchEnable,
    invLenderSearchDisable
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
        totalCount: -1,
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
      'mch-package-renew': MchPackageRenew,
      'mch-package-upgrade': MchPackageUpgrade,
      // 'mch-pointsme-bind': MchPointsMeBind,
      // 'mch-amy-bind':MchAmyBind,
      // 'mch-shop-bind':MchShopBind,
      // MchJoyingoBind,
      MchBind,
      UserList,
    },
    mounted() {
      this.loadMerchant(this.currentPage, this.pageSize);
    },
    methods: {
      addMerchant(){
        this.$router.push({ name: 'merchantInvoiceDetail' });
      },
      updateMerchant(row){
        this.$router.push({name: "merchantInvoiceDetail", query: {id: row.id}});
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
        getInoviceMerList(params).then(function(res) {
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
      showAdvanceSearchView() {
        this.advanceSearchViewVisible = !this.advanceSearchViewVisible;
        this.keywords = '';
        if (!this.advanceSearchViewVisible) {
        }
      },
      handleSelectionChange(val) {
      },
      searchMerchant() {
        this.loadMerchant(this.currentPage, this.pageSize);
      },
      showRenew(row) {
        if(!row.currentPackage.packageId){
          this.$message.warning(this.$t('common.pleChoPackage'));
          return
        }
        this.renewMerchantId = row.id;
        this.renewDialogVisible = true;
      },
      showUpgrade(row) {
        this.upgradeMerchantId = row.id;
        this.upgradeDialogVisible = true;
      },
      showBindPointsMeMch(row) {
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.bindPointsMeDialogVisible = true;
      },
      showBindAmyMch(row) {
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.bindAmyDialogVisible = true;
      },
      showBindJoyingo(row) {
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.bindJoyingoShopDialog = true;
      },
      showBindJoyingo_merchant(row) {
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.bindJoyingo_merchantShopDialog = true;
      },
      showBindMerchant(row){
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.bindMerchantDialog = true;
      },
      doShowAccount(row){
        this.bindMerchantId = row.merchantId;
        this.lenderId = row.id;
        this.showUser = true;
      },
      enableDo(item){
        let params = new URLSearchParams();
        params.append('id', item.id);
        invLenderEnable(params).then((res)=>{
          if(res.code == 20000){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.loadMerchant(this.currentPage, this.pageSize);
          }else{
            this.$message.error(res.msg);
          }
        }).catch(function(){
        
        });
      },
      disableDo(item){
        let params = new URLSearchParams();
        params.append('id', item.id);
        invLenderDisable(params).then((res)=>{
          if(res.code == 20000){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.loadMerchant(this.currentPage, this.pageSize);
          }else{
            this.$message.error(res.msg);
          }
        }).catch(function(){
        
        });
      },
      doTaxSearch(item){
        let params = new URLSearchParams();
        params.append('id', item.id);
        invLenderSearchEnable(params).then((res)=>{
          if(res.code == 20000){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.loadMerchant(this.currentPage, this.pageSize);
          }else{
            this.$message.error(res.msg);
          }
        }).catch(function(){
        
        });
      },
      stopTaxSearch(item){
        let params = new URLSearchParams();
        params.append('id', item.id);
        invLenderSearchDisable(params).then((res)=>{
          if(res.code == 20000){
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.loadMerchant(this.currentPage, this.pageSize);
          }else{
            this.$message.error(res.msg);
          }
        }).catch(function(){
        
        });
      },
      onSuccess() {
        this.loadMerchant(this.currentPage, this.pageSize);
      },
      exportMerchant() {
        window.open("/api/v1/inv/lender/export?keyword=" + this.keywords + "&authorization=" + getToken() + '&vatNumber=' + this.vatNumber + '&taxCode=' + this.taxCode + '&merchantId=' + this.merchantId, "_parent");
      },
      currentChange(currentChange) {
        this.currentPage = currentChange;
        this.loadMerchant(this.currentPage, this.pageSize);
      },
      beforeFileUpload(file) {
        this.fileUploadBtnText = this.$t('common.inImport');
      },
      fileUploadSuccess(response, file, fileList) {
        if (response) {
          this.$message({type: response.status, message: response.msg});
        }
        this.loadEmps();
        this.fileUploadBtnText = this.$t('common.importData');
      },
      fileUploadError(err, file, fileList) {
        this.$message({type: 'error', message: this.$t('common.importFail')+'!'});
        this.fileUploadBtnText = this.$t('common.importData');
      },
      revisePsw(dt){
        this.pswId = dt.user.id;
        this.showPsw = true;
      },
      doPsw(){
        const _this = this;
        this.$refs.pswForm.validate(valid => {
          if (valid) {
            let params = new URLSearchParams();
            params.append('id', this.pswId);
            params.append('password', this.pswForm.password);
            lenderRePsw(params).then(resp => {
              if (resp.code === 20000) {
                this.$message.success(resp.msg)
                this.showPsw = false;
                this.pswId = '';
                this.pswForm.password = '';
                this.loadMerchant(this.currentPage, this.pageSize);
              }
            })
          }
        })
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
