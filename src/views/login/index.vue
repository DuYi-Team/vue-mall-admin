<template>
  <div class="login">
    <a-form
      :form="form"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16, offset:1 }"
      @submit="handleSubmit"
      class="login-form"
    >
      <a-form-item label="用户名" class="username">
        <a-input
          v-decorator="['username',
                       { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item label="密码" class="password">
           <a-input type="password"
          v-decorator="['password',
                        { rules: [{ required: true, message: 'Please input your note!' }] }]"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 16, offset: 7 }">
        <a-button type="primary" html-type="submit">登录</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'coordinated' }),
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$store.dispatch('login', values);
          this.$router.push({
            name: 'home',
          });
        }
      });
    },
  },
};
</script>
<style lang="sass">
@import '@/styles/login.scss';
</style>
