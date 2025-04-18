<template>
    <div class="container">
        <div class="container-header">
            <div class="search">
                <div class="search-item">
                    <span class="label">{{ $t('common.serveName') }}</span>
                    <el-input v-model="search.name" size="mini" clearable></el-input>
                </div>
                <div class="search-item">
                    <span class="label">{{ $t('common.serveSerialNum') }}</span>
                    <el-input v-model="search.code" size="mini" clearable></el-input>
                </div>
                <div class="search-handle">
                    <el-button type="primary" size="mini" @click="searchHandle()">{{$t('common.sousuo')}}</el-button>
                    <el-button type="primary" size="mini" @click="emptyHandle()">{{$t('common.qk')}}</el-button>
                    <el-button type="primary" size="mini" @click="addHandle">{{$t('common.add')}}</el-button>
                </div>
            </div>
        </div>
        <div class="container-main">
            <div class="table" ref="tableContainer">
                <el-table
                    :data="tableData"
                    border
                    :max-height="tableHeight"
                    style="width: 100%">
                    <el-table-column prop="name" :label="$t('common.serveName')" align="center" min-width="180"></el-table-column>
                    <el-table-column prop="code" :label="$t('common.serveSerialNum')" align="center" width="120"></el-table-column>
                    <el-table-column prop="freeTime" :label="$t('common.trialDeadlineT')" align="center" width="120"></el-table-column>
                    <el-table-column prop="amount" :label="$t('common.annualFee') + '（€）'" align="center" width="120"></el-table-column>
                    <el-table-column prop="amount" :label="$t('common.ifMerServe')" align="center" width="150">
                        <template slot-scope="scope">
                            <span v-if="scope.row.ifMerchant">{{ $t('common.yes') }}</span>
                            <span v-else>{{ $t('common.fou') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column :label="$t('common.creatTime')" align="center" width="180">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdAt | filterTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="description" :label="$t('common.serveDesc')" align="center" min-width="180"></el-table-column>
                    <el-table-column
                        class-name="handle"
                        :label="$t('common.cz')"
                        align="center"
                        fixed="right"
                        width="180">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                size="mini"
                                @click="editHandle(scope.row.id)"
                            >{{ $t('common.xg') }}
                            </el-button>
                            <el-button
                                type="text"
                                size="mini"
                                @click="deleteHandle(scope.row.id)"
                            >{{ $t('common.sc') }}
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
        <!-- 编辑 -->
        <Edit
            :showDialog="editDialog"
            :itemId="itemId"
            @parent-update="getListData()"
            @parent-close="editDialog = false"/>
    </div>
</template>

<script>
import {querySubscribableList, deleteSubscribable} from '@/api/api';
import moment from 'moment';
import Edit from "@/components/merchant/subscribable/Edit";

export default {
    name: 'Subscribable',
    // 组件
    components: {
        Edit
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
            pageSize: 10,
            editDialog: false,
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
                name: this.search.name,
                code: this.search.code,
                page: this.currentPage,
                size: this.pageSize
            }
            querySubscribableList(params).then(res => {
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
        // 新增
        addHandle () {
            this.itemId = ''
            this.editDialog = true
        },
        // 修改
        editHandle (id) {
            this.itemId = id
            this.editDialog = true
        },
        // 删除
        deleteHandle (id) {
            this.$confirm(this.$t('common.wheDeleteServe'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                deleteSubscribable({id}).then(res => {
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
        // 获取列表数据
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
div,
span {
    box-sizing: border-box;
}

i {
    font-style: normal;
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    
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
            /deep/ .el-table{
                .custom-cell{
                    .cell{
                        overflow: visible;
                    }
                }
            }
            .info-cell {
                width: 100%;
                display: flex;
                align-items: center;
                
                .picture {
                    width: 50px;
                    height: 50px;
                    border-radius: 6px;
                    flex-shrink: 0;
                    
                    .el-image {
                        width: 100%;
                        height: 100%;
                        border-radius: 6px;
                    }
                    
                    img {
                        width: 100%;
                        height: 100%;
                        border-radius: 6px;
                        object-fit: contain;
                    }
                }
                
                .desc {
                    flex-grow: 1;
                    min-height: 100%;
                    display: flex;
                    padding-left: 10px;
                    flex-direction: column;
                    justify-content: center;
                    align-items: start;
                    
                    .el-tag {
                        margin-bottom: 6px;
                    }
                    
                    .desc-item {
                        margin-bottom: 6px;
                        
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                    
                    .desc-title {
                        font-size: 14px;
                        color: #272727;
                    }
                    
                    .desc-text {
                        font-size: 13px;
                        color: #606266;
                    }
                }
            }
            
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
