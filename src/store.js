import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [],
        user: null,
        loading: null,
        error: null
    },

    //These are the functions that mutate the state, they come from the commit in the actions
    mutations: {
        createNewTalk(state, payload) {
            state.loadedTalks.push(payload)
        },
        updateTalk(state, payload) {
            let updateTalk = state.loadedTalks.find(updateTalk => {
                return updateTalk.id === payload.id
            })
            if (payload.title) {
                updateTalk.title = payload.title
            }
            if (payload.description) {
                updateTalk.description = payload.description
            }
            if (payload.date) {
                updateTalk.date = payload.date
            }
            if (payload.host) {
                updateTalk.host = payload.host
            }
            if (payload.location) {
                updateTalk.location = payload.location
            }
        },
        deleteTalkData(state, payload) {
            state.loadedTalks.push(payload)
        },
        setUser(state, payload) {
            state.user = payload
        },
        setLoading(state, payload) {
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
    //These are the functions that do all the fetches, updates and deletion to the db.
    //They also do all the functions related to the state
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
                            imageUrl: obj[key].imageUrl,
                            createdBy: obj[key].createdBy
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
        createNewTalk({commit, getters}, payload) {
            //Image is passed as file, need to upload it and then store the imageUrl
            const dbRef = firebase.database().ref("talks").push();
            const key = dbRef.key;
            const filename = payload.image.name;
            const ext = filename.slice(filename.lastIndexOf("."));
            const storageRef = firebase.storage().ref("talks").child(key + "." + ext);

            storageRef.put(payload.image)
                .then(() => {
                    //File uploaded
                    return storageRef.getDownloadURL();
                })
                .then((downloadUrl) => {
                    const talkPayload = {
                        title: payload.title,
                        location: payload.location,
                        description: payload.description,
                        date: payload.date.toISOString(),
                        id: key,
                        host: payload.host,
                        createdBy: getters.user.id,
                        imageUrl: downloadUrl
                    };
                    commit("createNewTalk", talkPayload);
                    return dbRef.set(talkPayload);
                })
                .then(() => {
                    console.log("meeting created");
                })
                .catch((error) => {
                    console.error("error: " + error);
                });
        },
        updateTalkData({commit}, payload) {
            commit('setLoading', true)
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            if (payload.host) {
                updateObj.host = payload.host
            }
            if (payload.location) {
                updateObj.location = payload.location
            }
            firebase.database().ref('talks').child(payload.id).update(updateObj)
                .then(() => {
                    commit('setLoading', false)
                    commit('updateTalk', payload)
                })
                .catch(error => {
                    console.log(error)
                    commit('setLoading', false)
                })
        },
        deleteTalkData({commit}, payload) {
            firebase.database().ref('talks').child(payload.id).remove()
                .then(() => {
                    commit('deleteTalkData', payload)
                })
                .catch(error => {
                    console.log('error:' + error)
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
        //Lets the user be signed in and not auto signout on page reload
        autoSignIn({commit}, payload) {
            commit('setUser', {id: payload.uid})
        },
        logout({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)
        },
        clearError({commit}) {
            commit('clearError')
        }
    },
    //Getters distribute the state to where it needs to be
    getters: {
        //Loads all the talks
        loadedTalks(state) {
            return state.loadedTalks.sort((talkA, talkB) => {
                return talkA.date > talkB.date
            })
        },
        //Load one specific talk
        loadedTalk(state) {
            return (talkId) => {
                return state.loadedTalks.find((talk) => {
                    return talk.id === talkId
                })
            }
        },
        //Loads only the three first, therefore called featured
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
