<template>
    <ul id="error-list">
        <li v-for="(value, key) in errors" v-bind:key="key" class="text-danger">
            <span v-text="key" class="mr-1"></span>
            <span v-for="err in value.slice(0,1)" v-bind:key="err" v-text="err"></span>
        </li>
    </ul>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
    name: 'NAGPErrors',
    computed: {
        ...mapGetters(['errors'])
    }
}
</script>
<style lang="scss" scoped>
#error-list {
    list-style: none;
}
</style>
