<template>
    <div>
        <b-card no-body v-if="article">
            <b-card-title class="m-1">
                <b-row class="article-header">
                    <b-col cols="8"> {{ article.title }} </b-col>
                    <b-col cols="4">
                        <b-button 
                            pill
                            size="sm"
                            :variant="variant" 
                            class="float-right btn-xs"
                            id="fav-article"
                            @click="toggleFavorite">
                            <font-awesome-icon icon="heart" />
                            {{favoriteText}} ({{article.favoritesCount}})
                        </b-button>
                    </b-col>
                </b-row>
            </b-card-title>
            <b-card-body>
                <div v-html="compiledMarkdown(article.body)"></div>
                <NAGPTags :tags="article.tagList"  class="float-right"/>
            </b-card-body>
            <template v-slot:footer>
                <b-row>
                    <b-col cols="12" md="8">
                        <img :src="article.author.image" height="32" width="32"/>
                        <small class="ml-2">{{article.author.username}}</small>
                        <span v-if="isLoggedIn && article.author.username == currentUser.username">
                            <b-button
                                pill
                                size="sm"
                                variant="outline-primary"
                                class="ml-3 btn-xs"
                                id="edit-article"
                                :to="articleUrl">
                                <font-awesome-icon icon="edit" />
                                Edit
                            </b-button>
                            <b-button
                                pill
                                size="sm"
                                variant="outline-danger"
                                class="ml-2 btn-xs"
                                id="delete-article"
                                @click="deleteArticle">
                                <font-awesome-icon icon="trash" />
                                Delete
                            </b-button>
                        </span>
                    </b-col>
                    <b-col cols="12" md="4">
                        <small class="text-muted float-lg-right">Last updated: {{ article.updatedAt | date }}</small>
                    </b-col>
                </b-row>
            </template>
        </b-card>
        <NAGPComments 
            :comments="comments"
            v-if="article" 
            class="mt-5"/>
    </div>
</template>

<script>
import marked from "marked";
import NAGPTags from '../components/TagList'
import NAGPComments from '../components/Comments'
import { 
    FETCH_ARTICLE, 
    FETCH_COMMENTS,
    FAVORITE_ADD,
    FAVORITE_DELETE,
    ARTICLE_DELETE
    } from "@/store/actions.type";
import { mapGetters } from 'vuex';

export default {
  name: "NAGPViewArticle",
  components: {
      NAGPTags,
      NAGPComments
  },
  mounted() {
      this.$store.dispatch(FETCH_ARTICLE, this.$route.params.slug);
      this.$store.dispatch(FETCH_COMMENTS, this.$route.params.slug)
  },
  computed: {
      ...mapGetters(['article', 'comments', 'currentUser', 'isLoggedIn']),
      variant() {
          return this.article.favorited?
            'success' : 'outline-success';
      },
      articleUrl() {
          return {
              name: 'edit-article',
              params: {
                  slug: this.article.slug
              }
          }
      },
      favoriteText() {
          return this.article.favorited?
            'UnFavorite':
            'Favorite';
      }
  },
  methods: {
      compiledMarkdown(data) {
          return marked(data);
      },
      deleteArticle() {
          this.$store.dispatch(ARTICLE_DELETE, this.article.slug)
            .then(() => {
                this.$router.push({ name: "my-articles" });
            });
      },
      toggleFavorite() {
        if(!this.isLoggedIn) {
            this.$router.push({ name: "login" });
            return;
        }
        const action = this.article.favorited ?
            FAVORITE_DELETE:
            FAVORITE_ADD;
    
        this.$store.dispatch(action, this.article.slug);
      }
  }
};
</script>
<style lang="scss" scoped>
.article-header {
    padding-left: 15px;
}
</style>