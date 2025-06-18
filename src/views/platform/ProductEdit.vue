<template>
    <div
        class="container"
        v-loading="loading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.7)">
        <div class="container-main">
            <el-form
                :model="formData"
                size="small"
                :rules="rules"
                ref="ruleForm"
                label-width="120px">
                <!-- 基本信息 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-left">
                            <span class="chunk"></span>
                            <p class="title">{{ $t('common.jbxx') }}</p>
                            <p class="text">
                                （ <span class="tag" style="color: red;">*</span> {{ $t('common.bitian') }} ）
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <el-row :gutter="20">
                            <el-col :span="12">
                                <el-form-item
                                    :label="$t('common.productName')"
                                    prop="name">
                                    <el-input
                                        v-model="formData.name"
                                        :placeholder="$t('common.lengthNot100Charact')"
                                        maxlength="100"
                                        show-word-limit></el-input>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('common.productBarcode')"
                                    prop="barcode">
                                    <el-input
                                        v-model="formData.barcode"
                                        maxlength="32"
                                        show-word-limit>
                                    </el-input>
                                </el-form-item>
                                <el-form-item :label="$t('common.tupian')" prop="image">
                                    <el-upload
                                        class="avatar-uploader"
                                        :show-file-list="false"
                                        action=""
                                        :http-request="httpRequest"
                                        accept="image/jpg,image/jpeg,image/png,image/webp">
                                        <img :src="formData.image" class="avatar" v-if="formData.image">
                                        <div class="avatar-icon" v-else>
                                            <i class="el-icon-plus avatar-uploader-icon"></i>
                                        </div>
                                    </el-upload>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item
                                    :label="$t('common.spfl')"
                                    prop="classifyId">
                                    <el-cascader
                                        filterable
                                        :options="classifyOptions"
                                        v-model="formData.classifyId"
                                        :props="cascaderProps"
                                    ></el-cascader>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('common.brandManage')"
                                    prop="brandId">
                                    <el-select v-model="formData.brandId">
                                        <el-option
                                            v-for="item in brandOptions"
                                            :key="item.id"
                                            :label="item.name"
                                            :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item
                                    :label="$t('common.supplier')"
                                    prop="supplier">
                                    <el-input
                                        v-model="formData.supplier"
                                        maxlength="128">
                                    </el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </div>
                </div>
                <!-- 描述信息 -->
                <div class="card">
                    <div class="card-header">
                        <div class="header-left">
                            <span class="chunk"></span>
                            <p class="title">{{ $t('common.descInfo') }}</p>
                            <p class="text">
                                （ <span class="tag" style="color: red;">*</span> {{ $t('common.bitian') }} ）
                            </p>
                        </div>
                    </div>
                    <div class="card-body">
                        <el-form-item
                            :label="$t('common.miaoshu')"
                            prop="description">
                            <el-input
                                v-model="formData.description"
                                type="textarea"
                                maxlength="500"
                                show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('common.colorDesc')"
                            prop="describeColor">
                            <el-input
                                v-model="formData.describeColor"
                                type="textarea"
                                maxlength="500"
                                show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('common.appeareDesc')"
                            prop="describeAppearance">
                            <el-input
                                v-model="formData.describeAppearance"
                                type="textarea"
                                maxlength="500"
                                show-word-limit></el-input>
                        </el-form-item>
                        <el-form-item
                            :label="$t('common.funcDesc')"
                            prop="describeFunction">
                            <el-input
                                v-model="formData.describeFunction"
                                type="textarea"
                                maxlength="500"
                                show-word-limit></el-input>
                        </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="container-handle">
            <el-button size="mini"
                       @click="goBack">{{ $t('common.back') }}</el-button>
            <el-button type="primary"
                       size="mini"
                       :disabled="disabled"
                       @click="submitForm">{{ $t('common.save') }}</el-button>
        </div>
    </div>
</template>

<script>
import {
    createPlatformProduct,
    queryPlatformBrandPage,
    queryPlatformClassifyTree, queryPlatformProductDetail,
    updatePlatformProduct, uploadImage
} from "../../api/api";

