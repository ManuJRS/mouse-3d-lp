<script setup lang="ts">
import router from '@/router'
import MainNavbar from '@/layout/MainNavbar.vue'
function handleLanguageChange(language: { code: string; label: string }) {
  console.log('Idioma seleccionado:', language)
}

function handleNavClick(item: { label: string; href: string }) {
  console.log('Nav item:', item)
}

function handleBrandClick() {
  console.log('Brand click')
}
</script>

<template> 
  <MainNavbar :on-language-change="handleLanguageChange" :on-nav-click="handleNavClick" :on-brand-click="handleBrandClick" />
  <RouterView />
</template>