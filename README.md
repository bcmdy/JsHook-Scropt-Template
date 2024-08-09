# JsHook-Scropt-Template
JsHook Il2cpp游戏Mod空模板

本项目主体Fork自[FlxMod-template2](https://github.com/FlxMod/FlxMod-template2)

1.升级了frida-il2cpp-bridge库, 并对frida-il2cpp-bridge进行改写使其兼容旧版frida-compile支持库

2.修复了部分bug

3.更新callbackBuild使其适配JsHook>=1.2.5的菜单id生产规则

4.添加Github Actions自动脚本, 提交更改后自动编译并打包发布脚本, 懒人福音(虽然感觉没什么用)

## Usage

`npm run dev` or `npm run build`

