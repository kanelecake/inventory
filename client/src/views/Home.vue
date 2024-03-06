<script setup lang="ts">
import "@styles/views/Home.scss";
import Logo from "@components/Logo.vue";
import {ArrowRight, NotepadTextDashed} from "lucide-vue-next";
import MovementItem from "@components/MovementItem.vue";

// @ts-ignore
import {useStore} from "vuex";
import {MOVEMENT_GET_LIST} from "@stores/actions/movements.ts";

const store = useStore();
store.dispatch(MOVEMENT_GET_LIST, { offset: 0 });
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
          <!-- Инвентарный номер -->
          <div class="text-subtitle-1 text-medium-emphasis">Инвентарный или серийный номер</div>
          <v-text-field
              v-model="fields.inventory_number"
              :rules="[rules.required, rules.inv_number]"
              color="var(--color-primary)"
              base-color="var(--color-text-border)"
              density="compact"
              placeholder="Инвентарный или серийный номер"
              variant="outlined"
              type="text" />

          <!-- Что перемещается -->
          <div class="text-subtitle-1 text-medium-emphasis">Что перемещается?</div>
          <v-text-field
              v-model="fields.item_name"
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
            :loading="!isDataLoaded"
            :disabled="!isDataLoaded"
            color="var(--color-btn-background-secondary)"
            class="text-none text-subtitle-1 text-white button font-weight-bold"
            :append-icon="ArrowRight"
            @click="submitForm"
            variant="flat">Переместить</v-btn>
      </v-form>

      <!-- Список перемещений -->
      <v-infinite-scroll
          class="list"
          height="calc(100vh - 24px - 4rem)"
          side="end"
          @load="loadMoreData">
        <MovementItem
            v-for="(item, index) in items"
            :key="index"
            :data="item" />

        <template v-slot:empty class="py-4 gp">
          <v-alert
              type="info"
              :icon="NotepadTextDashed"
              color="var(--color-btn-background-secondary)"
              variant="tonal"><b>Вы просмотрели все перемещения</b></v-alert>
        </template>
      </v-infinite-scroll>
    </v-main>
  </v-layout>
</template>

<script lang="ts">
// @ts-ignore
import { mapGetters } from "vuex";
import {MOVEMENT_CREATE, MOVEMENT_GET_LIST} from "@stores/actions/movements.ts";
import {InfiniteScrollDoneFn, InfiniteScrollSide, InfiniteScrollStatus} from "@types/vuetifyExtended";

export default {
  computed: {
    ...mapGetters(["getMovements", "isDataLoaded", "isError"]),
    items: function () {
      return this.getMovements;
    },
  },
  data() {
    return {
      currentOffset: 10,
      isValid: false,
      fields: {
        inventory_number: '',
        item_name: '',
        from: '',
        to: '',
      },
      rules: {
        required: (value: string | undefined) => !!value || 'Это поле является обязательным',
        inv_number: (value: string | undefined) => !!(value || '').match(/^[a-zA-Z0-9]+$/) || 'Неверный инвентарный или серийный номер',
        item_name: (value: string | undefined) => !!(value || '').match(/^[а-яА-Я0-9 ]+$/) || 'Неверное имя оборудования',
        destination: (value: string | undefined) => !!(value || '').match(/^[а-яА-Я0-9][а-яА-Я0-9\- ]+[а-яА-Я0-9]$/) || 'Неверное место перемещения',
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
        this.$store.dispatch(MOVEMENT_CREATE, this.fields);

        this.$refs.form.reset();
        this.$refs.form.resetValidation();
      }
    },
    loadMoreData({ done } : { side: InfiniteScrollSide, done: InfiniteScrollDoneFn }) {
      this.$store.dispatch(MOVEMENT_GET_LIST, { offset: this.currentOffset, done: done });
      this.currentOffset += 10;
    }
  },
}
</script>
