<template>
  <form-base
    :disabled="$v.$invalid || loading"
    :loading="loading"
    :nameBtnSubmit="nameBtnSubmit"
    :title="title"
    :active="active"
    :fullscreen="$vuetify.breakpoint.xs"
    @submit-form="submitForm"
    @cancel-form="$emit('cancel-form')"
  >
    <v-layout v-if="active" mx-0>
      <v-flex xs12>
        <v-autocomplete
          v-model="form.institution"
          label="Institución"
          autofocus
          placeholder="UNNE"
          :filter="(item, queryText) => filterAutocomplete(item, queryText, 'nameSort')"
          :items="institutions"
          :readonly="!!form.institution"
          :append-icon="form.institution? 'mdi-close' : 'mdi-menu-down'"
          item-text="name"
          no-data-text="No hay institución para seleccionar"
          item-value="_id"
          @click:append="form.institution = null"
        ></v-autocomplete>

        <v-expand-transition>
          <v-autocomplete
            v-if="form.institution"
            v-model="form.subject"
            :filter="(item, queryText) => filterAutocomplete(item, queryText, 'nameSort')"
            label="Materia"
            item-text="name"
            no-data-text="No hay materia para seleccionar"
            item-value="_id"
            placeholder="Algoritmo y Estructuras de Datos I"
            :items="subjects"
          ></v-autocomplete>
        </v-expand-transition>

        <v-autocomplete
          v-model="form.codeNote"
          label="Tipo de apunte"
          :filter="(item, queryText) => filterAutocomplete(item, queryText, 'name')"
          placeholder="Practico"
          item-text="name"
          item-value="_id"
          :items="codeNotes"
        ></v-autocomplete>

        <v-autocomplete
          v-model="form.codeYear"
          label="Año"
          :filter="(item, queryText) => filterAutocomplete(item, queryText, 'name')"
          placeholder="2018 / 2019"
          item-text="name"
          item-value="_id"
          :items="codeYears"
        ></v-autocomplete>
      </v-flex>
    </v-layout>
  </form-base>
</template>

<script>
import baseForm from "@/mixins/baseForm";
import { filterAutocomplete } from "@/helpers/removeAccent";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";

export default {
  mixins: [baseForm],
  validations: {
    form: {
      name: { required }
    }
  },

  data() {
    return {
      states: [
        "Alabama",
        "Alaska",
        "American Samoa",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "District of Columbia",
        "Federated States of Micronesia",
        "Florida",
        "Georgia",
        "Guam",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Marshall Islands",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Northern Mariana Islands",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Palau",
        "Pennsylvania",
        "Puerto Rico",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virgin Island",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ],

      codeNotes: [],
      codeYears: [],
      institutions: [],
      subjects: []
    };
  },

  async mounted() {
    const resInstitutions = await this["institutions/getAll"]();
    const resCodeYears = await this["codeYears/getAll"]();
    const resCodeNotes = await this["codeNotes/getAll"]();

    this.institutions = resInstitutions.data;
    this.codeNotes = resCodeNotes.data;
    this.codeYears = resCodeYears.data;
  },

  watch: {
    async "form.institution"(newValue) {
      if (!newValue) return;

      const resSubjects = await this["institutions/getSubjects"]({
        queryParams: {
          _id: newValue
        }
      });

      this.subjects = resSubjects.data;
    }
  },

  methods: {
    ...mapActions([
      "institutions/getAll",
      "institutions/getSubjects",
      "codeYears/getAll",
      "codeNotes/getAll"
    ]),
    filterAutocomplete
  }
};
</script>

<style scoped>
</style>