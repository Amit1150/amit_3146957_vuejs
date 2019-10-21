<template>
  <div>
    <b-row>
      <b-col cols="12" md="8">
        <b-nav pills class="outline-active">
          <b-nav-item
            id="global-articles"
            :to="{ name: 'global' }">Global Feed
          </b-nav-item>
          <b-nav-item
            id="my-articles"
            v-if="isLoggedIn"
            :to="{ name: 'my-articles' }">My Artilcles
          </b-nav-item>
          <b-nav-item
            id="fav-articles"
            v-if="isLoggedIn"
            :to="{ name: 'favorited-articles' }">Favorited Artilcles
          </b-nav-item>
          <b-nav-item active v-if="tag">
            #{{tag}}
          </b-nav-item>
        </b-nav>
        <router-view></router-view>
      </b-col>
      <b-col cols="12" md="4">
        <b-card no-body header="Popular Tags">
          <b-card-body id="tag-container">
            <NAGPTags :tags="tags"/>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import NAGPTags from "../components/TagList";
import { FETCH_TAGS } from "@/store/actions.type";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {
    NAGPTags
  },
  mounted() {
    this.$store.dispatch(FETCH_TAGS);
  },
  computed: {
    ...mapGetters(['tags', 'currentUser', 'isLoggedIn']),
    tag() {
      return this.$route.params.tag;
    }
  }
};
</script>
