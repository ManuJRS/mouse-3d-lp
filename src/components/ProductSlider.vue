<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SpecsModal from './SpecsModal.vue'

const { tm } = useI18n()

export type SceneConfig = {
  cameraPosition?: [number, number, number]
  ambientIntensity?: number
  directionalLights?: Array<{
    position: [number, number, number]
    intensity?: number
  }>
  orbit?: {
    enableDamping?: boolean
    dampingFactor?: number
    autoRotate?: boolean
    autoRotateSpeed?: number
  }
}

const DEFAULT_SCENE: Required<SceneConfig> = {
  cameraPosition: [20, 15, 10],
  ambientIntensity: 1,
  directionalLights: [
    { position: [2, 2, 2], intensity: 1.2 },
    { position: [-2, -1, 3], intensity: 0.4 },
  ],
  orbit: {
    enableDamping: true,
    dampingFactor: 0.05,
    autoRotate: true,
    autoRotateSpeed: 0.8,
  },
}

/** Especificaciones del modal por slide (title, subtitle, sections) */
export type SpecsSection = {
  label: string
  value: string
  description?: string
}

export type SlideSpecs = {
  title?: string
  subtitle?: string
  sections?: SpecsSection[]
}

export type Slide = {
  id: number
  eyebrow: string
  title: string
  description: string
  features: string[]
  buttonText: string
  modelSrc: string
  modelAlt: string
  scene?: SceneConfig
  specs?: SlideSpecs
}

/** Solo id + scene para inyectar configuración 3D por slide (el contenido viene de i18n). */
export type SlideScene = {
  id: number
  scene?: SceneConfig
}

const props = withDefaults(
  defineProps<{
    slideScenes?: SlideScene[]
  }>(),
  { slideScenes: () => [] },
)

const slides = computed<Slide[]>(() => {
  const raw = tm('productSlider.slides')
  const list = Array.isArray(raw) ? (raw as Omit<Slide, 'scene'>[]) : []
  const sceneById = new Map(
    (props.slideScenes ?? []).map((s) => [s.id, s.scene]),
  )
  return list.map((slide) => ({
    ...slide,
    scene: sceneById.get(slide.id),
  }))
})

const emit = defineEmits<{
  specsClick: [slide: Slide]
}>()

const currentIndex = ref(0)
const specsModalOpen = ref(false)

const currentSlide = computed(() => slides.value[currentIndex.value])

const modelUrl = computed(() => {
  const src = currentSlide.value?.modelSrc ?? ''
  if (src.startsWith('http') || src.startsWith('/')) return src
  return new URL(`../assets/models/${src}`, import.meta.url).href
})

const { state: model } = useGLTF(modelUrl)

const sceneConfig = computed(() => {
  const slideScene = currentSlide.value?.scene
  if (!slideScene) return DEFAULT_SCENE
  return {
    cameraPosition: slideScene.cameraPosition ?? DEFAULT_SCENE.cameraPosition,
    ambientIntensity: slideScene.ambientIntensity ?? DEFAULT_SCENE.ambientIntensity,
    directionalLights:
      (slideScene.directionalLights?.length ?? 0) > 0
        ? slideScene.directionalLights!.map((l) => ({
            position: l.position,
            intensity: l.intensity ?? 1,
          }))
        : DEFAULT_SCENE.directionalLights,
    orbit: {
      enableDamping: slideScene.orbit?.enableDamping ?? DEFAULT_SCENE.orbit.enableDamping,
      dampingFactor: slideScene.orbit?.dampingFactor ?? DEFAULT_SCENE.orbit.dampingFactor,
      autoRotate: slideScene.orbit?.autoRotate ?? DEFAULT_SCENE.orbit.autoRotate,
      autoRotateSpeed: slideScene.orbit?.autoRotateSpeed ?? DEFAULT_SCENE.orbit.autoRotateSpeed,
    },
  }
})

function nextSlide() {
  currentIndex.value =
    currentIndex.value === slides.value.length - 1 ? 0 : currentIndex.value + 1
}

function prevSlide() {
  currentIndex.value =
    currentIndex.value === 0 ? slides.value.length - 1 : currentIndex.value - 1
}

