<template>
    <div class="com-image-drag">
        <div class="image-list">
            <!-- 拖拽层 -->
            <div class="list-wrap" v-show="drag_open">
                <draggable v-model="banner_list" @end="dragEnd"
                    :options="{
                        animation: 150,
                        ghostClass: 'sortable-ghost',
                        chosenClass: 'chosenClass',
                        scroll: true,
                        scrollSensitivity: 200
                    }">
                    <div class="image-item" v-for="($item, $index) in banner_list" :key="$index">
                        <img :src="$item.url" alt="" style="width: 100%;height: 100%;object-fit: cover;">
                        <div class="mask">
                            <span class="el-upload-list__item-actions">
                                <span class="el-upload-list__item-delete2" @click="deleteImage($index)">
                                    <i class="el-icon-delete"></i>
                                </span>
                                <span v-if="$index == 0" style="position: absolute;background: rgb(236, 236, 236);font-size: 14px;width: 120px;height: 24px;display: inline-block;bottom: 0px;left: 0;line-height: 24px;color: black;opacity: 0.7;">主图</span>
                            </span>
                        </div>
                    </div>
                </draggable>
            </div>
            <!-- 展示层 -->
            <div class="list-wrap" v-show="drag_open">
                <el-upload
                    v-show="limit == 0 || banner_list.length < limit"
                    style="display: inline-block;vertical-align: middle;"
                    class="avatar-uploader"
                    list-type="picture-card"
                    name="file"
                    action
                    :http-request="action"
                    :on-error="onError"
                    :on-success="onSuccess"
                    :on-change="onChange"
                    :before-upload="beforeUpload"
                    :show-file-list="false"
                    :multiple="multiple"
                    enctype="multipart/form-data">
                    <i class="el-icon-circle-plus-outline avatar-uploader-icon" style="line-height:120px;width:120px;height:120px">
                        <span v-if="banner_list.length == 0" style="position: absolute;background: #ececec;font-size: 14px;width: 120px;height: 24px;display: inline-block;bottom: 0;left: 0;line-height: 24px;color: black;">主图</span>
                    </i>
                </el-upload>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * @author LeeYunxiang
 * @description 为了方便上传图片组件可拖拽排序，不改变饿了么插件的逻辑，只做视图层的展示
 * @param {Array} list 图片数组
 * @param {Number} limit 最多可上传几张图片
 * @param {Function} action 上传接口地址
 * @param {Boolean} multiple 是否批量上传
 * @param {Function} beforeUpload 上传之前的回调，用于校验
 * @param {Function} onSuccess 上传成功的回调函数
 * @param {Function} onError 上传失败的回调函数
 */
import draggable from "vuedraggable";
export default {
    name: "ComImageShow",
    components: {
        draggable
    },
    props: {
        list: {
            type: Array
        },
        limit: {
            type: Number,
            default: 0
        },
        multiple: {
            type: Boolean,
            default: false
        },
        action: {
            type: Function,
            default: () => {}
        },
        beforeUpload: {
            type: Function,
            default: () => {}
        },
        onError: {
            type: Function,
            default: () => {}
        },
        onSuccess: {
            type: Function,
            default: () => {}
        },
        onChange: {
            type: Function,
            default: () => {}
        },
    },
    data() {
        return {
            banner_list: [], //拖拽插件不建议直接改变父组件的传值，所以另建一个新数组
            file_list: [], //保存开启拖拽之前排序的数组
            drag_open: true //拖拽开启开关
        };
    },
    methods: {
        // 删除图片
        deleteImage(i) {
            this.banner_list.splice(i, 1);
            this.$emit("update", this.banner_list.map(item => item.url));
        },
        // 开启拖拽
        openDrag() {
            this.file_list = JSON.parse(JSON.stringify(this.banner_list)); //数组深拷贝
            this.drag_open = true;
        },
        // 取消拖拽
        cancle() {
            this.banner_list = this.file_list;
            this.drag_open = false;
        },
        // 拖拽保存
        save() {
            this.$emit("update", this.banner_list.map(item => item.url));
            this.drag_open = false;
        },
        //拖拽完成
        dragEnd(dt){
            this.$emit("update", this.banner_list.map(item => item.url));
        },
    },
    mounted() {
        // 初始数组拷贝
        this.banner_list = this.list.map(url => {
            let obj = {
                url: url,
                is_hover: false
            };
            return obj;
        });
    },
    watch: {
        // 监听父组件传值改变
        list(arr) {
            if (arr.length > this.limit && this.limit != 0) {
                this.$message.warning(`当前最多可上传${this.limit}张图片`);
                return false;
            }
            this.banner_list = arr.map(url => {
                let obj = {
                    url: url,
                    is_hover: false
                };
                return obj;
            });
        }
    }
};
</script>
<style lang="scss" scoped>
    .com-image-drag{
        &:after{
            display: block;
            clear: both;
            content: "";
        }
        .image-list{
            float: left;
            &:after{
                display: block;
                clear: both;
                content: "";
            }
            .list-wrap{
                float: left;
            }
            .image-item{
                width: 120px;
                height: 120px;
                line-height: 120px;
                position: relative;
                transition: all .5s cubic-bezier(.55,0,.1,1);
                font-size: 14px;
                color: #606266;
                margin: 0 8px 8px 0;
                display: inline-block;
                box-sizing: border-box;
                overflow: hidden;
                background-color: #fff;
                border: 1px solid #c0ccda;
                border-radius: 6px;
                .label{
                    width: 46px;
                    height: 26px;
                    background-color: #13ce66;
                    color: #FFFFFF;
                    transform: rotate(45deg);
                    text-align: center;
                    position: absolute;
                    right: -17px;
                    top: -7px;
                    .icon-success{
                        transform: rotate(-45deg);
                    }
                }
                .mask{
                    .el-upload-list__item-actions{
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        left: 0;
                        top: 0;
                        cursor: default;
                        text-align: center;
                        color: #fff;
                        opacity: 0;
                        font-size: 20px;
                        background-color: rgba(0,0,0,.5);
                        -webkit-transition: opacity .3s;
                        transition: opacity .3s;
                        .el-upload-list__item-delete2{
                            cursor: pointer;
                        }
                        &:hover{
                            opacity: 1;
                        }
                    }
                    .bin{
                        color: #FFFFFF;
                        font-size: 20px;
                        position: absolute;
                        left: 45%;
                        top: 43%;
                    }
                }
            }
        }
    }
</style>