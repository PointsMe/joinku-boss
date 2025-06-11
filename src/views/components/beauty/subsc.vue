<template>
    <el-dialog
        title=""
        v-if="showSubscribe"
        :visible.sync="show"
        width="600px"
        :modal="true"
        top="5vh"
        :close-on-click-modal="false"
        :show-close="false"
        :close-on-press-escape="false">
        <div slot="title">
            {{ $t('common.maySubscServe') }}
        </div>
        <div class="center">
            <div class="productList">
                <el-form ref="invSet" :model="subForm">
                    <!-- <el-form-item label-width="120px" :label="$t('common.enablePac')">
                        <el-switch v-model="subForm.enableTakeout" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.enableRev')">
                        <el-switch v-model="subForm.enableReservation" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.voucherTypeList[0].value')">
                        <el-switch v-model="subForm.enableInvoice" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item> -->
                    <el-form-item label-width="120px" :label="$t('common.enableTax')">
                        <el-switch v-model="subForm.enableCreditSafe" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <!-- <el-form-item label-width="120px" :label="$t('common.enableWebDistance')">
                        <el-switch v-model="subForm.enableWebDistance" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.enableCashChangePay')">
                        <el-switch v-model="subForm.enableCashChangePay" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.enablePosPay')">
                        <el-switch v-model="subForm.enablePosPay" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.webAppoint')">
                        <el-switch v-model="subForm.enableWebReservation" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.enableApplet')">
                        <el-switch v-model="subForm.enableApplet" active-color="#13ce66"
                                   inactive-color="#ff4949"></el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.dishFeature')">
                        <el-switch
                            v-model="subForm.enableFoodFeature"
                            active-color="#13ce66"
                            inactive-color="#ff4949">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.searchType')">
                        <el-select v-model="subForm.addressSearchType" size="mini">
                            <el-option v-for="item in searchTypeList" :key="item.id" :label="item.name"
                                       :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label-width="120px" :label="$t('common.customAnnualFee')">
                        <el-input v-model="subForm.annualFee" style="width: 200px;">
                            <template slot="append">€</template>
                        </el-input>
                    </el-form-item> -->
                </el-form>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
      <el-button @click="cancleUpt">{{ $t('common.qx') }}</el-button>
      <el-button type="primary" @click="doUpt">{{ $t('common.queding') }}</el-button>
    </span>
    </el-dialog>
</template>
<script>
import {
    jkbShopSubScribeUpdate
} from '@/api/api';
import Vue from "vue";

var moment = require('moment');

export default {
    props: {
        showSubscribe: {
            default: false
        },
        shopId: {
            default: ''
        },
        subscribe: {
            default: {},
        }
    },
    data() {
        return {
            show: true,
            heightDate: '42',
            // 默认数据总数
            totalCount: 0,
            // 当前页码
            currentPage: 1,
            // 默认每页数据量 €
            pagesize: 15,
            subForm: {
                // enableTakeout: false,
                // enableReservation: false,
                // enableInvoice: false,
                enableCreditSafe: false,
                // enableWebDistance: false,
                // enableCashChangePay: false,
                // enablePosPay: false,
                // enableWebReservation: false,
                // addressSearchType: '',
                // enableApplet:false,
                // annualFee: '',
                // enableFoodFeature: false,
            },
            // searchTypeList: [
            //     {
            //         id: 101,
            //         name: this.$t('common.stTip1')
            //     }, {
            //         id: 102,
            //         name: this.$t('common.stTip2')
            //     }, {
            //         id: 103,
            //         name: this.$t('common.stTip3')
            //     }
            // ],
        }
    },
    mounted() {
    
    },
    watch: {
        showSubscribe() {
            if (this.showSubscribe) {
                this.getDetail();
            }
        }
    },
    components: {},
    
    methods: {
        cancleUpt() {
            this.$emit('closeSubscribe');
        },
        getDetail() {
            this.subForm = {...this.subscribe};
        },
        doUpt() {
            let params = {
                // enableTakeout: this.subForm.enableTakeout,
                // enableReservation: this.subForm.enableReservation,
                // enableInvoice: this.subForm.enableInvoice,
                enableCreditSafe: this.subForm.enableCreditSafe,
                // enableWebDistance: this.subForm.enableWebDistance,
                // enableCashChangePay: this.subForm.enableCashChangePay,
                // enablePosPay: this.subForm.enablePosPay,
                // enableWebReservation: this.subForm.enableWebReservation || false,
                // addressSearchType: this.subForm.addressSearchType,
                // annualFee: this.subForm.annualFee || null,
                // enableApplet: this.subForm.enableApplet,
                // enableFoodFeature: this.subForm.enableFoodFeature,
                shopId: this.shopId,
            };
            jkbShopSubScribeUpdate(params).then((res) => {
                if (res.code == 20000) {
                    this.$emit('saveSubscribe');
                } else {
                    this.$message.error(res.msg);
                }
            })['catch'](function () {
            });
        },
    },
    filters: {
        timeChange(val) {
            if (val != null) {
                return moment(val).format("YYYY-MM-DD HH:mm:ss");
            }
        },
    },
};

</script>
<style lang="scss" scoped>
.supplierList {
    position: relative;
    
    .chooseIcon {
        position: absolute;
        right: 10px;
        bottom: 0px;
        font-size: 40px;
        color: green;
    }
}

</style>
