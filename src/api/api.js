import request from "@/utils/request";

//登录
export function loginOn(data) {
  return request({
    url: "api/v1/login",
    method: "post",
    params: data
  });
}

// 退出登录
export function loginOut(data) {
  return request({
    url: "/logout",
    method: "post",
    data
  });
}
// 供应商列表
export function getSupplierList(data) {
  return request({
    url: "api/v1/supplier/page",
    method: "post",
    data
  });
}
export function getSupplierDetail(data) {
  return request({
    url: "api/v1/supplier/detail",
    method: "post",
    data
  });
}
export function getSupplierCreate(data) {
  return request({
    url: "api/v1/supplier/create",
    method: "post",
    data
  });
}
export function getSupplierUpdate(data) {
  return request({
    url: "api/v1/supplier/update",
    method: "post",
    data
  });
}
// 供应商员工列表
export function supplierEmpList(data) {
  return request({
    url: "api/v1/merchant/employee/list",
    method: "get",
    params: data
  });
}
//供应商员工生成临时密码
export function supplierEmpPwd(data) {
  return request({
    url: "api/v1/merchant/employee/create/tmp_pwd",
    method: "post",
    params: data
  });
}
//零售商
export function getMerchantList(data) {
  return request({
    url: "api/v1/merchant/page",
    method: "post",
    data
  });
}
export function getMerchantDetail(data) {
  return request({
    url: "api/v1/merchant/detail",
    method: "post",
    data
  });
}
export function getMerchantCreate(data) {
  return request({
    url: "api/v1/merchant/create",
    method: "post",
    data
  });
}
export function getMerchantUpdate(data) {
  return request({
    url: "api/v1/merchant/update",
    method: "post",
    data
  });
}
//批发商详情
export function supplierDetail(data) {
  return request({
    url: "api/v1/supplier/detail",
    method: "get",
    params: data
  });
}
//业务员列表
export function getSalesmanList(data) {
  return request({
    url: "api/v1/salesman/list",
    method: "get",
    params: data
  });
}
//业务员启用禁用
export function salesmanEnabled(data) {
  return request({
    url: "api/v1/salesman/enabled/update",
    method: "post",
    params: data
  });
}

//业务员生成临时密码
export function salesmanPwd(data) {
  return request({
    url: "api/v1/salesman/create/tmp_pwd",
    method: "post",
    params: data
  });
}

// 验证码登录
export function loginQuickLogin(data) {
  return request({
    url: "api/v1/quick_login",
    method: "post",
    params: data
  });
}

// 获取验证码
export function verificationCodeSend(data) {
  return request({
    url: "api/v1/verification_code/send",
    method: "post",
    data
  });
}
//校验验证码
export function checkVerificationCode(data) {
  return request({
    url: "api/v1/verification_code/check",
    method: "get",
    params: data
  });
}
//校验手机号
export function checkMobile(data) {
  return request({
    url: "api/v1/account/check",
    method: "get",
    params: data
  });
}

//个人用户
export function userDetail() {
  return request({
    url: "api/v1/me/detail",
    method: "get",
  });
}
//修改用户名
export function usernameUpdate(data) {
  return request({
    url: "api/v1/me/username/update",
    method: "post",
    data
  });
}
//修改头像
export function avatarUpdate(data) {
  return request({
    url: "api/v1/me/avatar/update",
    method: "post",
    data
  });
}

//修改密码
export function pswUpdate(data) {
  return request({
    url: "api/v1/me/password/update",
    method: "post",
    data
  });
}
//修改手机号
export function mobileUpdate(data) {
  return request({
    url: "api/v1/me/mobile/update",
    method: "post",
    data
  });
}
//消息中心 消息列表
export function messageList(data) {
  return request({
    url: "api/v1/message/list",
    method: "get",
    params: data
  });
}
//消息未读消息数
export function messageUnread() {
  return request({
    url: "api/v1/message/unread/count",
    method: "get",
  });
}

//已读消息
export function messageRead(data) {
  return request({
    url: "api/v1/message/read",
    method: "post",
    data
  });
}
//操作日志
export function logList() {
  return request({
    url: "api/v1/order/log/list",
    method: "get",
  });
}
// 类目管理
export function classifyTree(data) {
  return request({
    url: "api/v1/b2c/category/tree",
    method: "get",
    params: data
  });
}
// 创建分类
export function classifyCreate(data) {
  return request({
    url: 'api/v1/b2c/category/create',
    method: 'post',
    data
  });
}
// 删除分类
export function delClassifyList(data) {
  return request({
    url: 'api/v1/b2c/category/delete',
    method: 'post',
    params: data
  });
}

