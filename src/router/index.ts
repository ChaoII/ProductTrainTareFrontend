import {createRouter, createWebHashHistory} from 'vue-router'
import type {RouteRecordRaw} from "vue-router";
import loyout from "@/layout/layout.vue"

const routes: Array<RouteRecordRaw> = [
    {
        // 登录界面
        path: '/login',
        name: 'login',
        component: () => import("@/page/login.vue")
    },
    {
        path: "/",
        name: "home",
        component: loyout,
        redirect: "/index",
        children: [
            {
                path: "/index",
                name: "index",
                component: () => import("@/page/index.vue")
            },
            {
                path: "/history",
                name: "history",
                component: () => import("@/page/history.vue")
            },
            {
                path: "/setting",
                name: "setting",
                component: () => import("@/page/setting.vue")
            },
        ]
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes,
})

export default router