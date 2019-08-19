<template>
  <v-form @submit.prevent="sendRequest(postResetPasswordAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>
      </v-card-text>
      <v-card-text v-if="user" class="py-0">
        <h1 class="font-weight-regular my-3 text-center">Recupera tu contraseña</h1>

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
      </v-card-text>

      <v-card-text v-else>El token para recuperar tu contraseña expiro</v-card-text>

      <v-card-actions v-if="user">
        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          depressed
          block
          color="primary"
        >
          Recuperar contraseña
          <span slot="loader" class="custom-loader">
            <v-icon light>cached</v-icon>
          </span>
        </v-btn>
      </v-card-actions>

      <v-card-actions v-else>
        <v-btn to="/auth/reset" color="primary">volver a recuperar mi contraseña</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import sendRequest from "@/mixins/sendRequest";
export default {
  mixins: [sendRequest],
  middleware: "isAuth",
  layout: "auth",

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