<template>
  <div>
    <van-field
        v-if="item.formItemList[colIndex].type==='input' || item.formItemList[colIndex].type==='number'"
        :label="item.formItemList[colIndex].label"
        :required="item.formItemList[colIndex].required"
        :placeholder="item.formItemList[colIndex].placeholder"
        v-model="item.value[rowIndex][colIndex]"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled"
        :type="item.formItemList[colIndex].subtype">
    </van-field>
    <van-switch-cell
        v-else-if="item.formItemList[colIndex].type==='switch'"
        :title="item.formItemList[colIndex].label"
        size="22px"
        v-model="item.value[rowIndex][colIndex]"
        :value="item.value[rowIndex][colIndex]"
        :disabled="item.formItemList[colIndex].disabled">
    </van-switch-cell>

    <van-field
        v-else-if="item.formItemList[colIndex].type==='select'"
        :label="item.formItemList[colIndex].label"
        :required="item.formItemList[colIndex].required"
        v-model="item.text"
        placeholder="请选择"
        @click="openSelect"
        readonly>
    </van-field>

    <div v-else-if="item.formItemList[colIndex].type==='checkbox'">
      <div class="paddingTitle">{{item.formItemList[colIndex].label}}</div>
      <div class="checkCss">
        <van-checkbox-group v-model="item.value[rowIndex][colIndex]">
          <van-checkbox
              v-for="o in item.formItemList[colIndex].options"
              :key="o.value"
              :name="o.value">
            {{item.formItemList[colIndex].label}}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>

    <div v-else-if="item.formItemList[colIndex].type === 'radio'">
      <div class="paddingTitle">{{item.formItemList[colIndex].label}}</div>
      <div class="checkCss">
        <van-radio-group v-model="item.value[rowIndex][colIndex]">
          <van-radio
              v-for="o in item.formItemList[colIndex].options"
              :key="o.value"
              :name="o.value">
            {{item.formItemList[colIndex].label}}
          </van-radio>
        </van-radio-group>
      </div>
    </div>

    <van-field
        v-else-if="item.formItemList[colIndex].type==='date'"
        :label="item.formItemList[colIndex].label"
        :required="item.formItemList[colIndex].required"
        v-model="item.value[rowIndex][colIndex]"
        placeholder="请选择"
        @click="openDate"
        readonly>
    </van-field>

    <div class="aloneModel" v-else-if="item.formItemList[colIndex].type === 'upload'">
      <div class="title">领导同意截图</div>
      <UpLoad :ID="item.formItemList[colIndex].domId" @getImg="getImg"></UpLoad>
    </div>

    <van-field
        v-else-if="item.formItemList[colIndex].type==='staff'"
        v-model="item.valueName"
        @click="openModal()"
        :label="item.formItemList[colIndex].label"
        readonly
        type="text"
        placeholder="请点击选择">
    </van-field>

    <van-field
        v-else-if="item.formItemList[colIndex].type==='staff'"
        v-model="valueName"
        @click="staffShow = true"
        :label="item.formItemList[colIndex].label"
        readonly
        type="text"
        placeholder="请点击选择">
    </van-field>

    <van-field
        v-else-if="item.formItemList[colIndex].type==='depart'"
        v-model="valueName"
        @click="departShow = true"
        :label="item.formItemList[colIndex].label"
        readonly
        type="text"
        placeholder="请点击选择">
    </van-field>

    <div v-else-if="item.formItemList[colIndex].type==='rate'" style="padding: 10px 15px;font-size: 14px;color: #333">
      <div style="display: inline-block;width:90px">
        {{item.formItemList[colIndex].label}}
      </div>
      <div style="display: inline-block">
        <van-rate v-model="item.value[rowIndex][colIndex]" />
      </div>
    </div>
    <van-popup :overlay-style="{'background':'rgba(0,0,0,.2)'}" v-model="selectShow_user" position="bottom" :overlay="true">
      <van-picker
          show-toolbar
          :columns="columns"
          value-key="label"
          @cancel="onCancel"
          @confirm="onConfirm"/>
    </van-popup>

    <van-popup :overlay-style="{'background':'rgba(0,0,0,.2)'}" v-model="selectShow_online" position="bottom" :overlay="true">
      <van-picker
          show-toolbar
          :columns="columns"
          value-key="dictionary_name"
          @cancel="onCancel"
          @confirm="onConfirm"/>
    </van-popup>

    <!--日期-->
    <van-popup :overlay-style="{'background':'rgba(0,0,0,.2)'}" v-model="timeShow" position="bottom" :overlay="true">
      <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :max-date="maxDate"
          @change="monthDate"
          @cancel="onCancel"
          @confirm="onDate"/>
    </van-popup>

    <van-popup :overlay-style="{'background':'rgba(255,255,255,1)'}" v-model="departShow" position="right" :close-on-click-overlay="false">
      <MobileDepart @selectDepart="selectDepart"></MobileDepart>
    </van-popup>

    <van-popup :overlay-style="{'background':'rgba(255,255,255,1)'}" v-model="staffShow" position="right" :close-on-click-overlay="false">
      <MobileStaff @selectStaff="selectStaff"></MobileStaff>
    </van-popup>
  </div>
