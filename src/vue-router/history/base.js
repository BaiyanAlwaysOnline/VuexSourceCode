
const START = createRoute(null, {
    path: '/',
});

function runQueue(queue, iterator, cb) {
    // 异步迭代
    function step(index) {
        if (index >= queue.length) return cb();
        let hook = queue[index];
        iterator(hook, () => step(index + 1))
    }
    step(0);
}


class History {
    constructor(router) {
        this.router = router;
        // 初始化的时候，路径为 '/', 并且匹配到的是个[]；
        this.current = START
    }

    // 第一次执行监听路由变化；通过this.router.matcher.match(location) 根据路径加载不同的组件
    transitionTo(location, onComplete) {
        // 最新匹配到的route
        const route = this.router.match(location);
        onComplete && onComplete();
        // 如果两次路由相同，且匹配到的组件数量一样，则不去更新
        if (isSameRoute(route, this.current)) return console.warn('两次一样的路由！');

        const queue = [...this.router.beforeHooks];

        const iterator = (hook, next) => {
            hook(this.current, route, () => {
                next();
            })
        }

        runQueue(queue, iterator, () => {
            // 更新前调用注册好的导航守卫；
            this.updateCurrent(route);
        })

    }

    listen(cb) {
        this.cb = cb;
    }

    updateCurrent(route) {
        this.current = route;
        this.cb && this.cb(route);
    }
}

/**
 * @param {*} record 记录
 * @param {*} location 
 */
export function createRoute(record, location) {
    const result = [];
    //  匹配到  /home/a  这样的路径，要把匹配到的所有组件返回
    if (record) {
        while(record) {
            result.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched: result
    }
}

function isSameRoute(route, current) {
    return route.path === current.path && route.matched.length === current.matched.length
}

export {
    History,
}