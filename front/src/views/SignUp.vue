<template>
    <div :id="signup">
        <h1>サインアップ・新規登録</h1>
        <h2 :class="'signup'" v-if="!$store.state.signUpResult">既にメールアドレスかユーザー名が使用されています。</h2>
        <div><input type="text" placeholder="メールアドレス" v-model="mail"></div>
        <div><input type="text" placeholder="ユーザー名" v-model="user_id"></div>
        <div><input type="text" placeholder="パスワード" v-model="password"></div>
        <button @click="signUp">登録</button>
        <h2><router-link to="/">サインインはこちら</router-link></h2>
    </div>
</template>

<script>
export default ({
    name: 'SignUp',
    data() {
        return {
            mail: '',
            user_id: '',
            password: ''
        }
    },
    created() {
        this.$store.commit('initializeSignUpResult')
    },
    methods: {
        signUp() {
            const newUser = {
                mail: this.mail,
                user_id: this.user_id,
                password: this.password
            }
            this.$store.dispatch('signUp', newUser);
        }
    },
})
</script>

<style>
.signup {
    color: red;
}
</style>