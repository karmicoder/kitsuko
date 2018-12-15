<template>
  <div class="anime-details md-layout md-gutter">
    <div class="md-layout-item" style="flex-basis: 400px">
      <div class="content" v-if="anime">
        <h1 style="md-title">{{anime.canonicalTitle}}</h1>
        <h3 style="md-subheading">{{anime.titles.ja_jp}}</h3>
        <p class="md-caption">
          {{anime.genres.map((g) => g.name).join('・')}}
        </p>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + anime.youtubeVideoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p>
          {{anime.synopsis}}
        </p>
      </div>
      <md-progress-spinner v-if="anime == null" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item" style="flex-basis: 100px"  v-if="seasons && seasons.length > 0">
      <div class="content seasons">
        <h3>Seasons</h3>
        <md-tabs>
          <md-tab v-for="(episodes, seasonNumber) in seasons" :md-label="seasonNumber + 1">
            <md-list class="md-double-line">
              <md-list-item v-for="ep in episodes" @click="selectEpisode(ep.id)">
                <md-avatar v-if="ep.thumbnail && ep.thumbnail.original">
                  <img :src="ep.thumbnail.original">
                </md-avatar>
                <div class="md-list-item-text" >
                  <span>{{stringCoalesce(ep.titles.en_us, ep.canonicalTitle, 'TBD')}}</span>
                  <span>{{ep.titles.ja_jp}}</span>
                </div>
              </md-list-item>
            </md-list>
          </md-tab>
        </md-tabs>
      </div>
    </div>
    <div class="characters md-layout-item" style="flex-basis: 100px">
      <h3>Characters</h3>
      <md-list class="md-double-line">
        <md-list-item v-for="character in characters">
          <div class="md-avatar" v-if="character.image && character.image.original"
            :style="{'background-image': `url(${character.image.original})`}">
          </div>
          <div class="md-list-item-text">
            <span>{{stringCoalesce(character.canonicalName, character.names.en)}}</span>
            <span>{{stringCoalesce(character.names.ja_jp, character.otherNames.join(', '))}}</span>
          </div>
        </md-list-item>
      </md-list>
    </div>
    <md-drawer v-if="selectedEpisode" class="md-right" :md-active.sync="hasSelectedEpisode">
      <episode :episode="selectedEpisode"></episode>
    </md-drawer>
  </div>
</template>
<script>
import api from '@/api';
import log from 'loglevel';

import episodeComponent from '@/components/episode';

import ApiRequest from '@/model/ApiRequest';
import {stringCoalesce} from '@/utils/string';

export default {
  name: 'Anime',
  components: {
    episode: episodeComponent
  },
  data() {
    return {
      animeRequest: new ApiRequest({
        include: 'genres,episodes'
      }),
      charactersRequest: new ApiRequest({
        path: '/castings',
        filter: {
          mediaId: this.animeId,
          language: 'Japanese',
          isCharacter: true
        },
        include: 'character'
      }),
      characters: null,
      selectedEpisode: null
    };
  },
  computed: {
    anime() {
      return this.$store.state['/anime/' + this.animeId] ? this.$store.state['/anime/' + this.animeId].data : null;
    },
    animeId() {
      return this.$route.params.id;
    },
    hasSelectedEpisode: {
      get() { return this.selectedEpisode != null; },
      set(val) {
        if (val === false) {
          this.selectedEpisode = null;
        }
      }
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
      this.$store.dispatch('send', this.animeRequest).then(() => {
        if (this.$route.query.episode && this.anime && this.anime.episodes) {
          this.selectedEpisode = this.anime.episodes.find((ep) => ep.id === this.$route.query.episode);
        }
      });

      this.charactersRequest.filter.mediaId = this.animeId;
      this.$store.dispatch('send', this.charactersRequest).then((resp) => {
        this.characters = resp.data.map((row) => row.character);
      });
    },
    selectEpisode(id) {
      log.debug('select episode ', id);
      this.$router.push({
        query: {
          episode: id
        }
      });
    },
    stringCoalesce
  },
  created() {
    this.load();
  },
  watch: {
    '$route.params.id'() {
      this.load();
    },
    '$route.query.episode'() {
      this.selectedEpisode = this.anime.episodes.find((ep) => ep.id === this.$route.query.episode);
    }
  }
};
</script>
<style lang="scss">
  .anime-details {
    .seasons {
      .md-avatar {
        width: 100px;
        height: 56px;
        border-radius: 4px;
      }
    }

    .characters {
      .md-avatar {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        background-size: cover;
        background-position: center;
      }
    }
  }
</style>
