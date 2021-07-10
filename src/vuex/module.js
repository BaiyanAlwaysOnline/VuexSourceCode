import { forEachValue } from "./utils";

export default class Module {
    constructor(rootModule) {
        this._raw = rootModule;
        this._children = {};
        this.state = rootModule.state;
    }
    get namespaced() {
        return !!this._raw.namespaced
    }
    setChild(k, child) {
        this._children[k] = child;
    }
    getChild(k) {
        return this._children[k];
    }
    forEachMutations(func) {
        forEachValue(this._raw?.mutations, func)
    }
    forEachActions(func) {
        forEachValue(this._raw?.actions, func)
    }
    forEachGetters(func) {
        forEachValue(this._raw?.getters, func)
    }
    forEachChildren(func) {
        forEachValue(this._children, func)
    }
}