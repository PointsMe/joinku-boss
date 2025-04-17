<template>
  <el-dialog
    :title="$t('common.packageRenew')"
    width="420px"
    top="20px"
    :visible.sync="visible"
    class="package-upgrade-container"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <!-- <el-row style="overflow-y: auto;">
      <el-col :span="8" v-for="(item, $index) in packageList" :key="$index" style="padding:5px;">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" style="text-align: center; font-weight: bold">
            <span>套餐 {{item.name}}</span>
          </div>
          <div style="padding: 20px 0;">
            <el-form ref="form">
              <el-form-item label-width="120px" label="开票张数：" style="margin-bottom: 0">
                <span style="width: 100%;display: inline-block;text-align: left;">{{item.count}}</span>
              </el-form-item>
              <el-form-item label-width="120px" label="金额：" style="margin-bottom: 0">
                <span style="width: 100%;display: inline-block;text-align: left; font-size: 16px; font-weight: bold">€ {{item.price}}</span>
              </el-form-item>
              <el-form-item style="text-align: center; margin-top: 10px;">
                <el-button type="success" size="medium" @click="renew(item)">续费</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row> -->
    <el-card :body-style="{ padding: '0px' }">
      <div slot="header" style="text-align: center; font-weight: bold">
        <span>{{$t('common.package')}} {{currentPackage.name}}</span>
      </div>
      <div style="padding: 20px 0;">
        <el-form ref="form">
          <el-form-item label-width="120px" :label="$t('common.je')+':'" style="text-align: left;margin-bottom: 0">
            <span style="width: 100%;display: inline-block;text-align: left; font-size: 16px; font-weight: bold">€ {{currentPackage.price}}</span>
          </el-form-item>
          <!-- <el-form-item label-width="120px" label="有效期：" style="text-align: left;margin-bottom: 0">
            <span>{{currentPackage.startDate}}</span>
            <span style="padding: 0 5px;"> ~ </span>
            <span>{{currentPackage.endDate}}</span>
          </el-form-item> -->
          <el-form-item label-width="120px" :label="$t('common.invoiceNum')" style="text-align: left;margin-bottom: 0">
            <span>{{currentPackage.count}}</span>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <div slot="footer" class="dialog-footer" style="text-align: center">
      <el-button size="medium" @click="modalClose" style="margin-right: 20px;">{{$t('common.annulla')}}</el-button>
      <el-button size="medium" type="primary" @click="renew">{{$t('common.conferma')}}</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import {
    packageList,
    packageRenew
  } from '@/api/api';
  export default {
    name: 'MchPackageRenew',
    components: {},
    props: {
      visible: {
        type: Boolean,
        default: false
      },
      merchantId: {
        type: Number
      }
    },
    data() {
      return {
        currentPackage: {},
        confirmDialogVisible: false,
        packageList:[]
      }
    },
    methods: {
      loadRenewPackage() {
        let params = {
          merchantId:this.merchantId
        }
        packageList(params).then(resp => {
          if (resp.code === 20000) {
            this.packageList = resp.data;
            for(let i = 0; i < resp.data.length;i++){
              if(resp.data[i].selected){
                this.currentPackage = resp.data[i];
              }
            }
          } else {
            this.$message.error(resp.msg);
          }
        })
      },
      renew(item) {
        const _this = this;
        let params = {
          merchantId: this.merchantId,
          packageId:this.currentPackage.id
        }
        packageRenew(params).then(resp => {
          if (resp.code === 20000) {
            _this.$message.success(resp.msg);
            _this.modalClose();
            _this.$emit('onSuccess')
          } else {
            _this.$message.error(resp.msg);
            _this.modalClose();
          }
        })
      },
      modalClose() {
        // 直接修改父组件的属性
        this.$emit('update:visible', false)
      }
    },
    mounted() {
      this.loadRenewPackage()
    }
  }
</script>
<style>
</style>
