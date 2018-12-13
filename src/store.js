import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hot: null
  },
  mutations: {
    setHot(state, resp) {
      state.hot = resp;
    }
  },
  actions: {
    fetchHot({commit}) {
      return api.get('anime', {
        filter: {
          status: 'current'
        },
        sort: '-user_count',
        page: {
          limit: 20,
          offset: 0
        }
      }).then((resp) => {
        commit('setHot', resp);
        return resp;
      });
    },
    fetchAnime(context, animeId) {
      return api.get('anime/' + animeId, {
        include: 'genres,episodes'
      }).then((resp) => {
        return resp.data;
      });
    }
  }
})
