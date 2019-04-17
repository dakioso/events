import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    people: {},
        id: '',
        firstName: '',
        lastName: ''
  },
  mutations: {
    SET_PEOPLE (state, people) {
      state.people = people
    }
  },
  actions: {
    loadPeople({commit}) {

      // axios.get('https://sheetdb.io/api/v1/023ckgqex42uo').then((response) => {
      //   console.log(response)  
      //   _self.people = response
        
      // })

      axios.get('https://sheetdb.io/api/v1/023ckgqex42uo')
      .then(data => {  
        let people = data.data;
        commit('SET_PEOPLE', people)
         });

      axios.get('https://sheetdb.io/api/v1/023ckgqex42uo/count')
      .then(data => {
        let id = data.data.rows
      })
    }
  }
})
