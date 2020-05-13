<template>
  <div class="goods-list">
    <!-- goods-list -->
    <select-form :form="selectionForm"></select-form>
    <button class="goods-add-btn" @click="addGoods">新增商品</button>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"

    >
      <template slot="operation" >
          <div>
             <a-button>编辑</a-button>
               <a-button>删除</a-button>
          </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import api from '@/api/products.js'
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
          options: [
            {
              id: 1,
              label: '水果'
            },
            {
              id: 2,
              label: '酒水'
            },
            {
              id: 3,
              label: '速食'
            }
          ]
        }
      },
      data: [],
      pagination: {
        current: 1,
        pageSize: 20
      },
      loading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          sorter: true,
          width: '20%'
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: '20%'
        },
        {
          title: '描述',
          dataIndex: 'desc'
        }, {
          title: '标签',
          dataIndex: 'tags'
        }, {
          title: '价格',
          dataIndex: 'price'
        }, {
          title: '限制购买数量',
          dataIndex: 'limit_num'
        }, {
          title: '上架状态',
          dataIndex: 'status',
          filters: [{
            text: '上架',
            value: 1
          }, {
            text: '下架',
            value: 2
          }]
        }, {
          title: '操作',
          width: '20%',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
  },
  components: {
    selectForm
  },
  created () {
    this.fetch()
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters
      })
    },
    fetch (params = {}) {
      this.loading = true
      api.getProductsList({
        page: this.pagination.current || 1,
        size: this.pagination.pageSize || 10
      }).then(data => {
        const pagination = { ...this.pagination }
        pagination.total = data.data.total
        this.loading = false
        this.data = data.data.data
        this.pagination = pagination
      })
    },
    addGoods () {
      this.$router.push({
        path: '/goods/add'
      })
    }
  }
}
</script>

<style lang="scss" >
@import "@/styles/goods/list.scss";
</style>
