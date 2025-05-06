<template>
    <el-card :body-style="{ padding: '0px' }">
        <div style="padding: 20px 20px; min-height: 120px">
          <el-form size="mini" ref="bindForm" :model="bindForm" :rules="bindFormRules" label-width="140px;">
            <el-form-item :label="$t('common.merchantMid')" style="text-align: left;" prop="mid">
              <el-input style="width: 320px;" :placeholder="$t('common.inputMerMidHint')" v-model.trim="bindForm.mid"
                        class="input-with-select">
                <el-button slot="append" icon="el-icon-search" @click="searchPointsMeMch">{{$t('common.searchMerchant')}}</el-button>
              </el-input>
              <el-button type="primary" v-if="enableBind" @click="bindPointsMeMch">{{$t('common.binding')}}</el-button>
            </el-form-item>
            <el-alert v-if="alert.visible"
                      :title="alert.title"
                      :type="alert.type"
                      :closable="false">
            </el-alert>
          </el-form>
          <el-table
            :data="pointsMeMidList"
            v-loading="tableLoading"
            border
            size="mini"
            style="width: 100%; margin-top: 10px;">
            <el-table-column
              align="center"
              :label="$t('common.bindPoiMerMid')"
              style="width: 100%">
              <template slot-scope="scope">
                <span v-if="scope.row.target">{{scope.row.target.id}}</span>
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              align="center"
              :label="$t('common.cz')"
              width="90px">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click="unbindPointsMeMch(scope.row.id)">{{$t('common.unbind')}}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
  </template>
  <script>
    import {
      vfMerchantRelationList,
      vfMerchantRelationPrebind,
      vfLenderPointsmeBind,
      vfLenderPointsmeUntied
    } from '@/api/api';
    export default {
      name: 'MchPointsMeBind',
      components: {},
      props: {
        visible: {
          type: Boolean,
          default: false
        },
        merchantId: {
          type: Number
        },
        id: {
          type: Number
        }
      },
      data() {
        return {
          bindFormRules: {
            mid: [{required: true, message: this.$t('common.inpPoiMerId'), trigger: 'blur'}]
          },
          bindForm: {
            mid: '',
          },
          alert: {
            visible: false,
            title: '',
            type: ''
          },
          pointsMeMidList: [],
          enableBind: false,
          tableLoading: false
        }
      },
      methods: {
        loadPointsMeMidList() {
          this.tableLoading = true;
          let params = new URLSearchParams();
          params.append('merchantId', this.id);
          params.append('source', 101);
          this.pointsMeMidList = [];
          vfMerchantRelationList(params).then(resp => {
            this.tableLoading = false;
            if (resp.code === 20000) {
              this.pointsMeMidList = resp.data;
            }
          })
        },
        searchPointsMeMch() {
          const _this = this;
          this.$refs.bindForm.validate(valid => {
            if (valid) {
              let params = {
                targetId:this.bindForm.mid,
                source:101
              }
              vfMerchantRelationPrebind(params).then(resp => {
                if (resp.code === 20000) {
                  _this.alert.visible = true
                  _this.alert.type = 'success'
                  _this.alert.title = this.$t('common.merchantName') + resp.data.name
                  _this.enableBind = true
                } else {
                  _this.alert.visible = true
                  _this.alert.type = 'warning'
                  _this.alert.title = 'PointsMe' + this.$t('common.merInexis')
                  _this.enableBind = false
                }
              })
            }
          })
        },
        bindPointsMeMch() {
          let _this = this;
          let params = {
            targetId:_this.bindForm.mid,
            sourceId:_this.id,
            source:101
          }
          vfLenderPointsmeBind(params).then(resp => {
            if (resp.code === 20000) {
              _this.$message.success(this.$t('common.bindSucceed'))
              _this.enableBind = false
              _this.loadPointsMeMidList();
            } else {
              this.$message.error(resp.msg)
            }
          })
        },
        unbindPointsMeMch(id) {
          let _this = this;
          let params = {
            id:id
          }
          vfLenderPointsmeUntied(params).then(resp => {
            if (resp.code === 20000) {
              _this.$message.success(this.$t('common.unbindSucceed'))
              _this.enableBind = false
              _this.loadPointsMeMidList()
            } else {
              this.$message.error(resp.msg)
            }
          })
        },
        modalClose() {
          // 直接修改父组件的属性
          this.$emit('update:visible', false)
        }
      },
      mounted() {
        this.loadPointsMeMidList()
        this.$on('bridge', (val) => {
          this.loadPointsMeMidList()
        });
      }
    }
  </script>
  <style>
  </style>
  