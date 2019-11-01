<template>
  <v-container v-if="Object.keys(note).length > 0">
    <core-toolbar :title="`Apunte de ${note && note.owner? note.owner.username : ''}`"></core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <card-note :note="note" :hasHover="false"></card-note>
      </v-flex>

      <v-flex xs12>
        <card-files :files="data.files" :loading="loading" :note="note" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sendRequest from "@/mixins/sendRequest";
import handleForm from "@/mixins/handleForm";
import { mapActions, mapState } from "vuex";
import { getIconForFile } from "vscode-icons-js";
import CardFiles from "@/components/CardFiles";
import CoreToolbar from "@/components/CoreToolbar";
import CardNote from "@/components/CardNote";
import { configMeta } from "@/helpers/seo";

export default {
  mixins: [sendRequest, handleForm],

  components: { CardFiles, CoreToolbar, CardNote },

  head() {
    const page = {
      title: `${this.note.title} - Apuntus`,
      description: this.note.description
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  async asyncData({ store, params: { id: _id }, redirect }) {
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
      redirect("/");
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
          files: this.data.files.concat(
            data.files.map(item => ({
              ...item,
              icon: getIconForFile(item.name)
            }))
          )
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
