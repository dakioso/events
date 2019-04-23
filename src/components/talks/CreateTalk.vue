<template>
    <v-container>
    <v-layout row>
        <v-flex xs12 sm7>
            <h1 class="secondary--text">Skapa ny talk!</h1>
        </v-flex>
    </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form v-on:submit.prevent="onCreateNewTalk">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="title"
                            label="Namn på espresso talk"
                            id="title"
                            v-model="title"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-textarea
                            name="description"
                            label="Beskrivning av espresso talk"
                            id="description"
                            v-model="description"
                            auto-grow
                            required></v-textarea>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mb-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-date-picker

                                    v-model="date"
                                    full-width
                                    landscape
                                    locale="sv-se"
                            ></v-date-picker>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="host"
                            label="Vem håller 'talket'"
                            id="host"
                            v-model="host"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row class="mt-2">
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="location"
                            label="Vart? (Rum, plats..)"
                            id="location"
                            v-model="location"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="imageUrl"
                            label="Image URL"
                            id="image-url"
                            v-model="imageUrl"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" class="create-talk__img">
                        </v-flex>
                    </v-layout>
                    <v-layout>
                        <v-flex xs1 sm6 offset-sm3>
                            <v-btn class="primary"
                                   :disabled="!formIsValid"
                                   type="submit">
                                Skapa talk!
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                host: '',
                imageUrl: '',
                location: '',
                date: new Date().toISOString().substr(0, 10),
            }
        },
        computed: {
            formIsValid() {
                return this.title !== '' &&
                        this.description !== '' &&
                        this.host !== '' &&
                        this.location !== '' &&
                        this.imageUrl !== ''
            },
            dateIsFormatted() {
                const date = new Date(this.date)
                return date

            }
        },
        methods: {
            onCreateNewTalk() {
                if (!this.formIsValid) {
                    return
                }
                const talkData = {
                    title: this.title,
                    description: this.description,
                    host: this.host,
                    imageUrl: this.imageUrl,
                    location: this.location,
                    date: this.dateIsFormatted
                }
                this.$store.dispatch('createNewTalk', talkData)
                this.$router.push('/talks')
            }
        }
    }
</script>


<style lang="scss">
    .create-talk__img {
        height: 150px;

    }
</style>