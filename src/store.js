import Vue from 'vue'
import Vuex from 'vuex'

import api from '@/api';
import DataSource from '@/model/DataSource';
import ApiRequest from '@/model/ApiRequest';

Vue.use(Vuex);

let hotRequest = new ApiRequest({
  name: 'hot',
  path: '/anime',
  sort: '-user_count',
  page: {
    limit: 14,
    offset: 0
  }
});

export default new Vuex.Store({
  state: {},
  mutations: {
    cacheResponse(state, {req, resp}) {
      let data = state[req.id] ? state[req.id].data : [];

      if (req.page) {
        let offset = req.page.offset || 0;
        let limit = req.page.limit || 20;
        for (let i = offset; i < offset + limit; ++i) {
          data[i] = resp.data[i - offset];
        }
      } else {
        data = resp.data;
      }

      Vue.set(state, req.id, {
        cachedAt: new Date(),
        filter: Object.assign({}, req.filter),
        lastPage: Object.assign({}, req.page),
        data
      });
    }
  },
  actions: {
    fetchHot({dispatch, state}, newPage=false) {
      let sendRequest = newPage || (!state.hot || !state.hot.data);
      if (newPage) {
        hotRequest.page.next();
      }
      if (sendRequest) {
        return dispatch('send', hotRequest);
      } else {
        return Promise.resolve(state.hot);
      }
    },
    fetch({dispatch}, dataSource) {
      if (!(dataSource instanceof DataSource)) {
        throw new Error('Fetch argument must be instance of DataSource');
      }
      return dispatch('send', dataSource.request).then((resp) => {
        dataSource.receiveResponse(resp);
      });
    },
    send({commit}, req) {
      if (!(req instanceof ApiRequest)) {
        throw new Error('Request must be instance of ApiRequest');
      }

      return api[req.method](req.path, req.payload()).then((resp) => {
        if (req.noCache !== true) {
          commit('cacheResponse', {req, resp});
        }
        return resp;
      });
    }
  }
})
