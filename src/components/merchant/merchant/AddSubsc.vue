<template>
    <el-dialog :title="$t('common.maySubscServe')"
               :visible.sync="dialogVisible"
               :close-on-click-modal="false"
               @close="dialogClose"
               center
               width="1100px">
        <div class="content">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
                max-height="480">
                <el-table-column
                    type="index"
                    width="50">
                </el-table-column>
                <el-table-column
                    prop="name"
                    :label="$t('common.serveName')"
                    align="center"
                    min-width="180"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="code"
                    :label="$t('common.serveSerialNum')"
                    align="center"
                    width="140"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    :label="$t('common.annualFee') + '€'"
                    align="center"
                    width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="freeTime"
                    :label="$t('common.trialDeadlineT')"
                    align="center"
                    width="120"
                    show-overflow-tooltip>
                </el-table-column>
                <el-table-column
                    prop="description"
                    :label="$t('common.serveDesc')"
                    align="center" min-width="260"
                    show-overflow-tooltip></el-table-column>
                <el-table-column
                    class-name="handle"
                    :label="$t('common.cz')"
                    align="center"
                    fixed="right"
                    width="90">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="mini"
                            @click="selectHandle(scope.row.id)"
                        >{{ $t('common.seleziona') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
    queryMerMayServe
} from "@/api/api";
import moment from 'moment';
import {createMerSubServe} from "../../../api/api";

export default {
    name: 'AddSubsc',
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
    data () {
        return {
            dialogVisible: false,
            tableData: []
        }
    },
    created () { },
    mounted () { },
    components: {},
    // 过滤器
    filters: {
        filterTime(val) {
            if (val) {
                return moment(val).format("YYYY-MM-DD HH:mm:ss");
            } else {
                return '-';
            }
        },
        filterDate(val) {
            if (val) {
                return moment(val).format('YYYY-MM-DD');
            } else {
                return '-';
            }
        }
    },
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
            // 获取订阅服务列表
            this.getListData()
        },
        // 获取可订阅服务列表
        getListData () {
            const params = {
                merchantId: this.parentId
            }
            queryMerMayServe(params).then((res) => {
                if (Number(res.code) === 20000) {
                    this.tableData = res.data || []
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
        // 选择
        selectHandle (id) {
            const params = {
                merchantId: this.parentId,
                serviceId: id
            }
            createMerSubServe(params).then((res) => {
                if (Number(res.code) === 20000) {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    })
                    this.$emit('parent-update')
                    this.dialogVisible = false
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
        
        // 关闭弹窗
        dialogClose () {
            this.$emit('parent-close')
        }
    },
}
</script>

<style scoped lang="scss">

</style>
