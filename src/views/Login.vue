<template>
  <v-container>
    <h2>Login</h2>
    <v-row>
      <v-col>
        <div v-if="mensaje !== ''">
          <v-alert dense type="error">
            {{ mensaje }}
          </v-alert>
        </div>
        <v-form v-if="!loading">
          <v-text-field v-model="login" label="Login" required></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>

          <v-btn color="success" class="mr-4" @click="loginUser"> Login </v-btn>
        </v-form>

        <div class="d-flex justify-center mt-4" v-if="loading">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="70"
            :width="7"
          ></v-progress-circular>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      login: "",
      password: "",
      mensaje: "",
      loading: false,
    };
  },
  methods: {
    async loginUser() {
      this.loading = true;

      const usuario = {
        login: this.login,
        password: this.password,
      };

      try {
        const res = await axios.post(
          "https://cotizacionwebapi.azurewebsites.net/api/usuario/login",
          usuario
        );

        const obj = {
          login: this.login,
          token: res.data,
        };

        this.saveUser(obj);
        this.$router.push({ name: "Rol" });
        this.loading = false;
      } catch (error) {
        this.loading = false;
        this.mensaje = "Usuario o contraseña incorrectos.";

        setTimeout(() => {
          this.mensaje = "";
        }, 3000);
      }
    },
    ...mapActions(["saveUser"]),
  },
};
</script>