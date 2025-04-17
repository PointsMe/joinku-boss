<template>
    <div>
        <el-dialog :title="$t('common.subscServe')"
                   :visible.sync="dialogVisible"
                   :close-on-click-modal="false"
                   @close="dialogClose"
                   center
                   width="1100px">
            <div class="content">
                <div class="search">
                    <el-button type="primary" size="mini" @click="addDialog = true">{{$t('common.add')}}</el-button>
                </div>
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%"
                    max-height="420">
                    <el-table-column
                        type="index"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        prop="serviceName"
                        :label="$t('common.serveName')"
                        align="center"
                        min-width="180"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column
                        prop="serviceCode"
                        :label="$t('common.serveSerialNum')"
                        align="center"
                        width="140"
                        show-overflow-tooltip>
                    </el-table-column>
                    <el-table-column :label="$t('common.creatTime')" align="center" width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdAt | filterDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.ksrq')" align="center" width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.startDate | filterDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.jsrq')" align="center" width="120">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endDate | filterDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.zt')" align="center" width="100">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state === 100">{{ $t('common.alreadyInit') }}</span>
                            <span v-else-if="scope.row.state === 101">{{ $t('common.awaitInstall') }}</span>
                            <span v-else-if="scope.row.state === 102">{{ $t('common.normal') }}</span>
                            <span v-else-if="scope.row.state === 103">{{ $t('common.haveExpired') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        class-name="handle"
                        :label="$t('common.cz')"
                        align="center"
                        fixed="right"
                        width="150">
                        <template slot-scope="scope">
                            <!--<el-button-->
                            <!--    type="text"-->
                            <!--    size="mini"-->
                            <!--    @click="detailsHandle(scope.row.id)"-->
                            <!--&gt;{{ $t('common.detail') }}-->
                            <!--</el-button>-->
                            <el-button
                                type="text"
                                size="mini"
                                @click="renewHandle(scope.row.serviceId)"
                            >{{ $t('common.renew') }}
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="cancelHandle(scope.row.id)"
                            >{{ $t('common.annulla') }}
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
        <!-- 添加服务 -->
        <AddSubsc
            :parent-dialog="addDialog"
            :parent-id="parentId"
            @parent-update="getListData"
            @parent-close="addDialog = false"/>
        <!-- 服务详情 -->
        <SubscDetails
            :parent-dialog="detailsDialog"
            :parent-id="itemId"
            @parent-close="detailsDialog = false"/>
        <!-- 服务续费 -->
        <SubscRenew
            :parent-dialog="renewDialog"
            :merchant-id="parentId"
            :service-id="serviceId"
            @parent-update="getListData"
            @parent-close="renewDialog = false"/>
    </div>
</template>

<script>
import {
    queryMerSubServe,
    deleteMerSubServe
} from "@/api/api";
import moment from 'moment';
import AddSubsc from "@/components/merchant/merchant/AddSubsc";
import SubscDetails from "@/components/merchant/merchant/SubscDetails";
import SubscRenew from "@/components/merchant/merchant/SubscRenew";
export default {
    name: 'Subsc',
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
            tableData: [],
            itemId: '',
            serviceId: '',
            addDialog: false,
            detailsDialog: false,
            renewDialog: false
        }
    },
    created () { },
    mounted () { },
    components: {
        AddSubsc,
        SubscDetails,
        SubscRenew
    },
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
        // 获取订阅服务列表
        getListData () {
            const params = {
                merchantId: this.parentId,
                shopId: '',
                serviceId: ''
            }
            queryMerSubServe(params).then((res) => {
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
        // 详情
        detailsHandle (id) {
            this.itemId = id
            this.detailsDialog = true
        },
        // 续费
        renewHandle (id) {
            this.serviceId = id
            this.renewDialog = true
        },
        // 取消
        cancelHandle (id) {
            this.$confirm(this.$t('common.cancelSubscHint'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                deleteMerSubServe({id}).then(res => {
                    if (Number(res.code) === 20000) {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'success'
                        })
                        this.getListData()
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(err => {
                    this.$message.error(err)
                })
            }).catch(() => {})
        },
        // 关闭弹窗
        dialogClose () {
            this.$emit('parent-close')
        }
    },
}
</script>

<style scoped lang="scss">
.content{
    .search{
        width: 100%;
        height: 60px;
        text-align: right;
    }
}
</style>
