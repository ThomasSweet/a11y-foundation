<template>
  <ul class="craft-links">
    <li v-for="link in links" :key="link.href">
      <a :href="link.href">{{ link.label }}</a>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  links: { label: string; href: string }[]
}>()
</script>

<style scoped lang="scss">
@layer components {
  .craft-links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    margin: 0;
    padding: 0;
    list-style: none;
    font-size: var(--text-sm);
  }
}
</style>
