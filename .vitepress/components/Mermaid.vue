<template>
  <div ref="diagram" class="mermaid" :key="theme">{{ value }}</div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import { useData } from 'vitepress'
import mermaid from 'mermaid'

const props = defineProps({ value: String })
const { isDark } = useData()
const theme = computed(() => isDark.value ? 'dark' : 'default')
const diagram = ref(null)

mermaid.initialize({ startOnLoad: false, theme: theme.value })

watch(diagram, async () => {
  await nextTick()
  diagram.value.removeAttribute('data-processed')
  await mermaid.run({ nodes: [diagram.value] })
})
</script>

<style scoped>
.mermaid { margin: 1.5rem 0; }
</style>
