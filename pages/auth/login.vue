<template>
  <card-auth title="Inicia sesión con tu usuario" @submit="sendRequest(loginAndReport)">
    <v-text-field
      v-model="form.username"
      prepend-icon="mdi-face"
      label="Nombre de usuario"
      name="username"
      type="text"
    ></v-text-field>

    <v-text-field
      v-model="form.password"
      prepend-icon="mdi-key-outline"
      :append-icon="!showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
      :type="showPassword ? 'text' : 'password'"
      name="password"
      label="Contraseña"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <v-layout>
      <v-spacer></v-spacer>
      <v-btn
        color="grey"
        text
        small
        class="subtitle-1 text-lowercase"
        to="/auth/reset"
      >¿Olvidaste tu contraseña?</v-btn>
    </v-layout>

    <template slot="actions">
      <v-btn :small="breakpoint.xs" text to="/auth/register">registrate</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="$v.$invalid || loading"
        :loading="loading"
        type="submit"
        depressed
        :small="breakpoint.xs"
        color="primary"
      >
        Iniciar sesión
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
import CardAuth from "@/components/CardAuth";
import { configMeta } from "@/helpers/seo";
import hydratedVuetifyBreakpoints from "@/mixins/hydratedVuetifyBreakpoints";

export default {
  mixins: [sendRequest, hydratedVuetifyBreakpoints],
  middleware: "isAuth",
  layout: "auth",
  components: {
    CardAuth
  },

  validations: {
    form: {
      username: { required },
      password: { required }
    }
  },

  head() {
    const page = {
      title: "Inicia sesión en Apuntus",
      description: "Inicia sesión con tu email en Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      form: {
        username: "",
        password: ""
      },
      showPassword: false
    };
  },

  methods: {
    ...mapActions("auth", ["login"]),

    loginAndReport() {
      this.showPassword = false;
      return this.login({ header: this.form });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
