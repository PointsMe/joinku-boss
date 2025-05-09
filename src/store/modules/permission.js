import {
    commonRouterMap,
    constantRouterMap
} from '@/router'
// const permission = {
//   state: {
//     routers: constantRouterMap,
//   },
// }

// export default permission

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRouters = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles)
            }
            return true
        }
        return false
    })
    return accessedRouters
}

const permission = {
    state: {
        routers: commonRouterMap,
        addRouters: []
    },
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers
            state.routers = commonRouterMap.concat(routers)
        }
    },
    actions: {
        GenerateRoutes({
            commit
        }, data) {
            return new Promise(resolve => {
                const {
                    roles
                } = data
                // let accessedRouters
                // if (roles.indexOf('admin') >= 0) {
                //   accessedRouters = asyncRouterMap
                // } else {
                const accessedRouters = filterAsyncRouter(constantRouterMap, roles)
                // }
                commit('SET_ROUTERS', accessedRouters)
                resolve()
            })
        }
    }
}

export default permission