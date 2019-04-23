<template>
    <v-container>
    <v-layout row>
        <v-flex xs12 sm7>
            <h1 class="secondary--text">Skapa ny talk!</h1>
        </v-flex>
    </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form>
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
                            <v-text-field
                            name="description"
                            label="Beskrivning av espresso talk"
                            id="description"
                            v-model="description"
                            multi-line
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-text-field
                            name="host"
                            label="Vem håller 'talket'"
                            id="host"
                            v-model="host"
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
                            <v-btn class="primary" :disabled="!formIsValid">
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
                imageUrl: ''
            }
        },
        computed: {
            formIsValid() {
                return this.title !== '' &&
                        this.description !== '' &&
                        this.host !== '' &&
                        this.imageUrl !== ''
            }
        }
    }
</script>


<style lang="scss">
    .create-talk__img {
        height: 150px;

    }
</style>