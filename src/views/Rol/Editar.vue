<template>
  <v-container>
    <h2>Editar Rol</h2>
    <div v-if="mensaje !== ''">
      <v-alert dense type="error">
        {{ mensaje }}
      </v-alert>
    </div>
    <v-row>
      <v-col sm="4">
        <v-text-field
          v-model="rol.nombre"
          label="Nombre"
          v-if="rol.nombre === 'Cargando...'"
          disabled
        ></v-text-field>
        <v-text-field
          v-model="rol.nombre"
          label="Nombre"
          v-if="rol.nombre !== 'Cargando...'"
        ></v-text-field>
      </v-col>
      <v-col sm="12">
        <router-link :to="{ name: 'Rol' }">
          <v-btn class="mr-1" depressed color="error"> Cancelar </v-btn>
        </router-link>
        <v-btn
          @click="editarRol"
          class="mr-1"
          depressed
          color="primary"
          :loading="loading"
          :disabled="loading"
        >
          Editar
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
        id: "",
        nombre: "Cargando...",
      },
      loading: false,
      mensaje: "",
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
          `http://www.sistemadecotizacionwebapi.somee.com/api/rol/${this.id}`,
          config
        );
        this.rol = res.data;
        this.loading = false;
      } catch (error) {
        console.log(error);
      }
    },
    async editarRol() {
      try {
        this.loading = true;
        const token = localStorage.getItem("token-cotizacion");

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.put(
          `http://www.sistemadecotizacionwebapi.somee.com/api/rol/${this.id}`,
          this.rol,
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