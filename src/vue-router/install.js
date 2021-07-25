import routerLink from './components/link.js'
import routerView from './components/view.js'



export let Vue;



export default function install(_Vue, options) {
    Vue = _Vue;
    // 给所有的组件混入 父组件传入的router实例
    // 共享实例
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) { 
                // 根组件
                this._routerRoot = this;
                this._router = this.$options.router
                // 初始化
                this._router.init(this); // 根实例
                // 根实例挂载  响应式_route对象，方便收集渲染watcher，当路由发生变化，重新渲染视图
                Vue.util.defineReactive(this, '_route', this._router.history.current)
            }else {
                // 子组件
                this._routerRoot = this.$parent && this.$parent._routerRoot;
                this._router = this._routerRoot && this._routerRoot._router;
            }
        }
    })

    // 注册两个全局组件
    Vue.component('router-view', routerView)
    Vue.component('router-link', routerLink)
    // 注册两个全局属性
    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route // 所有组件实例上都挂载根组件的_route属性，去获取path,matched等属性；
        }
    })
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router // 所有组件实例上都挂载根组件的router实例，去获取go，push，replace等方法；
        }
    })
}