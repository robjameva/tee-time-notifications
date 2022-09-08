<style>
.myButton {
    height: 100% !important;
}
</style>

<script>
export default {
    data: () => ({ value: 2 }),
    methods: {
        changeTab(tab) {
            this.$emit('tab', tab)
        }
    }
}
</script>

<template>
    <v-container>
        <v-bottom-navigation :value="value" color="green lighten-1" grow app>
            <v-btn @click="changeTab('add')" class="myButton">
                <span>Add</span>

                <v-icon>mdi-plus-circle</v-icon>
            </v-btn>

            <v-btn @click="changeTab('times')" class="myButton">
                <span>Tee Times</span>

                <v-icon>mdi-golf</v-icon>
            </v-btn>

            <v-btn @click="changeTab('account')" class="myButton">
                <span>Account</span>

                <v-icon>mdi-account</v-icon>
            </v-btn>
        </v-bottom-navigation>
    </v-container>
</template>