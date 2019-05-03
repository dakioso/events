import Vue from 'vue'
import Vuex from 'vuex'
//import createPersistedState from 'vuex-persistedstate';
import * as firebase from 'firebase'


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [],
        user: null,
        loading: null,
        error: null
    },

    mutations: {
        createNewTalk(state, payload) {
            state.loadedTalks.push(payload)
        },
        updateTalk(state, payload) {
            let updateTalk = state.loadedTalks.find(updateTalk => {
                return updateTalk.id === payload.id
            })
            if(payload.title ) {
                updateTalk.title = payload.title
            }
            if(payload.description) {
                updateTalk.description = payload.description
            }
            if(payload.date) {
                updateTalk.date = payload.date
            }
            if(payload.host) {
                updateTalk.host = payload.host
            }
            if(payload.location) {
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
            // image is passed as file, need to upload it and then store the imageUrl
            const dbRef = firebase.database().ref("talks").push();
            const key = dbRef.key;
            const filename = payload.image.name;
            const ext = filename.slice(filename.lastIndexOf("."));
            const storageRef = firebase.storage().ref("talks").child(key + "." + ext);

            storageRef.put(payload.image)
                .then(() => {
                    // file uploaded
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
            if(payload.title) {
                updateObj.title = payload.title
            }
            if(payload.description) {
                updateObj.description = payload.description
            }
            if(payload.date) {
                updateObj.date = payload.date
            }
            if(payload.host) {
                updateObj.host = payload.host
            }
            if(payload.location) {
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
        /*createNewTalk({commit, getters}, payload) {
            const talkPayload = {
                title: payload.title,
                description: payload.description,
                host: payload.host,
                date: payload.date.toISOString(),
                location: payload.location,
                createdBy: getters.user.id
            }
            let imageUrl
            let key
            firebase.database().ref('talks').push(talkPayload)
                .then((data) => {
                    const key = data.key
                    return key
                })
                .then(key => {
                    const filename = payload.image.name
                    const ext = filename.slice(filename.lastIndexOf('.'))
                    return firebase.storage().ref('talks/' + key + '.' + ext).put(payload.image)
                })
                .then(fileData => {
                    return fileData.ref.getDownloadURL()
                        .then(imageUrl => {
                            return firebase.database().ref('talks').child(key).update({ imageUrl: imageUrl })
                        })
                    /!*imageUrl = fileData.metadata.downloadURLs
                    return firebase.database().ref('talks').child(key).update({imageUrl: imageUrl})*!/
                })
                .then(() => {
                    commit('createNewTalk', {
                        ...talkPayload,
                        imageUrl: imageUrl,
                        id: key
                    })
                })
                .catch((error) => {
                    console.error(error)
                })

        },*/
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
