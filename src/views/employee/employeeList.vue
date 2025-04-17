<template>
    <div class="container">
        <div class="container-search">
            <div class="search-item">
                <el-input prefix-icon="el-icon-search" v-model="nowSearch.keyword" size="mini" clearable :placeholder="$t('common.qsrxmhsj')"></el-input>
            </div>
            <div class="handle">
                <el-button type="primary" size="mini" @click="searchList">{{ $t('common.sousuo') }}</el-button>
                <el-button type="primary" size="mini" @click="resetClick">{{ $t('common.qk') }}</el-button>
                <el-button type="danger" size="mini" @click="addDialog = true">{{ $t('common.add') }}</el-button>
            </div>
        </div>
        
        <div class="container-main">
            <div class="container-content">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="username" align="center" :label="$t('common.ygxm')"></el-table-column>
                    <el-table-column prop="number" align="center" :label="$t('common.code')"></el-table-column>
                    <el-table-column prop="mobile" align="center" :label="$t('common.sjh')"></el-table-column>
                    <el-table-column prop="email" align="center" :label="$t('common.yx')"></el-table-column>
                    <el-table-column align="center" :label="$t('common.role')">
                        <template slot-scope="scope">
                            <span v-for="(item, index) in scope.row.roles" :key="item.id">
                                <i v-if="index !== 0">,</i>{{ item.name }}
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="enabled" align="center" :label="$t('common.qy2')+'/'+$t('common.jy2')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.enabled">{{ $t('common.qy2') }}</span>
                            <span v-else>{{ $t('common.jy2') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" width="320" :label="$t('common.cz')" fixed="right">
                        <template slot-scope="scope" v-if="!scope.row.owner">
                            <el-button type="text" @click="editClick(scope.row.id)">{{ $t('common.xg') }}</el-button>
                            <el-button type="text" @click="passwordClick(scope.row.id)">{{$t('common.czmm') }}</el-button>
                            <el-button type="text" v-if="scope.row.enabled" @click="disabledClick(scope.row.id)">{{ $t('common.jy2') }}</el-button>
                            <el-button type="text" v-if="!scope.row.enabled" @click="enableClick(scope.row.id)">{{ $t('common.qy2') }}</el-button>
                            <el-button type="text" slot="reference" @click="deleteClick(scope.row.id);">{{ $t('common.sc') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[15, 30, 50, 100]"
                        :page-size="pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <Add :parentDialog="addDialog"
             @parent-updata="getListData"
             @parent-close="addDialog = false"/>
        <Edit :parentDialog="editDialog"
              :parentId="itemId"
              @parent-updata="getListData"
              @parent-close="editDialog = false"/>
        <Password :parentDialog="passwordDialog"
              :parentId="itemId"
              @parent-close="passwordDialog = false"/>
        <Delete :parentDialog="deleteDialog"
              :parentId="itemId"
              @parent-updata="getListData"
              @parent-close="deleteDialog = false"/>
    </div>
</template>
<script>
import Add from '@/components/employee/list/Add.vue'
import Edit from '@/components/employee/list/Edit.vue'
import Password from '@/components/employee/list/Password.vue'
import Delete from '@/components/employee/list/Delete.vue'
import {
    getGmployeeList,
    employeeDisable,
    employeeEnable
} from '@/api/api';

var moment = require('moment');
export default {
    name: 'employeeInfo',
    components: {
        Add,
        Edit,
        Password,
        Delete
    },
    data() {
        return {
            search: {
                keyword: ''
            },
            nowSearch: {
                keyword: ''
            },
            tableData: [],
            total: 0,
            currentPage: 1,
            pageSize: 15,
            addDialog: false,
            itemId: '',
            editDialog: false,
            passwordDialog: false,
            deleteDialog: false
        }
    },
    methods: {
        // 获取列表数据
        getListData () {
            let params = {
                keyword: this.search.keyword,
                page: this.currentPage,
                rows: this.pageSize
            }
            getGmployeeList(params).then(res => {
                if (res.code === 20000) {
                    const resData = res.data
                    this.tableData = resData.list
                    this.total = resData.total
                    // 检验是否列表为空
                    if (this.tableData.length === 0 && this.currentPage > 1) {
                        this.currentPage--
                        this.getListData()
                    }
                }
            });
        },
        // 查询
        searchList () {
            this.search = {
                ...this.nowSearch
            }
            // 当前页码初始化
            this.currentPage = 1
            // 获取列表数据
            this.getListData()
        },
        // 重置
        resetClick () {
            this.search = {
                keyword: ''
            }
            this.nowSearch = {
                keyword: ''
            }
            // 当前页码初始化
            this.currentPage = 1
            // 初始化页码
            this.pageSize = 10
            // 获取列表数据
            this.getListData()
        },
        // 切换单页大小
        handleSizeChange (size) {
            // 设置大小
            this.pageSize = size
            // 初始化页码
            this.currentPage = 1
            // 获取列表数据
            this.getListData()
        },
        // 点击分页
        handleCurrentChange (page) {
            this.currentPage = page
            // 获取列表数据
            this.getListData()
        },
        /* 编辑 */
        editClick (id) {
            this.itemId = id
            this.editDialog = true
        },
        /* 重置密码 */
        passwordClick (id) {
            this.itemId = id
            this.passwordDialog = true
        },
        /* 禁用 */
        disabledClick (id) {
            let params = {
                id: id
            }
            params = this.$qs.stringify(params)
            employeeDisable(params).then(res => {
                if (res.code === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.getListData()
                }
            });
        },
        /* 启用 */
        enableClick (id) {
            let params = {
                id: id
            }
            params = this.$qs.stringify(params)
            employeeEnable(params).then(res => {
                if (res.code === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.getListData()
                }
            });
        },
        /* 删除 */
        deleteClick (id) {
            this.itemId = id
            this.deleteDialog = true
        }
    },
    watch: {},
    
    mounted() {
        this.getListData()
    },
    
    filters: {
    
    }
};

</script>
<style lang="scss" scoped>
.container {
    height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    position: relative;
    
    .container-search {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        box-sizing: border-box;
        
        .search-item {
            margin-right: 30px;
            
            /deep/ .el-input {
                width: 280px;
            }
        }
        
        .handle {
        
        }
    }
    
    .container-main {
        height: 100%;
        padding: 10px 20px;
        background: #FFFFFF;
        box-sizing: border-box;
        overflow-y: auto;
    }
}

</style>
