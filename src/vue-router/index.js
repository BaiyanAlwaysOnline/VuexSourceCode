import install from './install';
import createMatcher from './utils/createMatcher';
import HashHistory from './history/hash.js';
import H5History from './history/h5.js';

// 根据用户的配置和当前请求的路径，渲染对应的组件
class Router {
    constructor(options) {
        // 创建匹配器 用于后续的匹配操作，返回两个方法
        // match: 通过路由来匹配组件
        // addRoute: 动态添加匹配规则
        this.matcher = createMatcher(options.routes || []);

        this.beforeHooks = [];

        options.mode = options.mode || 'hash';

        switch (options.mode) {
            case 'hash':
                this.history = new HashHistory(this);
                break;
        
            case 'history':
                this.history = new H5History(this);
                break;
        }
    }

    // 初始化
    init(app) {
        const history = this.history, setupListener = () => history.setupListener();
        // 初始化先跳转默认路由，然后设置不同模式的路由监听器，监听路由变化
        history.transitionTo(history.getCurrentLocation(), setupListener);

        history.listen((currentRoute) => {
            app._route = currentRoute
        })
    }

    push(location) {
        this.history.push(location)
    }


    match(location) {
        return this.matcher.match(location);
    }

    beforeEach(fn) {
        this.beforeHooks.push(fn);
    }
}

Router.install = install;

export default Router;