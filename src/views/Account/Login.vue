<template>
    <div id="login" class="mx-auto">
        <div class="card">
            <h3 class="fw-bolder text-center">Login</h3>
            <div class="card-body">
                <form class="mx-auto" @submit.prevent="login">
                    <div class="form-group">
                        <label class="small" for="username">Username</label>
                        <input class="form-control" v-model="username" type="text" id="username" />
                    </div>
                    <div class="form-group">
                        <label class="small" for="password">Password</label>
                        <input class="form-control" v-model="password" type="password" id="password" />
                    </div>
                    <div class="d-flex justify-content-center align-items-center">
                        <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
                    </div>
                    <p v-for="error in errors" class="small text-center text-warning">{{ error }}</p>
                    <input type="submit" class="btn btn-primary d-block" name="submit" value="Login" />
                </form>
            </div>
        </div>
    </div>
</template>
<script>
import { ref } from 'vue';
import { login } from '../../services/api.js';

export default {

    name: 'Login',
    data() {
        return {
            basePath: import.meta.env.VITE_BACKEND_BASE_PATH,
            recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            username: '',
            password: '',
            errors: ref([]),
        };
    },
    mounted() {
        this.loadRecaptchaScript();
    },
    methods: {
        async loadRecaptchaScript() {
            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js';
            script.onload = this.initializeRecaptcha;
            document.head.appendChild(script);
        },
        async initializeRecaptcha() {
            const recaptchaSiteKey = this.recaptcha_site_key;
            const recaptchaContainer = document.querySelector('.g-recaptcha');

            grecaptcha.render(recaptchaContainer, {
                sitekey: recaptchaSiteKey,
                callback: this.recaptchaCallback,
            });
        },
        recaptchaCallback(response) {
            console.log('reCAPTCHA response:', response);
        },
        async clearFormData() {
            this.username = '';
            this.password = '';
            grecaptcha.reset();
        },
        async submitFormData(e) {
            e.preventDefault();
            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                errorMsg = 'reCAPTCHA verification failed';
                return;
            }
            try {
                const response = await login({
                    username: this.username,
                    password: this.password,
                    'g-recaptcha-response': recaptchaResponse,
                });
                const { token } = response.data;
                this.$store.commit('setToken', token);
                this.$store.commit('setLoggedIn', true);
            } catch (error) {
                errorMsg = 'An error occured during login';
            }
        },
        async login(e) {
            this.submitFormData(e);
            this.clearFormData();
        },
    },
};
</script>
<style scoped>
#login {
    max-width: 400px;
    width: 100%;
}

#login .card {
    padding: 15px;
}

#login .form-group,
#login .g-recaptcha {
    margin-bottom: 20px;
}

#login .btn {
    max-width: 220px;
    width: 100%;
    margin: 0 auto;
}

#login center {
    position: relative;
}

#login .g-recaptcha {
    transform: scale(0.9);
}

@media screen and (max-width: 370px) {
    #login .g-recaptcha {
        display: flex;
        justify-content: center;
        left: 50%;
        top: 50%;
        transform: scale(0.75);
    }
}
</style>
  