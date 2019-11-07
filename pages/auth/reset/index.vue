<template>
  <card-auth title="Recupera acceso a tu cuenta" @submit="sendRequest(forgotAndReport)">
    <v-text-field
      v-model="form.email"
      prepend-icon="mdi-email-outline"
      label="Email"
      name="email"
      type="text"
    ></v-text-field>

    <template slot="actions">
      <v-spacer></v-spacer>

      <v-btn
        :disabled="$v.$invalid || loading"
        :loading="loading"
        type="submit"
        block
        :small="breakpoint.xs"
        depressed
        color="primary"
      >
        Recuperar contraseña
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
    </template>
  </card-auth>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import { configMeta } from "@/helpers/seo";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";
import CardAuth from "@/components/CardAuth";

export default {
  mixins: [sendRequest, hydratedVuetifyBreakpoints],
  middleware: "isAuth",
  layout: "auth",
  components: { CardAuth },
  validations: {
    form: {
      email: { required }
    }
  },

  head() {
    const page = {
      title: "Recupera tu contraseña de Apuntus",
      description: "Recupera tu contraseña con tu email en Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      form: {
        email: ""
      }
    };
  },

  methods: {
    ...mapActions("auth", ["forgot"]),

    forgotAndReport() {
      return this.forgot({ body: this.form });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
