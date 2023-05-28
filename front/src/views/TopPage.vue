<template>
    <div :id="home">
        <h1>Welcome, {{ $store.state.userId }}</h1>
        <div :id="task">
            <textarea cols="30" rows="10" :style="'font-size: 20px;'" v-model="context"></textarea>
            <button @click="createTask">投稿</button>
        </div>
        <div :id="tasklist">
            <ul>
                <li v-for="myTask in $store.state.myTasks" :key="myTask">
                    {{ myTask.context }}
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
        }
    }
})
</script>

<style></style>