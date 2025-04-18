<template>
    <el-dialog :title="$t('common.serveDetails')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               custom-class="medium-dialog">
        <div class="content">
            <el-form :model="formData"
                     size="mini"
                     label-width="110px">
                <el-form-item :label="$t('common.serveName')">
                    <el-input v-model="formData.serviceName" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.serveSerialNum')">
                    <el-input v-model="formData.serviceCode" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.creatTime')">
                    <el-input v-model="formData.createdAt" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.ksrq')">
                    <el-input v-model="formData.startDate" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.jsrq')">
                    <el-input v-model="formData.endDate" disabled></el-input>
                </el-form-item>
                <el-form-item :label="$t('common.zt')">
                    <el-input v-model="formData.state" disabled></el-input>
                </el-form-item>
            </el-form>
        </div>
        <div slot="footer"
             class="dialog-footer">
            <el-button
                size="mini"
                @click="dialogVisible = false">{{ $t('common.close') }}
            </el-button>
        </div>
    </el-dialog>
</template>

<script>
import {
    queryMerSubServeDetails
} from "@/api/api";
import moment from 'moment';

export default {
    name: 'SubscDetails',
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        serviceId: {
            type: String,
            default: ''
        },
    },
    data () {
        return {
            dialogVisible: false,
            formData: {
                serviceName: '',
                serviceCode: '',
                createdAt: '',
                startDate: '',
                endDate: '',
                state: ''
            }
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
            this.getDetails()
        },
        // 获取详情
        getDetails () {
            const params = {
                id: this.serviceId
            }
            queryMerSubServeDetails(params).then((res) => {
                if (Number(res.code) === 20000) {
                    const resData = res.data
                    let state = ''
                    switch (resData.state) {
                        case 100:
                            state = this.$t('common.alreadyInit')
                            break;
                        case 101:
                            state = this.$t('common.awaitInstall')
                            break;
                        case 102:
                            state = this.$t('common.normal')
                            break;
                        case 103:
                            state = this.$t('common.haveExpired')
                            break;
                    }
                    this.formData = {
                        serviceName: resData.serviceName,
                        serviceCode: resData.serviceCode,
                        createdAt: this.formatDate(resData.createdAt),
                        startDate: this.formatDate(resData.startDate),
                        endDate: this.formatDate(resData.endDate),
                        state
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
            })
        },
        // 格式化时间
        formatDate (val) {
            if (val) {
                return moment(val).format("YYYY-MM-DD HH:mm:ss");
            } else {
                return '';
            }
        },
        // 关闭弹窗
        dialogClose () {
            this.$emit('parent-close')
        }
    },
}
</script>

<style scoped lang="scss">

</style>
