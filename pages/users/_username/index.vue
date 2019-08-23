<template>
  <v-container>
    <core-toolbar :title="isMyProfile? 'Mi perfil' : `Perfil de ${user.username}`">
      <template v-slot:extension-2>
        <v-tabs v-model="tabSelected" centered slider-color="yellow" background-color="transparent">
          <v-tab
            v-for="item in tabs"
            :key="item.name"
            :href="`#${item.value}`"
            @click="$router.push(`/users/${user.username}?noteName=${item.value}`)"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <v-tabs-items v-model="tabSelected">
          <v-tab-item v-for="item in tabs" :key="item.name" :value="`${item.value}`">
            <notes :notes="filterNotes" :loading="loading" :toolbarActionsActive="false" />
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
export default {
  mixins: [sendRequest],

  watchQuery: ["noteName"],

  async asyncData({ store, params, query: { noteName = "created" } }) {
    let user = {};
    let notes = [];
    let filters = {};
    let isMyProfile = false;

    try {
      if (store.state.user.user.username === params.username) {
        user = store.state.user.user;
        isMyProfile = true;
      } else {
        const resUser = await store.dispatch("user/getOne", {
          pathParams: { username: params.username }
        });
        user = resUser.data;
      }

      const resUserNotes = await store.dispatch("user/getUserNotes", {
        pathParams: { _id: user._id },
        queryParams: { noteName }
      });
      notes = resUserNotes.data.array;
      filters.page = resUserNotes.data.nextPage;
    } catch (error) {
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        user,
        notes,
        filters,
        tabSelected: noteName,
        isMyProfile
      };
    }
  },

  data() {
    return {
      tabs: [
        {
          name: "creados",
          icon: "mdi-tools",
          value: "created"
        },
        {
          name: "favoritos",
          icon: "mdi-heart",
          value: "favorites"
        },
        {
          name: "guardados",
          icon: "turned_in",
          value: "saved"
        }
      ]
    };
  },

  computed: {
    ...mapState(["position"]),

    filterNotes() {
      return this.notes.map(({ note, createdAt, updatedAt }) => ({
        ...note,
        createdAt,
        updatedAt
      }));
    }
  },

  watch: {
    async "position.y"(newValue) {
      if (!this.filters.page) return;
      const fullHeight = newValue + this.$vuetify.breakpoint.height * 2;

      if (!(fullHeight >= document.body.clientHeight)) return;
      this.sendRequest(async () => {
        const {
          data: { array = [], nextPage = null },
          message
        } = await this.getUserNotes({
          queryParams: this.filters,
          pathParams: { _id: this.user._id }
        });
        this.notes = this.notes.concat(array);
        this.filters.page = nextPage;
      });
    }
  },

  methods: {
    ...mapActions("user", ["getUserNotes"])
  }
};
</script>
