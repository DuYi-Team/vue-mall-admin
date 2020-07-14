<template>
  <div class="goods-add" :key="goodsKey">
    <a-steps :current="current" class="goods-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <goods-detail v-if="current == 0" :form="form" @next="next"/>
      <goods-sale-detail v-else-if="current == 1" :form="form" @submit="submit" @prev="prev"/>
    </div>
  </div>
</template>
<script>
import GoodsDetail from '@/components/goods/add/goodsDetail.vue';
import GoodsSaleDetail from '@/components/goods/add/goodsSaleDetail.vue';
import api from '@/api/products';

export default {
  data() {
    return {
      current: 0,
      form: {
        status: 1,
      },
      goodsKey: 1,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
    };
  },
  watch: {
    $route() {
      this.goodsKey = 1;
    },
  },
  components: {
    GoodsDetail,
    GoodsSaleDetail,
  },
  created() {
    const { params } = this.$router.currentRoute;
    if (params && params.id) {
      this.goodsKey = params.id;
      api.getProductDetail(params.id).then((data) => {
        this.form = data;
      }).catch((err) => {
        this.$message.error(err);
      });
    }
  },
  methods: {
    next(data) {
      this.current++;
      this.form = Object.assign(this.form, data);
    },
    prev(data) {
      this.form = Object.assign(this.form, data);
      console.log(this.form);
      this.current--;
    },
    submit(data) {
      this.form = Object.assign(this.form, data);
      const { params } = this.$router.currentRoute;
      const form = {
        ...this.form,
        images: this.form.images.map((item) => item.url),
      };
      if (params && params.id) {
        api.editProduct(form).then(() => {
          this.$message.success('修改成功');
          this.$router.push({
            name: 'goodsList',
          });
        }).catch((error) => {
          this.$message.error(error);
        });
      } else {
        api.addProduce(form).then(() => {
          this.$message.success('新增成功');
          this.$router.push({
            name: 'goodsList',
          });
        }).catch((error) => {
          this.$message.error(error);
        });
      }
    },
  },
};
</script>
<style lang="scss">
@import "@/styles/goods/add.scss";
</style>
<style scoped>
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
