import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate';
import * as firebase from 'firebase'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [
            
        ],
        user: null,
        loading: null,
        error: null
    },
    plugins: [createPersistedState()],
    mutations: {
        createNewTalk(state, payload) {
            state.loadedTalks.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state,payload) {
            state.loading = payload
        },
        setError(state, payload) {
            state.error = payload
        },
        clearError(state) {
            state.error = null
        },
        setLoadedTalks(state, payload) {
            state.loadedTalks = payload
        }
    },
    actions: {
        loadTalks({commit}) {
            commit('setLoading', true)
            firebase.database().ref('talks').once('value')
                .then((data) => {
                    const talks = []
                    const obj = data.val()
                    for (let key in obj) {
                        talks.push({
                            id: key,
                            title: obj[key].title,
                            location: obj[key].location,
                            description: obj[key].description,
                            host: obj[key].host,
                            date: obj[key].date,
                            imageUrl: obj[key].imageUrl
                        })
                    }
                    commit('setLoadedTalks', talks)
                    commit('setLoading', false)
                })
                .catch((error) => {
                    console.log(error)
                    commit('setLoading', true)
                })
        },
        createNewTalk({commit}, payload) {
            const talkPayload = {
                title: payload.title,
                description: payload.description,
                host: payload.host,
                imageUrl: payload.imageUrl,
                date: payload.date.toISOString(),
                location: payload.location
            }
            firebase.database().ref('talks').push(talkPayload)
                .then((data) => {
                    const key = data.key
                    commit('createNewTalk', {
                        ...talkPayload,
                        id: key
                    })
                })
                .catch((error) =>{
                    console.error(error)
                })

        },
        signupNewUser({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                    }
                )
        },
        signUserIn({commit}, payload) {
            commit('setLoading', true)
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then(
                    user => {
                        commit('setLoading', false)
                        const newUser = {
                            id: user.user.uid,
                        }
                        commit('setUser', newUser)
                    }
                )
                .catch(
                    error => {
                        commit('setLoading', false)
                        commit('setError', error)
                    }
                )
        },
        clearError({commit}) {
            commit('clearError')
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
        },
        user(state) {
            return state.user
        },
        loading(state) {
            return state.loading
        },
        error(state) {
            return state.error
        }
    }


})
