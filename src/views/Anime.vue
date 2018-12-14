<template>
  <div class="anime-details md-layout md-gutter">
    <div class="md-layout-item">
      <div class="content" v-if="anime">
        <h1>{{anime.canonicalTitle}}</h1>
        <h3>{{anime.titles.ja_jp}}</h3>
        <p>
          {{anime.synopsis}}
        </p>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + anime.youtubeVideoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
      <md-progress-spinner v-if="anime == null" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item">
      <div class="content" v-if="seasons">
        <h3>Seasons</h3>
        <md-tabs>
          <md-tab v-for="(episodes, seasonNumber) in seasons" :md-label="seasonNumber + 1">
            <md-list class="md-double-line">
              <md-list-item v-for="ep in episodes">
                <md-avatar v-if="ep.thumbnail && ep.thumbnail.original">
                  <img :src="ep.thumbnail.original">
                </md-avatar>
                <div class="md-list-item-text">
                  <span>{{stringCoalesce(ep.titles.en_us, ep.canonicalTitle, 'TBD')}}</span>
                  <span>{{ep.titles.ja_jp}}</span>
                </div>
              </md-list-item>
            </md-list>
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

import ApiRequest from '@/model/ApiRequest';
import {stringCoalesce} from '@/utils/string';

export default {
  name: 'Anime',
  data() {
    return {
      animeRequest: new ApiRequest({
        include: 'genres,episodes,characters'
      })
    };
  },
  computed: {
    anime() {
      return this.$store.state['/anime/' + this.animeId] ? this.$store.state['/anime/' + this.animeId].data : null;
    },
    animeId() {
      return this.$route.params.id;
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
      this.animeRequest.path = '/anime/' + this.animeId;
      this.$store.dispatch('send', this.animeRequest);
    },
    stringCoalesce
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
