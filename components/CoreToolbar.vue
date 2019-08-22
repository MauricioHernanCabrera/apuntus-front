<template>
  <div>
    <v-app-bar app color="primary" dark class="elevation-0">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title v-if="title.length > 0">{{ title }}</v-toolbar-title>
      <slot />
    </v-app-bar>

    <v-navigation-drawer class="primary" v-model="drawer" app dark rounded>
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
          <v-list-item to="/users/hola" color="white">
            <v-list-item-avatar size="24" class="mr-5">
              <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-title class="ml-3">Hola</v-list-item-title>
          </v-list-item>
        </template>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn v-if="isAuth" block @click="logout">Cerrar sesión</v-btn>

          <v-btn v-else block class="black--text white" to="/auth/login">
            <span>Iniciar sesion</span>
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    iconBackName: {
      type: String,
      default: "arrow_back"
    },
    backActive: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      drawer: null,

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

  methods: {
    ...mapActions("auth", ["logout"])
  },

  computed: {
    ...mapGetters("user", ["isAuth"])
  }
};
</script>

<style>
</style>