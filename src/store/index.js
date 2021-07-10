import Vue from 'vue';
import Vuex from '@/vuex';
import aa from './aa.js'
import bb from './bb.js'
Vue.use(Vuex);

const persistStatePlugin = (store) => {
    const data = localStorage.getItem('VUX-STATE');
    if (data) {
        store.replaceState(JSON.parse(data));
    }
    store.subscribe((mutation, state) => {
        localStorage.setItem('VUX-STATE', JSON.stringify(state))
    });
}

const store = new Vuex.Store({
    plugins: [
        persistStatePlugin
    ],
    state: {
        name: 'by',
        age: 10,
        aa: {
            age: 10000
        }
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
        aa,
        bb
    }
})

export default store