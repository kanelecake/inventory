<script setup lang="ts">
import "./VMovementItem.scss";

import {PropType} from "vue";
import {Movement} from "@api/types/movement";

defineProps({
  data: { type: Object as PropType<Movement>, required: true },
});
</script>

<template>
  <div class="movement__item">
    <!-- Заголовок заявки -->
    <div class="header">
      <h3>Заявка на перемещение #{{ data.id }}</h3>
      <VMovementStatus :status="data.status" />
    </div>

    <!-- Текст заявки -->
    <span class="content">
      Перенос <b>{{ data.item_name }}</b>
      с инвентарным/серийным номером <b>{{ data.inventory_number }}</b>
      из кабинета <b>{{ data.from }}</b>
      в <b>{{ data.to }}</b>
    </span>

    <!-- Дополнительная информация -->
    <v-card
        class="mt-4"
        color="surface-variant"
        variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        Выполнивший перемещение: <b>{{ data.fullname }}</b><br />
        Дата выполнения: <b>{{ convertDateFromTimestamp(data.moved_at) }}</b>
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts">
import VMovementStatus from "@components/movement/VMovementStatus.vue";

export default {
  components: {VMovementStatus},
  methods: {
    /** Конвертирует дату из временной метки **/
    convertDateFromTimestamp(timestamp: number) : string {
      return new Date(timestamp * 1000)
          .toLocaleDateString('ru-ru', {
            weekday:"long", year:"numeric", month:"short", day:"numeric"
          });
    }
  }
}
</script>