export default {
    name: "ProductEdit",
    // 组件
    components: {},
    props: {},
    data() {
        return {
            loading: false,
            id: '',
            classifyOptions: [],
            cascaderProps: {
                label: 'name',
                value: 'id',
                children: 'children'
            },
            brandOptions: [],
            formData: {
                name: '',
                barcode: '',
                image: '',
                classifyId: [],
                brandId: '',
                supplier: '',
                description: '',
                describeColor: '',
                describeAppearance: '',
                describeFunction: ''
            },
            rules: {
                // name: [{required: true, message: this.$t('common.qsrnr'), trigger: 'blur'}],
                barcode: [{required: true, message: this.$t('common.qsrnr'), trigger: 'blur'}],
                // image: [{required: true, message: this.$t('common.qxz'), trigger: 'change'}],
                // classifyId: [{required: true, message: this.$t('common.qxz'), trigger: 'change'}],
            },
            disabled: false
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        // 获取详情
        getDetail () {
            let params = {
                id: this.id
            }
            queryPlatformProductDetail(params).then(res => {
                if (Number(res.code) === 20000) {
                    const resData = res.data
                    let classifyId = []
                    if (resData.pcid && resData.ccid) {
                        classifyId = [resData.pcid, resData.ccid]
                    }
                    this.formData = {
                        name: resData.name,
                        barcode: resData.barcode,
                        image: resData.image,
                        classifyId,
                        brandId: resData.brandId,
                        supplier: resData.supplier,
                        description: resData.description,
                        describeColor: resData.describeColor,
                        describeAppearance: resData.describeAppearance,
                        describeFunction: resData.describeFunction
                    }
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
        /******** 图片 ********/
        httpRequest (val) {
            let formData = new FormData();
            formData.append("image", val.file);
            uploadImage(formData)
                .then(res => {
                    if (res.code === 20000) {
                        this.formData.image = res.data.url;
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
        // 保存
        submitForm () {
            this.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    let pcid = '';
                    let ccid = '';
                    if (Array.isArray(this.formData.classifyId) && this.formData.classifyId.length === 2) {
                        pcid = this.formData.classifyId[0]
                        ccid = this.formData.classifyId[0]
                    }
                    let params = {
                        name: this.formData.name,
                        barcode: this.formData.barcode,
                        image: this.formData.image,
                        pcid,
                        ccid,
                        brandId: this.formData.brandId,
                        supplier: this.formData.supplier,
                        description: this.formData.description,
                        describeColor: this.formData.describeColor,
                        describeAppearance: this.formData.describeAppearance,
                        describeFunction: this.formData.describeFunction
                    }
                    if (this.id) {
                        params.id = this.id
                        this.sendEditRequest(params)
                    } else {
                        this.sendAddRequest(params)
                    }
                } else {
                    return false
                }
            })
        },
        // 提交
        sendAddRequest (params) {
            this.disabled = true;
            createPlatformProduct(params).then(res => {
                if (Number(res.code) === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.goBack()
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            }).finally(() => {
                this.disabled = false;
            })
        },
        // 提交订单
        sendEditRequest (params) {
            this.disabled = true;
            updatePlatformProduct(params).then(res => {
                if (Number(res.code) === 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    this.goBack()
                } else {
                    this.$message({
                        showClose: true,
                        message: res.msg,
                        type: 'error'
                    })
                }
            }).catch((err) => {
                this.$message.error(err);
            }).finally(() => {
                this.disabled = false;
            })
        },
        // 返回
        goBack () {
            this.$router.back()
        },
    },
    // 创建完成
    created() {
    },
    // 挂载完成
    mounted() {
        if (this.$route.query.id) {
            this.id = this.$route.query.id;
            this.getDetail()
        }
        // 获取分类树
        this.getClassifyTree()
        // 品牌列表
        this.getBrandList()
    },
    // 销毁之前
    beforeDestroy() {
    }
};
</script>

<style lang="scss" scoped>
div,
span,
p {
    box-sizing: border-box;
}
i {
    font-style: normal;
}
.container {
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    position: relative;
    display: flex;
    justify-content: center;
    .container-main {
        width: 1300px;
        height: 100%;
        overflow-y: auto;
        .card {
            background-color: #fff;
            margin-bottom: 20px;
            .card-header {
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #cccccc;
                .header-left{
                    display: flex;
                    align-items: center;
                    .chunk{
                        width: 3px;
                        height: 26px;
                        background-color: #107c3f;
                    }
                    .title{
                        margin-left: 12px;
                        font-size: 16px;
                        font-weight: 600;
                        color: #272727;
                    }
                    .text {
                        margin-left: 5px;
                        font-size: 14px;
                        color: #272727;
                    }
                    .spec{
                        margin-left: 20px;
                    }
                    .hint{
                        margin-left: 20px;
                        a{
                            font-size: 14px;
                            text-decoration: underline;
                            color: #107c3f;
                        }
                    }
                }
                .header-right{
                    padding-right: 12px;
                    .text{
                        font-size: 16px;
                        font-weight: 600;
                        color: #272727;
                    }
                }
            }
            .card-body {
                padding: 10px 20px;
                .form-hint{
                    color: #909399;
                    font-size: 12px;
                    line-height: 20px;
                }
            }
        }
        /deep/ .el-form{
            .el-form-item{
                .el-select{
                    width: 100%;
                }
                .el-cascader{
                    width: 100%;
                }
                .el-form-item{
                    margin-bottom: 0;
                }
            }
        }
        .avatar-uploader {
            /deep/ .el-upload {
                width: 172px;
                height: 172px;
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
                        font-size: 28px;
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
    .container-handle {
        position: absolute;
        left: -20px;
        bottom: -20px;
        right: -20px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        background-color: #fff;
    }
}
</style>
