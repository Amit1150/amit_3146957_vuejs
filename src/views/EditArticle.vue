<template>
  <b-row class="justify-content-center">
      <b-col>
          <b-card no-body>
              <b-card-body v-if="article">
                  <b-form @submit.prevent="onSubmit">
                      <h2 class="text-xs-center">Edit Article</h2>
                      <NAGPErrors/>
                      <b-form-group
                        id="input-group-0"
                        label="Title"
                        label-for="title">
                            <b-form-input
                                id="title"
                                v-model="article.title"
                                placeholder="Enter Title"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-1"
                        label="Description"
                        label-for="description">
                            <b-form-input
                                id="descrition"
                                v-model="article.description"
                                placeholder="Enter description"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-0"
                        label="Body"
                        label-for="body">
                            <textarea
                                id="body"
                                v-model="article.body"
                                class="w-100"
                                rows="5"
                                placeholder="Write your article (in markdown)"/>
                      </b-form-group>
                      <b-form-group
                        id="input-group-0"
                        label="Tags"
                        label-for="tags">
                            <b-form-input
                                id="tags"
                                v-model="article.tags"
                                placeholder="Enter Tags (comma seperated)"/>
                      </b-form-group>
                      <b-button 
                            type="submit"
                            class="mr-3" 
                            variant="success">
                            Submit
                        </b-button>
                  </b-form>
              </b-card-body>
          </b-card>
      </b-col>
  </b-row>
</template>

<script>
import { mapGetters } from 'vuex';
import NAGPErrors from '../components/ErrorList'
import { 
    FETCH_ARTICLE,
    ARTICLE_EDIT
} from "@/store/actions.type";

export default {
    name: 'NAGPArticle',
    components: {
        NAGPErrors
    },
    mounted() {
        this.$store.dispatch(FETCH_ARTICLE, this.$route.params.slug);
    },
    computed: {
        ...mapGetters(['article']),
    },
    methods: {
        onSubmit() {
            this.$store.dispatch(ARTICLE_EDIT, this.article)
                .then(() => this.$router.push({ name: "my-articles" }));
        }
    }
}
</script>
