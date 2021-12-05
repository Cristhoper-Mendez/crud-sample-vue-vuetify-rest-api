<template>
  <v-container>
    <h2>Editar Rol</h2>
    <v-row>
      <v-col sm="4">
        <v-text-field
          v-model="rol.nombre"
          label="Nombre"
          disabled
        ></v-text-field>
      </v-col>
      <v-col sm="12">
        <router-link :to="{ name: 'Rol' }">
          <v-btn class="mr-1" depressed color="primary"> Cancelar </v-btn>
        </router-link>
        <v-btn
          @click="eliminarRol"
          class="mr-1"
          depressed
          color="error"
          :loading="loading"
          :disabled="loading"
        >
          Eliminar
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
      id: this.$route.params.id,
      rol: {
        idRol: "",
        nombre: "Cargando...",
      },
      loading: false,
    };
  },
  methods: {
    async getRol() {
      try {
        this.loading = true;
        const token = localStorage.getItem("token-cotizacion");

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `https://www.sistemadecotizacionwebapi.somee.com/api/rol/${this.id}`,
          config
        );
        this.rol = res.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async eliminarRol() {
      try {
        this.loading = true;
        const token = localStorage.getItem("token-cotizacion");

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(
          `https://www.sistemadecotizacionwebapi.somee.com/api/rol/${this.id}`,
          config
        );
        this.loading = false;
        router.push({ name: "Rol" });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getRol();
  },
};
</script>