const fs = require('fs')
const path = require('path')

const docsDir = './docs'
const outFile = './.vitepress/dist/graph-data.json'

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
    const id = rel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-/]/g, '')

    nodes.push({
      data: {
        id,
        label: rel || 'Home'
      }
    })

    const content = fs.readFileSync(full, 'utf-8')
    const matches = content.matchAll(/\[\[(.+?)(?:\|[^[\]]+)?\]\]/g)
    for (const match of matches) {
      let target = match[1].trim().toLowerCase().replace(/\s+/g, '-')
      if (target) {
        edges.add(JSON.stringify({ source: id, target }))
      }
    }
  }
}

scan(docsDir)

const edgeArray = Array.from(edges).map(JSON.parse)

fs.writeFileSync(outFile, JSON.stringify({ nodes, edges: edgeArray }, null, 2))
console.log(`Сгенерировано ${nodes.length} узлов и ${edgeArray.length} связей`)
