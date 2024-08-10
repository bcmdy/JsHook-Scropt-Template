import 'frida-il2cpp-bridge'
import { Mod } from './mod'

export const hook = () => {
    console.log('start hook');
    Il2Cpp.perform(() => {
        console.log(Mod.var.test, 1);
        console.log('unity Version: ', Il2Cpp.unityVersion);
    });
}