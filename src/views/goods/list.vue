<template>
  <div class="goods-list">
    <!-- goods-list -->
    <select-form :form="selectionForm" @search="search"></select-form>
      <a-button  class="goods-add-btn" @click="addGoods">新增商品</a-button>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"

    >
      <template slot="status" slot-scope="record">
        <div>
          {{record ? '上架': '下架'}}
        </div>
      </template>
      <template slot="operation" slot-scope="record">
          <div>
             <a-button @click="editGoods(record)">编辑</a-button>
               <a-button>删除</a-button>
          </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import api from '@/api/products.js'
import tagsApi from '@/api/tags.js'
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
        pageSize: 20,
        showSizeChanger: true
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
          dataIndex: 'tagsName'
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
          }],
          scopedSlots: { customRender: 'status' }
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
  async created () {
    await tagsApi.getTagsList().then((res) => {
      const data = res.data.data
      this.selectionForm.tags.options = data.data.map((item) => {
        return {
          ...item,
          label: item.name
        }
      })
    })
    this.fetch()
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      console.log(filters)
      const pager = { ...this.pagination }
      pager.current = pagination.current
      pager.pageSize = pagination.pageSize
      this.pagination = pager
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        ...filters
      })
    },
    search (val) {
      console.log(this.selectionForm.searchWord.value, this.selectionForm.tags.value)
      this.fetch()
    },
    fetch () {
      this.loading = true
      api.getProductsList({
        page: this.pagination.current || 1,
        size: this.pagination.pageSize || 10,
        searchWord: this.selectionForm.searchWord.value,
        tags: this.selectionForm.tags.value
      }).then(res => {
        let data = res.data
        if (data.status !== 'success') {
          return this.$message.error(data.msg)
        }
        data = data.data
        const pagination = { ...this.pagination }
        pagination.total = parseInt(data.total)
        this.loading = false
        const tags = this.selectionForm.tags.options
        this.data = data.data.map((item) => {
          const tagsName = []
          tags.forEach(tag => {
            if (item.tags.indexOf(tag.id) > -1) {
              tagsName.push(tag.name)
            }
          })
          item.tagsName = tagsName.join()
          return item
        })
        this.pagination = pagination
      })
    },
    addGoods () {
      this.$router.push({
        path: '/goods/add'
      })
    },
    editGoods (row) {
      this.$router.push({
        path: '/goods/edit/' + row.id
      })
    }
  }
}
</script>

<style lang="scss" >
@import "@/styles/goods/list.scss";
</style>
