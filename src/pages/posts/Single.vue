<template>
    <div>

        <!-- Page Header -->
        <header class="masthead" :style="{ 'background-image': 'url(' + media.guid.rendered + ')' }">
            <div class="overlay"></div>
            <div class="container">
            <div class="row">
                <div class="col-lg-8 col-md-10 mx-auto">
                <div class="post-heading ltr">
                    <h1>{{ postData.title.rendered }}</h1>
                </div>
                </div>
            </div>
            </div>
        </header>

        <!-- Post Content -->
        <article class="post-preview">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto ltr" v-html="postData.content.rendered"></div>
                </div>
            </div>
        </article>

        <!-- Comments -->
        <div class="container my-5 ltr" v-if="comments.length">
            <div class="row">
                <div class="col-12 col-md-10 col-lg-8 mx-auto">
                    <h2 class="font-weight-light text-muted">Comments</h2>

                    <!-- Comment cards -->
                    <Comment :comment-data="comments" />
                </div>
            </div>
        </div>

        <Loading v-show="loading" />

    </div>
</template>

<script>
import { getRequest, postRequest } from '@/utils/apiRequests'

// Components
import Comment from '@/components/Comment.vue'
import Loading from '@/components/Loading.vue'

export default {
    name: 'post',
    metaInfo() {
        return {
            title: this.postData.title.rendered
        }
    },
    data() {
        return {
            postData: {
                title: {
                    rendered: ''
                },
                content: {
                    rendered: ''
                }
            },
            media: {
                guid: {
                    rendered: ''
                }
            },
            comments: [],
            loading: false,
            commentText: ''
        }
    },
    mounted() {
        this.loadData(this.$route.params.id)
    },
    methods: {

        loadData(postId) {
            this.loading = true

            setTimeout(() => {
                getRequest('/wp-json/wp/v2/posts/' + postId)
                .then(response => {
                    this.postData = response.data

                    const media = response.data._links['wp:featuredmedia'][0];
                    const comments = response.data._links['replies'][0];

                    // Get post media
                    if(media.embeddable) {
                        this.getSubData(media.href)
                        .then(response => {
                            this.media = response.data
                        })
                        .catch(error => {
                            console.log('Error in media')
                        })
                    }

                    // Get post comments
                    if(comments.embeddable) {
                        this.getSubData(comments.href)
                        .then(response => {

                            let comments = this.nestingComments(response.data, 0)
                            this.comments = comments

                        })
                        .catch(error => {
                            console.log('Error in comments')
                        })
                    }

                    this.loading = false

                })
                .catch(error => {
                    console.log('Error --> ' + error)
                    this.loading = false
                })
            }, 1000)
        },

        nestingComments(arr, parent) {
            let output = []

            // Loop through array
            for(let i in arr) {
                if(arr[i].parent == parent) {
                    let sub_comments = this.nestingComments(arr, arr[i].id)

                    if(sub_comments.length) {
                        arr[i].sub_comments = sub_comments
                    }
                    output.push(arr[i])
                }
            }
            return output
        },

        getSubData(url) {
            const clearURL = url.replace('http://localhost/wordpress', '')
            const req = getRequest(clearURL)
            return req;
        },

    },
    components: {
        Loading,
        Comment
    }
}
</script>