<template>
  <div id="app">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <router-link to="/" class="md-display-1">
          <md-icon>gesture</md-icon>
          <span>{{appName}}</span></router-link>
      </md-app-toolbar>
      <md-app-content flex>
        <transition name="fadeLeft">
          <router-view></router-view>
        </transition>
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

  .md-app {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    overflow-x: hidden;

    .md-app-scroller {
      overflow-x: hidden;
    }
  }
}

</style>
