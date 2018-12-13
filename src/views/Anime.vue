<template>
  <div class="anime-details md-layout md-gutter">
    <div class="md-layout-item">
      <div class="content" v-if="anime">
        <h1>{{anime.canonicalTitle}}</h1>
        <h3>{{anime.titles.ja_jp}}</h3>
        <p>
          {{anime.synopsis}}
        </p>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + anime.youtubeVideoId + '?autoplay=1'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <md-progress-spinner v-if="anime == null" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item">
      <div class="content" v-if="seasons">
        <h3>Seasons</h3>
        <md-tabs>
          <md-tab v-for="(episodes, seasonNumber) in seasons" :md-label="seasonNumber + 1">
            <ul>
              <li v-for="ep in episodes">
                {{ep.canonicalTitle}}
              </li>
            </ul>
          </md-tab>
        </md-tabs>
      </div>
    </div>
    <div class="md-layout-item">
      <div class="content" v-if="anime && anime.genres">
        <h3>Genres</h3>
        <ul>
          <li v-for="genre in anime.genres">
            {{genre.name}}
          </li>
        </ul>
      </div>
    </div>

  </div>
</template>
<script>
import api from '@/api';
import log from 'loglevel';

export default {
  name: 'Anime',
  data() {
    return {
      anime: null,
    };
  },
  computed: {
    animeId() {
      return this.$route.params.id;
    },
    baseApiUrl() {
      return `anime/${this.animeId}/`;
    },
    seasons() {
      if (!this.anime || !Array.isArray(this.anime.episodes)) {
        return null;
      }
      let seasons = [];
      this.anime.episodes.forEach((ep) => {
        if (!seasons[ep.seasonNumber - 1]) {
          seasons[ep.seasonNumber - 1] = [];
        }
        seasons[ep.seasonNumber - 1].push(ep);
      });
      return seasons;
    }
  },
  methods: {
    load() {
      log.debug('loading anime ', this.animeId);
      this.$store.dispatch('fetchAnime', this.animeId).then((resp) => {
        this.anime = resp;
      });
    }
  },
  created() {
    this.load()
  },
  watch: {
    '$route.params.id'() {
      this.load();
    }
  }
};
</script>
