<template>
<div class="episode md-content">
  <h1>S{{episode.seasonNumber}}E{{episode.number}} – {{episode.canonicalTitle}}</h1>
  <p>
    {{episode.synopsis}}
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
