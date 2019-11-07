<template>
  <card-auth title="Registrate con tu email" @submit="sendRequest(registerAndReport)">
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

    <template slot="actions">
      <v-btn text to="/auth/login" :small="breakpoint.xs">Inicia sesión</v-btn>

      <v-spacer></v-spacer>

      <v-btn
        :disabled="$v.$invalid || loading"
        :loading="loading"
        type="submit"
        depressed
        :small="breakpoint.xs"
        color="primary"
      >
        Registrarme
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
