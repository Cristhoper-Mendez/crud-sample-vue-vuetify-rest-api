<template>
  <v-container>
    <h2>Buscar</h2>
    <v-row>
      <v-col sm="4">
        <v-text-field v-model="nombre" label="Nombre"></v-text-field>
      </v-col>
      <v-col sm="4">
        <v-btn depressed color="green" @click="buscarRoles"> Buscar </v-btn>
        <router-link :to="{ name: 'AgregarRol' }">
          <v-btn depressed color="cyan" class="ml-3"> Agregar </v-btn>
        </router-link>
      </v-col>

      <v-col sm="12">
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Nombre</th>
                <th class="text-left">Acciones</th>
              </tr>
            </thead>

            <tbody v-if="!loading">
              <tr v-for="item in roles" :key="item.idRol">
                <td>{{ item.nombre }}</td>
                <td>
                  <router-link
                    :to="{ name: 'EliminarRol', params: { id: item.idRol } }"
                  >
                    <v-btn class="mr-1" depressed color="error">
                      Eliminar
                    </v-btn>
                  </router-link>

                  <router-link
                    :to="{ name: 'VerRol', params: { id: item.idRol } }"
                  >
                    <v-btn class="mr-1" depressed color="primary"> Ver </v-btn>
                  </router-link>

                  <router-link
                    :to="{ name: 'EditarRol', params: { id: item.idRol } }"
                  >
                    <v-btn depressed color="cyan"> Editar </v-btn>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
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
export default {
  data() {
    return {
      nombre: "",
      roles: [],
      loading: false,
    };
  },
  methods: {
    async getRoles() {
      this.loading = true;
      const token = localStorage.getItem("token-cotizacion");

      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await axios.get(
        "https://www.sistemadecotizacionwebapi.somee.com/api/rol",
        config
      );
      this.roles = res.data;
      this.loading = false;
    },
    async buscarRoles() {
      if (this.nombre === "") {
        this.getRoles();
      } else {
        try {
          this.loading = true;

          const token = localStorage.getItem("token-cotizacion");

          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const obj = {
            nombre: this.nombre,
            topAux: 10,
          };

          const res = await axios.post(
            "https://www.sistemadecotizacionwebapi.somee.com/api/rol/buscar",
            obj,
            config
          );

          this.roles = res.data;
          this.nombre = "";

          this.loading = false;
        } catch (error) {
          console.log(error);
        }
      }
    },
  },
  created() {
    this.getRoles();
  },
};
</script>