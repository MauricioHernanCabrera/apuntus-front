<template>
  <core-app>
    <v-content>
      <v-container fluid fill-height :pa-0="!$vuetify.breakpoint.smAndUp">
        <v-layout :align-center="$vuetify.breakpoint.smAndUp" justify-center>
          <nuxt />
        </v-layout>
      </v-container>
    </v-content>
  </core-app>
</template>
