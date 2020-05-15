<template>
  <div class="goods-detail">
    <a-form
      :form="goodsForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="商品名称">
        <a-input v-decorator="['name', { rules: [{ required: true, message: '请输入商品名称' }] }]" />
      </a-form-item>
      <a-form-item label="副标题">
        <a-input v-decorator="['title', { rules: [{ required: true, message: '请输入商品副标题' }] }]" />
      </a-form-item>
      <a-form-item label="商品描述">
        <a-textarea v-decorator="['desc']" :autoSize="{ minRows: 2, maxRows: 6 }" />
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
          <a-select-option v-for="tag in tags" :key="tag.id" :value="tag.id">{{tag.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import tagsApi from '@/api/tags'
export default {
  data () {
    return {
      tags: [],
      formLayout: 'horizontal',
      goodsForm: this.$form.createForm(this, { name: 'goodsDetails' })
    }
  },
  props: [
    'form'
  ],
  watch: {
    form () {
      for (const prop in this.form) {
        const obj = {}
        obj[prop] = this.form[prop]
        this.goodsForm.getFieldDecorator(prop, {})
        this.goodsForm.setFieldsValue(obj)
      }
    }
  },
  created () {
    tagsApi.getTagsList().then((res) => {
      const data = res.data
      this.tags = data.data
    })
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.goodsForm.validateFields((err, values) => {
        if (!err) {
          this.$emit('next', values)
        }
      })
    },
    changeTags (value) {
      this.goodsForm.setFieldsValue({
        tags: value
      })
    }
  }
}
</script>
