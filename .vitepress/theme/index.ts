import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Backlinks from '../components/Backlinks.vue'
import VitePressMermaid from '../plugins/vitepress-mermaid/index.vue'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Backlinks)
    })
  },

  enhanceApp({ app }) {
    app.component('vitepress-mermaid', VitePressMermaid)
  }
}