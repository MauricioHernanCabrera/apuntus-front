<template>
  <v-container>
    <core-toolbar title="Apoya a apuntus"></core-toolbar>

    <v-layout row wrap justify-center mx-0>
      <v-flex xs12>
        <p class="title font-weight-light">
          Apuntus es un proyecto web de libre uso. Es y siempre será de uso gratuito.
          Las contribuciones de donantes, patrocinadores, y patrocinadores
          especiales permiten el desarrollo de nuevas funcionalidades.
          Podes apoyar el proyecto convirtiendose en un patrocinador
        </p>
      </v-flex>

      <v-flex xs12>
        <v-select
          v-model="pay"
          :items="pays"
          label="Selecciona un monto para la donación"
          placeholder="$50"
          outlined
        ></v-select>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CoreToolbar from "@/components/CoreToolbar";
import { configMeta } from "@/helpers/seo";

export default {
  name: "Sponsor",

  components: { CoreToolbar },

  head() {
    const page = {
      title: "Apoya a Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      pays: [
        {
          text: "$500",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-918ec12e-ddab-4d0c-b1fd-d8dd58b26d35"
        },
        {
          text: "$250",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-343a4e5f-c0c4-4447-aba4-77436f942306"
        },
        {
          text: "$100",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-1deb2042-0f2d-4616-8961-7848f992b209"
        },
        {
          text: "$75",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-96013788-8c04-4537-a2ff-a2b96cf3d386"
        },
        {
          text: "$50",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-7da35bcb-fbfc-4d4a-a20f-0ad0a37661ef"
        },
        {
          text: "$25",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-b52db2f4-b7ff-45aa-b36f-b3a73ebc7557"
        },
        {
          text: "$20",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-ab3ec71a-3b1a-472d-9919-f0ba948eb059"
        },
        {
          text: "$15",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-eca48aef-a62d-483d-9865-d8c796ef8161"
        },
        {
          text: "$10",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-6ae6782c-8773-4a28-aaf7-8997efa0ef99"
        },
        {
          text: "$5",
          value:
            "https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=362512190-c83dbb6e-f040-4d39-b2e2-6937f9afa9bd"
        }
      ],

      pay: ""
    };
  },

  watch: {
    pay(newValue) {
      if (newValue.length >= 0) {
        window.location = newValue
      }
    }
  }
};
</script>