</template>

<script>
  import UpLoad from '../../../../components/UPLOAD-MOBILE'
  import MobileDepart from '../../../../components/mobile-depart'
  import MobileStaff from '../../../../components/mobile-staff'

  export default {
    name: "mobileFormList",
    components: {UpLoad , MobileDepart , MobileStaff},
    props: {
      item: {
        type: Object,
        required: true,
      },
      rowIndex: {
        type: Number,
        required: true,
      },
      colIndex: {
        type: Number,
        required: true,
      }
    },
    data(){
      return{
        selectShow_user : false,
        selectShow_online : false,
        departShow : false,
        staffShow : false,
        timeShow : false,
        columns : [],
        currentDate : '',
        minDate: new Date(2000, 0, 1),
        maxDate: new Date(2200, 12, 31),
        dateFormat : '',
      }
    },
    methods:{
      openSelect(){
        if(this.item.formItemList[this.colIndex].optionsUrl){
          this.selectShow_online = true;
        }else {
          this.selectShow_user = true;
        }
        this.columns = this.item.formItemList[this.colIndex].options;
      },
      onCancel(){
        this.selectShow_user = false;
        this.selectShow_online = false;
        this.timeShow = false;
      },
      onConfirm(val){
        this.item.value[this.rowIndex][this.colIndex] = this.item.optionsUrl? val.id : val.value;
        this.item.text = this.item.optionsUrl? val.dictionary_name : val.label;
        this.selectShow_user = false;
        this.selectShow_online = false;
      },
      openDate(){
        this.timeShow = true;
      },
      monthDate(peaker){
        this.dateFormat = peaker.getValues().join('-');
      },
      onDate(peaker){
        this.item.value[this.rowIndex][this.colIndex] = this.dateFormat;
        this.timeShow = false;
      },
      //get image array
      getImg(val){
        this.item.value[this.rowIndex][this.colIndex] = val[1];
      },
      selectDepart(val){
        this.departShow = false;
        if(val && val !== 'cancel'){
          this.item.value[this.rowIndex][this.colIndex] = val;
          this.valueName = val.name;
        }
      },
      selectStaff(val){
        this.staffShow = false;
        if(val && val !== 'cancel'){
          this.item.value[this.rowIndex][this.colIndex] = val;
          this.valueName = val.name;
        }
      },
      openModal(){

      }
    }
  }
</script>

<style scoped lang="scss">
  .checkCss {
    background-color: #FFFFFF;
    padding: .15rem .3rem;
  }
  .paddingTitle {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    padding: .26rem .3rem;
    color: #aaaaaa;
    background: #eeeeee;
  }
  .van-checkbox ,.van-radio {
    margin-bottom: 10px;
  }
  .aloneModel {
    background: #fff;
    width: 100%;
    margin: 5px 0;
    padding-bottom: 10px;
    .title {
      padding: 10px 15px;
    }
  }

  .aloneModel.required {
    .title {
      padding-left: .2rem;
      span {
        color: #f44;
      }
    }
  }

</style>