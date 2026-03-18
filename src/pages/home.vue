<script setup lang="ts">
import HeroComponent from '@/components/HeroComponent.vue'
import MarqueeSection from '@/components/MarqueeSection.vue'
import ProductSlider from '@/components/ProductSlider.vue'
import FeaturesSection from '@/components/FeaturesSection.vue'
import CountdownSection from '@/components/CountdownSection.vue'
import ReservationSection from '@/components/ReservationSection.vue'
import MainFooter from '@/layout/MainFooter.vue'
import FloatingActionMenu from '@/components/ui/FloatingActionMenu.vue'
import type { Slide, SlideScene } from '@/components/ProductSlider.vue'

const productSlideScenes: SlideScene[] = [
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
        dampingFactor: 0.05,
        autoRotate: true,
        autoRotateSpeed: 0.9,
      },
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
        dampingFactor: 0.05,
        autoRotate: true,
        autoRotateSpeed: 7.5,
      },
    },
  },
  {
    id: 3,
    scene: {
      cameraPosition: [0, 1.5, 1],
      ambientIntensity: 1.5,
      directionalLights: [
        { position: [2, 2, 2], intensity: 1.9 },
        { position: [-2, -1, 3], intensity: 0.4 },
      ],
      orbit: {
        enableDamping: true,
        dampingFactor: 0.05,
        autoRotate: true,
        autoRotateSpeed: 0.9,
      },
    },
  },
]

function handleShopCollection() {
  console.log('Shop The Collection')
}

function handlePhilosophy() {
  console.log('The Philosophy')
}

function handleSpecs(slide: Slide) {
  console.log('Slide actual:', slide)
}

function handleReservationSubmit(payload: {
  name: string
  email: string
  product: string
}) {
  console.log('Reservation:', payload)
}
</script>

<template>
  <HeroComponent
    @shop-collection="handleShopCollection"
    @philosophy="handlePhilosophy"
  />
  <MarqueeSection />
  <ProductSlider :slide-scenes="productSlideScenes" @specs-click="handleSpecs" />
  <FeaturesSection />
  <CountdownSection :days-from-now="8" />
  <ReservationSection @submit="handleReservationSubmit" />
  <MainFooter />
  <FloatingActionMenu />
</template>