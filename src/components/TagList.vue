<template>
    <div>
        <b-button 
            squared 
            variant="outline-primary"
            size="sm"
            class="ml-1 mb-2"
            v-for="(tag, index) in tags"
            v-bind:key="index"
            :to="{name: 'article-tag', params: {tag: tag}}"
            >
            {{tag}}
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'NAGPTags',
    props: {
        tags: Array
    }
}
</script>