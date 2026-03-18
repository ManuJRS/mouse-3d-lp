<script setup lang="ts">
type FooterLink = {
  label: string
  href: string
}

type FooterGroup = {
  title: string
  links: FooterLink[]
}

const props = withDefaults(
  defineProps<{
    brand?: string
    description?: string
    groups?: FooterGroup[]
    bottomLinks?: FooterLink[]
    copyright?: string
  }>(),
  {
    brand: 'Aura',
    description:
      'Designing the future of competitive gaming technology with a minimalist approach.',
    groups: () => [
      {
        title: 'Hardware',
        links: [
          { label: 'Aura Pro Mouse', href: '#' },
          { label: 'Core Keyboard', href: '#' },
          { label: 'Sonic Audio', href: '#' },
          { label: 'Surface Pads', href: '#' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#' },
          { label: 'Laboratory', href: '#' },
          { label: 'Esports', href: '#' },
          { label: 'Contact', href: '#' },
        ],
      },
      {
        title: 'Support',
        links: [
          { label: 'Firmware', href: '#' },
          { label: 'Warranty', href: '#' },
          { label: 'Order Track', href: '#' },
          { label: 'Returns', href: '#' },
        ],
      },
      {
        title: 'Social',
        links: [
          { label: 'Twitter', href: '#' },
          { label: 'Instagram', href: '#' },
          { label: 'Discord', href: '#' },
        ],
      },
    ],
    bottomLinks: () => [
      { label: 'Privacy', href: '#' },
      { label: 'Terms', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
    copyright: '© 2025 Aura Gaming Tech. Engineered in Tokyo.',
  },
)

const emit = defineEmits<{
  logoClick: []
  linkClick: [link: FooterLink]
}>()

function handleLogoClick() {
  emit('logoClick')
}

function handleLinkClick(link: FooterLink) {
  emit('linkClick', link)
}
</script>

<template>
  <footer class="bg-brand-dark pb-10">
    <div class="px-6">
      <div
        class="flex flex-col items-center justify-between border-t border-white/5 pt-10 text-[9px] uppercase tracking-[0.3em] text-brand-muted md:flex-row"
      >
        <p class="text-center">{{ copyright }}</p>
        <div class="mt-6 flex gap-8 md:mt-0">
          <a
            v-for="link in bottomLinks"
            :key="link.label"
            :href="link.href"
            class="transition-colors hover:text-white"
            @click="handleLinkClick(link)"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>