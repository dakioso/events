import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import Filters from './filters/date'
//import './firebase'
//import VueFire from 'vuefire'

Vue.config.productionTip = false
Vue.use(axios)

Vue.filter('filter', Filters)

new Vue({
  router,
  store,
  created() {
    console.log(this.$store.state.loadedTalks)
  },
  render: h => h(App)
}).$mount('#app')
