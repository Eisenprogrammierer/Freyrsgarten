import type MarkdownIt from 'markdown-it'

export const mermaidPlugin = (md: MarkdownIt) => {
  const fence = md.renderer.rules.fence!

  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    if (token.info.trim() === 'mermaid') {
      const code = token.content.trim()
      return `<vitepress-mermaid value="${md.utils.escapeHtml(code)}"></vitepress-mermaid>\n`
    }
    return fence(...args)
  }
}