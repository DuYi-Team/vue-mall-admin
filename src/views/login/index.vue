<template>
  <div class="login">
    <a-form-model
      ref="loginForm"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16, offset:1 }"
      class="login-form"
      :model="form"
      @submit="handleSubmit"
      @submit.native.prevent
      :rules="rules"
    >
      <a-form-model-item label="邮箱" class="username" prop="email">
        <!-- <a-input
          v-decorator="['username',
                       { rules: [{ required: true, message: 'Please input your note!' }] }]"
          v-model="form.email"
        />-->
        <a-auto-complete
          :data-source="dataSource"
          placeholder="Email"
          v-model="form.email"
          @change="handleChange"
        />
      </a-form-model-item>
      <a-form-model-item label="密码" class="password" prop="password">
        <a-input
          type="password"
          v-model="form.password"
          placeholder="Password"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 16, offset: 7 }">
        <a-button type="primary" html-type="submit">登录</a-button>
        <a-button type="default" @click="register">注册</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import api from '@/api/user';

export default {
  data() {
    return {
      dataSource: [],
      formLayout: 'horizontal',
      form: {
        username: '',
        email: '',
        password: '',
      },
      rules: {
        email: [{ required: true, message: 'Please input your email!' }],
        password: [{ required: true, message: 'Please input your note!' }],
      },
    };
  },
  methods: {
    handleChange(value) {
      this.dataSource = !value || value.indexOf('@') >= 0
        ? []
        : [`${value}@gmail.com`, `${value}@163.com`, `${value}@qq.com`, `${value}@duyi-inc.com`];
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          //
          api.login(this.form).then((res) => {
            console.log('======', res);
            this.$store.dispatch('login', res);
            this.$router.push({
              name: 'home',
            });
          });
        } else {
          console.log('error');
        }
      });
    },
    register(e) {
      e.preventDefault();
      this.$router.push({
        name: 'register',
      });
    },
  },
};
</script>
<style lang="sass">
@import '@/styles/login.scss'
</style>
