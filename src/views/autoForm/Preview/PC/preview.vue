<template>
  <div id="preview">
    <div>
      <div id="form-preview-mobile" class="form-view-mobile" style="display: block;">
        <div class="mobile-hd"></div>
        <div class="mobile-content">
          <div class="status-bar"></div>
          <div id="formpreview_mobile">

          </div>
        </div>
        <div class="mobile-foot"></div>
      </div>
    </div>
    <div v-if="false" style="width: 920px;margin: 0 auto;background: #faffff;border: 1px dashed #41a4dd;padding: 10px" >
      <H3 class="formTitle">{{formConfig.formName}}</H3>
      <el-form class="dynamic-form fake-form" :inline="formConfig.inline" :size='formConfig.size'
               :label-position="formConfig.labelPosition" :label-width="formConfig.labelWidth">
        <div v-for="(item,i) in formConfig.formItemList">
          <el-row v-if="item.type === 'column'">
            <el-col v-if="item.formItemList.length>0" v-for="(column,index) in item.length" :span="24/item.length" :key="column">
              <FakeFormItem :item="item.formItemList[index]"></FakeFormItem>
            </el-col>
          </el-row>
          <div v-else-if="item.type === 'formGroup'">
            <div class="form_border">
              <el-row v-for="(rowItem,rowIndex) in item.length" :key="rowIndex">
                <div class="title" style="padding: 5px 0">
                  <span>{{item.label}}({{rowIndex}})</span>
                  <span v-if="item.length>1" style="float: right;cursor: pointer" @click="deleteFormGroupItem(item,rowIndex)">删除</span>
                </div>
                <el-col :span="24/Number(item.layout)" v-for="(colItem,colIndex) in item.formItemList" :key="colIndex">
                  <div>
                    <FormGroup :item="item" :colIndex="colIndex" :rowIndex="rowIndex"></FormGroup>
                  </div>
                </el-col>
              </el-row>
              <div style="text-align: center">
                <el-button type="text" @click="addFormGropItem(item)">
                  + {{item.operateName}}
                </el-button>
              </div>
            </div>
          </div>
          <div v-else>
            <FakeFormItem :item="item"></FakeFormItem>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
  import FakeFormItem from './previewFormList'
  import FormGroup from './previewFormGroup'
  export default {
    name: "preview",
    components:{FakeFormItem , FormGroup},
    computed:{
      formConfig: {
        get() {
          return this.$store.state.autoForm.form;
        },
        set(newV) {
          this.$store.dispatch('updateForm', newV)
        }
      },
    },
    mounted(){
      this.setHeight();
      $(window).resize(()=>{
        this.setHeight();
      });
    },
    methods:{
      setHeight(){
        let height_ = $(window).height() - 61;
        $('#preview').height(height_);
      },
      addFormGropItem(item){
        item.length ++;
        item.value.push([])
      },
      deleteFormGroupItem(item,rowIndex){
        item.length --;
        item.value.splice(rowIndex,1)
      },
    }
  }
</script>

<style scoped lang="scss">
  .title {
    color: #409EFF;
    opacity: .7;
  &:before {
     border-radius: 2px;
     margin-right: 5px;
     background: #409EFF;
     border-left: 1px solid #409EFF;
     content: '|';
   }
  }

  .form_border {
    padding: 18px 10px 0 10px;
    margin-bottom: 15px;
    border: 1px solid #dfe6fb;
    border-radius: 5px;
  }

  .form-view-mobile {
    width: 375px;
    height: 680px;
    background-color: #F4F7FA;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    border-bottom-left-radius: 50px;
    border-bottom-right-radius: 50px;
    margin: 0 auto;
    box-shadow: 1px 2px 20px rgba(0,0,0,0.2);
    -webkit-box-shadow: 1px 2px 20px rgba(0,0,0,0.2);
    z-index: 1002;
    position: relative;
    .mobile-hd {
      height: 80px;
      position: relative;
      &:before {
        position: absolute;
        content: "";
        width: 11px;
        height: 11px;
        border-radius: 50%;
        border: 1px solid #DFE0E1;
        left: 50%;
        margin-left: -5px;
        top: 27px;
        transform: scale(1.5);
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
      }
      &:after {
        width: 40px;
        height: 8px;
        border: 1px solid #DFE0E1;
        position: absolute;
        content: "";
        bottom: 22px;
        left: 50%;
        margin-left: -20px;
        border-radius: 22px;
        transform: scale(1.5);
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
      }
    }
    .mobile-content {
      height: 520px;
      margin: 0 20px;
      border: 1px solid #E2E3E4;
      .status-bar {
        background-image: url(../../../assets/images/mobile.png);
        background-size: 320px 14px;
        height: 14px;
        width: 320px;
        margin: 5px 0 0 0;
      }
    }
    .mobile-foot {
      height: 80px;
      position: relative;
      &:after {
        position: absolute;
        content: "";
        width: 30px;
        height: 30px;
        border: 1px solid #DFE0E1;
        border-radius: 50%;
        margin-left: -15px;
        left: 50%;
        top: 24px;
        transform: scale(1.5);
        -ms-transform: scale(1.5);
        -moz-transform: scale(1.5);
        -webkit-transform: scale(1.5);
        -o-transform: scale(1.5);
      }
    }
  }
</style>
