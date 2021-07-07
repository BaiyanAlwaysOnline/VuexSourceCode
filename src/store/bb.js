export default {
    namespaced: true,
    state: {
        age: 20
    },
    mutations: {
        add(state, payload) {
            state.age += payload;
        }
    }
}