function goToSlide(index: number) {
  currentIndex.value = index
}

function handleSpecsClick() {
  const slide = currentSlide.value
  if (slide) {
    specsModalOpen.value = true
    emit('specsClick', slide)
  }
}
</script>

<template>
  <section class="overflow-hidden bg-[#050505] py-20 md:py-32">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-10 flex items-center justify-between gap-4">
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-black hover:cursor-pointer"
            @click="prevSlide"
          >
            <span class="material-symbols-outlined notranslate text-[20px]" translate="no">arrow_back</span>
          </button>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-black hover:cursor-pointer"
            @click="nextSlide"
          >
            <span class="material-symbols-outlined notranslate text-[20px]" translate="no">arrow_forward</span>
          </button>
        </div>

        <div class="flex items-center gap-2">
          <button
            v-for="(_, index) in slides"
            :key="index"
            type="button"
            class="h-2.5 rounded-full transition-all"
            :class="index === currentIndex ? 'w-8 bg-white' : 'w-2.5 bg-white/30'"
            @click="goToSlide(index)"
          />
        </div>
      </div>

      <Transition name="fade-slide" mode="out-in">
        <div
          v-if="currentSlide"
          :key="currentSlide.id"
          class="flex flex-col items-center gap-14 lg:flex-row lg:gap-20"
        >
          <div class="w-full lg:w-1/2">
            <span
              class="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500"
            >
              {{ currentSlide.eyebrow }}
            </span>

            <h2 class="mb-8 whitespace-pre-line text-4xl font-bold leading-[1.1] md:text-6xl lg:text-7xl">
              {{ currentSlide.title }}
            </h2>

            <p class="mb-12 max-w-lg text-lg leading-relaxed text-brand-muted">
              {{ currentSlide.description }}
            </p>

            <div class="mb-12 space-y-6">
              <div
                v-for="(feature, featureIndex) in currentSlide.features"
                :key="`${currentSlide.id}-${featureIndex}`"
                class="flex items-start gap-4"
              >
                <div class="mt-2 h-1 w-1 rounded-full bg-white"></div>
                <p class="text-sm font-medium">{{ feature }}</p>
              </div>
            </div>

            <button
              type="button"
              class="group inline-flex items-center gap-4 rounded-sm border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-all hover:bg-white hover:text-brand-dark hover:cursor-pointer hover:text-black"
              @click="handleSpecsClick"
            >
              <span>{{ currentSlide.buttonText }}</span>
              <span
                class="material-symbols-outlined notranslate text-sm transition-transform group-hover:translate-x-1"
                translate="no"
              >
                arrow_forward
              </span>
            </button>
          </div>

          <div class="relative w-full lg:w-1/2">
            <div
              :key="currentSlide.id"
              class="relative z-10 md:h-[700px] h-[300px] overflow-hidden rounded-[2.5rem]"
            >
              <TresCanvas clear-color="#050505">
                <TresPerspectiveCamera :position="sceneConfig.cameraPosition" />
                <TresAmbientLight :intensity="sceneConfig.ambientIntensity" />
                <TresDirectionalLight
                  v-for="(light, i) in sceneConfig.directionalLights"
                  :key="i"
                  :position="light.position"
                  :intensity="light.intensity"
                />
                <primitive v-if="model?.scene" :object="model.scene" />
                <OrbitControls
                  :enable-damping="sceneConfig.orbit.enableDamping"
                  :damping-factor="sceneConfig.orbit.dampingFactor"
                  :auto-rotate="sceneConfig.orbit.autoRotate"
                  :auto-rotate-speed="sceneConfig.orbit.autoRotateSpeed"
                />
              </TresCanvas>
            </div>
          </div>
        </div>
      </Transition>
    </div>

    <SpecsModal
      :open="specsModalOpen"
      :title="(currentSlide?.specs?.title ?? (currentSlide?.title ?? '').replace(/\n/g, ' ')) || 'Specifications'"
      :subtitle="currentSlide?.specs?.subtitle ?? currentSlide?.eyebrow ?? 'Technical Data'"
      :sections="currentSlide?.specs?.sections"
      @close="specsModalOpen = false"
    />
  </section>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(24px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-24px);
}
</style>