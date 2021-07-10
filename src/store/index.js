import Vue from 'vue';
import Vuex from '@/vuex';
import aa from './aa.js'
import bb from './bb.js'
Vue.use(Vuex);

const store = new Vuex.Store({
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