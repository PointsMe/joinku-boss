<template>
    <div class="container">
        <div class="container-main">
            <div class="container-content">
                <div class="base">
                    <div class="title">
                        <span class="dot"></span>
                        <p class="text">
                            {{ $t('common.jbxx') }}
                            <span class="hint">
                                （<i>*</i>{{ $t('common.bitian') }}）
                            </span>
                        </p>
                    </div>
                    <el-form :model="formData"
                             class="form"
                             :rules="rules"
                             ref="ruleForm"
                             label-width="100px">
                        <el-form-item :label="$t('common.jsmc')" prop="name">
                            <el-input v-model="formData.name" :placeholder="$t('common.lengthNot32Charact')" maxlength="32"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('common.roleDes')" prop="remark">
                            <el-input v-model="formData.remark" maxlength="100" :placeholder="$t('common.lengthNot100Charact')"></el-input>
                        </el-form-item>
                        <el-form-item :label="$t('common.qy2')" prop="enabled">
                            <el-switch
                                v-model="formData.enabled"
                                active-color="#13ce66"
                                inactive-color="#ff4949"></el-switch>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="permission">
                    <div class="title">
                        <span class="dot"></span>
                        <p class="text">{{ $t('common.permSetting') }}</p>
                    </div>
                    <div class="tree">
                        <el-tree :data="treeData"
                                 :show-checkbox="true"
                                 node-key="id"
                                 :check-on-click-node="true"
                                 ref="tree"
                                 :props="defaultProps">
                        </el-tree>
                    </div>
                </div>
            </div>
        </div>
        <div class="container-handle">
            <el-button size="mini" @click="goBack">{{ $t('common.back') }}</el-button>
            <el-button type="primary" size="mini" @click="submitForm('ruleForm')">{{ $t('common.save') }}</el-button>
        </div>
    </div>
</template>
<script>
import {roleCreate, roleUpdate, rolePermsList, roleDetail} from '@/api/api';

export default {
    name: 'roleDetail',
    components: {},
    data() {
        return {
            id: '',
            formData: {
                name: '',
                remark: '',
                enabled: true
            },
            rules: {
                name: [
                    { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
                ]
            },
            defaultProps: {
                children: 'children',
                label: 'name',
            },
            treeData: [],
            disabled: false
        }
    },
    methods: {
        /* 获取详情 */
        getDetail () {
            let params = {
                id: this.id
            }
            roleDetail(params).then(res => {
                if (res.code === 20000) {
                    const resData = res.data
                    this.formData = {
                        name: resData.name,
                        remark: resData.remark,
                        enabled: resData.enabled
                    }
                    const treeData = resData.perms || []
                    this.treeData = treeData
                    setTimeout(() => {
                       this.filterCheckedId(treeData)
                    }, 100)
                } else {
                    this.$message.error(res.msg);
                }
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        /* 获取权限树 */
        getPermissionData () {
            rolePermsList().then(res => {
                if (res.code === 20000) {
                    this.treeData = res.data || []
                } else {
                    this.$message.error(res.msg);
                }
            }).catch((err) => {
                this.$message.error(err);
            })
        },
        // 筛选选中节点ID
        filterCheckedId (data) {
            data.forEach(item => {
                if (item.selected) {
                    this.$refs.tree.setChecked(item.id, true, false)
                }
                if (item.children && item.children.length > 0) {
                    this.filterCheckedId(item.children)
                }
            })
        },
        
        /* 保存 */
        // 验证表单
        submitForm (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    if (this.id) {
                        this.updateRole()
                    } else {
                        this.createRole()
                    }
                } else {
                    return false
                }
            })
        },
        // 重置表单
        resetForm (formName) {
            this.$refs[formName].resetFields()
        },
        // 创建
        createRole () {
            const checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
            const checkedIds = checkedNodes.map(item => {
                return item.id
            })
            let params = {
                name: this.formData.name,
                remark: this.formData.remark,
                enabled: this.formData.enabled,
                permsIds: checkedIds
            }
            roleCreate(params).then(res => {
                if (res.code == 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    // 重置表单
                    this.resetForm('ruleForm')
                    this.$router.back();
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        // 更新
        updateRole () {
            const checkedNodes = this.$refs.tree.getCheckedNodes(false, true)
            const checkedIds = checkedNodes.map(item => {
                return item.id
            })
            let params = {
                id: this.id,
                name: this.formData.name,
                remark: this.formData.remark,
                enabled: this.formData.enabled,
                permsIds: checkedIds
            }
            roleUpdate(params).then(res => {
                if (res.code == 20000) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    });
                    // 重置表单
                    this.resetForm('ruleForm')
                    this.$router.back();
                } else {
                    this.$message.error(res.msg);
                }
            })
        },
        
        
        /* 返回 */
        goBack() {
            this.$router.back()
        }
    },
    mounted() {
        if (this.$route.query.id) {
            this.id = this.$route.query.id;
            this.getDetail();
        } else {
            this.getPermissionData();
        }
    },
    computed: {},
    filters: {},
    watch: {}
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    padding-bottom: 60px;
    box-sizing: border-box;
    
    .container-main{
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        overflow: auto;
        .container-content{
            width: 1024px;
            height: 100%;
            .title{
                width: 100%;
                height: 60px;
                display: flex;
                align-items: center;
                border-bottom: 1px solid #CCCCCC;
                .dot{
                    width: 3px;
                    height: 30px;
                    background: green;
                }
                .text{
                    margin-left: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    .hint{
                        i{
                            color: red;
                            margin-right: 5px;
                        }
                    }
                }
            }
            .base{
                background: #FFFFFF;
                .form{
                    padding: 10px 20px;
                }
            }
            .permission{
                margin-top: 20px;
                background: #FFFFFF;
                .tree{
                    width: 100%;
                    padding: 10px 50px;
                    box-sizing: border-box;
                    display: flex;
                }
            }
        }
    }
    
    .container-handle{
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 60px;
        padding-left: 200px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #FFFFFF;
    }
    /*background: #ededed;*/
    .contentContainer {
        width: 100%;
        height: calc(100% - 30px);
        overflow: auto;
        
        .contentDetail {
            width: 1024px;
            height: 100%;
            /*padding-top: 20px;*/
            margin: 0 auto;
            
            /*overflow: auto;*/
            .baseInfo,
            .saleInfo,
            .payInfo {
                background: white;
                
                .title {
                    width: 100%;
                    height: 60px;
                    position: relative;
                    line-height: 60px;
                    border-bottom: 1px solid #F4F4F4;
                    
                    .tit {
                        margin-left: 20px;
                        font-weight: bold;
                    }
                    
                    .border {
                        position: absolute;
                        left: 0;
                        top: 15px;
                        width: 3px;
                        height: 30px;
                        background: green;
                    }
                }
                
                .content {
                    padding: 10px;
                }
            }
            
            .saleInfo {
                margin-top: 20px;
            }
            
            .payInfo {
                margin-top: 20px;
                margin-bottom: 100px;
                display: inline-grid;
                width: 100%;
            }
            
            .opBtn {
                background: white;
                position: fixed;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                z-index: 99;
            }
        }
    }
    
}

</style>
