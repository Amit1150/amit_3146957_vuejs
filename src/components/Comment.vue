<template>
    <b-card 
        no-body
        class="comment-container">
        <b-card-body
            class="comment-body"
            v-html="compiledMarkdown(comment.body)"/>
        <template v-slot:footer>
            <b-row>
                <b-col cols="12" md="8">
                    <img :src="comment.author.image" height="32" width="32"/>
                    <small class="ml-2">{{comment.author.username}}</small>
                    <b-button 
                        size="sm"
                        variant="outline-danger"
                        class="ml-3 btn-xs delete-comment"
                        @click="deleteComment(comment.id)"
                        v-if="isLoggedIn && comment.author.username == currentUser.username">
                        <font-awesome-icon icon="trash" />
                        Delete
                    </b-button>
                </b-col>
                <b-col cols="12" md="4">
                    <small class="text-muted float-lg-right">Last updated: {{ comment.updatedAt | date }}</small>
                </b-col>
            </b-row>
        </template>
    </b-card>
</template>

<script>
import marked from "marked";
import { COMMENT_DELETE } from "@/store/actions.type";
import { mapGetters } from 'vuex';

export default {
    name: 'NAGPComment',
    props: ['comment'],
    computed: {
        ...mapGetters(['isLoggedIn', 'currentUser'])
    },
    methods: {
        compiledMarkdown(data) {
            return marked(data);
        },
        deleteComment(id) {
            var data = {
                id: id,
                slug: this.$route.params.slug
            };
            this.$store.dispatch(COMMENT_DELETE, data);
        }
    }
}
</script>