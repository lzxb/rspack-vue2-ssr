import { defineServer } from '@gez/core'
import { createRenderer } from 'vue-server-renderer';
import { createApp } from './create-app';

export default defineServer({
  async render(context) {
    const { app } = createApp()
    const html = await createRenderer({}).renderToString(app)
    const name = await import('./test').then(m => m.getName())
    context.html = `
    <!DOCTYPE html>
    <html>
    <head>
    </head>
    <body>
    ${name}
    ${html}
    </body>
    </html>
`
    context.insertHtml(`<script type="module" src="/ssr-rspack-vue2/js/app.js"></script>`, 'bodyBefore')
  }
})