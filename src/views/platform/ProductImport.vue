<template>
    <div class="container">
        <div class="container-header">
            <p class="title">{{$t('common.importProduct')}}</p>
        </div>
        <div class="container-main">
            <!-- 上传 -->
            <Upload
                @parent-update="uploadSuccess"
                v-if="stepActive === 1"/>
            <!-- 调整 -->
            <Redact
                ref="redact"
                :filename="filename"
                :traceId="traceId"
                :creates="creates"
                :updates="updates"
                @parent-disabled="disabledUpdate"
                @parent-update="redactSuccess"
                v-else-if="stepActive === 2"/>
        </div>
        <div class="container-handle">
            <div class="handle-btn">
                <el-button
                    size="mini"
                    @click="goBack">{{ $t('common.back') }}</el-button>
            </div>
            <div class="handle-btn">
                <el-button
                    type="primary"
                    size="mini"
                    @click="stepActive--"
                    v-if="stepActive > 1">{{ $t('common.beforeStep') }}</el-button>
                <el-button
                    type="primary"
                    size="mini"
                    :disabled="disabled"
                    @click="saveHandle"
                    v-if="stepActive === 2">{{ $t('common.save') }}</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import Upload from "@/components/platform/product-import/Upload";
import Redact from "@/components/platform/product-import/Redact";
export default {
    name: "PlatformProductImport",
    // 组件
    components: {
        Upload,
        Redact
    },
    props: {},
    data() {
        return {
            stepActive: 1,  // 1导入    2编写
            filename: '',
            traceId: '',
            creates: [],
            updates: [],
            disabled: false,
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {},
    // 方法集合
    methods: {
        // 上传更新
        uploadSuccess (data) {
            this.stepActive = 2
            this.filename = data.filename
            this.traceId = data.traceId
            this.creates = data.creates
            this.updates = data.updates
            this.$nextTick(() => {
                this.$refs.redact.initData()
            })
        },
        
        // 保存
        saveHandle () {
            this.$refs.redact.submitImport()
        },
        // 更新按钮禁用
        disabledUpdate (boo) {
            this.disabled = boo
        },
        // 上传完成
        redactSuccess () {
            this.goBack();
        },
        // 返回
        goBack () {
            this.$router.back();
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
div, p, span{
    box-sizing: border-box;
}
.container{
    width: 100%;
    height: 100%;
    padding-bottom: 50px;
    display: flex;
    flex-direction: column;
    position: relative;
    .container-header{
        width: 100%;
        height: 50px;
        padding-bottom: 10px;
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        .title{
            font-size: 18px;
            color: #181818;
        }
        .warehouse{
            position: absolute;
            right: 80px;
            .text{
                padding-right: 10px;
            }
        }
    }
    .container-main{
        width: 100%;
        flex-grow: 1;
        overflow-y: auto;
    }
    .container-handle{
        position: absolute;
        height: 60px;
        left: -20px;
        right: -20px;
        bottom: -20px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #fff;
    }
}
</style>
