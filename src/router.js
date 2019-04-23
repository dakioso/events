import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TalkPage from './components/talks/TalkPage'

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
            path: '/talkpage/:id',
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

            component: () => import(/* webpackChunkName: "Loginpage" */ './views/Loginpage.vue')
        },
        {
            path: '/newtalk',
            name: 'newtalk',

            component: () => import(/* webpackChunkName: "NewTalk" */ './views/NewTalk.vue')
        }

    ]
})
