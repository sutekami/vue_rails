import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signUpResult: true,
        signInResult: true,
        userId: '',
        myTasks: [],
    },
    mutations: {
        initializeSignUpResult(state) {
            state.signUpResult = true;
        },
        initializeSignInResult(state) {
            state.signInResult = true;
        },
        signUpResult(state, data) {
            if (data.result) router.push('/top');
            else state.signUpResult = false;

        },
        signInResult(state, data) {
            if (data.result) {
                router.push('/top');
                state.userId = data.user_id;
            }
            else state.signInResult = false;
        },
        emptyUserId(state) {
            if (!state.userId) {
                router.push('/');
            }
        },
        getMyTask(state, data) {
            for (let i of data.task) {
                state.myTasks.push(i);
            }
        }
    },
    actions: {
        async signUp({ commit }, newUser) {
            this.state.signUpResult = true;
            const res = await api.post('sign_up', {
                user: newUser
            })
            commit('signUpResult', res.data);
        },
        async signIn({ commit }, user) {
            this.state.signInResult = true;
            const res = await api.post('sign_in', {
                user: user
            });
            commit('signInResult', res.data)
        },
        async createTask(_, context) {
            const task = {
                user_id: this.state.userId,
                context: context,
                checked: false,
            }
            await api.post('create_task', {
                task: task
            });
        },
        async getMyTask({ commit }) {
            this.state.myTasks = [];
            const res = await api.post('get_my_task', { user_id: this.state.userId });
            commit('getMyTask', res.data);
        },
        async deleteTask(_, id) {
            await api.post('delete_task', {
                id: id,
                user_id: this.state.userId,
            });
        },
        async completeTask(_, myTask) {
            await api.post('complete_task', myTask);
        }
    },
    getters: {
        // 算出プロパティーのイメージ
    }
})