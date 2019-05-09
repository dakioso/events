import store from './store'

//Used to work with the router, to guard the routes from non auth users
export default (to, from, next) => {
    if (store.getters.user) {
        next()
    } else {
        next('login')
    }
}