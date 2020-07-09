<template>
  <div class="goods-list">
    <!-- goods-list -->
    <select-form :form="selectionForm" @search="search"></select-form>
      <a-button  class="goods-add-btn" @click="addGoods">新增商品</a-button>
    <a-table
      :columns="columns"
      :row-key="record => record._id"
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
               <a-button @click="deleteGoods(record.id)">删除</a-button>
          </div>
      </template>
    </a-table>
  </div>
</template>
<script>
import api from '@/api/products';
import categoryApi from '@/api/category';
import selectForm from '@/components/public/select.vue';

export default {
  data() {
    return {
      selectionForm: {
        searchWord: {
          label: '搜索关键字',
          name: 'searchWord',
          value: '',
          type: 'input',
          options: [],
        },
        category: {
          label: '商品类目',
          name: 'category',
          value: undefined,
          type: 'select',
          options: [],
        },
      },
      data: [],
      pagination: {
        current: 1,
        pageSize: 20,
        showSizeChanger: true,
      },
      loading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          // sorter: true,
        },
        {
          title: '标题',
          dataIndex: 'title',
          width: '20%',
        },
        {
          title: '描述',
          dataIndex: 'desc',
        }, {
          title: '类目',
          dataIndex: 'categoryName',
        }, {
          title: '预售价格',
          dataIndex: 'price',
        }, {
          title: '折扣价格',
          dataIndex: 'price_off',
        }, {
          title: '标签',
          dataIndex: 'tags',
        }, {
          title: '限制购买数量',
          dataIndex: 'inventory',
        }, {
          title: '上架状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        }, {
          title: '操作',
          width: '20%',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  components: {
    selectForm,
  },
  async created() {
    categoryApi.getCategoryList().then((data) => {
      this.selectionForm.category.options = data.data.map((item) => ({
        ...item,
        label: item.name,
      }));
    });
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      pager.pageSize = pagination.pageSize;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        ...filters,
      });
    },
    search() {
      this.fetch();
    },
    fetch() {
      this.loading = true;
      api.getProductsList({
        page: this.pagination.current || 1,
        size: this.pagination.pageSize || 10,
        searchWord: this.selectionForm.searchWord.value,
        category: this.selectionForm.category.value,
      }).then((data) => {
        const pagination = { ...this.pagination };
        pagination.total = parseInt(data.total);
        const category = this.selectionForm.category.options;
        // this.data = data.data;
        this.data = data.data.map((item) => {
          let categoryName = '';
          category.forEach((c) => {
            if (c.id === item.category) {
              categoryName = c.name;
            }
          });
          item.categoryName = categoryName;
          return item;
        });
        this.pagination = pagination;
      }).finally(() => {
        this.loading = false;
      });
    },
    addGoods() {
      this.$router.push({
        path: '/goods/add',
      });
    },
    editGoods(row) {
      console.log(row);
      this.$router.push({
        path: `/goods/edit/${row.id}`,
      });
    },
    deleteGoods(id) {
      api.removeProduct({
        id,
      }).then(() => {
        // if (res.data.status === 'success') {
        this.fetch();
        // }
      });
    },
  },
};
</script>

<style lang="scss" >
@import "@/styles/goods/list.scss";
</style>
