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
          <v-btn class="mr-1" depressed color="error"> Cancelar </v-btn>
        </router-link>
        <router-link
          :to="{ name: 'EditarRol', params: { id: this.rol.idRol } }"
        >
          <v-btn depressed color="cyan"> Editar </v-btn>
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
    };
  },
  methods: {
    async getRol() {
      try {
        const token = localStorage.getItem("token-cotizacion");

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const res = await axios.get(
          `http://www.sistemadecotizacionwebapi.somee.com/api/rol/${this.id}`,
          config
        );
        this.rol = res.data;
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