const fs = require('fs')
const path = require('path')

const docsDir = './docs'
const distDir = './.vitepress/dist'
const outFile = path.join(distDir, 'graph-data.json')

if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
  console.log(`Создана папка ${distDir}`)
}

const nodes = []
const edges = new Set()

function scan(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      scan(full)
      continue
    }
    if (!entry.name.endsWith('.md')) continue

    const rel = path.relative(docsDir, full).replace(/\.md$/, '')
    const id = rel
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-/]/g, '')

    nodes.push({
      data: {
        id,
        label: rel || 'Home'
      }
    })

    const content = fs.readFileSync(full, 'utf-8')
    const matches = content.matchAll(/\[\[(.+?)(?:\|[^[\]]+)?\]\]/g)
    for (const match of matches) {
      let target = match[1].trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-/]/g, '')

      if (target && target !== id) { 
        edges.add(JSON.stringify({ source: id, target }))
      }
    }
  }
}

scan(docsDir)

const edgeArray = Array.from(edges).map(JSON.parse)

const data = { nodes, edges: edgeArray }
fs.writeFileSync(outFile, JSON.stringify(data, null, 2))

console.log(`Сгенерировано ${nodes.length} узлов и ${edgeArray.length} рёбер → ${outFile}`)