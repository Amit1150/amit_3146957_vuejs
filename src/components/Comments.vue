<template>
  <div>
      <div id="add-comment" v-if="isLoggedIn">
        <h3>Leave a Reply</h3>
        <NAGPErrors/>
        <b-form 
            @submit.prevent="onSubmit"
            v-if="isLoggedIn">
            <b-card no-body>
                <b-card-body class="p-0">
                    <textarea 
                        class="w-100" 
                        placeholder="Write a comment..." 
                        rows="3"
                        id="comment"
                        v-model="form.body"/>
                </b-card-body>
                <template v-slot:footer>
                    <b-button 
                        variant="success" 
                        size="sm" 
                        class="float-right"
                        type="submit"
                        id="post-comment">
                        Post Comment
                    </b-button>
                </template>
            </b-card>
        </b-form>
      </div>
      <p v-else>
        <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
        <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
      </p>
      <NAGPComment 
        v-for="data in comments" 
        v-bind:key="data.id"
        :comment="data"/>
  </div>
</template>

<script>
import NAGPComment from './Comment';
import NAGPErrors from './ErrorList'
import { mapGetters } from 'vuex';
import { COMMENT_ADD } from "@/store/actions.type";

export default {
    name: 'NAGPComments',
    components: {
        NAGPComment,
        NAGPErrors
    },
    props: {
        comments: {
            type: Array,
            required: false
        },
    },
    computed: {
        ...mapGetters(['isLoggedIn'])
    },
    data() {
        return {
            form: {
                body: '',
                slug: this.$route.params.slug
            }
        }
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(COMMENT_ADD, this.form)
                .then(() => this.form.body = '' );
        }
    }
}
</script>