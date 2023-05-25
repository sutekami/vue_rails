import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signUpResult: true,
    },
    mutations: {
        initializeSignUpResult(state) {
            state.signUpResult = true;
        },
        signUpResult(state, data) {
            if (!data.result) state.signUpResult = !state.signUpResult;
        },
        signInResult(_, data) {
            console.log(data.result);
        }
    },
    actions: {
        async signUp({ commit }, newUser) {
            const res = await api.post('sign_up', {
                user: newUser
            })
            commit('signUpResult', res.data);
        },
        async signIn({ commit }, user) {
            const res = await api.post('sign_in', {
                user: user
            });
            commit('signInResult', res.data)
        }
    },
    getters: {
        // 算出プロパティーのイメージ
    }
})