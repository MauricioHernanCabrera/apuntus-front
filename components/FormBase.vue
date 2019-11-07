<template>
  <v-dialog
    @input="$emit('cancel-form')"
    v-bind="bindDialog"
    transition="dialog-bottom-transition"
    persistent
    ref="formBase"
  >
    <v-slide-x-transition>
      <v-card text v-if="active">
        <v-form @submit.prevent="$emit('submit-form')">
          <v-toolbar dark color="primary" v-if="fullscreen" class="elevation-0">
            <v-btn icon dark @click="$emit('cancel-form')">
              <v-icon>close</v-icon>
            </v-btn>

            <v-toolbar-title class="ml-0" :class="{ 'subtitle-1': breakpoint.xs }">{{ title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-title v-else>
            <span class="headline text-truncate">{{ title }}</span>
          </v-card-title>

          <v-container>
            <slot />
          </v-container>

          <v-footer v-if="fullscreen" height="56px" app>
            <v-container fill-height class="pa-0">
              <v-layout align-center>
                <v-btn text :small="breakpoint.xs" @click="$emit('cancel-form')">Cerrar</v-btn>

                <v-spacer />

                <v-btn
                  :small="breakpoint.xs"
                  :disabled="disabled"
                  depressed
                  :loading="loading"
                  type="submit"
                  color="primary"
                >
                  {{ nameBtnSubmit }}
                  <span slot="loader" class="custom-loader">
                    <v-icon light>cached</v-icon>
                  </span>
                </v-btn>
              </v-layout>
            </v-container>
          </v-footer>

          <v-card-actions v-else>
            <v-btn text :small="breakpoint.xs" @click="$emit('cancel-form')">Cerrar</v-btn>

            <v-spacer></v-spacer>

            <v-btn
              :small="breakpoint.xs"
              :disabled="disabled"
              depressed
              type="submit"
              color="primary"
              :loading="loading"
            >
              {{ nameBtnSubmit }}
              <span slot="loader" class="custom-loader">
                <v-icon light>cached</v-icon>
              </span>
            </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-slide-x-transition>
  </v-dialog>
</template>

<script>
import basePropsForm from "@/mixins/basePropsForm";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
export default {
  mixins: [basePropsForm, hydratedVuetifyBreakpoints],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      required: true
    }
  },

  computed: {
    bindDialog() {
      const obj = {};
      if (!this.fullscreen) {
        obj["max-width"] = "400px";
      } else {
        obj.fullscreen = true;
      }
      obj.value = this.active;
      return obj;
    }
  }
};
</script>
