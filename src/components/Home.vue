<template>
    <div>
        <div>
            <v-parallax height="1000" dark
                        src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
                <v-layout align-center column justify-center>
                    <h1 class="display-2 font-weight-thin mb-3">Espresso talks</h1>
                    <h4 class="subheading">Här finns alla kommande <i>Espresso Talks</i></h4>
                </v-layout>
            </v-parallax>
        </div>
        <div class="container">
            <div class="homepage-list">
                <div class="homepage-list__title">
                    <h2>Upcoming talks!</h2>
                </div>
                <ul>
                    <li v-for="(talk, index) in featuredTalks" :key="index" v-if="index > 0" class="event-item">
                        <v-flex>
                            <a :href="'/talkpage/' + talk.id">
                            <v-card hover>
                                <v-img
                                        :src="talk.imageUrl"
                                        aspect-ratio="2.75"
                                ></v-img>

                                <v-card-title primary-title>
                                    <div>
                                        <h3 class="headline mb-0">{{ talk.title}}</h3>
                                        <br>
                                        <div> {{ talk.description }}</div>
                                    </div>
                                </v-card-title>

                            </v-card>
                            </a>
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
        computed: {
            featuredTalks() {
                return this.$store.getters.featuredTalks;
            }
        }
    }
</script>


<style lang="scss" >
    @import "../styles/global.scss";

    .homepage-list {
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
        a {
            text-decoration: none;
        }
    }

    .homepage-list__title {
        display: flex;
        justify-content: center;
        padding: 30px;

        h2 {
            font-size: 30px;
            margin: 0;
        }
    }


</style>
