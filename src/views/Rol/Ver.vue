<template>
  <v-container>
    <h2>Editar Rol</h2>
    <v-row>
      <v-col cols="12" xs="12" lg="4">
        <v-text-field
          v-model="rol.nombre"
          label="Nombre"
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" xs="12" lg="4">
        <router-link :to="{ name: 'Rol' }">
          <v-btn class="mr-1" depressed color="error"> Cancelar </v-btn>
        </router-link>
        <router-link
          :to="{ name: 'EditarRol', params: { id: this.rol.idRol } }"
        >
          <v-btn :loading="loading" :disabled="loading" depressed color="cyan">
            Editar
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";

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
        this.loading = false;
        console.log(error);
      }
    },
  },
  created() {
    this.getRol();
  },
};
</script>