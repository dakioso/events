<template>
    <v-container fluid class="container-main">
        <ul class="event__list">
            <li v-for="(talk, index) in allTalks" :key="index" class="event-item">
                <v-flex>
                    <router-link :to="{ name: 'talkpage', params: { id:talk.id }}">
                        <v-card hover>
                            <v-img :src="talk.imageUrl"
                                   aspect-ratio="2.75"
                            ></v-img>

                            <v-card-title primary-title pb-0>
                                <h3 class="headline mb-1">{{ talk.title}}</h3>
                            </v-card-title>
                            <v-card-text>
                                <p class="subheading mb-0">Date: {{ talk.date | filter}} - Location:
                                    {{talk.location}}</p>
                                <p class="subheading mb-0">Host: {{ talk.host}}</p>
                                <br>
                                <div class="card__description--wrapper">
                                    <p class="card__description"> {{ talk.description }}</p>
                                </div>
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn flat color="orange">
                                    Check it out!
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </router-link>
                </v-flex>
            </li>
        </ul>
        <router-link tag="span" :to="{ name: 'createnewtalk' }">
            <v-btn fab
                   dark
                   color="blue"
                   bottom
                   outline
                   right
                   fixed
                   class="newtalk__button"
                    v-if="isUserAuth">
                <i class="material-icons">
                    create
                </i>
            </v-btn>
        </router-link>
    </v-container>
</template>

<script>

    export default {
        name: 'event-list',
        computed: {
            allTalks() {
                return this.$store.getters.loadedTalks;
            },
            isUserAuth() {
                return this.$store.getters.user !== null && this.$store.getters.user !== undefined
            },
        },
        methods: {}
    }
</script>

<style lang="scss">
    @import "../../styles/global.scss";

    .container-main {
        padding-top: 25px;
        @media (min-width: $breakpoint-small) {
            padding: 30px 40px 35px;
        }
        @media (min-width: $breakpoint-medium) {
            padding: 30px 75px 35px;
        }

        a {
            text-decoration: none;
        }
    }

    .event__list {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        justify-items: stretch;
        align-items: stretch;
        @media (min-width: $breakpoint-small) {
            grid-template-columns: 2fr 2fr;
        }
        @media (min-width: $breakpoint-medium) {
            grid-template-columns: 2fr 2fr;
            grid-gap: 30px;
        }
    }

    .newtalk__button {
        float: right;
    }

    #lateral .v-speed-dial,
    #lateral .v-btn--floating {
        position: absolute;
    }

    #lateral .v-btn--floating {
        margin: 0 0 16px 16px;
    }

    .v-btn--bottom.v-btn--fixed {
        bottom: 25px;
        @media (min-width: $breakpoint-small) {
            bottom: 120px;
        }
    }
</style>