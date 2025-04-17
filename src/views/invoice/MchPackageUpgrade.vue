<template>
  <el-dialog
    :title="$t('common.upgradePackage')"
    :visible.sync="visible"
    class="package-upgrade-container"
    width="720px"
    top="20px"
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false">
    <el-row style="overflow-y: auto;">
      <el-col :span="8" v-for="(item, $index) in packageList" :key="$index" style="padding:5px;">
        <el-card :body-style="{ padding: '0px' }">
          <div slot="header" style="text-align: center; font-weight: bold">
            <span>{{$t('common.package')}} {{item.name}}</span>
          </div>
          <div style="padding: 20px 0;">
            <el-form ref="form">
              <!-- <el-form-item label-width="120px" label="有效月份：" style="margin-bottom: 0">
                <span style="width: 100%;display: inline-block;text-align: left;">{{item.expiryMonth}}</span>
              </el-form-item> -->
              <el-form-item label-width="120px" :label="$t('common.invoiceNum')+':'" style="margin-bottom: 0">
                <span style="width: 100%;display: inline-block;text-align: left;">{{item.count}}</span>
              </el-form-item>
              <el-form-item label-width="120px" :label="$t('common.je')" style="margin-bottom: 0">
                <span style="width: 100%;display: inline-block;text-align: left; font-size: 16px; font-weight: bold">€ {{item.price}}</span>
              </el-form-item>
              <el-form-item style="text-align: center; margin-top: 10px;">
                <el-button type="success" size="medium" @click="preupgrade(item)">{{$t('common.upgrade')}}</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog
      :title="$t('common.confirmUpgrade')"
      :visible.sync="confirmDialogVisible"
      width="720px"
      append-to-body>
      <el-row>
        <el-col :span="11">
          <el-card :body-style="{ padding: '0px' }" v-if="currentPackage">
            <div slot="header" style="text-align: center; font-weight: bold">
              <span>{{$t('common.currentPackage')}}</span>
            </div>
            <div style="padding: 20px 0;">
              <el-form ref="form">
                <el-form-item style="text-align: center;margin-bottom: 0">
                  <span style="font-size: 16px; font-weight: bold" v-if="currentPackage.packageType === 101">{{$t('common.freePackage')}}</span>
                  <span style="font-size: 16px; font-weight: bold" v-else>{{$t('common.package')}} {{currentPackage.packageName}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.validMonth')" style="margin-bottom: 0">
                  <span
                    style="width: 100%;display: inline-block;text-align: left;">{{currentPackage.expiryMonth}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.invoiceNum')+':'" style="margin-bottom: 0">
                  <span
                    style="width: 100%;display: inline-block;text-align: left;">{{currentPackage.invoiceCount}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.je')+':'" style="margin-bottom: 0">
                  <span style="width: 100%;display: inline-block;text-align: left; font-size: 16px; font-weight: bold">€ {{currentPackage.price}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
        <el-col :span="2" style="text-align: center; height: 310px; line-height: 310px;" v-if="currentPackage">
          <i class="fa fa-angle-double-right fa-2x"></i>
        </el-col>
        <el-col :span="11">
          <el-card :body-style="{ padding: '0px' }">
            <div slot="header" style="text-align: center; font-weight: bold">
              <span>{{$t('common.upgradePackage')}}</span>
            </div>
            <div style="padding: 20px 0;">
              <el-form ref="form">
                <el-form-item style="text-align: center;margin-bottom: 0">
                  <span style="font-size: 16px; font-weight: bold">{{$t('common.package')}} {{newPackage.packageName}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.validMonth')" style="margin-bottom: 0">
                  <span
                    style="width: 100%;display: inline-block;text-align: left;">{{newPackage.expiryMonth}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.invoiceNum')" style="margin-bottom: 0">
                  <span
                    style="width: 100%;display: inline-block;text-align: left;">{{newPackage.invoiceCount}}</span>
                </el-form-item>
                <el-form-item label-width="120px" :label="$t('common.je')+':'" style="margin-bottom: 0">
                  <span style="width: 100%;display: inline-block;text-align: left; font-size: 16px; font-weight: bold">€ {{newPackage.price}}</span>
                </el-form-item>
              </el-form>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="medium" @click="confirmDialogVisible = false" style="margin-right: 20px;">{{$t('common.annulla')}}</el-button>
        <el-button size="medium" type="primary" @click="upgrade">{{$t('common.conferma')}}</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>
<script>
  import {
  packageList,
  lenderUpgrade
  } from '@/api/api';
  export default {
    name: 'MchPackageUpgrade',
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
        packageList: [],
        currentPackage: {},
        newPackage: {},
        diffPrice: '',
        packageId: '',
        confirmDialogVisible: false
      }
    },
    methods: {
      preupgrade(row) {
        this.packageId = row.id
        this.upgrade();
      },
      getUpgradePackageList() {
        let params = {
          merchantId: this.merchantId
        }
        packageList(params).then(resp => {
          if (resp && resp.code === 20000) {
            this.packageList = resp.data
          } else {
            this.$message.error(resp.msg)
          }
        })
      },
      upgrade() {
        let _this = this;
        let params = {
          merchantId:this.merchantId,
          packageId:this.packageId
        }
        lenderUpgrade(params).then(resp => {
          if (resp && resp.code === 20000) {
            _this.modalClose()
            _this.$emit('onSuccess')
          } else {
            _this.$message.error(resp.msg)
            _this.modalClose()
          }
        })
      },
      modalClose() {
        // 直接修改父组件的属性
        this.$emit('update:visible', false)
      }
    },
    mounted() {
      this.getUpgradePackageList()
    }
  }
</script>
<style>
  .package-upgrade-container .el-dialog__body {
    background-color: #f3f4f5;
  }
</style>
