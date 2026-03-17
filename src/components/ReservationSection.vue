<script setup lang="ts">
import { reactive } from 'vue'

type ProductOption = {
  label: string
  value: string
}

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title?: string
    description?: string
    statusText?: string
    locationText?: string
    productOptions?: ProductOption[]
  }>(),
  {
    eyebrow: 'Limited Inventory',
    title: 'Secure Your Unit.',
    description:
      'The next batch of Aura Pro peripherals is entering final testing. Join the priority reservation list to guarantee your hardware before public release.',
    statusText: 'Production Phase 4',
    locationText: 'Tokyo Labs',
    productOptions: () => [
      { label: 'Aura Pro Wireless (Magnesium)', value: 'aura-pro-mouse' },
      { label: 'Core 65 Mechanical Keyboard', value: 'core-keyboard' },
      { label: 'Sonic Hi-Res Audio Interface', value: 'sonic-audio' },
      { label: 'Complete Elite Ecosystem Kit', value: 'full-kit' },
    ],
  },
)

const emit = defineEmits<{
  submit: [
    payload: {
      name: string
      email: string
      product: string
    },
  ]
}>()

const form = reactive({
  name: '',
  email: '',
  product: '',
})

function handleSubmit() {
  emit('submit', {
    name: form.name,
    email: form.email,
    product: form.product,
  })
}
</script>

<template>
  <section class="relative overflow-hidden border-t border-white/5 bg-brand-dark py-32">
    <div class="shader-bg opacity-20">
      <div class="shader-arc"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-4xl px-6">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span
            class="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500"
          >
            {{ eyebrow }}
          </span>

          <h2 class="mb-6 text-4xl font-bold md:text-5xl">
            {{ title }}
          </h2>

          <p class="mb-8 text-lg leading-relaxed text-brand-muted">
            {{ description }}
          </p>

          <div
            class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40"
          >
            <span class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {{ statusText }}
            </span>

            <span class="h-1 w-1 rounded-full bg-white/20"></span>

            <span>{{ locationText }}</span>
          </div>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <label
                for="name"
                class="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted"
              >
                Full Name
              </label>

              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                placeholder="Hideo Kojima"
                class="sleek-input block w-full rounded-xl px-5 py-4 text-sm text-white outline-none focus:ring-0"
              />
            </div>

            <div class="space-y-2">
              <label
                for="email"
                class="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted"
              >
                Work Email
              </label>

              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                placeholder="hideo@aura.tech"
                class="sleek-input block w-full rounded-xl px-5 py-4 text-sm text-white outline-none focus:ring-0"
              />
            </div>

            <div class="space-y-2">
              <label
                for="product"
                class="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted"
              >
                Hardware Selection
              </label>

              <div class="relative">
                <select
                  id="product"
                  v-model="form.product"
                  required
                  class="sleek-input block w-full cursor-pointer appearance-none rounded-xl px-5 py-4 text-sm text-white outline-none focus:ring-0"
                >
                  <option disabled value="">
                    Select a product
                  </option>

                  <option
                    v-for="option in productOptions"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </option>
                </select>

                <span
                  class="material-symbols-outlined pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted"
                >
                  expand_more
                </span>
              </div>
            </div>

            <button
              type="submit"
              class="text-black mt-4 w-full rounded-xl bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-white/5 transition-all hover:bg-neutral-200 hover:cursor-pointer hover:text-black"
            >
              Reserve Now
            </button>

            <p
              class="text-brand-muted text-center text-[9px] uppercase tracking-widest leading-loose"
            >
              By reserving, you agree to our priority access terms.<br />
              No payment required today.
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>