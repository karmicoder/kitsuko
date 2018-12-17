<template>
  <div id="app">
    <md-app md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <router-link to="/" class="md-display-2">
          <span>{{appName}}</span>
          <md-icon>gesture</md-icon>
        </router-link>
      </md-app-toolbar>
      <md-app-content flex>
        <transition name="fadeUp">
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
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: md-get-palette-color(deeporange, 500), // The primary color of your application
  accent: md-get-palette-color(red, A700), // The accent or secondary color
  theme: dark
));

@import "~vue-material/dist/theme/all";
#app {
  .md-toolbar .md-display-2 {
    margin-left: 0px;

    &:hover {
      text-decoration: none;
      font-weight: 400;
      color: #fff;
    }

    i.md-icon {
      position: relative;
      left: -9px;
      top: 12px;
    }
  }
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
