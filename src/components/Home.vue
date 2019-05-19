<template>
    <div>
        <v-layout xs12>
            <v-parallax class="parallax-window"
                        height="100%"
                        dark
                        src="https://i.imgur.com/pON29gC.jpg">
                <v-layout align-center column justify-center>
                    <h1 class="display-2 font-weight-light mb-2">Espresso talks</h1>
                    <h4 class="subheading homepage-subtitle">Här finns alla kommande <i>Espresso Talks</i></h4>
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
                        <li v-for="(talk, index) in featuredTalks" :key="index" class="event-item" aria-label="article">
                            <v-flex aria-hidden="true">
                                <router-link :to="{ name: 'talkpage', params: { id:talk.id }}" aria-hidden="true">
                                    <v-card hover aria-hidden="true">
                                        <v-img :src="talk.imageUrl"
                                               aspect-ratio="2.75"
                                               alt="talk image"
                                               aria-hidden="true"
                                        ></v-img>

                                        <v-card-title aria-hidden="true" primary-title pb-0>
                                            <h3 class="headline mb-1 card-title">{{ talk.title}}</h3>
                                        </v-card-title>
                                        <v-card-text aria-hidden="true">
                                            <p class="subheading mb-0 card-date" aria-hidden="true"><b>Date</b>: {{ talk.date | filter}}</p>
                                              <p class="subheading mb-0 card-date" aria-hidden="true"><b>Location</b>:
                                                {{talk.location}}</p>
                                            <br>
                                            <div class="card__description--wrapper" aria-hidden="true">
                                                <p class="card__description card-description" aria-hidden="true"> {{ talk.description
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
        min-height: 100vh;
        background: transparent;
        width: 100%;
        transform: translateY(-20px);
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