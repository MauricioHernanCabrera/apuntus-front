<template>
  <v-container :class="[breakpoint.mdAndUp ? 'pa-4' : 'pa-0']" grid-list-lg>
    <core-toolbar title="Conoce al equipo"></core-toolbar>

    <v-layout row wrap mx-0 justify-center align-center>
      <v-flex v-for="item in members" :key="item.fullName" xs12 sm6>
        <v-card
          class="elevation-0 ma-0 text-center"
          :href="item.website"
          target="_blank"
          style="text-decoration: none;"
        >
          <v-card-text class="d-flex justify-center">
            <v-avatar
              width="164px"
              height="164px"
              class="elevation-12"
              style="overflow: hidden;"
            >
              <v-img aspect-ratio="1" :src="item.photo" />
            </v-avatar>
          </v-card-text>

          <p class="subtitle mb-0">{{ item.fullName }}</p>
          <p class="caption pb-2 mb-0">{{ item.position }}</p>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import CoreToolbar from '@/components/CoreToolbar';
import { configMeta } from '@/helpers/seo';
import hydratedVuetifyBreakpoints from '@/mixins/hydratedVuetifyBreakpoints';
export default {
  name: 'Home',
  mixins: [hydratedVuetifyBreakpoints],
  components: { CoreToolbar },

  head() {
    const page = {
      title: 'Conoce al equipo - Apuntes'
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      members: [
        {
          fullName: 'Hernan Cabrera',
          photo: '/images/hernan.jpg',
          website: 'https://mauriciohernancabrera.github.io',
          position: 'CEO'
        },
        {
          fullName: 'Esdras Pavon',
          photo: '/images/esdras.jpg',
          website: 'https://esdraspavon.com',
          position: 'CTO'
        }
      ]
    };
  }
};
</script>

<style lang="scss">
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.9;
  position: absolute;
  width: 100%;
}
</style>
