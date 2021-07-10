export default {
    state: {
        age: 33
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
}