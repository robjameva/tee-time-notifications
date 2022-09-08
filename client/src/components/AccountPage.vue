<script>
import gql from 'graphql-tag'

export default {
    name: 'AccountPage',

    data: () => ({
        showPassword: false,
        hello: ''
    }),
    methods: {
        register() {
            this.$emit('tab', 'register')
        }
    },
    apollo: {
        hello: gql`query Query {
                getAllUsers {
                    _id
                    first_name
                    last_name
                    phone_number
                    email
                }
                }`,
    }
}
</script>

<template>
    <v-card width="400" class="mx-auto mt-12">
        <v-card-title>
            <h1 class="display-1">Login</h1>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field label="Email" prepend-icon="mdi-email" color="green lighten-1" />
                <v-text-field :type="showPassword ? 'text' : 'password'" label="Password" prepend-icon="mdi-lock"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword"
                    color="green lighten-1" />
            </v-form>
            <p>{{ hello }}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn class="px-5 mx-5" color="success" @click="register">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="px-5 mx-5" color="info">Login</v-btn>
        </v-card-actions>
    </v-card>
</template>