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
                        <div class="g-recaptcha" data-sitekey="{{ recaptcha_site_key }}"></div>
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
                username: '',
                password: '',
                recaptcha_site_key: '',
                errors: [],
            };
        },
        methods: {
            login() {

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
  