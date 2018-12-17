<template>
  <div class="anime-details md-layout md-gutter">
    <div class="md-layout-item" style="flex-basis: 400px">
      <div class="content" v-if="anime">
        <div class="md-display-2">{{anime.canonicalTitle}}</div>
        <div class="md-subheading">{{anime.titles.ja_jp}}</div>
        <p class="md-caption">
          {{anime.genres.map((g) => g.name).join('・')}}
        </p>
        <iframe width="560" height="315" style="height: 315px" :src="'https://www.youtube.com/embed/' + anime.youtubeVideoId" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <p class="md-body-1" v-for="p in anime.synopsis.split('\n')">
          {{p}}
        </p>
      </div>
      <md-progress-spinner v-if="anime == null" class="md-accent" md-mode="indeterminate"></md-progress-spinner>
    </div>
    <div class="md-layout-item" style="flex-basis: 100px"  v-if="seasons && seasons.length > 0">
      <div class="content seasons">
        <md-tabs class="md-scrollbar" v-if="!hasSelectedEpisode">
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
        <md-content v-if="hasSelectedEpisode" class="episode-details">
          <episode :episode="selectedEpisode" @close="selectEpisode()"></episode>
        </md-content>
      </div>
    </div>
    <div class="characters md-layout-item" style="flex-basis: 100px">
      <md-tabs v-if="!selectedCasting">
        <md-tab md-label="Characters">
          <md-list class="md-triple-line">
            <md-list-item v-for="{character, person, id} in castings" @click="selectCasting(id)">
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
      <md-content v-if="selectedCasting">
        <div class="md-title">
          <div class="md-avatar" v-if="selectedCasting.character.image && selectedCasting.character.image.original"
            :style="{'background-image': `url(${selectedCasting.character.image.original})`}">
          </div>
          {{stringCoalesce(selectedCasting.character.canonicalName, selectedCasting.character.names.en)}}
          <span class="md-caption">{{stringCoalesce(selectedCasting.character.names.ja_jp, selectedCasting.character.otherNames.join(', '))}}</span>
          <md-button class="md-icon-button" style="float: right" @click="selectCasting(undefined)">
            <md-icon>close</md-icon>
          </md-button>
        </div>
        <p v-html="selectedCasting.character.description">
        </p>
        <span>{{selectedCasting.person.name}}</span>
        <span>{{selectedCasting.character.otherNames.join('・')}}</span>
      </md-content>
    </div>
  </div>
</template>
<script>
import api from '@/api';
import log from 'loglevel';

import episodeComponent from '@/components/episode';

import ApiRequest from '@/model/ApiRequest';
import DataSource from '@/model/DataSource';
import {stringCoalesce} from '@/utils/string';

export default {
  name: 'Anime',
  components: {
    episode: episodeComponent
  },
  data() {
    return {
      animeSrc: new DataSource({
        request: {
          include: 'genres,episodes'
        }
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
      selectedEpisode: null,
      selectedCasting: null
    };
  },
  computed: {
    anime() {
      return this.animeSrc.data;
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

      this.animeSrc.request.path = '/anime/' + this.animeId;
      this.$store.dispatch('fetch', this.animeSrc).then(() => {
        if (this.$route.query.episode && this.anime && this.anime.episodes) {
          this.selectedEpisode = this.anime.episodes.find((ep) => ep.id === this.$route.query.episode);
        }
      });

      this.castingsRequest.filter.mediaId = this.animeId;
      this.$store.dispatch('send', this.castingsRequest).then((resp) => {
        this.castings = resp.data.map((row) => row);
        this.selectedCasting = this.castings.find((ca) => ca.id === this.$route.query.casting);
      });
    },
    selectCasting(id) {
      log.debug('select casting', id);
      let query = Object.assign({}, this.$route.query);
      query.casting = id;
      this.$router.push({query});
    },
    selectEpisode(id) {
      log.debug('select episode ', id);
      let query = Object.assign({}, this.$route.query);
      query.episode = id;
      this.$router.push({query});

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
    },
    '$route.query.casting'() {
      this.selectedCasting = this.castings.find((ca) => ca.id === this.$route.query.casting);
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
      max-width: 500px;
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
