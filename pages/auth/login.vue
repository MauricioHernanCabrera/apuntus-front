<template>
  <v-form @submit.prevent="sendRequest(loginAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1 class="font-weight-regular my-3 text-center">Inicia sesión con tu username</h1>

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
      </v-card-text>

      <v-card-actions>
        <v-btn text to="/auth/register">registrate</v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          depressed
          color="primary"
        >
          Iniciar sesión
          <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
import { configMeta } from "@/helpers/seo";

export default {
  mixins: [sendRequest],
  middleware: "isAuth",
  layout: "auth",

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
        username: "holas6",
        password: "123456789"
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
