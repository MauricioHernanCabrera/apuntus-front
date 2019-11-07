<template>
  <div class="container-card-note">
    <v-card flat class="card-note" :class="[hasHover && 'card-note-hover']">
      <v-card
        :to="`/notes/${note._id}`"
        class="elevation-0"
        color="transparent"
        style="position: absolute; height: 100%; width: 100%; top: 0; left: 0;"
      />
      <v-card-text>
        <h3
          style="display: flex;"
          class="font-weight-bold justify-space-between align-center"
          :class="[breakpoint.xs? 'subtitle-2' : 'subtitle-1']"
        >
          <span class="text-truncate">{{ note.title }}</span>
          <time class="caption grey--text">{{ note.createdAt | formatTimeAgo }}</time>
        </h3>

        <v-breadcrumbs class="pa-0" :items="breadCrumbs(note)" divider="/">
          <template v-slot:item="{ item }">
            <v-breadcrumbs-item
              style="color: rgba(0, 0, 0, 0.38); z-index: 2;"
              :class="[breakpoint.xs? 'caption' : 'body-2']"
              @click="$emit('filter', item.institution? {
                institution: note.subject.institution._id
              } :
              {
                institution: note.subject.institution._id,
                subject: note.subject._id
              })"
            >{{ item.text }}</v-breadcrumbs-item>
          </template>
        </v-breadcrumbs>

        <p class="mb-1" :class="[breakpoint.xs? 'caption' : 'body-2']">{{ note.description }}</p>

        <v-layout align-center row wrap mx-0>
          <v-flex>
            <v-chip small :to="`/users/${note.owner.username}`">
              <v-icon small left class="hidden-xs-only">face</v-icon>
              {{ note.owner.username }}
            </v-chip>

            <v-chip small color="accent" @click="$emit('filter', { codeNote: note.codeNote._id })">
              <v-icon small left class="hidden-xs-only">mdi-note-text</v-icon>
              {{ note.codeNote.name }}
            </v-chip>

            <v-chip
              small
              :color="colorCodeYear(note.codeYear.name)"
              @click="$emit('filter', { codeYear: note.codeYear._id })"
            >
              <v-icon small left class="hidden-xs-only">mdi-timer</v-icon>
              {{ note.codeYear.name }}
            </v-chip>
          </v-flex>

          <v-spacer></v-spacer>

          <v-flex v-if="toolbarActionsActive">
            <div class="d-flex align-start justify-end">
              <btn-share v-if="!onlyLike" :url="`${FRONT_URL}/notes/${note._id}`" />

              <div
                v-if="!onlyLike"
                class="d-flex justify-center align-center"
                style="flex-direction: column;"
              >
                <v-btn icon class="ma-0" v-if="note.isSaved" @click="toggleSaved">
                  <v-icon color="#707070">turned_in</v-icon>
                </v-btn>

                <v-btn icon class="ma-0" v-else @click="toggleSaved">
                  <v-icon color="#707070">turned_in_not</v-icon>
                </v-btn>
              </div>

              <div
                class="d-flex justify-center align-center"
                style="flex-direction: row; position: relative;"
              >
                <transition
                  :enter-active-class="`animated ${note.isFavorite ? 'rubberBand' : 'fadeIn'} p-absolute`"
                  :leave-active-class="`animated ${note.isFavorite ? 'fadeOut' : 'zoomOut'}`"
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
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
import BtnShare from "@/components/BtnShare";
import moment from "moment";
moment.locale("es");

export default {
  mixins: [sendRequest, hydratedVuetifyBreakpoints],

  components: { BtnShare },

  props: {
    note: {
      type: Object,
      required: true
    },

    toolbarActionsActive: {
      type: Boolean,
      default: true
    },

    hasHover: {
      type: Boolean,
      default: true
    },

    onlyLike: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      currentYear: new Date().getFullYear(),
      FRONT_URL: process.env.FRONT_URL
    };
  },

  methods: {
    ...mapActions("notes", [
      "addFavorite",
      "removeFavorite",
      "addSaved",
      "removeSaved"
    ]),

    breadCrumbs({ subject }) {
      const { name = "", _id = "", institution = {} } = subject;

      return [
        {
          institution: institution._id,
          text: institution.name,
          disabled: true,
          href: ""
        },
        { subject: _id, text: name, disabled: true, href: "" }
      ];
    },

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
          // return resFavorite;
        });
      } else {
        this.sendRequest(async () => {
          const resFavorite = await this.addFavorite({
            pathParams: { _id: this.note._id }
          });
          this.note.isFavorite = true;
          this.note.countFavorites++;
          // return resFavorite;
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
          // return resSaved;
        });
      } else {
        this.sendRequest(async () => {
          const resSaved = await this.addSaved({
            pathParams: { _id: this.note._id }
          });

          this.note.isSaved = true;
          // return resSaved;
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

<style scoped lang="scss">
.p-absolute {
  position: absolute;
  top: 0;
  left: 0;
}

// .container-card-note {
//   .card-note {
//     transition: 0.15s;
//     border: 1px solid transparent;
//     border-bottom: 1px solid #dcdcdc;

//     &-hover {
//       &:hover {
//         border-top-color: #dcdcdc;
//         border-bottom-color: transparent;
//         box-shadow: 0px 7.5px #dcdcdc;
//         transform: translate(0px, -7.5px);
//       }
//     }
//   }
// }
</style>
