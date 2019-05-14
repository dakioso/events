import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Filters from './filters/date'
import * as firebase from 'firebase'
import AlertCmp from './components/shared/Alert'
import EditTalks from './components/shared/EditTalks'
import EditDate from './components/shared/EditDate'

Vue.config.productionTip = false

Vue.filter('filter', Filters)
Vue.component('app-alert', AlertCmp)
Vue.component('app-edit-talks', EditTalks)
Vue.component('app-edit-date', EditDate)


new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBO8HEYe8547OBja0RfC8GmKQ5W_WVm0Bk',
            authDomain: 'espresso-talk.firebaseapp.com',
            databaseURL: 'https://espresso-talk.firebaseio.com',
            projectId: 'espresso-talk',
            storageBucket: 'gs://espresso-talk.appspot.com/',
            messagingSenderId: '395082259880'
        })
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.$store.dispatch('autoSignIn', user)
            }
        })
        this.$store.dispatch('loadTalks')
    }
}).$mount('#app')
