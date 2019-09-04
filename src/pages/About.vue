<template>
  <div>

    <!-- Page Header -->
    <header class="masthead" :style="{ 'background-image': 'url(' + aboutImg + ')' }">
      <div class="overlay"></div>
      <div class="container">
        <div class="row">
          <div class="col-lg-8 col-md-10 mx-auto">
            <div class="page-heading">
              <h1> {{ $t('about.title') }} </h1>
              <span class="subheading"> {{ $t('about.subtitle')}} </span>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <p v-html="$t('about.body')" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import aboutImg from '@/assets/img/about-bg.jpg'

export default {
  name: 'about',
  data() {
    return {
      aboutImg: aboutImg
    }
  }
}
</script>