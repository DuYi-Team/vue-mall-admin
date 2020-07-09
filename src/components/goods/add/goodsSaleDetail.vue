<template>
  <div class="goods-sale-detail">
    <a-form-model
      ref="ruleForm"
      :model="goodsForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
      :rules="rules"
    >
      <a-form-model-item label="商品售价" prop="price">
        <a-input v-model="goodsForm.price" />
      </a-form-model-item>
      <a-form-model-item label="商品折扣价" prop="price_off">
        <a-input v-model="goodsForm.price_off" />
      </a-form-model-item>
      <a-form-model-item label="商品库存" prop="inventory">
        <a-input v-model="goodsForm.inventory" />
      </a-form-model-item>
      <a-form-model-item label="计量单位" prop="unit">
        <a-input v-model="goodsForm.unit" />
      </a-form-model-item>
      <a-form-model-item label="商品相册" prop="images">
        <a-upload
          name="avatar"
          listType="picture-card"
          class="avatar-uploader"
          :file-list="fileList"
          action="https://mallapi.duyiedu.com/upload/images"
          @preview="handlePreview"
          @change="handleChange"
          v-model="goodsForm.images"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <a-icon :type="loading ? 'loading' : 'plus'" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal
          :visible="previewVisible"
          :footer="null"
          @cancel="handleCancel"
          style="display:flex;justify-content: center;align-items:center;"
        >
          <img alt="example" :src="previewImage" style="margin: 20px" />
        </a-modal>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-checkbox :checked="isPutaway" @change="handleStatusChange">是否上架</a-checkbox>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="default" @click="prev">上一页</a-button>
        <a-button type="primary" html-type="submit">完成</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
export default {
  data() {
    return {
      imageUrl: '',
      loading: false,
      previewVisible: false,
      fileList: [],
      previewImage: '',
      goodsForm: this.form,
      rules: {
        price: [{ required: true, message: '' }],
        price_off: [{ required: true, message: '' }],
        inventory: [{ required: true, message: '' }],
        unit: [{ required: true, message: '' }],
        images: [{ required: true, message: '' }],
      },
    };
  },
  computed: {
    isPutaway: {
      get() {
        return this.form.status === 1;
      },
      set(val) {
        this.form.status = Number(val);
      },
    },
  },
  props: ['form'],
  watch: {
    form() {
      this.goodsForm = this.form;
    },
  },
  methods: {
    handleChange({ file, fileList }) {
      if (file.status !== 'uploading') {
        console.log(file);
      }
      if (file.status === 'done') {
        this.$message.success('上传成功');
        file.url = file.response.data.url;
        file.thumbUrl = file.response.data.thumbUrl;
        this.fileList = fileList;
      }
      this.fileList = fileList;
      this.goodsForm.images = this.fileList.map((item, index) => ({
        url: item.response ? item.response.data.url : item.url,
        uid: index,
        name: item.name,
        status: item.response ? item.response.data.status : 'done',
      }));
    },
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          this.goodsForm.images = this.fileList.map((item, index) => ({
            url: item.response ? item.response.data.url : item.url,
            uid: index,
            name: item.name,
            status: item.response ? item.response.data.status : 'done',
          }));
          return this.$emit('submit', this.goodsForm);
        }
        console.log('error submit!!');
        return false;
      });
    },
    changeTags(value) {
      this.goodsForm.setFieldsValue({
        tags: value,
      });
    },
    handleStatusChange(e) {
      this.isPutaway = e.target.checked;
    },
    prev() {
      this.$emit('prev');
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleCancel() {
      this.previewVisible = false;
    },
  },
};
</script>
