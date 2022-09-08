import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import { createApolloProvider } from '@vue/apollo-option'

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3001/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
})

const apolloProvider = createApolloProvider({
  defaultClient: apolloClient,
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  apolloProvider,
  render: h => h(App)
}).$mount('#app')

// app.use(apolloProvider)