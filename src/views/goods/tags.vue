<template>
  <div class="goods-tags">
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation">
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
import api from '@/api/tags'
export default {
  data () {
    return {
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
          title: '名称',
          dataIndex: 'name'
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' }
        }
      ]
    }
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
      api.getTagsList({
        page: this.pagination.current || 1,
        size: this.pagination.pageSize || 10
      }).then(res => {
        const pagination = { ...this.pagination }
        pagination.total = res.data.total
        this.loading = false
        this.data = res.data.data
        this.pagination = pagination
      })
    }
  }
}
</script>
