<template>
    <div class="container">
        <div class="container-header">
            <div class="search">
                <div class="search-form">
                    <div class="form-item">
                        <span class="form-item-lable">{{ $t('common.serveName') }}</span>
                        <el-input v-model="search.name" size="mini" clearable></el-input>
                    </div>
                    <div class="form-item">
                        <span class="form-item-lable">{{ $t('common.serveSerialNum') }}</span>
                        <el-input v-model="search.code" size="mini" clearable></el-input>
                    </div>
                </div>
                <div class="search-handle">
                    <el-button type="primary" size="mini" @click="searchHandle()">{{$t('common.sousuo')}}</el-button>
                    <el-button type="primary" size="mini" @click="emptyHandle()">{{$t('common.qk')}}</el-button>
                    <el-button type="primary" size="mini" @click="addDialog = true">{{$t('common.add')}}</el-button>
                </div>
            </div>
        </div>
        <div class="container-main">
            <el-table
                :data="tableData"
                style="width: 100%">
                <el-table-column type="index" align="center" width="60"></el-table-column>
                <el-table-column prop="name" :label="$t('common.serveName')" align="center" min-width="180" show-overflow-tooltip></el-table-column>
                <el-table-column prop="code" :label="$t('common.serveSerialNum')" align="center" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="freeTime" :label="$t('common.trialDeadlineT')" align="center" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column prop="amount" :label="$t('common.annualFee') + '（€）'" align="center" min-width="150" show-overflow-tooltip></el-table-column>
                <el-table-column :label="$t('common.creatTime')" align="center" width="220">
                    <template slot-scope="scope">
                        <span>{{ scope.row.createdAt | filterTime }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="description" :label="$t('common.serveDesc')" align="center" min-width="180" show-overflow-tooltip></el-table-column>
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
        <!-- 添加 -->
        <Add
            :parent-dialog="addDialog"
            @parent-update="getListData()"
            @parent-close="addDialog = false"/>
        <!-- 编辑 -->
        <Edit
            :parent-dialog="editDialog"
            :parent-id="itemId"
            @parent-update="getListData()"
            @parent-close="editDialog = false"/>
    </div>
</template>

<script>
import {querySubscribableList, deleteSubscribable} from '@/api/api';
import moment from 'moment';
import Add from "@/components/merchant/subscribable/Add";
import Edit from "@/components/merchant/subscribable/Edit";

export default {
    name: 'Subscribable',
    // 组件
    components: {
        Add,
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
            currentPage: 1,
            total: 0,
            pageSize: 10,
            addDialog: false,
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
        this.getListData()
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
    .container-header{
        flex-shrink: 0;
        padding-bottom: 20px;
        .search{
            padding: 5px 20px;
            background: #FFFFFF;
            .search-form{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                .form-item{
                    height: 45px;
                    display: flex;
                    align-items: center;
                    margin-right: 20px;
                    .form-item-lable{
                        font-size: 12px;
                        margin-right: 5px;
                        flex-shrink: 0;
                    }
                    ::v-deep .el-input{
                        width: 160px;
                    }
                }
            }
            .search-handle{
                width: 100%;
                height: 45px;
                display: flex;
                align-items: center;
            }
        }
    }
    .container-main{
        flex-grow: 1;
        overflow-y: auto;
        background: #FFFFFF;
        padding: 20px;
        .pagination{
            text-align: right;
        }
    }
}
</style>
