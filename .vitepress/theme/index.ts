import DefaultTheme from 'vitepress/theme'
import 'katex/dist/katex.min.css'
import VitePressMermaid from '../plugins/vitepress-mermaid/index.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('vitepress-mermaid', VitePressMermaid)
  }
}
