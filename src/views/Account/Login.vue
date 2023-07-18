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
                    <center>
                        <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey"></div>
                    </center>
                    <p v-for="error in errors" class="small text-center text-warning">{{ error }}</p>
                    <input type="submit" class="btn btn-primary d-block" name="submit" value="Login" />
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Login',
    data() {
        return {
            recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
            username: '',
            password: '',
            errors: [],
        };
    },
    mounted() {
        this.loadRecaptchaScript();
        this.initializeRecaptcha();
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
        async recaptchaCallback(response) {
            console.log('reCAPTCHA response:', response);
        },
        async login(e) {
            e.preventDefault();

            const recaptchaResponse = grecaptcha.getResponse();
            if (!recaptchaResponse) {
                console.log('reCAPTCHA verification failed');
                return;
            }

            console.log('reCAPTCHA response:', recaptchaResponse);
            document.getElementById('login-form').submit();


            // Add your logic here to handle the reCAPTCHA response
            // You can send the response to the server for verification or perform any other actions as needed

            // Submit the login form programmatically

            // grecaptcha.ready(function () {
            //     const recaptchaSiteKey = this.recaptchaSiteKey; // Replace with your reCAPTCHA site key

            //     grecaptcha.execute(recaptchaSiteKey, { action: 'submit' }).then(function (token) {
            //         console.log(token);

            //         // document.getElementById('login-form').submit(); // Replace 'login-form' with the actual ID of your login form
            //     });
            // });

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
  