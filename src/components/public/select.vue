<template>
  <div class="select">
    <a-form-model layout="inline" :model="formData">
      <a-form-model-item
        v-for="field in formData"
        v-bind:key="field.name"
        :label="field.label"
        :labelCol="{span: 10}"
        :wrapperCol="{span: 12}"
        :prop="field.name"
      >
        <a-input
          v-if="field.type == 'input'"
          v-model="field.value"
          placeholder="input placeholder"
        />
        <a-select v-else-if="field.type == 'select'"
                  v-model="field.value"
                  placeholder="please select your zone"
                  :allowClear="true">
          <a-select-option
            v-for="option in field.options"
            v-bind:key="option.id"
            :value="option.id"
          >{{option.label}}</a-select-option>
        </a-select>
        <!-- <a-select v-else style="min-width: 200px" v-model="field.value" placeholder="please select your zone">
          <a-select-option value="shanghai">Zone one</a-select-option>
          <a-select-option value="beijing">Zone two</a-select-option>
        </a-select> -->
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="submit">搜索</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  // {}
  props: ['form'],
  computed: {
    formData () {
      console.log(this.form)
      return Object.assign({}, this.form)
    }
  },
  methods: {
    submit () {
      const resultData = {}
      for (const prop in this.formData) {
        resultData[prop] = this.formData[prop].value
      }
      this.$emit('search', resultData)
    }
  }
}
</script>
