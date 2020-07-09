<template>
  <div class="goods-detail">
    <a-form-model
      ref="ruleForm"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
      @submit="handleSubmit"
      :model="goodsForm"
      :rules="rules"
    >
      <a-form-model-item prop="title" label="副标题">
        <a-input v-model="goodsForm.title"/>
      </a-form-model-item>
      <a-form-model-item label="商品描述" prop="desc">
        <a-textarea v-model="goodsForm.desc" :autoSize="{ minRows: 2, maxRows: 6 }" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" >
        <a-select
          v-model="goodsForm.category"
          placeholder="选择类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in category" :key="c.id" :value="c.id">
            {{c.name}}
          </a-select-option>
        </a-select>
        <a-select
          v-model="goodsForm.c_item"
          placeholder="选择所属子类目"
        >
          <a-select-option v-for="item in c_items" :key="item" :value="item">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
       <a-form-model-item label="商品标签" prop="tags">
        <a-select
          mode="tags"
        v-model="goodsForm.tags"
          placeholder="选择标签"
          @change="changeTags"
        >
          <a-select-option v-for="(tag, index) in tags" :key="index" :value="tag">
            {{tag}}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  data() {
    return {
      tags: ['包邮，最晚次日达'],
      c_items: [],
      category: [],
      rules: {
        title: [{ required: true, message: '请输入商品副标题' }],
        category: [{ required: true, message: '请选择商品所属商品类目', type: 'number' }],
        tags: [{ required: true, message: '请选择商品所属标签', type: 'array' }],
      },
      formLayout: 'horizontal',
      goodsForm: {
        title: '',
        desc: '',
        category: null,
        tags: [],
        c_items: [],
      },
    };
  },
  props: [
    'form',
  ],
  watch: {
    form() {
      this.goodsForm = this.form;
    },
  },
  async created() {
    await categoryApi.getCategoryList().then((data) => {
      this.category = data.data;
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.$refs.ruleForm.validate((valid) => {
        console.log(valid);
        if (valid) {
          return this.$emit('next', this.goodsForm);
        }
        console.log('error submit!!');
        return false;
      });
    },
    changeTags() {

    },
    changeCategory(categoryId) {
      this.category.forEach((c) => {
        if (c.id === categoryId) {
          this.c_items = c.c_items;
        }
      });
    },
  },
};
</script>
