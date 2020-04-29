<template>
  <div class="goods-add">
    <a-steps :current="current" class="goods-steps">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
      <goods-detail v-show="current == 0" @next="next"/>
      <goods-sale-detail v-show="current == 1" @submit="submit" @prev="prev"/>
    </div>
    <!-- <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">下一步</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >Done</a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">上一步</a-button>
    </div> -->
  </div>
</template>
<script>
import GoodsDetail from '@/components/goods/add/goodsDetail.vue'
import GoodsSaleDetail from '@/components/goods/add/goodsSaleDetail.vue'
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
      console.log(data)
      this.form = Object.assign(this.form, data)
    },
    prev () {
      this.current--
    },
    submit (data) {
      this.form = Object.assign(this.form, data)
      console.log(this.form)
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
