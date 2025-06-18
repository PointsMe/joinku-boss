<template>
    <div class="container">
        <div class="container-header">
            <div class="search">
                <div class="search-item">
                    <span class="label">{{ $t('common.productName') }}:</span>
                    <el-input
                        size="mini"
                        v-model="search.name"
                        clearable
                        @change="searchHandle()">
                    </el-input>
                </div>
                <div class="search-item">
                    <span class="label">{{ $t('common.spfl') }}:</span>
                    <el-cascader
                        v-model="search.classifyId"
                        :options="classifyOptions"
                        :props="cascaderProps"
                        @change="searchHandle"
                        clearable>
                    </el-cascader>
                </div>
                <div class="search-item">
                    <span class="label">{{ $t('common.brandManage') }}:</span>
                    <el-select v-model="search.brandId" clearable @change="searchHandle">
                        <el-option
                            v-for="item in brandOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="search-item">
                    <span class="label">{{ $t('common.featureState') }}:</span>
                    <el-select v-model="search.featureState" clearable @change="searchHandle">
                        <el-option
                            v-for="item in featureStateOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
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
                    <el-button
                        type="primary"
                        size="mini"
                        @click="importHandle()">
                        {{ $t('common.importProduct') }}
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
                        :label="$t('common.productInfo')">
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
                                    <p class="desc-text">{{ scope.row.barcode }}</p>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="supplier"
                        align="center"
                        width="160"
                        :label="$t('common.supplier')">
                    </el-table-column>
                    <el-table-column
                        prop="state"
                        align="center"
                        width="160"
                        :label="$t('common.featureState')">
                        <template slot-scope="scope">
                            <el-tag
                                type="danger"
                                size="small"
                                v-if="scope.row.featureState === 101">
                                {{ $t('common.unparsed') }}
                            </el-tag>
                            <el-tag
                                type="info"
                                size="small"
                                v-else-if="scope.row.featureState === 102">
                                {{ $t('common.notFeature') }}
                            </el-tag>
                            <el-tag
                                type="success"
                                size="small"
                                v-else-if="scope.row.featureState === 103">
                                {{ $t('common.hasFeature') }}
                            </el-tag>
                        </template>
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
                                @click="editHandle(scope.row.id)"
                                v-if="scope.row.state === 101">
                                {{ $t('common.xg') }}
                            </el-button>
                            <el-button
                                type="text"
                                :disabled="refreshDisabled"
                                @click="refreshFeatureHandle(scope.row.id)"
                                v-if="scope.row.featureState === 101">
                                {{ $t('common.refreshFeature') }}
                            </el-button>
                            <el-button
                                type="text"
                                class="danger"
                                @click="deleteHandle(scope.row.id);">
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
    </div>
</template>

<script>
import {
    queryPlatformProductPage,
    deletePlatformProduct,
    queryPlatformClassifyTree,
    queryPlatformBrandPage,
    refreshPlatformProductFeature
} from "../../api/api";

export default {
    name: "PlatformProduct",
    // 组件
    components: {
    
    },
    props: {},
    data() {
        return {
            allPerms: [],
            classifyOptions: [],
            cascaderProps: {
                label: 'name',
                value: 'id',
                children: 'children'
            },
            brandOptions: [],
            featureStateOptions: [
                {
                    label: this.$t('common.unparsed'),
                    value: 101
                },
                {
                    label: this.$t('common.notFeature'),
                    value: 102
                },
                {
                    label: this.$t('common.hasFeature'),
                    value: 103
                }
            ],
            search: {
                name: '',
                classifyId: [],
                brandId: '',
                featureState: ''
            },
            tableHeight: 520,
            currentPage: 1,
            total: 0,
            pageSize: 15,
            tableData: [],
            refreshDisabled: false
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
                name: '',
                barcode: '',
                state: ''
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
            let ccid = ''
            if (Array.isArray(this.search.classifyId) && this.search.classifyId.length === 2) {
                ccid = this.search.classifyId[1]
            }
            let params = {
                name: this.search.name.trim(),
                brandId: this.search.brandId,
                ccid,
                featureState: this.search.featureState,
                page: this.currentPage,
                size: this.pageSize
            }
            queryPlatformProductPage(params).then(res => {
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
    
        // 商品分类
        getClassifyTree() {
            queryPlatformClassifyTree({}).then(res => {
                if (Number(res.code) === 20000) {
                    let resData = res.data || []
                    this.classifyOptions = resData.map(item => {
                        let children = item.children.map(inItem => {
                            return {
                                ...inItem,
                                children: null
                            }
                        })
                        return {
                            ...item,
                            children
                        }
                    })
                }
            });
        },
        // 品牌列表
        getBrandList() {
            let params = {
                name: '',
                page: 1,
                size: 200
            }
            queryPlatformBrandPage(params).then(res => {
                if (res.code === 20000) {
                    this.brandOptions = res.data.list || []
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
            this.$router.push({ name: 'PlatformProductEdit' });
        },
        // 编辑
        editHandle (id) {
            this.$router.push({ name: 'PlatformProductEdit', query: { id } });
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
                deletePlatformProduct(params).then(res => {
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
        },
    
        // 刷新特性
        refreshFeatureHandle (id) {
            let params = {
                id
            }
            this.refreshDisabled = true
            refreshPlatformProductFeature(params).then(res => {
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
            }).finally(() => {
                this.refreshDisabled = false
            })
        },
    
        // 商品导入
        importHandle () {
            this.$router.push({ name: 'PlatformProductImport' });
        },
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
        this.allPerms = JSON.parse(localStorage.getItem('perms'));
        // 数据列表
        // this.getListData();
        // 获取分类树
        this.getClassifyTree()
        // 品牌列表
        this.getBrandList()
        // 获取表格高度
        this.getTableHeight()
    },
    // 进入页面
    beforeRouteEnter(to, from, next) {
        if (from.name === 'PlatformProductEdit') {
            next(vm => {
                vm.getListData()
            })
        } else {
            next(vm => {
                vm.clearHandle()
            })
        }
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
