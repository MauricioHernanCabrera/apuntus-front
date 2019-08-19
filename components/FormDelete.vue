<template>
  <form-base
    :disabled="loading"
    :loading="loading"
    :nameBtnSubmit="nameBtnSubmit"
    :title="title"
    :active="active"
    :fullscreen="false"
    @submit-form="submitForm"
    @cancel-form="$emit('cancel-form')"
  >
    <v-layout v-if="active">
      <v-flex xs12>
        <v-text-field
          v-model="data.name"
          required
          label="Name (*)"
          autofocus
          readonly
          placeholder="Us only"
        ></v-text-field>
      </v-flex>
    </v-layout>
  </form-base>
</template>

<script>
import baseForm from "@/mixins/baseForm";
export default {
  mixins: [baseForm],
  methods: {
    async submitForm() {
      await this.$emit("submit-form", this.data);
      this.$emit("cancel-form");
    }
  }
};
</script>

<style lang="scss" scoped>
</style>