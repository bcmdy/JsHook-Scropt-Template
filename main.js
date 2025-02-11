import { Mod } from './mod'
import { hook } from './hook'
import { getMenu } from './menu'

export const start = () => {
    Mod.var.test = 'Mod.var.test';// 不建议这种变量写法, 调用时不能自动补全, 建议直接在mod.js中定义
    Mod.Init('JsHook-Script', getMenu, hook, '1.0.0', '20250127');
}