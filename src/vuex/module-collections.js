import { forEachValue } from "./utils";
import Module from "./module.js";

export default class ModuleCollection {
    constructor(options) {
        // ! 遍历，递归的时候，要记录数据的父子关系，用栈；
        this.register([], options)
    }

    // 获取namespace，遍历树，找到对应的路径
    getNamespace(path) {
        let root = this.root;
        return path.reduce((str, key) => {
            root = root.getChild(key);
            return str + (root.namespaced ? `${key}/` : '');
        }, '');
    }

    register(path, rootModule) {
        let newModule = new Module(rootModule);
        if (!path.length) {
            // 说明是根module
            this.root = newModule
        }else {
            // ! 很精彩，多看看
            let parent = path.slice(0, -1).reduce((memo, curr) => {
                return memo.getChild(curr);
            }, this.root);
            const key = path[path.length - 1];
            parent.setChild(key, newModule)
        }
        // 如果有modules，递归注册
        if (rootModule.modules) {
            forEachValue(rootModule.modules, (moduleName, module) => {
                this.register(path.concat(moduleName), module)
            })
        }
    }
}


/** 生成这样的树状结构
 * {
 *    _raw: {根module},
 *    _children: {
 *          aa: {
 *              _raw: {根module},
 *              _children: {
 *                  cc: {
 *                      
 *                   }
 *              }
 *              state: {}
 *          }
 *     } 
 *     state: 
 * }
 * 
 * 
 * 
 * 
 */