<template>
  <div class="movement-item">
    <div class="header">
      <h3>Заявка #123</h3><span class="mark approved">Рассматривается</span>
    </div>

    <span>Перенос <b>{{ data.item }}</b> с инвентарным/серийным номером <b>{{ data.inv_number }}</b> из <b>{{ data.from }}</b> в <b>{{ data.to }}</b></span>

    <v-card class="mt-4"
        color="surface-variant"
        variant="tonal">
      <v-card-text class="text-medium-emphasis text-caption">
        Выполнивший перемещение: <b>{{ data.worker }}</b><br />
        Дата выполнения: <b>{{ data.at }}</b>
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