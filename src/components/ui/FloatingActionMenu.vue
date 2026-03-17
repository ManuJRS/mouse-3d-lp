<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Plus } from 'lucide-vue-next'

type MenuOption = {
  label: string
  onClick: () => void
  icon?: any
}

const props = withDefaults(
  defineProps<{
    options: MenuOption[]
    className?: string
  }>(),
  {
    className: '',
  },
)

const isOpen = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function toggleMenu() {
  isOpen.value = !isOpen.value
}

function closeMenu() {
  isOpen.value = false
}

function handleOptionClick(option: MenuOption) {
  option.onClick()
  closeMenu()
}

function handleClickOutside(event: MouseEvent) {
  const target = event.target as Node

  if (rootRef.value && !rootRef.value.contains(target)) {
    closeMenu()
  }
}

function handleEscape(event: KeyboardEvent) {
  if (event.key === 'Escape') {
    closeMenu()
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
  <div
    ref="rootRef"
    :class="['fixed bottom-8 right-8 z-[80]', className]"
  >
    <button
      type="button"
      class="flex h-10 w-10 items-center justify-center rounded-full bg-[#11111198] shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[#111111d1] hover:cursor-pointer"
      @click.stop="toggleMenu"
    >
      <Plus
        class="h-6 w-6 transition-transform duration-300"
        :class="{ 'rotate-45': isOpen }"
      />
    </button>

    <Transition name="menu-fade">
      <div
        v-if="isOpen"
        class="absolute bottom-12 right-0 mb-2"
      >
        <TransitionGroup
          name="menu-item"
          tag="div"
          class="flex flex-col items-end gap-2"
        >
          <button
            v-for="(option, index) in options"
            :key="`${option.label}-${index}`"
            type="button"
            class="flex items-center gap-2 rounded-xl bg-[#11111198] px-3 py-2 text-sm text-white shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-colors duration-300 hover:bg-[#111111d1]"
            @click="handleOptionClick(option)"
          >
            <component
              :is="option.icon"
              v-if="option.icon"
              class="h-4 w-4"
            />
            <span>{{ option.label }}</span>
          </button>
        </TransitionGroup>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.menu-fade-enter-active,
.menu-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease, filter 0.25s ease;
}

.menu-fade-enter-from,
.menu-fade-leave-to {
  opacity: 0;
  transform: translate(10px, 10px);
  filter: blur(10px);
}

.menu-item-enter-active,
.menu-item-leave-active {
  transition: all 0.25s ease;
}

.menu-item-enter-from,
.menu-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>