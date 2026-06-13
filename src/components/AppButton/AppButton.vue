<template>
  <button type="button" class="button" :class="`button--${variant}`">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary'
  }>(),
  { variant: 'primary' },
)
</script>

<style scoped lang="scss" src="./AppButton.scss"></style>
