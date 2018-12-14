<template>
  <div class="md-layout md-gutter md-alignment-center">
    <transition-group name="rotateDownLeft" class="anime-list">
      <md-card class="anime" md-elevation-1 md-with-hover v-for="anime in hot"
        :key="anime.id" @click.native="() => select(anime)">
        <md-ripple>
          <md-card-media-cover md-solid>
            <md-card-media :style="{'background-image': 'url(' + anime.posterImage.small + ')'}">
            </md-card-media>
            <md-card-area>
              <md-card-header>
                <span class="md-subheading">{{anime.canonicalTitle}}</span>
                <span class="md-caption">{{anime.titles.ja_jp}}</span>
              </md-card-header>
            </md-card-area>
          </md-card-media-cover>

        </md-ripple>
      </md-card>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  },
  created() {
    this.$store.dispatch('fetchHot');
  },
  methods: {
    select(anime) {
      console.log('selected', anime);
      this.$router.push({path: '/anime/' + anime.id});
    }
  },
  computed: {
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
.anime-list {
  $posterWidth: 225px;
  $posterHeight: 320px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;

  .md-card.anime {
    height: $posterHeight;
    width: $posterWidth;
    margin: 8px;
    // background-position: center;
    // background-size: cover;

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

      span {
        text-overflow: ellipsis;
        overflow: hidden;
      }

    }
    .md-card-actions {
      position: absolute;
      bottom: 0;
      width: 100%;

    }
    .md-card-media {
      height: $posterHeight;
      background-size: cover;
    }
  }
}
</style>
