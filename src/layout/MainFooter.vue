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
    copyright: '© 2024 Aura Gaming Tech. Engineered in Tokyo.',
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
  <footer class="border-t border-white/5 bg-brand-dark pb-10 pt-20">
    <div class="mx-auto max-w-7xl px-6">
      <div class="mb-20 grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
        <div class="col-span-2 lg:col-span-1">
          <button
            type="button"
            class="mb-8 flex items-center gap-2"
            data-purpose="footer-logo"
            @click="handleLogoClick"
          >
            <div class="h-6 w-6 rounded-sm bg-white"></div>
            <span class="text-lg font-bold uppercase tracking-tighter">
              {{ brand }}
            </span>
          </button>

          <p class="max-w-xs text-xs uppercase tracking-wider text-brand-muted leading-relaxed">
            {{ description }}
          </p>
        </div>

        <div
          v-for="group in groups"
          :key="group.title"
          class="space-y-4"
        >
          <h4 class="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
            {{ group.title }}
          </h4>

          <ul class="space-y-3 text-xs text-brand-muted">
            <li
              v-for="link in group.links"
              :key="link.label"
            >
              <a
                :href="link.href"
                class="transition-colors hover:text-white"
                @click="handleLinkClick(link)"
              >
                {{ link.label }}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="flex flex-col items-center justify-between border-t border-white/5 pt-10 text-[9px] uppercase tracking-[0.3em] text-brand-muted md:flex-row"
      >
        <p>{{ copyright }}</p>

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