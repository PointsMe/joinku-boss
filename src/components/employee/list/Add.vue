<template>
    <el-dialog :title="$t('common.xz')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               width="600px"
               center
               custom-class="medium-dialog">
        <el-form :model="formData"
                 :rules="rules"
                 ref="ruleForm"
                 label-width="100px">
            <el-form-item :label="$t('common.sjh')" prop="phone" class="phone-form">
                <AreaCode
                    @excountry="showCode"
                    class="area"
                    :areaHeight="height"
                    :countryCode="countryCode"></AreaCode>
                <el-input v-model="formData.phone" class="talSy" @input.native="checkPhoneDebounce"></el-input>
                <i class="fa fa-check" v-show="checkPhoneStart === 1"></i>
                <i class="fa fa-close" v-show="checkPhoneStart === 2"></i>
            </el-form-item>
            <el-form-item :label="$t('common.yx')" prop="email">
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.ygxm')" prop="name">
                <el-input v-model="formData.name"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.mima')" prop="password">
                <el-input v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item :label="$t('common.qy3')" prop="enabled">
                <el-switch
                    v-model="formData.enabled"
                    active-color="#13ce66"
                    inactive-color="#ff4949"></el-switch>
            </el-form-item>
            <el-form-item :label="$t('common.jsidlb')" prop="roleIds">
                <el-select v-model="formData.roleIds" multiple :placeholder="$t('common.qxz')">
                    <el-option
                        v-for="item in roleOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
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
import AreaCode from '@/components/areaCode';
import { getRoleList, employeeLoginNameCheck, employeeCreate } from '@/api/api';
import { Debounce } from '@/utils/common.js'
export default {
    name: 'Add',
    props: {
        parentDialog: {
            type: Boolean,
            default: true
        }
    },
    components: {
        AreaCode
    },
    data () {
        return {
            dialogVisible: false,
            formData: {
                phone: '',
                email: '',
                name: '',
                password: '',
                enabled: true,
                roleIds: []
            },
            rules: {
                phone: [
                    { required: true, message: this.$t('common.qsrsjh'), trigger: 'blur' }
                ],
                name: [
                    { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
                ]
            },
            roleOptions: [],
            roleState: false,
            disabled: false,
            nums: '',
            countryCode: 'it',
            height: '28px',
            checkPhoneStart: 0   // 0未校验   1不重复   2重复
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
            if (!this.roleState) {
                this.getRoleOptions()
            }
        },
        // 获取角色列表
        getRoleOptions () {
            getRoleList().then((res) => {
                if (res.code === 20000) {
                    // 改变标记状态
                    this.roleState = true
                    this.roleOptions = res.data || []
                } else {
                    this.$message.error(res.msg);
                }
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        // 验证手机号码是否重复
        checkPhoneDebounce: Debounce(function() {
            let phone = this.nums + '-' + this.formData.phone
            let params = {
                id: '',
                account: phone
            }
            employeeLoginNameCheck(params).then(res => {
                if (res.code === 20000) {
                    if (res.data.duplicate === false) {
                        this.checkPhoneStart = 1
                    } else if (res.data.duplicate === true) {
                        this.checkPhoneStart = 2
                    } else {
                        this.checkPhoneStart = 0
                    }
                }
            })
        }, 1000),

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
            if (this.checkPhoneStart !== 1) {
                return
            }
            let phone = ''
            if (this.formData.phone) {
                phone = this.nums + '-' + this.formData.phone
            }
            let params = {
                email: this.formData.email,
                username: this.formData.name,
                password: this.formData.password,
                mobile: phone,
                enabled: this.formData.enabled,
                roleIds: this.formData.roleIds
            }
            // params = this.$qs.stringify(params)
            this.disabled = true;
            employeeCreate(params).then((res) => {
                if (res.code === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.dialogVisible = false
                    this.$emit('parent-updata')
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
        },
        /* 手机号码前缀 */
        showCode(data) {
            this.nums = data.dialCode;
            if (this.formData.phone) {
                this.checkPhoneDebounce()
            }
        },
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
