export default {
    namespaced: true,
    state: {
        age: 22
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
                commit('bb/add', 10)
            }, 1000)
        }
    },
}