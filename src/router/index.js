import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store"
import axios from "axios";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        name: 'HomeVue',
        component: () => import('@/components/cashFlow/Home')
    },
    {
        path: '/cash_flow',
        name: 'HomeVue',
        component: () => import('@/components/cashFlow/Home')
    },
    {
        path: '/gpt',
        name: 'GptVue',
        component: () => import('@/components/gpt/Gpt')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let hasRoute = store.state.menus.hasRoutes
    let token = localStorage.getItem("token")
    if (to.path === '/login' || to.path === '/captcha' || to.path === '/cash_flow' || to.path === '/' || to.path === '/gpt') {
        next()
    } else if (!token) {
        next({path: '/login'})
    } else {
        axios.get("/sys/menu/nav", {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }).then(res => {
            // 拿到menuList
            store.commit("setMenuList", res.data.data.nav)
            // 拿到用户权限
            store.commit("setPermList", res.data.data.authority)

            let newRoutes = router.options.routes
            // 动态绑定路由
            res.data.data.nav.forEach((menu) => {
                if (menu.children) {
                    menu.children.forEach((e) => {
                        let route = menuToRoute(e)
                        if (route) {
                            newRoutes[0].children.push(route)
                        }
                    })
                }
            })
            router.addRoutes(newRoutes)
            hasRoute = true
            store.commit("changeRouteStatus", hasRoute)
        })
    }
})

const menuToRoute = (menu) => {
    if (!menu.component) {
        return null
    }
    let route = {
        name: menu.name,
        path: menu.path,
        meta: {
            icon: menu.icon,
            title: menu.title
        }
    }
    route.component = () => import('@/components/login/' + menu.component + '.vue')
    return route
}
export default router

