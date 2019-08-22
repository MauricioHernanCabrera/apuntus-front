<template>
  <v-container>
    <v-layout row wrap mx-0>
      <core-toolbar title="Inicio">
        <v-spacer></v-spacer>

        <v-slide-x-transition>
          <v-text-field
            autofocus
            v-if="searchActive"
            solo-inverted
            color="primary"
            flat
            @blur="searchActive = false"
            hide-details
            label="Search"
            append-icon="search"
            @click:append
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
          data: {},
          nameBtnSubmit: 'Aplicar filtros',
          active: 'filter-notes'
        })"
        >
          <v-icon>mdi-filter-outline</v-icon>
        </v-btn>
      </core-toolbar>

      <!-- <v-expand-transition>
        <v-flex xs12 v-if="filterActive" mb-5>
          <v-card flat color="transparent">
            <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni officiis nobis sequi obcaecati ut laborum eveniet corrupti, veritatis modi amet quam voluptatem dignissimos dolore, perspiciatis culpa ullam quaerat optio ex?</v-card-text>
          </v-card>
        </v-flex>
      </v-expand-transition>-->

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
    let page = null;
    try {
      const resNotes = await store.dispatch("notes/getAll");
      notes = resNotes.data.array;
      page = resNotes.data.nextPage;
    } catch (error) {
      console.log(error);
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        notes,
        page
      };
    }
  },

  data() {
    return {
      searchActive: false,
      filterActive: false
    };
  },

  computed: {
    ...mapState(["position"])
  },

  methods: {
    ...mapActions("notes", ["getAll"]),

    filterNotes() {
      console.log("Filtrar");
    }
  },

  watch: {
    async "position.y"(newValue) {
      if (!this.page) return;
      const fullHeight = newValue + this.$vuetify.breakpoint.height * 2;

      if (!(fullHeight >= document.body.clientHeight)) return;
      this.sendRequest(async () => {
        const {
          data: { array = [], nextPage = null },
          message
        } = await this.getAll({ queryParams: { page: this.page } });
        this.notes = this.notes.concat(array);
        this.page = nextPage;
      });
    }
  }
};
</script>

