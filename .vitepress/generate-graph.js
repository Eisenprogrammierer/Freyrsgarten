const fs = require('fs')
const path = require('path')

const docsDir = './docs'
const outDir = './.vitepress'

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const nodes = []
const edges = new Set()
const backlinks = {}

function scan(dir) {
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return scan(full)
    if (!entry.name.endsWith('.md')) return

    const rel = path.relative(docsDir, full).replace(/\.md$/, '')
    const id = rel.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-/]/g, '')

    console.log(`Найдена заметка: ${id} (${rel})`)

    nodes.push({ data: { id, label: rel || 'Home' } })
    backlinks[id] = []

    const content = fs.readFileSync(full, 'utf8')
    const matches = [...content.matchAll(/\[\[(.+?)(?:\|[^[\]]+)?\]\]/g)]

    matches.forEach(m => {
      let target = m[1].trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-/]/g, '')
      if (target && target !== id) {
        edges.add(JSON.stringify({ source: id, target }))
        backlinks[id].push(target)
      }
    })
  })
}

scan(docsDir)

const edgeArray = Array.from(edges).map(JSON.parse)


fs.writeFileSync(path.join(outDir, 'graph-data.json'), JSON.stringify({ nodes, edges: edgeArray }, null, 2))
fs.writeFileSync(path.join(outDir, 'backlinks.json'), JSON.stringify(backlinks, null, 2))

console.log(`Готово: ${nodes.length} заметок, ${edgeArray.length} связей`)