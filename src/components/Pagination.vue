<template>
    <div class="overflow-auto">
        <div class="mt-3">
            <b-pagination 
                v-model="currentPage" 
                :total-rows="rows"
                :limit="'10'"
                :per-page="itemPerPage"
                @change="onPageChange">
            </b-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NAGPPagination',
    props: {
        rows: {
            type: Number,
            required: true
        },
        currentPage: {
            type: Number,
            required: true
        },
        itemPerPage: {
            type: Number,
            required: false,
            default: 20
        }
    },
    methods: {
        onPageChange(page) {
            this.$emit("update:currentPage", page);
        }
    }
}
</script>