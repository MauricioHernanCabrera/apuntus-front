<template>
  <v-container grid-list-md fill-height>
    <core-toolbar title="Nuevo apunte">
      <v-spacer></v-spacer>

      <v-btn
        :disabled="$v.$invalid || loading"
        depressed
        @click="createNote"
        color="white"
        rounded
        outlined
        :loading="loading"
        v-if="!$vuetify.breakpoint.mdAndDown"
      >
        <v-icon light>add</v-icon>Crear
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
    </core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <v-form @submit.prevent="createNote">
          <v-layout row wrap mx-0>
            <v-flex xs12>
              <v-text-field v-model="form.title" placeholder="Mi apunte" label="Titulo (*)"></v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-textarea
                v-model="form.description"
                placeholder="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Est aspernatur, quasi accusamus libero excepturi porro similique doloremque, assumenda consequuntur rerum ipsum architecto nulla, quo earum deleniti itaque eveniet delectus molestiae?"
                label="Descripción"
              ></v-textarea>
            </v-flex>

            <v-flex xs12 md6>
              <v-autocomplete
                v-model="form.institution"
                label="Institución (*)"
                autofocus
                placeholder="UNNE"
                :filter="(item, queryText) => filterAutocomplete(item, queryText, 'nameSort')"
                :items="institutions"
                :readonly="!!form.institution"
                :append-icon="form.institution? 'mdi-close' : 'mdi-menu-down'"
                item-text="name"
                no-data-text="No hay institución para seleccionar"
                item-value="_id"
                @click:append="() => {
                  form.institution = null
                  form.subject = null
                }"
              >
                <v-card
                  slot="append-item"
                  color="primary"
                  style="cursor: pointer;"
                  @click="setDialog({
                    title: 'Nueva institución',
                    data: {},
                    nameBtnSubmit: 'Crear',
                    active: 'create-institution'
                  })"
                >
                  <v-card-text class="py-2">
                    <span class="subheading d-inline-block">¿No encontraste tu institución?</span>
                    <span
                      class="subheading py-1 d-inline-block white--text"
                    >¡Click aca para agregarla!</span>
                  </v-card-text>
                </v-card>
              </v-autocomplete>
            </v-flex>

            <v-expand-transition>
              <v-flex xs12 md6>
                <v-autocomplete
                  v-show="form.institution"
                  v-model="form.subject"
                  :filter="(item, queryText) => filterAutocomplete(item, queryText, 'nameSort')"
                  label="Materia (*)"
                  item-text="name"
                  no-data-text="No hay materia para seleccionar"
                  item-value="_id"
                  placeholder="Algoritmo y Estructuras de Datos I"
                  :items="subjects"
                  :readonly="!!form.subject"
                  :append-icon="form.subject? 'mdi-close' : 'mdi-menu-down'"
                  @click:append="() => {
                    form.subject = null
                  }"
                >
                  <v-card
                    slot="append-item"
                    color="primary"
                    style="cursor: pointer;"
                    @click="setDialog({
                      title: 'Nueva materia',
                      data: {},
                      nameBtnSubmit: 'Crear',
                      active: 'create-subject'
                    })"
                  >
                    <v-card-text class="py-2">
                      <span class="subheading d-inline-block">¿No encontraste tu materia?</span>
                      <span
                        class="subheading py-1 d-inline-block white--text"
                      >¡Click aca para agregarla!</span>
                    </v-card-text>
                  </v-card>
                </v-autocomplete>
              </v-flex>
            </v-expand-transition>

            <v-flex xs12 md6>
              <v-autocomplete
                v-model="form.codeNote"
                label="Tipo de apunte (*)"
                :filter="(item, queryText) => filterAutocomplete(item, queryText, 'name')"
                placeholder="Practico"
                item-text="name"
                item-value="_id"
                :items="codeNotes"
                :readonly="!!form.codeNote"
                :append-icon="form.codeNote? 'mdi-close' : 'mdi-menu-down'"
                @click:append="form.codeNote = null"
              ></v-autocomplete>
            </v-flex>

            <v-flex xs12 md6>
              <v-autocomplete
                v-model="form.codeYear"
                label="Año academico (*)"
                :filter="(item, queryText) => filterAutocomplete(item, queryText, 'name')"
                placeholder="2018 / 2019"
                item-text="name"
                item-value="_id"
                :items="codeYears"
                :readonly="!!form.codeYear"
                :append-icon="form.codeYear? 'mdi-close' : 'mdi-menu-down'"
                @click:append="form.codeYear = null"
              ></v-autocomplete>
            </v-flex>

            <v-flex xs12>
              <label
                class="v-label v-label--active theme--light"
                style="font-size: 14px;"
              >Archivos (*)</label>

              <client-only>
                <file-pond
                  ref="pond"
                  @updatefiles="handleUpdateFiles"
                  label-idle="Arrastra tus archivos o clickea para agregarlos"
                  :allow-multiple="true"
                />
              </client-only>
            </v-flex>

            <v-flex xs12>
              <v-footer height="56px" app v-if="$vuetify.breakpoint.mdAndDown">
                <v-container fill-height class="pa-0">
                  <v-layout align-center>
                    <v-spacer />

                    <v-btn
                      :disabled="$v.$invalid || loading"
                      depressed
                      :loading="loading"
                      type="submit"
                      color="primary"
                      rounded
                    >
                      <v-icon light>add</v-icon>Crear
                      <span slot="loader" class="custom-loader">
                        <v-icon light>cached</v-icon>
                      </span>
                    </v-btn>
                  </v-layout>
                </v-container>
              </v-footer>
            </v-flex>
          </v-layout>
        </v-form>
      </v-flex>
    </v-layout>

    <form-institution
      :data="dialog.data"
      :active="dialog.active == 'create-institution'"
      :title="dialog.title"
      :loading="loading"
      :nameBtnSubmit="dialog.nameBtnSubmit"
      @cancel-form="cancelDialog"
      @submit-form="createInstitution"
    />

    <form-subject
      :data="dialog.data"
      :active="dialog.active == 'create-subject'"
      :title="dialog.title"
      :loading="loading"
      :nameBtnSubmit="dialog.nameBtnSubmit"
      @cancel-form="cancelDialog"
      @submit-form="createSubject"
    />

    <!-- style="z-index: 100;" -->
    <v-dialog v-if="countFilesUploaded >= 0" :value="true" persistent width="300">
      <v-card color="primary" dark class="text-xs-center">
        <v-card-text class="py-3">
          <p>Por favor espere a que termine de subir el apunte</p>

          <v-progress-linear :value="progressTotal" color="white" class="mb-0"></v-progress-linear>

          <p class="mb-0 mt-3 text-right">
            <span>{{ countFilesUploaded }} / {{ form.files.length }}</span>
          </p>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import { filterAutocomplete } from "@/helpers/removeAccent";
