<template>
    <div id="TopPage">
        <h1>Welcome, {{ $store.state.userName }}</h1>
        <div class="task">
            <textarea cols="30" rows="10" :style="'font-size: 20px;'" v-model="context"></textarea>
            <button v-if="!notContext" @click="createTask">投稿</button>
            <span v-else>必要なタスクを書き出そう！</span>
        </div>
        <div id="my_task">
            <h2>自分のタスク</h2>
            <ul>
                <li v-for="myTask in $store.state.myTasks" :key="myTask.id" :style="'display: flex;'">
                    <span :class="{ under_line: myTask.checked }">{{ myTask.context }}</span>
                    <button v-if="!myTask.checked" @click="completeTask(myTask)">完了</button>
                    <button v-else @click="completeTask(myTask)">未完了</button>
                    <button @click="deleteTask(myTask.id)">タスク削除</button>
                </li>
            </ul>
        </div>
        <div id="guys_task">
            <h2>みんなのタスク</h2>
            <ul>
                <li v-for="allTask in $store.state.allTasks" :key="allTask.id">
                    {{ allTask.user_id }}
                    <button
                        v-if="!($store.state.userName === allTask.user_id) && !($store.state.followingUser.find(user => user === allTask.user_id))"
                        @click="following(allTask.user_id)">フォローする</button>
                    <div :class="{ under_line: allTask.checked }">{{ allTask.context }}</div>
                    <button @click="fighting(allTask)">&#129355;</button>
                    <span>: {{ allTask.like.length }}</span>
                    <span v-if="fightOrNot(allTask)">&#128525;</span>
                </li>
            </ul>
        </div>
        <div id="following_task">
            <h2>フォローした人のタスク</h2>
            <ul>
                <li v-for="followingTask in $store.state.followingTasks" :key="followingTask.id">
                    {{ followingTask.user_id }}
                    <div :class="{ under_line: followingTask.checked }">{{ followingTask.context }}</div>
                    <button @click="fighting(followingTask)">&#129355;</button>
                    <span>: {{ followingTask.like.length }}</span>
                </li>
            </ul>
        </div>
        <div id="like_task">
            <h2>ファイトした人のタスク</h2>
            <ul>
                <li v-for="fightTask in fightingTasks" :key="fightTask.id">{{ fightTask.user_id }}
                    <div :class="{ under_line: fightTask.checked }">{{ fightTask.context }}</div>
                    <button @click="fighting(fightTask)">&#129355;</button>
                    <span>: {{ fightTask.like.length }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import router from '@/router';

export default ({
    name: 'TopPage',
    data() {
        return {
            context: '',
            notContext: true,
        }
    },
    created() {
        if (this.$store.state.userName) {
            this.$store.dispatch('getMyTask');
            this.$store.dispatch('getAllTask');
        } else {
            router.push('/');
        }
    },
    computed: {
        fightingTasks() {
            let task = []
            for (let allTask of this.$store.state.allTasks) {
                for (let like of allTask.like) {
                    if (like.user_id === this.$store.state.userId) {
                        task.unshift(allTask);
                        break;
                    }
                }
            }
            return task;
        },
    },
    methods: {
        createTask() {
            this.$store.dispatch('createTask', this.context);
            this.context = '';
        },
        async deleteTask(id) {
            await this.$store.dispatch('deleteTask', id);
            this.$store.dispatch('getMyTask');
            this.$store.dispatch('getAllTask');
        },
        completeTask(myTask) {
            this.$store.dispatch('completeTask', myTask);
        },
        following(user_id) {
            this.$store.dispatch('following', user_id);
        },
        fighting(task) {
            for (let i of task.like) {
                if (i.user_id === this.$store.state.userId) {
                    return this.$store.dispatch('deleteFighting', task.id);
                    // 既にいいねしているので、いいねを削除する処理
                }
            }
            this.$store.dispatch('fighting', task.id);
        },
        fightOrNot(task) {
            for (let like of task.like) {
                if (like.user_id === this.$store.state.userId) {
                    return true;
                }
            }
            return false;
        }
    },
    watch: {
        context(newContext) {
            if (newContext) {
                this.notContext = false;
            } else {
                this.notContext = true;
            }
        },
    }
})
</script>

<style></style>