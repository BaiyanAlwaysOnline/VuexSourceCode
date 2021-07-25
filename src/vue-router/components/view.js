export default {
    name: 'routerView',
    functional: true,  // 纯渲染组件，性能高，不需要创建实例；
    render: function(h, context) {
        // 组件需要的一切都是通过 context 参数传递；
        let { parent, data } = context;
        const route = parent.$route;
        let depth = 0; 
        // 表示当前是router-view组件
        data.routerView = true; 
        while(parent) {
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent;
        }
        console.log(depth);
        const record = route.matched[depth];
        if (!record) {
            return h();
        }
        return h(record.component, data)
    }
}