<template>
    <v-footer
            height="auto"
            dark
    >
        <v-layout
                justify-center
                row
                wrap
        >
            <v-btn
                    v-for="item in footerItems"
                    :key="item.title"
                    color="white"
                    flat
                    round
                    :to="item.link"
            >
                {{ item.title }}
            </v-btn>
            <v-btn
                    color="white"
                    flat
                    round
                    href="http://digitalist.se"
            >

                Digitalist.se
            </v-btn>
            <v-flex
                    grey darken-3
                    py-3
                    text-xs-center
                    white--text
                    xs12
            >
                &copy;2019 — <strong>Digitalist</strong>
            </v-flex>
        </v-layout>
    </v-footer>
</template>

<script>
    export default {
        computed: {
            footerItems() {
                let footerItems = [
                    {icon: 'home', title: 'Home', link: '/'},
                    {icon: 'group', title: 'Talks', link: '/talks'},
                    {icon: 'public', title: 'About', link: '/about'}
                ]
                return footerItems
            }
        }
    }


</script>

<style lang="scss" scoped>


</style>
