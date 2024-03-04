<script setup lang="ts">
import "@styles/views/Welcome.scss"
import Logo from "@components/Logo.vue";
</script>

<template>
  <v-layout>
    <v-app-bar
        color="var(--color-background-secondary)"
        :elevation="0">
      <!-- Логотип в заголовке -->
      <template v-slot:prepend>
        <Logo class="logo" />
      </template>
    </v-app-bar>

    <v-main>
      <!-- Форма входа в аккаунт -->
      <v-form class="auth-form">
        <h1>Добро пожаловать</h1>
        <p>Введите логин и пароль для продолжения <br />(Тестовый логин: test, пароль: test)</p>

        <v-item-group class="form-group">
          <!-- Имя пользователя -->
          <v-text-field
              v-model="fields.username"
              :rules="[validationRules.username]"
              label="Имя пользователя"
              variant="outlined"
              type="text" />

          <!-- Пароль -->
          <v-text-field
              v-model="fields.password"
              :rules="[validationRules.password]"
              label="Пароль"
              variant="outlined"
              type="password" />
        </v-item-group>

        <v-btn
            color="var(--color-btn-background-secondary)"
            class="button"
            type="submit"
            variant="flat">Войти в аккаунт</v-btn>
      </v-form>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
export default {
  data() {
    return {
      fields: {
        username: '',
        password: '',
      },
      validationRules: {
        username: (value: string | undefined) => (value || '').match(/^[a-zA-Z.]+$/) || 'Неверное имя пользователя',
        password: (value: string | undefined) => (value || '').length > 7 || 'Неверный пароль',
      },
    }
  }
}
</script>