const fs = require('fs')
const path = require('path')

const docsDir = './docs'
const distDir = './.vitepress/dist'
const graphOut = path.join(distDir, 'graph-data.json')
const backlinksOut = path.join(distDir, 'backlinks.json')

// Создаём dist, если нет
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

const nodes = []
const edges = new Set()
const backlinksMap = {}

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

    nodes.push({ data: { id, label: rel || 'Home' } })
    backlinksMap[id] = []

    const content = fs.readFileSync(full, 'utf-8')
    const matches = content.matchAll(/\[\[(.+?)(?:\|[^[\]]+)?\]\]/g)
    for (const match of matches) {
      let target = match[1].trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-/]/g, '')

      if (target && target !== id) {
        edges.add(JSON.stringify({ source: id, target }))
        backlinksMap[id].push(target)
      }
    }
  }
}

scan(docsDir)

const edgeArray = Array.from(edges).map(JSON.parse)

fs.writeFileSync(graphOut, JSON.stringify({ nodes, edges: edgeArray }, null, 2))
fs.writeFileSync(backlinksOut, JSON.stringify(backlinksMap, null, 2))

console.log(`Граф: ${nodes.length} узлов, ${edgeArray.length} связей`)
console.log(`Backlinks: для ${Object.keys(backlinksMap).length} страниц`)