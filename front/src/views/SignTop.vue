<template>
    <div :id="signin">
        <h1>SWITTER</h1>
        <h2>サインイン</h2>
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
    methods: {
        signIn() {
            const user = {
                user_id: this.user_id,
                password: this.password
            }
            this.$store.dispatch('signIn', user);
        }
    }
})
</script>

<style></style>