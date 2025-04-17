<template>
  <div class="chooseProduct">
    <el-main style="padding: 0">
      <div v-if="chooseSupplier">
        {{$t('common.selectedWhole')}}:{{chooseSupplier.name}}
      </div>
      <div class="cenMbox">
          <div class="maxBoxl">
              <div class="grid-content bg-purple">
                  <div class="cenFont">{{$t('common.plaseChoDisCla')}}</div>
                  <div style="display:flex;height: 450px;">
                      <div class="leftDish">
                          <div>
                              <el-table  :data="classifyList" height="450" row-key="id" :tree-props="{children: 'children', hasChildren: 'hasChildren'}" style="width: 100%" ref="multipleTable" @select="rowSelect" @select-all="selectAll" border size="mini" v-loading="loading">
                                  <el-table-column type="selection" :selectable='checkboxInit'></el-table-column>
                                  <el-table-column :label="$t('common.tupian')" align="center" prop="image" width="100px">
                                  <template slot-scope="scope">
                                    <el-image :src="scope.row.image + '_50x50.jpg'" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                                      <div slot="error" class="image-slot">
                                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                                        <!-- <i class="el-icon-s-goods" style="font-size: 20px;"></i> -->
                                      </div>
                                    </el-image>
                                    <!-- <img :src="scope.row.image" alt style="width:50px;height:50px" /> -->
                                  </template>
                                </el-table-column>
                                <el-table-column :label="$t('common.flmc')" align="left" prop="name"></el-table-column>
                                <el-table-column :label="$t('common.classifyNums')" align="center" prop="code" width="120px"></el-table-column>
                                <el-table-column :label="$t('common.notDistriGoodsNum')" align="center" prop="goodsCount"></el-table-column>
                              </el-table>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <div class="maxBoxr">
              <div class="grid-content bg-purple-light">
                  <div class="cenFont">{{$t('common.plaseChoTarCla')}}</div>
                  <div style="display:flex;height: 450px;">
                      <div class="leftDish">
                          <div>
                            <el-tree :data="classifyTreeList" node-key="id" ref="tree" accordion :filter-node-method="filterClassifyNode" @node-click="filterClassifyCheck" :expand-on-click-node="false" :highlight-current="true" :props="defaultProps" style="background-color: #f5f7fa; padding-top:5px;height: 450px;overflow: auto;">
                              <span class="custom-tree-node" slot-scope="{ node, data }">
                                <span class="name" :class="{'active':data.checked}">{{ data.name }}</span>
                              </span>
                            </el-tree>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <div style="margin-top:10px;text-align: center;">
        <el-button size="medium" @click="cancleChoose">{{ $t('common.qx') }}</el-button>
        <el-button type="primary" size="medium" @click="preOp">{{$t('common.lastStep')}}</el-button>
        <el-button type="primary" size="medium" @click="saveGoods">{{ $t('common.save') }}</el-button>
      </div>
  </el-main>
  </div>
