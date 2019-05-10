<template>
    <div>
        <v-layout xs12>
            <v-parallax class="parallax-window"
                        height="100%"
                        dark
                        src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80">
                <v-layout align-center column justify-center>
                    <h1 class="display-2 font-weight-thin mb-3">Espresso talks</h1>
                    <h4 class="subheading">Här finns alla kommande <i>Espresso Talks</i></h4>
                </v-layout>
            </v-parallax>
        </v-layout>
        <v-container fluid>
            <v-layout>
                <v-flex xs12 class="text-xs-center">
                    <v-progress-circular
                            :size="70"
                            :width="7"
                            color="primary"
                            indeterminate
                            v-if="loading"
                    ></v-progress-circular>
                </v-flex>
            </v-layout>
            <v-layout v-if="!loading" class="homepage-wrapper">
                <div class="homepage-list">
                    <div class="homepage-list__title">
                        <h2>Upcoming talks!</h2>
                    </div>
                    <ul>
                        <li v-for="(talk, index) in featuredTalks" :key="index" class="event-item">
                            <v-flex>
                                <router-link :to="{ name: 'talkpage', params: { id:talk.id }}">
                                    <v-card hover>
                                        <v-img :src="talk.imageUrl"
                                               aspect-ratio="2.75"
                                               alt="talk image"
                                        ></v-img>

                                        <v-card-title primary-title pb-0>
                                            <h3 class="headline mb-1 card-title">{{ talk.title}}</h3>
                                        </v-card-title>
                                        <v-card-text>
                                            <p class="subheading mb-0 card-date">Date: {{ talk.date | filter}} -
                                                Location:
                                                {{talk.location}}</p>
                                            <p class="subheading mb-0">Host: {{ talk.host}}</p>
                                            <br>
                                            <div class="card__description--wrapper">
                                                <p class="card__description card-description"> {{ talk.description
                                                    }}</p>
                                            </div>
                                        </v-card-text>
                                    </v-card>
                                </router-link>
                            </v-flex>
                        </li>
                    </ul>
                </div>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: 'frontpage-list',
        computed: {
            featuredTalks() {
                return this.$store.getters.featuredTalks
            },
            loading() {
                return this.$store.getters.loading
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/global.scss";

    .parallax-window {
        min-height: 95.5vh;
        background: transparent;
        width: 100%;
    }

    .homepage-wrapper {
        display: block;
    }

    .homepage-list {
        ul {
            list-style: none;
            display: grid;
            grid-template-columns: 1fr;
            grid-column-gap: 20px;
            grid-row-gap: 20px;
            justify-items: stretch;
            align-items: stretch;
            padding: 0 0 20px 0;
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
        padding: 0 30px 30px 30px;

        h2 {
            font-size: 30px;
            margin: 0;
        }
    }

    .card__description--wrapper {
        height: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
    }

</style>