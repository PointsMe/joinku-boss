<template>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               width="520px"
               custom-class="medium-dialog">
        <div class="content">
            <el-form :model="formData" ref="ruleForm" :rules="rules" label-width="120px">
                <el-form-item :label="$t('common.flmc')" prop="name">
                    <el-input
                        v-model="formData.name"
                        clearable
                        maxlength="60"
                        :placeholder="$t('common.qsrnr')">
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
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
import {
    classifyCreate,
    classifyUpdate, createPlatformClassify, queryPlatformClassifyDetail, updatePlatformClassify,
} from '../../../api/api';

export default {
    name: "Edit",
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        parentId: {
            type: String,
            default: ''
        },
        itemId: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            dialogTitle: '',
            dialogVisible: false,
            formData: {
                name: '',
            },
            rules: {
                name: [{required: true, message: this.$t('common.qsrnr'), trigger: 'blur'}],
            },
            disabled: false,
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {
        showDialog (val) {
            if (val) {
                this.initData()
            }
        },
    },
    // 方法集合
    methods: {
        // 初始化数据
        initData () {
            this.dialogVisible = true
            if (this.itemId) {
                this.dialogTitle = this.$t('common.xg')
                this.$nextTick(() => {
                    this.getDetail()
                })
            } else {
                this.dialogTitle = this.$t('common.xz')
            }
        },
        // 提交新增
        getDetail () {
            let params = {
                id: this.itemId
            }
            queryPlatformClassifyDetail(params).then(res => {
                if (res.code === 20000) {
                   this.formData = {
                       name: res.data.name
                   }
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(error => {
                this.$message.error(error);
            }).finally(() => {
                this.disabled = false
            })
        },
        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        parentId: this.parentId,
                        name: this.formData.name,
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
            createPlatformClassify(params).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    this.$emit('parent-update')
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(error => {
                this.$message.error(error);
            }).finally(() => {
                this.disabled = false
            })
        },
        // 提交编辑
        sendEditRequest (params) {
            this.disabled = true;
            updatePlatformClassify(params).then(res => {
                if (res.code === 20000) {
                    this.dialogVisible = false
                    this.$emit('parent-update')
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch(error => {
                this.$message.error(error);
            }).finally(() => {
                this.disabled = false
            })
        },
        // 关闭弹窗
        dialogClose () {
            // 重置表单
            this.resetForm('ruleForm')
            this.$emit('parent-close')
        }
    },
    // 创建完成
    created() {
    
    },
    // 挂载完成
    mounted() {
    
    },
    // 销毁之前
    beforeDestroy() {
    }
};
</script>

<style lang="scss" scoped>
.content{

}
</style>
