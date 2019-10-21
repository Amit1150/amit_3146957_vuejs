<template>
    <b-row class="justify-content-center">
        <b-col md="8">
            <b-card no-body class="p-4">
                <b-card-body>
                    <b-form @submit.prevent="onSubmit">
                        <h1 class="text-xs-center">Sign in</h1>
                        <p class="text-xs-right">
                            <router-link :to="{ name: 'register' }">
                            Need an account?
                            </router-link>
                        </p>
                        <p class="text-muted">Sign In to your account</p>
                        <NAGPErrors/>
                        <b-form-group 
                            id="input-group-1"
                            label="Email Address"
                            label-for="email">
                            <b-form-input
                                id="email"
                                v-model="form.email"
                                placeholder="Enter Email"/>
                        </b-form-group>
                        <b-form-group
                            id="input-group-2"
                            label="Password"
                            label-for="password">
                            <b-form-input
                                id="password"
                                v-model="form.password"
                                placeholder="Enter Password"
                                type="password"/>
                        </b-form-group>
                        <b-button 
                            type="submit"
                            class="mr-3" 
                            variant="success">
                            Submit
                        </b-button>
                    </b-form>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
import NAGPErrors from '../components/ErrorList'
import { LOGIN } from "@/store/actions.type";

export default {
    name: 'NAGPLogin',
    components: {
        NAGPErrors
    },
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
        }
    },
    methods: {
        onSubmit(evnt) {
            evnt.preventDefault();
            this.$store.dispatch(LOGIN, this.form)
                .then(() => this.$router.push({ name: 'my-articles' }));
        }
    }
}
</script>