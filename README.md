# JsHook-Script-Template

JsHook Il2cpp游戏Mod空模板

##  Fork自

本项目主体Fork自[FlxMod-template2](https://github.com/FlxMod/FlxMod-template2)

##  更新

1. 升级了frida-il2cpp-bridge库, 并对frida-il2cpp-bridge进行改写使其兼容旧版frida-compile支持库

2. 更新callbackBuild使其适配JsHook>=1.2.5的菜单id生产规则

3. 添加部分方法

4. 添加Github Actions自动脚本, 提交更改后自动编译并打包发布脚本, 懒人福音(虽然感觉没什么用)

##  环境

Node.js, npm, python, pip, frida, frida-tools

其中python与pip不是必须, 用来装frida的, 如果你有其他方法安装frida, 请自行解决

##  使用

`npm run dev` or `npm run build`

##  注意

如果你使用非Windows环境, 除了上述环境需要, 在克隆仓库后请使用``chmod +x -R ./JsHook-Scropt-Template``命令授予执行权限
