<template>
  <div class="goods-list">
    <!-- goods-list -->
    <select-form :form="selectionForm"></select-form>
    <a-table
      :columns="columns"
      :row-key="record => record.login.uuid"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"

    >
      <template slot="name" slot-scope="name">{{ name.first }} {{ name.last }}</template>
      <template slot="operation" >
          <div>
             <a-button>编辑</a-button>
              <a-button>新增</a-button>
               <a-button>删除</a-button>
          </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import reqwest from 'reqwest'
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
      pagination: {},
      loading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'name',
          sorter: true,
          width: '20%',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '标题',
          dataIndex: 'gender',
          width: '20%'
        },
        {
          title: '描述',
          dataIndex: 'email'
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
      console.log(pagination)
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
      console.log('params:', params)
      this.loading = true
      reqwest({
        url: 'https://randomuser.me/api',
        method: 'get',
        data: {
          results: 10,
          ...params
        },
        type: 'json'
      }).then(data => {
        const pagination = { ...this.pagination }
        // Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = 200
        this.loading = false
        this.data = data.results
        this.pagination = pagination
      })
    }
  }
}
</script>

<style lang="scss" >
@import "@/styles/goods/list.scss";
</style>
