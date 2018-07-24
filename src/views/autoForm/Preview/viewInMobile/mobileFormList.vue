<template>
  <div>
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
        v-model="item.text"
        placeholder="请选择"
        @click="openSelect"
        readonly>
    </van-field>

    <div v-else-if="item.type==='checkbox'">
      <div class="paddingTitle">{{item.label}}</div>
      <div class="checkCss">
        <van-checkbox-group v-model="item.value">
          <van-checkbox
              v-for="o in item.options"
              :key="o.value"
              :name="o.value">
            {{item.label}}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </div>

    <div v-else-if="item.type === 'radio'">
      <div class="paddingTitle">{{item.label}}</div>
      <div class="checkCss">
        <van-radio-group v-model="item.value">
          <van-radio
              v-for="o in item.options"
              :key="o.value"
              :name="o.value">
            {{item.label}}
          </van-radio>
        </van-radio-group>
      </div>
    </div>

    <van-field
        v-else-if="item.type==='date'"
        :label="item.label"
        :required="item.required"
        v-model="item.value"
        placeholder="请选择"
        @click="openDate"
        readonly>
    </van-field>

    {{item}}
    <van-popup :overlay-style="{'background':'rgba(0,0,0,.2)'}" v-model="selectShow" position="bottom" :overlay="true">
      <van-picker
          show-toolbar
          :columns="columns"
          value-key="label"
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
  </div>
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
        selectShow : false,
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
        this.selectShow = true;
        this.columns = this.item.options;
      },
      onCancel(){
        this.selectShow = false;
        this.timeShow = false;
      },
      onConfirm(val){
        this.item.value = val.value;
        this.item.text = val.label;
        this.selectShow = false;
      },
      openDate(){
        this.timeShow = true;
      },
      monthDate(peaker){
        this.dateFormat = peaker.getValues().join('-');
      },

      onDate(peaker){
        this.item.value = this.dateFormat;
        this.timeShow = false;
      },
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
</style>