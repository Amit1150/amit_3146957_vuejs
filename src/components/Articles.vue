<template>
  <div>
    <div v-if="articles.length > 0">
      <NAGPArticle 
        v-for="(data,index) in articles" 
        v-bind:key="index"
        :article="data">
      </NAGPArticle>
      <NAGPPagination 
        id="article-pages"
        :rows="articlesCount" 
        :currentPage.sync="pageNumber"
        :itemPerPage="itemsPerPage"/>
    </div>
    <b-col class="mt-4" v-else>
      <p>
        No articles are here... yet.
      </p>
    </b-col>
  </div>
</template>

<script>
import NAGPArticle from "./ArticlePreview";
import NAGPPagination from './Pagination.vue'
import { FETCH_ARTICLES } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "NAGPArticles",
  components: {
    NAGPArticle,
    NAGPPagination
  },
  props: {
    listType: {
      type: String,
      default: 'all',
      required: false,
    },
    tag: {
      type: String,
      required: false
    },
    author: {
      type: String,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 20
    }
  },
  computed: {
    articlesParams() {
      let filter = {
        offset: (this.pageNumber - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };

      if(this.tag){
        filter.tag = this.tag;
      }

      if(this.author) {
        filter.author = this.author;
      }

      if(this.favorited) {
        filter.favorited = this.favorited;
      }

      return filter;
    },
    ...mapGetters(['articles', 'articlesCount', 'isLoading'])
  },
  mounted() {
    this.getArticles();
  },
  data() {
    return {
      pageNumber: 1
    };
  },
  methods: {
    getArticles() {
      this.$store.dispatch(FETCH_ARTICLES, this.articlesParams);
    },
    resetPageNumber() {
      this.pageNumber = 1;
    }
  },
  watch: {
    pageNumber() {
      this.getArticles();
    },
    tag() {
      this.resetPageNumber();
      this.getArticles();
    },
    author() {
      this.resetPageNumber();
      this.getArticles();
    },
    favorited() {
      this.resetPageNumber();
      this.getArticles();
    }
  }
};
</script>