export function mapState(stateArr) {
    const stateMap = {};
    stateArr.forEach(stateName => {
        stateMap[stateName] = function() { // ! 不能用箭头函数
            return this.$store.state[stateName];
        }
    })
    return stateMap;
}

export function mapGetters(gettersArr) {
   const getterMap = {};
   gettersArr.forEach(getterName => {
       getterMap[getterName] = function() {
            return this.$store.getters[getterName];
        }
    })
    return getterMap;
}

export function mapMutations(namespace, mutationsArr) {
    const mutationsMap = {};
    if (typeof namespace === 'string') {
        mutationsArr.forEach(mutationName => {
            mutationsMap[mutationName] = function(payload) {
                 return this.$store.commit(`${namespace}/${mutationName}`, payload);
             }
         })
    }else {
        mutationsArr.forEach(mutationName => {
            mutationsMap[mutationName] = function(payload) {
                 return this.$store.commit(mutationName, payload);
             }
         })
    }
    return mutationsMap;
 }