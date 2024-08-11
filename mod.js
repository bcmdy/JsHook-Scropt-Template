export const Mod = {
    name: '',
    version: '',
    build: '',
    menu: [],
    callbacks: {},
    var: {
        switch1: false,
        slider1: 0,
    },
    /**
     * 初始化模块
     * @param {string} name - 模块名称
     * @param {function} getMenu - 获取菜单的函数
     * @param {function} hook - 模块的钩子函数
     * @param {string} [version=''] - 模块版本号
     * @param {string} [build=''] - 模块构建号
     */
    Init: (name, getMenu, hook, version = '', build = '') => {
        // 设置模块名称
        Mod.name = name;
        // 设置获取菜单的函数
        Mod.getMenu = getMenu;
        // 设置模块的版本号
        Mod.version = version;
        // 设置模块的构建号
        Mod.build = build;
        // 设置模块的钩子函数
        Mod.startHook = hook;

        // 创建菜单
        Mod.createMenu();
        // 启动钩子函数
        Mod.startHook(Mod);
    },
    /**
     * 获取模块变量
     * @param {string} name - 变量名
     * @returns {any} 变量的值，如果不存在则返回 undefined
     */
    getVar: (name) => {
        // 如果变量存在，则返回变量的值
        // 否则返回 undefined
        return Mod.var[name] || undefined;
    },
    /**
     * 设置模块变量
     * @param {string} name - 变量名
     * @param {any} value - 变量的值
     * @returns {boolean} 如果变量已经存在，则设置成功，返回 true；否则返回 false
     */
    setVar: (name, value) => {
        // 检查变量是否已经存在
        if (Mod.var.hasOwnProperty(name)) {
            // 设置变量的值
            Mod.var[name] = value;
            // 设置成功，返回 true
            return true;
        }
        // 设置失败，返回 false
        return false;
    },
    /**
     * 构建回调函数索引和存储回调函数, 这是老版本
     * 将菜单中的回调函数添加到 Mod.callbacks 中
     * @returns {void}
     */
    callbackBuild_old: () => {
        let callbackindex = 1;
        const menu = Mod.getMenu(Mod);
        menu.forEach(e => {
            if (e.type == 'tab') {
                e.item.forEach(subItem => {
                    let tabitemindex = 1;
                    subItem.item.forEach(button => {
                        if (button?.callback) {
                            let key = callbackindex;
                            for (let index = 0; index < tabitemindex; index++) {
                                key += ('_' + (index + 2))
                            }
                            Mod.callbacks[key] = button.callback;
                        }
                        tabitemindex++;
                    })
                    callbackindex++;
                });
            } else {
                if (e?.callback) {
                    let key = '';
                    if (callbackindex != 1) {
                        for (let index = 0; index < callbackindex; index++) {
                            if (index == 0) {
                                key += (index + 1)
                            } else {
                                key += ('_' + (index + 1))
                            }
                        }
                    } else {
                        key = 1;
                    }
                    Mod.callbacks[key] = e.callback;
                }
                callbackindex++;
            }
        });
    },
    /**
     * 构建回调函数索引和存储回调函数
     * 将菜单中的回调函数添加到 Mod.callbacks 中
     * @returns {void}
     */
    callbackBuild: () => {
        let callbackIndex = 1; // 用于生成唯一键的回调函数索引
        // 获取菜单对象或数组
        const menu = Mod.getMenu(Mod);

        // 遍历菜单中的每个项
        menu.forEach(e => {
            // 检查菜单项是否为标签页类型
            if (e.type === 'tab') { // 如果是标签页
                // 标签页索引，用于生成唯一键
                let tabIndex = 1;
                e.item.forEach(subItem => {
                    // 标签页内项目索引
                    let tabItemIndex = 1;
                    subItem.item.forEach(button => {
                        // 如果按钮有回调函数，则创建一个唯一的键，并存储回调函数
                        if (button?.callback) {
                            // 生成回调函数的索引
                            const key = `${tabIndex}_${callbackIndex}_${tabItemIndex}`;
                            Mod.callbacks[key] = button.callback; // 将回调函数添加到 Mod.callbacks 中
                        }
                        // 更新标签页内项目的索引
                        tabItemIndex++;
                    });
                    // 更新回调函数索引
                    callbackIndex++;
                });
                // 更新标签页索引
                tabIndex++;
            } else { // 如果是单独的回调函数
                // 如果是单独的回调函数，则将其添加到 Mod.callbacks 中
                if (e?.callback) {
                    // 如果是第一个回调函数，则将其设置为回调函数表的第一个回调函数
                    const key = callbackIndex;
                    Mod.callbacks[key] = e.callback; // 将回调函数添加到 Mod.callbacks 中
                }
                // 更新回调函数索引
                callbackIndex++;
            }

        });
    },
    /**
     * 处理回调函数
     * @param {Object} val - 回调函数的参数
     * @property {string} val.id - 回调函数的索引
     * @property {*} val.* - 回调函数的其他参数
     */
    callbackHandle: (val) => {
        // 解析回调函数的参数
        console.log(`回调函数参数：${JSON.stringify(val)}`);
        // 如果存在回调函数，则执行回调函数
        if (Mod.callbacks[val.id]) {
            Mod.callbacks[val.id](val);
        }
    },
    /**
     * 创建菜单
     * 如果 是FridaMod框架, 则构建菜单并显示
     */
    createMenu: () => {
        // 如果 是FridaMod框架, 则构建菜单并显示
        if (typeof modmenu !== 'undefined') {
            // 判断JsHook版本, 适配新老版本不同id生成规则, 并构建菜单回调函数表
            const buildMenuCallback = runtime.coreVersionCode < 1208 ? Mod.callbackBuild_old : Mod.callbackBuild;
            buildMenuCallback();
            // 创建菜单
            // 参数1: 菜单名称
            // 参数2: 菜单项数组
            // 参数3: 菜单选项更改时的回调函数
            Mod.menuInstance = modmenu.create(Mod.name, Mod.getMenu(Mod), {
                // 菜单发生变化时的回调函数
                onchange: Mod.callbackHandle
            });
            // 菜单移动到居中位置
            Mod.menuInstance.position(5, 0, 0);
            // 调整菜单大小
            // Mod.menuInstance.size(parseInt(device.getScreenWidth() / 5 * 3), parseInt(device.getScreenHeight() / 7 * 3));
            // 显示菜单
            Mod.menuInstance.state();
        }
    },
    _thishandles: new Set(),  // 使用 Set 来存储实例
    /**
     * 延迟执行方法, 测试方法, 不保证可用
     * @param {Object} _this - this指针
     * @param {string} method - 方法名
     * @param {Array<any>} args - 方法参数
     * @param {number} time - 延迟时间（毫秒）
     * @returns {void}
     */
    _sleep: (_this, method, args, time) => {
        // 使用 setTimeout 来延迟执行方法
        const handleKey = _this.handle.toString();
        if (!Mod._thishandles.has(handleKey)) {
            const t = setTimeout(() => {
                Mod._thishandles.add(handleKey); // 将实例添加到 Set 中
                _this.method(method).invoke(...args);
                // 从 Set 中移除实例
                Mod._thishandles.delete(handleKey);
                clearTimeout(t);
            }, time);
        }
    },
    /**
     * 显示 Toast 提示
     * @param {string} msg - 提示信息
     * @returns {void}
     */
    toast: (msg) => {
        // 如果存在 modmenu，则调用 toast 函数显示 Toast 提示
        if (typeof modmenu !== 'undefined') {
            toast(msg);
        } else {
            // 否则，在控制台输出提示信息
            console.log(`toast(${msg})`);
        }
    },
    startHook: undefined,
    menuInstance: undefined
}