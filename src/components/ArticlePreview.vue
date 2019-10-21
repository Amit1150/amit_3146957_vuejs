<template>
    <b-card no-body class="article">
        <b-card-title class="m-1">
            <b-row>
                <b-col cols="8">
                    <router-link
                        class="article-title text-dark"
                        :to="articleUrl">
                        {{ article.title }}
                    </router-link>
                    </b-col>
                <b-col cols="4">
                    <b-button 
                        pill
                        size="sm"
                        :variant="variant" 
                        class="float-right fav-count"
                        @click="toggleFavorite">
                        <font-awesome-icon icon="heart" />
                        {{article.favoritesCount}}
                    </b-button>
                </b-col>
            </b-row>
        </b-card-title>
        <b-card-body>
            <b-card-text class="article-description">
                {{article.description}}
            </b-card-text>
            <b-row>
                <b-col cols="12" md="4">
                    <router-link
                        class="text-muted art-read-more" 
                        :to="articleUrl">
                        Read More..
                    </router-link>
                </b-col>
                <b-col cols="12" md="8">
                    <NAGPTags :tags="article.tagList"  class="float-lg-right"/>
                </b-col>
            </b-row>
        </b-card-body>
        <template v-slot:footer>
            <b-row>
                <b-col cols="12" md="8">
                    <img :src="article.author.image" height="32" width="32"/>
                    <small class="ml-2">{{article.author.username}}</small>
                </b-col>
                <b-col cols="12" md="4">
                    <small class="text-muted float-lg-right">Last updated: {{ article.updatedAt | date }}</small>
                </b-col>
            </b-row>
        </template>
    </b-card>
</template>

<script>
import NAGPTags from './TagList'
import { FAVORITE_ADD, FAVORITE_DELETE } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
    name: 'NAGPArticle',
    props:['article'],
    components: {
        NAGPTags
    },
    computed: {
        ...mapGetters(['isLoggedIn']),
        articleUrl() {
            return {
                name: 'view-article',
                params: {
                    slug: this.article.slug
                }
            }
        },
        variant() {
            return this.article.favorited ?
                'success' : 'outline-success';
        }
    },
    methods: {
        toggleFavorite() {
            if(!this.isLoggedIn) {
                this.$router.push({ name: "login" });
                return;
            }
            const action = this.article.favorited ?
                FAVORITE_DELETE :
                FAVORITE_ADD;
            this.$store.dispatch(action, this.article.slug);
        }
    }
}
</script>

<style lang="scss" scoped>
.article-title {
    margin-left: 15px;
}
</style>