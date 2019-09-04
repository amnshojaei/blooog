import Vue from 'vue';
import Vuex from 'vuex';
import { getRequest } from '@/utils/apiRequests'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    initialData: {},
    posts: [],
    pagination: {},
    totalPages: null
  },

  getters: {
  },

  mutations: {
    setInitialData(state, data) {
      state.initialData = data
    },
    setPosts(state, data) {
      state.posts = data
    },
    setPagination(state, data) {
      state.pagination = data
    },
    setTotalPages(state, data) {
      state.totalPages = data
    }
  },

  actions: {

    // Get blog title and description
    getInitialData({commit}) {

      getRequest('/wp-json')
      .then(response => {

        let initialData = {
          title: response.data.name,
          description: response.data.description
        }

        commit('setInitialData', initialData)

      })
      .catch(error => {
        console.log('Error --> ' + error)
      })
      
    },

    // Get all posts
    getPosts({commit, state}, payload) {

      let pagination = state.pagination

      getRequest('/wp-json/wp/v2/posts?_embed', pagination)
      .then(response => {
        commit('setTotalPages', response.headers['x-wp-totalpages'])
        commit('setPosts', response.data)
        commit('setPagination', payload)
      })
      .catch(error => {
        console.log('Error in load post')
      })

    }
  }

});
