<script setup lang="ts">
import { computed } from 'vue'

const DEFAULT_SECTIONS: Array<{ label: string; value: string; description?: string }> = [
  { label: 'Sensor', value: '30,000 DPI Optical Sensor', description: '750 IPS Tracking Speed, 70G Acceleration' },
  { label: 'Weight', value: '48 Grams', description: 'Ultra-lightweight magnesium alloy chassis' },
  { label: 'Connectivity', value: 'AuraSync 2.4GHz / Wired', description: '0.125ms Latency performance' },
  { label: 'Battery Life', value: 'Up to 150 Hours', description: 'USB-C Fast charging supported' },
  { label: 'Switches', value: 'Gen-3 Optical Switches', description: '90-million click lifecycle' },
  { label: 'Dimensions', value: '124 x 64 x 38 mm', description: 'Optimized for claw and fingertip grip' },
]

const props = withDefaults(
  defineProps<{
    open?: boolean
    title?: string
    subtitle?: string
    sections?: Array<{
      label: string
      value: string
      description?: string
    }>
  }>(),
  {
    open: false,
    title: 'Aura Pro Wireless',
    subtitle: 'Technical Data',
  },
)

const effectiveSections = computed(() => props.sections ?? DEFAULT_SECTIONS)

const emit = defineEmits<{
  close: []
}>()

function closeModal() {
  emit('close')
}

function handleOverlayClick() {
  closeModal()
}
</script>

<template>
  <Transition name="modal-fade">
    <div
      v-if="open"
      class="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <div
        class="absolute inset-0 cursor-pointer bg-black/80 backdrop-blur-md"
        @click="handleOverlayClick"
      ></div>

      <Transition name="modal-scale">
        <div
          v-if="open"
          class="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
        >
          <div class="p-8 md:p-12">
            <div class="mb-10 flex items-start justify-between">
              <div>
                <span
                  class="mb-2 block text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500"
                >
                  {{ subtitle }}
                </span>
                <h3 class="text-3xl font-bold">
                  {{ title }}
                </h3>
              </div>

              <button
                type="button"
                class="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
                @click="closeModal"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div class="space-y-6">
                <div
                  v-for="(item, index) in effectiveSections.slice(0, Math.ceil(effectiveSections.length / 2))"
                  :key="`${item.label}-${index}`"
                >
                  <p class="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
                    {{ item.label }}
                  </p>
                  <p class="text-lg font-medium">
                    {{ item.value }}
                  </p>
                  <p
                    v-if="item.description"
                    class="text-xs text-brand-muted"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </div>

              <div class="space-y-6">
                <div
                  v-for="(item, index) in effectiveSections.slice(Math.ceil(effectiveSections.length / 2))"
                  :key="`${item.label}-${index}`"
                >
                  <p class="mb-1 text-[10px] uppercase tracking-widest text-brand-muted">
                    {{ item.label }}
                  </p>
                  <p class="text-lg font-medium">
                    {{ item.value }}
                  </p>
                  <p
                    v-if="item.description"
                    class="text-xs text-brand-muted"
                  >
                    {{ item.description }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-12 flex justify-end border-t border-white/5 pt-8">
              <button
                type="button"
                class="rounded-sm bg-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-dark"
                @click="closeModal"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </Transition>
</template>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>