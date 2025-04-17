<template>
    <el-dialog :title="$t('common.czmm')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               width="600px"
               center>
        <el-form :model="formData"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px">
            <el-form-item :label="$t('common.mima')" prop="password">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer"
             class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('common.qx') }}</el-button>
            <el-button type="primary"
                       :disabled="disabled"
                       @click="submitForm('ruleForm')">{{ $t('common.queding') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>

import { employeePasswordReset } from '@/api/api';
export default {
    name: 'Password',
    props: {
        parentDialog: {
            type: Boolean,
            default: true
        },
        parentId: {
            type: String,
            default: ''
        }
    },
    components: {
    
    },
    data () {
        return {
            dialogVisible: false,
            formData: {
                password: ''
            },
            rules: {
                password: [
                    { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
                ]
            },
            disabled: false
        }
    },
    created () { },
    mounted () { },
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
            let params = {
                id: this.parentId,
                password: this.formData.password
            }
            params = this.$qs.stringify(params)
            this.disabled = true;
            employeePasswordReset(params).then((res) => {
                if (res.code === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.dialogVisible = false
                } else {
                    this.$message({
                        showClose: true,
                        message: res.message,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            }).finally(() => {
                this.disabled = false;
            });
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
    .phone-form{
        /deep/ .el-form-item__content{
            display: flex;
            .el-input{
                width: 80%;
            }
            .fa{
                margin-left: 20px;
                margin-top: 5px;
                font-size: 18px;
                &.fa-check {
                    color: green;
                }
                &.fa-close{
                    color: #F56C6C;
                }
            }
        }
    }
</style>
