<template>
  <div class="goods-detail">
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="商品名称">
        <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入商品名称' }] }]" />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-decorator="['sub_title', { rules: [{ required: true, message: '请输入商品副标题' }] }]" />
      </a-form-item>
      <a-form-item label="商品描述">
        <a-textarea v-decorator="['describe']" :autoSize="{ minRows: 2, maxRows: 6 }" />
      </a-form-item>
      <a-form-item label="商品货号">
        <a-input v-decorator="['number', { rules: [{ required: true, message: '请输入商品货号' }] }]" />
      </a-form-item>
      <a-form-item label="商品标签">
        <a-select
          mode="multiple"
          v-decorator="[
          'tags',
          {rules: [{ required: true, message: '请选择商品所属标签', type: 'array'}] },
        ]"
          placeholder="选择标签"
          @change="changeTags"
        >
          <a-select-option value="male">male</a-select-option>
          <a-select-option value="female">female</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'goodsDetails' })
    }
  },
  beforeCreate () {
    // this.form = this.$form.createForm(this, { name: 'goodsDetails' })
    // this.form.setFields({ tags: [] })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          // console.log('Received values of form: ', values)
          this.$emit('next', values)
        }
      })
    },
    changeTags (value) {
      console.log(value, this.form)
      this.form.setFieldsValue({
        tags: value
      })
    }
  }
}
</script>
