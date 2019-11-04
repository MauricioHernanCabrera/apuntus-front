<template>
  <v-form @submit.prevent="sendRequest(registerAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1 class="font-weight-regular my-3 text-center">Registrate con tu email</h1>

        <v-text-field
          v-model="form.username"
          prepend-icon="mdi-face"
          label="Nombre de usuario"
          name="username"
          type="text"
        ></v-text-field>

        <v-text-field
          v-model="form.email"
          prepend-icon="mdi-email-outline"
          label="Email"
          name="email"
          type="email"
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
      </v-card-text>

      <v-card-actions>
        <v-btn text to="/auth/login">Inicia sesión</v-btn>

        <v-spacer></v-spacer>

        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          depressed
          color="primary"
        >
          Registrarme
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
      email: { required },
      password: { required }
    }
  },

  head() {
    const page = {
      title: "Registrate en Apuntus",
      description: "Registrate con tu email en Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      form: {
        email: "",
        password: "",
        username: ""
      },
      showPassword: false
    };
  },

  methods: {
    ...mapActions("auth", ["register"]),

    registerAndReport() {
      this.showPassword = false;
      return this.register({ body: this.form });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
