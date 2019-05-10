<template>
    <v-app class="light-gray">
        <Navbar/>
        <v-content class="pt-5">
            <router-view></router-view>
        </v-content>
        <Footer/>
    </v-app>
</template>

<script>
    import Navbar from './components/Navbar'
    import Footer from './components/Footer'


    export default {
        name: 'App',
        components: {
            Navbar,
            Footer
        },
        data() {
            return {}
        }
    }
</script>
