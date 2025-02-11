import 'frida-il2cpp-bridge'
import { Mod } from './mod'
export const getMenu = () => {
    return [
        {
            type: 'tab',
            item: [
                {
                    title: 'tab1',
                    item: [
                        {
                            type: 'button',
                            title: 'Test1',
                            callback: (data) => {
                                console.log('这是 tab1 的 Test1');
                            }
                        },
                        {
                            type: 'slider',
                            title: 'slider1',
                            val: Mod.var.slider1,
                            min: 0,
                            max: 100,
                            callback: (data) => {
                                console.log(`Mod.var.slider1 changed: ${Mod.var.slider1} -> ${data.val}`);
                                Mod.var.slider1 = parseInt(data.val);
                            }
                        },
                        {
                            type: "switch",
                            title: "switch1",
                            val: Mod.var.switch1,
                            callback: (data) => {
                                console.log(`Mod.var.switch1 changed: ${Mod.var.switch1} -> ${data.val}`);
                                Mod.var.switch1 = data.val;
                            }
                        },
                        {
                            type: 'input',
                            title: 'Input Test',
                            val: Mod.var.test,
                            callback: (data) => {
                                console.log(`Mod.var.test changed: ${Mod.var.switch1} -> ${data.val}`);
                                Mod.var.test = data.val;
                            }
                        }
                    ]
                },
                {
                    title: '关于',
                    item: [
                        {
                            type: 'text',
                            val: 'Mod: ' + Mod.name
                        },
                        {
                            type: 'text',
                            val: 'Version: ' + Mod.version
                        },
                        {
                            type: 'text',
                            val: 'Build: ' + Mod.build
                        },
                        {
                            type: 'text',
                            val: 'CoreVersionCode: ' + runtime.coreVersionCode
                        },
                        {
                            type: 'button',
                            title: 'Dump unity',
                            callback: (data) => {
                                Il2Cpp.perform(() => {
                                    console.log(Il2Cpp.unityVersion);
                                    console.log('Dump Start');
                                    Il2Cpp.dump();
                                    console.log('Dump Complete');
                                });
                            }
                        }
                    ]
                }
            ],
            default: 1
        }
    ]
}

