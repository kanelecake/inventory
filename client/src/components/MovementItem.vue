<template>
  <div class="movement-item">
    <div class="header">
      <h3>Заявка #{{ data.id }}</h3>
      <!-- Выполняющая заявка на перемещение -->
      <template v-if="data.status === 0">
        <span class="mark">Выполняется</span>
      </template>
      <!-- Завершенная заявка на перемещение -->
      <template v-if="data.status === 1">
        <span class="mark approved">Завершено</span>
      </template>
      <!-- Отклоненная заявка на перемещение -->
      <template v-if="data.status === 2">
        <span class="mark rejected">Отклонена</span>
      </template>
    </div>

    <span>Перенос <b>{{ data.item_name }}</b> с инвентарным/серийным номером <b>{{ data.inventory_number }}</b> из <b>{{ data.from }}</b> в <b>{{ data.to }}</b></span>

    <v-card class="mt-4"
        color="surface-variant"
        variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        Выполнивший перемещение: <b>{{ data.fullname }}</b><br />
        Дата выполнения: <b>{{ new Date(data.moved_at * 1000).toLocaleDateString('ru-ru', { weekday:"long", year:"numeric", month:"short", day:"numeric"})  }}</b>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss">
.movement-item {
  padding: 2rem 2rem;

  & .header {
    display: flex;
    flex-direction: row;
    gap: .4rem;
    align-items: center;
    margin-bottom: .5rem;

    & .mark {
      color: var(--color-text-white);
      background-color: var(--color-mark);
      padding: .1rem .4rem;
      border-radius: .2rem;

      &.approved {
        background-color: var(--color-mark-approved) !important;
      }

      &.rejected {
        background-color: var(--color-mark-canceled) !important;
      }
    }
  }

  & span {
    color: var(--color-text);
  }
}
</style>

<script lang="ts">
export default {
  props: ['data'],
}
</script>