import deleteAutocompleteInput from "@/mixins/deleteAutocompleteInput";
import sendRequest from "@/mixins/sendRequest";
import handleForm from "@/mixins/handleForm";
import { required, minLength } from "vuelidate/lib/validators";
import CoreToolbar from "@/components/CoreToolbar";
import FormSubject from "@/components/FormSubject";
import FormInstitution from "@/components/FormInstitution";
import { configMeta } from "@/helpers/seo";

export default {
  mixins: [deleteAutocompleteInput, sendRequest, handleForm],

  middleware: "isNotAuth",

  components: { CoreToolbar, FormSubject, FormInstitution },

  validations: {
    form: {
      title: { required },
      institution: { required },
      subject: { required },
      codeNote: { required },
      codeYear: { required },
      files: { required }
      // files: { minLength: minLength(1), $each: true }
    }
  },

  head() {
    const page = {
      title: `Nuevo apunte - Apuntus`,
      description: "Crea un apunte en Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  async asyncData({ store }) {
    let institutions = [];
    let codeYears = [];
    let codeNotes = [];
    try {
      [
        { data: institutions },
        { data: codeYears },
        { data: codeNotes }
      ] = await Promise.all([
        store.dispatch("institutions/getAll"),
        store.dispatch("codeYears/getAll"),
        store.dispatch("codeNotes/getAll")
      ]);
    } catch (error) {
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        institutions,
        codeYears,
        codeNotes
      };
    }
  },

  data() {
    return {
      subjects: [],

      form: {
        title: "",
        description: "",
        institution: "",
        subject: "",
        codeNote: "",
        codeYear: ""
      },

      countFilesUploaded: -1,
      fileProgress: 0
    };
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
      "institutions/getSubjects",
      "institutions/createOne",
      "institutions/createSubject",
      "notification/setNotification",
      "notes/createOne",
      "notes/files/createOne"
    ]),

    filterAutocomplete,

    handleUpdateFiles(files) {
      const validFiles = [];
      const SIZE_LIMIT = 50;
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const mb = item.file.size / 1024 / 1000;
        console.log("mb", mb);
        if (mb <= SIZE_LIMIT) {
          console.log("Agregado!");
          validFiles.push(item.file);
        } else {
          item.abortLoad();
          this["notification/setNotification"]({
            color: "warning",
            duration: 5000,
            message: `No se pueden subir archivos mayores a ${SIZE_LIMIT}Mb`
          });
          console.log("Eliminado");
        }
      }

      this.form = {
        ...this.form,
        files: validFiles
      };
    },

    createInstitution({ newValue: body }) {
      this.sendRequest(async () => {
        const resInstitution = await this["institutions/createOne"]({
          body
        });
        this.institutions.push(resInstitution.data);
        this.form.institution = resInstitution.data._id;
        return resInstitution;
      });
    },

    createSubject({ newValue: body }) {
      this.sendRequest(async () => {
        const resSubject = await this["institutions/createSubject"]({
          body,
          pathParams: {
            _id: this.form.institution
          }
        });
        this.subjects.push(resSubject.data);
        this.form.subject = resSubject.data._id;
        return resSubject;
      });
    },

    createNote({}) {
      this.sendRequest(async () => {
        this.countFilesUploaded = 0;

        const { institution, files, ...body } = this.form;
        const { data, message } = await this["notes/createOne"]({
          body
        });

        for (let i = 0; i < files.length; i++) {
          try {
            await this["notes/files/createOne"]({
              body: { file: files[i] },
              pathParams: { _id: data._id }
              // config: {
              //   onUploadProgress: (event = {}) => {
              //     const { total = 1, loaded = 0 } = event;
              //     console.log({ total, loaded });
              //     this.fileProgress = this.calculatePercent({ total, loaded });
              //   }
              // }
            });
          } catch (error) {}
          this.countFilesUploaded = i + 1;
        }

        this.$router.push(`/notes/${data._id}`);
      });
    },

    pad2: number =>
      String(number).length == 1 ? `0${number}` : number.toFixed(2),

    calculatePercent(event) {
      try {
        return Math.round((event.loaded * 100) / event.total);
      } catch (error) {
        return 0;
      }
    }
  },

  computed: {
    progressTotal() {
      return this.pad2(
        (this.countFilesUploaded * 100) / this.form.files.length
      );
    }
  }
};
</script>
