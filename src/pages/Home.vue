<template>
  <div>


    <!-- Page Header -->
    <header class="masthead home" :style="{ 'background-image': 'url(' + headerImage + ')' }">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="site-heading">
              <h1>{{initialData.title}}</h1>
              <span class="subheading">{{initialData.description}}</span>
            </div>
          </div>
        </div>
      </div>
    </header>



    <!-- Lastest blogs -->
    <div class="container mb-5">
      <h4 class="mt-5 pt-5 mb-4">{{ $t('latestBlogs') }}</h4>

      <div class="row">
          <div class="col-12 col-md-6 col-lg-4" v-for="post in posts" :key="post.id">
            <post-card :post-data="post" />
          </div>
      </div>



      <!-- Pagination button -->
      <div class="d-flex justify-content-between mt-2">

        <button v-if="pagination.page > 1" @click="prevPage()" 
          class="btn btn-outline-secondary rounded-pill px-4 mx-2">{{ $t('pagination.prev') }}</button>

        <span></span>

        <button v-if="pagination.page < 3" @click="nextPage()" 
          class="btn btn-outline-secondary rounded-pill px-4 mx-2">{{ $t('pagination.next') }}</button>
          
      </div>
    </div>



  </div>
</template>

<script>
import { mapState } from 'vuex'
import postCard from '@/components/postCard.vue'
import headerImage from '@/assets/img/header-bg.png'

export default {
  name: 'home',
  data() {
    return {
      headerImage: headerImage,
      pagination: {
        per_page: 3,
        page: 1
      },
      totalPages: this.$store.state.totalPages
    }
  },
  mounted() {
    this.$store.dispatch('getInitialData')
    this.$store.commit('setPagination', this.pagination)
    this.loadPost(this.pagination)
  },
  methods: {
    loadPost(pagination) {
      this.$store.dispatch('getPosts', pagination)
    },
    prevPage() {
      this.pagination.page--
    },
    nextPage() {
      this.pagination.page++
    },
  },
  computed: {
    // Load from vuex state
    ...mapState(['initialData', 'posts'])
  },
  watch: {
    // Watch for pagination changes
    pagination: {
      handler(newPage, oldPage) {
          this.loadPost(this.pagination)
      },
      deep: true
    }
  },
  components: {
    postCard
  }
}
</script>
