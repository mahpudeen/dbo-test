<template>
  <v-app id="app">
    <div v-if="['login'].indexOf($route.name) === -1">
        <Navbar/>
    </div>
    <v-main>
        <router-view />
    </v-main>
  </v-app>
</template>
<script>
import Navbar from './components/Navbar.vue'
export default {
    name: 'App',
    components: {
        Navbar
    },
    watch: {
        '$route' (to, from) {
            document.title = to.meta.title ? 'Dashboard - '+ to.meta.title : 'DBO' 
        }
    },
}
</script>
<style lang="scss">
#app {
    font-family: Poppins;
}
</style>
