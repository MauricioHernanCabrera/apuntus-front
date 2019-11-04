<template>
  <v-card flat v-if="files.length">
    <v-list class="pb-0" subheader>
      <v-subheader class="d-flex flex-wrap">
        <span>{{ files.length }} Archivo(s)</span>

        <v-spacer />

        <v-btn
          color="primary"
          small
          :href="`https://drive.google.com/drive/u/0/folders/${note.googleFolderId}`"
          target="_blank"
        >Abrir carpeta</v-btn>
      </v-subheader>

      <v-list-item v-for="item in files" :key="item.id" :href="item.webViewLink" target="_blank">
        <v-list-item-avatar class="mr-2 my-0">
          <v-img v-if="item.icon" :src="`/icons/${item.icon}`" alt="file" width="24px" />
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title v-html="item.name"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="!$vuetify.breakpoint.xs">
          <v-btn text small color="grey lighten-1" depressed>
            <span>abrir archivo</span>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>

    <v-divider />

    <v-card-text class="text-center">
      <v-progress-circular v-if="loading" :size="50" color="primary" indeterminate></v-progress-circular>
      <span v-else>No hay más archivos</span>
    </v-card-text>
  </v-card>

  <v-card flat v-else>
    <v-card-text class="text-center">
      <span>No hay archivos cargados</span>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    files: {
      type: Array,
      required: true
    },

    note: {
      type: Object,
      required: true
    },

    loading: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
