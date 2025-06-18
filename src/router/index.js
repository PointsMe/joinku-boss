import Vue from 'vue'
import Router from 'vue-router'

const _import = require('./_import_' + process.env.NODE_ENV)
Vue.use(Router)
import Layout from '../views/layout/Layout'

export const commonRouterMap = [
    {
        path: '/login',
        component: _import('Login'),
        hidden: true
    },
    {
        path: '/404',
        component: _import('404'),
        hidden: true
    }
]
export const constantRouterMap = [
    {
        path: '*',
        redirect: '/404',
        hidden: true
    },
    {
        path: '/',
        redirect: '/supplier',
        hidden: true
    },
    {
        path: '/supplier',
        name: 'wholesaler',
        redirect: '/supplier/list',
        component: Layout,
        meta: {
            title: 'wholesaler',
            active: false,
            icon: 'supplier',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'Supplier',
                component: _import('supplier/list'),
                meta: {
                    title: 'wholesalerList',
                    active: false,
                    roles: [101]
                }
            },{
                path: 'detail',
                name: 'SupplierDetail',
                hidden: true,
                component: _import('supplier/detail'),
                meta: {
                    title: 'wholesalerList',
                    active: false,
                    roles: [101]
                }
            },
        ]
    },
    {
        path: '/merchant',
        name: 'MerchantManage',
        redirect: '/merchant/list',
        component: Layout,
        meta: {
            title: 'merchant',
            active: false,
            icon: 'merchant',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'Merchant',
                component: _import('merchant/merchantList'),
                meta: {
                    title: 'merchantList',
                    active: false,
                    roles: [101]
                }
            },{
                path: 'detail',
                name: 'MerchantDetail',
                hidden: true,
                component: _import('merchant/detail'),
                meta: {
                    title: 'merchantList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'shop/list',
                name: 'Shop',
                component: _import('merchant/shopList'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101],
                    scrollTop: 0
                }
            },
            {
                path: 'shop/detail',
                name: 'ShopDetail',
                hidden: true,
                component: _import('merchant/shopDetail'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'shop/detail',
                name: 'ShopDetail',
                hidden: true,
                component: _import('merchant/shopDetail'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'subscribable',
                name: 'Subscribable',
                component: _import('merchant/Subscribable'),
                meta: {
                    title: 'subscribableServe',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'upgrade',
                name: 'Upgrade',
                component: _import('merchant/Upgrade'),
                meta: {
                    title: 'upgradeList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'renew-approval',
                name: 'RenewApproval',
                component: _import('merchant/RenewApproval'),
                meta: {
                    title: 'renewApproval',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/onlineShop',
        name: 'onlineShop',
        redirect: '/onlineShop/list',
        component: Layout,
        meta: {
            title: 'onlineShopManage',
            active: false,
            icon: 'onlineShop',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'shopList',
                component: _import('shop/list'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/wholesale',
        name: 'productManage',
        redirect: '/wholesale/list',
        component: Layout,
        meta: {
            title: 'productManage',
            active: false,
            icon: 'product',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'productList',
                component: _import('wholesale/productList'),
                meta: {
                    title: 'productManage',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'category',
                name: 'category',
                component: _import('wholesale/categoryList'),
                meta: {
                    title: 'classify',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/retail',
        name: 'productManage2',
        redirect: '/retail/list',
        component: Layout,
        meta: {
            title: 'productManage2',
            active: false,
            icon: 'product',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'productList',
                component: _import('retail/productList'),
                meta: {
                    title: 'productManage2',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'category',
                name: 'category',
                component: _import('retail/categoryList'),
                meta: {
                    title: 'classify2',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/platform',
        name: 'Platform',
        redirect: '/platform/product',
        component: Layout,
        meta: {
            title: 'productLibrary',
            active: false,
            icon: 'product_lib',
            roles: [101]
        },
        children: [
            {
                path: 'product',
                name: 'PlatformProduct',
                component: _import('platform/Product'),
                meta: {
                    title: 'productList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'product-edit',
                name: 'PlatformProductEdit',
                component: _import('platform/ProductEdit'),
                hidden: true,
                meta: {
                    title: 'productList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'product-import',
                name: 'PlatformProductImport',
                component: _import('platform/ProductImport'),
                hidden: true,
                meta: {
                    title: 'productList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'audit',
                name: 'PlatformAudit',
                component: _import('platform/Audit'),
                meta: {
                    title: 'productAudit',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'classify',
                name: 'PlatformClassify',
                component: _import('platform/Classify'),
                meta: {
                    title: 'classifyManage',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'brand',
                name: 'PlatformBrand',
                component: _import('platform/Brand'),
                meta: {
                    title: 'brand',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/jkb',
        name: 'JkbManage',
        redirect: '/jkb/list',
        component: Layout,
        meta: {
            title: 'JkbManage',
            active: false,
            icon: 'merchant',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'JkbMerchant',
                component: _import('beauty/merchantList'),
                meta: {
                    title: 'merchantList',
                    active: false,
                    roles: [101]
                }
            },{
                path: 'detail',
                name: 'JkbMerchantDetail',
                hidden: true,
                component: _import('beauty/detail'),
                meta: {
                    title: 'merchantList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'shop/list',
                name: 'JkbShop',
                component: _import('beauty/shopList'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101],
                    scrollTop: 0
                }
            },
            {
                path: 'shop/detail',
                name: 'JkbShopDetail',
                hidden: true,
                component: _import('beauty/shopDetail'),
                meta: {
                    title: 'shopList',
                    active: false,
                    roles: [101]
                }
            },
        ]
    },
    {
        path: '/b2cOrder',
        name: 'b2cOrder',
        redirect: '/b2cOrder/list',
        component: Layout,
        meta: {
            title: 'b2cOrderManage',
            active: false,
            icon: 'b2c',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'b2cOrderList',
                component: _import('b2c/list'),
                meta: {
                    title: 'b2cList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'pay',
                name: 'pay',
                component: _import('b2c/payList'),
                meta: {
                    title: 'payList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'detail',
                name: 'b2cOrderDetail',
                hidden: true,
                component: _import('b2c/detail'),
                meta: {
                    title: 'b2cOrderDetail',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/invoice',
        name: 'invoiceManage',
        redirect: '/invoice/merchant',
        component: Layout,
        meta: {
            title: 'invoiceManage',
            active: false,
            icon: 'invoice',
            roles: [101]
        },
        children: [
            {
                path: 'merchant',
                name: 'merchant',
                component: _import('invoice/merchant'),
                meta: {
                    title: 'invoceMerchant',
                    active: false,
                    roles: [101]
                }
            },{
                path: 'merchant/detail',
                name: 'merchantInvoiceDetail',
                hidden: true,
                component: _import('invoice/detail'),
                meta: {
                    title: 'invoceMerchant',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'vfMerchant',
                name: 'vfMerchant',
                component: _import('invoice/vf/merchant'),
                meta: {
                    title: 'vfMerchant',
                    active: false,
                    roles: [101]
                }
            },{
                path: 'vfMerchant/detail',
                name: 'vfMerchantDetail',
                hidden: true,
                component: _import('invoice/vf/detail'),
                meta: {
                    title: 'vfMerchant',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'send',
                name: 'sendList',
                component: _import('invoice/sendList'),
                meta: {
                    title: 'sendList',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'received',
                name: 'receivedList',
                component: _import('invoice/receivedList'),
                meta: {
                    title: 'receivedList',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/sales',
        name: 'SalesManage',
        redirect: '/sales/list',
        component: Layout,
        meta: {
            title: 'salesManage',
            active: false,
            icon: 'sales',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'SalesList',
                component: _import('salesmanManage/list'),
                meta: {
                    title: 'salesList',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/contact',
        name: 'Contact',
        redirect: '/contact/list',
        component: Layout,
        meta: {
            title: 'ContactManage',
            active: false,
            icon: 'contact',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'ContactList',
                component: _import('contact/list'),
                meta: {
                    title: 'ContactList',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/employee',
        name: 'employeeManage',
        redirect: '/employee/list',
        component: Layout,
        meta: {
            title: 'employeeManage',
            active: false,
            icon: 'employee',
            roles: [101]
        },
        children: [
            {
                path: 'list',
                name: 'employeeInfo',
                component: _import('employee/employeeList'),
                meta: {
                    title: 'employeeInfo',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: 'role/list',
                name: 'jslb',
                component: _import('employee/roleList'),
                meta: {
                    title: 'jslb',
                    active: false,
                    roles: [101]
                }
            },
            {
                path: '/roleDetail',
                name: 'jslbDetail',
                hidden: true,
                component: _import('employee/roleDetail'),
                meta: {
                    title: 'jslb',
                    active: false,
                    roles: [101]
                }
            }
        ]
    },
    {
        path: '/system',
        name: 'SystemManage',
        redirect: '/system/order_sys',
        component: Layout,
        meta: {
            title: 'systemManage',
            active: false,
            icon: 'system',
            roles: [101]
        },
        children: [
            {
                path: 'order_sys',
                name: 'OrderSys',
                component: _import('setting/orderSys'),
                meta: {
                    title: 'orderSys',
                    active: false,
                    roles: [101]
                }
            }
        ]
    }
]

const appRouter = new Router({
    // mode: 'history', //后端支持可开
    base: '/',
    scrollBehavior: () => ({
        y: 0
    }), // 当转到一个新页面时 在最顶端
    routes: commonRouterMap
})

export default appRouter
