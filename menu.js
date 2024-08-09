import 'frida-il2cpp-bridge'
import { Mod } from './mod'
export const getMenu = () => {
    return [
        {
            'type': 'tab',
            'item': [
                {
                    'title': 'tab1',
                    'item': [
                        {
                            'type': 'button',
                            'title': 'Test1',
                            'callback': (res) => {
                                console.log('这是 tab1 的 Test1');
                            }
                        },
                        {
                            'type': 'button',
                            'title': 'Test2',
                            'callback': (res) => {
                                console.log('这是 tab1 的 Test2');
                            }
                        },
                        {
                            'type': 'button',
                            'title': 'Test3',
                            'callback': (res) => {
                                console.log('这是 tab1 的 Test3');
                            }
                        },
                        {
                            'type': 'input',
                            'title': 'Input Test',
                            'val': Mod.var.test.toString(),
                            'callback': (res) => {
                                console.log(res.val);
                                Mod.var.test = res.val;
                                console.log('Mod.var.test: ' + Mod.var.test);
                            }
                        }
                    ]
                },
                {
                    'title': '关于',
                    'item': [
                        {
                            'type': 'text',
                            'val': 'Mod: ' + Mod.name
                        },
                        {
                            'type': 'text',
                            'val': 'Version: ' + Mod.version
                        },
                        {
                            'type': 'text',
                            'val': 'Build: ' + Mod.build
                        },
                        {
                            'type': 'text',
                            'val': 'CoreVersionCode: ' + runtime.coreVersionCode
                        },
                        {
                            'type': 'button',
                            'title': 'Dump unity',
                            'callback': (val) => {
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
            'default': 1
        }
    ]
}   