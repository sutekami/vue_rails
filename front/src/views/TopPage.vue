<template>
    <div class="TopPage">
        <h1>Welcome, {{ $store.state.userId }}</h1>
        <div class="task">
            <textarea cols="30" rows="10" :style="'font-size: 20px;'" v-model="context"></textarea>
            <button v-if="!notContext" @click="createTask">投稿</button>
            <span v-else>必要なタスクを書き出そう！</span>
        </div>
        <div class="tasklist">
            <ul>
                <li v-for="myTask in $store.state.myTasks" :key="myTask.id" :style="'display: flex;'">
                    <span :class="{ under_line: myTask.checked }">{{ myTask.context }}</span>
                    <button v-if="!myTask.checked" @click="completeTask(myTask)">完了</button>
                    <button v-else @click="completeTask(myTask)">未完了</button>
                    <button @click="deleteTask(myTask.id)">タスク削除</button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default ({
    name: 'TopPage',
    data() {
        return {
            context: '',
            notContext: true,
        }
    },
    created() {
        this.$store.commit('emptyUserId');
        this.$store.dispatch('getMyTask');
    },
    methods: {
        async createTask() {
            await this.$store.dispatch('createTask', this.context);
            this.$store.dispatch('getMyTask');
            this.context = '';
        },
        async deleteTask(id) {
            await this.$store.dispatch('deleteTask', id);
            this.$store.dispatch('getMyTask');
        },
        async completeTask(myTask) {
            myTask.checked = !myTask.checked;
            await this.$store.dispatch('completeTask', myTask);
            this.$store.dispatch('getMyTask');
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