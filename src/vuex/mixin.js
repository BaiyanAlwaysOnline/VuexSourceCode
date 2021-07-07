export default function(Vue) {
    Vue.mixin({ beforeCreate: vueInit })
}

// inject store 给所有的vue实例挂载$store的属性，值都是根组件的store
function vueInit() {
    const options = this.$options;
    if(options.store) {
        this.$store = options.store
    }else if(options.parent && options.parent.$store) {
        this.$store = options.parent.$store
    }
}