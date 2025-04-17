<template>
    <el-dialog :title="$t('common.addServe')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               custom-class="medium-dialog">
        <div class="content">
            <el-form :model="formData"
                     size="mini"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="110px">
                <el-form-item :label="$t('common.serveName')"
                              prop="name">
                    <el-input v-model="formData.name"
                              autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.serveSerialNum')"
                              prop="code">
                    <el-input v-model="formData.code"
                              autocomplete="off" v-input-number></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.trialDeadlineT')"
                              prop="freeTime">
                    <el-input v-model="formData.freeTime"
                              autocomplete="off" v-input-float></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.annualFee')"
                              prop="amount">
                    <el-input v-model="formData.amount"
                              autocomplete="off" v-input-float>
                        <template slot="append">€</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.serveDesc')"
                              prop="description">
                    <el-input
                        type="textarea"
                        v-model="formData.description"
                        autocomplete="off"></el-input>
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
    createSubscribable
} from "@/api/api";

export default {
    name: 'Add',
    props: {
        parentDialog: {
            type: Boolean,
            default: true
        },
    },
    data () {
        return {
            dialogVisible: false,
            formData: {
                name: '',
                code: '',
                freeTime: '',
                amount: '',
                description: ''
            },
            rules: {
                name: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }],
                code: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }],
                freeTime: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }],
                amount: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }]
            },
            disabled: false,
        }
    },
    created () { },
    mounted () { },
    components: {},
    watch: {
        parentDialog (val) {
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
            const params = {
                name: this.formData.name.trim(),
                code: this.formData.code,
                freeTime: this.formData.freeTime,
                amount: this.formData.amount,
                description: this.formData.description.trim()
            }
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

</style>
