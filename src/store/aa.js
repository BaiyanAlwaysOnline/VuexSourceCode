export default {
    namespaced: true,
    state: {
        age: 18
    },
    mutations: {
        add(state, payload) {
            state.age += payload;
        }
    }
}