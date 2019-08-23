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
    <v-layout v-if="active">
      <v-flex xs12>
        <v-text-field
          v-model="form.name"
          required
          label="Materia (*)"
          autofocus
          placeholder="Calculo"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </form-base>
</template>

<script>
import baseForm from "@/mixins/baseForm";
import { required } from "vuelidate/lib/validators";
export default {
  mixins: [baseForm],
  validations: {
    form: {
      name: { required }
    }
  }
};
</script>

<style scoped>
</style>