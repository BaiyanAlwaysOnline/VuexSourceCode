import cc from './cc.js';
export default {
    namespaced: true,
    state: {
        age: 18
    },
    getters: {
        totalAge(state) {
            return state.age + 100
        }
    },
    mutations:{
        add(state, payload) {
            state.age += payload;
        }
    },
    actions: {
        addAsync({commit}, payload) {
            setTimeout(() => {
                commit('add', 10)
            }, 1000)
        }
    },
    modules: {
        cc
    }
}