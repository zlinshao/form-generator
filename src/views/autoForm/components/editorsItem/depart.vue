<template>
  <div>
    <el-form  label-width="80px" size="mini">
      <el-form-item label="标签名">
        <el-input v-model="formItem.label"></el-input>
      </el-form-item>
      <el-form-item label="键名">
        <el-input v-model="formItem.key" clearable></el-input>
      </el-form-item>
      <el-form-item label="数量">
        <el-input v-model="formItem.length"></el-input>
      </el-form-item>
      <el-form-item label="禁用">
        <el-switch v-model="formItem.disabled"></el-switch>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="formItem.required"></el-switch>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formItem: {
      type: Object,
      required: true,
    }
  },
}
</script>
