<template>
  <div id="app">
    <div id="loader" v-if="isLoading">
      <div>
      </div>
    </div>
    <NAGPHeader/>
    <div class="banner w-100 p-3 text-center">
      <h1>VueJS Home Assignment</h1>
    </div>
    <b-container class="mt-3 mb-3 article-body">
      <router-view/>
    </b-container>
    <NAGPFooter/>
  </div>
</template>
<script>
import NAGPHeader from "@/components/Header";
import NAGPFooter from "@/components/Footer";
import { mapGetters } from 'vuex';

export default {
  name: "App",
  components: {
    NAGPHeader,
    NAGPFooter
  },
  computed: {
    ...mapGetters(['isLoading'])
  }
};
</script>
<style lang="scss" scoped>
.banner {
    background: #5cb85c;
    box-shadow: inset 0 8px 8px -8px rgba(0,0,0,.3), inset 0 -8px 8px -8px rgba(0,0,0,.3);
}
</style>

