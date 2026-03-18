<script setup lang="ts">
import router from '@/router'
import MainNavbar from '@/layout/MainNavbar.vue'
function handleLanguageChange(_language: { code: string; label: string }) {
  // TODO: integrar cambio de idioma / navegación
}

function handleNavClick(_item: { key?: string; label?: string; href: string }) {
  // TODO: navegación o tracking
}

function handleBrandClick() {
  // TODO: scroll to top o navegación
}
</script>

<template> 
  <MainNavbar :on-language-change="handleLanguageChange" :on-nav-click="handleNavClick" :on-brand-click="handleBrandClick" />
  <RouterView />
</template>