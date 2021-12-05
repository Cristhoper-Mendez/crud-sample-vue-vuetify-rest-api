<template>
  <v-container>
    <h2>Agregar Rol</h2>
    <div v-if="mensaje != ''">
      <v-alert dense type="error">
        <p>{{ mensaje }}</p>
      </v-alert>
    </div>
    <v-row>
      <v-col sm="4">
        <v-text-field v-model="rol.nombre" label="Nombre"></v-text-field>
      </v-col>
      <v-col sm="12">
        <router-link :to="{ name: 'Rol' }">
          <v-btn class="mr-1" depressed color="error"> Cancelar </v-btn>
        </router-link>
        <v-btn
          @click="agregarRol"
          class="mr-1"
          depressed
          color="primary"
          :loading="loading"
          :disabled="loading"
        >
          Agregar
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
import router from "../../router";

export default {
  data() {
    return {
      rol: {
        nombre: "",
      },
      loading: false,
      mensaje: "",
    };
  },
  methods: {
    async agregarRol() {
      if (this.rol.nombre.trim() === "") {
        this.mensaje = "El nombre es requerido";
        setTimeout(() => {
          this.mensaje = "";
        }, 3000);
      } else {
        try {
          this.loading = true;
          const token = localStorage.getItem("token-cotizacion");

          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          await axios.post(
            `https://www.sistemadecotizacionwebapi.somee.com/api/rol/`,
            this.rol,
            config
          );

          this.loading = false;
          router.push({ name: "Rol" });
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
};
</script>