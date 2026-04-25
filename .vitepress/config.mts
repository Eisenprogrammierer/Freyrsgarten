import { defineConfig } from 'vitepress'
import wikilinks from 'markdown-it-wikilinks'
import katex from 'markdown-it-katex'
import { generateSidebar } from 'vitepress-sidebar'

export default defineConfig({
  srcDir: 'docs',
  base: '/Freyrsgarten/',
  title: 'Freyrsgarten',
  description: 'Digital garden made by enthusiast for enthusiasts',

  cleanUrls: true,

  markdown: {
    config: (md) => {
      md.use(wikilinks({
        baseURL: '/Freyrsgarten/',
        makeAllLinksAbsolute: true,
        uriSuffix: '',
        postProcessPageName: (name) =>
          name.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
      }))

      md.use(katex, { throwOnError: false, strict: false })
      md.use(require('./plugins/vitepress-mermaid').mermaidPlugin)
    }
  },

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Граф', link: '/graph' }
    ],

    sidebar: generateSidebar({
      documentRootPath: '/docs',
      useTitleFromFrontmatter: true,
      useFolderTitleFromFrontmatter: true,
      useFolderLinkFromFrontmatter: true,
      collapsed: true,
      collapseDepth: 1,
      sortFolderFirst: true,
      includeEmptyFolder: false,
      hyphenToSpace: true,
      capitalizeFirst: true,
      excludePattern: [],
      includeRootIndexFile: true
    }),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Eisenprogrammierer/Freyrsgarten' }
    ],

    outline: 'deep'
  }
})
