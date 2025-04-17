<template>
  <el-dialog
    :title="$t('common.selezionacliente')"
    :visible.sync="visible"
    width="80%"
    class="select-customer-container"
    top="20px"
    append-to-body
    :before-close="modalClose"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div>
      <div class="tb">
        <div class="opt-container">
          <el-row>
            <el-col :span="24">
              <el-input
              clearable
              @change="keywordsChange"
              style="width:200px; margin:0; padding:0;"
              size="mini"
              @keyup.enter.native="searchCustomer"
              prefix-icon="el-icon-search"
              v-model="searchForm.keyword"
              :placeholder="$t('common.insertCustomerName')"
            ></el-input>
            <el-input
              clearable
              size="mini"
              class="qsrmfivaSy"
              style="width: 160px;"
              v-model.trim="searchForm.vatNumber"
              placeholder="P.IVA"
            ></el-input>
            <el-input
              clearable
              size="mini"
              style="width: 160px;"
              class="qsrmfivaSy"
              v-model.trim="searchForm.taxCode"
              placeholder="Codice Fiscale"
            ></el-input>
            <el-button
              type="primary"
              size="mini"
              style="margin-left: 5px"
              icon="el-icon-search"
              @click="searchCustomer"
            >{{$t('common.cercas')}}</el-button>
            <el-button size="mini" type="info" @click="clearSearchForm">{{$t('common.svuota')}}</el-button>

              <!-- <el-input
                :placeholder="$t('common.i1')"
                clearable
                @change="keywordsChange"
                style="width: 420px;margin: 0;padding: 0;"
                size="mini"
                @keyup.enter.native="searchCustomer"
                prefix-icon="el-icon-search"
                v-model="searchForm.keywords"
              ></el-input>
              <el-button
                type="primary"
                size="mini"
                style="margin-left: 5px"
                icon="el-icon-search"
                @click="searchCustomer"
              >{{$t('common.cercas')}}</el-button> -->
            </el-col>
          </el-row>
        </div>
        <el-table :data="customerList" size="medium" style="width: 100%">
          <el-table-column :label="$t('common.type')" width="90px" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.type == 101">{{$t('common.gs')}}</span>
              <span v-else>{{$t('common.gr')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t('common.ragioneSociale')"
            width="280px"
            align="left"
          ></el-table-column>
          <el-table-column :label="$t('common.responsabile')" width="150px" align="left">
            <template slot-scope="scope">
              <span>{{scope.row.firstName}} &nbsp; {{scope.row.lastName}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="vatNumber"
            :label="$t('common.partitaIVA')"
            width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="taxCode"
            :label="$t('common.codicefiscale')"
            width="120px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="recipientCode"
            :label="$t('common.codiceDestinatario')"
            width="100px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="officialEmail"
            :label="$t('common.pEC')"
            width="180px"
            align="left"
          ></el-table-column>
          <el-table-column prop="city" :label="$t('common.cs')" width="120px" align="left"></el-table-column>
          <el-table-column
            prop="province"
            :label="$t('common.sheng')"
            width="90px"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="address"
            :label="$t('common.indirizzo2')"
            width="280px"
            align="left"
          ></el-table-column>
          <el-table-column
            fixed="right"
            width="110"
            align="center"
            :label="$t('common.cz')"
          >
            <template slot-scope="scope">
              <el-button
                type="primary"
                size="mini"
                @click="selectCustomer(scope.row);"
              >{{$t('common.seleziona')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="onCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="totalCount"
        ></el-pagination>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import { getInoviceMerList } from "@/api/api";

export default {
  name: "SelectCustomer",
  components: {},
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      searchForm: {
        keyword:'',
        vatNumber:'',
        taxCode:''
      },
      customerList: [],
      totalCount: 0,
      currentPage: 1,
      pageSize: 10
    };
  },
  methods: {
    // 获取客户列表数据
    loadCustomerList() {
      let params = {
        taxCode:this.searchForm.taxCode,
        vatNumber:this.searchForm.vatNumber,
        keyword:this.searchForm.keyword,
        page:this.currentPage,
        size:this.pageSize
      }
      getInoviceMerList(params).then(res => {
        if (res.code === 20000) {
          this.totalCount = res.data.total;
          this.customerList = res.data.list;
        }
      });
    },
    keywordsChange(val) {
      if (val === "") {
        this.loadCustomerList();
      }
    },
    clearSearchForm() {
      this.searchForm = {
        keyword: "",
        taxCode: '',
        vatNumber: ''
      }
      this.loadCustomerList()
    },
    // 页码变更
    onCurrentChange: function(val) {
      this.currentPage = val;
      this.loadCustomerList();
    },
    searchCustomer() {
      this.loadCustomerList();
    },
    selectCustomer(item) {
      this.modalClose();
      this.$emit("transferItem", item);
    },
    modalClose() {
      // 直接修改父组件的属性
      this.$emit("update:visible", false);
    }
  },
  created() {
    this.loadCustomerList();
  }
};
</script>
<style>
.select-customer-container {
}

.select-customer-container .el-dialog__header {
  display: block;
}

.select-customer-container .el-dialog__body {
  padding: 10px 10px;
  background-color: #f3f4f5;
}
</style>
