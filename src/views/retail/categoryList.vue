<template>
  <el-container style="max-width: 1920px;margin:0 auto;">
    <el-header style="height: auto; padding: 0">
      <el-row>
        <el-col :span="24" style="text-align: right">
          <!-- {{$t('common.flmc')}}：
          <el-input v-model="queryParams.name" clearable style="width: 160px;"></el-input>
          <el-button type="primary" size="mini" @click="searchFn()">{{$t('common.sousuo')}}</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="removeFn()"
            style="margin:0px"
          >{{$t('common.qk')}}</el-button> -->
          <el-button type="danger" style="margin-left:0px" size="mini" @click="addclassify('0')">{{$t('common.xz')}}</el-button>
          <el-button type="primary" size="mini" @click="showImportImage()">{{ $t('common.importPic') }}</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding: 20px 0 0 0">
      <div class="table_container">
        <el-table :data="classifyList" :height="heightDate" style="width: 100%" ref="table">
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table :data="props.row.children" style="width:100%" :show-header="false">
                <el-table-column :label="$t('common.tupian')" align="center" prop="image" width="80px">
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
                <!-- <el-table-column label="商品数量" align="center" prop="goodsCount" width="120px"></el-table-column> -->
                <el-table-column align="center" :label="$t('common.pxz')" prop="sort" width="120px"></el-table-column>
                <el-table-column align="center" :label="$t('common.sfxs')" prop="visible" width="120px">
                  <template slot-scope="scope">
                    <span>{{scope.row.visible | stateValue(shi,fou)}}</span>
                  </template>
                </el-table-column>
                <el-table-column :label="$t('common.cz')" width="400px" align="center" fixed="right">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="detailClassify(scope.row)">{{ $t('common.xg') }}</el-button>
                    <!-- <el-button type="text" size="mini" @click="transfer(scope.row)">迁移</el-button> -->
                    <el-button type="text" size="mini" @click="delClassify(scope.row.id)">{{ $t('common.sc') }}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.tupian')" align="center" prop="image" width="80px">
            <template slot-scope="scope">
              <el-image :src="scope.row.image" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
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
          <!-- <el-table-column label="商品数量" align="center" prop="goodsCount" width="120px"></el-table-column> -->
          <el-table-column align="center" :label="$t('common.pxz')" prop="sort" width="120px"></el-table-column>
          <el-table-column align="center" :label="$t('common.sfxs')" prop="visible" width="120px">
            <template slot-scope="scope">
              <span>{{scope.row.visible | stateValue(shi,fou)}}</span>
            </template>
          </el-table-column>
          <el-table-column :label="$t('common.cz')" align="center" width="400" fixed="right">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="addclassify(scope.row.id)">{{$t('common.xzzfl')}}</el-button>
              <el-button type="primary" size="mini" style="margin-left:0" @click="detailClassify(scope.row)">{{$t('common.xg')}}</el-button>
              <el-button type="primary" size="mini" style="margin-left: 0;" @click="delClassify(scope.row.id);">{{$t('common.sc')}}</el-button>
              <!-- <el-popover placement="top" width="140" v-model="scope.row.sy">
                <p>{{$t('common.sc')}}?</p>
                <div style="text-align: right; margin: 0">
                  <el-button
                    size="mini"
                    type="text"
                    @click="scope.row.sy = false"
                  >{{$t('common.qx')}}</el-button>
                  <el-button
                    type="primary"
                    size="mini"
                    @click="delClassify(scope.row.id);"
                  >{{$t('common.queding')}}</el-button>
                </div>
                <el-button type="primary" size="mini" v-if="allPerms.includes('cat-del')" slot="reference">{{$t('common.sc')}}</el-button>
              </el-popover> -->
              <!-- <el-button
                type="primary"
                size="mini"
                style="margin-left:0px"
                @click="delClassify(scope.row.id)"
              >{{$t('common.sc')}}</el-button>-->
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-main>
    <el-dialog :title="typevValue" :visible.sync="classifyFlag" width="600px" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <div class="table_container">
        <el-form ref="form" label-width="150px" :model="addForm">
          <el-row>
            <el-col :span="24">
              <el-form-item class="sInfo" label-width="120px" style="font-size: 12px" :label="$t('common.flmc')">
                <el-input size="medium" v-model="addForm.name" clearable></el-input>
              </el-form-item>
              <el-form-item class="sInfo" label-width="120px" :label="$t('common.pxz')" v-if="type!='add'">
                <el-input v-model="addForm.sort" size="medium" clearable></el-input>
              </el-form-item>
              <el-form-item class="sInfo" label-width="120px" :label="$t('common.sfxs')">
                <el-switch v-model="addForm.visible"></el-switch>
              </el-form-item>
              <el-form-item class="sInfo" label-width="120px" :label="$t('common.tupian')">
                <img class="cusp" @click="upLoad()" :src="addForm.image" alt v-if="addForm.image" style="width:50px;height:50px;cursor: pointer" />
                <i class="el-icon-plus cusp" v-else @click="upLoad()" style="width: 50px;height: 50px;line-height: 50px;border: 1px solid #ccc;border-radius: 4px;text-align: center; font-size: 20px;"></i>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="cancle()">{{$t('common.annulla')}}</el-button>
        <el-button type="primary" size="mini" @click="sure()">{{$t('common.conferma')}}</el-button>
      </span>
    </el-dialog>
    <!-- <el-dialog :title="$t('common.transferProduct')" :visible.sync="showTransfer" width="40%" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false">
      <div class="table_container">
        <div>
          {{ $t('common.jBrand') }}
          <el-cascader v-model="fromClassifyId" disabled :options="classifyList" :props="props">
          </el-cascader>
          {{ $t('common.toAll') }}
          <el-cascader v-model="toClassifyId" :options="classifyList" :props="props">
          </el-cascader>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doTransfer()">{{$t('common.queding')}}</el-button>
        <el-button type="primary" @click="cancle()">{{$t('common.qx')}}</el-button>
      </span>
    </el-dialog> -->
    <el-dialog :visible.sync="showImport" :title="$t('common.importPic')" width="620px">
      <div style="text-align: center">
        <el-upload ref="importImage" action :file-list="fileList" :limit="1" :http-request="uploadImage" :on-change="handleChangeCover">
          <el-button size="small" type="primary">{{$t('common.djxqwj')}}</el-button>
          <div slot="tip" class="el-upload__tip" style="padding-top: 20px;">
            <el-alert :title="$t('common.ts')" type="success" :closable="false"></el-alert>
            <el-alert :title="$t('common.classifyTips1')" type="success" :closable="false"></el-alert>
            <el-alert :title="$t('common.classifyTips2')" type="success" :closable="false"></el-alert>
          </div>
        </el-upload>
      </div>
    </el-dialog>
    <input type="file" accept="image/gif, image/jpeg, image/jpg, image/png, image/svg" @change="changeImage($event)" ref="avatarInput" style="display:none" />
  </el-container>
