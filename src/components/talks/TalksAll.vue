<template>
    <v-container class="container-main">
        <ul class="cards__list">
            <li v-for="(talk, index) in allTalks" :key="index" class="cards-item" aria-label="article">
                <v-flex>
                    <router-link :to="{ name: 'talkpage', params: { id:talk.id }}" aria-hidden="true">
                        <v-card hover >
                            <v-img :src="talk.imageUrl"
                                   aspect-ratio="2.75"
                                   alt="talk image"
                                   aria-hidden="true"
                            ></v-img>

                            <v-card-title primary-title pb-0 aria-hidden="true">
                                <h1 class="headline mb-1 card-title">{{ talk.title}}</h1>
                            </v-card-title>
                            <v-card-text aria-hidden="true">
                                <p class="subheading mb-0 card-date" aria-hidden="true">Date: {{ talk.date | filter}} Location:
                                    {{talk.location}}</p>
                                <p class="subheading mb-0 card-host" aria-hidden="true">Host: {{ talk.host}}</p>
                                <br>
                                <div class="card__description--wrapper" aria-hidden="true">
                                    <p class="card__description card-description" aria-hidden="true"> {{ talk.description }}</p>
                                </div>
                            </v-card-text>
                            <v-spacer></v-spacer>
                            <v-card-actions>
                                <v-btn flat color="orange" aria-hidden="true">
                                    Check it out!
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </router-link>
                </v-flex>
            </li>
        </ul>

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
        padding: 25px 10px 0 10px;
        @media (min-width: $breakpoint-small) {
            padding: 40px 75px 10px;
        }
        @media (min-width: $breakpoint-medium) {
            padding: 40px 75px 10px;
        }
    }

    .cards__list {
        list-style: none;
        padding: 0 0 20px 0;
        display: grid;
        grid-template-columns: 1fr;
        grid-gap: 20px;
        justify-items: stretch;
        align-items: stretch;

        a {
            text-decoration: none;
        }

        @media (min-width: $breakpoint-small) {
            grid-template-columns: 2fr 2fr;
        }
        @media (min-width: $breakpoint-medium) {
            grid-template-columns: 2fr 2fr;
            grid-gap: 30px;

        }
    }

    .card__description--wrapper {
        height: 70px;
        overflow: hidden;
        text-overflow: ellipsis;
    }


</style>