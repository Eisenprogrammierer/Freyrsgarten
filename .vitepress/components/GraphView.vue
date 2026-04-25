<script setup>
import { onMounted } from 'vue'
import cytoscape from 'cytoscape'

import graphRaw from '../../.vitepress/dist/graph-data.json?raw'

onMounted(() => {
  try {
    const data = JSON.parse(graphRaw)
    const elements = [
      ...data.nodes,
      ...data.edges.map(e => ({ data: e }))
    ]

    cytoscape({
      container: document.getElementById('cy'),
      elements: elements,
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(label)',
            'color': '#fff',
            'text-valign': 'center',
            'font-size': '12px',
            'width': 40,
            'height': 40
          }
        },
        {
          selector: 'edge',
          style: {
            'width': 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier'
          }
        }
      ],
      layout: { name: 'cose', animate: true }
    })
  } catch (e) {
    console.error('Не удалось загрузить граф', e)
  }
})
</script>

<template>
  <div id="cy" style="width: 100%; height: 70vh; border: 1px solid #444; border-radius: 8px;"></div>
</template>