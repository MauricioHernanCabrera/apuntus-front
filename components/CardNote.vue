<template>
  <v-flex xs12>
    <v-card flat>
      <nuxt-link
        :to="`/notes/${note._id}`"
        style="position: absolute; height: 100%; width: 100%; top: 0; left: 0;"
      />
      <v-card-text>
        <h3
          style="display: flex;"
          class="title font-weight-bold justify-space-between align-center"
        >
          <span class="text-truncate">{{ note.title }}</span>
          <time class="caption grey--text">{{ note.createdAt | formatTimeAgo }}</time>
        </h3>
        <v-breadcrumbs
          class="pa-0"
          :items="[
            { text: note.subject.institution.name, disabled: true, href: '' },
            { text: note.subject.name, disabled: true, href: '' }]"
          divider="/"
        />

        <p class="mb-0">{{ note.description }}</p>

        <v-layout align-center>
          <div>
            <v-chip :to="`/users/${note.owner.username}`">
              <v-icon left class="hidden-xs-only">face</v-icon>
              {{ note.owner.username }}
            </v-chip>

            <v-chip color="accent">
              <v-icon left class="hidden-xs-only">mdi-note-outline</v-icon>
              {{ note.codeNote.name }}
            </v-chip>

            <v-chip :color="colorCodeYear(note.codeYear.name)">
              <v-icon left class="hidden-xs-only">mdi-timer-sand-empty</v-icon>
              {{ note.codeYear.name }}
            </v-chip>
          </div>

          <v-spacer />

          <div class="d-flex align-start" v-if="toolbarActionsActive">
            <v-btn icon class="ma-0">
              <v-icon color="#707070">share</v-icon>
            </v-btn>

            <div class="d-flex justify-center align-center" style="flex-direction: column;">
              <v-btn icon class="ma-0" v-if="note.isSaved" @click="toggleSaved">
                <v-icon color="#707070">turned_in</v-icon>
              </v-btn>

              <v-btn icon class="ma-0" v-else @click="toggleSaved">
                <v-icon color="#707070">turned_in_not</v-icon>
              </v-btn>
            </div>

            <div
              class="d-flex justify-center align-center"
              style="flex-direction: column; position: relative;"
            >
              <transition
                :enter-active-class="`animated ${note.isFavorite? 'rubberBand' : 'fadeIn'} p-absolute`"
                :leave-active-class="`animated ${note.isFavorite? 'fadeOut' : 'zoomOut'}`"
              >
                <v-btn
                  v-if="note.isFavorite"
                  icon
                  class="ma-0"
                  @click="toggleFavorite"
                  key="favorite"
                >
                  <v-icon color="error">favorite</v-icon>
                </v-btn>

                <v-btn v-else icon class="ma-0" @click="toggleFavorite" key="not-favorite">
                  <v-icon color="#707070">favorite_border</v-icon>
                </v-btn>
              </transition>
              {{ note.countFavorites }}
            </div>
          </div>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-divider></v-divider>
  </v-flex>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import moment from "moment";
moment.locale("es");

export default {
  mixins: [sendRequest],

  props: {
    note: {
      type: Object,
      required: true
    },

    toolbarActionsActive: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      currentYear: new Date().getFullYear()
    };
  },

  methods: {
    ...mapActions("notes", [
      "addFavorite",
      "removeFavorite",
      "addSaved",
      "removeSaved"
    ]),

    colorCodeYear(name) {
      if (name == "viejisimo") return "error";
      const [initYear, finishYear] = name.split("/");

      if (finishYear >= this.currentYear - 5) {
        return "success";
      } else if (finishYear >= this.currentYear - 10) {
        return "warning";
      } else {
        return "error";
      }
    },

    toggleFavorite() {
      if (this.note.isFavorite) {
        this.sendRequest(async () => {
          const resFavorite = await this.removeFavorite({
            pathParams: { _id: this.note._id }
          });
          this.note.isFavorite = false;
          this.note.countFavorites--;
          return resFavorite;
        });
      } else {
        this.sendRequest(async () => {
          const resFavorite = await this.addFavorite({
            pathParams: { _id: this.note._id }
          });
          this.note.isFavorite = true;
          this.note.countFavorites++;
          return resFavorite;
        });
      }
    },

    toggleSaved() {
      if (this.note.isSaved) {
        this.sendRequest(async () => {
          const resSaved = await this.removeSaved({
            pathParams: { _id: this.note._id }
          });
          this.note.isSaved = false;
          return resSaved;
        });
      } else {
        this.sendRequest(async () => {
          const resSaved = await this.addSaved({
            pathParams: { _id: this.note._id }
          });
          this.note.isSaved = true;
          return resSaved;
        });
      }
    }
  },

  filters: {
    formatTimeAgo(time) {
      return moment(time)
        .startOf()
        .fromNow();
    }
  }
};
</script>

<style scoped>
.p-absolute {
  position: absolute;
  top: 0;
  left: 0;
}
</style>