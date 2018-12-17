<template>
<div class="episode md-content">
  <div class="md-title">S{{episode.seasonNumber}}E{{episode.number}} – {{episode.canonicalTitle}}</div>
  <div class="md-subheading" v-if="episode.titles.ja_jp">{{episode.titles.ja_jp}}</div>
  <img :src="episode.thumbnail.original">
  <p v-for="p in episode.synopsis.split('\n')">
    {{p}}
  </p>
  <p v-if="episode.airdate">
    Originally Aired {{episode.airdate}}
  </p>
</div>
</template>
<script>
export default {
  name: 'episode',
  props: {
    episode: {type: Object, required: true}
  }
}
</script>
<style lang="scss">
.episode {
  > img {
    width: 100%;
    height: auto;
  }
}
</style>
