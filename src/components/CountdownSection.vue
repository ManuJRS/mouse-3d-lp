<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { tm } = useI18n()

const props = withDefaults(
  defineProps<{
    daysFromNow?: number
  }>(),
  { daysFromNow: 8 },
)

const countdownSection = computed(() => {
  const raw = tm('countdownSection') as
    | { eyebrow?: string; title?: string; labels?: Record<string, string> }
    | undefined
  const labels = raw?.labels ?? {}
  return {
    eyebrow: raw?.eyebrow ?? '',
    title: raw?.title ?? '',
    labels: {
      days: labels.days ?? 'Days',
      hours: labels.hours ?? 'Hours',
      minutes: labels.minutes ?? 'Minutes',
      seconds: labels.seconds ?? 'Seconds',
    },
  }
})

const timeLeft = ref({
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
})

const cards = computed(() => {
  const section = countdownSection.value
  return [
    { label: section.labels.days, value: timeLeft.value.days },
    { label: section.labels.hours, value: timeLeft.value.hours },
    { label: section.labels.minutes, value: timeLeft.value.minutes },
    { label: section.labels.seconds, value: timeLeft.value.seconds },
  ]
})

let intervalId: number | undefined

function pad(value: number) {
  return String(value).padStart(2, '0')
}

function startCountdown() {
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + props.daysFromNow)

  function update() {
    const now = new Date().getTime()
    const distance = targetDate.getTime() - now

    if (distance <= 0) {
      timeLeft.value = {
        days: '00',
        hours: '00',
        minutes: '00',
        seconds: '00',
      }

      if (intervalId) {
        clearInterval(intervalId)
      }
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    timeLeft.value = {
      days: pad(days),
      hours: pad(hours),
      minutes: pad(minutes),
      seconds: pad(seconds),
    }
  }

  update()
  intervalId = window.setInterval(update, 1000)
}

onMounted(() => {
  startCountdown()
})

onBeforeUnmount(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <section id="countdown" class="overflow-hidden border-t border-white/5 bg-brand-dark py-20">
    <div class="mx-auto max-w-7xl px-6 text-center">
      <span
        class="mb-6 block text-[10px] font-bold uppercase tracking-[0.4em] text-[#003366]"
      >
        {{ countdownSection.eyebrow }}
      </span>

      <h2 class="gradient-text mb-16 text-4xl font-bold tracking-tight md:text-5xl">
        {{ countdownSection.title }}
      </h2>

      <div class="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
        <div
          v-for="card in cards"
          :key="card.label"
          class="timer-card group relative overflow-hidden rounded-2xl p-8 backdrop-blur-sm md:p-12"
        >
          <div class="relative z-10">
            <span class="mb-2 block text-5xl font-bold tracking-tighter md:text-7xl">
              {{ card.value }}
            </span>
            <span
              class="text-brand-muted text-[10px] font-bold uppercase tracking-[0.3em]"
            >
              {{ card.label }}
            </span>
          </div>

          <div
            class="absolute inset-0 translate-y-full bg-white/5 transition-transform duration-500 group-hover:translate-y-0"
          ></div>
        </div>
      </div>
    </div>
  </section>
</template>