<template>
    <nav>
        <v-navigation-drawer
                temporary
                fixed
                right
                dark
                v-model="drawer">
            <v-list class="draw-list">
                <v-list-tile
                        v-for="item in menuItems"
                        :key="item.title"
                        router
                        :to="item.link"
                        active-class="orange--text">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>{{ item.title}}</v-list-tile-content>
                </v-list-tile>
                <v-list-tile
                        v-if="isUserAuth"
                        @click="onLogout">
                    <v-list-tile-action>
                        <v-icon>lock</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>Logout</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar dark>
            <v-toolbar-title>
                <router-link :to="{ name: 'home'}" class="logo">
                    <span class="name">Espresso</span>
                    <span class="font-weight-light talks">Talks</span>
                </router-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items class="hidden-sm-and-down">
                <v-btn flat v-for="item in menuItems"
                       :key="item.title"
                       router
                       :to="item.link">
                    <v-icon left>{{ item.icon}}</v-icon>
                    {{ item.title}}
                </v-btn>
                <v-btn flat
                       v-if="isUserAuth"
                       @click="onLogout">
                    <v-icon left>lock</v-icon>
                    Logout
                </v-btn>
            </v-toolbar-items>
            <v-toolbar-side-icon
                    @click.stop="drawer = !drawer"
                    class="hidden-md-and-up" right></v-toolbar-side-icon>
        </v-toolbar>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false
            }
        },
        computed: {
            menuItems() {
                let menuItems = [
                    {icon: 'home', title: 'Home', link: '/'},
                    {icon: 'group', title: 'Talks', link: '/talks'},
                    {icon: 'public', title: 'About', link: '/about'},
                    {icon: 'lock_open', title: 'Login', link: '/login'}
                ]
                if(this.isUserAuth) {
                    menuItems = [
                        {icon: 'home', title: 'Home', link: '/'},
                        {icon: 'group', title: 'Talks', link: '/talks'},
                        {icon: 'public', title: 'About', link: '/about'},
                        {icon: 'add_box', title: 'Create Talk', link: '/create-new-talk'}
                    ]
                }
                return menuItems
            },
            isUserAuth() {
               return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout')
                this.$router.push('/')
            }
        }

    }
</script>
z
<style lang="scss" scoped>
    @import "../styles/global.scss";

    .logo {
        text-decoration: none;

        span {
            font-size: $font-size;
        }

        .name {
            color: orange;
        }

        .talks {
            color: white
        }
    }

</style>
