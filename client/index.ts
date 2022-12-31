import {  } from '@koishijs/plugin-console/dist'
import { Context } from '@koishijs/client'
import Page from './page.vue'

export default (ctx: Context) => {
  ctx.page({
    name: 'Blockly 可视化编程',
    path: '/blockly',
    authority: 5,
    component: Page,
    fields:['blockly']
  })
}
