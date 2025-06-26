<template>
    <div
        class="container"
        v-loading="loading"
        element-loading-text="Loading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <div class="container-head">
            <div class="search">
                <div class="search-item">
                    <el-input
                        v-model="filterText"
                        @input="handleSearch"
                        clearable
                        :placeholder="$t('common.insertClassfyName')">
                    </el-input>
                </div>
                <div class="search-handle">
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
                    ref="treeTable"
                    :key="tableKey"
                    :max-height="tableHeight"
                    style="width: 100%;"
                    row-key="id">
                    <el-table-column prop="name" :label="$t('common.flmc')" align="left">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="$t('common.cz')"
                        width="320"
                        align="right">
                        <template slot-scope="scope">
                            <el-button
                                type="text"
                                @click="editHandle(scope.row.parentId, scope.row.id)">
                                {{$t('common.xg')}}
                            </el-button>
                            <el-button
                                type="text"
                                @click="addHandle(scope.row.id)"
                                v-if="scope.row.parentId === '0'">
                                {{$t('common.xzzfl')}}
                            </el-button>
                            <el-button
                                type="text"
                                class="danger"
                                @click="deleteHandle(scope.row.id)">
                                {{$t('common.sc')}}
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <!-- 编辑 -->
        <Edit
            :showDialog="editDialog"
            :parentId="parentId"
            :itemId="itemId"
            @parent-update="getListData"
            @parent-close="editDialog = false"/>
    </div>
</template>

<script>
import {deletePlatformClassify, queryPlatformClassifyTree} from "../../api/api";
import Edit from "@/components/platform/classify/Edit";
export default {
    name: "PlatformClassify",
    // 组件
    components: {
        Edit
    },
    props: {},
    data() {
        return {
            allPerms: [],
            loading: false,
            filterText: '',
            tableHeight: 600,
            classifyTree: [],
            tableData: [],
            tableKey: 1,
            parentId: '',
            itemId: '',
            editDialog: false,
        };
    },
    // 计算属性
    computed: {
    
    },
    // 监控data中的数据变化
    watch: {
        filterText () {
            this.handleSearch();
        }
    },
    // 方法集合
    methods: {
        // 获取表格高度
        getTableHeight () {
            if (this.$refs.tableContainer) {
                const tableHeight = this.$refs.tableContainer.offsetHeight
                this.$nextTick(() => {
                    this.tableHeight = tableHeight
                });
            }
        },
    
        // 获取列表数据
        getListData() {
            this.loading = true
            queryPlatformClassifyTree({}).then(res => {
                if (res.code === 20000) {
                    this.classifyTree = res.data
                    this.handleSearch()
                } else {
                    this.$message.error(res.msg);
                }
            }).catch(error => {
                this.$message.error(error);
            }).finally(() => {
                this.loading = false
            })
        },
    
        // 当输入框内容改变时触发
        handleSearch() {
            const classifyTree = JSON.parse(JSON.stringify(this.classifyTree))
            if (!!this.filterText) {
                this.tableData = this.filterTree(this.filterText, classifyTree);
                this.tableKey++;
                this.$nextTick(() => {
                    this.$refs.treeTable.doLayout();
                });
            } else {
                this.tableData = classifyTree
                this.tableKey++;
                this.$nextTick(() => {
                    this.$refs.treeTable.doLayout();
                });
            }
        },
        // 递归过滤树形结构
        filterTree(query, treeData) {
            return treeData.filter(node => {
                // 如果节点匹配或子节点匹配，则保留该节点
                if (node.name.toLowerCase().includes(query.toLowerCase())) {
                    return true;
                }
                if (node.children && node.children.length) {
                    node.children = this.filterTree(query, node.children);
                    return node.children.length > 0;
                }
                return false;
            });
        },
    
        // 新增
        addHandle (id = '0') {
            this.parentId = id
            this.itemId = ''
            this.editDialog = true
        },
        // 编辑
        editHandle (parentId, id) {
            this.parentId = parentId
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
                deletePlatformClassify({id}).then(res => {
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
            }).catch(() => {});
        },
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
        this.allPerms = JSON.parse(localStorage.getItem('perms'));
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
div, span, p {
    box-sizing: border-box;
}

.container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
    
    .container-head {
        flex-shrink: 0;
        padding-bottom: 20px;
        
        .search {
            padding: 5px 20px;
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            background: #FFFFFF;
            
            .search-item {
                height: 45px;
                display: flex;
                align-items: center;
                margin-right: 20px;
                
                .search-item-lable {
                    font-size: 14px;
                    margin-right: 5px;
                }
                
                /deep/ .el-input {
                    width: 260px;
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
        width: 100%;
        padding: 20px;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;
        .table{
            width: 100%;
            height: 100%;
            .danger {
                color: red;
            }
        }
    }
}

</style>
