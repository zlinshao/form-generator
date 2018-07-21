<template>
  <van-field
      v-if="item.type==='input' || item.type==='number'"
      :label="item.label"
      :required="item.required"
      :placeholder="item.placeholder"
      v-model="item.value"
      :value="item.value"
      :disabled="item.disabled"
      :type="item.subtype">
  </van-field>
  <van-switch-cell
      v-else-if="item.type==='switch'"
      :title="item.label"
      size="22px"
      v-model="item.value"
      :value="item.value"
      :disabled="item.disabled">
  </van-switch-cell>
  <van-field
      v-else-if="item.type==='select'"
      :label="item.label"
      :required="item.required"
      :placeholder="item.placeholder"
      v-model="item.value"
      :value="item.value"
      @click="openSelect"
      readonly>
  </van-field>
</template>

<script>
  export default {
    name: "mobileFormList",
    props: {
      item: {
        type: Object,
        required: true,
      },
    },
    data(){
      return{
        selectHide : true,
      }
    },
    methods:{
      openSelect(){
        this.selectHide = true;
      },
      onCancel(){
        this.selectHide = false;
      },
      onConfirm(val){
        this.item.value = val;
      },
    }
  }
</script>

<style scoped>

</style>