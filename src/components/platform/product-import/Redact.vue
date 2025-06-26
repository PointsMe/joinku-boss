<template>
    <div
        class="content"
        ref="redactContent"
        v-loading="loading"
        :element-loading-text="$t('common.impotdoing')"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-tabs v-model="activeName">
            <el-tab-pane name="create">
                <span class="name" slot="label">
                    {{$t('common.xz')}} ({{ createList.length }})
                </span>
                <div class="card">
                    <div class="card-body">
                        <virtual-scroll
                            :data="createList"
                            key-prop="id"
                            :item-size="73"
                            @change="(virtualList) => createData = virtualList"
                            :virtualized="true">
                            <el-table
                                style="width: 100%;"
                                :data="createData"
                                border
                                ref="createTable"
                                row-key="id"
                                :max-height="tableHeight">
                                <el-table-column prop="barcode" align="center" min-width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span style="color: red;">*</span>{{ $t('common.tm') }}
                                    </template>
                                    <template slot-scope="scope">
                                        <div :class="{'input-error': !scope.row.barcode || scope.row.barcode.length > 32}">
                                            <el-input
                                                v-model="scope.row.barcode"
                                                :disabled="scope.row.barcodeDisabled"
                                                @change="inputChange">
                                            </el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="$t('common.productName')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.name"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="image" :label="$t('common.tupian')" align="center" width="90">
                                    <template slot-scope="scope">
                                        <el-upload
                                            class="avatar-uploader"
                                            :show-file-list="false"
                                            action=""
                                            :http-request="e => httpRequest(e, scope.row)"
                                            accept="image/jpg,image/jpeg,image/png,image/webp">
                                            <img :src="scope.row.image" class="avatar" v-if="scope.row.image">
                                            <div class="avatar-icon" v-else>
                                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                            </div>
                                        </el-upload>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="brand" :label="$t('common.brandManage')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.brand"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="supplier" :label="$t('common.supplier')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.supplier"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="pcn" :label="$t('common.parentCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.pcn"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ccn" :label="$t('common.childCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ccn"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" :label="$t('common.miaoshu')" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.description"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" :label="$t('common.cz')" fixed="right" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="text"
                                            class="danger"
                                            @click="deleteHandle(scope.row.type, scope.row.id);">
                                            {{ $t('common.sc') }}
                                        </el-button>
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="restoreToUpdate(scope.row);"
                                            v-if="scope.row.restorable">
                                            {{ $t('common.restore') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </virtual-scroll>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('common.updateDo')" name="update">
                <span class="name" slot="label">
                    {{$t('common.update')}} ({{ updateList.length }})
                </span>
                <div class="card" >
                    <div class="card-body">
                        <virtual-scroll
                            :data="updateList"
                            key-prop="id"
                            :item-size="73"
                            @change="(virtualList) => updateData = virtualList"
                            :virtualized="true">
                            <el-table
                                style="width: 100%;"
                                :data="updateData"
                                ref="updateTable"
                                border
                                row-key="id"
                                :max-height="tableHeight">
                                <el-table-column prop="barcode" align="center" min-width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span style="color: red;">*</span>{{$t('common.tm')}}
                                    </template>
                                    <template slot-scope="scope">
                                        <div :class="{'input-error': !scope.row.barcode || scope.row.barcode.length > 32}">
                                            <el-input v-model="scope.row.barcode" :disabled="scope.row.barcodeDisabled" @change="inputChange"></el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="$t('common.productName')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.name"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="image" :label="$t('common.tupian')" align="center" width="90">
                                    <template slot-scope="scope">
                                        <el-upload
                                            class="avatar-uploader"
                                            :show-file-list="false"
                                            action=""
                                            :http-request="e => httpRequest(e, scope.row)"
                                            accept="image/jpg,image/jpeg,image/png,image/webp">
                                            <img :src="scope.row.image" class="avatar" v-if="scope.row.image">
                                            <div class="avatar-icon" v-else>
                                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                            </div>
                                        </el-upload>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="brand" :label="$t('common.brandManage')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.brand"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="supplier" :label="$t('common.supplier')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.supplier"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="pcn" :label="$t('common.parentCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.pcn"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ccn" :label="$t('common.childCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ccn"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" :label="$t('common.miaoshu')" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.description"
                                            type="textarea"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" :label="$t('common.cz')" fixed="right" width="200">
                                    <template slot-scope="scope">
                                        <el-button
                                            size="mini"
                                            type="text"
                                            class="danger"
                                            @click="deleteHandle(scope.row.type, scope.row.id);">
                                            {{ $t('common.sc') }}
                                        </el-button>
                                        <el-badge :value="scope.row.duplicates.length" :max="99" v-if="scope.row.duplicates.length > 1">
                                            <el-button
                                                size="mini"
                                                type="text"
                                                @click="selectDuplicateHandle(scope.row);">
                                                {{ $t('common.chooseRule') }}
                                            </el-button>
                                        </el-badge>
                                        <el-button
                                            size="mini"
                                            type="text"
                                            @click="addToCreate(scope.row);">
                                            {{ $t('common.xz') }}
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </virtual-scroll>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane :label="$t('common.errorData')" name="error">
                <span class="name error" slot="label">
                    {{$t('common.errorData')}} ({{ errorList.length }})
                </span>
                <div class="card">
                    <div class="card-body">
                        <virtual-scroll
                            :data="errorList"
                            :item-size="73"
                            key-prop="id"
                            @change="(virtualList) => errorData = virtualList"
                            :virtualized="true">
                            <el-table
                                style="width: 100%;"
                                :data="errorData"
                                border
                                ref="createTable"
                                row-key="id"
                                :max-height="tableHeight">
                                <el-table-column prop="barcode" align="center" min-width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span style="color: red;">*</span>{{ $t('common.tm') }}
                                    </template>
                                    <template slot-scope="scope">
                                        <div :class="{'input-error': !scope.row.barcode || scope.row.barcode.length > 32}">
                                            <el-input
                                                v-model="scope.row.barcode"
                                                :disabled="scope.row.barcodeDisabled"
                                                @change="errorChange">
                                            </el-input>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" :label="$t('common.productName')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.name"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="image" :label="$t('common.tupian')" align="center" width="90">
                                    <template slot-scope="scope">
                                        <el-upload
                                            class="avatar-uploader"
                                            :show-file-list="false"
                                            action=""
                                            :http-request="e => httpRequest(e, scope.row)"
                                            accept="image/jpg,image/jpeg,image/png,image/webp">
                                            <img :src="scope.row.image" class="avatar" v-if="scope.row.image">
                                            <div class="avatar-icon" v-else>
                                                <i class="el-icon-plus avatar-uploader-icon"></i>
                                            </div>
                                        </el-upload>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="brand" :label="$t('common.brandManage')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.brand"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="supplier" :label="$t('common.supplier')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.supplier"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="pcn" :label="$t('common.parentCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.pcn"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ccn" :label="$t('common.childCategory')" align="center" min-width="140">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.ccn"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="description" :label="$t('common.miaoshu')" align="center" min-width="160">
                                    <template slot-scope="scope">
                                        <el-input
                                            v-model="scope.row.description"
                                            type="textarea"
                                            @change="errorChange"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column align="center" :label="$t('common.cz')" fixed="right" width="120">
                                    <template slot-scope="scope">
                                        <div>
                                            <el-button
                                                size="mini"
                                                type="text"
                                                class="danger"
                                                @click="deleteHandle(scope.row.type, scope.row.id);">
                                                {{ $t('common.sc') }}
                                            </el-button>
                                        </div>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </virtual-scroll>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- 选择规格 -->
        <SelectDuplicate
            :showDialog="duplicateDialog"
            :duplicates="duplicates"
            @parent-update="duplicateUpdate"
            @parent-close="duplicateDialog = false"/>
    </div>
</template>

<script>
import {importPlatformProduct, uploadImage} from "../../../api/api";
import SelectDuplicate from "./SelectDuplicate";
// 虚拟表格
import VirtualScroll from 'el-table-virtual-scroll';
export default {
    name: "Redact",
    // 组件
    components: {
        'virtual-scroll': VirtualScroll,
        SelectDuplicate
    },
    props: {
        filename: {
            type: 'String',
            default: ''
        },
        traceId: {
            type: 'String',
            default: ''
        },
        creates: {
            type: Array,
            default: () => ([])
        },
        updates: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            loading: false,
            activeName: 'create',
            tableHeight: 520,
            createList: [],
            updateList: [],
            errorList: [],
            createData: [],
            updateData: [],
            errorData: [],
            duplicateDialog: false,
            itemId: '',
            duplicates: [],
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {
        activeName (val) {
            if (val === 'error') {
                this.genrateErrors()
            }
        }
    },
    // 方法集合
    methods: {
        // 获取表格高度
        getTableHeight() {
            if (this.$refs.redactContent) {
                const tableHeight = this.$refs.redactContent.offsetHeight
                this.$nextTick(() => {
                    this.tableHeight = tableHeight - 80
                });
            }
        },
        // 初始化数据
        initData () {
            let creates = JSON.parse(JSON.stringify(this.creates))
            let updates = JSON.parse(JSON.stringify(this.updates))
            this.createList = creates.map((item, index) => {
                return {
                    ...item,
                    id: 'c' + (index + 1).toString().padStart(6, '0'),
                    type: 'create',
                    restorable: false,
                    barcodeDisabled: !!item.barcode,
                    originProduct: null,
                    currentDuplicate: null,
                    duplicateCount: 0,
                    duplicates: []
                }
            })
            this.updateList = updates.map((item, index) => {
                return {
                    ...item,
                    type: 'update',
                    restorable: false,
                    barcodeDisabled: true,
                    originProduct: null,
                    currentDuplicate: item.duplicateCount > 0 ? item.duplicates[0] : null,
                }
            })
            // 生成错误数据
            this.genrateErrors()
        },
        
        // 生成错误数据
        genrateErrors () {
            let createError = this.createList.filter(item => this.checkCreateRowError(item))
            this.errorList = [...createError]
        },
        
        // 上传图片
        httpRequest (val, row) {
            let formData = new FormData();
            formData.append("image", val.file);
            uploadImage(formData)
                .then(res => {
                    if (res.code === 20000) {
                        if (row.type === 'create') {
                            let currentIndex = this.createList.findIndex(item => item.id === row.id)
                            this.$set(this.createList[currentIndex], 'image', res.data.url)
                        } else if (row.type === 'update') {
                            let currentIndex = this.updateList.findIndex(item => item.id === row.id)
                            this.$set(this.updateList[currentIndex], 'image', res.data.url)
                        }
                        this.genrateErrors()
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
        
        // 输入内容变化
        inputChange () {
            // 生成错误数据
            this.genrateErrors()
        },
        
        // 删除
        deleteHandle (type, id) {
            if (type === 'create') {
                this.createList = this.createList.filter(item => item.id !== id)
            } else if (type === 'update') {
                this.updateList = this.updateList.filter(item => item.id !== id)
            }
            // 生成错误数据
            this.genrateErrors()
        },
        
        // 添加到创建
        addToCreate (row) {
            this.updateList = this.updateList.filter(item => item.id !== row.id)
            this.createList = [...this.createList, {
                ...row,
                type: 'create',
                restorable: true,
                originProduct: JSON.parse(JSON.stringify(row)),
                barcodeDisabled: false
            }]
            // 生成错误数据
            this.genrateErrors()
        },
        // 还原到更新商品
        restoreToUpdate (row) {
            this.createList = this.createList.filter(item => item.id !== row.id)
            let currentItem = JSON.parse(JSON.stringify(row.originProduct))
            this.updateList = [...this.updateList, {
                ...currentItem,
                type: 'update',
                restorable: false,
                originProduct: null,
                barcodeDisabled: true
            }]
            // 生成错误数据
            this.genrateErrors()
        },
    
        // 选择相同商品
        selectDuplicateHandle (row) {
            this.itemId = row.id
            this.duplicates = row.duplicates;
            this.duplicateDialog = true
        },
        // 更新相同商品
        duplicateUpdate (data) {
            let currentIndex = this.updateList.findIndex(item => item.id === this.itemId)
            this.$set(this.updateList[currentIndex], 'currentDuplicate', data)
            // 生成错误数据
            this.genrateErrors()
        },
    
        // 错误数据改变
        errorChange (row) {
            let currentRow = JSON.parse(JSON.stringify(row))
            if (row.type === 'create') {
                const currentIndex = this.createList.findIndex(item => item.id === row.id)
                this.$set(this.createList, currentIndex, currentRow)
            } else if (row.type === 'update') {
                const currentIndex = this.updateList.findIndex(item => item.id === row.id)
                this.$set(this.updateList, currentIndex, currentRow)
            }
            // 生成错误数据
            this.genrateErrors()
        },
       
        // 校验创建行是否错误
        checkCreateRowError (row) {
            if (!row.barcode || row.barcode.length > 32) {
                return true;
            }
            return false;
        },
       
        // 提交导入
        submitImport () {
            const createError = this.createList.some(item => {
                return this.checkCreateRowError(item)
            });
            if (createError) {
                this.$message({
                    showClose: true,
                    message: this.$t('common.dataNotFillFull'),
                    type: 'warning'
                })
                return;
            }
            // 提交导入
            this.sendImportRequest()
        },
        // 提交导入
        sendImportRequest () {
            if(this.loading) return;
            let creates = this.createList.map(item => {
                return {
                    barcode: item.barcode,
                    name: item.name,
                    image: item.image,
                    description: item.description,
                    brand: item.brand,
                    pcn: item.pcn,
                    ccn: item.ccn,
                    supplier: item.supplier
                }
            })
            let updates = this.updateList.map(item => {
                return {
                    id: item.currentDuplicate.id,
                    barcode: item.barcode,
                    name: item.name,
                    image: item.image,
                    description: item.description,
                    brand: item.brand,
                    pcn: item.pcn,
                    ccn: item.ccn,
                    supplier: item.supplier
                }
            })
            let params = {
                filename: this.filename,
                traceId: this.traceId,
                creates,
                updates
            }
            this.loading = true
            this.$emit('parent-disabled', true)
            importPlatformProduct(params).then(res => {
                if (Number(res.code) === 20000) {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'success'
                    });
                    this.$emit('parent-update')
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    });
                }
            }).catch((err) => {
                this.$message.error(err);
            }).finally(() => {
                this.loading = false
                this.$emit('parent-disabled', false)
            })
        },
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
    
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
.content{
    width: 100%;
    height: 100%;
    padding: 0 10px 10px;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: #fff;
    .card{
        height: 100%;
        .card-handle{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
        }
        .card-body{
            height: calc(100% - 50px);
            .avatar-uploader {
                width: 100%;
                display: flex;
                justify-content: center;
                /deep/ .el-upload {
                    width: 62px;
                    height: 62px;
                    display: flex;
                    border: 1px dashed #d9d9d9;
                    border-radius: 6px;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    &:hover {
                        border-color: #409eff;
                    }
                    img {
                        width: 100%;
                        height: 100%;
                    }
                    .avatar-icon {
                        position: absolute;
                        left: 0;
                        right: 0;
                        top: 0;
                        bottom: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        i {
                            font-size: 24px;
                        }
                        .el-icon-delete {
                            display: none;
                            color: red;
                        }
                        &:hover {
                            background-color: rgba(0, 0, 0, 0.3);
                            .el-icon-delete {
                                display: inline-block;
                            }
                        }
                    }
                }
            }
        }
    }
}
/deep/ .el-tabs{
    height: 100%;
    .el-tabs__header{
        .el-tabs__item {
            font-size: 16px;
            font-weight: 500;
            color: #303133;
            &.is-active{
                color: #328969;
            }
            &.active{
                color: #328969;
                border-color: #328969;
            }
            &:hover{
                color: #328969;
            }
            .error{
                color: #f56c6c;
            }
        }
        .el-tabs__active-bar{
            background-color: #328969;
        }
    }
    .el-tabs__content{
        height: calc(100% - 60PX);
        .el-tab-pane{
            height: 100%;
        }
    }
    .cell{
        overflow: visible;
    }
}
/deep/ .el-table{
    table-layout: fixed;
    .handle-title{
        display: none;
    }
    .input-error {
        .el-input__inner {
            border: 1px solid red;
        }
        .el-textarea__inner{
            border: 1px solid red;
        }
    }
    
    .el-input-group__append,
    .el-input-group__prepend {
        padding: 0 10px;
    }
    .danger {
        color: red;
    }
    .red{
        color: red;
    }
    .green{
        color: green;
    }
}
</style>

