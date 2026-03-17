<script setup lang="ts">
import HeroModel from '../HeroModel.vue'
import HeroComponent from '../components/HeroComponent.vue'
import MarqueeSection from '../components/MarqueeSection.vue'
import ProductSlider from '../components/ProductSlider.vue'
import FeaturesSection from '../components/FeaturesSection.vue'
import CountdownSection from '../components/CountdownSection.vue'
import ReservationSection from '../components/ReservationSection.vue'
import MainFooter from '../layout/MainFooter.vue'
import FloatingActionMenu from '../components/ui/FloatingActionMenu.vue'
import { User, Settings, LogOut } from 'lucide-vue-next'

const menuOptions = [
  {
    label: 'Account',
    icon: User,
    onClick: () => console.log('Account clicked'),
  },
  {
    label: 'Settings',
    icon: Settings,
    onClick: () => console.log('Settings clicked'),
  },
  {
    label: 'Logout',
    icon: LogOut,
    onClick: () => console.log('Logout clicked'),
  },
]

function handleSpecs(slide: any) {
  console.log('Slide actual:', slide)
}

</script>

<template>
  <HeroComponent />
  <MarqueeSection />
  <ProductSlider :on-specs="handleSpecs" />
  <FeaturesSection />
  <CountdownSection />
  <ReservationSection />
  <MainFooter />
  <FloatingActionMenu :options="menuOptions" />
</template>