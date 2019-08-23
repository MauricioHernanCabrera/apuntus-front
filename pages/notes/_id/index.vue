<template>
  <v-container>
    <core-toolbar :title="`Apunte de: ${note.owner.username}`"></core-toolbar>

    <v-layout row wrap mx-0>
      <v-flex xs12>
        <card-note :note="note"></card-note>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  async asyncData({ store, params: { id: _id }, router }) {
    let note = {};

    try {
      const resNote = await store.dispatch("notes/getOne", {
        pathParams: { _id }
      });
      note = resNote.data;
    } catch (error) {
      store.dispatch("notification/handleError", error);
      router.push("/");
    } finally {
      return {
        note
      };
    }
  }
};
</script>
