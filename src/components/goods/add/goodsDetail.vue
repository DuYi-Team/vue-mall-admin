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
      <a-form-item label="商品类目">
        <a-select
          v-decorator="[
          'category',
          {rules: [{ required: true, message: '请选择商品所属商品类目', type: 'number'}] },
        ]"
          placeholder="选择类目"
          @change="changeCategory"
        >
          <a-select-option v-for="c in category" :key="c.id" :value="c.id">
            {{c.name}}
          </a-select-option>
        </a-select>
        <a-select
          v-decorator="[
          'c_item',
          {rules: [{ required: true, message: '请选择商品所属商品子类目', type: 'string'}] },
        ]"
          placeholder="选择所属子类目"
        >
          <a-select-option v-for="item in c_items" :key="item" :value="item">
            {{item}}
          </a-select-option>
        </a-select>
      </a-form-item>
       <a-form-item label="商品标签">
        <a-select
          mode="tags"
          v-decorator="[
          'tags',
          {rules: [{ required: true, message: '请选择商品所属标签', type: 'array'}] },
        ]"
          placeholder="选择标签"
          @change="changeTags"
        >
          <a-select-option v-for="(tag, index) in tags" :key="index" :value="tag">
            {{tag}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
        <a-button type="primary" html-type="submit">下一步</a-button>
      </a-form-item>
    </a-form>
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
      formLayout: 'horizontal',
      goodsForm: this.$form.createForm(this, { name: 'goodsDetails' }),
    };
  },
  props: [
    'form',
  ],
  watch: {
    form() {
      for (const [key, value] of Object.entries(this.form)) {
        const obj = {};
        obj[key] = value;
        this.goodsForm.getFieldDecorator(key, {});
        this.goodsForm.setFieldsValue(obj);
        if (key === 'category') {
          this.changeCategory(value);
        }
      }
    },
  },
  created() {
    categoryApi.getCategoryList().then((data) => {
      this.category = data.data;
    });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.goodsForm.validateFields((err, values) => {
        if (!err) {
          this.$emit('next', values);
        }
      });
    },
    changeTags(value) {
      this.goodsForm.setFieldsValue({
        tags: value,
      });
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
