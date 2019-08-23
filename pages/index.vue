<template>
  <v-container>
    <v-layout row wrap mx-0>
      <core-toolbar :title="`Apuntes (${notes.length})`">
        <v-spacer></v-spacer>
        <!-- <v-btn @click="calculo">calculo</v-btn> -->

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
            label="Search"
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
          nameBtnSubmit: 'Aplicar filtros',
          active: 'filter-notes'
        })"
        >
          <v-icon>mdi-filter-outline</v-icon>
        </v-btn>
      </core-toolbar>

      <v-flex xs12>
        <notes :notes="notes" :loading="loading" />
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
export default {
  name: "Home",

  mixins: [sendRequest, handleForm],

  async asyncData({ store }) {
    let notes = [];
    let filters = {};
    try {
      const resNotes = await store.dispatch("notes/getAll", {
        queryParams: { page: 0 }
      });
      notes = resNotes.data.array;
      filters.page = resNotes.data.nextPage;
    } catch (error) {
      console.log(error);
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        notes,
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

    calculo() {
      const obj = {};
      this.notes.forEach(({ _id }) => {
        obj[_id] = 0;
      });
      console.log(obj);
      console.log(Object.keys(obj));
    },

    filterNotes(filters) {
      this.filters = {
        ...this.filters,
        ...filters,
        page: 0,
        search: ""
      };
      this.sendRequest(async () => {
        const {
          data: { array = [], nextPage = null },
          message
        } = await this.getAll({ queryParams: this.filters });
        this.notes = array;
        this.filters.page = nextPage;
      });
    },

    searchNotes() {
      this.filters.page = 0;
      this.sendRequest(async () => {
        const {
          data: { array = [], nextPage = null },
          message
        } = await this.getAll({ queryParams: this.filters });
        this.notes = array;
        this.filters.page = nextPage;
      });
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
        } = await this.getAll({ queryParams: this.filters });
        this.notes = this.notes.concat(array);
        this.filters.page = nextPage;
      });
    }
  }
};
</script>

