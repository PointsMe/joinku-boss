<template>
    <div class="container">
        <div class="container-search">
            <div class="handle">
                <el-button type="danger" size="mini" @click="addClick">{{ $t('common.add') }}</el-button>
            </div>
        </div>
        
        <div class="container-main">
            <div class="container-content">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="name" align="center" min-width="240" :label="$t('common.jsmc')"></el-table-column>
                    <el-table-column prop="enabled" align="center" width="120" :label="$t('common.qy2')+'/'+$t('common.jy2')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.enabled">{{ $t('common.qy2') }}</span>
                            <span v-else>{{ $t('common.jy2') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="defaulted" align="center" width="120" :label="$t('common.sfmr')">
                        <template slot-scope="scope">
                            <span v-if="scope.row.defaulted">{{ $t('common.yes') }}</span>
                            <span v-else>{{ $t('common.fou') }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="remark" min-width="240" align="center" :show-overflow-tooltip="true" :label="$t('common.bz')"></el-table-column>
                    <el-table-column align="center" width="300" :label="$t('common.cz')">
                        <template slot-scope="scope">
                            <el-button type="text" @click="editClick(scope.row.id)" v-if="allPerms.includes('role.edt')">{{ $t('common.xg') }}</el-button>
                            <el-button type="text" @click="deleteClick(scope.row.id);" v-if="!scope.row.defaulted && allPerms.includes('role.del')">{{ $t('common.sc') }}</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <Delete :parentDialog="deleteDialog"
                :parentId="itemId"
                @parent-updata="getListData"
                @parent-close="deleteDialog = false"/>
    </div>
</template>
<script>
import {
    getRoleList
} from '@/api/api';
import Delete from '@/components/employee/role/Delete.vue'

export default {
    name: 'jslb',
    components: {
        Delete
    },
    data() {
        return {
            allPerms: [],
            tableData: [],
            itemId: '',
            deleteDialog: false
        };
    },
    methods: {
        // 获取列表数据
        getListData () {
            getRoleList().then(res => {
                if (res.code === 20000) {
                    this.tableData = res.data
                }
            });
        },
       /* 新增 */
        addClick () {
            this.$router.push({ name: 'jslbDetail' });
        },
        /* 编辑 */
        editClick (id) {
            this.$router.push({ name: 'jslbDetail', query: { id: id } });
        },
        /* 删除 */
        deleteClick (id) {
            this.itemId = id
            this.deleteDialog = true
        }
    },
    watch: {},
    created() {
        this.allPerms = JSON.parse(localStorage.getItem('perms'));
    },
    mounted() {
        this.getListData();
    },
    computed: {},
    filters: {
    
    }
};

</script>
<style lang="scss" scoped>
.container {
    height: 100%;
    padding-top: 80px;
    box-sizing: border-box;
    position: relative;
    
    .container-search {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 60px;
        padding-left: 20px;
        padding-right: 20px;
        display: flex;
        align-items: center;
        background-color: #FFFFFF;
        box-sizing: border-box;
        
        .search-item {
            margin-right: 30px;
            
            /deep/ .el-input {
                width: 280px;
            }
        }
        
        .handle {
        
        }
    }
    
    .container-main {
        height: 100%;
        padding: 10px 20px;
        background: #FFFFFF;
        box-sizing: border-box;
        overflow-y: auto;
    }
}

</style>
