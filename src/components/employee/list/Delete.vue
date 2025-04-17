<template>
    <el-dialog :title="$t('common.ts')"
               :visible.sync="dialogVisible"
               width="600px"
               :close-on-click-modal="false"
               @close="dialogClose"
               center>
        <p class="hint-text"><i class="el-icon-warning"></i>{{$t('common.sfscgyg')}}</p>
        <div slot="footer"
             class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('common.qx') }}</el-button>
            <el-button type="primary"
                       :disabled="disabled"
                       @click="submitForm">{{ $t('common.queding') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { employeeDetele } from '@/api/api';
export default {
    name: 'Delete',
    props: {
        parentDialog: {
            type: Boolean,
            default: false
        },
        parentId: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            dialogVisible: false,
            disabled: false,
        }
    },
    computed: {},
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
        // 确定
        submitForm () {
            this.disabled = true;
            let params = {
                id: this.parentId
            }
            params = this.$qs.stringify(params)
            employeeDetele(params)
                .then((res) => {
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
            });;
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
