<template>
  <v-navigation-drawer
    class="primary"
    @input="SET_DRAWER"
    :value="drawer"
    app
    dark
    rounded
    style="z-index: 1100;"
  >
    <v-list rounded>
      <v-list-item three-line>
        <v-list-item-content>
          <v-list-item-title class="d-flex justify-center">
            <logo />
          </v-list-item-title>
          <v-list-item-subtitle
            class="text-center"
          >Encontra los mejores apuntes compartido por estudiantes</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="my-2"></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.name"
        color="white"
        :exact="item.isExact"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <template v-if="isAuth">
        <v-list-item :to="`/users/${user.username}`" color="white">
          <v-list-item-icon>
            <v-icon>face</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Mi perfil</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>

    <template v-slot:append>
      <div class="pa-2">
        <v-btn v-if="isAuth" block @click="logout">Cerrar sesión</v-btn>

        <div v-else class="text-center">
          <v-btn text block class="white--text" to="/auth/register">
            <span>Registrate</span>
          </v-btn>
          <span class="white--text">o</span>
          <v-btn block class="black--text white" to="/auth/login">
            <span>Iniciar sesion</span>
          </v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      items: [
        {
          name: "Inicio",
          to: "/",
          icon: "mdi-home-outline",
          isExact: true
        },

        {
          name: "Nuevo apunte",
          to: "/notes/new",
          icon: "mdi-cloud-upload-outline",
          isExact: true
        }
      ]
    };
  },

  computed: {
    ...mapState(["drawer"]),
    ...mapState("user", ["user"]),
    ...mapGetters("user", ["isAuth"])
  },

  methods: {
    ...mapActions("auth", ["logout"]),
    ...mapMutations(["SET_DRAWER"])
  }
};
</script>

<style lang="scss" scoped>
</style>
