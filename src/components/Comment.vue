<template>
    <div>

        <!-- Father -->
        <div class="media mt-4 mb-5 rounded p-3" v-for="comment in commentData" :key="comment.id">
            <div class="avatar">
                <img :src="comment.author_avatar_urls['96']" class="mr-3" alt="">
            </div>
            <div class="media-body">
                <h5 class="mt-0">{{ comment.author_name }}</h5>
                <span v-html="comment.content.rendered"></span>

                <!-- Child -->
                <div class="media mt-3 pt-3" v-for="child in comment.sub_comments" :key="child.id">
                    <div class="avatar">
                        <img :src="child.author_avatar_urls['96']" class="mr-3" alt="">
                    </div>
                    <div class="media-body">
                        <h5 class="mt-0">{{ child.author_name }}</h5>
                        <span v-html="child.content.rendered"></span>

                        <!-- Grandson -->
                        <div class="media mt-3 pt-3" v-for="child in child.sub_comments" :key="child.id">
                            <div class="avatar">
                                <img :src="child.author_avatar_urls['96']" class="mr-3" alt="">
                            </div>
                            <div class="media-body">
                                <h5 class="mt-0">{{ child.author_name }}</h5>
                                <span v-html="child.content.rendered"></span>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'comments',
    props: {
        commentData: {
            required: true
        }
    }
}
</script>