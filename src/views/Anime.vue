<template>
  <div class="anime-details md-layout md-gutter">
    <div class="md-layout-item" style="flex-basis: 400px">
      <div class="content" v-if="anime">
        <div class="md-display-2">{{anime.canonicalTitle}}</div>
        <div class="md-caption">{{anime.titles.ja_jp}}</div>
        <div class="md-caption">
          {{anime.genres.map((g) => g.name).join('・')}}
        </div>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + anime.youtubeVideoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p class="md-body-1">
          {{anime.synopsis}}
        </p>
      </div>
      <md-progress-spinner v-if="anime == null" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item" style="flex-basis: 100px"  v-if="seasons && seasons.length > 0">
      <div class="content seasons">
        <md-tabs>
          <md-tab v-for="(episodes, seasonNumber) in seasons" :md-label="'S' + (seasonNumber + 1)">
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
      <md-tabs>
        <md-tab md-label="Characters">
          <md-list class="md-triple-line">
            <md-list-item v-for="{character, person} in castings">
              <div class="md-avatar" v-if="character.image && character.image.original"
                :style="{'background-image': `url(${character.image.original})`}">
              </div>
              <div class="md-list-item-text">
                <span>
                  {{stringCoalesce(character.canonicalName, character.names.en)}}
                  <span class="md-caption">{{stringCoalesce(character.names.ja_jp, character.otherNames.join(', '))}}</span>
                </span>
                <span>{{person.name}}</span>
                <span>{{character.otherNames.join('・')}}</span>
              </div>
            </md-list-item>
          </md-list>
        </md-tab>
      </md-tabs>

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
      castingsRequest: new ApiRequest({
        path: '/castings',
        filter: {
          mediaId: this.animeId,
          language: 'Japanese',
          isCharacter: true
        },
        include: 'character,person'
      }),
      castings: null,
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
          this.$router.push({
            query: {
              episode: undefined
            }
          });
        }
      }
    },
    gesture() {
      let rating = Number(this.anime.averageRating);
      if (rating > 75) {
        return 'up';
      } else if (rating > 50) {
        return 'up-down';
      }
      return 'down';
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

      this.castingsRequest.filter.mediaId = this.animeId;
      this.$store.dispatch('send', this.castingsRequest).then((resp) => {
        this.castings = resp.data.map((row) => row);
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
        border-radius: 0px;
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
      .md-list-item-text * {
        max-width: 350px;
      }
    }
  }
</style>
