<template>
  <div class="goods-add">
    <a-steps :current="current" class="goods-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <goods-detail v-show="current == 0" @next="next"/>
      <goods-sale-detail v-show="current == 1" @submit="submit" @prev="prev"/>
    </div>
  </div>
</template>
<script>
import GoodsDetail from '@/components/goods/add/goodsDetail.vue'
import GoodsSaleDetail from '@/components/goods/add/goodsSaleDetail.vue'
import api from '@/api/products'
export default {
  data () {
    return {
      current: 0,
      form: {},
      steps: [
        {
          title: '填写商品基本信息'
        },
        {
          title: '填写商品销售信息'
        }
      ]
    }
  },
  components: {
    GoodsDetail,
    GoodsSaleDetail
  },
  methods: {
    next (data) {
      this.current++
      this.form = Object.assign(this.form, data)
    },
    prev () {
      this.current--
    },
    submit (data) {
      this.form = Object.assign(this.form, data)
      api.addProduce(this.form).then((data) => {
        if (data.data.status === 'success') {
          alert('新增成功')
          this.$router.push({
            name: 'goodsList'
          })
        }
      })
    }
  }
}
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
