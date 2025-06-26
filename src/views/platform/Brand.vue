<template>
    <div class="container">
        <div class="container-header">
            <div class="search">
                <div class="search-item">
                    <span class="label">{{ $t('common.brandName') }}:</span>
                    <el-input
                        size="mini"
                        v-model="search.name"
                        clearable
                        @change="searchHandle()">
                    </el-input>
                </div>
                <div class="search-handle">
                    <el-button type="primary" size="mini" @click="searchHandle()">{{ $t('common.sousuo') }}</el-button>
                    <el-button size="mini" @click="clearHandle()">{{ $t('common.qk') }}</el-button>
                    <el-button
                        type="primary"
                        size="mini"
                        @click="addHandle()">
                        {{ $t('common.add') }}
                    </el-button>
                </div>
            </div>
        </div>
        <div class="container-main">
            <div class="table" ref="tableContainer">
                <el-table
                    :data="tableData"
                    style="width: 100%"
                    :max-height="tableHeight">
                    <el-table-column
                        align="left"
                        min-width="200"
                        prop="supplier"
                        :label="$t('common.brandManage')">
                        <template slot-scope="scope">
                            <div class="info-cell">
                                <div class="picture">
                                    <el-image :src="cutImage(scope.row.image, 50)" fit="cover" v-if="scope.row.image">
                                        <div slot="error" class="image-slot">
                                            <img src="../../assets/images/default.png" alt="">
                                        </div>
                                    </el-image>
                                    <img src="../../assets/images/default.png" alt="" v-else>
                                </div>
                                <div class="desc">
                                    <p class="desc-text">{{ scope.row.name }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="remark"
                        align="center"
                        min-width="160"
                        :label="$t('common.bz')">
                    </el-table-column>
                    <el-table-column
                        prop="createdAt"
                        align="center"
                        width="180"
                        :label="$t('common.creatTime')">
                        <template slot-scope="scope">
                            <span>{{ scope.row.createdAt | filterTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="right"
                        width="200"
                        fixed="right"
                        :label="$t('common.cz')">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click.stop="editHandle(scope.row.id)">
                                {{ $t('common.xg') }}
                            </el-button>
                            <el-button
                                type="text"
                                class="danger"
                                @click.stop="deleteHandle(scope.row.id);">
                                {{ $t('common.sc') }}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="pagination">
                <el-pagination
                    background
                    :current-page="currentPage"
                    layout="prev, pager, next, total, jumper"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
        <!-- 编辑 -->
        <Edit
            :showDialog="editDialog"
            :itemId="itemId"
            @parent-update="getListData"
            @parent-close="editDialog = false"/>
    </div>
</template>

<script>
import {queryPlatformBrandPage, deletePlatformBrand} from "../../api/api";
import Edit from "@/components/platform/brand/Edit";
export default {
    name: "PlatformBrand",
    // 组件
    components: {
        Edit
    },
    props: {},
    data() {
        return {
            allPerms: [],
            search: {
                name: '',
            },
            tableHeight: 520,
            currentPage: 1,
            total: 0,
            pageSize: 15,
            tableData: [],
            itemId: '',
            editDialog: false
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        // 裁减图片
        cutImage (url, w = 50) {
            if (!url) return ''
            let suffix = url.substring(url.lastIndexOf('.'))
            return `${url}_${w}-${suffix}`
        },
        // 获取表格高度
        getTableHeight () {
            if (this.$refs.tableContainer) {
                const tableHeight = this.$refs.tableContainer.offsetHeight
                this.$nextTick(() => {
                    this.tableHeight = tableHeight
                });
            }
        },
        // 搜索
        searchHandle () {
            this.currentPage = 1;
            this.getListData();
        },
        // 清除
        clearHandle () {
            this.search = {
                name: ''
            };
            this.currentPage = 1
            this.getListData();
        },
        //每页显示数据量变更
        handleSizeChange (val) {
            this.pageSize = val
            this.currentPage = 1
            this.getListData()
        },
        
        //页码变更
        handleCurrentChange (val) {
            this.currentPage = val;
            this.getListData();
        },
        
        // 获取列表数据
        getListData() {
            let params = {
                name: this.search.name.trim(),
                page: this.currentPage,
                size: this.pageSize
            }
            queryPlatformBrandPage(params).then(res => {
                if (res.code === 20000) {
                    this.tableData = res.data.list;
                    this.total = res.data.total;
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
                this.$message.error(err);
            })
        },
        // 新增
        addHandle () {
            this.itemId = ''
            this.editDialog = true
        },
        // 编辑
        editHandle (id) {
            this.itemId = id
            this.editDialog = true
        },
        // 删除
        deleteHandle (id) {
            this.$confirm(this.$t('common.deleteIs'), this.$t('common.ts'), {
                confirmButtonText: this.$t('common.conferma'),
                cancelButtonText: this.$t('common.annulla'),
                type: 'warning'
            }).then(() => {
                let params = {
                    id
                }
                deletePlatformBrand(params).then(res => {
                    if (res.code === 20000) {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'success'
                        })
                        // 更新列表
                        this.getListData()
                    } else {
                        this.$message({
                            showClose: true,
                            message: res.msg,
                            type: 'error'
                        })
                    }
                }).catch(error => {
                    this.$message.error(error);
                })
            }).catch(() => {
            });
        }
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
        this.allPerms = JSON.parse(localStorage.getItem('perms'));
        this.getListData();
        // 获取表格高度
        this.getTableHeight()
    },
    // 销毁之前
    beforeDestroy() {
    }
};
</script>

<style lang="scss" scoped>
div, span{
    box-sizing: border-box;
}

.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    .container-header{
        flex-shrink: 0;
        padding-bottom: 15px;
        .search{
            width: 100%;
            padding: 10px 20px;
            display: flex;
            flex-wrap: wrap;
            background-color: #fff;
            .search-item{
                height: 40px;
                margin-right: 30px;
                display: flex;
                align-items: center;
                .label{
                    font-size: 14px;
                    margin-right: 5px;
                }
                /deep/ .el-input{
                    width: 180px;
                }
                &.search-item-long{
                    .el-input{
                        width: 260px;
                    }
                }
            }
            .search-handle{
                height: 40px;
                display: flex;
                align-items: center;
            }
        }
    }
    .container-main{
        width: 100%;
        flex-grow: 1;
        padding: 10px 20px;
        background-color: #fff;
        .table{
            height: calc(100% - 60px);
            .info-cell {
                cursor: pointer;
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
                   
                    .desc-text {
                        font-size: 13px;
                        color: #606266;
                        margin-bottom: 4px;
    
                        &:last-of-type {
                            margin-bottom: 0;
                        }
                    }
                }
            }
            .danger {
                color: red;
            }
        }
        .pagination{
            width: 100%;
            height: 60px;
            display: flex;
            justify-content: flex-end;
            align-items: flex-end;
        }
    }
}
</style>
