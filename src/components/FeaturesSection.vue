<script setup lang="ts">
type FeatureItem = {
  icon: string
  title: string
  description: string
}

const props = withDefaults(
  defineProps<{
    title?: string
    description?: string
    features?: FeatureItem[]
  }>(),
  {
    title: 'Built to cover your needs',
    description:
      'Libero sapiente aliquam quibusdam aspernatur, praesentium iusto repellendus.',
    features: () => [
      {
        icon: 'bolt',
        title: 'Zero-Latency Flow',
        description:
          'Extensive customization options, allowing you to tailor every aspect to meet your specific needs.',
      },
      {
        icon: 'tune',
        title: 'You have full control',
        description:
          'From design elements to functionality, you have complete control to create a unique and personalized experience.',
      },
      {
        icon: 'auto_awesome',
        title: 'Powered By AI',
        description:
          'Elements to functionality, you have complete control to create a unique experience.',
      },
    ],
  },
)
</script>

<template>
  <section class="relative bg-brand-dark py-32 overflow-hidden border-t border-white/5" data-purpose="features">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-24 text-center">
        <h2 class="mb-6 text-4xl font-bold md:text-6xl">
          {{ title }}
        </h2>
        <p class="mx-auto max-w-xl text-brand-muted">
          {{ description }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <article
          v-for="(feature, index) in features"
          :key="`${feature.title}-${index}`"
          class="group flex flex-col items-center rounded-3xl border border-white/5 bg-[#0a0a0a] p-10 text-center transition-all hover:border-white/10"
        >
          <div
            class="relative mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 transition-colors group-hover:bg-white/10"
          >
            <div
              class="absolute inset-0 opacity-10"
              style="background-image: radial-gradient(#fff 1px, transparent 1px); background-size: 10px 10px;"
            ></div>

            <span class="material-symbols-outlined relative z-10 text-3xl">
              {{ feature.icon }}
            </span>
          </div>

          <h3 class="mb-4 text-xl font-bold">
            {{ feature.title }}
          </h3>

          <p class="text-sm leading-relaxed text-brand-muted">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>