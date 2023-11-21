<template>
    <v-app class="login-page">
        <v-main>
            <v-flex pb-3 class="text-xs-center pb-4" style="margin-top: 114px">
                <div class="text-center pb-4">
                    <img src="./../assets/img/DBO_Logo_White.png" width="300px"/>
                </div>
            </v-flex>
            <v-card class="mx-auto rounded-xl py-4" max-width="300">
                <v-container>
                    <div class="d-flex justify-center">
                        <span class="title-login">Dashboard</span>
                    </div>
                    <div class="d-flex justify-center px-4 pt-4">
                        <v-text-field
                            dense
                            outlined
                            prepend-inner-icon="mdi-account-outline"
                            label="Email"
                            name="email"
                            type="text"
                            v-model="form.email"
                            :error-messages="error.email"
                        ></v-text-field>
                    </div>
                    <div class="d-flex justify-center px-4 -mt-4">
                        <v-text-field
                            outlined
                            dense
                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                            :type="show ? 'text' : 'password'"
                            @click:append="show = !show"
                            label="Password"
                            name="password"
                            prepend-inner-icon="mdi-lock-outline"
                            @keyup.enter="onSubmit"
                            :error-messages="error.password"
                            v-model="form.password"
                        ></v-text-field>
                    </div>
                    <div class="d-flex justify-center px-4">
                        <v-btn
                            name="loggin-btn"
                            block
                            class="only-btn white--text"
                            depressed
                            color="#0087C2"
                            @click="onSubmit"
                        ><span>Login</span></v-btn
                        >
                    </div>
                </v-container>
            </v-card>
        </v-main>
    </v-app>
</template>
<style scoped>
    .login-page {
        height: 100vh;
        background-color: #0093E9;
        background-image: linear-gradient(160deg, #0093E9 0%, #80D0C7 100%);
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
        position: relative;
    }
    .title-login {
        font-size: 14px;
        font-weight: bold;
    }
</style>
<script>
    import axios from 'axios'
    export default {
        name: "Login",
        data() {
            return {
                form: {
                    email: "",
                    password: "",
                },
                error: {},
                show: false,
            };
        },
        methods: {
            // For login method
            async onSubmit() {
                try {
                    this.error = {};
                    const response = await axios.get('/data/user.json');
                    let data = response.data;
                    let token = data.token;
                    if (data.email === this.form.email && data.password === this.form.password) {
                        this.$store.dispatch("login", {token});
                        this.$router.push("/home");
                    } else {
                        this.$set(this.error, 'email', 'Email or password is incorrect');
                        this.$set(this.error, 'password', 'Email or password is incorrect');
                    }
                } catch (error) {
                    console.error(error);
                }
            },
        },
    };
</script>
