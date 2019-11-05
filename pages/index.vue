<template>
  <v-container :class="[breakpoint.mdAndUp? 'pa-4' : 'pa-0']">
    <core-toolbar :title="`${data.total} apunte(s)`">
      <v-spacer></v-spacer>

      <v-slide-x-transition>
        <v-text-field
          autofocus
          v-if="searchActive"
          solo-inverted
          color="primary"
          flat
          v-model="filters.search"
          @blur="searchActive = false"
          hide-details
          label="Buscar por titulo"
          append-icon="search"
          @click:append="searchNotes"
          @keyup.enter="searchNotes"
        ></v-text-field>
      </v-slide-x-transition>

      <v-scale-transition>
        <v-btn v-if="!searchActive" icon @click="searchActive = true">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </v-scale-transition>

      <v-btn
        icon
        @click="setDialog({
          title: 'Filtros',
          data: filters,
          nameBtnSubmit: 'Filtrar',
          active: 'filter-notes'
        })"
      >
        <v-icon>mdi-filter-outline</v-icon>
      </v-btn>
    </core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <notes :notes="data.array" onlyLike :loading="loading" @filter="filterNotes" />
      </v-flex>

      <form-filter
        :data="dialog.data"
        :active="dialog.active == 'filter-notes'"
        :title="dialog.title"
        :loading="loading"
        :nameBtnSubmit="dialog.nameBtnSubmit"
        @cancel-form="cancelDialog"
        @submit-form="filterNotes"
      />
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import handleForm from "@/mixins/handleForm";
import CoreToolbar from "@/components/CoreToolbar";
import FormFilter from "@/components/FormFilter";
import Notes from "@/components/Notes";
import { configMeta } from "@/helpers/seo";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
export default {
  name: "Home",

  mixins: [sendRequest, handleForm, hydratedVuetifyBreakpoints],

  components: { CoreToolbar, FormFilter, Notes },

  head() {
    const page = {
      title: "Inicio - Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  async asyncData({ store }) {
    let data = {
      array: [],
      total: 0
    };
    let filters = {};

    try {
      const resNotes = await store.dispatch("notes/getAll", {
        queryParams: { page: 0 }
      });
      data = resNotes.data;

      const { nextPage = null } = data;
      filters.page = nextPage;
    } catch (error) {
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        data,
        filters
      };
    }
  },

  data() {
    return {
      searchActive: false,
      filterActive: false,

      filters: {}
    };
  },

  computed: {
    ...mapState(["position"])
  },

  methods: {
    ...mapActions("notes", ["getAll"]),

    filterNotes(filters) {
      this.filters = { ...this.filters, ...filters, page: 0, search: "" };

      this.sendRequest(async () => {
        const { data, message } = await this.getAll({
          queryParams: this.filters
        });

        this.data = data;
        const { nextPage = null } = data;
        this.filters.page = nextPage;
      });
    },

    searchNotes() {
      this.filters.page = 0;

      this.sendRequest(async () => {
        const { data, message } = await this.getAll({
          queryParams: this.filters
        });

        this.data = data;
        const { nextPage = null } = data;
        this.filters.page = nextPage;
      });
    }
  },

  watch: {
    async "position.y"(newValue) {
      if (!this.filters.page) return;
      const fullHeight = newValue + this.breakpoint.height * 2;

      if (!(fullHeight >= document.body.clientHeight)) return;
      this.sendRequest(async () => {
        const { data, message } = await this.getAll({
          queryParams: this.filters
        });

        this.data = {
          ...data,
          array: this.data.array.concat(data.array)
        };

        const { nextPage = null } = data;
        this.filters.page = nextPage;
      });
    }
  }
};
</script>

