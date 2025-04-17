<template>
  <div class="chooseProduct">
    <el-main style="padding: 0">
      <div v-if="chooseSupplier">
        {{$t('common.selectedWhole')}}:{{chooseSupplier.name}}
      </div>
      <div class="cenMbox">
          <div class="maxBoxl">
              <div class="grid-content bg-purple">
                  <div class="cenFont">{{$t('common.distriGoods')}}</div>
                  <div class="searchSy">
                      <div class="leftSearchSy">
                          <el-input :placeholder="$t('common.inputGoodsName')" clearable style="width:150px;marginLeft:5px" size="mini" class="searchIn" @change="doSearch" v-model="leftValue"></el-input>
                          <el-input :placeholder="$t('common.inputGoodsNo')" clearable style="width:150px;marginLeft:5px" size="mini" class="searchIn" @change="doSearch4" v-model="leftValue2"></el-input>
                      </div>
                  </div>
                  <div style="display:flex;height: 450px;">
                      <div class="dishLeftSy rightDishFont">
                        <el-tree :data="classifyTreeList" node-key="id" ref="tree" accordion :filter-node-method="filterClassifyNode" @node-click="filterClassifyCheck" :expand-on-click-node="false" :highlight-current="true" :props="defaultProps" style="background-color: #f5f7fa; padding-top:5px">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span class="name" :class="{'active':data.checked}">{{ data.name }}</span>
                          </span>
                        </el-tree>
                      </div>
                      <div class="leftDish">
                          <div>
                              <el-table height="450" :data="supplyGoodsList" border size="mini" style="width: 100%;" @select="seleChange" @select-all="seleChangeAll" v-loading="loading">
                                  <el-table-column type="selection"></el-table-column>
                                  <el-table-column align="left" :label="$t('common.productName')">
                                      <template slot-scope="scope">
                                        <div style="display:flex; flex-direction: column;text-align: left; marginLeft:10px;width: 260px;">
                                          <span style="font-weight: bold">{{ scope.row.name }}</span>
                                          <span style="color: #888888">{{ scope.row.code }}</span>
                                        </div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column align="left" :label="$t('common.jiage')" width="100">
                                      <template slot-scope="scope">
                                          <el-input v-model.trim="scope.row.price" size="mini" disabled></el-input>
                                      </template>
                                  </el-table-column>
                              </el-table>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="leftCount">
                  <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pagesize"
                    :page-sizes="[15, 60, 120, 200]"
                    layout="total, prev, pager, next, slot"
                    :total="totalCount"
                  >
                    <span class="pageSizeInput" style="color: #606266;font-weight: 400;">
                      <el-input class="pageSizeBorder" v-model.number="pagesize" @blur="handleSizeChange" style="width: 60px;"></el-input> {{$t('common.barPerPage')}}
                    </span>
                  </el-pagination>
              </div>
          </div>
          <div class="maxBoxr">
              <div class="grid-content bg-purple-light">
                  <div class="cenFont">{{$t('common.addedDistriGoods')}}</div>
                  <div class="searchSy">
                      <div>
                          <el-input :placeholder="$t('common.inputGoodsName')" clearable style="width:150px;marginLeft:5px" size="mini" class="searchIn"  @change="doSearch2" v-model="rightValue"></el-input>
                          <el-input :placeholder="$t('common.inputGoodsNo')" clearable style="width:150px;marginLeft:5px" size="mini" class="searchIn"  @change="doSearch3" v-model="rightValue2"></el-input>
                      </div>
                      <!-- <div>
                        <el-button type="primary" @click="batchRaisePrice();" style="margin-left:0px;margin-top: 4px;" size="mini">批量调价
                        </el-button>
                        <el-button type="info"style="margin-left:0px;margin-top: 4px;" size="mini" @click="batchDelete">批量删除</el-button>
                      </div> -->
                  </div>
                  <div style="display:flex;height: 450px;">
                    <div class="dishLeftSy rightDishFont">
                      <el-tree :data="categoryTreeList" node-key="id" ref="tree2" accordion :filter-node-method="filterClassifyNode2" @node-click="filterClassifyCheck2" :expand-on-click-node="false" :highlight-current="true" :props="defaultProps" style="background-color: #f5f7fa; padding-top:5px">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span class="name" :class="{'active':data.checked}">{{ data.name }}</span>
                        </span>
                      </el-tree>
                      </div>
                      <div class="leftDish">
                          <div>
                              <el-table height="450" :data="distributionGoodsList" border size="mini" style="width: 100%" class="delBtn" v-loading="loading2" @selection-change="handleSelectionChange">
                                <el-table-column type="selection" width="40"></el-table-column>
                                <el-table-column align="left" :label="$t('common.productName')">
                                    <template slot-scope="scope">
                                      <div style="display:flex; flex-direction: column;text-align: left; marginLeft:10px;width: 260px;">
                                          <span style="font-weight: bold">{{ scope.row.name }}</span>
                                          <span style="color: #888888">{{ scope.row.code }}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column align="left" :label="$t('common.jiage')" width="100">
                                    <template slot-scope="scope">
                                        <el-input v-model.trim="scope.row.price" size="mini" disabled></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="left" :label="$t('common.changePrice')" width="90">
                                  <template slot-scope="scope">
                                    <span v-if="scope.row.raisePrice">€</span>
                                    <span v-if="scope.row.raisePercent">%</span>
                                    <span style="color: #f56954;" v-if="scope.row.raisePrice">{{ scope.row.raisePrice }}</span>
                                    <span style="color: #f56954;" v-if="scope.row.raisePercent">{{ scope.row.raisePercent }}</span>
                                    <!-- <span>€</span>
                                    <span style="color: #f56954;">{{ scope.row.raisePrice }}</span> -->
                                    <!-- <i style="color:#107c3f;cursor: pointer;margin-left: 6px;" class="el-icon-edit" @click="changePrice(scope.row)"></i> -->
                                  </template>
                                </el-table-column>
                                <!-- <el-table-column :label="$t('common.cz')" width="60">
                                    <template slot-scope="scope">
                                        <el-button type="text" size="mini" @click="deleteProduct(scope.row.id);">{{$t('common.sc')}}</el-button>
                                    </template>
                                </el-table-column> -->
                              </el-table>
                          </div>
                      </div>
                  </div>
              </div>
              <div class="rightCount">
                  <el-pagination
                    background
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :current-page="currentPage2"
                    :page-size="pagesize2"
                    :page-sizes="[15, 60, 120, 200]"
                    layout="total, prev, pager, next ,slot"
                    :total="totalCount2"
                  >
                    <span class="pageSizeInput" style="color: #606266;font-weight: 400;">
                      <el-input class="pageSizeBorder" v-model.number="pagesize2" @blur="handleSizeChange2" style="width: 60px;"></el-input> {{$t('common.barPerPage')}}
                    </span>
                  </el-pagination>
              </div>
          </div>
      </div>
      <div style="margin-top:10px;text-align: center;">
        <el-button size="medium" @click="cancleChoose">{{ $t('common.qx') }}</el-button>
        <el-button type="primary" size="medium" @click="preOp">{{$t('common.lastStep')}}</el-button>
        <el-button type="primary" size="medium" @click="saveGoods">{{ $t('common.save') }}</el-button>
      </div>
      <el-dialog width="30%" :visible.sync="showBatchPrice" :close-on-click-modal="false" :show-close="false" :title="rasieTitle" :modal="false">
      <div style="display:flex;flex-direction: column">
        <el-form :model="raisePriceForm" :rules="raisePriceRules" ref="raisePriceForm" size="middle">
          <el-form-item  label-width="120px">
            <el-switch v-model="raisePriceForm.priceOrPercent" :active-text="$t('common.percentDiscount')" :inactive-text="$t('common.changePrice')" @change="switchRaise"></el-switch>
          </el-form-item>
          <el-form-item label-width="120px" prop="percent" v-if ="raisePriceForm.priceOrPercent">
            <span slot="label">
                <span>
                {{$t('common.percentDiscount')}}:
                </span>
            </span>
            <el-input v-model="raisePriceForm.percent" size="medium" clearable type="Number"></el-input>
          </el-form-item>
          <el-form-item label-width="120px" prop="raisePrice" v-else>
            <span slot="label">
                <span>
                  {{$t('common.changePrice')}}:
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
  </el-main>
  </div>