// 更新分类
export function classifyUpdate(data) {
  return request({
    url: 'api/v1/b2c/category/update',
    method: 'post',
    data
  });
}
// 迁移分类
export function transferClassify(data) {
  return request({
    url: 'api/v1/b2c/category/goods/transfer',
    method: 'post',
    data
  });
}
// 分类图片导入
export function classifyImageImport(data) {
  return request({
    url: 'api/v1/b2c/category/image/import',
    method: 'post',
    data
    // onUploadProgress: params.onUploadProgress
  });
}
// 上传图片
export function uploadMenuImg(data) {
  return request({
    url: 'api/v1/b2c/category/image/upload',
    method: 'post',
    data
  });
}
// 商品列表
export function getGoodsList(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/list',
    method: 'get',
    params: data
  });
}
//调价
export function raisePrice(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/raise_price/update',
    method: 'post',
    data
  });
}
//供应商分类调价
export function suppliyCateraisePrice(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/raise_price/update_by_condition',
    method: 'post',
    data
  });
}
// 删除商品
export function getGoodsDelete(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/remove',
    method: 'post',
    params: data
  });
}
//代理信息
export function agentDelete(data) {
  return request({
    url: 'api/v1/merchant/agent/delete',
    method: 'post',
    params: data
  });
}
//添加代理
export function agentAdd(data) {
  return request({
    url: 'api/v1/merchant/agent/create',
    method: 'post',
    data
  });
}
//更新代理
export function agentUpdate(data) {
  return request({
    url: 'api/v1/merchant/agent/update',
    method: 'post',
    data
  });
}
//分销商品选择 可分销商品
export function goodsSupplyList(data) {
  return request({
    url: 'api/v1/b2c/goods/supply/list',
    method: 'get',
    params: data
  });
}
//可分销商品类目
export function classifyTree2(data) {
  return request({
    url: 'api/v1/b2c/classify/tree',
    method: 'get',
    params: data
  });
}
export function classifyTree3(data) {
  return request({
    url: 'api/v1/b2c/classify/undistributed/tree',
    method: 'get',
    params: data
  });
}
//已分销商品
export function goodsDistributionList(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/list',
    method: 'get',
    params: data
  });
}
//已分销商品类目
export function categoryTree(data) {
  return request({
    url: 'api/v1/b2c/category/tree',
    method: 'get',
    params: data
  });
}
//分销商品迁移
export function distributionGoodsAdd(data, merchantId) {
  return request({
    url: 'api/v1/b2c/goods/distribution/add?merchantId=' + merchantId,
    method: 'post',
    data
  });
}
//分销分类
export function distributionCategory(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/add_by_condition',
    method: 'post',
    data
  });
}
//更换分类
export function categoryUpdate(data) {
  return request({
    url: 'api/v1/b2c/goods/distribution/category/update',
    method: 'post',
    data
  });
}
//发票管理
export function getInoviceMerList(data) {
  return request({
    url: "api/v3/sf/merchant/page",
    method: "post",
    data
  });
}
export function inoviceMerCreate(data) {
  return request({
    url: "api/v3/sf/merchant/create",
    method: "post",
    data
  });
}
export function inoviceMerUpdate(data) {
  return request({
    url: "api/v3/sf/merchant/update",
    method: "post",
    data
  });
}
export function inoviceMerDetail(data) {
  return request({
    url: "api/v3/sf/merchant/detail",
    method: "post",
    data
  });
}
export function vatNumberCheck(data) {
  return request({
    url: "api/v3/sf/merchant/vatnumber/check",
    method: "post",
    data
  });
}
export function taxCodeCheck(data) {
  return request({
    url: "api/v3/sf/merchant/taxcode/check",
    method: "post",
    data
  });
}
export function invoiceSendList(data) {
  return request({
    url: "api/v3/sf/invoice/sent/page",
    method: "post",
    data
  });
}
export function invoiceSendDetail(data) {
  return request({
    url: "api/v3/sf/invoice/sent/detail",
    method: "post",
    data
  });
}
export function invoiceReceivedList(data) {
  return request({
    url: "api/v3/sf/invoice/received/page",
    method: "post",
    data
  });
}
export function invoiceReceivedDetail(data) {
  return request({
    url: "api/v3/sf/invoice/received/detail",
    method: "post",
    params:data
  });
}
export function invoiceReceivedBind(data) {
  return request({
    url: 'api/v3/sf/invoice/received/bind',
    method: 'post',
    data
  });
}
export function invoiceReceivedUntied(data) {
  return request({
    url: 'api/v3/sf/invoice/received/unbind',
    method: 'post',
    params:data
  });
}
export function getVatList(data) {
  return request({
    url: "api/v3/sf/invoice/vat/list",
    method: "get",
    params: data
  });
}
//绑定点餐商家
export function merchantRelationList(data) {
  return request({
    url: "api/v3/sf/merchant/relation/list",
    method: "get",
    params: data
  });
}
export function lenderPointsmeList(data) {
  return request({
    url: "api/v3/sf/merchant/relation/list",
    method: "get",
    params: data
  });
}
export function lenderPointsmeSearch(data) {
  return request({
    url: "api/v3/sf/merchant/relation/pointsme/search",
    method: "get",
    params: data
  });
}
export function lenderAmySearch(data) {
  return request({
    url: "api/v3/sf/merchant/relation/amysushi/search",
    method: "get",
    params: data
  });
}
export function lenderShopSearch(data) {
  return request({
    url: "api/v3/sf/merchant/relation/joyingo/offline_shop/search",
    method: "get",
    params: data
  });
}
export function lenderJoyingoSearch(data) {
  return request({
    url: "api/v3/sf/merchant/relation/joyingo/search",
    method: "get",
    params: data
  });
}
export function lenderPointsmeBind(data) {
  return request({
    url: 'api/v3/sf/merchant/relation/bind',
    method: 'post',
    data
  });
}
export function lenderPointsmeUntied(data) {
  return request({
    url: 'api/v3/sf/merchant/relation/unbind',
    method: 'post',
    params: data
  });
}
export function merchantRelationPrebind(data) {
  return request({
    url: 'api/v3/sf/merchant/relation/prebind',
    method: 'post',
    data
  });
}
//套餐续费
export function packageRenew(data) {
  return request({
    url: 'api/v3/sf/merchant/package/renew',
    method: 'post',
    data
  });
}
//套餐升级
export function lenderPreupgrade(data) {
  return request({
    url: "api/v1/inv/merchant/preupgrade",
    method: "get",
    params: data
  });
}
export function packageList(data) {
  return request({
    url: "api/v3/sf/merchant/package/list",
    method: "get",
    params: data
  });
}
export function lenderUpgrade(data) {
  return request({
    url: 'api/v3/sf/merchant/package/change',
    method: 'post',
    data
  });
}
//門店列表
export function o2oShopPage(data) {
  return request({
    url: 'api/v1/o2o/shop/page',
    method: 'post',
    data
  });
}
export function o2oShopDetail(data) {
  return request({
    url: 'api/v1/o2o/shop/detail',
    method: 'post',
    data
  });
}
export function o2oShopCreate(data) {
  return request({
    url: 'api/v1/o2o/shop/create',
    method: 'post',
    data
  });
}
export function o2oShopUpdate(data) {
  return request({
    url: 'api/v1/o2o/shop/update',
    method: 'post',
    data
  });
}
export function o2oShopHostList(data) {
  return request({
    url: 'api/v1/o2o/shop/host/list',
    method: 'post',
    params: data
  });
}
export function o2oShopHostCreate(data) {
  return request({
    url: 'api/v1/o2o/shop/host/create',
    method: 'post',
    data
  });
}
//线上门店
export function onlineShopList(data) {
  return request({
    url: "api/v1/b2c/online_shop/list",
    method: "get",
    params: data
  });
}
//禁用
export function onlineShopDisable(data) {
  return request({
    url: 'api/v1/b2c/online_shop/disable',
    method: 'post',
    data
  });
}
//启用
export function onlineShopEnable(data) {
  return request({
    url: 'api/v1/b2c/online_shop/enable',
    method: 'post',
    data
  });
}
//审核通过
export function onlineShopApprove(data) {
  return request({
    url: 'api/v1/b2c/online_shop/approve',
    method: 'post',
    data
  });
}
//审核不通过
export function onlineShopDisApprove(data) {
  return request({
    url: 'api/v1/b2c/online_shop/disapprove',
    method: 'post',
    data
  });
}
export function b2cOrderList(data) {
  return request({
    url: "api/v1/b2c/order/list",
    method: "get",
    params: data
  });
}
export function b2cOrderDetail(data) {
  return request({
    url: "api/v1/b2c/order/detail",
    method: "get",
    params: data
  });
}
// 修改子订单价格
export function orderItemCountUpdate(data) {
  return request({
    url: 'api/v1/b2c/order/item/count/update',
    method: 'post',
    data
  });
}
// 更新订单商品备注
export function itemRemark(data) {
  return request({
    url: 'api/v1/b2c/order/item/remark/update',
    method: 'post',
    data
  });
}
// 删除子订单
export function orderItemDelete(data) {
  return request({
    url: 'api/v1/b2c/order/item/delete',
    method: 'post',
    params: data
  });
}
// 更新订单商品价格
export function itemPrice(data) {
  return request({
    url: 'api/v1/b2c/order/item/price/update',
    method: 'post',
    data
  });
}
// 订单折扣
export function orderDiscountAmount(data) {
  return request({
    url: 'api/v1/b2c/order/discount',
    method: 'post',
    data
  });
}
// 订单抹零
export function orderSubtractAmount(data) {
  return request({
    url: 'api/v1/b2c/order/final_amount/update',
    method: 'post',
    data
  });
}
// 订单新增商品
export function orderItemAdd(data) {
  return request({
    url: 'api/v1/order/item/add',
    method: 'post',
    data
  });
}
// 订单详情优惠删除
export function orderItemDiscountDelete(data) {
  return request({
    url: 'api/v1/b2c/order/item/discount/delete',
    method: 'post',
    data
  });
}
// 订单优惠删除
export function orderDiscountDelete(data) {
  return request({
    url: 'api/v1/b2c/order/discount/delete',
    method: 'post',
    data
  });
}
// 收款列表
export function orderPayeeList(data) {
  return request({
    url: 'api/v1/sys/payee/list',
    method: 'get',
    params: data
  });
}
// 收款新建
export function orderPayeeCreate(data) {
  return request({
    url: 'api/v1/sys/payee/create',
    method: 'post',
    data
  });
}
// 收款更新
export function orderPayeeUpadate(data) {
  return request({
    url: 'api/v1/sys/payee/update',
    method: 'post',
    data
  });
}
// 收款删除
export function orderPayeeDelete(data) {
  return request({
    url: 'api/v1/sys/payee/delete',
    method: 'post',
    data
  });
}
// 收款启用禁用
export function orderPayeeEnable(data) {
  return request({
    url: 'api/v1/sys/payee/enabled',
    method: 'post',
    data
  });
}
export function orderPayCharge(data) {
  return request({
    url: 'api/v1/b2c/payment/check',
    method: 'get',
    params: data
  });
}
// 订单收款
export function orderPay(data) {
  return request({
    url: 'api/v1/b2c/payment/apply',
    method: 'post',
    data
  });
}
export function payUpload(data) {
  return request({
    url: 'api/v1/image/upload',
    method: 'post',
    data
  });
}
export function uploadImage(data) {
  return request({
    url: 'api/v1/image/upload',
    method: 'post',
    data
  });
}
// 收款管理列表
export function paymentList(data) {
  return request({
    url: 'api/v1/b2c/payment/list',
    method: 'get',
    params: data
  });
}
// 审核
export function paymentApprove(data) {
  return request({
    url: 'api/v1/b2c/payment/approve',
    method: 'post',
    data
  });
}
// 作废
export function paymentDisapprove(data) {
  return request({
    url: 'api/v1/b2c/payment/disapprove',
    method: 'post',
    data
  });
}

