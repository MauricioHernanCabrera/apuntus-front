<template>
  <v-container fill-height>
    <core-toolbar title="Conoce al equipo"></core-toolbar>

    <v-layout row wrap mx-0 justify-center align-center>
      <v-flex xs12 md6>
        <v-layout row wrap justify-space-around align-center>
          <v-flex v-for="item in members" :key="item.fullName" xs12 sm6 md3>
            <a
              class="d-block text-center black--text"
              :href="item.website"
              target="_blank"
              style="text-decoration: none;"
            >
              <v-avatar width="164px" height="164px" class="elevation-12" style="overflow: hidden;">
                <v-hover v-slot:default="{ hover }">
                  <v-img aspect-ratio="1" :src="item.photo">
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex flex-column transition-fast-in-fast-out secondary v-card--reveal title font-weight-bold white--text"
                        style="height: 100%;"
                      >
                        <p>{{ item.position }}</p>
                        <v-btn color="transparent" icon target="_blank">
                          <v-icon color="white" large>mdi-link</v-icon>
                        </v-btn>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-hover>
              </v-avatar>

              <p class="subtitle mt-2">{{ item.fullName }}</p>
            </a>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CoreToolbar from "@/components/CoreToolbar";
import { configMeta } from "@/helpers/seo";

export default {
  name: "Home",

  components: { CoreToolbar },

  head() {
    const page = {
      title: "Conoce al equipo - Apuntus"
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
          fullName: "Hernan Cabrera",
          photo: "/images/hernan.jpg",
          website: "https://mauriciohernancabrera.github.io",
          position: "CEO"
        },
        {
          fullName: "Esdras Pavon",
          photo: "/images/esdras.jpg",
          website: "https://esdraspavon.com",
          position: "CTO"
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

