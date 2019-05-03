<template>
    <v-container>
    <v-layout row text-xs-center>
        <v-flex xs12>
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
                            label="Vart? (Rum, plats)"
                            id="location"
                            v-model="location"
                            required></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                             <v-btn raised @click="uploadImg">Upload Image</v-btn>
                            <input type="file"
                                   style="display: none"
                                   ref="fileInput"
                                   accept="image/*"
                                   @change="onFilePicked">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <img :src="imageUrl" class="preview__img">
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
                image: null
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
                if(!this.image) {
                    return
                }
                const talkData = {
                    title: this.title,
                    description: this.description,
                    host: this.host,
                    image: this.image,
                    location: this.location,
                    date: this.dateIsFormatted
                }
                this.$store.dispatch('createNewTalk', talkData)
                this.$router.push('/talks')
            },
            uploadImg() {
                this.$refs.fileInput.click()
            },
            onFilePicked(event) {
                const files = event.target.files
                let filename = files[0].name
                if(filename.lastIndexOf('.') <= 0) {
                    return alert('Add valid file!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                    this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            }
        }
    }
</script>


<style lang="scss">
    .preview__img {
        height: 150px;
    }

</style>