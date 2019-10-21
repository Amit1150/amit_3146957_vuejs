<template>
    <b-row class="justify-content-center">
        <b-col md="8">
            <b-card no-body class="p-4">
                <b-card-body>
                    <b-form @submit.prevent="onSubmit">
                        <h1 class="text-xs-center">Sign up</h1>
                        <p class="text-xs-right">
                            <router-link :to="{ name: 'login' }">
                            Back to login
                            </router-link>
                        </p>
                        <NAGPErrors/>
                        <b-form-group 
                            id="input-group-0"
                            label="Username"
                            label-for="username">
                            <b-form-input
                                id="Username"
                                v-model="form.username"
                                placeholder="Enter Username"/>
                        </b-form-group>
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

import { REGISTER } from "@/store/actions.type";
import NAGPErrors from '../components/ErrorList'

export default {
    name: 'NAGPRegister',
    components: {
        NAGPErrors
    },
    data() {
        return {
            form: {
                email: '',
                password: '',
                username: ''
            }
        }
    },
    methods: {
        onSubmit(evnt) {
            evnt.preventDefault();
            this.$store.dispatch(REGISTER, this.form)
                .then(() => this.$router.push({ name: "my-articles" }));
        }
    }
}
</script>