<template>
  <div class="goods-sale-detail">
    <a-form
      :form="form"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
    >
      <a-form-item label="商品售价">
        <a-input v-decorator="['sale_price', { rules: [{ required: true, message: '' }] }]" />
      </a-form-item>
      <a-form-item label="市场价">
        <a-input v-decorator="['origin_price', { rules: [{ required: true, message: '' }] }]" />
      </a-form-item>
      <a-form-item label="商品库存">
        <a-input v-decorator="['inventory', { rules: [{ required: true, message: '' }] }]" />
      </a-form-item>
      <a-form-item label="计量单位">
        <a-input v-decorator="['unit', { rules: [{ required: true, message: '' }] }]" />
      </a-form-item>
      <a-form-item label="商品相册">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :showUploadList="false"
          action="#api"
          :beforeUpload="beforeUpload"
          @change="handleChange"
          v-decorator="['image', { rules: [{ required: true, message: '' }] }]"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
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
      form: this.$form.createForm(this, { name: 'goodsSaleDetails' })
    }
  },
  methods: {
    beforeUpload (file) {
      console.log(file)
    },
    handleChange (info) {
      console.log('===', info, info.file.status)
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      //   if (info.file.status === 'done') {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl => {
        this.imageUrl = imageUrl
        this.loading = false
      })
    //   }
    },
    handleSubmit (e) {
      e.preventDefault()

      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          this.$emit('submit', values)
        }
      })
    },
    changeTags (value) {
      console.log(value, this.form)
      this.form.setFieldsValue({
        tags: value
      })
    },
    prev () {
      this.$emit('prev')
    }
  }
}
</script>
