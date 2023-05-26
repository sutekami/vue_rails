<template>
    <div :id="signup">
        <h1>サインアップ・新規登録</h1>
        <h2 :class="'mistake'" v-if="!$store.state.signUpResult">既にメールアドレスかユーザー名が使用されています。</h2>
        <h2 :class="'mistake'" v-if="!matchPassword">再入力されたパスワードが間違っています。</h2>
        <div><input type="text" placeholder="メールアドレス" v-model="mail"></div>
        <div><input type="text" placeholder="ユーザー名" v-model="user_id"></div>
        <div><input type="password" placeholder="パスワード" v-model="password"></div>
        <div><input type="password" placeholder="パスワード再入力" v-model="re_password"></div>
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
            password: '',
            re_password: '',
            matchPassword: true,
        }
    },
    created() {
        this.$store.commit('initializeSignUpResult')
    },
    methods: {
        signUp() {
            this.matchPassword = true;
            if (this.password === this.re_password) {
                const newUser = {
                    mail: this.mail,
                    user_id: this.user_id,
                    password: this.password,
                }
                this.$store.dispatch('signUp', newUser);
            } else {
                this.matchPassword = !this.matchPassword;
            }
        }
    },
})
</script>

<style></style>