export function lenderRePsw(data) {
  return request({
    url: 'api/v3/sf/employee/password/reset',
    method: 'post',
    data
  });
}
export function employeeMobileUpdt(data) {
  return request({
    url: 'api/v3/sf/employee/mobile/update',
    method: 'post',
    data
  });
}
export function employeeEmailUpdt(data) {
  return request({
    url: 'api/v3/sf/employee/email/update',
    method: 'post',
    data
  });
}
export function sfEmployeePage(data) {
  return request({
    url: 'api/v3/sf/employee/page',
    method: 'post',
    data
  });
}
export function sfEmployeeTempPsw(data) {
  return request({
    url: 'api/v3/sf/employee/password/template',
    method: 'post',
    data
  });
}
export function invLenderEnable(data) {
  return request({
    url: 'api/v3/sf/merchant/enable',
    method: 'post',
    data
  });
}
export function invLenderDisable(data) {
  return request({
    url: 'api/v3/sf/merchant/disable',
    method: 'post',
    data
  });
}
export function invLenderSearchEnable(data) {
  return request({
    url: 'api/v3/sf/merchant/subscribe/creditsafe/enable',
    method: 'post',
    data
  });
}
export function invLenderSearchDisable(data) {
  return request({
    url: 'api/v3/sf/merchant/subscribe/creditsafe/disable',
    method: 'post',
    data
  });
}

