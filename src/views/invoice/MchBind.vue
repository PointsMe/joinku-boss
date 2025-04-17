<template>
    <el-dialog
      :title="$t('common.binding')"
      width="1050px"
      :visible.sync="visible"
      class="pointsme-bind-container"
      :before-close="modalClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <el-card :body-style="{ padding: '0px' }">
        <div class="contain">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane :label="$t('common.bindPoiMer')" name="first">
                    <MchPointsMeBind :merchantId="merchantId" :id="id" ref="pointsMe"></MchPointsMeBind>
                </el-tab-pane>
                <!-- <el-tab-pane :label="$t('common.bindAmyMer')" name="second">
                    <MchAmyBind :merchantId="merchantId" :id="id" ref="amy"></MchAmyBind>
                </el-tab-pane> -->
                <el-tab-pane :label="$t('common.bindJoyShop')" name="third">
                    <MchShopBind :merchantId="merchantId" :id="id" ref="shop"></MchShopBind>
                </el-tab-pane>
                <el-tab-pane :label="$t('common.bindJoyMer')" name="fourth">
                    <MchJoyingoBind :merchantId="merchantId" :id="id" ref="joyingo"></MchJoyingoBind>
                </el-tab-pane>
            </el-tabs>
        </div>
      </el-card>
      <div slot="footer" class="dialog-footer" style="text-align: center">
        <el-button size="medium" @click="modalClose" style="margin-right: 20px;">{{ $t('common.close') }}</el-button>
      </div>
    </el-dialog>
  </template>
  <script>
    import {

    } from '@/api/api';
    import MchPointsMeBind from "./MchPointsMeBind"
    import MchShopBind from "./MchShopBind"
    import MchAmyBind from "./MchAmyBind"
    import MchJoyingoBind from "./MchJoyingoBind"
    export default {
        name: 'MchBind',
        components: {
            MchPointsMeBind,
            MchShopBind,
            MchAmyBind,
            MchJoyingoBind
        },
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
                activeName:'first',
            }
        },
        methods: {
            handleClick(tab, event) {
                if(tab.name == 'first'){
                    this.$refs.pointsMe.$emit('bridge');
                }else if(tab.name == 'second'){
                    this.$refs.amy.$emit('bridge');
                }else if(tab.name == 'third'){
                    this.$refs.shop.$emit('bridge');
                }else if(tab.name == 'fourth'){
                    this.$refs.joyingo.$emit('bridge');
                }
            },
            modalClose() {
                // 直接修改父组件的属性
                this.$emit('update:visible', false)
            }
        },
        mounted() {
        
        }
    }
  </script>
  <style scoped lang="scss">
  /deep/ .el-tabs__header{
    padding: 0 10px;
  }
  </style>
  