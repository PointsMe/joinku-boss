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
                <el-form-item :label="$t('common.type')" prop="type">
                    <el-select v-model="formData.type">
                        <el-option
                            v-for="item in typeOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('common.vesionNum')" prop="version">
                    <el-input v-model="formData.version" :placeholder="$t('common.suchVersion')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.forceUpdate')" prop="forcible">
                    <el-switch
                        v-model="formData.forcible"
                        active-color="#328969"
                        inactive-color="#DCDCDC">
                    </el-switch>
                </el-form-item>
                <el-form-item :label="$t('common.updateContent')" prop="description">
                    <el-input
                        type="textarea"
                        rows="3"
                        maxlength="300"
                        v-model="formData.description"></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.uploadFile')" prop="downloadUrl">
                    <el-upload
                        class="upload-file"
                        action=""
                        :http-request="httpRequest"
                        :file-list="fileList"
                        :multiple="false">
                        <el-button type="primary">{{$t('common.choiceFile')}}</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="Latest" prop="descFileUrl" key="descFileUrl" v-if="formData.type === 102">
                    <el-upload
                        class="upload-file"
                        action=""
                        :http-request="descHttpRequest"
                        :file-list="fileList1"
                        :multiple="false">
                        <el-button type="primary">{{$t('common.choiceFile')}}</el-button>
                    </el-upload>
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
    uploadFile,
    createShopUpgrade,
    updateShopUpgrade,
    queryShopUpgradeDetail
} from "../../../api/api";
import moment from "moment";

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
        let validatorVersion = (rule, value, callback) => {
            if (!value && value !== 0) {
                return callback(new Error(this.$t('common.qsrnr')));
            }
            const reg = /^\d+\.\d+\.\d+$/
            if (reg.test(value)) {
                callback()
            } else {
                callback(new Error(this.$t('common.srbhf')))
            }
        };
        return {
            dialogVisible: false,
            dialogTitle: '',
            typeOptions: [
                {
                    label: this.$t('common.serverSide'),
                    value: 101
                },
                {
                    label: this.$t('common.clientSide'),
                    value: 102
                }
            ],
            formData: {
                type: '',
                version: '',
                forcible: false,
                description: '',
                filename: '',
                downloadUrl: '',
                checksum: '',
                descFileUrl: ''
            },
            fileList: [],
            fileList1: [],
            rules: {
                type: [{ required: true, message: this.$t('common.qxz'), trigger: 'change' }],
                version: [{ required: true, validator: validatorVersion, trigger: 'blur' }],
                forcible: [{ required: true, message: this.$t('common.qxz'), trigger: 'change' }],
                description: [{ required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }],
                downloadUrl: [{ required: true, message: this.$t('common.qxz'), trigger: 'change' }],
                descFileUrl: [{ required: true, message: this.$t('common.qxz'), trigger: 'change' }],
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
        }
    },
    methods: {
        // 初始化数据
        initData () {
            this.dialogVisible = true
            this.fileList = []
            this.fileList1 = []
            if (this.itemId) {
                this.dialogTitle = this.$t('common.edit')
                this.getDetails()
            } else {
                this.dialogTitle = this.$t('common.xz')
            }
        },
    
        // 获取详情
        getDetails () {
            let params = {
                id: this.itemId
            }
            queryShopUpgradeDetail(params).then((res) => {
                if (Number(res.code) === 20000) {
                    let resData = res.data
                    let version = resData.version ? this.convertVersion(resData.version) : ''
                    this.formData = {
                        type: resData.type,
                        version,
                        forcible: resData.forcible,
                        description: resData.description,
                        filename: resData.filename,
                        downloadUrl: resData.downloadUrl,
                        checksum: resData.checksum,
                        descFileUrl: resData.descFileUrl || ''
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
        // 字符串转数组
        convertVersion(strNum) {
            const str = String(strNum);
            const padded = str.padStart(5, '0'); // 确保至少有5位
            const len = padded.length;
            // 获取后两个两位数
            const last4 = padded.slice(-4);
            const lastTwo1 = last4.slice(0, 2);
            const lastTwo2 = last4.slice(2, 4);
            // 剩下的作为第一个元素（如果为空就为 '0'）
            const firstPart = padded.slice(0, len - 4) || '0';
            return `${Number(firstPart)}.${Number(lastTwo1)}.${Number(lastTwo2)}`
        },
    
        // 导入
        httpRequest (val) {
            let formData = new FormData();
            formData.append("file", val.file);
            uploadFile(formData)
                .then(res => {
                    if (res.code === 20000) {
                        this.formData.filename = res.data.filename
                        this.formData.downloadUrl = res.data.url
                        this.formData.checksum = res.data.md5
                        this.$refs.ruleForm.clearValidate(['downloadUrl'])
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        })
                        this.fileList = []
                    }
                }).catch(err => {
                this.$message.error(err);
                this.fileList = []
            })
        },
        descHttpRequest(val) {
            let formData = new FormData();
            formData.append("file", val.file);
            uploadFile(formData)
                .then(res => {
                    if (res.code === 20000) {
                        this.formData.descFileUrl = res.data.url
                        this.$refs.ruleForm.clearValidate(['descFileUrl'])
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        })
                        this.fileList1 = []
                    }
                }).catch(err => {
                this.$message.error(err);
                this.fileList1 = []
            })
        },

        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let versionArr = this.formData.version.split('.')
                    let version = versionArr[0] + versionArr[1].padStart(2, '0') + versionArr[2].padStart(2, '0')
                    const descFileUrl = this.formData.type === 102 ? this.formData.descFileUrl : ''
                    let params = {
                        type: this.formData.type,
                        version,
                        forcible: this.formData.forcible,
                        description: this.formData.description,
                        filename: this.formData.filename,
                        downloadUrl: this.formData.downloadUrl,
                        checksum: this.formData.checksum,
                        descFileUrl,
                        releasedAt: moment().format('YYYY-MM-DDTHH:mm:ssZZ')
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
            createShopUpgrade(params).then((res) => {
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
            updateShopUpgrade(params).then((res) => {
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
