<template>
  <md-app id="app" >
    <md-app-toolbar class="md-primary">
      <span class="md-title">{{appName}}</span>
    </md-app-toolbar>
    <md-app-content class="anime-list">
      <transition-group name="rotateDownLeft">
        <md-card class="anime" md-elevation-1 md-with-hover v-for="anime in hot"
          :style="{backgroundImage: `url(${anime.posterImage.large})`}" :key="anime.id">
          <md-ripple>
            <md-card-header>
              <span class="md-subheading">{{anime.canonicalTitle}}</span>
              <span class="md-caption">{{anime.titles.ja_jp}}</span>
            </md-card-header>
            <md-card-actions>
              <md-button @click="() => select(anime)">Trailer</md-button>
            </md-card-actions>
          </md-ripple>
        </md-card>
      </transition-group>
      <md-dialog :md-active.sync="isSelected" v-if="isSelected">
        <md-dialog-title>{{selected.canonicalTitle}}</md-dialog-title>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + selected.youtubeVideoId + '?autoplay=1'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <md-dialog-actions>
          <md-button class="md-primary" @click="selected = null">Close</md-button>
        </md-dialog-actions>
      </md-dialog>
    </md-app-content>
  </md-app>
</template>

<script>

export default {
  name: 'app',
  components: {},
  data() {
    return {
      selected: null
    };
  },
  created() {
    this.$store.dispatch('fetchHot');
  },
  methods: {
    select(anime) {
      console.log('selected', anime);
      this.selected = anime;
    }
  },
  computed: {
    appName() {
      return process.env.APP_NAME;
    },
    hot() {
      return this.$store.state.hot ? this.$store.state.hot.data : null;
    },
    isSelected: {
      get() { return this.selected != null; },
      set(val) {
        if (val === null || val === false) {
          this.selected = null;
        }
      }
    }
  }
}
</script>

<style lang="scss">
#app {

  .anime-list span {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;

    .md-card.anime {
      height: 250px;
      width: 300px;
      margin: 8px;
      background-position: center;
      background-size: cover;

      filter: saturate(33%);
      transition: all 0.3s ease;
      &:hover {
        filter: saturate(100%);
        transform: scale(1.2);
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
      .md-card-actions {
        position: absolute;
        bottom: 0;
        width: 100%;

      }
    }
  }
}

</style>