</template>
<script>
import {
  classifyTree,
  classifyCreate,
  transferClassify,
  // classifySearch,
  delClassifyList,
  classifyUpdate,
  uploadMenuImg,
  classifyImageImport
} from '@/api/api';
export default {
  name: 'classify',
  data() {
    return {
      heightDate: '42',
      shi: this.$t('common.yes'),
      fou: this.$t('common.fou'),
      typevValue: '',
      id: '',
      type: '',
      classifyFlag: false,
      classifyList: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      props: {
        label: 'name',
        children: 'children',
        value: 'id'
      },
      queryParams: {
        name: ''
      },
      addForm: {
        parentId: '',
        name: '',
        sort: '',
        image: '',
        visible: true
      },
      showTransfer: false,
      fromClassifyId: '',
      toClassifyId: '',
      showImport: false,
      fileList: [],
      file: ''
    };
  },
  mounted() {
    this.getClassifyFn();
  },
  methods: {
    // 导入图片
    showImportImage() {
      this.showImport = true;
    },
    uploadImage() {
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append('file', this.file);
      classifyImageImport(form).then(res => {
        if (res.code == 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.getClassifyFn();
          this.showImport = false;
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](function () {

      });
    },
    handleChangeCover(file) {
      this.file = file.raw;
    },
    transfer(row) {
      this.fromClassifyId = row.id;
      this.showTransfer = true;
    },
    doTransfer() {
      var params = new URLSearchParams();
      params.append('fromClassifyId', this.fromClassifyId);
      params.append('toClassifyId', this.toClassifyId[1]);
      transferClassify(params).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.showTransfer = false;
          this.getClassifyFn();
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](function () {

      });
    },
    upLoad() {
      this.$refs.avatarInput.dispatchEvent(new MouseEvent('click'));
    },
    changeImage() {
      var that = this;
      let files = that.$refs.avatarInput.files[0];
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append('image', files);
      that.$refs.avatarInput.value = null;
      uploadMenuImg(form)
        .then(res => {
          if (res.code == 20000) {
            that.$message({
              message: res.msg,
              type: 'success'
            });
            that.addForm.image = res.data.url;
          } else {
            that.$message.error(res.msg);
          }
          form = null;
        })['catch'](function () {});
    },
    removeFn() {
      this.queryParams.name = '';
      this.getClassifyFn();
    },
    getClassifyFn() {
      var that = this;
      var params = new URLSearchParams();
      params.append("type", 102);
      classifyTree(params).then(res => {
        if (res.code === 20000) {
          that.classifyList = res.data;
          if (that.classifyList.length > 0) {
            for (var i = 0; i < that.classifyList.length; i++) {
              that.classifyList[i].children.forEach(item => {
                item.children = '';
              });
            }
          }
          // 展示数据内容优化
          let lookHeight = 0;
          if (that.classifyList.length > 0) {
            if (that.$refs && that.$refs.table && that.$refs.table.$el) {
              lookHeight =
                  window.innerHeight - that.$refs.table.$el.offsetTop;
            }
          }

          that.$nextTick(() => {
            let headHeight = document.querySelectorAll('thead')[0]
              .offsetHeight;
            that.heightDate = lookHeight - headHeight - 50;
          });
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](() => {});
    },
    handleNodeClick() {},
    addclassify(id) {
      this.classifyFlag = true;
      this.type = 'add';
      this.id = id;
      if (this.id == '0') {
        this.typevValue = this.$t('common.chooseClassify')
      } else {
        this.typevValue = this.$t('common.chooseChildClas')
      }

      this.addForm = {
        parentId: '',
        name: '',
        sort: '',
        image: '',
        visible: true
      };
    },
    delClassify(id) {
      this.$confirm(this.$t('common.deleteIs') + '?', this.$t('common.ts'), {
        confirmButtonText: this.$t('common.queren'),
        cancelButtonText: this.$t('common.qx'),
        type: 'warning'
      }).then(() => {
        var that = this;
        var params = new URLSearchParams();
        params.append('id', id);
        delClassifyList(params)
          .then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.getClassifyFn();
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](() => {});
      })['catch'](() => {

      });
    },
    sure() {
      var that = this;
      if (that.type == 'add') {
        let parmas = {
          parentId: that.id,
          name: that.addForm.name,
          sort: that.addForm.sort,
          image: that.addForm.image,
          visible: that.addForm.visible,
          type:102
        };
        classifyCreate(parmas)
          .then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.classifyFlag = false;
              that.getClassifyFn();
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](() => {});
      } else if (that.type == 'up') {
        let parmas = {
          id: that.addForm.id,
          parentId: that.addForm.parentId,
          name: that.addForm.name,
          sort: that.addForm.sort,
          image: that.addForm.image,
          visible: that.addForm.visible
        };
        classifyUpdate(parmas)
          .then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.classifyFlag = false;
              that.getClassifyFn();
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](() => {});
      }
    },
    detailClassify(data) {
      this.type = 'up';
      this.typevValue = this.$t('common.edit')
      this.addForm.id = data.id;
      this.addForm.parentId = data.parentId;
      this.addForm.name = data.name;
      this.addForm.sort = data.sort;
      this.addForm.image = data.image;
      this.addForm.visible = data.visible;
      this.classifyFlag = true;
    },
    cancle() {
      var that = this;
      that.showTransfer = false;
      that.classifyFlag = false;
      that.addForm.parentId = '';
      that.addForm.name = '';
      that.addForm.sort = '';
      that.addForm.visible = false;
      that.addForm.image = '';
    }
  },
  filters: {
    stateValue(val, shi, fou) {
      return val ? shi : fou;
    }
  }
};

</script>
<style scoped lang="scss">
.th-css {
  max-width: 20%;
  text-align: center;
}

.cusp {
  cursor: pointer;
}

</style>
