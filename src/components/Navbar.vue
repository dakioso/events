<template>
    <nav>
    <v-navigation-drawer
            temporary
            fixed
            right
            v-model="drawer">
        <v-list>
            <v-list-tile
                    v-for="item in menuItems"
                    :key="item.title"
                    router
                    :to="item.link">
                <v-list-tile-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>{{ item.title}}</v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
    <v-toolbar dark>
        <v-toolbar-title class="logo">
            <span>Espresso</span>
            <span class="font-weight-light">Talks</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-xs-only">
            <v-btn flat v-for="item in menuItems"
                   :key="item.title"
                    router
                    :to="item.link">
                <v-icon left>{{ item.icon}}</v-icon>
                {{ item.title}}
            </v-btn>
        </v-toolbar-items>
        <v-toolbar-side-icon
                @click.stop="drawer = !drawer"
                class="hidden-sm-and-up"></v-toolbar-side-icon>
    </v-toolbar>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false,
                menuItems: [
                    {icon: 'home', title: 'Home', link: '/'},
                    {icon: 'group', title: 'Talks', link: '/talks'},
                    {icon: 'public', title: 'About', link: '/about'},
                    {icon: 'add_box', title: 'Create Talk', link: '/create-new-talk'},
                    {icon: 'lock_open', title: 'Login', link: '/login'},
                    {icon: 'lock', title: 'Logout'}
                ]
            }
        },
        methods: {

            }

        }
</script>

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

    .drawer-wrapper {
        flex-direction: column;
    }

    .drawer-button {
        width: 100%;
    }
    .router-link-exact- active {
        button:before {
            background: #000;
        }
    }
</style>
