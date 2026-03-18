<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'

type NavItem = {
  key: string
  href: string
  label?: string
}

type LanguageItem = {
  code: string
  label: string
}

const { locale, t } = useI18n()

const props = withDefaults(
  defineProps<{
    brand?: string
    navItems?: NavItem[]
    languages?: LanguageItem[]
  }>(),
  {
    brand: 'AURA',
    navItems: () => [
      { key: 'products', href: '#products' },
      { key: 'performance', href: '#performance' },
      { key: 'countdown', href: '#countdown' },
      { key: 'reservation', href: '#reservation' },
    ],
    languages: () => [
      { code: 'ja', label: '日本語' },
      { code: 'en', label: 'English' },
    ],
  },
)

const emit = defineEmits<{
  languageChange: [language: LanguageItem]
  navClick: [item: NavItem]
  brandClick: []
}>()

const isLanguageMenuOpen = ref(false)

const currentLangLabel = computed(() => {
  const lang = props.languages.find((l) => l.code === locale.value)
  return lang?.label ?? locale.value.toUpperCase()
})

function toggleLanguageMenu() {
  isLanguageMenuOpen.value = !isLanguageMenuOpen.value
}

function closeLanguageMenu() {
  isLanguageMenuOpen.value = false
}

function selectLanguage(language: LanguageItem) {
  locale.value = language.code
  localStorage.setItem('locale', language.code)
  emit('languageChange', language)
  closeLanguageMenu()
}

function handleNavClick(item: NavItem) {
  emit('navClick', item)
}

function handleBrandClick() {
  emit('brandClick')
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as HTMLElement
  const dropdown = document.getElementById('language-dropdown-container')

  if (dropdown && !dropdown.contains(target)) {
    closeLanguageMenu()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeLanguageMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscape)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscape)
})
</script>

<template>
  <nav class="glass-effect fixed top-0 z-50 w-full">
    <div class="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
      <button
        type="button"
        class="flex items-center gap-2"
        data-purpose="brand-logo"
        @click="handleBrandClick"
      >
      <svg width="200" height="40" viewBox="0 0 250 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="30" cy="30" r="25" fill="#003366" />
        <path d="M10 22H50M5 30H55M10 38H50" stroke="white" stroke-width="3" stroke-linecap="round"/>
        <circle cx="45" cy="15" r="5" fill="#FF0033" />
        
        <text x="70" y="35" font-family="Arial, sans-serif" font-weight="800" font-size="24" fill="#1A1A1A">AURA</text>
        <text x="145" y="35" font-family="Arial, sans-serif" font-weight="300" font-size="24" fill="#003366">TOKYO</text>
        
        <text x="72" y="52" font-family="Arial, sans-serif" font-size="8" letter-spacing="2" fill="#666666">PRECISION & FUTURE</text>
      </svg>

      </button>

      <div class="hidden items-center gap-10 text-[13px] font-medium tracking-wide text-brand-muted md:flex">
        <a
          v-for="item in navItems"
          :key="item.key"
          :href="item.href"
          class="transition-colors hover:text-white"
          @click="handleNavClick(item)"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </div>

      <div class="flex items-center gap-4">
        <div
          id="language-dropdown-container"
          class="relative"
        >
          <button
            type="button"
            class="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium transition-all hover:bg-white/10 hover:cursor-pointer"
            @click.stop="toggleLanguageMenu"
          >
            <span class="material-symbols-outlined notranslate text-sm" translate="no">language</span>
            <span>{{ currentLangLabel }}</span>
            <span
              class="material-symbols-outlined notranslate text-xs transition-transform duration-200"
              translate="no"
              :class="{ 'rotate-180': isLanguageMenuOpen }"
            >
              expand_more
            </span>
          </button>

          <Transition name="dropdown-fade">
            <div
              v-if="isLanguageMenuOpen"
              class="absolute right-0 z-[100] mt-2 w-40 origin-top-right rounded-xl border border-white/10 bg-brand-dark shadow-2xl backdrop-blur-xl"
            >
              <div class="py-2">
                <button
                  v-for="language in languages"
                  :key="language.code"
                  type="button"
                  class="flex w-full items-center px-4 py-2 text-left text-[11px] font-medium transition-colors hover:cursor-pointer"
                  :class="
                    locale === language.code
                      ? 'justify-between text-white hover:bg-white/10'
                      : 'text-brand-muted hover:bg-white/10 hover:text-white'
                  "
                  @click="selectLanguage(language)"
                >
                  <span>{{ language.label }}</span>

                  <span
                    v-if="locale === language.code"
                    class="h-1 w-1 rounded-full bg-blue-500"
                  ></span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
  transform-origin: top right;
}

.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-6px) scale(0.98);
}
</style>