</template>
<script>
import Vue from "vue";
import {
  classifyTree3,
  classifyTree,
  distributionCategory
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
      classifyList:[],
      classifyTreeList:[],
      loading: false,
      loading2: false,
      chooseCategory:'',
    }
  },
  methods: {
    preOp() {
      this.$emit('preOp');
    },
    cancleChoose() {
      this.$emit('cancleChoose');
    },
    filterClassifyNode(value, data) {
      if (!value) {
        return true;
      }
      return data.name.indexOf(value) !== -1;
    },
    filterClassifyCheck(data) {
      if (data.parentId == 0) {//父级不高亮,且保持原来值高亮
        this.$nextTick(() => {
          this.$refs.tree.setCurrentKey(null);
        });
        for (let i = 0; i < this.classifyTreeList.length; i++) {
          for (let j = 0; j < this.classifyTreeList[i].children.length; j++) {
            if (this.classifyTreeList[i].children[j].checked) {
              this.$nextTick(() => {
                this.$refs.tree.setCurrentKey(this.classifyTreeList[i].children[j].id);
              });
            }
          }
        }
        return
      } else {
        for (let i = 0; i < this.classifyTreeList.length; i++) {
          this.classifyTreeList[i].checked = false;
          for (let j = 0; j < this.classifyTreeList[i].children.length; j++) {
            this.classifyTreeList[i].children[j].checked = false;
          }
        }
        for (let i = 0; i < this.classifyTreeList.length; i++) {
          if (data.id == this.classifyTreeList[i].id) {
            this.classifyTreeList[i].checked = true;
          }
          for (let j = 0; j < this.classifyTreeList[i].children.length; j++) {
            if (data.id == this.classifyTreeList[i].children[j].id) {
              this.classifyTreeList[i].children[j].checked = true;
            }
          }
        }
        this.chooseCategory = data;
      }
    },
    saveGoods() {
      let charge = false;
      for(let i = 0; i < this.classifyList.length;i++){
        for(let j = 0; j < this.classifyList[i].children.length;j++){
          if(this.classifyList[i].children[j].checked){
            charge = true;
          }
        }
      }
      if(!charge){
        this.$message({
          message: this.$t('common.plaseChoDisCla') + '!',
          type: 'warning'
        });
        return
      }
      if (!this.chooseCategory) {
        this.$message({
          message: this.$t('common.plaseChoTarCla') + '!',
          type: 'warning'
        });
        return
      }
      let childClassifyIds = [];
      for(let i = 0; i < this.classifyList.length;i++){
        for(let j = 0; j < this.classifyList[i].children.length;j++){
          if(this.classifyList[i].children[j].checked){
            childClassifyIds.push(this.classifyList[i].children[j].id);
          }
        }
      }
      let params = {
        merchantId:this.chooseSupplier.id,
        childClassifyIds:childClassifyIds,
        parentCategoryId:this.chooseCategory.parentId,
        childCategoryId:this.chooseCategory.id,
        raisePrice: this.chooseSupplier.agent.raisePrice,
        raisePercent: this.chooseSupplier.agent.raisePercent
      };
      distributionCategory(params).then((res) => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$confirm(this.$t('common.saveSucceed'), this.$t('common.ts'), {
            confirmButtonText: this.$t('common.goOnDistri'),
            cancelButtonText: this.$t('common.closeWin'),
            showClose:false,
            closeOnClickModal:false,
            type: 'warning'
          }).then(() => {
            this.getClassifyFn();
            this.getCategoryFn();
          })['catch'](() => {
            this.$emit('cancleChoose');
          });
        } else {
          this.$message.error(res.msg);
        }
      })['catch']((res) => {

      });
    },
    rowSelect(selection, row) {
      let changeArr = []
      if (row.parentId == 0) {
        this.classifyList.map((item,index) => {
          if (row.id === item.id) {
            item.checked = !item.checked;
            this.$refs.multipleTable.toggleRowSelection(item, item.checked);
            item.children.map((itm)=>{
              if(itm.goodsCount != 0){
                itm.checked = item.checked;
                this.$refs.multipleTable.toggleRowSelection(itm, itm.checked);
              }
            })
          }
        })
      } else {
        for(let i = 0; i < this.classifyList.length;i++){
          if(row.parentId == this.classifyList[i].id){
            for(let j = 0; j < this.classifyList[i].children.length;j++){
              if(row.id == this.classifyList[i].children[j].id){
                this.classifyList[i].children[j].checked = !this.classifyList[i].children[j].checked;
                this.$refs.multipleTable.toggleRowSelection(row, this.classifyList[i].children[j].checked);
              }
            }
          }
        }
        for(let i = 0; i < this.classifyList.length;i++){
          if(row.parentId == this.classifyList[i].id){
            for(let j = 0; j < this.classifyList[i].children.length;j++){
              if(this.classifyList[i].children[j].checked){//有一个选中父级就选中
                this.classifyList[i].checked =  true;
                this.$refs.multipleTable.toggleRowSelection(this.classifyList[i],this.classifyList[i].checked);
                break
              }else{
                if(j == this.classifyList[i].children.length - 1){//都没选中 的子级，就将父级false
                  this.classifyList[i].checked =  false;
                  this.$refs.multipleTable.toggleRowSelection(this.classifyList[i],this.classifyList[i].checked);
                }
              }
            }
          }
        }
      }
    },
    selectAll(selection) {  // selection 是选中的数据集合
      // selection 是选中的数据集合
      this.$refs.multipleTable.data.map((items) => { //使用$ref获取注册的子组件信息，用data获取所有行，并用map函数遍历行
          if (items.children) {
              if (!items.checked && items.goodsCount != 0) { //若遍历出来的行未选中
                  this.$refs.multipleTable.toggleRowSelection(items, true); //行变为选中状态
                  items.checked = true; //更新标志参数
                  items.children.map((item) => { //遍历子节点并改变状态与标志参数
                    if(!item.checked && item.goodsCount != 0){
                      this.$refs.multipleTable.toggleRowSelection(item, true);
                      item.checked = true;
                    }
                  });
              } else { //选中状态同理
                  this.$refs.multipleTable.toggleRowSelection(items, false);
                  items.checked = false;
                  items.children.map((item) => {
                      this.$refs.multipleTable.toggleRowSelection(item, false);
                      item.checked = false;
                  });
              }
          }
          else{
              if (!items.checked) items.checked = true;
              else items.checked = false;
          }
      });
    },
    checkboxInit(row,index){
      if(row.goodsCount == 0){
        return false;
      }else {
        return true;
      }
    },
    getClassifyFn() {
      let that = this;
      let params = new URLSearchParams();
      params.append('merchantId', this.chooseSupplier.id);
      classifyTree3(params).then(res => {
        if (res.code === 20000) {
          that.classifyList = res.data;
          if (that.classifyList.length > 0) {
            for (let i = 0; i < that.classifyList.length; i++) {
              Vue.set(that.classifyList[i],'checked',false);
              if(that.classifyList[i].children.length > 0){
                Vue.set(that.classifyList[i],'hasChildren',false);
              }
              that.classifyList[i].children.forEach(item => {
                Vue.set(item,'checked',false);
                item.children = '';
              });
            }
          }
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](() => {});
    },
    getCategoryFn(){
      let that = this;
      let params = new URLSearchParams();
      params.append("type", 102);
      classifyTree(params).then(res => {
        if (res.code === 20000) {
          that.classifyTreeList = res.data;
          if (that.classifyTreeList.length > 0) {
            for (let i = 0; i < that.classifyTreeList.length; i++) {
              Vue.set(that.classifyTreeList[i], 'checked', false);
              that.classifyTreeList[i].children.forEach(item => {
                item.children = '';
                Vue.set(item, 'checked', false);
              });
            }
          }
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](() => {});
    },
  },
  computed: {
  
  },
  watch: {
  
  },
  created() {
    this.getClassifyFn();
    this.getCategoryFn();
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
    width: 100%;
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
