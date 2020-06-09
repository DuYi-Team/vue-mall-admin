<template>
  <div class="goods-tags">
    <a-button @click="addTag()" class="add-btn">新增</a-button>
    <a-table
      :columns="columns"
      :row-key="record => record.id"
      :data-source="data"
      :pagination="pagination"
      :loading="loading"
      @change="handleTableChange"
    >
      <template slot="operation" slot-scope="record">
        <div>
          <a-button @click="editTag(record)">编辑</a-button>
          <a-button @click="deleteTag(record)">删除</a-button>
        </div>
      </template>
    </a-table>
    <a-modal
      v-model="tagsModel"
      :title="tagsMoadelTitle"
      centered
      @ok="submit"
    >
      <a-form
        :form="tagForm"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 12 }"
        @submit="submit"
      >
        <a-form-item label="标签ID">
          <a-input
            :disabled="tagsMoadelTitle === '编辑标签'"
            v-decorator="['id',
                          { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
        <a-form-item label="标签名称">
          <a-input
            v-decorator="['name',
                          { rules: [{ required: true, message: 'Please input your note!' }] }]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import api from '@/api/tags';

export default {
  data() {
    return {
      data: [],
      tagsModel: false,
      isEdit: false,
      tagsMoadelTitle: '新增标签',
      tagForm: this.$form.createForm(this, { name: 'tagForm' }),
      pagination: {
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
      },
      loading: false,
      columns: [
        {
          title: 'id',
          dataIndex: 'id',
          sorter: true,
          width: '20%',
        },
        {
          title: '名称',
          dataIndex: 'name',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'operation' },
        },
      ],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    handleTableChange(pagination, filters, sorter) {
      const pager = { ...this.pagination };
      pager.current = pagination.current;
      pager.pageSize = pagination.pageSize;
      this.pagination = pager;
      this.fetch({
        results: pagination.pageSize,
        page: pagination.current,
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
      });
    },
    fetch() {
      this.loading = true;
      api
        .getTagsList({
          page: this.pagination.current || 1,
          size: this.pagination.pageSize || 10,
        })
        .then((data) => {
          // console.log('tags: ', res);
          // const { data } = res;
          // if (data.status !== 'success') {
          //   return this.$message.error(data.msg);
          // }
          const pagination = { ...this.pagination };
          pagination.total = data.total;
          this.data = data.data;
          this.pagination = pagination;
          return false;
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submit() {
      this.tagForm.validateFields((err, values) => {
        if (err) {
          return false;
        }
        if (this.isEdit) {
          return this.editSubmit(values);
        }
        return this.addSubmit(values);
      });
    },
    addSubmit(values) {
      console.log('====');
      api.addTag(values).then(() => {
        this.$message.success('新增成功');
        this.fetch();
        this.tagsModel = false;
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    editSubmit(values) {
      api.editTag(values).then(() => {
        // if (res.data.status === 'success') {
        this.$message.success('修改成功');
        this.fetch();
        this.tagsModel = false;
      }).catch((err) => {
        this.$message.error(err);
      });
    },
    editTag(row) {
      for (const [key, value] of Object.entries(row)) {
        const obj = {};
        obj[key] = value;
        this.tagForm.getFieldDecorator(key);
        this.tagForm.setFieldsValue(obj);
      }
      this.tagsModel = true;
      this.isEdit = true;
      this.tagsMoadelTitle = '编辑标签';
    },
    addTag() {
      this.tagForm = this.$form.createForm(this, { name: 'tagForm' });
      this.tagsModel = true;
      this.isEdit = false;
      this.tagsMoadelTitle = '新增标签';
    },
    deleteTag(record) {
      api
        .deleteTag({
          id: record.id,
        })
        .then(() => {
          this.$message.success('删除成功');
          this.fetch();
        }).catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>

<style scope>
.add-btn {
  float: right;
  margin: 10px;
  position: relative;
  z-index: 1;
}
</style>
