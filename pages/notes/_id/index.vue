<template>
  <v-container>
    <core-toolbar :title="`Apunte de ${note.owner.username}`"></core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <card-note :note="note"></card-note>
      </v-flex>

      <v-flex xs12>
        <v-card flat v-if="data.files.length">
          <v-list subheader class="pb-0">
            <v-subheader>
              Archivos
              <v-spacer />
              <v-btn
                color="primary"
                small
                :href="`https://drive.google.com/drive/u/0/folders/${note.googleFolderId}`"
                target="_blank"
              >Abrir carpeta</v-btn>
            </v-subheader>

            <v-list-item
              v-for="item in data.files"
              :key="item.id"
              :href="item.webViewLink"
              target="_blank"
            >
              <v-list-item-avatar>
                <img v-if="item.icon" :src="`/icons/${item.icon}`" alt="file" width="24" />
              </v-list-item-avatar>
              <!-- <v-list-item-action>
              </v-list-item-action>-->

              <v-list-item-content>
                <v-list-item-title v-html="item.name"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-btn text small color="grey lighten-1">
                  <span>ver archivo</span>
                  <!-- <v-icon class="ml-2">mdi-eye-outline</v-icon> -->
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
          <v-divider />

          <v-card-text class="text-center">
            <v-progress-circular v-if="loading" :size="50" color="primary" indeterminate></v-progress-circular>
            <span v-else>No hay mas archivos</span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sendRequest from "@/mixins/sendRequest";
import handleForm from "@/mixins/handleForm";
import { mapActions, mapState } from "vuex";
import { getIconForFile } from "vscode-icons-js";

export default {
  mixins: [sendRequest, handleForm],

  async asyncData({ store, params: { id: _id }, router }) {
    let note = {};
    let data = {
      files: []
    };

    let filters = {
      pageSize: 32
    };

    try {
      const [resNote, resFiles] = await Promise.all([
        store.dispatch("notes/getOne", {
          pathParams: { _id }
        }),
        store.dispatch("notes/files/getAll", {
          pathParams: { _id },
          queryParams: filters
        })
      ]);

      note = resNote.data;
      data = {
        ...resFiles.data,
        files: resFiles.data.files.map(item => ({
          ...item,
          icon: getIconForFile(item.name)
        }))
      };

      const { nextPageToken = null } = resFiles.data;

      filters.pageToken = nextPageToken;
    } catch (error) {
      store.dispatch("notification/handleError", error);
      router.push("/");
    } finally {
      return {
        note,
        data,
        filters
      };
    }
  },

  watch: {
    async "position.y"(newValue) {
      if (!this.filters.pageToken) return;

      const fullHeight = newValue + this.$vuetify.breakpoint.height * 2;
      if (!(fullHeight >= document.body.clientHeight)) return;

      this.sendRequest(async () => {
        const { data, message } = await this["notes/files/getAll"]({
          pathParams: { _id: this.note._id },
          queryParams: this.filters
        });

        this.data = {
          ...data,
          files: data.files.map(item => ({
            ...item,
            icon: getIconForFile(item.name)
          }))
        };

        const { nextPageToken = null } = data;
        this.filters.pageToken = nextPageToken;
      });
    }
  },

  computed: {
    ...mapState(["position"])
  },

  methods: {
    ...mapActions(["notes/files/getAll"])
  }
};
</script>
