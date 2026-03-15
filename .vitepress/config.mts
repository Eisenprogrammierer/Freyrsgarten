import { defineConfig } from 'vitepress'
import wikilinks from 'markdown-it-wikilinks'

export default defineConfig({
  srcDir: "docs",
  base: "/Freyrsgarten/",
  title: "Freyrsgarten",
  description: "Digital garden made by enthusiast for enthusiasts",

  themeConfig: {
    nav: [{ text: 'Home', link: '/' }],
    sidebar: [ /* твои items */ ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/Eisenprogrammierer/Freyrsgarten' }]
  },

  markdown: {
    config: (md) => {
      md.use(
        wikilinks({
          baseURL: '/Freyrsgarten/',
          makeAllLinksAbsolute: true,
          uriSuffix: '',
          postProcessPageName: (name) => {
            return name.trim().toLowerCase().replace(/\s+/g, '-')
          }
        })
      )
    }
  }
})