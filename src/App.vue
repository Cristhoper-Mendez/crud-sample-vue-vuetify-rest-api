<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
        <router-link class="ml-2 mr-2" :to="{ name: 'Home' }">
          <span class="white--text">Home</span>
        </router-link>
        |
        <router-link class="ml-2" v-if="isActive" :to="{ name: 'Rol' }">
          <span class="white--text">Rol</span>
        </router-link>
        <router-link class="ml-2" v-if="!isActive" :to="{ name: 'Login' }">
          |
          <span class="white--text">Login</span>
        </router-link>
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="isActive" icon @click="logout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",

  data: () => ({
    //
  }),
  methods: {
    ...mapActions(["logout", "readToken"]),
  },
  computed: {
    ...mapGetters(["isActive"]),
  },
  created() {
    this.readToken();
  },
};
</script>
