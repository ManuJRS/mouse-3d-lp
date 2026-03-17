<script setup lang="ts">
function handleShopCollection() {
  console.log('Shop The Collection')
}

function handlePhilosophy() {
  console.log('The Philosophy')
}

function handleMenu() {
  console.log('Open menu')
}
</script>

<template>
  <section
    class="relative flex h-[calc(60vh)] items-center justify-center overflow-hidden pt-20"
    data-purpose="hero"
  >
    <div class="shader-bg">
      <div class="shader-arc"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-7xl px-6 text-center">
      <h1
        class="gradient-text mb-8 text-6xl font-bold leading-[0.9] tracking-tight md:text-[120px]"
      >
        Elevate Your Play.
      </h1>

      <p
        class="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-brand-muted md:text-xl"
      >
        Professional-grade peripherals engineered for absolute precision and zero distraction.
        Minimalist by design, uncompromising by nature.
      </p>

      <div class="flex flex-col items-center justify-center gap-6 sm:flex-row">
        <button
          type="button"
          class="w-full rounded-sm bg-white px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black hover:cursor-pointer transition-all hover:bg-neutral-200 sm:w-auto"
          @click="handleShopCollection"
        >
          Shop The Collection
        </button>

        <button
          type="button"
          class="w-full rounded-sm border border-white/10 px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white/5 sm:w-auto"
          @click="handlePhilosophy"
        >
          The Philosophy
        </button>
      </div>
    </div>
  </section>
</template>