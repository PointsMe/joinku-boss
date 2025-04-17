<template>
    <el-dialog title="" v-if="showHost" append-to-body :visible.sync="show" width="1200px" :modal="true" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div slot="title">
        {{$t('common.licence')}}
      </div>
      <div class="center">
        <el-button type="primary" @click="createLicence(101)">
            {{ $t("common.createPrimaryDev") }}
        </el-button>
        <!-- <el-button type="primary" @click="createLicence(102)">
            {{ $t("common.otherPryDev") }}
        </el-button> -->
        <!-- <div class="header-right">
            <el-button type="primary" @click="versionLogDialog = true">
                {{ $t("common.versionLog") }}
            </el-button>
            <el-button type="primary" @click="createLicence(102)">
                {{ $t("common.otherPryDev") }}
            </el-button>
        </div> -->
        <div class="productList">
            <el-table
                :data="deviceLicenceList"
                height="460"
                header-row-class-name="payTable"
                style="width: 100%"
            >
                <el-table-column
                    prop="licence"
                    :label="$t('common.licence')"
                    align="center"
                    class-name="payElColumn"
                    width="200"
                >
                    <template slot-scope="scope">
                        <div style="display: flex; justify-content: flex-end">
                            <span>{{ scope.row.licence }}</span>
                            <el-tag
                                type="primary"
                                size="medium"
                                @click="copyLicence(scope.row)"
                                style="margin-left: 10px; cursor: pointer"
                            >{{ $t("common.copy") }}
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="deviceId"
                    :label="$t('common.deviceId')"
                    align="center"
                    class-name="payElColumn"
                >
                    <template slot-scope="scope">{{ scope.row.deviceId }}</template>
                </el-table-column>
                <!-- <el-table-column
                    prop="activatedAt"
                    :label="$t('common.jihuoDate')"
                    align="center"
                    class-name="payElColumn"
                    width="130"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.activatedAt | timeChange }}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="createdAt"
                    :label="$t('common.creatTime')"
                    align="center"
                    class-name="payElColumn"
                    width="130"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.createdAt | timeChange }}</span>
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop="type"
                    :label="$t('common.vesionNum')"
                    align="center"
                    class-name="payElColumn"
                    width="100"
                >
                    <template slot-scope="scope">
                        <span>{{ scope.row.version }}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    prop="type"
                    :label="$t('common.codeType')"
                    align="center"
                    class-name="payElColumn"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-tag type="primary" size="medium" v-if="scope.row.type == 101">
                            {{ $t("common.primaryDev") }}
                        </el-tag>
                        <el-tag type="warning" size="medium" v-if="scope.row.type == 102">
                            {{ $t("common.otherPryDev") }}
                        </el-tag>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    prop="state"
                    :label="$t('common.userType')"
                    align="center"
                    class-name="payElColumn"
                    width="100"
                >
                    <template slot-scope="scope">
                        <el-tag
                            type="primary"
                            size="medium"
                            v-if="scope.row.state == 101"
                        >
                            {{ $t("common.userType1") }}
                        </el-tag>
                        <el-tag
                            type="success"
                            size="medium"
                            v-if="scope.row.state == 102"
                        >
                            {{ $t("common.userType2") }}
                        </el-tag>
                        <el-tag
                            type="warning"
                            size="medium"
                            v-if="scope.row.state == 103"
                        >
                            {{ $t("common.userType3") }}
                        </el-tag>
                        <el-tag type="info" size="medium" v-if="scope.row.state == 104">
                            {{ $t("common.doneNone") }}
                        </el-tag>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column :label="$t('common.cz')" width="160" align="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="keyInvalidHandle(scope.row.id)"
                            v-if="scope.row.state === 103"
                        >{{ $t("common.dispatch") }}
                        </el-button
                        >
                        <el-button
                            size="mini"
                            type="text"
                            @click="keyResetHandle(scope.row.id)"
                            v-if="scope.row.state !== 102"
                        >{{ $t("common.reset") }}
                        </el-button
                        >
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHost">{{$t('common.qx')}}</el-button>
        <!-- <el-button type="primary" @click="opChooseSupplier">{{$t('common.queding')}}</el-button> -->
      </span>
    </el-dialog>
  </template>
  <script>
  import {
    o2oShopHostList,
o2oShopHostCreate,
  } from '@/api/api';
  import Vue from "vue";
  var moment = require('moment');
  import { isvalidNum } from '@/utils/validate'
  export default {
    props: {
      showHost: {
        default: false
      },
      chooseItem:{
        default:''
      }
    },
    data() {
      return {
        show:true,
        // 默认数据总数
        totalCount: 0,
        // 当前页码
        currentPage: 1,
        // 默认每页数据量 €
        pagesize: 15,
        searchForm: {
          name: '',
          companyTaxNo: '',
          generalTaxNo: '',
        },
        deviceLicenceList: [],
      }
    },
    mounted() {
   
    },
    watch: {
        showHost(){
            if(this.showHost){
                this.getList();
            }
      }
    },
    components: {
      
    },
      
    methods: {
        closeHost(){
            this.$emit('closeHost');
        },
        doCreateLicence(type) {
            let params = {
                merchantId:this.chooseItem.merchantId,
                shopId:this.chooseItem.id,
                type: type,
            };
            o2oShopHostCreate(params)
                .then((res) => {
                    if (res.code == 20000) {
                        this.$message({
                            message: res.msg,
                            type: "success",
                        });
                        this.getList();
                    } else {
                        this.$message.error(res.msg);
                    }
                })
                ["catch"](() => {
            });
        },
        createLicence(type) {
            this.doCreateLicence(101);
            // if (type == 101) {
            //     let that = this;
            //     that
            //         .$confirm(this.$t("common.devTips6") + "？", this.$t("common.ts"), {
            //             confirmButtonText: this.$t("common.conferma"),
            //             cancelButtonText: this.$t("common.annulla"),
            //             type: "warning",
            //         })
            //         .then(() => {
            //             this.doCreateLicence(101);
            //         })
            //         .catch(() => {
            //         });
            // } else if (type == 102) {
            //     this.doCreateLicence(102);
            // }
        },
        copyLicence(dt) {
            let data = dt.licence;
            let input = document.createElement("input");
            input.value = data;
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            this.$message.success(this.$t("common.devTips1"));
            document.body.removeChild(input);
        },
        getList() {
            let that = this;
            let params = {
                merchantId:this.chooseItem.merchantId,
                shopId:this.chooseItem.id
            };
            o2oShopHostList(params).then((res) => {
                if (res.code == 20000) {
                    that.deviceLicenceList = res.data;
                } else {
                    that.$message.error(res.msg);
                }
            })
            .catch(function() {});
        },
    },
    filters: {
      timeChange(val) {
        if (val) {
          return moment(val).format('YYYY-MM-DD HH:mm:ss');
        } else {
          return '-';
        }
      },
      timeChange2(val) {
        if (val) {
          return moment(val).format('YYYY-MM-DD');
        } else {
          return '-';
        }
      }
    }
  };
  
  </script>
  <style lang="scss" scoped>

  </style>
  