<script setup lang="ts">
import "@styles/views/Home.scss";
import Logo from "@components/Logo.vue";
import {ArrowRight} from "lucide-vue-next";
import MovementItem from "@components/MovementItem.vue";
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
    <v-main class="main">
      <!-- Форма входа в аккаунт -->
      <v-form ref="form" class="input-form" @submit="submitForm" @update:modelValue="validate">
        <h2>Оформить перемещение</h2>

        <!-- Форма входа -->
        <v-item-group class="form-group">
          <!-- Имя пользователя -->
          <div class="text-subtitle-1 text-medium-emphasis">Инвентарный или серийный номер</div>
          <v-text-field
              v-model="fields.inv_number"
              :rules="[rules.required, rules.inv_number]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Инвентарный или серийный номер"
              variant="outlined"
              type="text" />

          <!-- Пароль -->
          <div class="text-subtitle-1 text-medium-emphasis">Что перемещается?</div>
          <v-text-field
              v-model="fields.to"
              :rules="[rules.required, rules.item_name]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Например: принтер, моноблок и т.д."
              variant="outlined"
              type="text" />

          <!-- Откуда переместить -->
          <div class="text-subtitle-1 text-medium-emphasis">Откуда перемещается?</div>
          <v-text-field
              v-model="fields.from"
              :rules="[rules.required, rules.destination]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Например: 1К-127 (1 корпус, 127 каб.)"
              variant="outlined"
              type="text" />

          <!-- Куда переместить -->
          <div class="text-subtitle-1 text-medium-emphasis">Куда перемещается?</div>
          <v-text-field
              v-model="fields.to"
              :rules="[rules.required, rules.destination]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Например: 1К-ЦИТ (1 корпус, ЦИТ)"
              variant="outlined"
              type="text" />
        </v-item-group>

        <v-btn
            rounded="lg"
            size="large"
            color="var(--color-btn-background-secondary)"
            class="text-none text-subtitle-1 text-white button font-weight-bold"
            :append-icon="ArrowRight"
            @click="submitForm"
            variant="flat">Переместить</v-btn>
      </v-form>

      <!-- Список перемещений -->
      <v-infinite-scroll class="list" height="calc(100vh - 24px - 4rem)" :items="items" :onLoad="load">
        <!-- TODO: REPLACE WITH REAL DATA -->
        <MovementItem v-for="(item, index) in items" :key="index" :data="item" />
      </v-infinite-scroll>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
const createMovement = () : {
  inv_number: string,
  item: string,
  to: string,
  from: string,
  worker: string,
  at: string,
}[] => {
  return {
    inv_number: '04003081',
    item: 'Принтер',
    to: '1К-ЦИТ',
    from: '1К-127',
    worker: 'kirill.perevezencev',
    at: '12.07.2024 в 14:56',
  }
}

const createDataArray = (numUsers = 5) : {
  inv_number: string,
  item: string,
  to: string,
  from: string,
  worker: string,
  at: string,
}[][] => {
  return new Array(numUsers)
      .fill(undefined)
      .map(createMovement) as {
    inv_number: string,
    item: string,
    to: string,
    from: string,
    worker: string,
    at: string,
  }[][];
}

export default {
  data() {
    return {
      items: createDataArray(24),
      isValid: false,
      fields: {
        inv_number: '',
        from: '',
        to: '',
      },
      rules: {
        required: (value: string | undefined) => !!value || 'Это поле является обязательным',
        inv_number: (value: string | undefined) => (value || '').match(/^[a-zA-Z0-9]+$/) || 'Неверный инвентарный или серийный номер',
        item_name: (value: string | undefined) => (value || '').match(/^[а-яА-Я0-9 ]+$/) || 'Неверное имя оборудования',
        destination: (value: string | undefined) => (value || '').match(/^[а-яА-Я0-9][а-яА-Я0-9\- ]+[а-яА-Я0-9]$/) || 'Неверное место перемещения',
      }
    };
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
    async load() {
      const data: {
        inv_number: string,
        item: string,
        to: string,
        from: string,
        worker: string,
        at: string,
      }[][] = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(createDataArray(10));
        }, 1000);
      });

      this.items.push(...data);
    }
  },
}
</script>
