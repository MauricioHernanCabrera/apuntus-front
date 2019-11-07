<template>
  <card-auth
    :title="user? 'Recupera tu contraseña' : 'El token para recuperar tu contraseña expiro'"
    @submit="sendRequest(postResetPasswordAndReport)"
  >
    <template v-if="user">
      <v-text-field
        :value="user.email"
        disabled
        prepend-icon="mdi-email-outline"
        label="Email"
        name="email"
        type="text"
      ></v-text-field>

      <v-text-field
        v-model="form.password"
        prepend-icon="mdi-key-outline"
        :append-icon="!showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
        :type="showPassword ? 'text' : 'password'"
        name="password"
        label="Nueva contraseña"
        @click:append="showPassword = !showPassword"
      ></v-text-field>
    </template>

    <template slot="actions" v-if="user">
      <v-btn
        :disabled="$v.$invalid || loading"
        :loading="loading"
        type="submit"
        depressed
        block
        :small="breakpoint.xs"
        color="primary"
      >
        Recuperar contraseña
        <span slot="loader" class="custom-loader">
          <v-icon light>cached</v-icon>
        </span>
      </v-btn>
    </template>

    <template slot="actions">
      <v-btn
        to="/auth/reset"
        color="primary"
        block
        :small="breakpoint.xs"
      >volver a recuperar mi contraseña</v-btn>
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
      password: { required }
    }
  },

  async asyncData({ store, params }) {
    let user = null;

    try {
      const res = await store.dispatch("auth/getResetPassword", {
        queryParams: {
          _id: params.id
        }
      });
      user = res.data;
    } catch (error) {
      store.dispatch("notification/handleError", error);
    } finally {
      return {
        user
      };
    }
  },

  head() {
    const page = {
      title: "Reinicia tu contraseña de Apuntus",
      description: "Reinicia tu contraseña con tu email en Apuntus"
    };

    return {
      title: page.title,
      meta: configMeta(page)
    };
  },

  data() {
    return {
      form: {
        password: ""
      },
      showPassword: false
    };
  },

  methods: {
    ...mapActions("auth", ["postResetPassword"]),

    postResetPasswordAndReport() {
      this.showPassword = false;
      return this.postResetPassword({
        body: {
          password: this.form.password,
          username: this.user.username
        },
        queryParams: {
          _id: this.$route.params.id
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
