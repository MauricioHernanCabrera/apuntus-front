<template>
  <v-dialog
    @input="$emit('cancel-form')"
    :value="active"
    transition="dialog-bottom-transition"
    persistent
    ref="formBase"
    :max-width="fullscreen ? '100%' : '400px'"
    :fullscreen="fullscreen"
  >
    <v-card text>
      <v-form @submit.prevent="$emit('submit-form')">
        <v-toolbar dark color="primary" v-if="fullscreen" class="elevation-0">
          <v-btn icon dark @click="$emit('cancel-form')">
            <v-icon>close</v-icon>
          </v-btn>

          <v-toolbar-title class="ml-0">{{ title }}</v-toolbar-title>
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
              <v-btn text @click="$emit('cancel-form')">Close</v-btn>

              <v-spacer />

              <v-btn
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
          <v-btn text @click="$emit('cancel-form')">Close</v-btn>
          <v-spacer></v-spacer>

          <v-btn :disabled="disabled" depressed type="submit" color="primary" :loading="loading">
            {{ nameBtnSubmit }}
            <span slot="loader" class="custom-loader">
              <v-icon light>cached</v-icon>
            </span>
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script>
import basePropsForm from "@/mixins/basePropsForm";
export default {
  mixins: [basePropsForm],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    fullscreen: {
      type: Boolean,
      required: true
    }
  }
};
</script>