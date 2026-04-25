import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import Backlinks from '../components/Backlinks.vue'
import VitePressMermaid from '../plugins/vitepress-mermaid/index.vue'
import GraphView from '../components/GraphView.vue'

export default {
  extends: DefaultTheme,

  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'doc-after': () => h(Backlinks)
    })
  },

  enhanceApp({ app }) {
    app.component('vitepress-mermaid', VitePressMermaid)
    app.component('GraphView', GraphView)
  }
}