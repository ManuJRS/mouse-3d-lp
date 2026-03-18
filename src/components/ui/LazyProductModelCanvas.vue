<script setup lang="ts">
import { TresCanvas } from '@tresjs/core'
import { OrbitControls, useGLTF } from '@tresjs/cientos'
import { computed } from 'vue'

import type { SceneConfig } from '@/components/ProductSlider.vue'

type Props = {
  modelUrl: string
  sceneConfig: Required<SceneConfig>
}

const props = defineProps<Props>()

const { state: model } = useGLTF(props.modelUrl, {
  draco: true,
})
</script>

<template>
  <div class="w-full h-full">
    <TresCanvas clear-color="#050505">
      <TresPerspectiveCamera :position="sceneConfig.cameraPosition" />
      <TresAmbientLight :intensity="sceneConfig.ambientIntensity" />

      <TresDirectionalLight
        v-for="(light, i) in sceneConfig.directionalLights"
        :key="i"
        :position="light.position"
        :intensity="light.intensity"
      />

      <primitive v-if="model?.scene" :object="model.scene" />

      <OrbitControls
        :enable-damping="sceneConfig.orbit.enableDamping"
        :damping-factor="sceneConfig.orbit.dampingFactor"
        :auto-rotate="sceneConfig.orbit.autoRotate"
        :auto-rotate-speed="sceneConfig.orbit.autoRotateSpeed"
      />
    </TresCanvas>
  </div>
</template>

