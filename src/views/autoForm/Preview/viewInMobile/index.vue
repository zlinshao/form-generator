<template>
  <div>
    <H4 class="formTitle">{{formConfig.formName}}</H4>
    <van-cell-group>
      <div v-for="(item,i) in formConfig.formItemList">
        <div v-if="item.type === 'column'">
          <div  v-if="item.formItemList.length>0"  v-for="(column,index) in item.length">
            <MobileForm :item="item.formItemList[index]"></MobileForm>
          </div>
        </div>
        <!--表单组-->
        <div v-else-if="item.type === 'formGroup'">
          <div class="changes" v-for="(rowItem,rowIndex) in item.length">
            <div class="paddingTitle">
              <span>{{item.label}}({{rowIndex}})</span>
              <span class="colors" v-if="item.length>1" @click="deleteFormGroupItem(item,rowIndex)">删除</span>
            </div>
            <div v-for="(colItem,colIndex) in item.formItemList">
              <MobileFormGroup :item="item" :colIndex="colIndex" :rowIndex="rowIndex"></MobileFormGroup>
            </div>
          </div>
          <div @click="addFormGropItem(item)" class="addInput">
            + {{item.operateName}}
          </div>
        </div>

        <div v-else>
          <MobileForm :item="item"></MobileForm>
        </div>
      </div>
    </van-cell-group>
  </div>
</template>

<script>
  import MobileForm from './mobileFormList'
  import MobileFormGroup from './mobileFormGroup'
  export default {
    name: "index",
    components:{MobileForm , MobileFormGroup},
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
        item.value.push([]);
      },
      deleteFormGroupItem(item, rowIndex) {
        item.length--;
        item.value.splice(rowIndex, 1);
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
  .addInput {
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #409EFF;
    background: #ffffff;
    margin-bottom: 10px;
  }
  .paddingTitle {
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    color: #aaaaaa;
    .colors {
      color: #409EFF;
    }
  }
</style>