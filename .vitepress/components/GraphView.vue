<script setup>
import { onMounted } from 'vue'
import cytoscape from 'cytoscape'

onMounted(async () => {
  try {
    const res = await fetch('/Freyrsgarten/graph-data.json')
    const { nodes, edges } = await res.json()

    cytoscape({
      container: document.getElementById('cy'),
      elements: [...nodes, ...edges],
      style: [
        {
          selector: 'node',
          style: {
            'background-color': '#666',
            'label': 'data(label)',
            'color': '#fff',
            'text-valign': 'center',
            'font-size': '12px'
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
      layout: { name: 'cose', animate: false }
    })
  } catch (e) {
    console.error('Не удалось загрузить граф', e)
  }
})
</script>

<template>
  <div id="cy" style="width: 100%; height: 70vh; border: 1px solid #444; border-radius: 8px;"></div>
</template>
