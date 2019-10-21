<template>
  <b-navbar toggleable="lg" text-variant="black" variant="light">
    <b-navbar-brand :to="{ name: 'global' }">Amit</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto" v-if="!isLoggedIn">
        <b-nav-item :to="{ name: 'login' }">Sign In</b-nav-item>
        <b-nav-item :to="{ name: 'register' }">Sign Up</b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto" v-else>
        <b-nav-item 
          :to="{ name: 'add-article' }"
          id="add-article">
          <font-awesome-icon icon="edit" />
          Add Article
        </b-nav-item>
        <b-nav-item 
          :to="{ name: 'profile' }"
          id="profile">
          {{currentUser.username}}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    name: 'NAGPHeader',
    computed: {
      ...mapGetters(['isLoggedIn', 'currentUser'])
    }
}
</script>

<style>

</style>