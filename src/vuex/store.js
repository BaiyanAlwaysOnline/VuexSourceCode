import applyMixin from './mixin.js';
import { forEachValue } from './utils.js';
import ModuleCollection from './module-collections.js'
let Vue;

function installModule(store, state, path, rootModule) {
    if (path.length) {
        // 说明非根，把module上的state挂到他的父节点上
        // 找到父亲
        let parent = path.slice(0, -1);
        const child = path[path.length - 1];
        parent = parent.reduce((memo, current) => {
            return memo[current];
        }, state);
        // .set如果是一个非响应式的对象，作用是给一个obj添加一个属性；
        Vue.set(parent, child, rootModule.state);
    }
    const namespace = store._modules.getNamespace(path);
    console.log(namespace);
    rootModule.forEachMutations((key, func) => {
        key = namespace + key
        store._mutations[key] = store._mutations[key] || [];
        store._mutations[key].push((payload) => func.call(store, rootModule.state, payload));
    })
    rootModule.forEachActions((key, func) => {
        key = namespace + key
        store._actions[key] = store._actions[key] || [];
        store._actions[key].push((payload) => func.call(store, store, payload));
    })
    // 会覆盖
    rootModule.forEachGetters((key, func) => {
        key = namespace + key
        store._gettersWrapper[key] = () => func.call(store, rootModule.state)
    })
    rootModule.forEachChildren((key, childModule) => {
        installModule(store, state, path.concat(key), childModule);
    })
}


function resetStoreVm(store, state) {
    const computed = {};
    store.getters = {};  // 通过this.$store.getter 取值
    forEachValue(store._gettersWrapper, (key, func) => {
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]
        });
        computed[key] = func;
    })

    store._vm = new Vue({
        data: {
            $$state: state,
        },
        computed
    })
}

class Store {
    constructor(options) {
        const state = options.state;
        this._mutations = {};
        this._actions = {};
        this._gettersWrapper = {};
        const store = this;
        // 1.模块收集 用户的数据 -> 树
        this._modules = new ModuleCollection(options);
        // 2.模块安装 树 -> 生成我们需要的数据
        // 3.把所有的action,mutation,getter收集起来
        // 4.把所有的子模块的状态安装到父模块的状态上
        // 5.增加命名空间
        installModule(store, state, [], this._modules.root);
        // 5.使state，getter响应式
        resetStoreVm(store, state);
    }
    
    get state() {
        return this._vm._data.$$state;
    }

    // 绑定commit的this, 可能是this.$store.commit(), 也有可能是在action中解构使用
    // ! 典型的发布订阅
    commit = (type, payload) => {
        this._mutations[type] && this._mutations[type].forEach(mutation => mutation(payload));
    }
    dispatch = (type, payload) => {
        this._actions[type] && this._actions[type].forEach(action => action(payload));
    }
}

function install(_Vue) {
    Vue = _Vue
    applyMixin(Vue)
}

export {
    install,
    Store
}