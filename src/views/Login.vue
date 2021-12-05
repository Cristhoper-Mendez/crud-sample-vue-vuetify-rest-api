<template>
  <v-container>
    <h2>Login</h2>
    <v-row justify="">
      <v-col>
        <div v-if="mensaje != ''">
          <p>{{ mensaje }}</p>
        </div>
        <v-form>
          <v-text-field v-model="login" label="Login" required></v-text-field>

          <v-text-field
            v-model="password"
            label="Password"
            required
          ></v-text-field>

          <v-btn color="success" class="mr-4" @click="loginUser"> Login </v-btn>
        </v-form>
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
    };
  },
  methods: {
    async loginUser() {
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
      } catch (error) {
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