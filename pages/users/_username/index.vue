<template>
  <v-container :class="[breakpoint.mdAndUp? 'pa-4' : 'pa-0']">
    <core-toolbar :title="isMyProfile? 'Mi perfil' : `Perfil de ${user.username}`">
      <template v-slot:extension-2>
        <v-tabs v-model="tabSelected" centered slider-color="yellow" background-color="transparent">
          <v-tab
            v-for="item in tabs"
            :key="item.name"
            :href="`#${item.value}`"
            @click="$router.push(`/users/${user.username}?noteName=${item.value}`)"
          >
            <v-icon :small="breakpoint.xs" class="mr-2">{{ item.icon }}</v-icon>
            <span :class="breakpoint.xs? 'caption' : 'subtitle-2'">{{ item.name }}</span>
          </v-tab>
        </v-tabs>
      </template>
    </core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <v-tabs-items v-model="tabSelected">
          <v-tab-item v-for="item in tabs" :key="item.name" :value="`${item.value}`">
            <notes :notes="data.array" :loading="loading" :toolbarActionsActive="false" />
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import CoreToolbar from "@/components/CoreToolbar";
import Notes from "@/components/Notes";
import { configMeta } from "@/helpers/seo";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";

export default {
  mixins: [sendRequest, hydratedVuetifyBreakpoints],

  components: { CoreToolbar, Notes },

  watchQuery: ["noteName"],

  head() {
    const { username } = this.user;
    const page = {
      title: `${username} - Apuntus`,
      description: `Mira los apuntes creados, guardados y favoritos de ${username} en Apuntus`
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  async asyncData({ store, params, query, redirect }) {
    let user = {};
    let data = {
      array: [],
      total: 0
    };
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

      const resUserNotes = await store.dispatch("user/getNoteList", {
        pathParams: { _id: user._id },
        queryParams: { noteName: query.noteName }
      });
      data = resUserNotes.data;
      filters.page = resUserNotes.data.nextPage;
      filters.noteName = query.noteName;
    } catch (error) {
      store.dispatch("notification/handleError", error);
      redirect("/");
    } finally {
      return {
        user,
        data,
        filters,
        tabSelected: query.noteName,
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
    ...mapState(["position"])
  },

  watch: {
    async "position.y"(newValue) {
      if (!this.filters.page) return;

      const fullHeight = newValue + this.breakpoint.height * 2;
      if (!(fullHeight >= document.body.clientHeight)) return;

      this.sendRequest(async () => {
        const { data, message } = await this.getNoteList({
          queryParams: this.filters,
          pathParams: { _id: this.user._id }
        });
        this.data = { ...data, array: this.data.array.concat(data.array) };
        const { nextPage = null } = data;
        this.filters.page = nextPage;
      });
    }
  },

  methods: {
    ...mapActions("user", ["getNoteList"])
  }
};
</script>
