<template>
  <md-app id="app">
    <md-app-toolbar class="md-primary">
      <span class="md-title md-primary">{{appName}}</span>
    </md-app-toolbar>
    <md-app-content md-fixed="true" class="anime-list md-scrollbar">
      <transition-group name="rotateDownLeft">
        <md-card class="anime" md-elevation-1 md-with-hover v-for="anime in hot"
          :style="{backgroundImage: `url(${anime.posterImage.large})`}" :key="anime.id">
          <md-ripple>
            <md-card-header>{{anime.canonicalTitle}}</md-card-header>
            <footer>{{anime.titles.ja_jp}}</footer>
          </md-ripple>
        </md-card>
      </transition-group>

    </md-app-content>
  </md-app>
</template>

<script>

export default {
  name: 'app',
  components: {},
  created() {
    this.$store.dispatch('fetchHot');
  },
  computed: {
    appName() {
      return process.env.APP_NAME;
    },
    hot() {
      return this.$store.state.hot ? this.$store.state.hot.data : null;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}



.anime-list span {
  display: flex;
  flex-flow: row wrap;

  .md-card.anime {
    height: 250px;
    width: 300px;
    margin: 8px;
    background-position: center;
    background-size: cover;

    filter: saturate(33%);
    transition: filter 0.5s ease;
    &:hover {
      filter: saturate(100%);
    }

    .md-card-header {
      text-shadow: 2px 2px #0a0a0a;
      font-size: 24px;
      font-weight: 600;
      overflow: hidden;
      text-overflow: ellpisis;
      white-space: nowrap;
      text-align: center;

    }
  }
}
</style>
