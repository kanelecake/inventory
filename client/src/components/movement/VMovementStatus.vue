<script setup lang="ts">
defineProps({
  status: { type: Number, required: true },
})
</script>

<template>
  <!-- Выполняющая заявка на перемещение -->
  <template v-if="status === 0">
    <span class="mark">Выполняется</span>
  </template>

  <!-- Завершенная заявка на перемещение -->
  <template v-if="status === 1">
    <span class="mark approved">Завершено</span>
  </template>

  <!-- Отклоненная заявка на перемещение -->
  <template v-if="status === 2">
    <span class="mark rejected">Отклонено</span>
  </template>
</template>

<style lang="scss">
.mark {
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
</style>