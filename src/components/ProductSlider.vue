<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { computed, ref } from 'vue'
import SpecsModal from './SpecsModal.vue'

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

type Slide = {
  id: number
  eyebrow: string
  title: string
  description: string
  features: string[]
  buttonText: string
  /** Ruta pública (/models/...) o nombre de archivo en src/assets/models/ (ej: gaming_mouse.glb) */
  modelSrc: string
  modelAlt: string
  /** Configuración 3D opcional para este slide (cámara, luces, orbit) */
  scene?: SceneConfig
  /** Contenido del modal de especificaciones (title, subtitle, sections). Si no se define, se usan los valores por defecto del modal. */
  specs?: SlideSpecs
}

const props = withDefaults(
  defineProps<{
    slides?: Slide[]
  }>(),
  {
    slides: () => [
      {
        id: 2,
        scene: {
            cameraPosition: [0, 3, 2.3],
            ambientIntensity: 0.5,
            directionalLights: [
                { position: [2, 2, 2], intensity: 1.2 },
                { position: [-2, -1, 3], intensity: 0.4 },
            ],
            orbit: {
                enableDamping: true,
            },
            autoRotate: true,
            autoRotateSpeed: 0.9,
            enableDamping: true,
            dampingFactor: 0.05,
        },
        eyebrow: 'Minimalist Design',
        title: 'The Aura Air.\nLightness redefined.',
        description:
          'Built for players who want speed without compromise. Every curve, every material, and every gram has been refined to deliver effortless movement and absolute control.',
        features: [
          'Featherweight Ergonomic Shell',
          'Low-latency Wireless Response',
          'Precision Grip Texture',
        ],
        buttonText: 'Explore Design',
        modelSrc: 'futuristic_gaming_mouse.glb',
        modelAlt: 'Aura Air 3D Model',
        specs: {
          title: 'Aura Air',
          subtitle: 'Design & Ergonomics',
          sections: [
            { label: 'Shell', value: 'Featherweight Ergonomic', description: 'Optimized for claw and fingertip grip' },
            { label: 'Wireless', value: 'Low-latency 2.4GHz', description: 'Sub-1ms response time' },
            { label: 'Grip', value: 'Precision Texture', description: 'PTFE feet, 100% contact' },
            { label: 'Weight', value: '42 Grams', description: 'Ultra-light construction' },
          ],
        },
      },
      {
        id: 1,
        scene: {
            cameraPosition: [15, 12, 12],
            ambientIntensity: 1,
            directionalLights: [
                { position: [2, 2, 2], intensity: 1.2 },
                { position: [-2, -1, 3], intensity: 0.4 },
            ],
            orbit: {
                enableDamping: true,
            },
            autoRotate: true,
            autoRotateSpeed: 7.5,
            enableDamping: true,
            dampingFactor: 0.05,
        },
        eyebrow: 'Precision Engineered',
        title: 'The Aura Pro.\nPure performance.',
        description:
          "We stripped away everything that doesn't help you win. No bloated software, no distracting lights—just raw, unadulterated performance wrapped in a shell that weighs less than 50 grams.",
        features: [
          'Ultra-lightweight 48g Chassis',
          '30K DPI Optical Sensor',
          '150-hour Battery Life',
        ],
        buttonText: 'View Specifications',
        modelSrc: 'mouse_gamer.glb',
        modelAlt: 'Aura Pro 3D Model',
        specs: {
          title: 'Aura Pro Wireless',
          subtitle: 'Technical Data',
          sections: [
            { label: 'Sensor', value: '30,000 DPI Optical Sensor', description: '750 IPS Tracking Speed, 70G Acceleration' },
            { label: 'Weight', value: '48 Grams', description: 'Ultra-lightweight magnesium alloy chassis' },
            { label: 'Connectivity', value: 'AuraSync 2.4GHz / Wired', description: '0.125ms Latency performance' },
            { label: 'Battery Life', value: 'Up to 150 Hours', description: 'USB-C Fast charging supported' },
            { label: 'Switches', value: 'Gen-3 Optical Switches', description: '90-million click lifecycle' },
            { label: 'Dimensions', value: '124 x 64 x 38 mm', description: 'Optimized for claw and fingertip grip' },
          ],
        },
      },
      {
        id: 3,
        scene: {
            cameraPosition: [0, 1.5, 1],
            ambientIntensity: 1.5,
            directionalLights: [
                { position: [2, 2, 2], intensity: 1.9},
                { position: [-2, -1, 3], intensity: 0.4 },
            ],
            orbit: {
                enableDamping: true,
            },
            autoRotate: true,
            autoRotateSpeed: 0.9,
            enableDamping: true,
            dampingFactor: 0.05,
        },
        eyebrow: 'Elite Hardware',
        title: 'The Aura X.\nMade for mastery.',
        description:
          'A premium gaming tool engineered for professionals. Fast, responsive, and distraction-free, with a hardware-first philosophy that keeps you focused on performance.',
        features: [
          'Tournament-grade Switches',
          'Custom Sensor Tuning',
          'Extended Battery Efficiency',
        ],
        buttonText: 'See Details',
        modelSrc: '3d_lightweight_gaming_mouse_-_high_poly.glb',
        modelAlt: 'Aura X 3D Model',
        specs: {
          title: 'Aura X',
          subtitle: 'Elite Hardware',
          sections: [
            { label: 'Switches', value: 'Tournament-grade Optical', description: '90M click lifecycle' },
            { label: 'Sensor', value: 'Custom Tuning', description: 'Pro-grade DPI steps' },
            { label: 'Battery', value: 'Extended Efficiency', description: 'Up to 120 hours' },
          ],
        },
      },
    ],
  },
)

const emit = defineEmits<{
  specsClick: [slide: Slide]
}>()

const currentIndex = ref(0)
const specsModalOpen = ref(false)

const currentSlide = computed(() => props.slides[currentIndex.value])

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
    currentIndex.value === props.slides.length - 1 ? 0 : currentIndex.value + 1
}

function prevSlide() {
  currentIndex.value =
    currentIndex.value === 0 ? props.slides.length - 1 : currentIndex.value - 1
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
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-black"
            @click="prevSlide"
          >
            <span class="material-symbols-outlined text-[20px]">arrow_back</span>
          </button>

          <button
            type="button"
            class="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white transition hover:bg-white hover:text-black"
            @click="nextSlide"
          >
            <span class="material-symbols-outlined text-[20px]">arrow_forward</span>
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
                class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1"
              >
                arrow_forward
              </span>
            </button>
          </div>

          <div class="relative w-full lg:w-1/2">
            <div
              :key="currentSlide.id"
              class="relative z-10 h-[700px] overflow-hidden rounded-[2.5rem]"
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

            <div
              class="absolute top-10 -right-10 h-full w-full rounded-[2.5rem] border border-white/5 bg-[#111] opacity-50 -z-10"
            ></div>
            <div
              class="absolute -bottom-10 -left-10 h-full w-full rounded-[2.5rem] border border-white/5 bg-[#0a0a0a] opacity-30 -z-20"
            ></div>
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