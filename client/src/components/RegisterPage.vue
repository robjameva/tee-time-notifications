<template>
    <v-card width="400" class="mx-auto mt-12">
        <v-card-title>
            <h1 class="display-1">Register</h1>
        </v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field color="green lighten-1" label="First Name" prepend-icon="mdi-account-circle" />
                <v-text-field color="green lighten-1" label="Last Name" prepend-icon="mdi-account-circle" />
                <v-text-field color="green lighten-1" label="Phone Number" prepend-icon="mdi-phone" />
                <v-text-field color="green lighten-1" label="Email" prepend-icon="mdi-email" />
                <v-text-field color="green lighten-1" :type="showPassword ? 'text' : 'password'" label="Password"
                    prepend-icon="mdi-lock" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword" />
            </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
            <v-btn class="px-5 mx-auto" color="info">Create Account!</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'RegisterPage',

    data: () => ({ showPassword: false }),
}
</script>