//付款方式管理
export function paymodeList(data) {
  return request({
    url: 'api/v1/sys/paymode/list',
    method: 'get',
    params: data
  });
}
export function paymodeUpdate(data) {
  return request({
    url: 'api/v1/sys/paymode/update',
    method: 'post',
    data
  });
}
//语言配置列表
export function setLanguageList(data) {
  return request({
    url: 'api/v1/sys/lang/list',
    method: 'get',
    params: data
  });
}
//咨询列表
export function contactList(data) {
  return request({
    url: 'api/v1/contact_us/list',
    method: 'get',
    params: data
  });
}

/**
 * 获取员工列表
 * @param data
 * @returns {*}
 */
export function getGmployeeList(data) {
    return request({
        url: 'api/v1/employee/list',
        method: 'get',
        params: data
    });
}

/**
 * 员工启用
 * @param data
 * @returns {*}
 */
export function employeeEnable(data) {
    return request({
        url: 'api/v1/employee/enable',
        method: 'post',
        data: data
    });
}

/**
 * 员工禁用
 * @param data
 * @returns {*}
 */
export function employeeDisable(data) {
    return request({
        url: 'api/v1/employee/disable',
        method: 'post',
        data: data
    });
}

/**
 * 员工删除
 * @param data
 * @returns {*}
 */
