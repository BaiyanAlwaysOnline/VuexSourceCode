// 生成路由映射表
export default function createRouteMap(routes, pathMap) {
    // pathMap存在说明是用户调用了addRoute，否则是第一次创建
    pathMap = pathMap || Object.create(null);

    // 生成映射表
    routes.forEach((route) => addRouteRecord(route, pathMap))

    return {
        pathMap
    }
}

// ! 先序深度
function addRouteRecord(route, pathMap, parent) {
    let { path, component } = route;
    // 是子路由，就拼上父路由的路径
    path = parent ? parent.path + '/' + path : path;
    const record = {
        path,
        component,
        parent,
    };

    if (!pathMap[path]) {
        pathMap[path] = record;
    }

    // 递归子route
    route.children && route.children.forEach((childRoute) => {
        addRouteRecord(childRoute, pathMap, record)
    })
}