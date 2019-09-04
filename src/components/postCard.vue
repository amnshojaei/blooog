<template>
    <div class="blog border-0 mb-4">
        <router-link :to="{ name: 'post', params: { id: postData.id } }" class="imgHolder">
            <img :src="thumbnail()" alt="">
        </router-link>
        <div class="card-body ltr">
            <router-link :to="{ name: 'post', params: { id: postData.id } }">
                <h4 class="card-title font-weight-bold">{{ title() }}</h4>
            </router-link>
            <p class="card-text" v-html="description()"></p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'postCard',
    props: {
        postData: {
            required: true
        }
    },
    methods: {
        title() {
            return this.postData.title.rendered
        },
        description() {
            return this.postData.excerpt.rendered
        },
        thumbnail() {
            return this.postData._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url
        }
    }
}
</script>