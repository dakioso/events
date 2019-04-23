import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
//import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [
            
        ],
    },
    plugins: [createPersistedState()],
    mutations: {
        createNewTalk(state, payload) {
            state.loadedTalks.push(payload)
        }
    },
    actions: {
        createNewTalk({commit}, payload) {
            const talkPayload = {
                title: payload.title,
                description: payload.description,
                host: payload.host,
                imageUrl: payload.imageUrl,
                date: payload.date,
                location: payload.location,
                id: 'hejhejhej'
            }
            commit('createNewTalk', talkPayload)
        }
    },
    getters: {
        loadedTalks(state) {
            return state.loadedTalks.sort((talkA, talkB) => {
                return talkA.date > talkB.date
            })
        },
        loadedTalk(state) {
            return (talkId) => {
                return state.loadedTalks.find((talk) => {
                    return talk.id === talkId
                })
            }
        },
        featuredTalks(state, getters) {
            return getters.loadedTalks.slice(0, 3);
        }
    }


})
