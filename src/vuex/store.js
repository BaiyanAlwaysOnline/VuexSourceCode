import applyMixin from './mixin.js';
import { forEachValue } from './utils.js';
let Vue;


class Store {
    constructor(options) {
        const state = options.state;
        const computed = {};
        // 2.添加getters，具有缓存, 传进来的是方法，获取是属性
        this.getters = {};
        options.getters = options.getters || {};
        forEachValue(options.getters, (key, fn) => {
            computed[key] = () => fn(this.state);
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]
            })
        })
        // 1.添加状态逻辑，数据在哪里使用就在哪里收集依赖
        // store的state通过Vue构造函数生成, $$的格式vue的data在初始化的时候不会代理到当前vue实例上
        this._vm = new Vue({
            data: {
                $$state: state
            },
            computed
        });
        // 3.mutations
        this.mutations = {};
        forEachValue(options.mutations, (key, fn) => {
            this.mutations[key] = (payload) => fn(this.state, payload)
        })
        // 4.actions
        this.actions = {};
        forEachValue(options.actions, (key, fn) => {
            this.actions[key] = (payload) => fn(this, payload)
        })
    }
    
    get state() {
        return this._vm._data.$$state;
    }

    // 绑定commit的this, 可能是this.$store.commit(), 也有可能是在action中解构使用
    commit = (type, payload) => {
        this.mutations[type](payload);
    }
    dispatch = (type, payload) => {
        this.actions[type](payload);
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