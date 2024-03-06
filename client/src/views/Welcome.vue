<script setup lang="ts">
import "@styles/views/Welcome.scss";
import Logo from "@components/Logo.vue";
import {useRouter} from "vue-router";

if (localStorage.getItem('token')) {
  const route = useRouter();
  route.push({ name: 'Home' });
}
</script>

<template>
  <v-layout>
    <!-- Шапка страницы -->
    <v-app-bar
        color="var(--color-background-secondary)"
        :elevation="0">

      <!-- Логотип в заголовке -->
      <template v-slot:prepend>
        <Logo class="logo" />
      </template>
    </v-app-bar>

    <!-- Основное тело -->
    <v-main>
      <!-- Форма входа в аккаунт -->
      <v-form ref="form" class="auth-form" @submit="submitForm" @update:modelValue="validate">
        <h1>Добро пожаловать</h1>
        <p>Введите логин и пароль для продолжения <br /> (Тестовый логин: test, пароль: 12345678)</p>

        <!-- Форма входа -->
        <v-item-group class="form-group">
          <!-- Имя пользователя -->
          <div class="text-subtitle-1 text-medium-emphasis">Имя пользователя</div>
          <v-text-field
              v-model="fields.username"
              :rules="[validationRules.username]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Имя пользователя"
              variant="outlined"
              type="text" />

          <!-- Пароль -->
          <div class="text-subtitle-1 text-medium-emphasis">Пароль</div>
          <v-text-field
              v-model="fields.password"
              :rules="[validationRules.password]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Пароль"
              variant="outlined"
              type="password" />
        </v-item-group>

        <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            rounded="lg"
            size="large"
            color="var(--color-btn-background-secondary)"
            class="text-none text-subtitle-1 text-white button font-weight-bold"
            @click="submitForm"
            variant="flat">Войти в аккаунт</v-btn>
        <v-btn
            :disabled="isLoading"
            :loading="isLoading"
            rounded="lg"
            size="large"
            color="var(--color-btn-background-secondary)"
            class="text-none text-subtitle-1 font-weight-medium mt-2"
            @click="createTestAccount"
            variant="outlined">Создать тестовый аккаунт</v-btn>
      </v-form>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
// @ts-ignore
import {mapGetters} from "vuex";
import {AUTH_CREATE_TEST_USER, AUTH_LOGIN} from "@stores/actions/authActions.ts";

export default {
  computed: {
    ...mapGetters(["authStatus", "isAuthenticated"]),
    isLoading: function() {
      return this.authStatus === "loading";
    }
  },
  data() {
    return {
      isValid: false,
      fields: {
        username: '',
        password: '',
      },
      validationRules: {
        username: (value: string | undefined) => (value || '').match(/^[a-zA-Z.]+$/) || 'Неверное имя пользователя',
        password: (value: string | undefined) => (value || '').length > 7 || 'Неверный пароль',
      },
    }
  },
  /** Methods **/
  methods: {
    validate(value: boolean | null) {
      this.isValid = value!;
    },
    createTestAccount() {
      // @ts-ignore
      this.$store!.dispatch(AUTH_CREATE_TEST_USER).then(() => {
        this.$router.push("/home");
      });
    },
    submitForm () {
      if (this.isValid) {
        const { username, password } = this.fields;
        // @ts-ignore
        this.$store!.dispatch(AUTH_LOGIN, { username, password }).then(() => {
          this.$router.push("/home");
        });
      }
    },
  },
}
</script>