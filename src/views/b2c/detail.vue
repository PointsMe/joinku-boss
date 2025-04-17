<template>
  <div class="fullDetail createOrd">
    <div class="contentContainer">
      <div class="contentDetail">
        <div class="process">
          <ul>
            <li>
              <p class="icn" :class="{active:proDetail.state == '101' || proDetail.state == '102' || proDetail.state == '103' || proDetail.state == '106' || proDetail.state == '109'}">
                <img src="../../assets/images/commit.png">
              </p>
              <p class="name">
                {{ $t('common.commit') }}
              </p>
            </li>
            <img src="../../assets/images/arrowRight.png">
            <li>
              <p class="icn" :class="{active:proDetail.state == '102' || proDetail.state == '103' || proDetail.state == '106' || proDetail.state == '109'}">
                <img src="../../assets/images/check.png">
              </p>
              <p class="name">
                {{ $t('common.review') }}
              </p>
            </li>
            <img src="../../assets/images/arrowRight.png">
            <li>
              <p class="icn" :class="{active:proDetail.state == '103' || proDetail.state == '106' || proDetail.state == '109'}">
                <img src="../../assets/images/order.png">
              </p>
              <p class="name">
                {{ $t('common.orders') }}
              </p>
            </li>
            <img src="../../assets/images/arrowRight.png">
            <li>
              <p class="icn" :class="{active:proDetail.state == '106' || proDetail.state == '109'}">
                <img src="../../assets/images/delivery2.png">
              </p>
              <p class="name">
                {{ $t('common.ship') }}
              </p>
            </li>
            <img src="../../assets/images/arrowRight.png">
            <li>
              <p class="icn" :class="{active:proDetail.state == '109'}">
                <img src="../../assets/images/confirm.png">
              </p>
              <p class="name">
                {{ $t('common.comfirmGet') }}
              </p>
            </li>
            <img src="../../assets/images/arrowRight.png">
            <li>
              <p class="icn" :class="{active:proDetail.state == '109'}">
                <img src="../../assets/images/complete.png">
              </p>
              <p class="name">
                {{ $t('common.complete') }}
              </p>
            </li>
          </ul>
        </div>
        <el-form :model="proDetail" :rules="detailRules" ref="detailForm" size="middle">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="baseInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{ $t('common.orderInfo') }}
                  </span>
                </div>
                <div class="content">
                  <el-row>
                    <el-col :span="12">
                      <el-form-item :label="$t('common.ddbh')" label-width="80px" prop="number">
                        <span style="font-weight: bold;">{{ proDetail.number }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.xdsj')" label-width="80px" prop="createdAt">
                        <span>{{ proDetail.createdAt | timeChange }}</span>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item :label="$t('common.getPayAmount')" label-width="80px" prop="paidAmount">
                        <span style="font-weight: bold;font-size: 16px;"><span style="font-size: 12px;">€</span>{{ proDetail.paidAmount }}</span>
                      </el-form-item>
                      <el-form-item :label="$t('common.willPayAmount')" label-width="80px" prop="finalAmount">
                        <span style="font-weight: bold;font-size: 16px;"><span style="font-size: 12px;">€</span>{{ proDetail.finalAmount }}</span>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="saleInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{$t('common.buyerInfo')}}
                  </span>
                  <!-- <el-button :disabled="(proDetail.state == '109' || proDetail.state == '108') || !allPerms.includes('od-edt')" size="mini" type="text" style="position: absolute;right: 10px;top: 26%;" @click="showChangeCus">{{ $t('common.xg') }}
                  </el-button> -->
                </div>
                <div class="content">
                  <el-form-item :label="$t('common.jbxx')" label-width="80px">
                    <p v-if="proDetail.member">
                      <span style="font-weight: bold;font-size: 13px;">{{ proDetail.member.username }}</span>
                      <span style="color: #a9a9a9;font-size: 12px;">{{ proDetail.member.remarkName }} {{ proDetail.member.mobile }}</span>
                    </p>
                  </el-form-item>
                  <el-form-item :label="$t('common.buyerAccount')" label-width="80px">
                    <p v-if="proDetail.member">
                      <span style="font-size: 13px;">{{ proDetail.member.number }}</span>
                    </p>
                  </el-form-item>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-top: 20px;">
            <el-col :span="12">
              <div class="baseInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{$t('common.supplierInfo')}}
                  </span>
                </div>
                <div class="content">
                  <el-form-item :label="$t('common.jbxx')" label-width="80px">
                    <p v-if="proDetail.supplier">
                      <span>{{ proDetail.supplier.name }}</span> <span>{{ proDetail.supplier.firstName }} {{ proDetail.supplier.lastName }}</span>
                      <span>{{ proDetail.supplier.vatNumber }} {{ proDetail.supplier.taxCode }}</span>
                    </p>
                  </el-form-item>
                  <el-form-item :label="$t('common.contactInfo')" label-width="80px">
                    <p v-if="proDetail.supplier">
                      <span>{{ proDetail.supplier.companyName }} {{ proDetail.supplier.contactName }} {{ proDetail.supplier.contactEmail }} <br/> {{ proDetail.supplier.contactPhone }}</span>
                    </p>
                  </el-form-item>
                  <!-- <el-form-item label="描述" label-width="80px">
                    <p v-if="proDetail.supplier">
                      <span>{{ proDetail.supplier.description }}</span>
                    </p>
                  </el-form-item> -->
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="saleInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{$t('common.infoSys')}}
                  </span>
                  <!-- <el-button :disabled="(proDetail.state == '109' || proDetail.state == '108') || !allPerms.includes('od-edt')" size="mini" type="text" style="position: absolute;right: 10px;top: 26%;" @click="showChangeCus">{{ $t('common.xg') }}
                  </el-button> -->
                </div>
                <div class="content">
                  <el-form-item :label="$t('common.jbxx')" label-width="80px">
                    <p v-if="proDetail.merchant">
                      <span>{{ proDetail.merchant.name }}</span> <span>{{ proDetail.merchant.firstName }} {{ proDetail.merchant.lastName }}</span>
                      <span>{{ proDetail.merchant.vatNumber }} {{ proDetail.merchant.taxCode }}</span>
                    </p>
                  </el-form-item>
                  <el-form-item :label="$t('common.contactInfo')" label-width="80px">
                    <p v-if="proDetail.merchant">
                      <span>{{ proDetail.merchant.companyName }} {{ proDetail.merchant.contactName }} {{ proDetail.merchant.contactEmail }} <br/> {{ proDetail.merchant.contactPhone }}</span>
                    </p>
                  </el-form-item>
                  <!-- <el-form-item label="描述" label-width="80px">
                    <p v-if="proDetail.merchant">
                      <span>{{ proDetail.merchant.description }}</span>
                    </p>
                  </el-form-item> -->
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row style="margin-bottom: 20px;margin-top: 20px;">
            <el-col :span="24">
              <div class="saleInfo">
                <div class="title2">
                  <!-- <span class="border"></span>
                  <span class="tit">
                       客户信息
                  </span> -->
                  <div class="el-tabs el-tabs--card">
                    <div class="el-tabs__header">
                      <div class="el-tabs__nav-wrap">
                        <div class="el-tabs__nav-scroll">
                          <div class="el-tabs__nav" style="transform: translateX(0px);">
                            <div id="tab-first" :class="{'is-active':chooseTab == 'product'}" class="el-tabs__item" @click="swtchTab('product')">{{ $t('common.shipList') }}
                            </div>
                            <div id="tab-second" :class="{'is-active':chooseTab == 'pay'}" class="el-tabs__item" @click="swtchTab('pay')">{{ $t('common.payeeRecord') }}
                            </div>
                            <div id="tab-second" :class="{'is-active':chooseTab == 'transport'}" class="el-tabs__item" @click="swtchTab('transport')">{{ $t('common.deliveryRecord') }}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div v-if="chooseTab == 'product'" style="position: absolute;right: 0;top: 26%;">
                    <el-button :disabled="proDetail.state == '109' || proDetail.state == '108'" size="mini" type="primary" style="" @click="showChangeDiscount">{{ $t('common.orderDiscount') }}
                    </el-button>
                    <el-button :disabled="proDetail.state == '109' || proDetail.state == '108'" size="mini" type="primary" style="margin-right: 10px;" @click="showChangeSubstact">{{ $t('common.totalAmount') }}
                    </el-button>
                  </div>
                  <template v-if="chooseTab == 'pay' && proDetail.state != 101">
                    <!-- <el-button :disabled="proDetail.state == '109' || proDetail.state == '108'" size="mini" type="primary" style="position: absolute;right: 10px;top: 26%;" @click="showPayInfo()">{{ $t('common.shoukuan') }}
                    </el-button> -->
                  </template>
                </div>
                <div class="content">
                  <el-table :data="chooseProductList" ref="product" border style="width: 100%" :cell-class-name="delLine" v-show="chooseTab == 'product'">
                    <el-table-column prop="xuhao" :label="$t('common.xuhao')" align="center" width="55"></el-table-column>
                    <el-table-column prop="product" :label="$t('common.product')" align="center" width="300">
                      <template slot-scope="scope">
                        <div style="display:flex;align-items: center;">
                          <!-- <img :src="scope.row.image + '_50x50.jpg'" alt/> -->
                          <el-image :src="scope.row.image + '_50x50.jpg'" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                            <div slot="error" class="image-slot">
                              <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                              <!-- <i class="el-icon-s-goods" style="font-size: 20px;"></i> -->
                            </div>
                          </el-image>
                          <div style="display:flex;flex-direction: column;text-align: left;marginLeft:10px">
                            <span>{{ scope.row.name }}</span>
                            <span style="color: #777">{{ scope.row.code }}</span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="specs" :label="$t('common.guige')" align="center" width="120px"></el-table-column>
                    <!-- <el-table-column prop="unit" label="单位" align="center">
                            <template slot-scope="scope">
                                <span v-if="scope.row.units && scope.row.units.length > 0" v-for="(item,$index) in scope.row.units">
                                    <span v-if="item.type == 101">
                                        {{item.unitName}}
                                    </span>
                                </span>
                            </template>
                        </el-table-column> -->
                    <el-table-column prop="count" :label="$t('common.numUnit')" align="right" width="120px">
                      <template slot-scope="scope">
                        <!-- <el-input v-model="scope.row.count"  style="width: 90%;" type="number"></el-input> -->
                        <div style="display:flex;justify-content: flex-end;align-items: center;">
                          <div v-if="scope.row.count === scope.row.originalCount">{{ scope.row.count }}</div>
                          <div v-else>
                            <span style="text-decoration:line-through;">{{ scope.row.originalCount }}</span>
                            <span style="color: #f56954">{{ scope.row.count }}</span>
                          </div>
                          &nbsp;
                          <span v-if="scope.row.units && scope.row.units.length > 0" v-for="(item,$index) in scope.row.units" :key="$index">
                            <span v-if="item.type == 101">
                              {{ item.unitName }}
                            </span>
                          </span>
                          <i class="el-icon-edit" @click="updateCount(scope.row)" style="color:#107c3f;cursor: pointer;margin-left:5px" v-if="!(proDetail.state == '109' || proDetail.state == '108')"></i>
                          <el-popover placement="top" width="240" :ref="scope.$index" v-if="scope.row.units && scope.row.units.length > 0">
                            <p v-for="(item,$index) in scope.row.units" :key="$index" style="padding-bottom: 4px;">
                              <span v-if="item.type == 102">{{ $t('common.salesUnit') }}:</span>
                              <span v-if="item.type == 102">{{ Math.floor(scope.row.count/item.factor) }}{{ item.unitName }} <span v-if="scope.row.count%item.factor != 0">{{ scope.row.count%item.factor }}{{scope.row.units[0].unitName}} </span> </span>
                              <span v-if="item.type == 103">{{ $t('common.otherUnit') }}:</span>
                              <span v-if="item.type == 103">{{ Math.floor(scope.row.count/item.factor) }}{{ item.unitName }} <span v-if="scope.row.count%item.factor != 0">{{ scope.row.count%item.factor }}{{scope.row.units[0].unitName}} </span> </span>
                            </p>
                            <el-button slot="reference" type="text" size="mini" style="position: absolute;bottom: 6px;right: 6px;">{{ $t('common.unitChange') }}
                            </el-button>
                          </el-popover>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" align="right" header-align="right" :label="$t('common.singlePrice') + '(€)'" width="120px">
                      <template slot-scope="scope">
                        <!-- <span style="color: red;font-weight: bold;">{{scope.row.price}}</span> -->
                        <div v-if="scope.row.finalPrice == 0 && scope.row.dynamicPrice">
                          <el-tag type="danger" size="mini" effect="plain">{{ $t('common.currentPrice') }}</el-tag>
                        </div>
                        <div v-else>
                          <p>
                            <span style="color: #ccc;text-decoration: line-through;" v-if="scope.row.originalPrice != scope.row.finalPrice">{{ scope.row.originalPrice }}</span>
                            <span style="font-size: 16px;color: #f56954;font-weight: bold;">{{ scope.row.finalPrice }}</span>
                          </p>
                          <p style="font-weight: bold;cursor: pointer;text-align: right;color: #8de3ff;" v-if="scope.row.discounts.length != 0">
                            <span @click="showDiscountList(scope.row)"><span style="width: 16px;height: 16px;border: 1px solid #8de3ff;border-radius: 50%;text-align: center;line-height: 16px;display: inline-block;vertical-align: middle;font-size: 12px;margin-right: 4px;">€</span>{{ $t('common.yhRecord') }}</span>
                          </p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="purchasePrice" align="center" header-align="right" :label="$t('common.purchasePrice') + '(€)'"  width="100px">
                      <template slot-scope="scope">
                        <p>
                          <span style="font-size: 16px;color: #f56954;font-weight: bold;">{{ scope.row.purchasePrice }}</span>
                        </p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" align="center" header-align="center" :label="$t('common.bz')">
                      <template slot-scope="scope">
                        <span>{{ scope.row.remark }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="incomes" align="left" header-align="center" label="盈利" width="170px">
                      <template slot-scope="scope">
                        <div v-if="scope.row.incomes && scope.row.incomes.length > 0">
                          <div v-for="item in scope.row.incomes" :key="item.type"  style="color: #00a65a;">
                            <p v-if="item.type == 101">
                              {{$t('common.platProfit')}}:{{item.incomeAmount}},{{$t('common.addPrice')}}{{item.raisePrice}}
                            </p>
                            <p v-if="item.type == 102">
                                {{$t('common.merchantProfit')}}:{{item.incomeAmount}},{{$t('common.addPrice')}}{{item.raisePrice}}
                            </p>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column align="center" width="120" :label="$t('common.cz')">
                      <template slot-scope="scope">
                        <template>
                          <p>
                            <el-button type="text" @click="showChangePrice(scope.row)" :disabled="proDetail.state == '109' || proDetail.state == '108' || scope.row.deleted">{{ $t('common.changePrice') }}</el-button>
                          </p>
                          <p>
                            <el-button type="text" @click="showRemarkProduct(scope.row)" :disabled="proDetail.state == '109' || proDetail.state == '108' || scope.row.deleted">{{ $t('common.bz') }}</el-button>
                          </p>
                          <p>
                            <el-button type="text" @click="removeProduct(scope.row)" :disabled="proDetail.state == '109' || proDetail.state == '108' || scope.row.deleted">{{ $t('common.sc') }}</el-button>
                          </p>
                        </template>
                      </template>
                    </el-table-column>
                    <!-- <div slot="append">
                      <div style="text-align: center;padding: 10px 0;" v-if="!(proDetail.state == '109' || proDetail.state == '108')">
                        <span style="color: #3c8dbc;font-size: 14px;cursor: pointer;font-weight: bold;" @click="chooseProduct">
                          <i class="el-icon-circle-plus-outline"></i>
                          {{ $t('common.addList') }}
                        </span>
                      </div>
                    </div> -->
                  </el-table>
                  <el-table ref="pay" :data="payments" border style="width: 100%" v-show="chooseTab == 'pay'">
                    <el-table-column prop="number" :label="$t('common.singleNum')" align="center"></el-table-column>
                    <el-table-column prop="auditorName" :label="$t('common.reviewer')" align="center"></el-table-column>
                    <el-table-column prop="operatorName" :label="$t('common.requester')" align="center"></el-table-column>
                    <el-table-column prop="customer" :label="$t('common.payee')" align="center">
                      <template slot-scope="scope">
                        <p v-if="scope.row.member">{{ scope.row.member.name }}</p>
                        <p v-if="scope.row.member">{{ scope.row.member.mobile }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="amount" :label="$t('common.doPayAmount') + '(€)'" align="center"></el-table-column>
                    <el-table-column prop="payeeAccount" :label="$t('common.payZhanghao')" align="center">
                      <template slot-scope="scope">
                        <p v-if="scope.row.payeeAccount">{{ scope.row.payeeAccount.name }}</p>
                        <p v-if="scope.row.payeeAccount">{{ scope.row.payeeAccount.iban }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="paidAt" :label="$t('common.getPayTime')" align="center">
                      <template slot-scope="scope">
                        <p>{{ scope.row.paidAt | timeChange }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="createdAt" :label="$t('common.requestTime')" align="center">
                      <template slot-scope="scope">
                        <p>{{ scope.row.createdAt | timeChange }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="remark" align="center" :label="$t('common.bz')"></el-table-column>
                    <el-table-column prop="state" :label="$t('common.zt')" align="center">
                      <template slot-scope="scope">
                        <el-tag type="error" v-if="scope.row.state == 101">{{ $t('common.waitReview') }}</el-tag>
                        <el-tag type="success" v-if="scope.row.state == 102">{{ $t('common.doneComplete') }}</el-tag>
                        <el-tag type="info" v-if="scope.row.state == 103">{{ $t('common.doneNone') }}</el-tag>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-table ref="transport" :data="transport" border style="width: 100%" v-show="chooseTab == 'transport'">
                    <el-table-column prop="number" :label="$t('common.singleNum')" align="center"></el-table-column>
                    <el-table-column prop="transporter" :label="$t('common.shipCompany')" align="center"></el-table-column>
                    <el-table-column prop="remark" :label="$t('common.bz')" align="center"></el-table-column>
                    <el-table-column prop="deliveryAt" :label="$t('common.deliveryTime')" align="center">
                      <template slot-scope="scope">
                        <p>{{ scope.row.deliveryAt | timeChange }}</p>
                      </template>
                    </el-table-column>
                    <el-table-column prop="image" :label="$t('common.tupian')" align="center">
                      <template slot-scope="scope">
                        <el-image v-if="scope.row.images && scope.row.images.length > 0" style="width: 60px;height: 60px;border-radius: 50%;margin-right: 4px;" :src="item" fit="cover" :key="$index" v-for="(item,$index) in scope.row.images" :preview-src-list="[item]"></el-image>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="total" v-if="chooseTab == 'product'" style="display: flex;justify-content: space-between;">
                    <div>
                      <div v-for="item in proDetail.incomes" :key="item.type"  v-if="proDetail.incomes && proDetail.incomes.length > 0">
                        <p class="totalItem" v-if="item.type == 101">
                          <span class="name">{{$t('common.platProfit')}}</span>
                          <span class="value"><span class="unit">€&nbsp;</span>{{ item.incomeAmount }}</span>
                        </p>
                        <p class="totalItem" v-if="item.type == 102">
                          <span class="name">{{$t('common.merchantProfit')}}</span>
                          <span class="value"><span class="unit">€&nbsp;</span>{{ item.incomeAmount }}</span>
                        </p>
                      </div>
                    </div>
                    
                    <div>
                      <p class="totalItem">
                        <span class="name">{{$t('common.goodsNetWorth')}}</span>
                        <span class="value2"><span class="unit">€&nbsp;</span>{{ proDetail.netAmount }}</span>
                      </p>
                      <p class="totalItem" v-if="proDetail.orderDiscountAmount > 0">
                        <span class="name">{{ $t('common.dicountAmount') }}</span>
                        <span class="value2"><span class="unit">€&nbsp;</span>{{ proDetail.orderDiscountAmount }}</span>
                      </p>
                      <p style="text-align: right;" v-if="proDetail.orderDiscountAmount > 0">
                        <span @click="showDiscountList2()" style="font-weight: bold;cursor: pointer;color: #8de3ff;"><span style="width: 16px;height: 16px;border: 1px solid #8de3ff;border-radius: 50%;text-align: center;line-height: 16px;display: inline-block;vertical-align: middle;font-size: 12px;margin-right: 4px;">€</span>{{ $t('common.yhRecord') }}</span>
                      </p>
                      <p class="totalItem" v-if="proDetail.postageAmount > 0">
                        <span class="name">{{$t('common.postage')}}</span>
                        <span class="value"><span class="unit">€&nbsp;</span>{{ proDetail.postageAmount }}</span>
                      </p>
                      <p class="totalItem" v-if="proDetail.paymodeAmount > 0">
                        <span class="name">{{$t('common.serveFee')}}</span>
                        <span class="value"><span class="unit">€&nbsp;</span>{{ proDetail.paymodeAmount }}</span>
                      </p>
                      <p class="totalItem" v-if="proDetail.taxAmount > 0">
                        <span class="name">{{$t('common.vat')}}</span>
                        <span class="value2"><span class="unit">€&nbsp;</span>{{ proDetail.taxAmount }}</span>
                      </p>
                      <p class="totalItem">
                        <span class="name">{{ $t('common.acturalAmount') }}</span>
                        <span class="value"><span class="unit">€&nbsp;</span>{{ proDetail.finalAmount }}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row :gutter="20" style="margin-bottom: 100px;">
            <el-col :span="12">
              <div class="baseInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{ $t('common.deliveryAddress') }}
                  </span>
                  <!-- <el-button size="mini" type="text" style="position: absolute;right: 10px;top: 26%;" @click="deliveryAddress" :disabled="proDetail.state == '109' || proDetail.state == '108' || !allPerms.includes('od-edt')">{{ $t('common.xg') }}
                  </el-button> -->
                </div>
                <div class="content">
                  <div v-if="proDetail.deliveryAddress" style="width: 100%;height: 150px;">
                    <el-form-item :label="$t('common.dz')" label-width="80px" prop="deliveryAddress">
                      <p style="font-weight: bold;height: 20px;line-height: 20px; font-size: 12px;">{{ proDetail.deliveryAddress.address }} {{proDetail.deliveryAddress.houseNumber}}</p>
                      <p style="height: 20px;line-height: 20px;font-size: 12px;">{{ proDetail.deliveryAddress.city }}
                        {{ proDetail.deliveryAddress.province }} {{ proDetail.deliveryAddress.country }}
                        {{ proDetail.deliveryAddress.zipcode }}</p>
                    </el-form-item>
                    <el-form-item :label="$t('common.receiptPeople')" label-width="80px">
                      <span v-if="proDetail.deliveryAddress.contactName">{{ proDetail.deliveryAddress.contactName }} ({{ proDetail.deliveryAddress.contactPhone }})</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="saleInfo">
                <div class="title">
                  <span class="border"></span>
                  <span class="tit">
                    {{ $t('common.bz') }}
                  </span>
                  <!-- <el-button size="mini" v-if="disabledRemark" type="text" :disabled="proDetail.state == '109' || proDetail.state == '108' || !allPerms.includes('od-edt')" style="position: absolute;right: 10px;top: 26%;" @click="reviseRemark">{{ $t('common.xg') }}
                  </el-button>
                  <el-button size="mini" v-else type="primary" style="position: absolute;right: 10px;top: 26%;" @click="confirmOrderRemark">{{ $t('common.queding') }}
                  </el-button> -->
                </div>
                <div class="content">
                  <div style="width: 100%;height: 150px;">
                    <el-input :disabled="disabledRemark" resize="none" type="textarea" v-model="proDetail.remark" :rows="7" :placeholder="$t('common.orderRemark')"></el-input>
                  </div>
                </div>
              </div>
            </el-col>
          </el-row>
        </el-form>
        <div class="opBtn">
          <div style="width: 1200px;height: 100%;margin: 0 auto;position: relative;">
            <el-button size="mini" @click="goBack();" style="position: absolute;top: 12px;left:94px;">{{ $t('common.back') }}</el-button>
            <!-- <p style="position: absolute;top: 0;right:-94px;">
              <el-button type="primary" size="mini" @click="opLog();">
                {{ $t('common.operateLog') }}
              </el-button>
              <el-button type="primary" size="mini" v-print="'#printDdt'">
                {{ $t('common.ptddt') }}
              </el-button>
              <el-button type="primary" size="mini" v-print="'#print'">
                {{ $t('common.printWatch') }}
              </el-button>
              <el-button type="primary" size="mini" v-if="proDetail.state == 106" @click="orderFinishFn()">
                {{ $t('common.shouhuo') }}
              </el-button>
              <el-button type="primary" size="mini" v-if="proDetail.state == 103" @click="showDeliveryInfo()">
                {{ $t('common.delivery') }}
              </el-button>
              <el-button type="primary" @click="orderApprove()" v-if="proDetail.state == 101 && allPerms.includes('od-aprv')" size="mini">{{ $t('common.reviewAndOrder') }}
              </el-button>
              <el-button type="primary" @click="orderAccept()" v-if="proDetail.state == 102" size="mini">{{ $t('common.orders') }}
              </el-button>
              <el-button type="primary" size="mini" v-if="(proDetail.paymentState == 101 || proDetail.paymentState == 102) && !(proDetail.state == 108 || proDetail.state == 101)" @click="showPayInfo()">{{ $t('common.shoukuan') }}
              </el-button>
              <el-button type="primary" slot="reference" size="mini" v-if="!(proDetail.state == 108 || proDetail.state == 109) && allPerms.includes('od-del')" @click="orderCancel();">{{ $t('common.qxdd') }}
              </el-button>
            </p> -->
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="$t('common.orderDiscount')" :visible.sync="showDiscount2" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form :model="dialogForm" :rules="dialogRules" ref="dialogForm">
          <el-form-item prop="orderDiscount">
            <el-input type="number" v-model="dialogForm.orderDiscount" :placeholder="$t('common.insertDiscount')"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showDiscount2 = false;">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doIptDiscount();showDiscount2 = false;">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.totalAmount')" :visible.sync="showSubtrack" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-input type="number" v-model="orderSubtract" :placeholder="$t('common.insertAmout')"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSubtrack = false;">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doIptSubstract();showSubtrack = false;">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.changePrice')" :visible.sync="showPrice" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-input type="number" v-model="priceIpt" :placeholder="$t('common.insertPrice')"></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="canclePrice">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doIptPrice">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.changeNum')" :visible.sync="showCount" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div style="display:flex;justify-content:space-between">
        <el-form label-width="100px">
          <el-form-item :label="$t('common.quantità')">
            <el-input v-model="procductCount" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="countSave">{{ $t('common.queding') }}</el-button>
            <el-button @click="countCancel">{{ $t('common.qx') }}</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
    <el-dialog :title="$t('common.changeCus')" :visible.sync="showCustomer" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form size="middle">
          <el-form-item :label="$t('common.customer')" label-width="80px">
            <el-select v-model="customerIptId" size="mini" filterable remote :remote-method="getCustomerList" clearable style="width: 220px;">
              <el-option v-for="item in customerList" :key="item.id" :label="item.name + ' — ' + item.taxCode" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleCustomer">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doChangeCustomer">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.bz')" :visible.sync="showRemark" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-input type="textarea" v-model="remarkIpt" :rows="4" :placeholder="$t('common.insertRemark')" maxlength="1000" show-word-limit></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleRemark">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doIptRemark">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="showProduct" width="60%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div slot="title">
        {{ $t('common.productList') }}
      </div>
      <div class="center">
        <el-input prefix-icon="el-icon-search" v-model="keyword" :placeholder="$t('common.spbianhao')+'/' + $t('common.mingcheng')" style="width: 260px;margin-bottom: 10px;margin-right: 10px;"></el-input>
        <el-button type="primary" size="mini" @click="bestSearch">{{ $t('common.sousuo') }}</el-button>
        <el-button type="primary" size="mini" @click="bestRemove">{{ $t('common.qk') }}</el-button>
        <el-table :data="productList" height="400" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" :selectable='checkboxInit'></el-table-column>
          <el-table-column prop="type" align="center" width="200" :label=" $t('common.mingcheng')+'/' +$t('common.spbianhao')">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <!-- <img :src="scope.row.cover + '_50x50.jpg'" alt/> -->
                <el-image :src="scope.row.cover + '_50x50.jpg'" class="image" fit="cover" style="width: 50px;height: 50px;text-align: center;vertical-align: middle;line-height: 50px;">
                  <div slot="error" class="image-slot">
                    <img src="../../assets/images/default.png" style="width: 50px;height: 50px;" />
                    <!-- <i class="el-icon-s-goods" style="font-size: 20px;"></i> -->
                  </div>
                </el-image>
                <div style="display:flex;flex-direction: column;text-align: left;marginLeft:10px;width: 120px;">
                  <span style="font-weight: bold">{{ scope.row.name }}</span>
                  <span>{{ scope.row.code }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="sku.name" align="center" :label="$t('common.guige')"></el-table-column>
          <el-table-column prop="count" align="center" :label="$t('common.sl')">
            <template slot-scope="scope">
              <el-input v-model="scope.row.count" :disabled="scope.row.checked" style="width: 90%;" type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="price" align="center" :label="$t('common.shoujia')">
            <template slot-scope="scope">
              <div v-if="scope.row.price == 0 && scope.row.dynamicPrice">
                <el-tag type="danger" size="mini" effect="plain">{{ $t('common.currentPrice') }}</el-tag>
              </div>
              <div v-else>
                <div v-if="!scope.row.multiSpec">
                  <span>{{ scope.row.price }}&nbsp;€</span>
                </div>
                <div v-if="scope.row.multiSpec">
                  <span>{{ scope.row.minPrice }}&nbsp;€&nbsp;~&nbsp;{{ scope.row.maxPrice }}&nbsp;€</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="stock" align="center" :label="$t('common.kucun')">
            <template slot-scope="scope">
              <span v-if="scope.row.units">{{ scope.row.stock }}&nbsp;{{ scope.row.units[0].unitName }}&nbsp;</span>
            </template>
          </el-table-column>
          <el-table-column prop="new" align="center" :label="$t('common.danwei')">
            <template slot-scope="scope">
              <div style="display:flex;flex-direction:column">
                <span v-for="(item,index) in scope.row.units" :key="index">
                  {{ item.unitName }}
                  <span v-if="index!=0">({{ item.factor }}{{ scope.row.units[0].unitName }})</span>
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="published" align="center" :label="$t('common.shangjia')+'/'+$t('common.xiajia')">
            <template slot-scope="scope">
              <span>{{ scope.row.published | publishedValue(shangjia,xiajia) }}</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showProduct = false">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="doChooseProduct">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.deliveryInfo')" :visible.sync="showDelivery" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form @submit.native.prevent ref="deliveryInfo" :model="deliveryInfo" :rules="deliveryRules">
          <el-form-item label-width="100px" :label="$t('common.deliveryTime')" prop="deliveryAt">
            <el-date-picker :picker-options="pickerOptions" v-model="deliveryInfo.deliveryAt" type="datetime" :placeholder="$t('common.chooseDeliveryDate')" style="width: 80%;"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.shipCompany')" prop="transporter">
            <el-input v-model="deliveryInfo.transporter" clearable style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.singleNum')" prop="number">
            <el-input v-model="deliveryInfo.number" clearable style="width: 80%;"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.bz')" prop="remark">
            <el-input v-model="deliveryInfo.remark" clearable style="width: 80%;" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.tupian')" prop="images">
            <el-upload list-type="picture-card" class="avatar-uploader" style="display: inline-block;" action :limit="5" :file-list="fileListCover" :on-change="handleChangeCover" :http-request="uploadFileCover" :on-remove="removeFileCover" accept="image/jpg, image/jpeg, image/png, image/gif">
              <i class="el-icon-plus avatar-uploader-icon" style="line-height:120px;width:120px;height:120px"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cacnleDelivery">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="deliveryFn">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.getPayInfo')" :visible.sync="showPay" width="30%" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
      <div class="center">
        <el-form @submit.native.prevent ref="payInfo" :model="payInfo" :rules="payRules" size="medium">
          <el-form-item label-width="100px" :label="$t('common.payTime')" prop="paidAt">
            <el-date-picker v-model="payInfo.paidAt" type="datetime" :placeholder="$t('common.chooseGetPayTime')" style="width: 80%;"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.payAmount')" prop="amount">
            <el-input v-model="payInfo.amount" clearable style="width: 80%;" type="number"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.payZhanghao')" prop="payeeAccountId">
            <el-select v-model="payInfo.payeeAccountId" style="width:80%" clearable>
              <el-option v-for="item in payeeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.bz')" prop="remark">
            <el-input v-model="payInfo.remark" clearable style="width: 80%;" type="textarea"></el-input>
          </el-form-item>
          <el-form-item label-width="100px" :label="$t('common.tupian')" prop="images">
            <el-upload list-type="picture-card" class="avatar-uploader" style="display: inline-block;" action :limit="5" :file-list="fileListCover" :on-change="handleChangeCover" :http-request="uploadFileCover" :on-remove="removeFileCover" accept="image/jpg, image/jpeg, image/png, image/gif">
              <i class="el-icon-plus avatar-uploader-icon" style="line-height:120px;width:120px;height:120px"></i>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancleOrderPay">{{ $t('common.annulla') }}</el-button>
        <el-button type="primary" @click="orderPayFn">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
    <el-dialog :title="$t('common.yhRecord')" :visible.sync="showDiscount" width="40%" :close-on-click-modal="true" :show-close="true" :close-on-press-escape="false">
      <div class="center">
        <el-table :data="discounts" style="width: 100%">
          <el-table-column prop="eventName" :label="$t('common.type')">
            <template slot-scope="scope">
              <div v-if="discountType == 'item'">
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 103 && scope.row.event == 106">{{ $t('common.activetyReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 106">{{ $t('common.activetyOnePrice') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 106">{{ $t('common.activetyDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 103 && scope.row.event == 111">{{ $t('common.salesmanReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 111">{{ $t('common.salesmanOnePrice') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 111">{{ $t('common.salesmanDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 103 && scope.row.event == 116">{{ $t('common.supplierReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 116">{{ $t('common.supplierOnePrice') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 116">{{ $t('common.supplierDiscount') }}</el-tag>
              </div>
              <div v-else>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 101">{{ $t('common.activetyReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 101">{{ $t('common.activetyDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 103">{{ $t('common.salesmanReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 103">{{ $t('common.salesmanDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 109">{{ $t('common.cusDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 102 && scope.row.event == 106">{{ $t('common.supplierReduce') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 101 && scope.row.event == 106">{{ $t('common.supplierDiscount') }}</el-tag>
                <el-tag type="danger" size="small" effect="dark" v-if="scope.row.type == 1">{{$t('common.goodsDisco')}}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" prop="name" :label="$t('common.mingcheng')"></el-table-column>
          <el-table-column prop="amount" :label="$t('common.singleOfdicount') + '(€)'" width="108">
            <template slot="header" slot-scope="scope">
              <span v-if="discountType == 'item'">{{ $t('common.singleOfdicount') }}(€)</span>
              <span v-else>{{ $t('common.dicountAmount') }}(€)</span>
            </template>
          </el-table-column>
          <el-table-column prop="createdAt" :label="$t('common.dicountAmountTime')" width="108">
            <template slot-scope="scope">
              <span>{{scope.row.createdAt | timeChange}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.cz')" width="108">
            <template slot-scope="scope">
              <el-button type="text" size="mini" v-if="scope.row.id" @click="deleteDiscount(scope.row)" :disabled="(proDetail.state == '109' || proDetail.state == '108' || chooseItem.deleted)">{{ $t('common.sc') }}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="showDiscount = false">取 消</el-button>
                <el-button type="primary" @click="showDiscount = false">确 定</el-button>
            </span> -->
    </el-dialog>
    <el-dialog :title="$t('common.operateLog')" :visible.sync="showLog" width="60%">
      <div class="center">
        <el-table :data="logOpList" size="mini" height="420px" style="width: 100%">
          <el-table-column align="center" :label="$t('common.operator')">
            <template slot-scope="scope">
              <span>{{scope.row.operatorName}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.operateCotent')">
            <template slot-scope="scope">
              <span>{{scope.row.action}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.employeeType')">
            <template slot-scope="scope">
              <span>{{scope.row.operatorType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" :label="$t('common.sj')">
            <template slot-scope="scope">
              <span>{{scope.row.createdAt | timeChange}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showLog = false;">{{ $t('common.conferma') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  orderItemAdd,
  b2cOrderDetail,
  // retailOrderDetail,
  getGoodsList,
  // remarkRevise,
  // orderUpdateAddress,
  // supplierMerchantList,
  // customerRevise,
  orderItemCountUpdate,
  itemRemark,
  orderItemDelete,
  itemPrice,
  // orderCancel,
  // orderApprove,
  // orderAccept,
  // orderFinish,
  // orderDelivery,
  // orderPay,
  // deliveryUpload,
  // orderPayeeList,
  orderDiscountAmount,
  orderSubtractAmount,
  orderItemDiscountDelete,
  orderDiscountDelete,
  // orderLogList,
  // supplierMerchantDetail,
  orderPayCharge,
  // orderCheckDy
} from '@/api/api';

var moment = require('moment');

export default {
  name: 'b2cOrderDetail',
  components: { },
  data() {
    const validateDiscount = (rule, value, callback) => {
      if (Number(value) < 0 || Number(value) > 100) {
        callback(new Error(this.$t('common.insert0100val') + '！'));
      } else {
        callback();
      }
      callback();
    };
    return {
      addrType: 'order',
      payments: [],
      transport: [],
      chooseTab: 'product',
      deliveryAddressShow: false,
      customerId: '',
      // 选择商品
      shangjia: this.$t('common.shangjia'),
      xiajia: this.$t('common.xiajia'),
      spanArr: '',
      pos: 0,
      keyword: '',
      totalCount: 0,
      currentPage: 1,
      pagesize: 15,
      showProduct: false,
      productList: [],
      chooseProductList: [],
      tmpChooseList: [],
      proDetail: {},
      detailRules: {},
      showRemark: false,
      chooseItem: '',
      remarkIpt: '',
      disabledRemark: true,
      showCustomer: false,
      customerList: [],
      customerIptId: '',
      // 数量更改
      procductCount: '',
      itemId: '',
      showCount: false,
      // 调价
      showPrice: false,
      priceIpt: '',
      // 操作
      payeeList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (Date.now() - 24 * 60 * 60 * 1000);
        }
      },
      type: '',
      showPay: false,
      payInfo: {
        orderId: '',
        paidAt: new Date(),
        amount: '',
        payeeAccountId: '',
        remark: '',
        images: []
      },
      payRules: {
        amount: [
          { required: true, message: this.$t('common.qsrnr'), trigger: 'blur' }
        ]
      },
      showDelivery: false,
      deliveryInfo: {
        orderId: '',
        deliveryAt: new Date(),
        transporter: '',
        number: '',
        remark: '',
        images: []
      },
      deliveryRules: {},
      ileListCover2: [],
      fileCover2: '',
      fileListCover: [],
      fileCover: '',
      // 订单折扣抹零参数
      showDiscount: false,
      orderSubtract: '',
      showSubtrack: false,
      dialogForm: {
        orderDiscount: ''
      },
      dialogRules: {
        orderDiscount: [
          { validator: validateDiscount, trigger: 'blur' }
        ]
      },
      showDiscount2: false,
      discounts: [],
      discountType: 'item',
      printData: '',
      printDdtData: '',
      showLog: false,
      logOpList: [],
      operatorTypeList: [{
        id: 101,
        name: this.$t('common.merchant')
      }, {
        id: 102,
        name: this.$t('common.supplier')
      }, {
        id: 103,
        name: this.$t('common.ywy')
      }],
      actionList: [{
        id: 'ord_approve',
        name: this.$t('common.orderReview')
      }, {
        id: 'ord_accept',
        name: this.$t('common.reviewAndAccept')
      }, {
        id: 'ord_delivery',
        name: this.$t('common.orderDelivery')
      }, {
        id: 'ord_receive',
        name: this.$t('common.orderRecept')
      }, {
        id: 'ord_cancel',
        name: this.$t('common.qxdd')
      }, {
        id: 'ord_customer_update',
        name: this.$t('common.updtOrderCus')
      }, {
        id: 'ord_address_change',
        name: this.$t('common.reviseDeliveryAddr')
      }, {
        id: 'ord_discount',
        name: this.$t('common.createDis')
      }, {
        id: 'ord_discount_delete',
        name: this.$t('common.deleDis')
      }, {
        id: 'ord_subtract',
        name: this.$t('common.orderReduce')
      }, {
        id: 'ord_remark_update',
        name: this.$t('common.updateOrderRemark')
      }, {
        id: 'item_add',
        name: this.$t('common.addProduct')
      }, {
        id: 'item_delete',
        name: this.$t('common.deleteProduct')
      }, {
        id: 'item_count_update',
        name: this.$t('common.reviseProductNum')
      }, {
        id: 'item_price_update',
        name: this.$t('common.reviseProductPrice')
      }, {
        id: 'item_remark_update',
        name: this.$t('common.reviseProductRemark')
      }, {
        id: 'item_discount_delete',
        name: this.$t('common.deleteProductDis')
      }, {
        id: 'payment_apply',
        name: this.$t('common.requestPay')
      }, {
        id: 'payment_approve',
        name: this.$t('common.reviewPay')
      }, {
        id: 'payment_disapprove',
        name: this.$t('common.dispitchPay')
      }]
    };
  },
  methods: {
    getCustomerDetail() {
      var params = new URLSearchParams();
      params.append('id', this.printDdtData.orderDetail.customer.id);
      supplierMerchantDetail(params).then(res => {
        if (res.code === 20000) {
          this.printDdtData.orderDetail.customer = res.data;
        }
      });
    },
    goToPrint() {
      this.$router.push({ name: 'PrintDdt' });
    },
    opLog() {
      this.showLog = true;
      this.getLogList();
    },
    getLogList() {
      var params = new URLSearchParams();
      params.append('id', this.$route.query.id);
      orderLogList(params).then((res) => {
        if (res.code == 20000) {
          this.logOpList = res.data;
          for (let i = 0; i < this.operatorTypeList.length; i++) {
            for (let j = 0; j < this.logOpList.length; j++) {
              if (this.logOpList[j].operatorType == this.operatorTypeList[i].id) {
                this.logOpList[j].operatorType = this.operatorTypeList[i].name;
              }
            }
          }
          for (let i = 0; i < this.actionList.length; i++) {
            for (let j = 0; j < this.logOpList.length; j++) {
              if (this.logOpList[j].action == this.actionList[i].id) {
                this.logOpList[j].action = this.actionList[i].name;
              }
            }
          }
        } else {
          this.$message.error(res.msg);
        }
      })['catch'](() => {

      });
    },
    deleteDiscount(dt) {
      var that = this;
      that.$confirm(that.$t('common.cancleDis') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.conferma'),
        cancelButtonText: that.$t('common.annulla'),
        type: 'warning'
      }).then(() => {
        if (this.discountType == 'item') {
          let params = new URLSearchParams();
          params.append('itemId', this.chooseItem.id);
          params.append('orderId', this.$route.query.id);
          params.append('discountId', dt.id);
          orderItemDiscountDelete(params).then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              for (let i = 0; i < that.discounts.length; i++) {
                if (dt.id == that.discounts[i].id) {
                  that.discounts.splice(i, 1);
                }
              }
              this.getOrderDetail(this.$route.query.id);
            } else {
              that.$message.error(res.msg);
            }
          });
        } else {
          let params = new URLSearchParams();
          params.append('orderId', this.chooseItem.id);
          params.append('discountId', dt.id);
          orderDiscountDelete(params).then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              for (let i = 0; i < that.discounts.length; i++) {
                if (dt.id == that.discounts[i].id) {
                  that.discounts.splice(i, 1);
                }
              }
              this.getOrderDetail(this.$route.query.id);
            } else {
              that.$message.error(res.msg);
            }
          })['catch'](() => {

          });
        }
      })['catch'](() => {

      });
    },
    // 优惠记录
    showDiscountList(dt) {
      this.showDiscount = true;
      this.chooseItem = dt;
      this.discounts = dt.discounts;
      this.discountType = 'item';
    },
    showDiscountList2() {
      this.showDiscount = true;
      this.chooseItem = this.proDetail;
      this.discounts = JSON.parse(JSON.stringify(this.proDetail.discounts));
      this.discountType = 'order';
      // if(this.proDetail.originalAmount - this.proDetail.totalAmount > 0){
      //   let obj = {
      //     type:1,
      //     name:'商品优惠',
      //     amount:(this.proDetail.originalAmount - this.proDetail.totalAmount).toFixed(2),
      //     createdAt:'',
      //   }
      //   this.discounts.unshift(obj);
      // }
    },
    swtchTab(tp) {
      this.chooseTab = tp;
      let ref = tp;
      this.$nextTick(() => {
        this.$refs[ref].doLayout();
      });
    },
    goBack() {
      this.$router.back();
    },
    // 订单抹零折扣
    showChangeDiscount(dt) {
      this.showDiscount2 = true;
    },
    doIptDiscount() {
      var that = this;
      this.$refs.dialogForm.validate(valid => {
        if (valid) {
          var params = new URLSearchParams();
          params.append('id', this.$route.query.id);
          params.append('discount', this.dialogForm.orderDiscount);
          orderDiscountAmount(params).then(res => {
            if (res.code === 20000) {
              that.$message({
                message: res.msg,
                type: 'success'
              });
              that.getOrderDetail(that.$route.query.id);
            } else {
              that.$message.error(res.msg);
            }
          });
        }
      });
    },
    showChangeSubstact(dt) {
      this.showSubtrack = true;
    },
    doIptSubstract() {
      var that = this;
      var params = new URLSearchParams();
      params.append('id', this.$route.query.id);
      params.append('amount', this.orderSubtract);
      orderSubtractAmount(params).then(res => {
        if (res.code === 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.getOrderDetail(that.$route.query.id);
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    // 收款账号
    getPayeeList() {
      orderPayeeList().then(res => {
        if (res.code === 20000) {
          this.payeeList = res.data;
        }
      });
    },
    cacnleDelivery() {
      this.showDelivery = false;
      this.deliveryInfo = {
        orderId: '',
        deliveryAt: new Date(),
        transporter: '',
        number: '',
        remark: '',
        images: []
      };
    },
    cancleOrderPay() {
      this.payInfo = {
        orderId: '',
        paidAt: new Date(),
        amount: '',
        payeeAccountId: '',
        remark: '',
        images: []
      };
      this.showPay = false;
      this.chooseItem = '';
    },
    handleChangeCover(file) {
      this.fileCover = file.raw;
    },
    uploadFileCover(item) {
      var that = this;
      // 创建表单对象
      let form = new FormData();
      // 后端接受参数 ，可以接受多个参数
      form.append('image', that.fileCover);
      deliveryUpload(form).then(res => {
        if (res.code == 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          if (that.type == 'pay') {
            that.payInfo.images.push({
              img: res.data.url,
              name: item.file.name
            });
          } else if (that.type == 'delivery') {
            that.deliveryInfo.images.push({
              img: res.data.url,
              name: item.file.name
            });
          }
        } else {
          that.$message.error(res.msg);
        }
        form = null;
      })['catch'](() => {

      });
    },
    removeFileCover(file) {
      let removeArr = [];
      if (this.type == 'pay') {
        removeArr = this.payInfo.images;
      } else if (this.type == 'delivery') {
        removeArr = this.deliveryInfo.images;
      }

      for (var i = 0; i < removeArr.length; i++) {
        if (removeArr[i].name === file.name) {
          removeArr.splice(i, 1);
          break;
        }
      }
    },
    showDeliveryInfo() {
      var params = new URLSearchParams();
      params.append('id', this.$route.query.id);
      orderCheckDy(params).then(res => {
        if (res.code === 20000) {
          if (res.data.existsDynamic) {
            this.$message({
              message: this.$t('common.needChangPrice'),
              type: 'error'
            });
          } else {
            this.type = 'delivery';
            this.deliveryInfo.deliveryAt = new Date();
            this.showDelivery = true;
            this.chooseItem = this.proDetail;
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    showPayInfo() {
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      orderPayCharge(params).then(res => {
        if (res.code === 20000) {
          if (res.data.enabled) {
            this.type = 'pay';
            this.showPay = true;
            this.getPayeeList();
            this.payInfo.paidAt = new Date();
            this.chooseItem = this.proDetail;
          } else {
            this.$message.error(this.$t('common.afterPayDeal'));
          }
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    deliveryFn() {
      let images = [];
      if (this.deliveryInfo.images.length > 0) {
        for (var i = 0; i < this.deliveryInfo.images.length; i++) {
          images.push(this.deliveryInfo.images[i].img);
        }
      }
      let params = {
        orderId: this.chooseItem.id,
        deliveryAt: this.deliveryInfo.deliveryAt ? moment(this.deliveryInfo.deliveryAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '',
        transporter: this.deliveryInfo.transporter,
        number: this.deliveryInfo.number,
        remark: this.deliveryInfo.remark,
        images: images
      };
      orderDelivery(params).then(res => {
        if (res.code === 20000) {
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.showDelivery = false;
          this.getOrderDetail(this.$route.query.id);
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    orderPayFn(row) {
      this.$refs.payInfo.validate(valid => {
        if (valid) {
          let images = [];
          if (this.payInfo.images.length > 0) {
            for (var i = 0; i < this.payInfo.images.length; i++) {
              images.push(this.payInfo.images[i].img);
            }
          }
          let params = {
            orderId: this.chooseItem.id,
            paidAt: this.payInfo.paidAt ? moment(this.payInfo.paidAt).format('YYYY-MM-DD[T]HH:mm:ssZZ') : '',
            amount: this.payInfo.amount,
            payeeAccountId: this.payInfo.payeeAccountId,
            remark: this.payInfo.remark,
            images: images
          };
          orderPay(params).then(res => {
            if (res.code === 20000) {
              this.$message({
                message: res.msg,
                type: 'success'
              });
              this.showPay = false;
              this.getOrderDetail(this.$route.query.id);
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },

    orderFinishFn() {
      var that = this;
      var params = new URLSearchParams();
      params.append('id', this.proDetail.id);
      orderCheckDy(params).then(res => {
        if (res.code === 20000) {
          if (res.data.existsDynamic) {
            that.$message({
              message: that.$t('common.needChangPrice'),
              type: 'error'
            });
          } else {
            orderFinish(params).then(res2 => {
              if (res2.code === 20000) {
                that.$message({
                  message: res2.msg,
                  type: 'success'
                });
                that.getOrderDetail(that.$route.query.id);
              } else {
                that.$message.error(res2.msg);
              }
            })['catch'](() => {});
          }
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    orderApprove() {
      var that = this;
      var params = new URLSearchParams();
      params.append('id', this.proDetail.id);
      orderCheckDy(params).then(res => {
        if (res.code === 20000) {
          if (res.data.existsDynamic) {
            that.$message({
              message: that.$t('common.needChangPrice'),
              type: 'error'
            });
          } else {
            orderApprove(params).then(res2 => {
              if (res2.code === 20000) {
                that.$message({
                  message: res2.msg,
                  type: 'success'
                });
                that.getOrderDetail(that.$route.query.id);
              } else {
                that.$message.error(res2.msg);
              }
            })['catch'](() => {});
          }
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    orderAccept() {
      var that = this;
      var params = new URLSearchParams();
      params.append('id', this.proDetail.id);
      orderCheckDy(params).then(res => {
        if (res.code === 20000) {
          if (res.data.existsDynamic) {
            that.$message({
              message: that.$t('common.needChangPrice'),
              type: 'error'
            });
          } else {
            orderAccept(params).then(res2 => {
              if (res2.code === 20000) {
                that.$message({
                  message: res2.msg,
                  type: 'success'
                });
                that.getOrderDetail(that.$route.query.id);
              } else {
                that.$message.error(res2.msg);
              }
            })['catch'](() => {});
          }
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    orderCancel() {
      var that = this;
      that.$confirm(that.$t('common.cancleOrder') + '?', that.$t('common.ts'), {
        confirmButtonText: that.$t('common.conferma'),
        cancelButtonText: that.$t('common.annulla'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('id', this.proDetail.id);
        orderCancel(params).then(res => {
          if (res.code === 20000) {
            that.$message({
              message: res.msg,
              type: 'success'
            });
            that.getOrderDetail(that.$route.query.id);
          } else {
            that.$message.error(res.msg);
          }
        })['catch'](() => {});
      })['catch'](() => {});
    },
    showChangePrice(dt) {
      this.showPrice = true;
      this.itemId = dt.id;
      this.priceIpt = dt.finalPrice;
    },
    canclePrice() {
      this.itemId = '';
      this.priceIpt = '';
      this.showPrice = false;
    },
    doIptPrice() {
      var that = this;
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      params.append('itemId', this.itemId);
      params.append('price', this.priceIpt);
      itemPrice(params).then(res => {
        if (res.code === 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.canclePrice();
          that.getOrderDetail(that.$route.query.id);
        } else {
          that.$message.error(res.msg);
        }
      });
    },

    updateCount(row) {
      if (row.deleted) {
        return;
      }
      this.procductCount = row.count;
      this.itemId = row.id;
      this.showCount = true;
    },
    countSave() {
      var that = this;
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      params.append('itemId', this.itemId);
      params.append('count', this.procductCount);
      orderItemCountUpdate(params).then(res => {
        if (res.code === 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.countCancel();
          that.getOrderDetail(that.$route.query.id);
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    countCancel() {
      this.showCount = false;
      this.procductCount = '';
      this.itemId = '';
    },
    confirmOrderRemark() {
      var that = this;
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      params.append('remark', this.proDetail.remark);
      remarkRevise(params).then(function (res) {
        if (res.code == 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.disabledRemark = true;
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](function () {});
    },
    reviseRemark() {
      this.disabledRemark = false;
    },
    getCustomerList(keyword = '') {
      var that = this;
      var params = new URLSearchParams();
      params.append('keyword', keyword);
      supplierMerchantList(params).then(function (res) {
        var data = res.data;
        if (res.code == 20000) {
          that.customerList = data.list;
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](function () {});
    },
    showChangeCus() {
      this.showCustomer = true;
      this.customerIptId = this.proDetail.customerId;
      this.getCustomerList();
    },
    cancleCustomer() {
      this.showCustomer = false;
      this.customerIptId = '';
    },
    doChangeCustomer() {
      var that = this;
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      params.append('customerId', this.customerIptId);
      customerRevise(params).then(function (res) {
        if (res.code == 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.getOrderDetail(that.$route.query.id);
          that.showCustomer = false;
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](function () {});
    },
    deliveryAddress() {
      this.deliveryAddressShow = true;
      this.customerId = this.proDetail.customerId;
    },
    hideAddress() {
      this.deliveryAddressShow = false;
    },
    sureAddress(dt) {
      this.deliveryAddressShow = false;
      for (let i = 0; i < dt.length; i++) {
        if (dt[i].defaulted) {
          this.proDetail.deliveryAddress = dt[i];
        }
      }
      var that = this;
      var params = {
        orderId: that.$route.query.id,
        country: that.proDetail.deliveryAddress.country,
        province: that.proDetail.deliveryAddress.province,
        city: that.proDetail.deliveryAddress.city,
        zipcode: that.proDetail.deliveryAddress.zipcode,
        address: that.proDetail.deliveryAddress.address,
        houseNumber: that.proDetail.deliveryAddress.houseNumber,
        contactName: that.proDetail.deliveryAddress.contactName,
        contactPhone: that.proDetail.deliveryAddress.contactPhone,
        contactEmail: that.proDetail.deliveryAddress.contactEmail
      };
      orderUpdateAddress(params).then(res => {
        if (res.code == 20000) {
          that.getOrderDetail(this.$route.query.id);
          that.$message({
            message: res.msg,
            type: 'success'
          });
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](() => {});
    },
    cancleRemark() {
      this.showRemark = false;
      this.itemId = '';
      this.remarkIpt = '';
    },
    doIptRemark() {
      var that = this;
      var params = new URLSearchParams();
      params.append('orderId', this.$route.query.id);
      params.append('itemId', this.itemId);
      params.append('remark', this.remarkIpt);
      itemRemark(params).then(res => {
        if (res.code === 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.cancleRemark();
          that.getOrderDetail(that.$route.query.id);
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    showRemarkProduct(dt) {
      if (dt.deleted) {
        return;
      }
      for (let i = 0; i < this.chooseProductList.length; i++) {
        if (dt.id == this.chooseProductList[i].id) {
          this.remarkIpt = this.chooseProductList[i].remark;
          break;
        }
      }
      this.showRemark = true;
      this.itemId = dt.id;
    },
    removeProduct(row) {
      if (row.deleted) {
        return;
      }
      this.$confirm(this.$t('common.deleteIs') + '？', this.$t('common.ts'), {
        confirmButtonText: this.$t('common.conferma'),
        cancelButtonText: this.$t('common.annulla'),
        type: 'warning'
      }).then(() => {
        var params = new URLSearchParams();
        params.append('orderId', this.$route.query.id);
        params.append('itemId', row.id);
        orderItemDelete(params).then(res => {
          if (res.code === 20000) {
            this.$message({
              message: res.msg,
              type: 'success'
            });
            this.getOrderDetail(this.$route.query.id);
          } else {
            this.$message.error(res.msg);
          }
        });
      })['catch'](() => {});
    },
    delLine({ row, column, rowIndex, columnIndex }) {
      if (row.deleted) {
        return 'del_line';
      }
      if (row.dynamicPrice && row.finalPrice == 0) {
        return 'priceColor';
      }
    },
    chooseProduct() {
      this.currentPage = 1;
      this.getGoodsList(this.currentPage, this.pagesize);
      this.showProduct = true;
    },
    doChooseProduct() {
      let items = [];
      let charge = false;
      for (let i = 0; i < this.tmpChooseList.length; i++) {
        if (this.tmpChooseList[i].unAdd) {
          if (!this.tmpChooseList[i].count) {
            this.$message.error(this.$t('common.insertNum') + '！');
            charge = true;
            break;
          }
          let obj = {
            goodsId: this.tmpChooseList[i].id,
            skuId: this.tmpChooseList[i].sku.id,
            count: this.tmpChooseList[i].count,
            remark: ''
          };
          items.push(obj);
        }
      }
      if (charge) {
        return;
      }
      var that = this;
      let params = {
        orderId: this.$route.query.id,
        items: items
      };
      orderItemAdd(params).then(res => {
        if (res.code === 20000) {
          that.$message({
            message: res.msg,
            type: 'success'
          });
          that.showProduct = false;
          that.getOrderDetail(that.$route.query.id);
        } else {
          that.$message.error(res.msg);
        }
      });
    },
    getGoodsList(page, rows) {
      var that = this;
      var params = new URLSearchParams();
      params.append('page', page);
      params.append('rows', rows);
      params.append('keyword', this.keyword);
      getGoodsList(params).then((res) => {
        if (res.code == 20000) {
          that.totalCount = res.data.total;
          that.productList = [];
          let tmpList = JSON.parse(JSON.stringify(res.data.list));
          for (let i = 0; i < tmpList.length; i++) {
            if (tmpList[i].skus && tmpList[i].skus.length > 0) {
              for (let j = 0; j < tmpList[i].skus.length; j++) {
                let newObj = { ...tmpList[i] };
                newObj.count = 1;
                newObj.unAdd = true;
                newObj.checked = false;
                newObj.sku = tmpList[i].skus[j];
                that.productList.push(newObj);
              }
            }
          }
          that.$nextTick(() => {
            for (let i = 0; i < that.productList.length; i++) {
              for (let j = 0; j < that.chooseProductList.length; j++) {
                if (that.productList[i].id == that.chooseProductList[j].goodsId && that.chooseProductList[j].skuId == that.productList[i].sku.id) {
                  that.productList[i].remark = that.chooseProductList[j].remark;
                  that.productList[i].count = that.chooseProductList[j].count;
                  that.productList[i].checked = true;
                  that.productList[i].unAdd = false;
                  that.$refs.multipleTable.toggleRowSelection(that.productList[i], true);
                }
              }
            }
          });
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](() => {

      });
    },
    // 页码变更
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    // 每页显示数据量变更
    handleSizeChange(val) {
      this.pagesize = val;
    },
    bestSearch() {
      this.currentPage = 1;
      this.pagesize = 15;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    bestRemove() {
      this.keyword = '';
      this.currentPage = 1;
      this.pagesize = 15;
      this.getGoodsList(this.currentPage, this.pagesize);
    },
    handleSelectionChange(val) {
      this.tmpChooseList = val;
    },
    checkboxInit(row, index) {
      if (row.checked) {
        return 0;
      } else {
        return 1;
      }
    },
    getSpanArr(data) {
      for (var i = 0; i < data.length; i++) {
        if (i === 0) {
          this.spanArr.push(1);
          this.pos = 0;
        } else {
          // 判断当前元素与上一个元素是否相同
          if (data[i].id === data[i - 1].id) {
            this.spanArr[this.pos] += 1;
            this.spanArr.push(0);
          } else {
            this.spanArr.push(1);
            this.pos = i;
          }
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        const subRow = this.spanArr[rowIndex];
        const subCol = subRow > 0 ? 1 : 0;
        return { // [0,0] 表示这一行不显示， [2,1]表示行的合并数
          rowspan: subRow,
          colspan: subCol
        };
      }
    },
    // 订单详情
    getOrderDetail(id) {
      let that = this;
      let params = new URLSearchParams();
      params.append('id', id);
      b2cOrderDetail(params).then(function (res) {
        if (res.code == 20000) {
          that.proDetail = res.data;
          that.payments = res.data.b2cPayments;
          that.transport = res.data.transport ? [res.data.transport] : [];
          that.chooseProductList = res.data.items;
          for (let i = 0; i < that.chooseProductList.length; i++) {
            that.chooseProductList[i].xuhao = i + 1;
            that.chooseProductList[i].units = that.chooseProductList[i].units ? JSON.parse(that.chooseProductList[i].units) : [];
          }
          // 展示数据内容优化
          let lookHeight = 0;
          if (that.productList.length > 0) {
            if (that.$refs && that.$refs.table && that.$refs.table.$el) {
              lookHeight = window.innerHeight - that.$refs.table.$el.offsetTop;
            }
          }

          that.$nextTick(() => {
            let headHeight = document.querySelectorAll('thead')[0].offsetHeight;
            that.heightDate = lookHeight - headHeight - 50;
          });
          if (that.productList.length > 0) {
            that.productList.forEach((item, index) => {
              item.xh = index + 1;
            });
          }
        } else {
          that.$message.error(res.msg);
        }
      })['catch'](function () {});
    }
  },
  mounted() {
    this.getOrderDetail(this.$route.query.id);
  },
  computed: {},
  filters: {
    timeChange(val) {
      if (val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      } else {
        return '-';
      }
    },
    publishedValue(val, shangjia, xiajia) {
      if (val) {
        return shangjia;
      } else {
        return xiajia;
      }
    }
  },
  watch: {}
};

</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.fullDetail {
  width: 100%;
  height: 100%;
  background: #f5f7fa;

  .contentContainer {
    width: 100%;
    height: 100%;
    overflow: auto;

    .contentDetail {
      width: 1200px;
      height: 100%;
      padding-top: 20px;
      margin: 0 auto;

      /*overflow: auto;*/
      .process {
        width: 100%;
        margin-bottom: 30px;

        ul {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          li {
            width: 14%;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;

            .icn {
              width: 70px;
              height: 70px;
              border-radius: 50%;
              border: #d2d6de;
              display: flex;
              justify-content: center;
              align-items: center;
              background-color: #d2d6de;

              img {
                width: 30px;
              }
            }

            .active {
              background-color: rgb(224, 249, 212);
            }

            .name {
              margin-top: 12px;
            }
          }
        }
      }

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

        .title2 {
          position: relative;

          .el-tabs__nav-wrap {
            margin-bottom: -2px;
          }

          .el-tabs--card>.el-tabs__header .el-tabs__nav {
            border: none;
          }

          .el-tabs__item {
            height: 60px;
            line-height: 60px;
            font-weight: bold;
            border-top: 1px solid #E4E7ED;
          }

          .el-tabs--card>.el-tabs__header .el-tabs__item:first-child {
            border-left: 1px solid #E4E7ED;
          }

          .el-tabs--card>.el-tabs__header .el-tabs__item:last-child {
            border-right: 1px solid #E4E7ED;
          }

          .el-tabs--card>.el-tabs__header .el-tabs__item.is-active {
            border-top: 2px solid green;
          }

          #tab-first,
          #tab-second {
            margin-right: -4px;
          }

          .el-tabs__item.is-active {
            color: black;
          }
        }

        .content {
          padding: 5px 5px 5px 5px;

          .total {
            padding: 10px 0;

            .totalItem {
              padding: 6px 0;
              text-align: right;

              .name {
                font-size: 12px;
                font-weight: bold;
              }

              .value,
              .value2 {
                display: inline-block;
                padding-right: 5px;
                width: 150px;
                font-size: 16px;
                font-weight: bold;
                color: #f56954;
                vertical-align: middle;

                .unit {
                  font-size: 12px;
                }
              }

              .value2 {
                color: black;
              }
            }
          }
        }
      }

      .saleInfo {
        /*margin-top: 20px;*/
      }

      .payInfo {
        /*margin-top: 20px;
        margin-bottom: 100px;*/
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
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 99;
      }
    }
  }

}

</style>
