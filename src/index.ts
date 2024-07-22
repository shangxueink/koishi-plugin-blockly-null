import {Context, Schema} from 'koishi'
import  { resolve } from 'path'
import {BlocklyService} from "./service";
import {BlocklyProvider, initializeDatabase} from "./data";
import {initializeConsoleApiBacked} from "./console";
import {registerStaticFileRoute} from "./static";
import {BlocklyVendorDataService} from "./vendor";

export const name = 'blockly'

export interface Config {}

export const Config: Schema<Config> = Schema.object({})

export const inject = {required: ["database","console","puppeteer"]}

export async function apply(ctx: Context) {
  ctx.plugin(BlocklyService)
  ctx.plugin(BlocklyProvider)
  ctx.using(['blockly'],()=>ctx.plugin(BlocklyVendorDataService))

  await initializeDatabase(ctx);

  ctx.using(['console','blockly','server'], (ctx) => {
    ctx.console.addEntry({
      dev: resolve(__dirname, '../client/index.ts'),
      prod: resolve(__dirname, '../dist'),
    })
    ctx.blockly.reload(true)
  })

  initializeConsoleApiBacked(ctx)

  registerStaticFileRoute(ctx)

}

export * from './structure'
export * from "./data";
export * from "./plugin"
export * from "./service"
export * from "./static"
export * from './console'
export * from './transpiler'
export * from './vendor'
