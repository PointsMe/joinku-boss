<template>
  <el-container v-loading="loading" style="height: 100%">
    <!-- 分类左侧树状展示 -->
    <el-row style="width: 100%;height: 100%">
      <el-col :span="3" style="height: 100%">
        <div class="treeLeft">
          <div style="padding: 5px 10px;">
            <el-input :placeholder="$t('common.insertClassfyName')" v-model="classifyIpt">
              <i slot="suffix" class="el-input__icon el-icon-search"></i>
            </el-input>
          </div>
          <!--          <div class="title" @click="allClassify">-->
          <!--            全部分类-->
          <!--          </div>-->
          <el-tree :data="classifyList" node-key="id" ref="tree" accordion :filter-node-method="filterClassifyNode" @node-click="filterClassifyCheck" :expand-on-click-node="false" :highlight-current="true" :props="defaultProps" style="background-color: #f5f7fa; padding-top:5px">
            <span class="custom-tree-node" slot-scope="{ node, data }">
              <span class="name" :class="{'active':data.checked}">{{ data.name }}</span>
            </span>
          </el-tree>
        </div>
      </el-col>
      <el-col :span="21">
        <el-header style="height: auto; padding: 0">
          <el-row class="search_container" style="padding: 20px">
            <el-col :span="24">
              <el-form ref="customerSearch" @submit.native.prevent :model="form">
                <el-row>
                  <el-col :span="24" style="display:flex;justify-content: space-between;">
                    <div>
                      <el-form-item>
                        <el-input v-model="form.name" :placeholder="$t('common.inputGoodsName')" style="width: 180px;" prefix-icon="el-icon-search" clearable></el-input>
                        <el-input v-model="form.code" :placeholder="$t('common.inputNo')" style="width: 180px;" prefix-icon="el-icon-search" clearable></el-input>
                        <!-- <el-form-item :label="$t('route.supplierManage')+'：'" label-width="110px"> -->
                          <el-select v-model="form.merchantId" :placeholder="$t('common.chooseWholesaler')" filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading2">
                            <el-option
                              v-for="item in supplierList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                          </el-select>
                        <!-- </el-form-item> -->
                        <span>&nbsp;</span>
                        <el-button type="primary" size="mini" style="margin:0px;margin-top: 4px;" @click="searchFn()">{{ $t('common.sousuo') }}
                        </el-button>
                        <el-button type="info" size="mini" plain @click="removeFn()" style="margin:0px;margin-top: 4px;">{{ $t('common.qk') }}
                        </el-button>
                        <el-button type="primary" size="mini" style="margin:0px;margin-top: 4px;" @click="showDrawer = true">
                          {{ $t('common.gjss') }}
                        </el-button>
                      </el-form-item>
                    </div>
                    <div>
                      <el-button type="primary" @click="addSaleProduct();" style="margin-left:0px;margin-top: 4px;" size="mini">{{$t('common.addDistriGoods')}}
                      </el-button>
                      <el-dropdown class="user-name" :hide-on-click="false" trigger="click">
                        <el-button type="primary">
                          {{$t('common.batchHandle')}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </el-button>
                        <el-dropdown-menu slot="dropdown">
                          <el-dropdown-item divided command="username">
                            <el-button type="primary" @click="batchRaisePrice();" style="margin-left:0px;margin-top: 4px;" size="mini">{{ $t('common.batchDiscount') }}</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item divided command="username">
                            <el-button type="primary" style="margin-left:0px;margin-top: 4px;" size="mini" @click="showCategory">{{ $t('common.batchEditClassify') }}</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item divided command="username">
                            <el-button type="primary" style="margin-left:0px;margin-top: 4px;" size="mini" @click="batchSuppliyPrice">{{ $t('common.batchSupClaDis') }}</el-button>
                          </el-dropdown-item>
                          <el-dropdown-item divided command="username">
                            <el-button type="primary" style="margin-left:0px;margin-top: 4px;" size="mini" @click="batchDelete">{{ $t('common.plsc') }}</el-button>
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </el-dropdown>
                    </div>
                  </el-col>
                </el-row>
              </el-form>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="padding: 0">
          <div class="table_container">
            <el-table :data="productList" :height="heightDate" style="width: 100%; font-size: 12px" ref="table" v-loading="loading3"  @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="45" align="center"></el-table-column>
              <el-table-column prop="code" align="left" header-align="center" width="420" :label=" $t('common.mingcheng')+' / ' +$t('common.spbianhao')">
                <template slot-scope="scope">
                  <div style="display:flex;align-items: center;">
                    <el-image :src="scope.row.cover + '_50x50.jpg'" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                      <div slot="error" class="image-slot">
                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                        <!-- <i class="el-icon-s-goods" style="font-size: 20px;"></i> -->
                      </div>
                    </el-image>
                    <!-- <img :src="scope.row.cover + '_50x50.jpg'" alt/> -->
                    <div style="display:flex; flex-direction: column;text-align: left; marginLeft:10px;width: 260px;">
                      <span style="font-weight: bold">{{ scope.row.name }}</span>
                      <div>
                        <span style="color: #888888">{{ scope.row.code }}</span>
                        <el-tag type="info" size="mini" effect="plain" v-if="scope.row.tester">{{$t('common.test')}}</el-tag>
                      </div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price" align="center" width="100" :label="$t('common.shoujia')">
                <template slot-scope="scope">
                  <!-- <template v-if="scope.row.multiSpec">
                    <el-tag type="danger" size="mini" effect="plain">{{ $t('common.currentPrice') }}</el-tag>
                  </template> -->
                  <template>
                    <div v-if="!scope.row.multiSpec">
                      <span>€</span>
                      <span style="color:#f56954;">{{ scope.row.price }}</span>
                    </div>
                    <div v-if="scope.row.multiSpec" style="display: flex;justify-content: center;align-items: center;">
                      <div>
                        <p>
                          <span>€</span>
                          <span style="color: #f56954;">{{ scope.row.minPrice }}</span>
                        </p>
                        <span style="transform:rotate(90deg);display: inline-block;">&nbsp;~&nbsp;</span>
                        <p>
                          <span style="color: #f56954;">{{ scope.row.maxPrice }}</span>
                        </p>
                      </div>
                    </div>
                  </template>
                </template>
              </el-table-column>
              <el-table-column prop="raisePrice" align="center" width="120" label="调价">
                <template slot-scope="scope">
                  <span v-if="scope.row.raisePrice">€</span>
                  <span v-if="scope.row.raisePercent">%</span>
                  <span style="color: #f56954;" v-if="scope.row.raisePrice">{{ scope.row.raisePrice }}</span>
                  <span style="color: #f56954;" v-if="scope.row.raisePercent">{{ scope.row.raisePercent }}</span>
                  <i style="color:#107c3f;cursor: pointer;margin-left: 6px;" class="el-icon-edit" @click="changePrice(scope.row)"></i>
                </template>
              </el-table-column>
              <el-table-column prop="stock" align="right" width="120" :label="$t('common.kucun')">
                <template slot-scope="scope">
                  <span style="color: #3c8dbc; font-weight: bold">{{ scope.row.stock }}</span>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="unit" align="right" width="160" :label="$t('common.danwei')">
                <template slot-scope="scope">
                  <div style="display:flex;flex-direction:column">
                    <span v-for="(item,index) in scope.row.units" :key="index">
                      {{ item.unitName }}&nbsp;
                      <span v-if="index!=0">({{ item.factor }}{{ scope.row.units[0].unitName }})</span>
                    </span>
                  </div>
                </template>
              </el-table-column> -->
              <el-table-column prop="new" align="right" width="160" :label="$t('common.yingxiao')">
                <template slot-scope="scope">
                  <p v-if="scope.row.newest">
                    <el-tag type="danger" size="mini" effect="plain">{{ $t('common.newest') }}</el-tag>
                  </p>
                  <p v-if="scope.row.recommended">
                    <el-tag type="danger" size="mini" effect="plain">{{ $t('common.recommended') }}</el-tag>
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="published" align="center" width="160" :label="$t('common.shangjia')+'/'+$t('common.xiajia')">
                <template slot-scope="scope">
                  <span>
                    <el-tag type="success" size="mini" effect="plain" v-if="scope.row.published">{{ $t('common.upJiaed') }}</el-tag>
                    <el-tag type="info" size="mini" effect="plain" v-if="!scope.row.published">{{ $t('common.dowJiaed') }}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column prop="sort" align="center" :label="$t('common.paixu')"></el-table-column>
              <el-table-column align="center" width="220" fixed="right" :label="$t('common.cz')">
                <template slot-scope="scope">
                  <el-button type="text"  @click="deleteProduct(scope.row.id);">{{ $t('common.sc') }}
                  </el-button>
                  <el-button type="text"  @click="reviseCategory(scope.row.id);">{{ $t('common.editClassify') }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[15, 60, 120, 200]" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, slot, jumper" :total="totalCount">
                <span class="pageSizeInput" style="color: #606266;font-weight: 400;">
                  <el-input class="pageSizeBorder" v-model.number="pagesize" @blur="handleSizeChange" style="width: 60px;"></el-input> {{$t('common.barPerPage')}}
                </span>
              </el-pagination>
            </div>
          </div>
        </el-main>
      </el-col>
    </el-row>
    <el-drawer :before-close="closeDrawer" :show-close="false" :visible.sync="showDrawer" size="320px" direction="rtl" custom-class="demo-drawer" ref="drawer">
      <div class="demo-drawer__content">
        <el-form :model="form">
          <!-- <el-form-item :label="$t('route.supplierManage')+'：'" label-width="110px">
            <el-select v-model="form.merchantId" multiple filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading2">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item :label="$t('common.jgqj')+'：'" label-width="110px">
            <el-input v-model="form.minPrice" clearable style="width: 80px;" size="mini"></el-input>
            ~
            <el-input v-model="form.maxPrice" clearable style="width: 80px;" size="mini"></el-input>
          </el-form-item>
          <el-form-item :label="$t('common.sxjia')" label-width="110px">
            <el-radio v-model="form.published" :label="true">{{ $t('common.shangjia') }}</el-radio>
            <el-radio v-model="form.published" :label="false">{{ $t('common.xiajia') }}</el-radio>
          </el-form-item>
          <el-form-item label="是否测试：" label-width="110px">
            <el-radio v-model="form.tester" :label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.tester" :label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('common.sfxp')+'：'" label-width="110px">
            <el-radio v-model="form.newest" :label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.newest" :label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item>
          <el-form-item :label="$t('common.sftj')+'：'" label-width="110px">
            <el-radio v-model="form.recommend" :label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.recommend" :label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item>
          <!-- <el-form-item :label="$t('common.sffl')+'：'" label-width="100px">
            <el-radio v-model="form.enableRebate" label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.enableRebate" label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item> -->
          <!-- <el-form-item :label="$t('common.sfxzkc')+'：'" label-width="110px">
            <el-radio v-model="form.limitedStock" :label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.limitedStock" :label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item>
          <el-form-item label="是否多规格：" label-width="110px">
            <el-radio v-model="form.multiSpec" :label="true">{{ $t('common.yes') }}</el-radio>
            <el-radio v-model="form.multiSpec" :label="false">{{ $t('common.fou') }}</el-radio>
          </el-form-item> -->
          <!-- <el-form-item :label="$t('common.noHuo')+'：'" label-width="110px">
            <el-checkbox v-model="form.outOfStock"></el-checkbox>
          </el-form-item> -->
        </el-form>
        <div class="demo-drawer__footer" style="padding-left: 20px;">
          <el-button @click="cancleDrawer">{{ $t('common.close') }}</el-button>
          <el-button type="primary" size="mini" @click="searchFn()">{{ $t('common.sousuo') }}</el-button>
          <el-button type="info" size="mini" plain @click="removeFn()" style="margin:0px">{{ $t('common.qk') }}</el-button>
        </div>
      </div>
    </el-drawer>
    <el-dialog width="30%" :visible.sync="showBatchPrice" :close-on-click-modal="false" :show-close="false" :title="rasieTitle">
      <div style="display:flex;flex-direction: column">
        <el-form :model="raisePriceForm" :rules="raisePriceRules" ref="raisePriceForm" size="middle">
          <el-form-item :label="$t('route.supplierManage')+'：'" label-width="120px" v-if="batchType == 'suppliy'">
            <el-select v-model="raisePriceForm.suppliyRaise" clearable filterable remote reserve-keyword :remote-method="remoteMethod" :loading="loading2">
              <el-option
                v-for="item in supplierList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item  label-width="120px" :label="$t('common.classify')" v-if="batchType == 'suppliy'">
            <el-cascader v-model="raisePriceForm.classifyIds" :options="categorylist" :placeholder="$t('common.pleaseChoClas2')" :show-all-levels="false" :props="defaultProps2" clearable></el-cascader>
          </el-form-item>
          <el-form-item  label-width="120px">
            <el-switch v-model="raisePriceForm.priceOrPercent" :active-text="$t('common.percentDiscount')" :inactive-text="$t('common.changePrice')" @change="switchRaise"></el-switch>
          </el-form-item>
          <el-form-item label-width="120px" prop="raisePercent" v-if ="raisePriceForm.priceOrPercent">
            <span slot="label">
                <span>
                $t('common.percentDiscount'):
                </span>
            </span>
            <el-input v-model="raisePriceForm.raisePercent" size="medium" clearable type="Number"></el-input>
          </el-form-item>
          <el-form-item label-width="120px" prop="raisePrice" v-else>
            <span slot="label">
                <span>
                  $t('common.changePrice'):
                </span>
            </span>
            <el-input v-model="raisePriceForm.raisePrice" size="medium" clearable></el-input>
          </el-form-item>
        </el-form>
        <div style="margin-top:10px; text-align: right;">
          <el-button size="mini" @click="showBatchPrice = false;">{{ $t('common.qx') }}</el-button>
          <el-button type="primary" size="mini" @click="priceRaise();">{{ $t('common.queding') }}</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog width="81%" :visible.sync="showAddProduct" :close-on-click-modal="false" :show-close="false" :title="$t('common.addDistriGoods')">
      <el-steps :active="goStep" finish-status="success">
        <el-step :title="$t('common.chooseWholesaler')"></el-step>
        <el-step :title="$t('common.chooseProduct')" v-if="goType == 'product'"></el-step>
        <el-step :title="$t('common.chooseClassify')" v-if="goType == 'category'"></el-step>
      </el-steps>
      <ChooseSupplier v-if="goStep == 0" @cancleChoose="cancleChoose" @goToProduct="goToProduct" @gotoCategory="gotoCategory"></ChooseSupplier>
      <ChooseProduct v-if="goStep == 1 && goType == 'product'" :chooseSupplier="chooseSupplier" @cancleChoose="cancleChoose" @preOp="preOp"></ChooseProduct>
      <ChooseCategory v-if="goStep == 1 && goType == 'category'" :chooseSupplier="chooseSupplier" @cancleChoose="cancleChoose" @preOp="preOp"></ChooseCategory>
    </el-dialog>
    <el-dialog width="30%" :visible.sync="category" :close-on-click-modal="false" :show-close="false" :title="$t('common.editClassify')">
      <div style="display:flex;flex-direction: column">
        <el-form size="middle">
          <el-form-item  label-width="120px">
            <el-cascader
              @change="handleCascaderChange"
              v-model="categoryId"
              :options="categorylist" :show-all-levels="false" :props="defaultProps2"></el-cascader>
          </el-form-item>
        </el-form>
        <div style="margin-top:10px; text-align: right;">
          <el-button size="mini" @click="category = false;categoryId = [];">{{ $t('common.qx') }}</el-button>
          <el-button type="primary" size="mini" @click="saveCategoy();">{{ $t('common.queding') }}</el-button>
        </div>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import Vue from 'vue';
import {
  // classifySearch,
  classifyTree,
  getGoodsList,
  getSupplierList,
  raisePrice,
  suppliyCateraisePrice,
  getGoodsDelete,
  categoryUpdate
} from '@/api/api';
import ChooseSupplier from '@/views/retail/chooseSupplier';
import ChooseProduct from '@/views/retail/chooseProduct';
import ChooseCategory from '@/views/retail/chooseCategory';
var moment = require('moment');
export default {
  name: 'ProductList',
  components: {
    ChooseSupplier,
    ChooseProduct,
    ChooseCategory
  },
  data() {
    return {
      loading: false,
      loading2: false,
      loading3: false,
      shi: this.$t('common.yes'),
      fou: this.$t('common.fou'),
      props: {
        label: 'name',
        children: 'children',
        value: 'id',
        multiple: true
      },
      wks: this.$t('common.wks'),
      jxz: this.$t('common.status.processing'),
      yjs: this.$t('common.status.finished'),
      heightDate: '42',
      form: {
        name:'',
        code:'',
        minPrice: '',
        maxPrice: '',
        published: '',
        tester:'',
        newest: '',
        recommend: '',
        enableRebate: '',
        limitedStock: '',
        multiSpec: '',
        keyword: '',
        promotion: '',
        outOfStock: '',
        parentCategoryId: '',
        childCategoryId: '',
        merchantId: []
      },
      shangjia: this.$t('common.shangjia'),
      xiajia: this.$t('common.xiajia'),
      // 默认数据总数
      totalCount: 0,
      // 当前页码
      currentPage: 1,
      // 默认每页数据量 €
      pagesize: 15,

      productList: [],
      file: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      defaultProps2: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      classifyIpt: '',
      showDrawer: false,
      classifyList: [],
      supplierList: [],
      showBatchPrice: false,
      raisePriceForm: {
        priceOrPercent: false,
        raisePercent: '',
        raisePrice: '',
        suppliyRaise:'',
        classifyIds:[],
        ids:[]
      },
      raisePriceRules: {
        raisePrice: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        raisePercent: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ]
      },
      rasieTitle: this.$t('common.changePrice'),
      showAddProduct: false,
      goStep: 0,
      merchantId: '',
      batchMove: [],
      category: false,
      categoryId: [],
      categoryIds: [],
      categorylist: [],
      //批量数据
      batchType:'',
      //分类分销
      goType:'product'
    };
  },
  methods: {
    reviseCategory(id) {
      this.categoryIds = [];
      this.categoryIds.push(id);
      this.category = true;
    },
    handleCascaderChange(dt) {
      this.categoryId = dt;
    },
    saveCategoy() {
      let that = this;
      let params = new URLSearchParams();
      params.append('categoryId', this.categoryId[this.categoryId.length - 1]);
      params.append('ids', this.categoryIds);
      categoryUpdate(params).then(function(res) {
        if (res.code == 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.categoryId = [];
          that.category = false;
          that.getGoodsList(that.currentPage, that.pagesize);
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](function() {});
    },
    showCategory() {
      if (this.categoryIds.length == 0) {
        this.$message({
          message: this.$t('common.pchoosePro') + '!',
          type: 'warning'
        });
        return
      }
      this.category = true;
    },
    goToProduct(dt) {
      this.goType = 'product';
      this.chooseSupplier = dt;
      this.goStep++;
    },
    gotoCategory(dt){
      this.goType = 'category';
      this.chooseSupplier = dt;
      this.goStep++;
    },
    preOp() {
      this.goStep = 0;
    },
    cancleChoose() {
      this.goStep = 0;
      this.showAddProduct = false;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    addSaleProduct() {
      this.showAddProduct = true;
    },
    deleteProduct(id) {
      var that = this;
      that.$confirm(that.$t('common.isDeleteProduct') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.queding'),
        cancelButtonText: that.$t('common.qx'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('ids', id);
        getGoodsDelete(params)
          .then(function(res) {
            if (res.code == 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.getGoodsList(that.currentPage, that.pagesize);
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](function() {});
      })['catch'](() => {});
    },
    switchRaise(dt){
      if (dt) {
        this.rasieTitle = this.$t('common.percentDiscount')
      } else {
        this.rasieTitle = this.$t('common.changePrice')
      }
    },
    batchRaisePrice() {
      if (this.raisePriceForm.ids.length == 0){
        this.$message({
          message: this.$t('common.pchoosePro'),
          type: 'warning'
        });
      } else {
        this.batchType = '';
        this.showBatchPrice = true;
      }
    },
    batchDelete() {
      if (this.batchMove.length == 0) {
        this.$message({
          message: this.$t('common.insertDeleteProduct'),
          type: 'warning'
        });
        return
      }
      var that = this;
      that.$confirm(that.$t('common.isDeleteProduct') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.queding'),
        cancelButtonText: that.$t('common.qx'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('ids', this.batchMove);
        getGoodsDelete(params)
          .then(function(res) {
            if (res.code == 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.getGoodsList(that.currentPage, that.pagesize);
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](function() {});
      })['catch'](() => {});
    },
    handleSelectionChange(dt) {
      //批量删除
      this.batchMove = [];
      for (let i = 0; i < dt.length; i++) {
        this.batchMove.push(dt[i].id);
      }
      //批量调价
      this.raisePriceForm.ids = [];
      for (let i = 0; i < dt.length; i++) {
        let obj = {
          merchantId: dt[i].merchantId,
          goodsId: dt[i].id
        };
        this.raisePriceForm.ids.push(obj);
      }
      //批量修改分类
      this.categoryIds = [];
      for (let i = 0; i < dt.length; i++) {
        this.categoryIds.push(dt[i].id);
      }
    },
    priceRaise() {
      this.$refs.raisePriceForm.validate((valid)=>{
        if (valid) {
          let params = [];
          let requestObj = null;
          if(!this.raisePriceForm.suppliyRaise && this.raisePriceForm.classifyIds.length == 0 && this.batchType == 'suppliy'){
            this.$message({
                message: this.$t('common.chooseSupOrCla'),
                type: 'warning'
              });
              return
          }
          if (this.raisePriceForm.priceOrPercent) {
            if (!(this.raisePriceForm.raisePercent > 0 && this.raisePriceForm.raisePercent < 500)) {
              this.$message({
                message: this.$t('common.percentScopeHint'),
                type: 'warning'
              });
              return
            }
            if(this.batchType == 'suppliy'){
              requestObj = suppliyCateraisePrice;
              params = {
                merchantId: this.raisePriceForm.suppliyRaise,
                parentCategoryId: this.raisePriceForm.classifyIds.length == 0?'':this.raisePriceForm.classifyIds[0],
                childCategoryId: this.raisePriceForm.classifyIds.length == 0?'':this.raisePriceForm.classifyIds[1],
                raisePrice: '',
                raisePercent:this.raisePriceForm.raisePercent,
              };
            }else{
              requestObj = raisePrice;
              for (let i = 0; i < this.productList.length; i++) {
                for (let j = 0; j < this.raisePriceForm.ids.length; j++) {
                  if (this.productList[i].id == this.raisePriceForm.ids[j].goodsId) {
                    let obj = {
                      merchantId: this.raisePriceForm.ids[j].merchantId,
                      goodsId: this.raisePriceForm.ids[j].goodsId,
                      raisePrice: '',
                      raisePercent:this.raisePriceForm.raisePercent,
                    };
                    params.push(obj);
                  }
                }
              }
            }
          } else {
            if(this.batchType == 'suppliy'){
              requestObj = suppliyCateraisePrice;
              params = {
                merchantId: this.raisePriceForm.suppliyRaise,
                parentCategoryId: this.raisePriceForm.classifyIds.length == 0?'':this.raisePriceForm.classifyIds[0],
                childCategoryId: this.raisePriceForm.classifyIds.length == 0?'':this.raisePriceForm.classifyIds[1],
                raisePrice: this.raisePriceForm.raisePrice,
                raisePercent:'',
              };
            }else{
              requestObj = raisePrice;
              for (let i = 0; i < this.raisePriceForm.ids.length; i++) {
                let obj = {
                  merchantId: this.raisePriceForm.ids[i].merchantId,
                  goodsId: this.raisePriceForm.ids[i].goodsId,
                  raisePrice: this.raisePriceForm.raisePrice,
                  raisePercent:'',
                };
                params.push(obj);
              }
            }
          }
          requestObj(params).then((res) => {
            if (res.code == 20000) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.showBatchPrice = false;
              this.raisePriceForm = {
                priceOrPercent: false,
                raisePercent: '',
                raisePrice: '',
                suppliyRaise:'',
                classifyIds:[],
                ids:[]
              };
              this.getGoodsList(this.currentPage, this.pagesize);
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch(function() {
          
          });
        }
      })
    },
    changePrice(dt) {
      this.raisePriceForm.priceOrPercent = dt.raisePrice?false:true;
      this.raisePriceForm.raisePercent = dt.raisePercent;
      this.raisePriceForm.raisePrice = dt.raisePrice;
      this.showBatchPrice = true;
      let obj = {
        merchantId: dt.merchantId,
        goodsId: dt.id
      };
      this.raisePriceForm.ids.push(obj);
    },
    remoteMethod(query) {
      this.loading2 = true;
      // let params = new URLSearchParams();
      // params.append("page", 1);
      // params.append("rows", 15);
      // params.append("biz",101);
      // params.append("name", query);
      // params.append("owned",true);
      let params = {
        page:1,
        size:15,
        name:query,
        owned:true
      }
      getSupplierList(params).then((res) => {
        this.loading2 = false;
        if (res.code == 20000) {
          this.supplierList = res.data.list;
        } else {
          this.$message.error(res.msg);
        }
      })
      .catch(() => {
        this.loading2 = false;
      });
    },
    getSupplierList() {
      var that = this;
      // var params = new URLSearchParams();
      // params.append("page", 1);
      // params.append("rows", 15);
      // params.append("biz",101);
      // params.append("owned",true);
      let params = {
        page:1,
        size:15,
        owned:true
      }
      getSupplierList(params).then(function(res) {
          if (res.code == 20000) {
            that.supplierList = res.data.list;
          } else {
            that.$message.error(res.msg);
          }
        })
        .catch(function() {});
    },
    closeDrawer() {
      this.showDrawer = false;
    },
    cancleDrawer() {
      this.showDrawer = false;
    },
    filterClassifyCheck(data) {
      for (let i = 0; i < this.classifyList.length; i++) {
        this.classifyList[i].checked = false;
        for (let j = 0; j < this.classifyList[i].children.length; j++) {
          this.classifyList[i].children[j].checked = false;
        }
      }
      if (data.parentId == 0) {
        this.form.parentCategoryId = data.id;
        this.form.childCategoryId = '';
      } else {
        this.form.parentCategoryId = '';
        this.form.childCategoryId = data.id;
      }
      for (let i = 0; i < this.classifyList.length; i++) {
        if (data.id == this.classifyList[i].id) {
          this.classifyList[i].checked = true;
          for (let j = 0; j < this.classifyList[i].children.length; j++) {
            if (data.id == this.classifyList[i].children[j].id) {
              this.classifyList[i].children[j].checked = true;
            }
          }
        }
      }
      this.currentPage = 1;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    filterClassifyNode(value, data) {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    searchFn() {
      this.showDrawer = false;
      this.currentPage = 1;
      this.pagesize = 15;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    removeFn() {
      this.form.keyword = '';
      this.form.minPrice = '';
      this.form.maxPrice = '';
      this.form.published = '';
      this.form.name ='';
      this.form.code ='';
      this.form.tester = '';
      this.form.newest = '';
      this.form.recommend = '';
      this.form.enableRebate = '';
      this.form.limitedStock = '';
      this.form.multiSpec = '';
      this.form.outOfStock = '';
      this.form.promotion = '';
      this.form.merchantId = [];
      this.currentPage = 1;
      this.pagesize = 15;
      this.searchFn();
    },
    // 每页显示数据量变更
    handleSizeChange: function(val) {
      if(this.pagesize == ''){
        this.pagesize = 15;
      }
      // this.pagesize = val;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    // 页码变更
    handleCurrentChange: function(val) {
      this.currentPage = val;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    geterjiClassify() {
      var that = this;
      var params = new URLSearchParams();
      params.append("type", 102);
      classifyTree(params).then(res => {
        if (res.code === 20000) {
          that.classifyList = res.data;
          let obj = {
            children: [],
            id: '',
            parentId: 0,
            name: that.$t('common.allClassify')
          };
          that.classifyList.unshift(obj);
          if (that.classifyList.length > 0) {
            for (let i = 0; i < that.classifyList.length; i++) {
              Vue.set(that.classifyList[i], 'checked', false);
              if (!that.classifyList[i].id) {
                Vue.set(that.classifyList[i], 'checked', true);
              }
              that.classifyList[i].children.forEach(item => {
                item.children = '';
                Vue.set(item, 'checked', false);
              });
            }
          }
          that.categorylist = JSON.parse(JSON.stringify(that.classifyList));
          that.categorylist.shift();
          that.$nextTick(() => {
            for (let i = 0; i < that.classifyList.length; i++) {
              if (!that.classifyList[i].id) {
                that.$refs.tree.setCurrentKey(that.classifyList[i].id);
              }
            }
          });
        }
      });
    },
    getGoodsList(page, rows) {
      this.loading = true;
      var that = this;
      var params = new URLSearchParams();
      params.append('page', page);
      params.append('rows', rows);
      params.append('name', that.form.name);
      params.append('code', that.form.code);
      params.append('keyword', that.form.keyword);
      params.append('merchantId', that.form.merchantId);
      params.append('parentCategoryId', that.form.parentCategoryId);
      params.append('childCategoryId', that.form.childCategoryId);
      params.append('outOfStock', that.form.outOfStock);
      params.append('minPrice', that.form.minPrice);
      params.append('maxPrice', that.form.maxPrice);
      params.append('published', that.form.published);
      params.append('tester', that.form.tester);
      params.append('enableRebate', that.form.enableRebate);
      params.append('limitedStock', that.form.limitedStock);
      params.append('multiSpec', that.form.multiSpec);
      params.append('newest', that.form.newest);
      params.append('recommended', that.form.recommend);
      params.append('owned', true);
      getGoodsList(params)
        .then(function(res) {
          that.loading = false;
          if (res.code == 20000) {
            if (res.data.size == 0 && !res.data.hasNextPage && res.data.list.length != 0) {
              // 最后一页删除往前一页重新请求
              that.getGoodsList(that.currentPage - 1, that.pagesize);
              return;
            }
            that.totalCount = res.data.total;
            that.productList = res.data.list;

            // 展示数据内容优化
            let lookHeight = 0;
            if (that.productList.length > 0) {
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
        })['catch'](() =>{
          that.loading = false;
        });
    },
    handleChange(file) {
      this.file = file.raw;
    },
    //批发商，分类操作位置
    batchSuppliyPrice(){
      this.batchType = 'suppliy';
      this.showBatchPrice = true;
    },
  },
  watch: {
    // 实时更新数据
    classifyIpt(val) {
      this.$refs.tree.filter(val);
    }
  },
  created() {
  
  },
  mounted() {
    this.getSupplierList();
    this.geterjiClassify();
    this.getGoodsList(this.currentPage, this.pagesize);
  },
  // 自动触发点击事件
  directives: {
    trigger: {
      inserted(el) {
        el.click();
      }
    }
  },
  computed: {},
  filters: {
    timeChange(val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm');
      } else {
        return '-';
      }
    },
    publishedValue(val, shangjia, xiajia) {
      if (val) {
        return shangjia;
      } else {
        return xiajia;
      }
    },
    state(val, yes, fou) {
      if (val) {
        return yes;
      } else {
        return fou;
      }
    },
    stateValue(val, wks, jxz, yjs) {
      if (val == '101') {
        return wks;
      } else if (val == '102') {
        return jxz;
      } else if (val == '103') {
        return yjs;
      } else {
        return '';
      }
    }
  }
};

</script>
<style lang="scss" scoped>
.mod_searchbar_goodmode {
  position: relative;
  cursor: pointer;
  display: block;
  margin-right: 10px;
  width: 18px;
  height: 28px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTGZmZmVlZWdnZ2ZmZmQUBPYAAAAEdFJOUwDmSUqpTpZKAAAAMklEQVQoz2NQdAEDIQYGOEsEwnBkQLBcGMDAhQHBGnZCWLxtCGEIMyCxqAhGw56ksAcACQo3hfAlFFAAAAAASUVORK5CYII=) 50% no-repeat;
  background-size: 18px auto;
  z-index: 2;
}

.mod_searchbar_goodmode.type_list {
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAPUExURUdwTGZmZmZmZmZmZmZmZqx+uD0AAAAEdFJOUwDE5kkiEfVYAAAAM0lEQVQoz2MwcgEDZQYEUIEIOSEJuaBQBIVEICa4OOIVItt42tiIxdtYAoeaYDTsSQp7AKL9LfUHoGHOAAAAAElFTkSuQmCC);
}

.el-tabs__nav-wrap {
  margin-bottom: -2px;
}

.el-tabs--card>.el-tabs__header .el-tabs__nav {
  border: none;
}

.el-tabs__item {
  height: 60px;
  line-height: 60px;
  border-top: 1px solid #E4E7ED;
}

.el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
  border-left: 1px solid #E4E7ED;
}

.el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
  border-right: 1px solid #E4E7ED;
}

.el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
  border-top: 2px solid green;
}

#tab-first,
#tab-second {
  margin-right: -4px;
}

.el-tabs__item.is-active {
  color: black;
}

.advancedSearch {
  position: relative;
}

.search_container .el-radio {
  margin-right: 10px;
}

.search_container .el-form-item--mini.el-form-item,
.search_container .el-form-item--small.el-form-item {
  display: inline-block;
  margin-bottom: 0;
}

.tab-cs {
  width: 50%;
  line-height: 42px;
  text-align: center;
  border: 1px solid #ebeef5;
  cursor: pointer;
}

.tab-active {
  background: #ebeef5;
}

.treeLeft {
  /*width: 204px;*/
  height: 100%;

  /*position: absolute;
  left: -206px;
  top: 0;*/
  .title {
    text-align: center;
    height: 30px;
    margin-top: 6px;
    background: #107c3f;
    line-height: 30px;
    color: white;
    cursor: pointer;
  }

  .el-tree {
    height: calc(100% - 60px);
    overflow-x: hidden;
    overflow-y: auto;
  }

  .custom-tree-node {
    //width: 200px;
    position: relative;
    display: inline-block;
    padding: 5px 10px;

    .name {
      //width: 160px;
      line-height: 16px;
      font-size: 14px;
      display: inline-block;
      word-wrap: break-word;
      white-space: normal;
      vertical-align: text-top;
    }

    .active {
      color: black;
      font-weight: bold;
    }
  }
}

</style>
