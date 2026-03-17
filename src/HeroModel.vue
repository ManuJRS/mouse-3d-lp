<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'

const modelPath = new URL('./assets/models/gaming_mouse.glb', import.meta.url).href
const { state: model } = useGLTF(modelPath)
</script>

<template>
  <div class="w-full h-screen">
    <TresCanvas>
      <TresPerspectiveCamera :position="[0, 0, 5]" />

      <TresAmbientLight :intensity="1" />
      <TresDirectionalLight :position="[2, 2, 2]" />

      <primitive v-if="model?.scene" :object="model.scene" />

      <OrbitControls />
    </TresCanvas>
  </div>
</template>