<template>
    <div class="container">
        <!--<div class="container-header">-->
        <!--    <div class="search">-->
        <!--        <div class="search-item">-->
        <!--            <span class="label">{{ $t('common.serveName') }}</span>-->
        <!--            <el-input v-model="search.name" size="mini" clearable></el-input>-->
        <!--        </div>-->
        <!--        <div class="search-item">-->
        <!--            <span class="label">{{ $t('common.serveSerialNum') }}</span>-->
        <!--            <el-input v-model="search.code" size="mini" clearable></el-input>-->
        <!--        </div>-->
        <!--        <div class="search-handle">-->
        <!--            <el-button type="primary" size="mini" @click="searchHandle()">{{$t('common.sousuo')}}</el-button>-->
        <!--            <el-button type="primary" size="mini" @click="emptyHandle()">{{$t('common.qk')}}</el-button>-->
        <!--        </div>-->
        <!--    </div>-->
        <!--</div>-->
        <div class="container-main">
            <div class="table" ref="tableContainer">
                <el-table
                    :data="tableData"
                    :max-height="tableHeight"
                    style="width: 100%">
                    <el-table-column type="index" align="center" width="60"></el-table-column>
                    <el-table-column prop="serviceName" :label="$t('common.serveName')" align="center" min-width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="merchantName" :label="$t('common.merchantName')" align="center" min-width="180" show-overflow-tooltip></el-table-column>
                    <el-table-column :label="$t('common.origin')" align="center" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.source === 101">Boss</span>
                            <span v-else-if="scope.row.source === 102">App</span>
                            <span v-else-if="scope.row.source === 103">{{ $t('common.invite') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.type')" align="center" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.type === 101">{{ $t('common.presented') }}</span>
                            <span v-else-if="scope.row.type === 102">{{ $t('common.slotCard') }}</span>
                            <span v-else-if="scope.row.type === 103">{{ $t('common.remittance') }}</span>
                            <span v-else-if="scope.row.type === 104">{{ $t('common.cash') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.jsrq')" align="center" width="150">
                        <template slot-scope="scope">
                            <span>{{ scope.row.endDate | filterDate }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="creatorName" :label="$t('common.requester')" align="center" min-width="140" show-overflow-tooltip></el-table-column>
                    <el-table-column :label="$t('common.creatTime')" align="center" width="220">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdAt | filterTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.zt')" align="center" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.state === 101">{{ $t('common.waitReview2') }}</span>
                            <span v-else-if="scope.row.state === 102">{{ $t('common.reviewPass2') }}</span>
                            <span v-else-if="scope.row.state === 103">{{ $t('common.reviewNotPass') }}</span>
                            <span v-else-if="scope.row.state === 104">{{ $t('common.annulla') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="auditorName" :label="$t('common.approver')" align="center" min-width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column prop="remark" :label="$t('common.bz')" align="center" min-width="150" show-overflow-tooltip></el-table-column>
                    <el-table-column
                        class-name="handle"
                        :label="$t('common.cz')"
                        align="center"
                        fixed="right"
                        width="220">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="mini"
                                @click="passHandle(scope.row.id)"
                                v-if="scope.row.state === 101"
                            >{{ $t('common.pass') }}
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="noPassHandle(scope.row.id)"
                                v-if="scope.row.state === 101"
                            >{{ $t('common.noPass') }}
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="cancelHandle(scope.row.id)"
                                v-if="scope.row.state === 101"
                            >{{ $t('common.annulla') }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment';
import {queryRenewApprovalList, renewApprovalCancel, renewApprovalNoPass, renewApprovalPass} from "@/api/api";

export default {
    name: 'RenewApproval',
    // 组件
    components: {
    
    },
    props: {},
    data() {
        return {
            search: {
                name: '',
                code: ''
            },
            tableData: [],
            tableHeight: 520,
            currentPage: 1,
            total: 0,
            pageSize: 15,
            detailsDialog: false,
            itemId: '',
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {},
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
    // 方法集合
    methods: {
        // 获取表格高度
        getTableHeight() {
            if (this.$refs.tableContainer) {
                const tableHeight = this.$refs.tableContainer.offsetHeight
                this.$nextTick(() => {
                    this.tableHeight = tableHeight
                });
            }
        },
        // 获取数据列表
        getListData() {
            const params = {
                // name: this.search.name,
                // code: this.search.code,
                page: this.currentPage,
                size: this.pageSize
            }
            queryRenewApprovalList(params).then(res => {
                if (Number(res.code) === 20000) {
                    this.tableData = res.data.list
                    this.total = res.data.total
                    // 检验是否列表为空
                    if (this.tableData.length === 0 && this.currentPage > 1) {
                        this.currentPage--
                        this.getListData()
                    }
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
        },
        // 搜索
        searchHandle () {
            // 当前页码初始化
            this.currentPage = 1
            // 获取列表数据
            this.getListData()
        },
        // 清空
        emptyHandle () {
            this.search = {
                name: '',
                code: ''
            }
            this.currentPage = 1
            // 获取列表数据
            this.getListData()
        },
        // 切换页码
        handleCurrentChange (page) {
            // 设置页码
            this.currentPage = page
            // 获取列表数据
            this.getListData()
        },
        // 切换显示条数
        handleSizeChange (page) {
            // 设置页码
            this.currentPage = page
        },
        // 修改
        detailsHandle (id) {
            this.itemId = id
            this.detailsDialog = true
        },
        // 通过
        passHandle (id) {
            this.$confirm(this.$t('common.appPassHint'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                renewApprovalPass({id}).then(res => {
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
        // 不通过
        noPassHandle (id) {
            this.$confirm(this.$t('common.appNoPassHint'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                renewApprovalNoPass({id}).then(res => {
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
        // 取消
        cancelHandle (id) {
            this.$confirm(this.$t('common.appCancelHint'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                renewApprovalCancel({id}).then(res => {
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
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
        this.getListData()
        // 获取表格高度
        this.getTableHeight()
    },
    // 销毁之前
    beforeDestroy() {
    }
};
</script>

<style lang="scss" scoped>
div{
    box-sizing: border-box;
}
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 20px 30px;
    
    .container-header {
        flex-shrink: 0;
        padding-bottom: 20px;
        
        .search {
            flex-shrink: 0;
            width: 100%;
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            
            .search-item {
                height: 45px;
                display: flex;
                align-items: center;
                margin-right: 30px;
                
                .label {
                    font-size: 14px;
                    margin-right: 5px;
                }
                
                /deep/ .el-input {
                    width: 160px;
                }
            }
            
            .search-handle {
                height: 45px;
                display: flex;
                align-items: center;
            }
        }
    }
    
    
    .container-main {
        flex-grow: 1;
        background: #FFFFFF;
        padding: 10px 20px;
        
        .table {
            height: calc(100% - 60px);
            
            .danger {
                color: red;
            }
        }
        
        .pagination {
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: center;
        }
    }
}
</style>
