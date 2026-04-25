<script setup>
import { useData } from 'vitepress'
import { ref, onMounted } from 'vue'

import backlinksRaw from '../../.vitepress/dist/backlinks.json?raw'

const { page } = useData()
const backlinks = ref([])

onMounted(() => {
  try {
    const map = JSON.parse(backlinksRaw)
    const current = page.value.relativePath.replace(/\.md$/, '')
    backlinks.value = map[current] || []
  } catch (e) {
    console.warn('backlinks не загрузились', e)
  }
})
</script>

<template>
  <div v-if="backlinks.length" class="backlinks">
    <h3>Обратные ссылки</h3>
    <ul>
      <li v-for="link in backlinks" :key="link">
        <a :href="`/${link}`">{{ link.replace(/-/g, ' ') }}</a>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.backlinks {
  margin: 3rem 0 1rem;
  padding-top: 2rem;
  border-top: 1px solid var(--vp-c-divider);
}
.backlinks h3 { margin: 0 0 1rem; font-size: 1.1rem; }
.backlinks ul { list-style: none; padding: 0; }
.backlinks li { margin: 0.4rem 0; }
</style>