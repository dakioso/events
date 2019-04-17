<template>
    <div>
        <div>
            <v-parallax height="900" dark
                        src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
                <v-layout align-center column justify-center>
                    <h1 class="display-2 font-weight-thin mb-3">Espresso talks</h1>
                    <h4 class="subheading">Här finns alla kommande <i>Espresso Talks</i></h4>
                </v-layout>
            </v-parallax>
        </div>
        <div class="container">
            <div class="frontpage-list">
                <div class="frontpage-list__title">
                    <h2>Upcoming talks!</h2>
                </div>
                <ul>
                    <li v-for="(item, index) in people" :key="index" v-if="index > 0" class="event-item">
                        <v-flex>
                            <v-card>
                                <v-img
                                        src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                                        aspect-ratio="2.75"
                                ></v-img>

                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">Kangaroo Valley Safari</h3>
                                        <div> {{ item.first_name }} {{ item.last_name }}</div>
                                    </div>
                                </v-card-title>

                            </v-card>
                        </v-flex>

                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>


<script>

    export default {
        name: 'frontpage-list',
        mounted() {
            this.$store.dispatch('loadPeople')
        },
        computed: {
            people() {
                return this.$store.state.people;
            }
        }
    }
</script>


<style lang="scss" scoped>
    @import "../styles/global.scss";

    .frontpage-list {
        padding: 0 0 50px 0;

        ul {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr;
            grid-column-gap: 20px;
            grid-row-gap: 20px;
            justify-items: stretch;
            align-items: stretch;
            padding: 0;
            @media (min-width: $breakpoint-small) {
                grid-template-columns: 1fr 1fr 1fr;
            }

        }
    }
    .frontpage-list__title {
        display: flex;
        justify-content: center;
        padding: 30px;
    }


</style>
