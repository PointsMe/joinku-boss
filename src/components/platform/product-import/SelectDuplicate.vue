<template>
    <el-dialog
        :title="$t('common.chooseProduct')"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        center
        width="600px"
        top="10vh"
        @close="dialogClose">
        <div class="content">
            <el-table :data="duplicates" max-height="560" style="width: 100%">
                <el-table-column
                    align="left"
                    min-width="260"
                    :label="$t('common.mingcheng') + '/' + $t('common.tm')">
                    <template slot-scope="scope">
                        <div class="table-info">
                            <div class="picture">
                                <el-image :src="cutImage(scope.row.image, 50)" fit="cover">
                                    <div slot="error" class="image-slot">
                                        <img src="../../../assets/images/default.png" />
                                    </div>
                                </el-image>
                            </div>
                            <div class="desc">
                                <p class="desc-text">{{scope.row.name}}</p>
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
                <el-table-column align="center" width="120" :label="$t('common.cz')" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="mini"
                            type="text"
                            @click="selectHandle(scope.row);">
                            {{ $t('common.seleziona') }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div slot="footer"
             class="dialog-footer">
            <el-button @click="dialogVisible = false">{{ $t('common.close') }}</el-button>
        </div>
    </el-dialog>
</template>

<script>

export default {
    name: "SelectDuplicate",
    // 组件
    components: {},
    props: {
        showDialog: {
            type: Boolean,
            default: true
        },
        duplicates: {
            type: Array,
            default: () => ([])
        }
    },
    data() {
        return {
            dialogVisible: false
        };
    },
    // 计算属性
    computed: {},
    // 监控data中的数据变化
    watch: {
        showDialog (val) {
            if (val) {
                this.initData()
            }
        },
    },
    // 方法集合
    methods: {
        // 裁减图片
        cutImage (url, w = 50) {
            if (!url) return ''
            let suffix = url.substring(url.lastIndexOf('.'))
            return `${url}_${w}-${suffix}`
        },
        // 初始化数据
        initData () {
            this.dialogVisible = true
        },
        
        // 选择
        selectHandle (row) {
            this.$emit('parent-update', row)
            this.dialogVisible = false
        },
        
        // 关闭弹窗
        dialogClose () {
            this.$emit('parent-close')
        }
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
.content{
    .table-info{
        width: 100%;
        display: flex;
        align-items: center;
        .picture{
            width: 50px;
            height: 50px;
            border-radius: 6px;
            overflow: hidden;
            flex-shrink: 0;
            img{
                width: 50px;
                height: 50px;
            }
        }
        .desc{
            flex-grow: 1;
            padding-left: 10px;
            .desc-text{
                font-size: 12px;
                color: #272727;
                line-height: 20px;
                text-align: left;
                margin-bottom: 4px;
                &:last-of-type{
                    margin-bottom: 0;
                }
            }
        }
    }
}
</style>
