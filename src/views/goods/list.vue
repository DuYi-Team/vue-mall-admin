<template>
    <div class="goods-list">
        <!-- goods-list -->
        <select-form :form="selectionForm"></select-form>
    </div>
</template>
<script>
import selectForm from '@/components/public/select.vue'
export default {
  data () {
    return {
      selectionForm: {
        searchWord: {
          label: '搜索关键字',
          name: 'searchWord',
          value: '',
          type: 'input',
          options: []
        },
        tags: {
          label: '商品标签',
          name: 'tags',
          value: undefined,
          type: 'select',
          options: [{
            id: 1,
            label: '水果'
          }, {
            id: 2,
            label: '酒水'
          }, {
            id: 3,
            label: '速食'
          }]
        }
      }
    }
  },
  components: {
    selectForm
  }
}
</script>

<style lang="scss" >
  @import "@/styles/goods/list.scss";
</style>
