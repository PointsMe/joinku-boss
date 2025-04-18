<template>
    <el-dialog :title="$t('common.renew')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               width="600px">
        <div class="content">
            <el-form :model="formData"
                     size="mini"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="auto">
                <el-form-item :label="$t('common.type')"
                              prop="type">
                    <el-select v-model="formData.type">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.annualFee')" prop="amount">
                    <el-input v-model="formData.amount" autocomplete="off">
                        <template slot="append">€</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.jsrq')"
                              prop="endDate">
                    <el-date-picker
                        v-model="formData.endDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        :placeholder="$t('common.chooseDt')">
                    </el-date-picker>
                </el-form-item>
                <el-form-item :label="$t('common.bz')"
                              prop="remark">
                    <el-input
                        type="textarea"
                        rows="3"
                        maxlength="300"
                        v-model="formData.remark"></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer"
             class="dialog-footer">
            <el-button
                size="mini"
                @click="dialogVisible = false">{{ $t('common.annulla') }}
            </el-button>
            <el-button
                type="primary"
                size="mini"
                :disabled="disabled"
                @click="submitForm('ruleForm')">{{ $t('common.conferma') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
    merSubServeRenew
} from "@/api/api";
import moment from 'moment';

export default {
    name: 'SubscRenew',
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        merchantId: {
            type: String,
            default: true
        },
        shopId: {
            type: String,
            default: ''
        },
        serviceId: {
            type: String,
            default: true
        },
    },
    data () {
        let validatorFloat = (rule, value, callback) => {
            if (!value && value !== 0) {
                return callback(new Error(this.$t('common.qsrnr')));
            }
            const reg = /^(0\.\d*[1-9]\d*|[1-9]\d*\.\d+|[1-9]\d*)$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t('common.srbhf')))
            }
        };
        return {
            dialogVisible: false,
            typeOptions: [
                {
                    value: 101,
                    label: this.$t('common.presented')
                },
                {
                    value: 102,
                    label: this.$t('common.slotCard')
                },
                {
                    value: 103,
                    label: this.$t('common.remittance')
                },
                {
                    value: 104,
                    label: this.$t('common.cash')
                }
            ],
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now();
                }
            },
            formData: {
                type: '',
                amount: '',
                endDate: '',
                remark: ''
            },
            rules: {
                type: [{ required: true, message: this.$t('common.qxz'), trigger: 'chang' }],
                amount: [{ required: true, validator: validatorFloat, trigger: 'blur' }],
                endDate: [{ required: true, message: this.$t('common.chooseDt'), trigger: 'chang' }],
            },
            disabled: false,
        }
    },
    created () { },
    mounted () { },
    components: {},
    watch: {
        showDialog (val) {
            if (val) {
                this.initData()
            }
        },
    },
    methods: {
        // 初始化数据
        initData () {
            this.dialogVisible = true
        },
        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.sendRequest()
                } else {
                    return false
                }
            })
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 提交
        sendRequest () {
            let endDate = moment(this.formData.endDate).format('YYYY-MM-DDTHH:mm:ssZZ')
            const params = {
                merchantId: this.merchantId,
                shopId: this.shopId,
                serviceId: this.serviceId,
                type: this.formData.type,
                amount: this.formData.amount,
                endDate,
                remark: this.formData.remark
            }
            this.disabled = true;
            merSubServeRenew(params).then((res) => {
                if (Number(res.code) === 20000) {
                    this.dialogVisible = false
                    this.$emit('parent-update')
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            }).finally(() => {
                this.disabled = false;
            })
        },
        // 关闭弹窗
        dialogClose () {
            // 重置表单
            this.resetForm('ruleForm')
            this.$emit('parent-close')
        }
    },
}
</script>

<style scoped lang="scss">
/deep/ .el-form{
    .el-select{
        width: 100%;
    }
}
</style>
