<template>
  <v-container>
    <core-toolbar :title="user.username">
      <template v-slot:extension-2>
        <v-tabs v-model="tabSelected" centered slider-color="yellow" background-color="transparent">
          <v-tab v-for="item in tabs" :key="item.name" :href="`#${item.name}`">
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </template>
    </core-toolbar>

    <v-layout row wrap>
      <v-flex>
        <v-tabs-items v-model="tabSelected">
          <v-tab-item v-for="item in tabs" :key="item.name" :value="`${item.name}`">
            <notes :notes="filterNotes" :loading="loading" :toolbarActionsActive="false" />
          </v-tab-item>
        </v-tabs-items>
      </v-flex>
    </v-layout>
    <!-- <v-layout justify-center align-center text-center>
      <v-flex>
        <v-avatar size="256" class="my-3">
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-avatar>

        <h1 class="display-1 font-weight-bold">{{ user.username }}</h1>
      </v-flex>
    </v-layout>-->
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
export default {
  mixins: [sendRequest],

  async asyncData({ store, params }) {
    let user = {};
    let notes = [];
    let filters = {};

    try {
      if (store.state.user.user.username === params.username) {
        user = store.state.user.user;
      } else {
        const resUser = await store.dispatch("user/getOne", {
          pathParams: { username: params.username }
        });
        user = resUser.data;
      }

      console.log(user);

      const resUserNotes = await store.dispatch("user/getUserNotes", {
        pathParams: { _id: user._id }
      });
      console.log(resUserNotes);
      notes = resUserNotes.data.array;
      filters.page = resUserNotes.data.nextPage;
    } catch (error) {
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        user,
        notes,
        filters
      };
    }
  },

  data() {
    return {
      tabs: [
        {
          name: "creados",
          icon: "mdi-tools"
        },
        {
          name: "favoritos",
          icon: "mdi-heart"
        },
        {
          name: "guardados",
          icon: "turned_in"
        }
      ],
      tabSelected: "creados",
      text:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
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
    async tabSelected(newValue) {
      this.filters.page = 0;
      console.log(newValue);

      switch (newValue) {
        case "creados": {
          this.filters.noteName = "created";
          break;
        }
        case "favoritos": {
          this.filters.noteName = "favorites";
          break;
        }
        case "guardados": {
          this.filters.noteName = "saved";
          break;
        }
        default: {
          return;
        }
      }
      const fullHeight = newValue + this.$vuetify.breakpoint.height * 2;

      this.sendRequest(async () => {
        const {
          data: { array = [], nextPage = null },
          message
        } = await this.getUserNotes({
          queryParams: this.filters,
          pathParams: { _id: this.user._id }
        });
        this.notes = array;
        this.filters.page = nextPage;
      });
    },

    async "position.y"(newValue) {
      console.log(newValue);
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
