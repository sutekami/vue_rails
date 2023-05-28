<template>
    <div class="signtop">
        <h1>タスク共有アプリ</h1>
        <h2>サインイン</h2>
        <h1 :class="'mistake'" v-if="!$store.state.signInResult">ユーザー名もしくはパスワードが間違っています。</h1>
        <div><input type="text" placeholder="ユーザー名 or メールアドレス" v-model="user_id"></div>
        <div><input type="password" placeholder="パスワード" v-model="password"></div>
        <button @click="signIn">ログイン</button>
        <h2><router-link to="/signup">新規登録</router-link></h2>
    </div>
</template>

<script>
export default ({
    name: 'SignTop',
    data() {
        return {
            user_id: '',
            password: '',
        }
    },
    created() {
        this.$store.commit('initializeSignInResult')
    },
    methods: {
        signIn() {
            const user = {
                user_id: this.user_id,
                password: this.password
            }
            this.$store.dispatch('signIn', user);
        },
    }
})
</script>

<style></style>