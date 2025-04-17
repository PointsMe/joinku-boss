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
                                    <el-form-item label-width="90px" label="LOGO">
                                        <img
                                            class="”cusp“"
                                            @click="upLoad()"
                                            :src="merchantForm.logoUrl"
                                            alt
                                            v-if="merchantForm.logoUrl"
                                            style="width: 100px; height: 100px; cursor: pointer"
                                        />
                                        <i
                                            class="el-icon-plus cusp"
                                            v-else
                                            @click="upLoad()"
                                            style="
                        width: 100px;
                        height: 100px;
                        line-height: 100px;
                        border: 1px solid #ccc;
                        border-radius: 4px;
                        text-align: center;
                        font-size: 20px;
                      "
                                        ></i>
                                    </el-form-item>
                                    <el-form-item
                                        :label="$t('common.wholesalerName')"
                                        label-width="90px"
                                        prop="name"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.name"
                                            :placeholder="$t('common.qsrnr')"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        :label="$t('common.gsmc2')"
                                        label-width="90px"
                                        prop="company.name"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.company.name"
                                            :placeholder="$t('common.lengthNot80Charact')"
                                            maxlength="80"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <template v-if="merchantForm.company.countryId == 900003">
                                        <el-form-item
                                            label-width="90px"
                                            label="N.Siret"
                                            prop="company.siret"
                                        >
                                            <el-input
                                                :placeholder="$t('common.qsrnr')"
                                                v-model="merchantForm.company.siret"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item
                                            label-width="90px"
                                            label="Code NAF"
                                            prop="company.naf"
                                        >
                                            <el-input
                                                :placeholder="$t('common.qsrnr')"
                                                v-model="merchantForm.company.naf"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item
                                            label-width="90px"
                                            label="RCS"
                                            prop="company.rcs"
                                        >
                                            <el-input
                                                :placeholder="$t('common.qsrnr')"
                                                v-model="merchantForm.company.rcs"
                                            ></el-input>
                                        </el-form-item>
                                        <el-form-item
                                            label-width="90px"
                                            label="Capital Social"
                                            prop="company.cs"
                                        >
                                            <el-input
                                                :placeholder="$t('common.qsrnr')"
                                                v-model="merchantForm.company.cs"
                                                type="number"
                                            >
                                                <template slot="append">€</template>
                                            </el-input
                                            >
                                        </el-form-item>
                                    </template>
                                    <el-form-item
                                        :label="$t('common.virPhoneNum')"
                                        label-width="90px"
                                        prop="nfonNumber"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.nfonNumber"
                                            maxlength="16"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item
                                        label-width="90px"
                                        prop="company.vatNumber"
                                        :label="$t('common.partitaIVA')"
                                    >
                                        <el-input
                                            size="middle"
                                            type="text"
                                            v-model.trim="merchantForm.company.vatNumber"
                                            :placeholder="$t('common.lengthNot32Charact')"
                                            maxlength="32"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        label-width="90px"
                                        prop="company.taxCode"
                                        :label="$t('common.codicefiscale')"
                                    >
                                        <el-input
                                            size="middle"
                                            type="text"
                                            v-model.trim="merchantForm.company.taxCode"
                                            :placeholder="$t('common.lengthNot32Charact')"
                                            maxlength="32"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
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
                                        </el-col>
                                    </el-row>
                                    <el-row style="margin-bottom: 5px">
                                        <el-col :span="14">
                                            <el-form-item
                                                prop="company.countryId"
                                                label-width="90px"
                                                :label="$t('common.gj')">
                                                <el-select
                                                    v-model="merchantForm.company.countryId"
                                                    @change="selectCountry(merchantForm.company.countryId)"
                                                    :placeholder="$t('common.gj')"
                                                    filterable>
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
                                            <template v-if="merchantForm.company.countryId == 900001">
                                                <el-form-item>
                                                    <el-select
                                                        v-model="merchantForm.company.provinceId"
                                                        @change="selectProvince(merchantForm.company.provinceId)"
                                                        :placeholder="$t('common.sheng')"
                                                        filterable>
                                                        <el-option
                                                            v-for="item in provinceList"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id"
                                                        ></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </template>
                                            <template v-else>
                                                <el-form-item>
                                                    <el-input
                                                        :placeholder="$t('common.sheng')"
                                                        v-model="merchantForm.company.provinceName"
                                                    ></el-input>
                                                </el-form-item>
                                            </template>
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
                                                    maxlength="16"
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
                                        :label="$t('common.account')">
                                        <el-radio v-model="merchantForm.employee.type" :label="2">
                                            {{ $t('common.sjh') }}
                                        </el-radio>
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
                    <div class="saleInfo">
                        <div class="title">
                            <span class="border"></span>
                            <span class="tit">
                                {{ $t("common.contactInfo") }}
                            </span>
                            <span class="require">
                                （ <span class="tag" style="color: red">*</span>
                                {{ $t("common.bitian") }} ）
                            </span>
                        </div>
                        <div class="content">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-form-item
                                        :label="$t('common.lxr')"
                                        label-width="90px"
                                        prop="contactName"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.company.contactName"
                                        ></el-input>
                                    </el-form-item>
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
                                </el-col>
                                <el-col :span="12">
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
                                    <!-- <el-form-item label-width="90px" :label="$t('common.ower')" prop="employee" v-if="!merchantForm.id">
                                            <el-button icon="el-icon-circle-plus-outline" @click="addOwner();" :disabled="!!merchantForm.id"></el-button>
                                            <span v-if="merchantForm.employee">{{merchantForm.employee.account}}</span>
                                        </el-form-item> -->
                                </el-col>
                            </el-row>
                            <el-row :gutter="20">
                                <el-col :span="24">
                                    <el-form-item
                                        label-width="90px"
                                        :label="$t('common.miaoshu')"
                                        prop="description"
                                    >
                                        <el-input
                                            type="textarea"
                                            v-model="merchantForm.description"
                                            :rows="3"
                                            maxlength="1000"
                                            show-word-limit
                                        ></el-input>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div class="payInfo">
                        <div class="title">
                            <span class="border"></span>
                            <span class="tit">
                                {{ $t("common.addrInfo") }}
                            </span>
                            <span class="require">
                                （ <span class="tag" style="color: red">*</span>
                                {{ $t("common.bitian") }} ）
                            </span>
                        </div>
                        <div class="content">
                            <el-row :gutter="20">
                                <el-col :span="12">
                                    <el-row>
                                        <el-col :span="14">
                                            <el-form-item
                                                prop="address.countryId"
                                                label-width="100px"
                                                :label="$t('common.gj')">
                                                <el-select
                                                    v-model="merchantForm.address.countryId"
                                                    @change="selectCountry2(merchantForm.address.countryId)"
                                                    :placeholder="$t('common.gj')"
                                                    filterable>
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
                                            <template v-if="merchantForm.address.countryId == 900001">
                                                <el-form-item prop="address.provinceId">
                                                    <el-select
                                                        v-model="merchantForm.address.provinceId"
                                                        @change="selectProvince2(merchantForm.address.provinceId)"
                                                        :placeholder="$t('common.sheng')"
                                                        filterable>
                                                        <el-option
                                                            v-for="item in provinceList2"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id">
                                                        </el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </template>
                                            <template v-else>
                                                <el-form-item>
                                                    <el-select
                                                        v-model="merchantForm.address.provinceId"
                                                        @change="selectProvince2(merchantForm.address.provinceId)"
                                                        :placeholder="$t('common.sheng')"
                                                        filterable
                                                        clearable>
                                                        <el-option
                                                            v-for="item in provinceList2"
                                                            :key="item.id"
                                                            :label="item.name"
                                                            :value="item.id"
                                                        ></el-option>
                                                    </el-select>
                                                </el-form-item>
                                            </template>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="14">
                                            <template v-if="merchantForm.address.countryId == 900001">
                                                <el-form-item
                                                    prop="address.city"
                                                    label-width="100px"
                                                    :label="$t('common.cs')"
                                                >
                                                    <el-select
                                                        clearable
                                                        v-model="merchantForm.address.city"
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
                                                <el-form-item
                                                    label-width="100px"
                                                    :label="$t('common.cs')"
                                                    prop="address.city"
                                                >
                                                    <el-input
                                                        :placeholder="$t('common.cs')"
                                                        v-model="merchantForm.address.city"
                                                    ></el-input>
                                                </el-form-item>
                                            </template>
                                        </el-col>
                                        <el-col :span="1">&nbsp;</el-col>
                                        <el-col :span="9">
                                            <el-form-item prop="address.zipcode">
                                                <el-input
                                                    type="text"
                                                    v-model.trim="merchantForm.address.zipcode"
                                                    :placeholder="$t('common.yb')"
                                                    maxlength="16"
                                                    show-word-limit
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item
                                                prop="address.address"
                                                :label="$t('common.dz')"
                                                label-width="100px"
                                            >
                                                <el-input
                                                    type="text"
                                                    v-model="merchantForm.address.address"
                                                    :placeholder="$t('common.dz')"
                                                ></el-input>
                                                <div style="margin-top: 14px">
                                                    <el-input
                                                        type="number"
                                                        min="-180"
                                                        max="180"
                                                        :placeholder="$t('common.longitude')"
                                                        v-model="merchantForm.address.longitude"
                                                        style="width: 140px"
                                                    ></el-input>
                                                    <el-input
                                                        type="number"
                                                        min="-90"
                                                        max="90"
                                                        :placeholder="$t('common.latitude')"
                                                        v-model="merchantForm.address.latitude"
                                                        style="width: 140px"
                                                    ></el-input>
                                                </div>
                                                <div id="map" class="maps-css"></div>
                                            </el-form-item>
                                            <el-form-item
                                                class="sInfo"
                                                label-width="140px"
                                                :label="$t('common.mapSearch')"
                                            >
                                                <el-input
                                                    style="width: 100%"
                                                    v-model="searchValue"
                                                    id="pac-input"
                                                    class="searchInput controls"
                                                    placeholder="搜索 Google 地图"
                                                    size="mini"
                                                    clearable
                                                ></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item
                                        :label="$t('common.lxr')"
                                        label-width="100px"
                                        prop="contactName"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.address.contactName"
                                        ></el-input>
                                    </el-form-item>
                                    <el-form-item
                                        :label="$t('common.lxdh')"
                                        label-width="100px"
                                        prop="contactPhone"
                                    >
                                        <el-input
                                            size="middle"
                                            v-model="merchantForm.address.contactPhone"
                                        ></el-input>
                                    </el-form-item>
                                    <!-- <el-form-item
                                      :label="$t('common.yx')"
                                      label-width="100px"
                                      prop="contactEmail"
                                    >
                                      <el-input
                                        size="middle"
                                        v-model="merchantForm.address.contactEmail"
                                      ></el-input>
                                    </el-form-item> -->
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
                        >{{ $t("common.back") }}
                        </el-button
                        >
                        <el-button
                            type="primary"
                            size="mini"
                            @click="sure()"
                            style="position: absolute; top: 12px; right: -94px"
                        >{{ $t("common.save") }}
                        </el-button
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
    getSupplierCreate,
    getSupplierDetail,
    getSupplierUpdate,
    uploadImage,
} from "@/api/api";
import Vue from "vue";

