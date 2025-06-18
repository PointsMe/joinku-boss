<template>
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               width="680px"
               top="5vh"
               custom-class="medium-dialog">
        <div class="content">
            <el-form :model="formData" ref="ruleForm" :rules="rules" label-width="120px">
                <el-form-item :label="$t('common.productName')" prop="name">
                    <el-input
                        v-model="formData.name"
                        clearable
                        maxlength="128"
                        :placeholder="$t('common.qsrnr')">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.tm')" prop="barcode">
                    <el-input
                        v-model="formData.barcode"
                        clearable
                        maxlength="32"
                        :placeholder="$t('common.qsrnr')">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.supplier')" prop="supplier">
                    <el-input
                        v-model="formData.supplier"
                        clearable
                        maxlength="128"
                        :placeholder="$t('common.qsrnr')">
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.miaoshu')" prop="description">
                    <el-input
                        type="textarea"
                        v-model="formData.description"
                        :rows="3"
                        maxlength="300"
                        show-word-limit>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$t('common.tupian')" prop="image">
                    <el-upload
                        class="avatar-uploader"
                        :show-file-list="false"
                        action=""
                        :http-request="httpRequest"
                        accept="image/jpg,image/jpeg,image/png,image/webp">
                        <img :src="formData.image" class="avatar" v-if="formData.image">
                        <div class="avatar-icon">
                            <i class="el-icon-delete" @click.stop="handleRemoveImage" v-if="formData.image"></i>
                            <i class="el-icon-plus avatar-uploader-icon" v-else></i>
                        </div>
                    </el-upload>
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
    queryPlatformAuditDetail,
    updatePlatformAudit,
    uploadImage,
} from '../../../api/api';

export default {
    name: "Edit",
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
    data() {
        return {
            dialogTitle: '',
            dialogVisible: false,
            formData: {
                name: '',
                barcode: '',
                supplier: '',
                description: '',
                image: ''
            },
            rules: {
                name: [{required: true, message: this.$t('common.qsrnr'), trigger: 'blur'}],
                barcode: [{required: true, message: this.$t('common.qsrnr'), trigger: 'blur'}],
                image: [{required: true, message: this.$t('common.qxz'), trigger: 'change'}]
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
            this.dialogTitle = this.$t('common.xg')
            this.$nextTick(() => {
                this.getDetail()
            })
        },
        // 详情
        getDetail () {
            let params = {
                id: this.itemId
            }
            queryPlatformAuditDetail(params).then(res => {
                if (res.code === 20000) {
                   this.formData = {
                       name: res.data.name,
                       barcode: res.data.barcode,
                       supplier: res.data.supplier,
                       description: res.data.description,
                       image: res.data.image
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
        /******** 图片 ********/
        httpRequest (val) {
            let formData = new FormData();
            formData.append("image", val.file);
            uploadImage(formData)
                .then(res => {
                    if (res.code === 20000) {
                        this.formData.image = res.data.url;
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(err => {
                this.$message.error(err);
            })
        },
        // 清除图片
        handleRemoveImage () {
            this.formData.image = ''
        },
        
        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let params = {
                        id: this.itemId,
                        name: this.formData.name.trim(),
                        barcode: this.formData.barcode,
                        supplier: this.formData.supplier,
                        description: this.formData.description,
                        image: this.formData.image
                    }
                    this.sendEditRequest(params)
                } else {
                    return false
                }
            })
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 提交编辑
        sendEditRequest (params) {
            this.disabled = true;
            updatePlatformAudit(params).then(res => {
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
    .avatar-uploader {
        /deep/ .el-upload {
            width: 172px;
            height: 172px;
            display: flex;
            border: 1px dashed #d9d9d9;
            border-radius: 6px;
            cursor: pointer;
            position: relative;
            overflow: hidden;
            &:hover {
                border-color: #409eff;
            }
            img {
                width: 100%;
                height: 100%;
            }
            .avatar-icon {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                i {
                    font-size: 28px;
                }
                .el-icon-delete {
                    display: none;
                    color: red;
                }
                &:hover {
                    background-color: rgba(0, 0, 0, 0.3);
                    .el-icon-delete {
                        display: inline-block;
                    }
                }
            }
        }
    }
}
</style>
