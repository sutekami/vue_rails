import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        signUpResult: true,
        signInResult: true,
        userId: 0,
        userName: '',
        myTasks: [],
        allTasks: [],
        followingTasks: [],
        followingUser: [],
    },
    mutations: {
        initializeSignUpResult(state) {
            state.signUpResult = true;
        },
        initializeSignInResult(state) {
            state.signInResult = true;
        },
        signUpResult(state, data) {
            if (data.result) router.push('/');
            else state.signUpResult = false;

        },
        signInResult(state, data) {
            if (data.result) {
                router.push('/top');
                state.userName = data.user_id;
                state.userId = data.id;
            }
            else state.signInResult = false;
        },
        getMyTask(state, data) {
            for (let i of data.task) {
                state.myTasks.unshift(i);
            }
        },
        getAllTask(state, data) {
            for (let i = 0; i < data.task.length; i++) {
                data.task[i].like = data.like[i];
                state.allTasks.unshift(data.task[i]);
            }
        },
        addCreateTask(state, data) {
            data.task.like = [];
            state.myTasks.unshift(data.task);
            state.allTasks.unshift(data.task);
        },
        completeTask(state, data) {
            for (let allTask of state.allTasks) {
                if (allTask.id === data.task.id) {
                    allTask.checked = data.task.checked;
                    break;
                }
            }
            for (let myTask of state.myTasks) {
                if (myTask.id === data.task.id) {
                    myTask.checked = data.task.checked;
                    break;
                }
            }
            console.log(state.allTasks);
        },
        getFollowingUser(state, data) {
            for (let i of data.following) {
                state.followingUser.push(i.followed_id);
            }
        },
        getFollowingTask(state) {
            for (let allTask of state.allTasks) {
                if (state.followingUser.find(x => x === allTask.user_id)) {
                    state.followingTasks.unshift(allTask);
                }
            }
        },
        sessionLogin(state, data) {
            if (data.result) {
                state.userName = data.user_id;
                state.userId = data.id;
                router.push('/top');
            }
        },
        addLikeInfo(state, data) {
            const task = state.allTasks.find(allTask => allTask.id === data.like.task_id);
            task.like.push(data.like);
        },
        deleteFighting(state, data) {
            const task = state.allTasks.find(allTask => allTask.id === data.like.task_id);
            task.like = task.like.filter(like => {
                if (state.userId !== like.user_id) return like;
            })
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
        async createTask({ commit }, context) {
            const task = {
                user_id: this.state.userName,
                context: context,
                checked: false,
            }
            const res = await api.post('create_task', {
                task: task
            });
            commit('addCreateTask', res.data);
        },
        async getMyTask({ commit }) {
            this.state.myTasks = [];
            const res = await api.post('get_my_task', { user_id: this.state.userName });
            commit('getMyTask', res.data);
        },
        async getAllTask({ commit }) {
            this.state.allTasks = [];
            this.state.followingUser = [];
            this.state.followingTasks = [];
            const res1 = await api.get('get_all_task');
            commit('getAllTask', res1.data);
            const res2 = await api.post('/get_following', { user_id: this.state.userName });
            commit('getFollowingUser', res2.data);
            commit('getFollowingTask');
        },
        async deleteTask(_, id) {
            await api.post('delete_task', {
                id: id,
                user_id: this.state.userName,
            });
        },
        async completeTask({ commit }, myTask) {
            const task = {
                id: myTask.id,
                user_id: myTask.user_id,
                context: myTask.context,
                checked: !myTask.checked,
            }
            const res = await api.post('complete_task', task);
            commit('completeTask', res.data);
        },
        async following(_, id) {
            const res = await api.post('follow', {
                follow_id: this.state.userName,
                followed_id: id,
            });
            this.state.followingUser.push(res.data.follow.followed_id);
            for (let allTask of this.state.allTasks) {
                if (allTask.user_id === res.data.follow.followed_id) {
                    this.state.followingTasks.unshift(allTask);
                }
            }
        },
        async sessionLogin({ commit }) {
            if (!this.state.sessionLoginTOF) {
                const res = await api.get('session_login');
                commit('sessionLogin', res.data);
            }
        },
        async fighting({ commit }, task_id) {
            const res = await api.post('fighting', {
                user_id: this.state.userId,
                task_id: task_id
            });
            commit('addLikeInfo', res.data);
        },
        async deleteFighting({ commit }, task_id) {
            const res = await api.post('delete_fighting', {
                user_id: this.state.userId,
                task_id: task_id,
            });
            commit('deleteFighting', res.data);
        }
    },
    getters: {
        // 算出プロパティーのイメージ
    }
})