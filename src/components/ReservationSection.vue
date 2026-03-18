<script setup lang="ts">
import { reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

export type ProductOption = {
  label: string
  value: string
}

type ReservationSectionData = {
  eyebrow: string
  title: string
  description: string
  statusText: string
  locationText: string
  titleText: string
  emailText: string
  hardwareText: string
  selectText: string
  submitText: string
  termsText: string
  productOptions: ProductOption[]
}

const { tm } = useI18n()

const reservationSection = computed<ReservationSectionData>(() => {
  const raw = tm('reservationSection') as Partial<ReservationSectionData> | undefined
  return {
    eyebrow: raw?.eyebrow ?? '',
    title: raw?.title ?? '',
    description: raw?.description ?? '',
    statusText: raw?.statusText ?? '',
    locationText: raw?.locationText ?? '',
    titleText: raw?.titleText ?? 'Full Name',
    emailText: raw?.emailText ?? 'Work Email',
    hardwareText: raw?.hardwareText ?? 'Hardware Selection',
    selectText: raw?.selectText ?? 'Select a product',
    submitText: raw?.submitText ?? 'Reserve Now',
    termsText: raw?.termsText ?? '',
    productOptions: Array.isArray(raw?.productOptions) ? raw.productOptions : [],
  }
})

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
  <section class="relative overflow-hidden border-t border-white/5 bg-brand-dark py-20">
    <div class="shader-bg opacity-20">
      <div class="shader-arc"></div>
    </div>

    <div class="relative z-10 mx-auto max-w-4xl px-6">
      <div class="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span
            class="mb-4 block text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500"
          >
            {{ reservationSection.eyebrow }}
          </span>

          <h2 class="mb-6 text-4xl font-bold md:text-5xl">
            {{ reservationSection.title }}
          </h2>

          <p class="mb-8 text-lg leading-relaxed text-brand-muted">
            {{ reservationSection.description }}
          </p>

          <div
            class="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-white/40"
          >
            <span class="flex items-center gap-2">
              <span class="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              {{ reservationSection.statusText }}
            </span>

            <span class="h-1 w-1 rounded-full bg-white/20"></span>

            <span>{{ reservationSection.locationText }}</span>
          </div>
        </div>

        <div class="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl md:p-10">
          <form class="space-y-6" @submit.prevent="handleSubmit">
            <div class="space-y-2">
              <label
                for="name"
                class="ml-1 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-muted"
              >
                {{ reservationSection.titleText }}
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
                {{ reservationSection.emailText }}
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
                {{ reservationSection.hardwareText }}
              </label>

              <div class="relative">
                <select
                  id="product"
                  v-model="form.product"
                  required
                  class="sleek-input block w-full cursor-pointer appearance-none rounded-xl px-5 py-4 text-sm text-white outline-none focus:ring-0"
                >
                  <option disabled value="">
                    {{ reservationSection.selectText }}
                  </option>

                  <option
                    v-for="option in reservationSection.productOptions"
                    :key="option.value"
                    :value="option.value"
                    class="text-black"
                  >
                    {{ option.label }}
                  </option>
                </select>

                <span
                  class="material-symbols-outlined notranslate pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-brand-muted"
                  translate="no"
                >
                  expand_more
                </span>
              </div>
            </div>

            <button
              type="submit"
              class="text-black mt-4 w-full rounded-xl bg-white px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] shadow-xl shadow-white/5 transition-all hover:bg-neutral-200 hover:cursor-pointer hover:text-black"
            >
              {{ reservationSection.submitText }}
            </button>

            <p
              class="text-brand-muted text-center text-[9px] uppercase tracking-widest leading-loose"
            >
              {{ reservationSection.termsText }}
            </p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>