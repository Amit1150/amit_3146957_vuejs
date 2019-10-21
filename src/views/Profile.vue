<template>
    <b-card no-body="">
        <b-card-body>
            <b-card-text>
                <b>Username: </b> {{currentUser.username}}
            </b-card-text>
            <b-card-text>
                <b>Email: </b> {{currentUser.email}}
            </b-card-text>
        </b-card-body>
        <template v-slot:footer>
            <b-row>
                <b-col>
                    <b-button
                        pill
                        variant="danger"
                        id="logout"
                        @click="logout">
                        Logout
                    </b-button>
                </b-col>
            </b-row>
        </template>
    </b-card>
</template>

<script>
import { mapGetters } from 'vuex';
import { LOGOUT } from "@/store/actions.type";

export default {
    name: 'NAGPProfile',
    computed: {
        ...mapGetters(['currentUser'])
    },
    methods: {
        logout() {
            this.$store.dispatch(LOGOUT)
                .then(() => {
                    this.$router.push({ name: "global" });
                });
        }
    }
}
</script>
