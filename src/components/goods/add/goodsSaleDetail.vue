<template>
  <div class="goods-sale-detail">
    <a-form
      :form="goodsForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="商品售价">
        <a-input v-decorator="['price', { rules: [{ required: true, message: ''}] }]" />
      </a-form-item>
      <a-form-item label="商品库存">
        <a-input v-decorator="['inventory', { rules: [{ required: true, message: ''}] }]" />
      </a-form-item>
      <a-form-item label="计量单位">
        <a-input v-decorator="['unit', { rules: [{ required: true, message: '' }] }]" />
      </a-form-item>
      <a-form-item label="商品相册">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :file-list="fileList"
          action="#api"
          @preview="handlePreview"
          @change="handleChange"
          v-decorator="['image', { rules: [{ required: true, message: '' }] }]"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
         <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel" style="display:flex;justify-content: center;align-items:center;">
          <img alt="example" :src="previewImage" style="margin: 20px"/>
        </a-modal>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="default" @click="prev">上一页</a-button>
        <a-button type="primary" html-type="submit">完成</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
function getBase64 (img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  data () {
    return {
      imageUrl: '',
      loading: false,
      previewVisible: false,
      fileList: [],
      previewImage: '',
      goodsForm: this.$form.createForm(this, { name: 'goodsSaleDetails' })
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
        if (prop === 'image') {
          this.fileList = this.form[prop]
        }
      }
    }
  },
  methods: {
    handleChange ({ fileList }) {
      this.fileList = fileList
    },
    handleSubmit (e) {
      e.preventDefault()

      this.goodsForm.validateFields((err, values) => {
        if (!err) {
          values.images = this.fileList
          this.$emit('submit', values)
        }
      })
    },
    changeTags (value) {
      this.goodsForm.setFieldsValue({
        tags: value
      })
    },
    prev () {
      this.$emit('prev')
    },
    async handlePreview (file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleCancel () {
      this.previewVisible = false
    }
  }
}
</script>
