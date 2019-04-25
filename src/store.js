import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import * as firebase from 'firebase'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [
            
        ],
        user: null
    },
    plugins: [createPersistedState()],
    mutations: {
        createNewTalk(state, payload) {
            state.loadedTalks.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
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
        },
        signupNewUser({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.user.uid,
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
        },
        signUserIn({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        const newUser = {
                            id: user.user.uid,
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        console.log(error)
                    }
                )
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
