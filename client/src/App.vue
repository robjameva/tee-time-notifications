<script>
import BottomNav from './components/BottomNav';
import AccountPage from './components/AccountPage';
import AddEvent from './components/AddEvent';
import WatchList from './components/WatchList';
import RegisterPage from './components/RegisterPage';

export default {
  name: 'App',

  components: {
    BottomNav,
    AccountPage,
    AddEvent,
    WatchList,
    RegisterPage
  },

  data: () => ({
    currentTab: 'account'
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
    <v-system-bar height="45" color="green lighten-1"><span> Hello Robert</span></v-system-bar>
    <v-main>
      <Add-Event v-if="currentTab === 'add'" />
      <Watch-List v-if="currentTab === 'times'" />
      <Account-Page v-if="currentTab === 'account'" @tab="setTab" />
      <Register-Page v-if="currentTab === 'register'" />
    </v-main>
    <Bottom-Nav @tab="setTab" />
  </v-app>
</template>
