import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        loadedTalks: [
            {
                title: 'Hur man bygger shit i Vue',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
                host: 'daniel milojevic',
                id: '1234556',
                imageUrl: 'https://images.unsplash.com/photo-1553531384-ab9ba1a8b1e6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'
            },
            {
                title: 'Hur man bygger shit med VUEX',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                host: 'big daki',
                id: '111111',
                imageUrl: 'https://images.unsplash.com/photo-1555706195-38f133d1419f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1300&q=80'
            }
        ],
    },
    mutations: {},
    actions: {},
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
            return getters.loadedTalks.slice(0, 5);
        }
    }


})
