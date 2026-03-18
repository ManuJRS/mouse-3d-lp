<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'

const { tm } = useI18n()

const items = computed(() => {
  const raw = tm('marquee.items')
  return Array.isArray(raw) ? (raw as string[]) : []
})
</script>

<template>
  <div
    class="relative z-20 overflow-hidden border-y border-white/5 bg-brand-dark py-12 marquee-container"
  >
    <div class="flex whitespace-nowrap animate-marquee">
      <div
        v-for="copyIndex in 2"
        :key="copyIndex"
        class="flex shrink-0 items-center"
      >
        <template
          v-for="(item, index) in items"
          :key="`${copyIndex}-${item}-${index}`"
        >
          <span
            class="px-8 text-4xl font-bold uppercase tracking-tighter text-white/80 md:text-7xl"
          >
            {{ item }}
          </span>

          <span class="mx-4 h-4 w-4 rounded-full bg-white/20" />
        </template>
      </div>
    </div>
  </div>
</template>