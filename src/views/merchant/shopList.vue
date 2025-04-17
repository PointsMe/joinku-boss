<template>
    <el-container>
      <el-header style="height: auto;padding: 0 0 20px 0">
        <div class="search">
            <div class="search-item">
                <span class="search-item-label">{{ $t("common.mingcheng") }}:</span>
                <el-input
                    v-model="searchForm.name"
                    size="mini"
                    :placeholder="$t('common.qsrnr')"
                    clearable
                    @change="searchDo"
                ></el-input>
            </div>
            <div class="search-item">
                <span class="search-item-label">{{ $t("common.gssh") }}:</span>
                <el-input
                    v-model="searchForm.vatNumber"
                    size="mini"
                    :placeholder="$t('common.qsrnr')"
                    clearable
                    @change="searchDo"
                ></el-input>
            </div>
            <div class="search-item">
                <span class="search-item-label">{{ $t("common.tysh") }}:</span>
                <el-input
                    v-model="searchForm.taxCode"
                    size="mini"
                    :placeholder="$t('common.qsrnr')"
                    clearable
                    @change="searchDo"
                ></el-input>
            </div>
            <div class="search-item">
                <span class="search-item-label">{{ $t("common.gj") }}:</span>
                <el-select
                    v-model="searchForm.country"
                    :placeholder="$t('common.qxz')"
                    size="mini"
                    clearable
                    @change="searchDo"
                >
                    <el-option
                        v-for="item in countryList"
                        :key="item.code"
                        :label="item.name"
                        :value="item.code"
                    ></el-option>
                </el-select>
            </div>
            <div class="search-handle">
                <el-button type="primary" size="mini" @click="searchDo()">{{ $t('common.sousuo') }}</el-button>
                <el-button type="info" size="mini" @click="emptySearch()">{{ $t('common.qk') }}</el-button>
                <el-button type="primary" size="mini" @click="add();">{{ $t('common.add') }}</el-button>
            </div>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <!-- :summary-method="getSummaries"
            show-summary -->
        <div class="table_container">
          <el-table
            :data="shopList"
            :height="heightDate"
            ref="table"
            class="table-fixed"
            style="width: 100%"
          >
          <el-table-column prop="name" :label="$t('common.jbxx')" min-width="300" align="left" header-align="left">
                <template slot-scope="scope">
                <div style="display:flex;align-items: center;">
                    <el-image :src="scope.row.logoUrl" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;" v-if="scope.row.logoUrl">
                        <div slot="error" class="image-slot">
                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;"/>
                        </div>
                    </el-image>
                    <div v-if="!scope.row.logoUrl" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                        <img src="../../assets/images/default.png" style="width: 50px;height: 50px;">
                    </div>
                    <div style="display:flex;flex-direction: column;text-align: left;marginLeft:10px;">
                        <el-tag type="success" size="medium">
                            {{ scope.row.id }}
                        </el-tag>
                        <span>{{ scope.row.name }}</span>
                    </div>
                </div>
                </template>
            </el-table-column>
            <el-table-column prop="company" :label="$t('common.companyInfo')" align="left" header-align="left" width="300">
                <template slot-scope="scope">
                    <p>
                        <span>{{scope.row.company.firstName}} {{scope.row.company.lastName}}</span>
                    </p>
                    <p>
                        <span>{{scope.row.company.name}}</span>
                    </p>
                    <p style="color: #777777">
                        <span>{{scope.row.company.vatNumber}}</span>&nbsp;&nbsp;<span>{{scope.row.company.taxCode}}</span>
                    </p>
                    <p style="color: #777777">
                        <span>{{scope.row.company.address}} {{scope.row.company.houseNumber}} <span v-if="scope.row.company.city">-{{scope.row.company.city}}</span><span v-if="scope.row.company.province">-{{scope.row.company.province.name}}</span> </span><span v-if="scope.row.company.country">-{{scope.row.company.country.name}}</span>
                    </p>
                </template>
            </el-table-column>
            <el-table-column prop="address" :label="$t('common.addrInfo')" align="left" header-align="left" width="300">
                <template slot-scope="scope">
                <div v-if="scope.row.address">
                    <p>{{ scope.row.address.address }}</p>
                    <p style="color: #777777">
                        <span>
                            <span v-if="scope.row.address.city">{{scope.row.address.city}}</span>
                            <span v-if="scope.row.address.province">-{{ scope.row.address.province.name }}</span>
                        </span>
                        <span v-if="scope.row.address.country">-{{ scope.row.address.country.name }}</span>
                        <span>-{{ scope.row.address.zipcode }}</span>
                    </p>
                    <p style="color: #777777">
                        {{ scope.row.address.contactName }}
                        {{ scope.row.address.contactPhone }}
                        <!-- {{ scope.row.address.contactEmail }} -->
                    </p>
                </div>
                </template>
            </el-table-column>
            <el-table-column prop="contactName" header-align="center" align="left" :label="$t('common.linkmanInfo')" width="240">
                <template slot-scope="scope">
                <p v-if="scope.row.company">{{scope.row.company.contactName}}</p>
                <p v-if="scope.row.company">{{scope.row.company.contactPhone}}</p>
                <p v-if="scope.row.company">{{scope.row.company.contactEmail}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" :label="$t('common.creatTime')" align="center" width="140px">
                <template slot-scope="scope">
                    <span>{{ scope.row.createdAt | timeChange }}</span>
                </template>
            </el-table-column> 
            <el-table-column align="center" header-align="center" width="200" :label="$t('common.cz')" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" type="text" @click="showDeviceLicence(scope.row)">{{ $t("common.licence") }}</el-button>
                <el-button size="mini" type="text" @click="revise(scope.row)">{{$t("common.xg")}}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="totalCount"
            ></el-pagination>
          </div>
        </div>
      </el-main>
      <Host :showHost="showHost" :chooseItem="chooseItem" @closeHost="closeHost"></Host>
    </el-container>
  </template>
  <script>
  import Vue from "vue";
  import {
    o2oShopPage,
    getCountryList
  } from "@/api/api";
  import Host from '@/views/components/host';
  var moment = require("moment");
  export default {
    name: "shopList",
    components: {
        Host
    },
    data() {
      return {
          heightDate: "100",
          //默认数据总数
          totalCount: 0,
          //当前页码
          currentPage: 1,
          //默认每页数据量 €
          pagesize: 15,
          shopList: [],
          countryList: [],
          searchForm: {
            name:'',
            vatNumber:'',
            taxCode:'',
            country:'',
          },
          showHost:false,
          chooseItem:'',
      };
    },
    methods: {
        initCountry() {
            getCountryList().then((response) => {
                if (response.code === 20000) {
                    this.countryList = response.data;
                } else {
                    this.$message.error(res.msg);
                }
            })
            .catch((error) => {
                this.$message.error(error);
            });
        },
      searchDo() {
        this.currentPage = 1;
        this.pagesize = 15;
        this.getShopList(this.currentPage, this.pagesize);
      },
      emptySearch() {
        this.searchForm = {
            name:'',
            vatNumber:'',
            taxCode:'',
            country:'',
        };
        this.currentPage = 1;
        this.pagesize = 15;
        this.getShopList(this.currentPage, this.pagesize);
      },
      //每页显示数据量变更
      handleSizeChange(val) {
        this.pagesize = val;
      },
      //页码变更
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getShopList(this.currentPage, this.pagesize);
      },
      doQuery() {
        this.currentPage = 1;
        this.pagesize = 15;
        this.getShopList(this.currentPage, this.pagesize);
      },
  
        getShopList(page, rows) {
            var that = this;
            let params = {
                page:page,
                size:rows,
                name:this.searchForm.name,
                vatNumber:this.searchForm.vatNumber,
                taxCode:this.searchForm.taxCode,
                country:this.searchForm.country,
            }
            o2oShopPage(params).then(function(res) {
                if (res.code == 20000) {
                that.totalCount = res.data.total;
                that.shopList = res.data.list;
                // 展示数据内容优化
                let lookHeight = 0;
                if (that.shopList.length > 0) {
                    if (that.$refs && that.$refs.table && that.$refs.table.$el) {
                    lookHeight = window.innerHeight - that.$refs.table.$el.offsetTop;
                    }
                }
                that.$nextTick(() => {
                    let headHeight = document.querySelectorAll("thead")[0]
                    .offsetHeight;
    
                    that.heightDate = lookHeight - headHeight - 100;
                });
                } else {
                that.$message.error(res.msg);
                }
            })
            .catch(function() {});
        },
        add(){
            this.$router.push({ name: 'ShopDetail' });
        },
        revise(row) {
            this.$router.push({name: "ShopDetail", query: {id: row.id}});
        },
        showDeviceLicence(dt) {
            this.chooseItem = dt;
            this.showHost = true;
        },
        closeHost(){
            this.showHost = false;
            this.chooseItem = '';
        },
    },
    watch: {
    
    },
    created() {
    
    },
    mounted() {
        this.initCountry()
        this.getShopList(this.currentPage, this.pagesize);
    },
    computed: {},
    filters: {
      timeChange(val) {
        if (val) {
          return moment(val).format("YYYY-MM-DD HH:mm:ss");
        } else {
          return "-";
        }
      },
    }
  };
  </script>
  <style lang="scss" scoped>
 .search {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: #ffffff;
    
    .search-item {
        height: 40px;
        display: flex;
        align-items: center;
        padding-right: 30px;
        
        .search-item-label {
            font-size: 14px;
            color: #272727;
            margin-right: 3px;
        }
        
        /deep/ .el-input {
            width: 160px;
        }
    }
    
    .search-handle {
        height: 40px;
        display: flex;
        align-items: center;
    }
}
  </style>
  
  
  