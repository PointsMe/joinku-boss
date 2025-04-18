<template>
    <el-dialog :title="dialogTitle"
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
                <!--<el-form-item :label="$t('common.serveName')"-->
                <!--              prop="name">-->
                <!--    <el-input v-model="formData.name"-->
                <!--              autocomplete="off"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item :label="$t('common.serveSerialNum')" prop="code">
                    <el-select v-model="formData.code" :disabled="!!itemId">
                        <el-option
                            v-for="item in codeOptions"
                            :key="item.code"
                            :label="item.code"
                            :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.trialDeadlineT')" prop="freeTime">
                    <el-input v-model="formData.freeTime" autocomplete="off">
                        <template slot="append">{{ $t('common.day') }}</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.annualFee')"
                              prop="amount">
                    <el-input v-model="formData.amount" autocomplete="off">
                        <template slot="append">€</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.serveDesc')" prop="description">
                    <el-input
                        type="textarea"
                        rows="3"
                        maxlength="300"
                        v-model="formData.description"></el-input>
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
    createSubscribable,
    updateSubscribable,
    querySubscribableDetails,
    queryMerchantSubscribeNo, queryMerchantCanSubscribeNo
} from "../../../api/api";

export default {
    name: 'Edit',
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        itemId: {
            type: String,
            default: ''
        },
    },
    data () {
        const validatorInteger = (rule, value, callback) => {
            if (!value && value !== 0) {
                return callback(new Error(this.$t('common.qsrnr')));
            }
            const reg = /^[1-9]\d*$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t('common.srbhf')))
            }
        };
        let validatorFloat = (rule, value, callback) => {
            if (!value && value !== 0) {
                return callback(new Error(this.$t('common.qsrnr')));
            }
            const reg = /^(0|[1-9]\d*(\.\d+)?|0\.\d*[1-9]\d*)$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t('common.srbhf')))
            }
        };
        return {
            dialogVisible: false,
            dialogTitle: '',
            codeOptions: [],
            formData: {
                name: '',
                code: '',
                freeTime: '',
                amount: '',
                description: ''
            },
            rules: {
                // name: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }],
                code: [{ required: true, message: this.$t('common.qxz'), trigger: 'change' }],
                freeTime: [{ required: true, validator: validatorInteger, trigger: 'blur' }],
                amount: [{ required: true, validator: validatorFloat, trigger: 'blur' }]
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
            if (this.itemId) {
                this.dialogTitle = this.$t('common.editServe')
                this.getDetails()
            } else {
                this.dialogTitle = this.$t('common.addServe')
            }
            this.getCodeList()
        },
    
        // 获取详情
        getDetails () {
            let params = {
                id: this.itemId
            }
            querySubscribableDetails(params).then((res) => {
                if (Number(res.code) === 20000) {
                    let resData = res.data
                    // 使用期限
                    this.formData = {
                        name: resData.name || '',
                        code: resData.code || '',
                        freeTime: resData.freeTime || '',
                        amount: resData.amount || '',
                        description: resData.description || ''
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            });
        },
    
        // 获取编号列表
        getCodeList () {
            queryMerchantCanSubscribeNo().then((res) => {
                if (Number(res.code) === 20000) {
                    let list = res.data || []
                    if (this.itemId) {
                        this.codeOptions = list
                    } else {
                        this.codeOptions = list.filter(item => !item.selected)
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            });
        },
        
        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let name = ''
                    let currentCode = this.codeOptions.find(item => item.code === this.formData.code)
                    if (currentCode) {
                        name = currentCode.name
                    } else {
                        name = this.formData.name
                    }
                    let params = {
                        name,
                        code: this.formData.code,
                        freeTime: this.formData.freeTime,
                        amount: this.formData.amount,
                        description: this.formData.description
                    }
                    if (this.itemId) {
                        params.id = this.itemId
                        this.sendEditRequest(params)
                    } else {
                        this.sendAddRequest(params)
                    }
                } else {
                    return false
                }
            })
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 提交新增
        sendAddRequest (params) {
            this.disabled = true;
            createSubscribable(params).then((res) => {
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
        // 提交编辑
        sendEditRequest (params) {
            this.disabled = true;
            updateSubscribable(params).then((res) => {
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
