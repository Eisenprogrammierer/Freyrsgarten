<template>
  <div :key="theme" ref="diagramRef" class="mermaid" :style="{ minHeight: fixedHeight }">
    {{ value }}
  </div>
</template>

<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, ref, watch, nextTick } from 'vue'
import mermaid from 'mermaid'

const props = defineProps<{ value: string }>()

const { isDark } = useData()
const theme = computed(() => isDark.value ? 'dark' : 'default')
const diagramRef = ref<HTMLElement | null>(null)
const fixedHeight = ref('auto')

mermaid.initialize({ startOnLoad: false, theme: theme.value })

watch(diagramRef, async () => {
  const el = diagramRef.value
  if (!el) return

  await nextTick()

  mermaid.initialize({ startOnLoad: false, theme: theme.value })

  el.removeAttribute('data-processed')

  try {
    await mermaid.run({ nodes: [el] })

    setTimeout(() => {
      if (el) {
        const h = el.offsetHeight
        if (h > 0) fixedHeight.value = `${h}px`
      }
    }, 100)
  } catch (err) {
    console.error('Mermaid render error:', err)
  }
}, { immediate: true })
</script>

<style scoped>
.mermaid {
  display: flex;
  justify-content: center;
  margin: 1rem 0;
  opacity: 0;
  transition: opacity 300ms ease;
}

.mermaid:has(> svg) {
  opacity: 1;
}
</style>
