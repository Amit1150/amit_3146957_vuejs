<template>
  <NAGPArticles :author="currentUser.username"/>
</template>

<script>
import NAGPArticles from '@/components/Articles'
import { mapGetters } from "vuex";

export default {
    name: 'NAGPMyArticle',
    components: {
        NAGPArticles
    },
    computed: {
        ...mapGetters(['currentUser'])
    }
}
</script>