<script setup lang="ts">
import "@styles/views/Welcome.scss";
import Logo from "@components/Logo.vue";
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
        <p>Введите логин и пароль для продолжения <br /> (Тестовый логин: test, пароль: test)</p>

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
            rounded="lg"
            size="large"
            color="var(--color-btn-background-secondary)"
            class="text-none text-subtitle-1 text-white button font-weight-bold"
            @click="submitForm"
            variant="flat">Войти в аккаунт</v-btn>
      </v-form>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
export default {
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
    submitForm () {
      if (this.isValid) {
        this.$router.push({ name: 'Home' });
      }
    },
  },
}
</script>