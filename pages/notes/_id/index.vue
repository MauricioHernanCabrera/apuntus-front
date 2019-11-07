<template>
  <v-container :class="[breakpoint.mdAndUp? 'pa-4' : 'pa-0']" v-if="Object.keys(note).length > 0">
    <core-toolbar :title="`Apunte de ${note && note.owner? note.owner.username : ''}`"></core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12 v-if="isNewNote">
        <v-alert
          type="warning"
          :class="[breakpoint.xs? 'subtitle-2' : 'subtitle-1', breakpoint.mdAndUp? 'mb-4' : 'mb-0']"
        >Se estan procesando los archivos de este apunte. Esto puede demorarse de 15 a 30 minutos</v-alert>
      </v-flex>

      <v-flex xs12>
        <card-note :note="note" :hasHover="false"></card-note>
      </v-flex>

      <v-flex xs12 v-if="!isNewNote">
        <card-files :files="files" :loading="loading" :note="note" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import sendRequest from "@/mixins/sendRequest";
import handleForm from "@/mixins/handleForm";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
import { mapActions, mapState } from "vuex";
import { getIconForFile } from "vscode-icons-js";
import CardFiles from "@/components/CardFiles";
import CoreToolbar from "@/components/CoreToolbar";
import CardNote from "@/components/CardNote";
import { configMeta } from "@/helpers/seo";
import moment from "moment";
moment.locale("es");

export default {
  mixins: [sendRequest, handleForm, hydratedVuetifyBreakpoints],

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
    let files = [];

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
      files = resFiles.data.map(item => ({ ...item, icon: getIconForFile(item.name) })) //prettier-ignore
    } catch (error) {
      store.dispatch("notification/handleError", error);
      redirect("/");
    } finally {
      return {
        note,
        files
      };
    }
  },

  computed: {
    ...mapState(["position"]),

    isNewNote() {
      const createdAt = moment(new Date(this.note.createdAt)).add(
        30,
        "minutes"
      );
      const current = moment(new Date());
      return createdAt.isAfter(current);
    }
  },

  methods: {
    ...mapActions(["notes/files/getAll"])
  }
};
</script>