export function employeeDetele(data) {
    return request({
        url: 'api/v1/employee/delete',
        method: 'post',
        data: data
    });
}

/**
 * 角色列表
 * @param data
 * @returns {*}
 */
export function getRoleList(data) {
    return request({
        url: 'api/v1/role/list',
        method: 'get',
        params: data
    });
}

/**
 * 员工创建
 * @param data
 * @returns {*}
 */
export function employeeCreate(data) {
    return request({
        url: 'api/v1/employee/create',
        method: 'post',
        data
    });
}

/**
 * 员工更新
 * @param data
 * @returns {*}
 */
export function employeeUpdate(data) {
    return request({
        url: 'api/v1/employee/update',
        method: 'post',
        data
    });
}

/**
 * 员工详情
 * @param data
 * @returns {*}
 */
export function employeeDetail(data) {
    return request({
        url: 'api/v1/employee/detail',
        method: 'get',
        params: data
    });
}

/**
 * 重置员工密码
 * @param data
 * @returns {*}
 */
export function employeePasswordReset(data) {
    return request({
        url: 'api/v1/employee/password/reset',
        method: 'post',
        data: data
    });
}

/**
 * 员工登录名校验
 * @param data
 * @returns {*}
 */
export function employeeLoginNameCheck(data) {
    return request({
        url: 'api/v1/employee/account/check',
        method: 'get',
        params: data
    });
}

/**
 * 角色创建
 * @param data
 * @returns {*}
 */
export function roleCreate(data) {
    return request({
        url: 'api/v1/role/create',
        method: 'post',
        data
    });
}

/**
 * 角色更新
 * @param data
 * @returns {*}
 */
export function roleUpdate(data) {
    return request({
        url: 'api/v1/role/update',
        method: 'post',
        data
    });
}

/**
 * 获取code列表
 * @param data
 * @returns {*}
 */
export function rolePermsList(data) {
    return request({
        url: 'api/v1/perms/list',
        method: 'get',
        data
    });
}

/**
 * 角色详情
 * @param data
 * @returns {*}
 */
export function roleDetail(data) {
    return request({
        url: 'api/v1/role/detail',
        method: 'get',
        params: data
    });
}

/**
 * 角色启用
 * @param data
 * @returns {*}
 */
export function roleEnable(data) {
    return request({
        url: 'api/v1/role/enable',
        method: 'post',
        data: data
    });
}

/**
 * 角色禁用
 * @param data
 * @returns {*}
 */
export function roleDisable(data) {
    return request({
        url: 'api/v1/role/disable',
        method: 'post',
        data: data
    });
}

