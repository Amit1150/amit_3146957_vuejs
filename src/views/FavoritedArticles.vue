<template>
  <NAGPArticles :favorited="currentUser.username"/>
</template>

<script>
import NAGPArticles from '@/components/Articles'
import { mapGetters } from "vuex";

export default {
    name: 'NAGPFavArticle',
    components: {
        NAGPArticles
    },
    computed: {
        ...mapGetters(['currentUser'])
    }
}
</script>