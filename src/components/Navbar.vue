<template>
    <nav>
        <v-toolbar flat dark>
            <a href="/" class="logo">
                <span class="name">Espresso</span>
                <span class="font-weight-light talks">Talks</span>
            </a>
            <v-spacer></v-spacer>
            <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
        </v-toolbar>

        <v-navigation-drawer app temporary v-model="drawer" right class="blue app-drawer">
            <v-toolbar-items class="drawer-wrapper">

                <router-link tag="span" to="/">
                    <v-btn @click="drawer = !drawer" class="drawer-button">
                        Hem
                    </v-btn>
                </router-link>

                <router-link tag="span" to="talks">
                    <v-btn @click="drawer = !drawer" class="drawer-button">
                        Talks
                    </v-btn>
                </router-link>

                <router-link tag="span" to="about">
                    <v-btn @click="drawer = !drawer" class="drawer-button">
                        About
                    </v-btn>
                </router-link>

                <router-link tag="span" to="/login">
                    <v-btn @click="drawer = !drawer" class="drawer-button">
                        Login
                    </v-btn>
                </router-link>

            </v-toolbar-items>
        </v-navigation-drawer>
    </nav>
</template>

<script>
    export default {
        data() {
            return {
                drawer: false
            }
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
</style>