/**
 * 角色删除
 * @param data
 * @returns {*}
 */
export function roleDetele(data) {
    return request({
        url: 'api/v1/role/delete',
        method: 'post',
        data: data
    });
}

/**
 * 查询可订阅服务列表
 * @param data
 * @returns {*}
 */
export function querySubscribableList(data) {
    return request({
        url: 'api/v1/merchant/service/subscribable/page',
        method: 'post',
        data: data
    });
}

/**
 * 创建可订阅服务
 * @param data
 * @returns {*}
 */
export function createSubscribable(data) {
    return request({
        url: 'api/v1/merchant/service/subscribable/create',
        method: 'post',
        data: data
    });
}

/**
 * 查询可订阅服务详情
 * @param data
 * @returns {*}
 */
export function querySubscribableDetails(data) {
    return request({
        url: 'api/v1/merchant/service/subscribable/detail',
        method: 'get',
        params: data
    });
}

/**
 * 修改可订阅服务
 * @param data
 * @returns {*}
 */
export function updateSubscribable(data) {
    return request({
        url: 'api/v1/merchant/service/subscribable/update',
        method: 'post',
        data: data
    });
}

/**
 * 删除可订阅服务
 * @param data
 * @returns {*}
 */
export function deleteSubscribable(data) {
    return request({
        url: 'api/v1/merchant/service/subscribable/delete',
        method: 'post',
        params: data
    });
}

/**
 * 查询续费审批列表
 * @param data
 * @returns {*}
 */
export function queryRenewApprovalList(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/page',
        method: 'post',
        data: data
    });
}

/**
 * 查询续费审批详情
 * @param data
 * @returns {*}
 */
export function queryRenewApprovalDetails(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/detail',
        method: 'get',
        params: data
    });
}

/**
 * 续费审批通过
 * @param data
 * @returns {*}
 */
export function renewApprovalPass(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/approve',
        method: 'post',
        params: data
    });
}

/**
 * 续费审批不通过
 * @param data
 * @returns {*}
 */
export function renewApprovalNoPass(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/disapprove',
        method: 'post',
        params: data
    });
}

/**
 * 续费审批取消
 * @param data
 * @returns {*}
 */
export function renewApprovalCancel(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/cancel',
        method: 'post',
        params: data
    });
}

/**
 * 查询商家可订阅服务列表
 * @param data
 * @returns {*}
 */
export function queryMerMayServe(params) {
    return request({
        url: 'api/v1/merchant/service/subscribable/preSubscribe',
        method: 'post',
        data: params
    });
}

/**
 * 查询商家已订阅服务列表
 * @param data
 * @returns {*}
 */
export function queryMerSubServe(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/search',
        method: 'post',
        data: data
    });
}

/**
 * 添加商家订阅服务
 * @param data
 * @returns {*}
 */
export function createMerSubServe(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/create',
        method: 'post',
        data: data
    });
}

/**
 * 查询商家已订阅服务详情
 * @param data
 * @returns {*}
 */
export function queryMerSubServeDetails(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/detail',
        method: 'get',
        params: data
    });
}

/**
 * 取消商家订阅服务
 * @param data
 * @returns {*}
 */
export function deleteMerSubServe(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/delete',
        method: 'post',
        params: data
    });
}

/**
 * 商家订阅服务续费
 * @param data
 * @returns {*}
 */
export function merSubServeRenew(data) {
    return request({
        url: 'api/v1/merchant/service/subscribe/renew/create',
        method: 'post',
        data: data
    });
}
//国家列表
export function getCountryList() {
  return request({
    url: "api/v1/region/country/list",
    method: "get",
  });
}
//省份列表
export function getProvinceList(data) {
  return request({
    url: "api/v1/region/province/list",
    method: "get",
    params: data
  });
}
//城市列表
export function getCityList(data) {
  return request({
    url: "api/v1/region/city/list",
    method: "get",
    params: data
  });
}

/**
 * 查询商家订阅编号
 * @returns {*}
 */
export function queryMerchantSubscribeNo() {
    return request({
        url: "api/v1/merchant/service/subscribable/selector",
        method: "post"
    });
}

/**
 * 查询商家可订阅编号
 * @returns {*}
 */
export function queryMerchantCanSubscribeNo() {
    return request({
        url: "api/v1/merchant/service/subscribable/preSelector",
        method: "post"
    });
}