var moment = require("moment");
import {getCityList, getCountryList, getProvinceList} from "../../api/api";
import AreaCode from "@/components/areaCode";

export default {
    name: "SupplierDetail",
    components: {
        AreaCode,
    },
    data() {
        return {
            searchValue: "",
            map: null,
            marker: null,
            markersArray: [],
            provinceList: [],
            provinceList2: [],
            cityList: [],
            countryList: [],
            merchantForm: {
                id: "",
                name: "",
                logoUrl: "",
                description: "",
                nfonNumber: '',
                company: {
                    type: 101,
                    name: "",
                    firstName: "",
                    lastName: "",
                    vatNumber: "",
                    taxCode: "",
                    countryId: "",
                    provinceId: "",
                    city: "",
                    zipcode: "",
                    address: "",
                    houseNumber: "",
                    contactName: "",
                    contactPhone: "",
                    contactEmail: "",
                    siret: "",
                    naf: "",
                    cs: "",
                    rcs: "",
                },
                address: {
                    countryId: "",
                    provinceId: "",
                    city: "",
                    zipcode: "",
                    address: "", //P.za del Duomo, 110, 20122 Milano MI, Italy
                    latitude: "", //45.4642035
                    longitude: "", //9.189982
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
                "employee.email": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "employee.mobile": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "employee.password": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                    {min: 6, max: 32, message: "密码长度6-32位之间", trigger: "blur"},
                ],
                name: [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "company.name": [
                    {
                        required: true,
                        message: this.$t("common.bitian"),
                        trigger: "blur",
                    },
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
                    {
                        required: true,
                        message: this.$t("common.bitian"),
                        trigger: "blur",
                    },
                ],
                // 'company.taxCode':[
                //     {min: 30, max: 32, message:'长度30-32位之间' , trigger: 'blur'}
                // ],
                "company.address": [
                    {
                        required: true,
                        message: this.$t("common.bitian"),
                        trigger: "blur",
                    },
                ],
                "company.countryId": [
                    {required: true, message: this.$t("common.qxz"), trigger: "change"},
                ],
                "company.city": [
                    {
                        required: true,
                        message: this.$t("common.qsrnr"),
                        trigger: "change",
                    },
                ],
                "company.type": [
                    {required: true, message: this.$t("common.qxz"), trigger: "change"},
                ],
                "company.cityName": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "company.siret": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "company.naf": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "company.rcs": [
                    {required: true, message: this.$t("common.qsrnr"), trigger: "blur"},
                ],
                "company.cs": [
                    {
                        required: false,
                        message: this.$t("common.qsrnr"),
                        trigger: "blur",
                    },
                ],
                "address.address": [
                    {
                        required: true,
                        message: this.$t("common.bitian"),
                        trigger: "blur",
                    },
                ],
                "address.countryId": [
                    {required: true, message: this.$t("common.qxz"), trigger: "change"},
                ],
                "address.city": [
                    {
                        required: true,
                        message: this.$t("common.qsrnr"),
                        trigger: "change",
                    },
                ],
                "address.zipcode": [
                    {
                        required: true,
                        message: this.$t("common.bitian"),
                        trigger: "blur",
                    },
                    // {min: 5, max: 5, message: this.$t('common.validateLength5'), trigger: 'blur'}
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
                ["catch"](function () {
            });
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
        initProvince2(countryId) {
            var params = new URLSearchParams();
            params.append("countryId", countryId);
            getProvinceList(params)
                .then((response) => {
                    if (response.code === 20000) {
                        this.provinceList2 = response.data;
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
        selectCountry2(dt) {
            this.merchantForm.address.provinceId = "";
            this.merchantForm.address.city = "";
            if (dt) {
                this.initProvince2(dt);
            }
        },
        selectProvince(dt) {
            this.merchantForm.company.city = "";
            if (dt) {
                this.initCity(dt);
            }
        },
        selectProvince2(dt) {
            this.merchantForm.address.city = "";
            if (dt) {
                this.initCity(dt);
            }
        },
        sure() {
            this.$refs.merchantForm.validate((valid) => {
                if (valid) {
                    this.merchantForm.company.address =
                        this.merchantForm.company.address.trim();
                    this.merchantForm.company.city =
                        this.merchantForm.company.city.trim();
                    this.merchantForm.company.zipcode =
                        this.merchantForm.company.zipcode.trim();
                    this.merchantForm.address.address =
                        this.merchantForm.address.address.trim();
                    
                    let params = {
                        channel: this.merchantForm.channel,
                        name: this.merchantForm.name,
                        logoUrl: this.merchantForm.logoUrl,
                        description: this.merchantForm.description,
                        nfonNumber: this.merchantForm.nfonNumber,
                        company: this.merchantForm.company,
                        employee: this.merchantForm.employee,
                        address: this.merchantForm.address,
                    };
                    if (this.merchantForm.id) {
                        params.id = this.merchantForm.id;
                        getSupplierUpdate(params).then((res) => {
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
                        params.employee = {
                            account: account,
                            password: this.merchantForm.employee.password,
                        };
                        getSupplierCreate(params)
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
                            ["catch"](() => {
                        });
                    }
                }
            });
        },
        getDetail() {
            let that = this;
            let params = new URLSearchParams();
            params.append("id", this.merchantForm.id);
            getSupplierDetail(params).then((res) => {
                if (res.code === 20000) {
                    this.merchantForm = {
                        id: this.merchantForm.id,
                        channel: res.data.channel,
                        name: res.data.name,
                        logoUrl: res.data.logoUrl,
                        description: res.data.description,
                        nfonNumber: res.data.nfonNumber,
                        company: {
                            type: 101,
                            name: res.data.company.name,
                            firstName: res.data.company.firstName,
                            lastName: res.data.company.lastName,
                            vatNumber: res.data.company.vatNumber,
                            taxCode: res.data.company.taxCode,
                            countryId: res.data.company.country
                                ? res.data.company.country.id
                                : "",
                            provinceId: res.data.company.province
                                ? res.data.company.province.id
                                : "",
                            city: res.data.company.city,
                            // provinceName:'',
                            // cityName:'',
                            zipcode: res.data.company.zipcode,
                            address: res.data.company.address,
                            houseNumber: res.data.company.houseNumber,
                            contactName: res.data.company.contactName,
                            contactPhone: res.data.company.contactPhone,
                            contactEmail: res.data.company.contactEmail,
                            siret: res.data.company.siret,
                            naf: res.data.company.naf,
                            cs: res.data.company.cs,
                            rcs: res.data.company.rcs,
                        },
                        address: res.data.address
                            ? {
                                countryId: res.data.address.country
                                    ? res.data.address.country.id
                                    : "",
                                provinceId: res.data.address.province
                                    ? res.data.address.province.id
                                    : "",
                                // cityId: res.data.address.city?res.data.address.city.id:'',
                                city: res.data.address.city,
                                zipcode: res.data.address.zipcode,
                                address: res.data.address.address,
                                latitude: res.data.address.latitude,
                                longitude: res.data.address.longitude,
                                contactName: res.data.address.contactName,
                                contactPhone: res.data.address.contactPhone,
                                contactEmail: res.data.address.contactEmail,
                            }
                            : {
                                countryId: "",
                                provinceId: "",
                                city: "",
                                zipcode: "",
                                address: "", //P.za del Duomo, 110, 20122 Milano MI, Italy
                                latitude: "", //45.4642035
                                longitude: "", //9.189982
                                contactName: "",
                                contactPhone: "",
                                contactEmail: "",
                            },
                        employee: null,
                    };
                    if (res.data.company.country) {
                        this.initProvince(res.data.company.country.id);
                    }
                    if (res.data.company.province) {
                        this.initCity(res.data.company.province.id);
                    }
                    if (res.data.address) {
                        if (res.data.address.country) {
                            this.initProvince2(res.data.address.country.id);
                        }
                        if (res.data.address.province) {
                            this.initCity(res.data.address.province.id);
                        }
                    }
                }
            });
        },
        addMarker(latLng, map) {
            if (this.markersArray.length > 0) {
                this.markersArray[0].setMap(null);
            }
            this.markersArray.shift(this.marker);
            this.marker = new google.maps.Marker({
                position: latLng,
                map: map,
            });
            this.markersArray.push(this.marker);
        },
        mapMarker(e) {
            var that = this;
            this.merchantForm.address.longitude = e.latLng.lng();
            this.merchantForm.address.latitude = e.latLng.lat();
            this.addMarker(e.latLng, this.map);
            new google.maps.Geocoder().geocode(
                {
                    latLng: new google.maps.LatLng(
                        that.merchantForm.address.latitude,
                        that.merchantForm.address.longitude
                    ),
                },
                function (res) {
                    if (res.length > 0) {
                        that.merchantForm.address.address = res[0].formatted_address;
                        that.searchValue = res[0].formatted_address;
                        var infowindow = new google.maps.InfoWindow({
                            content:
                                that.$t("common.longitude") +
                                "：" +
                                that.merchantForm.address.longitude.toFixed(6) +
                                "，" +
                                that.$t("common.latitude") +
                                "：" +
                                that.merchantForm.address.latitude.toFixed(6) +
                                "，" +
                                that.$t("common.dz") +
                                "：" +
                                res[0].formatted_address,
                        });
                        infowindow.open(that.map, that.marker);
                        infowindow = null;
                    } else {
                        that.$message.error(that.$t("common.pchooseRightAddr"));
                    }
                }
            );
        },
        initMap() {
            var that = this;
            return new Promise((rev, rej) => {
                if (!that.merchantForm.address.latitude) {
                    var latitude = 41.7;
                } else {
                    var latitude = that.merchantForm.address.latitude;
                }
                if (!that.merchantForm.address.longitude) {
                    var longitude = 12.5;
                } else {
                    var longitude = that.merchantForm.address.longitude;
                }
                this.GoogleMapsLoader.load((google) => {
                    let options = {
                        zoom: 5,
                        center: {
                            lat: latitude,
                            lng: longitude,
                        },
                    };
                    this.map = new google.maps.Map(
                        document.getElementById("map"),
                        options
                    );
                    google.maps.event.addListener(this.map, "click", this.mapMarker);
                    this.addMarker(new google.maps.LatLng(latitude, longitude), this.map);
                    var input = document.getElementById("pac-input");
                    var searchBox = new google.maps.places.SearchBox(input);
                    searchBox.addListener("places_changed", function () {
                        var places = searchBox.getPlaces();
                        
                        if (places.length == 0) {
                            return;
                        }
                        
                        //对于每个位置，获取图标、名称和位置。
                        var bounds = new google.maps.LatLngBounds();
                        
                        places.forEach(function (place) {
                            if (!place.geometry) {
                                console.log("Returned place contains no geometry");
                                return;
                            }
                            var icon = {
                                url: place.icon,
                                size: new google.maps.Size(71, 71),
                                origin: new google.maps.Point(0, 0),
                                anchor: new google.maps.Point(17, 34),
                                scaledSize: new google.maps.Size(25, 25),
                            };
                            // 为每个地方创建一个标记。
                            if (place.geometry.viewport) {
                                // 只有地理代码有viewport。
                                bounds.union(place.geometry.viewport);
                            } else {
                                bounds.extend(place.geometry.location);
                            }
                            that.merchantForm.address.longitude =
                                place.geometry.location.lng();
                            that.merchantForm.address.latitude =
                                place.geometry.location.lat();
                        });
                        that.map.fitBounds(bounds);
                        
                        // that.longitude = (bounds.Ua.i + bounds.Ua.j) / 2;
                        // if(bounds.Ya){
                        //     that.latitude = (bounds.Ya.i + bounds.Ya.j) / 2;
                        // }else if(bounds.Za){
                        //     that.latitude = (bounds.Za.i + bounds.Za.j) / 2;
                        // }
                        that.addMarker(
                            new google.maps.LatLng(
                                that.merchantForm.address.latitude,
                                that.merchantForm.address.longitude
                            ),
                            that.map
                        );
                        new google.maps.Geocoder().geocode(
                            {
                                latLng: new google.maps.LatLng(
                                    that.merchantForm.address.latitude,
                                    that.merchantForm.address.longitude
                                ),
                            },
                            function (res) {
                                if (res.length > 0) {
                                    that.merchantForm.address.address = res[0].formatted_address;
                                    that.searchValue = res[0].formatted_address;
                                    var infowindow = new google.maps.InfoWindow({
                                        content:
                                            that.$t("common.longitude") +
                                            "：" +
                                            that.merchantForm.address.longitude.toFixed(6) +
                                            "，" +
                                            that.$t("common.latitude") +
                                            "：" +
                                            that.merchantForm.address.latitude.toFixed(6) +
                                            "，" +
                                            that.$t("common.dz") +
                                            "：" +
                                            res[0].formatted_address,
                                    });
                                    infowindow.open(that.map, that.marker);
                                    infowindow = null;
                                } else {
                                    that.$message.error(that.$("common.pchooseRightAddr"));
                                }
                            }
                        );
                    });
                    rev();
                });
            });
        },
    },
    mounted() {
        this.initCountry();
        this.initMap();
        if (this.$route.query.id) {
            this.merchantForm.id = this.$route.query.id;
            this.getDetail();
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

.myIpt {
    /deep/ .el-input__inner {
        padding-left: 60px;
    }
}
</style>