</template>
<script>
import Vue from "vue";
import {
  goodsSupplyList,
  classifyTree2,
  goodsDistributionList,
  categoryTree,
  getGoodsDelete,
  distributionGoodsAdd,
  raisePrice
} from "@/api/api";
export default {
  components: {
  
  },
  props: {
    chooseSupplier: {
      default: ''
    }
  },
  data() {
    return {
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      //默认数据总数
      totalCount: 0,
      //当前页码
      currentPage: 1,
      //默认每页数据量 €
      pagesize: 15,
      //默认数据总数
      totalCount2: 0,
      //当前页码
      currentPage2: 1,
      //默认每页数据量 €
      pagesize2: 15,
      loading: false,
      loading2: false,
      supplyGoodsList: [],
      distributionGoodsList: [],
      classifyTreeList: [],
      categoryTreeList: [],
      leftValue: '',
      leftValue2:'',
      rightValue: '',
      rightValue2:'',
      parentClassifyId: '',
      childClassifyId: '',
      parentCategoryId: '',
      childCategoryId: '',
      saveGoodsList: [],
      batchMove: [],
      showBatchPrice: false,
      raisePriceForm: {
        priceOrPercent: false,
        percent: '',
        raisePrice: '',
        ids:[]
      },
      raisePriceRules: {
        raisePrice: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ],
        percent: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ]
      },
      rasieTitle: '调价',
    }
  },
  methods: {
    preOp() {
      this.$emit('preOp');
    },
    cancleChoose() {
      this.$emit('cancleChoose');
    },
    switchRaise(dt){
      if (dt) {
        this.rasieTitle = '百分比调价';
      } else {
        this.rasieTitle = '调价';
      }
    },
    priceRaise() {
      this.$refs.raisePriceForm.validate((valid)=>{
        if (valid) {
          let params = [];
          if (this.raisePriceForm.priceOrPercent) {
            if (!(this.raisePriceForm.percent > 0 && this.raisePriceForm.percent < 100)) {
              this.$message({
                message: '百分比在0~100之间！',
                type: 'warning'
              });
              return
            }
            for (let i = 0; i < this.distributionGoodsList.length; i++) {
              for (let j = 0; j < this.raisePriceForm.ids.length; j++) {
                if (this.distributionGoodsList[i].id == this.raisePriceForm.ids[j].goodsId) {
                  let obj = {
                    merchantId: this.raisePriceForm.ids[j].merchantId,
                    goodsId: this.raisePriceForm.ids[j].goodsId,
                    raisePrice: (Number(this.distributionGoodsList[i].price) * (this.raisePriceForm.percent/100)).toFixed(2)
                  };
                  params.push(obj);
                }
              }
            }
          } else {
            for (let i = 0; i < this.raisePriceForm.ids.length; i++) {
              let obj = {
                merchantId: this.raisePriceForm.ids[i].merchantId,
                goodsId: this.raisePriceForm.ids[i].goodsId,
                raisePrice: this.raisePriceForm.raisePrice
              };
              params.push(obj);
            }
          }
          raisePrice(params).then((res) => {
            if (res.code == 20000) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.showBatchPrice = false;
              this.raisePriceForm = {
                priceOrPercent: false,
                percent: '',
                raisePrice: '',
                ids:[]
              };
              this.getDistbutionGoods(this.currentPage2, this.pagesize2);
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
      this.showBatchPrice = true;
      let obj = {
        merchantId: dt.merchantId,
        goodsId: dt.id
      };
      this.raisePriceForm.ids.push(obj);
    },
    batchRaisePrice() {
      if (this.raisePriceForm.ids.length == 0){
        this.$message({
          message: '请选择商品修改！',
          type: 'error'
        });
      } else {
        this.showBatchPrice = true;
      }
    },
    batchDelete() {
      if (this.batchMove.length == 0) {
        this.$message({
          message: '请选择要删除的商品！',
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
              that.getDistbutionGoods(that.currentPage2, that.pagesize2);
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
              that.getDistbutionGoods(that.currentPage2, that.pagesize2);
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](function() {});
      })['catch'](() => {});
    },
    filterClassifyNode(value, data) {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    filterClassifyNode2(value, data) {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    //每页显示数据量变更
    handleSizeChange(val) {
      // this.pagesize = val;
      if(this.pagesize == ''){
        this.pagesize = 15;
      }
      this.getSupplyGoods(this.currentPage, this.pagesize);
    },
    //页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getSupplyGoods(this.currentPage, this.pagesize);
    },
    //每页显示数据量变更
    handleSizeChange2(val) {
      // this.pagesize2 = val;
      if(this.pagesize2 == ''){
        this.pagesize2 = 15;
      }
      this.getDistbutionGoods(this.currentPage2, this.pagesize2);
    },
    //页码变更
    handleCurrentChange2(val) {
      this.currentPage2 = val;
      this.getDistbutionGoods(this.currentPage2, this.pagesize2);
    },
    seleChange(val) {
      this.saveGoodsList = [];
      this.saveGoodsList = val;
    },
    seleChangeAll(val) {
      this.saveGoodsList = [];
      this.saveGoodsList = val;
    },
    getClassify() {
      let that = this;
      let params = new URLSearchParams();
      params.append('merchantId', this.chooseSupplier.id);
      classifyTree2(params).then(res => {
        if (res.code === 20000) {
          that.classifyTreeList = res.data;
          let obj = {
            children: [],
            id: '',
            parentId: 0,
            name: that.$t('common.allClassify')
          };
          that.classifyTreeList.unshift(obj);
          if (that.classifyTreeList.length > 0) {
            for (let i = 0; i < that.classifyTreeList.length; i++) {
              Vue.set(that.classifyTreeList[i], 'checked', false);
              if (!that.classifyTreeList[i].id) {
                Vue.set(that.classifyTreeList[i], 'checked', true);
              }
              that.classifyTreeList[i].children.forEach(item => {
                item.children = '';
                Vue.set(item, 'checked', false);
              });
            }
          }
          that.$nextTick(() => {
            for (let i = 0; i < that.classifyTreeList.length; i++) {
              if (!that.classifyTreeList[i].id) {
                that.$refs.tree.setCurrentKey(that.classifyTreeList[i].id);
              }
            }
          });
        }
      });
    },
    getCategory() {
      let that = this;
      var params = new URLSearchParams();
      params.append("type", 102);
      categoryTree(params).then(res => {
        if (res.code === 20000) {
          that.categoryTreeList = res.data;
          let obj = {
            children: [],
            id: '',
            parentId: 0,
            name: that.$t('common.allClassify')
          };
          that.categoryTreeList.unshift(obj);
          if (that.categoryTreeList.length > 0) {
            for (let i = 0; i < that.categoryTreeList.length; i++) {
              Vue.set(that.categoryTreeList[i], 'checked', false);
              if (!that.categoryTreeList[i].id) {
                Vue.set(that.categoryTreeList[i], 'checked', true);
              }
              that.categoryTreeList[i].children.forEach(item => {
                item.children = '';
                Vue.set(item, 'checked', false);
              });
            }
          }
          that.$nextTick(() => {
            for (let i = 0; i < that.categoryTreeList.length; i++) {
              if (!that.categoryTreeList[i].id) {
                that.$refs.tree2.setCurrentKey(that.categoryTreeList[i].id);
              }
            }
          });
        }
      });
    },
    getSupplyGoods(page, rows) {
      var that = this;
      var params = new URLSearchParams();
      params.append("page", page);
      params.append("rows", rows);
      params.append("name", this.leftValue);
      params.append("code", this.leftValue2);
      params.append('merchantId', this.chooseSupplier.id);
      params.append("parentClassifyId", this.parentClassifyId);
      params.append("childClassifyId",this.childClassifyId);
      this.loading = true;
      goodsSupplyList(params).then(function(res) {
      that.loading = false;
        if (res.code == 20000) {
          that.totalCount = res.data.total;
          that.supplyGoodsList = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      })
      .catch(function() {
        that.loading = false;
      });
    },
    filterClassifyCheck(data) {
      for (let i = 0; i < this.classifyTreeList.length; i++) {
        this.classifyTreeList[i].checked = false;
        for (let j = 0; j < this.classifyTreeList[i].children.length; j++) {
          this.classifyTreeList[i].children[j].checked = false;
        }
      }
      if (data.parentId == 0) {
        this.parentClassifyId = data.id;
        this.childClassifyId = '';
      } else {
        this.parentClassifyId = '';
        this.childClassifyId = data.id;
      }
      for (let i = 0; i < this.classifyTreeList.length; i++) {
        if (data.id == this.classifyTreeList[i].id) {
          this.classifyTreeList[i].checked = true;
          for (let j = 0; j < this.classifyTreeList[i].children.length; j++) {
            if (data.id == this.classifyTreeList[i].children[j].id) {
              this.classifyTreeList[i].children[j].checked = true;
            }
          }
        }
      }
      this.getSupplyGoods(this.currentPage, this.pagesize);
    },
    doSearch(dt) {
      this.leftValue = dt;
      this.getSupplyGoods(this.currentPage, this.pagesize);
    },
    doSearch4(dt) {
      this.leftValue2 = dt;
      this.getSupplyGoods(this.currentPage, this.pagesize);
    },
    getDistbutionGoods(page, rows) {
      var that = this;
      var params = new URLSearchParams();
      params.append("page", page);
      params.append("rows", rows);
      params.append("name", this.rightValue);
      params.append("code", this.rightValue2);
      params.append('merchantId', this.chooseSupplier.id);
      params.append('owned', true);
      params.append("parentCategoryId", this.parentCategoryId);
      params.append("childCategoryId",this.childCategoryId);
      this.loading2 = true;
      goodsDistributionList(params).then(function(res) {
        that.loading2 = false;
        if (res.code == 20000) {
          that.totalCount2 = res.data.total;
          that.distributionGoodsList = res.data.list;
        } else {
          that.$message.error(res.msg);
        }
      })
      .catch(function() {
        that.loading2 = false;
      });
    },
    filterClassifyCheck2(data) {
      for (let i = 0; i < this.categoryTreeList.length; i++) {
        this.categoryTreeList[i].checked = false;
        for (let j = 0; j < this.categoryTreeList[i].children.length; j++) {
          this.categoryTreeList[i].children[j].checked = false;
        }
      }
      if (data.parentId == 0) {
        this.parentCategoryId = data.id;
        this.childCategoryId = '';
      } else {
        this.parentCategoryId = '';
        this.childCategoryId = data.id;
      }
      for (let i = 0; i < this.categoryTreeList.length; i++) {
        if (data.id == this.categoryTreeList[i].id) {
          this.categoryTreeList[i].checked = true;
          for (let j = 0; j < this.categoryTreeList[i].children.length; j++) {
            if (data.id == this.categoryTreeList[i].children[j].id) {
              this.categoryTreeList[i].children[j].checked = true;
            }
          }
        }
      }
      this.getDistbutionGoods(this.currentPage2, this.pagesize2);
    },
    doSearch2(dt) {
      this.rightValue = dt;
      this.getDistbutionGoods(this.currentPage2, this.pagesize2);
    },
    doSearch3(dt) {
      this.rightValue2 = dt;
      this.getDistbutionGoods(this.currentPage2, this.pagesize2);
    },
    saveGoods() {
      if (!this.childCategoryId) {
        this.$message({
          message: '请选择已分销商品类目子分类！',
          type: 'warning'
        });
        return
      }
      if (this.saveGoodsList.length == 0) {
        this.$message({
          message: '请在未分销商品中选择商品！',
          type: 'warning'
        });
        return
      }
      let params = [];
      for (let i = 0; i < this.saveGoodsList.length; i++) {
        let obj = {
          goodsId: this.saveGoodsList[i].id,
          categoryId: this.childCategoryId,
          raisePrice: this.chooseSupplier.agent.raisePrice,
          raisePercent: this.chooseSupplier.agent.raisePercent
        }
        params.push(obj);
      }
      // console.log( this.saveGoodsList,params);return
      distributionGoodsAdd(params,this.chooseSupplier.id).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getSupplyGoods(this.currentPage, this.pagesize);
          this.getDistbutionGoods(this.currentPage2, this.pagesize2);
        } else {
          this.$message.error(res.msg);
        }
      })['catch']((res) => {

      });
    }
  },
  computed: {
  
  },
  watch: {
  
  },
  created() {
    this.getClassify();
    this.getCategory();
    this.getSupplyGoods(this.currentPage, this.pagesize);
    this.getDistbutionGoods(this.currentPage2, this.pagesize2);
  },
}
</script>

<style lang="scss" scoped>
  .custom-tree-node .name {
    line-height: 16px;
    font-size: 14px;
    display: inline-block;
    word-wrap: break-word;
    white-space: normal;
    vertical-align: text-top;
}
.chooseProduct {

    .cenMbox {

        // padding-top: 20px;
        .sInfo {
            .name {
                font-size: 14px;
                color: #606266;
                font-weight: bold;
                margin-left: 10px;
            }
        }

        li {
            margin-bottom: 8px;
            line-height: 24px;
            font-weight: 600;
        }

        li:hover {
            color: #0094ff;
        }

        .s1 {
            margin-bottom: 10px !important;
        }

        .s2,
        .s4 {
            .el-input {
                width: 30% !important;
            }
        }
    }
}

.cenFont {
    height: 34px;
    line-height: 34px;
    text-align: center;
    font-size: 16px;
    border-bottom: 1px solid #ebeef5;
}

.maxBoxl {
    width: 49%;
    border: 1px solid #ebeef5;
    margin: 10px 0 0 10px;
}

.maxBoxr {
    width: 49%;
    border: 1px solid #ebeef5;
    margin: 10px 10px 0 0;
}

.searchSy {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .sub {
        margin-right: 5px;
    }
}

.cenMbox {
    display: flex;
    justify-content: space-between;
}

.dishLeftSy {
    width: 30%;
    border: 1px solid #ebeef5;
    /*max-height: 800px;*/
    overflow-y: auto;
    border-left: none;
    border-right: none;

    li {
        cursor: pointer;
    }
}

.rightDishFont {
    padding-left: 15px;
}

.leftDish {
    /*max-height: 800px;*/
    width: 70%;
}

.rightDish {
    max-height: 800px;
    width: 100%;
}

.fontSy {
    color: #0094ff;
}

.fa {
    cursor: pointer;
}

.leftCount {
    line-height: 36px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.rightCount {
    line-height: 36px;
    display: flex;
    justify-content: flex-end;

    span {
        margin-right: 10px;
    }
}

.leftSearchSy {
    /*margin-left: 30%;*/
}

.sxSy {
    color: #0094ff;
    cursor: pointer;
}

.sxSsy {
    cursor: pointer;
}
</style>
