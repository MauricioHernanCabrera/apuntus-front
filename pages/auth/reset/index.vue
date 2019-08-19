<template>
  <v-form @submit.prevent="sendRequest(forgotAndReport)">
    <v-card text max-width="350px">
      <v-card-text>
        <div class="my-5 d-flex justify-center">
          <logo original size="64" />
        </div>

        <h1 class="font-weight-regular my-3 text-center">Recupera acceso a tu cuenta</h1>

        <v-text-field
          v-model="form.email"
          prepend-icon="mdi-email-outline"
          label="Email"
          name="email"
          type="text"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn
          :disabled="$v.$invalid || loading"
          :loading="loading"
          type="submit"
          block
          depressed
          color="primary"
        >
          Recuperar contraseña
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

export default {
  mixins: [sendRequest],
  middleware: "isAuth",
  layout: "auth",

  validations: {
    form: {
      email: { required }
    }
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