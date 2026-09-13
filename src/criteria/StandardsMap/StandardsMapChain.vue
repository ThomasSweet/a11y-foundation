<template>
  <div class="standards-map-layer" :class="{ 'is-core': layers.length === 1 }">
    <span class="standards-map-layer-kind">{{ layers[0].kind }}</span>
    <span class="standards-map-layer-name">{{ layers[0].name }}</span>
    <p class="standards-map-layer-note">
      {{ layers[0].note }}
      <a v-if="layers.length === 1" :href="href">{{ linkLabel }}</a>
    </p>
    <StandardsMapChain
      v-if="layers.length > 1"
      :layers="layers.slice(1)"
      :href="href"
      :link-label="linkLabel"
    />
  </div>
</template>

<script setup lang="ts">
import type { MapLayer } from './standardsMapData'

defineProps<{
  layers: MapLayer[]
  href: string
  linkLabel: string
}>()
</script>

<style scoped lang="scss" src="./StandardsMapChain.scss"></style>
