<template>
    <NAGPArticles :tag="tag"/>
</template>

<script>
import NAGPArticles from '@/components/Articles'

export default {
    name: 'NAGPTagArticle',
    components: {
        NAGPArticles
    },
    computed: {
        tag() {
            return this.$route.params.tag;
        }
    }
}
</script>