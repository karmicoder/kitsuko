<template>
  <div id="app">
    <md-app md-mode="reveal">
      <md-app-toolbar class="md-primary">
        <span class="md-title">{{appName}}</span>
      </md-app-toolbar>
      <md-app-content flex>
        <router-view></router-view>
      </md-app-content>
    </md-app>
  </div>

</template>

<script>

export default {
  name: 'app',
  components: {},


  computed: {
    appName() {
      return process.env.APP_NAME;
    }
  }
}
</script>

<style lang="scss">
#app {


}

</style>
