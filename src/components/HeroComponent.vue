<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const emit = defineEmits<{
  shopCollection: []
  philosophy: []
}>()

function handleShopCollection() {
  emit('shopCollection')
}

function handlePhilosophy() {
  emit('philosophy')
}
</script>

<template>
  <section
    class="relative flex h-[calc(80vh)] items-center justify-center overflow-hidden pt-20"
    data-purpose="hero"
  >
    <div class="shader-bg">
      <div class="shader-arc"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
      <h1
        class="gradient-text mb-8 text-6xl font-bold leading-[0.9] tracking-tight md:text-[120px]"
      >
        {{ t('hero.title') }}
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-brand-muted md:text-xl"
      >
        {{ t('hero.description') }}
      </p>

      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <button
          type="button"
          disabled
          class="w-full rounded-sm bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all sm:w-auto opacity-60 cursor-not-allowed"
          @click="handleShopCollection"
        >
          {{ t('hero.primaryButtonText') }}
        </button>

        <button
          type="button"
          disabled
          class="w-full rounded-sm border border-white/10 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all sm:w-auto opacity-60 cursor-not-allowed"
          @click="handlePhilosophy"
        >
          {{ t('hero.secondaryButtonText') }}
        </button>
      </div>
    </div>
  </section>
</template>