<template>
    <div class="content">
        <div class="card">
            <el-upload
                class="upload"
                drag
                action=""
                :show-file-list="false"
                :http-request="httpRequest">
                <i class="el-icon-upload"></i>
                <p class="upload-text">{{ $t('common.djxqwj') }}</p>
            </el-upload>
            <p class="download">
                <a href="javascript:void(0)"
                   @click="downloadHandle">{{ $t('common.importTemDown') }}</a>
            </p>
        </div>
    </div>
</template>

<script>
import {downloadPlatformProductTem, preimportPlatformProduct,} from "../../../api/api";

export default {
    name: "Upload",
    // 组件
    components: {},
    props: {
    },
    data () {
        return {
        
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        // 下载模板
        downloadHandle () {
            downloadPlatformProductTem().then(res => {
                let blob = new Blob([res], { type: 'application/octet-stream' })
                let fileName = 'ProductImport.xlsx'
                if ('download' in document.createElement('a')) {
                    // 非IE下载
                    let elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href)
                    document.body.removeChild(elink)
                } else {
                    // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
            });
        },
        // 文件读取
        httpRequest (val) {
            let formData = new FormData();
            formData.append("file", val.file);
            preimportPlatformProduct(formData)
                .then(res => {
                    if (Number(res.code) === 20000) {
                        this.$message({
                            message: res.msg,
                            type: 'success'
                        });
                        const creates = res.data.creates || []
                        const updates = res.data.updates || []
                        if (creates.length === 0 && updates.length === 0) return false;
                        this.$emit('parent-update', res.data)
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
    },
    // 创建完成
    created () {
    },
    // 挂载完成
    mounted () {
    
    },
    // 销毁之前
    beforeDestroy () {
    }
};
</script>

<style lang="scss" scoped>
div {
    box-sizing: border-box;
}
.content {
    width: 100%;
    height: 100%;
    padding: 0 80px 80px;
    display: flex;
    justify-content: center;
    .card {
        width: 100%;
        height: 100%;
        padding-top: 60px;
        padding-bottom: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #00bcd4;
        border-radius: 6px;
        .upload {
            /deep/ .el-upload {
                .el-upload-dragger {
                    border: none;
                    background-color: transparent;
                }
            }
        }
        .upload-hint {
            font-size: 14px;
            color: #696969;
        }
        .download {
            margin-top: 160px;
            a {
                font-size: 16px;
                color: #03a9f4;
            }
        }
    }
}
</style>
