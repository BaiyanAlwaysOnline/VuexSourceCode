import { createRoute } from "../history/base";
import createRouteMap from "./create-route-map";


export default function createMatcher(routes) {
    // 扁平化routes数据结构，生成映射表pathMap
    const { pathMap } = createRouteMap(routes);

    function match(location) {
        return createRoute(pathMap[location], {
            path: location
        });
    }
    // 动态增加路由
    function addRoute(routes) {
        createRouteMap(routes, pathMap);
    }


    return {
        match,
        addRoute,
    }
}