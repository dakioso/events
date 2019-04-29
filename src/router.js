import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TalkPage from './components/talks/TalkPage'
import AuthGuard from './auth-guard'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/talks/:id',
            name: 'talkpage',
            props: true,
            component: TalkPage
        },
        {
            path: '/talks',
            name: 'talks',

            component: () => import(/* webpackChunkName: "talks" */ './views/Talks.vue')
        },
        {
            path: '/about',
            name: 'about',

            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/login',
            name: 'login',

            component: () => import(/* webpackChunkName: "Login" */ './views/Login.vue')
        },
        {
            path: '/create-new-talk',
            name: 'createnewtalk',
            beforeEnter: AuthGuard,

            component: () => import(/* webpackChunkName: "NewTalk" */ './views/NewTalk.vue')
        },
        {
            path: '/create-new-user',
            name: 'createnewuser',
            beforeEnter: AuthGuard,


            component: () => import(/* webpackChunkName: "NewUser" */ './views/NewUser.vue')
        },
        {
            path: '/create',
            name: 'createpage',
            beforeEnter: AuthGuard,


            component: () => import(/* webpackChunkName: "CreatePage" */ './views/CreatePage.vue')
        }

    ]
})
