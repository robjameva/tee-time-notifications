<script>
import BottomNav from './components/BottomNav';
import AccountPage from './components/AccountPage';

export default {
  name: 'App',

  components: {
    BottomNav,
    AccountPage
  },

  data: () => ({
    currentTab: ''
  }),
  methods: {
    setTab(tab) {
      this.currentTab = tab
    }
  }
};
</script>

<template>
  <v-app>
    <v-main>
      <Account-Page v-if="currentTab === 'account'" />
    </v-main>
    <Bottom-Nav @tab="setTab" />
  </v-app>
</template>
