<template>
  <div>
    <H4 class="formTitle">{{formConfig.formName}}</H4>
    <van-cell-group>
      <MobileForm v-for="(item,i) in formConfig.formItemList" :item="item"></MobileForm>
    </van-cell-group>
  </div>
</template>

<script>
  import MobileForm from './mobileFormList'
  export default {
    name: "index",
    components:{MobileForm},
    computed: {
      formConfig: {
        get() {
          return this.$store.state.autoForm.form;
        },
        set(newV) {
          this.$store.dispatch('updateForm', newV)
        }
      },
    },
    mounted() {

    },
    methods: {
      addFormGropItem(item) {
        item.length++;
        item.value.push([])
      },
      deleteFormGroupItem(item, rowIndex) {
        item.length--;
        item.value.splice(rowIndex, 1)
      },
    }
  }
</script>

<style scoped lang="scss">
  .van-cell {
    line-height: 15px !important;
  }
  .formTitle{
    text-align: center;
    margin: 5px 0;
  }
</style>