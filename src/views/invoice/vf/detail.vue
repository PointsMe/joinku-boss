<template>
    <div class="fullDetail">
      <div class="contentContainer">
        <div class="contentDetail">
          <el-form
            :model="merchantForm"
            :rules="fullDetailRules"
            ref="merchantForm"
            size="middle"
          >
            <div class="baseInfo">
              <div class="title">
                <span class="border"></span>
                <span class="tit">
                  {{ $t("common.jbxx") }}
                </span>
                <span class="require">
                  （ <span class="tag" style="color: red">*</span>
                  {{ $t("common.bitian") }} ）
                </span>
              </div>
              <div class="content">
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label-width="90px" :label="$t('common.type')" prop="company.type">
                      <el-select v-model="merchantForm.company.type" :placeholder="$t('common.qxz')" :disabled="!!merchantForm.id">
                        <el-option v-for="item in customerTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item
                      :label="$t('common.gsmc2')"
                      label-width="90px"
                      prop="company.name"
                      v-if="merchantForm.company.type == 101 || merchantForm.company.type == 103"
                    >
                      <el-input
                        size="middle"
                        v-model="merchantForm.company.name"
                        :placeholder="$t('common.lengthNot80Charact')"
                        maxlength="80"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <el-form-item v-if="merchantForm.company.type == 102" label-width="90px">
                        <span slot="label" style="font-weight: bold;color: #606266;">
                            <span style="color:red;">*</span>
                            {{ $t('common.fullName') }}
                        </span>
                        <el-row>
                            <el-col :span="8">
                                <el-form-item prop="firstName">
                                    <el-input class="ipt" :placeholder="$t('common.grm')" v-model="merchantForm.company.firstName" clearable style="width: 100%;"></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col :span="8" style="margin-left: 22px;">
                                <el-form-item prop="lastName">
                                    <el-input class="ipt" :placeholder="$t('common.grx')" v-model="merchantForm.company.lastName" clearable style="width: 100%;"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>
                    </el-form-item>
                    <el-form-item
                      label-width="90px"
                      v-if="merchantForm.company.type == 101 || merchantForm.company.type == 103"
                      prop="company.vatNumber"
                      label="SIF"
                    >
                      <el-input
                        size="middle"
                        type="text"
                        v-model.trim="merchantForm.company.vatNumber"
                        :placeholder="$t('common.lengthNot28Charact')"
                        maxlength="28"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                    <!-- <el-form-item
                      label-width="90px"
                      v-if="merchantForm.company.type == 101 || merchantForm.company.type == 102"
                      prop="company.taxCode"
                      :label="$t('common.codicefiscale')"
                    >
                      <el-input
                        size="middle"
                        type="text"
                        v-model.trim="merchantForm.company.taxCode"
                        :placeholder="$t('common.lengthMax16min11Charact')"
                        maxlength="16"
                        show-word-limit
                      ></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item
                      :label="$t('common.lxr')"
                      label-width="90px"
                      prop="contactName"
                    >
                      <el-input
                        size="middle"
                        v-model="merchantForm.company.contactName"
                      ></el-input>
                    </el-form-item> -->
                    <el-form-item
                      :label="$t('common.yx')"
                      label-width="90px"
                      prop="contactEmail"
                    >
                      <el-input
                        size="middle"
                        v-model="merchantForm.company.contactEmail"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                        :label="$t('common.lxdh')"
                        label-width="90px"
                        prop="contactPhone"
                      >
                        <el-input
                          size="middle"
                          v-model="merchantForm.company.contactPhone"
                        ></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-row style="margin-bottom: 15px">
                      <el-col :span="24">
                        <el-form-item
                          prop="company.address"
                          :label="$t('common.dz')"
                          label-width="90px"
                        >
                          <el-input
                            v-model="merchantForm.company.address"
                            autosize
                            :placeholder="$t('common.dz')"
                            maxlength="200"
                            show-word-limit
                          ></el-input>
                        </el-form-item>
                        <el-form-item
                          prop="company.houseNumber"
                          :label="$t('common.mph')"
                          label-width="90px"
                        >
                          <el-input
                            v-model="merchantForm.company.houseNumber"
                            autosize
                            :placeholder="$t('common.mph')"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 5px">
                      <el-col :span="14">
                        <el-form-item
                          prop="company.countryId"
                          label-width="90px"
                          :label="$t('common.gj')"
                        >
                          <el-select
                            v-model="merchantForm.company.countryId"
                            @change="
                              selectCountry(merchantForm.company.countryId)
                            "
                            :placeholder="$t('common.gj')"
                            filterable
                          >
                            <el-option
                              v-for="item in countryList"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="1">&nbsp;</el-col>
                      <el-col :span="9">
                        <template>
                          <el-form-item>
                            <el-select
                              v-model="merchantForm.company.provinceId"
                              @change="
                                selectProvince(merchantForm.company.provinceId)
                              "
                              :placeholder="$t('common.sheng')"
                              filterable
                            >
                              <el-option
                                v-for="item in provinceList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </template>
                        <!-- <template v-else>
                          <el-form-item>
                            <el-input
                              :placeholder="$t('common.sheng')"
                              v-model="merchantForm.company.provinceName"
                            ></el-input>
                          </el-form-item>
                        </template> -->
                      </el-col>
                    </el-row>
                    <el-row style="margin-bottom: 20px">
                      <el-col :span="14">
                        <template v-if="merchantForm.company.countryId == 900001">
                          <el-form-item
                            prop="company.city"
                            label-width="90px"
                            :label="$t('common.cs')"
                          >
                            <el-select
                              clearable
                              v-model="merchantForm.company.city"
                              filterable
                            >
                              <el-option
                                v-for="item in cityList"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </template>
                        <template v-else>
                          <el-form-item label-width="90px" prop="company.city">
                            <el-input
                              :placeholder="$t('common.cs')"
                              v-model="merchantForm.company.city"
                            ></el-input>
                          </el-form-item>
                        </template>
                      </el-col>
                      <el-col :span="1">&nbsp;</el-col>
                      <el-col :span="9">
                        <el-form-item prop="company.zipcode">
                          <el-input
                            type="text"
                            v-model.trim="merchantForm.company.zipcode"
                            :placeholder="$t('common.yb')"
                            maxlength="5"
                            show-word-limit
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </div>
            </div>
            <div class="saleInfo" v-if="!merchantForm.id">
              <div class="title">
                <span class="border"></span>
                <span class="tit">
                  {{ $t("common.manager") }}
                </span>
                <span class="require">
                  （ <span class="tag" style="color: red">*</span>
                  {{ $t("common.bitian") }} ）
                </span>
              </div>
              <div class="content">
                <el-row>
                  <el-col :span="24">
                    <el-form-item
                      class="sInfo"
                      label-width="100px"
                      :label="$t('common.account')"
                    >
                      <el-radio v-model="merchantForm.employee.type" :label="1">{{
                        $t("common.yx")
                      }}</el-radio>
                      <el-radio v-model="merchantForm.employee.type" :label="2">{{$t('common.sjh')}}</el-radio>
                    </el-form-item>
                    <el-form-item
                      label-width="100px"
                      :label="$t('common.yx')"
                      prop="employee.email"
                      v-if="merchantForm.employee.type == 1"
                    >
                      <el-input
                        type="text"
                        :placeholder="$t('common.qsrnr')"
                        v-model="merchantForm.employee.email"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label-width="100px"
                      :label="$t('common.sjh')"
                      prop="employee.mobile"
                      v-if="merchantForm.employee.type == 2"
                    >
                      <AreaCode
                        v-on:excountry="showCode"
                        class="area"
                        :areaHeight="height"
                      ></AreaCode>
                      <el-input
                        type="text"
                        :placeholder="$t('common.qsrnr')"
                        v-model="merchantForm.employee.mobile"
                        class="myIpt"
                      ></el-input>
                    </el-form-item>
                    <el-form-item
                      label-width="100px"
                      :label="$t('common.mima')"
                      prop="employee.password"
                    >
                      <el-input
                        type="password"
                        :placeholder="$t('common.qsrnr')"
                        v-model="merchantForm.employee.password"
                        maxlength="32"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
          <div class="opBtn">
            <div
              style="
                width: 1024px;
                height: 100%;
                margin: 0 auto;
                position: relative;
              "
            >
              <el-button
                size="mini"
                @click="goBack()"
                style="position: absolute; top: 12px; left: 94px"
                >{{ $t("common.back") }}</el-button
              >
              <el-button
                type="primary"
                size="mini"
                @click="sure()"
                style="position: absolute; top: 12px; right: -94px"
                >{{ $t("common.save") }}</el-button
              >
            </div>
          </div>
        </div>
      </div>
      <input
        type="file"
        accept="image/gif, image/jpeg, image/jpg, image/png, image/svg"
        @change="changeImage($event)"
        ref="avatarInput"
        style="display: none"
      />
    </div>
  </template>
    <script>
  import {
    vfMerchantCreate,
    vfMerchantUpdate,
    vfMerchantDetail,
    vfVatNumberCheck,
    taxCodeCheck,
    uploadImage,
  } from "@/api/api";
  import Vue from "vue";
  var moment = require("moment");
  import { getCityList, getCountryList, getProvinceList } from "@/api/api";
  import AreaCode from "@/components/areaCode";
  export default {
    name: "vfMerchantDetail",
    components: {
      AreaCode,
    },
    data() {
      const validateCompanyName = (rule, value, callback) => {
          if (this.merchantForm.company.type == 101 || this.merchantForm.company.type == 103) {
              if (!this.merchantForm.company.name || this.merchantForm.company.name === '') {
                  callback(new Error(this.$t('common.qsrnr')))
              } else {
                  if (this.merchantForm.company.name.length < 1 || this.merchantForm.company.name.length > 80) {
                      callback(new Error(this.$t('common.lengthNot80Charact')))
                  }
              }
          }
          callback()
      }
      const validateCompanyTaxNo = (rule, value, callback) => {
          if (this.merchantForm.company.type == 101 || this.merchantForm.company.type == 103) {
              if (!this.merchantForm.company.vatNumber || this.merchantForm.company.vatNumber === '') {
                  callback(new Error(this.$t('common.qsrgssh2')))
              } else {
                  if (this.merchantForm.company.country == 'IT' && (this.merchantForm.company.vatNumber.length < 1 || this.merchantForm.company.vatNumber.length > 28)) {
                      callback(new Error(this.$t('common.lengthNot28Charact')))
                  }else{
                    let params = new URLSearchParams();
                    params.append('vatNumber', this.merchantForm.company.vatNumber);
                    params.append('excludeId', this.merchantForm.id);
                    vfVatNumberCheck(params).then(res => {
                        if (res.data.duplicate) {
                          callback(new Error(this.$t('common.mobileRepeat') + '！'));
                        } else {
                          callback();
                        }
                    });
                  }
              }
          }
          callback()
      }
      const validateFirstName = (rule, value, callback) => {
          if (this.merchantForm.company.type == 102) {
              if (!this.merchantForm.company.firstName || this.merchantForm.company.firstName === '') {
                  callback(new Error(this.$t('common.bitian')))
              } else {
                  if (this.merchantForm.company.firstName.length < 1 || this.merchantForm.company.firstName.length > 60) {
                      callback(new Error(this.$t('common.lengthNot60Charact')))
                  }
              }
          }
          callback()
      }
      const validateLastName = (rule, value, callback) => {
          if (this.merchantForm.company.type == 102) {
              if (!this.merchantForm.company.lastName || this.merchantForm.company.lastName === '') {
                  callback(new Error(this.$t('common.bitian')))
              } else {
                  if (this.merchantForm.company.lastName.length < 1 || this.merchantForm.company.lastName.length > 60) {
                      callback(new Error(this.$t('common.lengthNot60Charact')))
                  }
              }
          }
          callback()
      }
      const validateGeneralTaxNo = (rule, value, callback) => {
          // if (this.merchantForm.company.type == 102) {
              if ((!this.merchantForm.company.taxCode || this.merchantForm.company.taxCode === '') && this.merchantForm.company.type == 102) {
                  callback(new Error(this.$t('common.bitian')))
              } else {
                  if (this.merchantForm.company.country == 'IT' && (this.merchantForm.company.taxCode.length < 11 || this.merchantForm.company.taxCode.length > 16)) {
                      callback(new Error(this.$t('common.lengthMax16min11Charact')))
                  }else{
                    if(this.merchantForm.company.taxCode){
                      let params = new URLSearchParams();
                      params.append('taxCode', this.merchantForm.company.taxCode);
                      params.append('excludeId', this.merchantForm.id);
                      taxCodeCheck(params).then(res => {
                          if (res.data.duplicate) {
                            callback(new Error(this.$t('common.mobileRepeat') + '！'));
                          } else {
                            callback();
                          }
                      });
                    }
                  }
              }
              
          // }
          callback()
      }
      return {
        provinceList: [],
        cityList: [],
        countryList: [],
        customerTypeList: [
            {
                id: 101,
                name: this.$t('common.gs'),
                active: true,
                show:true,
            }, {
                id: 102,
                name: this.$t('common.gr'),
                active: false,
                show:true,
            }, {
                id: 103,
                name: '事业单位',
                active: false,
                show:true,
            }
        ],
        merchantForm: {
          id: "",
          // name: "",
          // logoUrl: "",
          // description: "",
          company: {
            type: 101,
            name: "",
            firstName: "",
            lastName: "",
            vatNumber: "",
            taxCode: "",
            countryId: "900005",
            provinceId: "",
            city: "",
            zipcode: "",
            address: "",
            houseNumber: "",
            contactName: "",
            contactPhone: "",
            contactEmail: "",
          },
          employee: {
            account: "",
            mobile: "",
            email: "",
            password: "",
            type: 2,
          },
        },
        fullDetailRules: {
          "company.type": [
            { required: true, message: this.$t("common.qxz"), trigger: "change" },
          ],
          "employee.mobile": [
            { required: true, message: this.$t("common.qsrnr"), trigger: "blur" },
          ],
          "employee.password": [
            { required: true, message: this.$t("common.qsrnr"), trigger: "blur" },
            { min: 6, max: 32, message: "密码长度6-32位之间", trigger: "blur" },
          ],
          "company.name": [
            { required: true,validator: validateCompanyName, trigger: 'blur' }
          ],
          "company.firstName": [
              { required: true,validator: validateFirstName, trigger: 'blur' }
          ],
          "company.lastName": [
              { required: true,validator: validateLastName, trigger: 'blur' }
          ],
          "company.zipcode": [
            {
              required: true,
              message: this.$t("common.bitian"),
              trigger: "blur",
            },
            // {min: 5, max: 5, message: this.$t('common.validateLength5'), trigger: 'blur'}
          ],
          "company.vatNumber": [
            { required: true,validator: validateCompanyTaxNo, trigger: 'blur' }
          ],
          "company.taxCode": [
              { validator: validateGeneralTaxNo, trigger: 'blur' }
          ],
          "company.address": [
            {
              required: true,
              message: this.$t("common.bitian"),
              trigger: "blur",
            },
          ],
          "company.countryId": [
            { required: true, message: this.$t("common.qxz"), trigger: "change" },
          ],
          "company.city": [
            {
              required: true,
              message: this.$t("common.qsrnr"),
              trigger: "change",
            },
          ],
          "company.type": [
            { required: true, message: this.$t("common.qxz"), trigger: "change" },
          ],
          "company.cityName": [
            { required: true, message: this.$t("common.qsrnr"), trigger: "blur" },
          ],
        },
        nums: "",
        height: "40px",
      };
    },
    methods: {
      goBack() {
        this.$router.back();
      },
      showCode(data) {
        this.nums = data.dialCode;
      },
      upLoad(i) {
        this.$refs.avatarInput.dispatchEvent(new MouseEvent("click"));
      },
      changeImage(e) {
        var that = this;
        let files = that.$refs.avatarInput.files[0];
        let form = new FormData();
        // 后端接受参数 ，可以接受多个参数
        form.append("image", files);
        uploadImage(form)
          .then((res) => {
            if (res.code == 20000) {
              that.$message({
                message: res.msg,
                type: "success",
              });
              that.merchantForm.logoUrl = res.data.url;
            } else {
              that.$message.error(res.msg);
            }
          })
          ["catch"](function () {});
      },
  
      initCountry() {
        getCountryList()
          .then((response) => {
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
      initProvince(countryId) {
        var params = new URLSearchParams();
        params.append("countryId", countryId);
        getProvinceList(params)
          .then((response) => {
            if (response.code === 20000) {
              this.provinceList = response.data;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error);
          });
      },
      initCity(provinceId) {
        var params = new URLSearchParams();
        params.append("provinceId", provinceId);
        getCityList(params)
          .then((response) => {
            if (response.code === 20000) {
              this.cityList = response.data;
            } else {
              this.$message.error(res.msg);
            }
          })
          .catch((error) => {
            this.$message.error(error);
          });
      },
      selectCountry(dt) {
        this.merchantForm.company.provinceId = "";
        this.merchantForm.company.city = "";
        if (dt) {
          this.initProvince(dt);
        }
      },
      selectProvince(dt) {
        // this.merchantForm.company.city = "";
        if (dt) {
          this.initCity(dt);
        }
      },
      sure() {
        this.$refs.merchantForm.validate((valid) => {
          if (valid) {
            this.merchantForm.company.city = this.merchantForm.company.city.trim();
            this.merchantForm.company.zipcode = this.merchantForm.company.zipcode.trim();
            let params = {
              type: this.merchantForm.company.type,
              name: this.merchantForm.company.name,
              firstName: this.merchantForm.company.firstName,
              lastName: this.merchantForm.company.lastName,
              vatNumber: this.merchantForm.company.vatNumber,
              taxCode: this.merchantForm.company.taxCode,
              countryId:  this.merchantForm.company.countryId,
              provinceId:  this.merchantForm.company.provinceId,
              city: this.merchantForm.company.city,
              zipcode:  this.merchantForm.company.zipcode,
              address:  this.merchantForm.company.address,
              houseNumber:  this.merchantForm.company.houseNumber,
              // contactName: this.merchantForm.company.contactName,
              contactPhone: this.merchantForm.company.contactPhone,
              contactEmail:  this.merchantForm.company.contactEmail,
            };
            if (this.merchantForm.id) {
              params['id'] = this.merchantForm.id;
              vfMerchantUpdate(params).then((res) => {
                if (res.code == 20000) {
                  this.$message({
                    message: res.msg,
                    type: "success",
                  });
                  this.$router.back();
                } else {
                  this.$message.error(res.msg);
                }
              });
            } else {
              let account = "";
              if (this.merchantForm.employee.type == 1) {
                account = this.merchantForm.employee.email.trim();
              } else {
                account = this.nums + "-" + this.merchantForm.employee.mobile;
              }
              params['account'] = account;
              params['password'] = this.merchantForm.employee.password;
              vfMerchantCreate(params)
                .then((res) => {
                  if (res.code == 20000) {
                    this.$message({
                      message: res.msg,
                      type: "success",
                    });
                    this.$router.back();
                  } else {
                    this.$message.error(res.msg);
                  }
                })
                ["catch"](() => {});
            }
          }
        });
      },
      getDetail() {
        let that = this;
        let params = new URLSearchParams();
        params.append("id", this.merchantForm.id);
        vfMerchantDetail(params).then((res) => {
          if (res.code === 20000) {
            this.merchantForm = {
              id: this.merchantForm.id,
              company: {
                type: res.data.type,
                name: res.data.name,
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                vatNumber: res.data.vatNumber,
                taxCode: res.data.taxCode,
                countryId: res.data.country
                  ? res.data.country.id
                  : "",
                provinceId: res.data.province
                  ? res.data.province.id
                  : "",
                city: res.data.city,
                // provinceName:'',
                // cityName:'',
                address:res.data.address,
                zipcode: res.data.zipcode,
                houseNumber: res.data.houseNumber,
                contactName: res.data.contactName,
                contactPhone: res.data.contactPhone,
                contactEmail: res.data.contactEmail,
              },
            };
            if (res.data.country) {
              this.initProvince(res.data.country.id);
            }
            if (res.data.province) {
              this.initCity(res.data.province.id);
            }
          }
        });
      },
    },
    mounted() {
      this.initCountry();
      if (this.$route.query.id) {
        this.merchantForm.id = this.$route.query.id;
        this.getDetail();
      }else{
        this.initProvince(this.merchantForm.company.countryId)
      }
    },
    computed: {},
    filters: {},
    watch: {},
  };
  </script>
    <style rel="stylesheet/scss" lang="scss" scoped>
  .maps-css {
    height: 200px;
    margin-top: 14px;
  }
  .fullDetail {
    width: 100%;
    height: 100%;
  
    /*background: #ededed;*/
    .contentContainer {
      width: 100%;
      height: 100%;
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
            border-bottom: 1px solid #ccc;
  
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
          /*margin-bottom: 100px;
            display: inline-grid;
            width: 100%;*/
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
  .myIpt{
      /deep/ .el-input__inner {
          padding-left: 60px;
      }  
  } 
  </style>
    