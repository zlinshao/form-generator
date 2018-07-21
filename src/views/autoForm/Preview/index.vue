<template>
  <div id="preview">
    <div id="PC" class="scroll_bar">
      <PC></PC>
    </div>
    <!--<div style="position: relative;display: inline-block;">-->
      <!--<div id="mobile" v-if="type === 'mobile'">-->
        <!--<div id="form-preview-mobile" class="form-view-mobile" style="display: block;">-->
          <!--<div class="mobile-hd"></div>-->
          <!--<div class="mobile-content">-->
            <!--<div class="status-bar"></div>-->
            <!--<div id="formpreview_mobile">-->
              <!--<Mobile></Mobile>-->
            <!--</div>-->
          <!--</div>-->
          <!--<div class="mobile-foot"></div>-->
        <!--</div>-->
      <!--</div>-->
      <!--<div id="PC" class="scroll_bar" v-if="type === 'pc'">-->
        <!--<PC></PC>-->
      <!--</div>-->
      <!--<div class="form-viewport-opt j_form-viewport-opt j_form-viewport-pc" style="opacity: 1; right: -40px;">-->
        <!--<a class="j_view_exit" @click="selectType('reback')">-->
          <!--<i class="el-icon-back"></i>-->
        <!--</a>-->
        <!--<a class="j_view_type" @click="selectType('pc')" :class="{active:type ==='pc'}">-->
          <!--<i class="el-icon-menu"></i>-->
        <!--</a>-->
        <!--<a class="j_view_type" @click="selectType('mobile')" :class="{active:type ==='mobile'}">-->
          <!--<i class="el-icon-mobile-phone"></i>-->
        <!--</a>-->
      <!--</div>-->
    <!--</div>-->
    <!--<el-button @click="viewInMobile">手机上查看</el-button>-->
  </div>
</template>

<script>
  import PC from './PC/preview'
  import Mobile from './mobile/index'

  export default {
    name: "index",
    components: {PC,Mobile},
    data(){
      return{
        type : 'pc',
      }
    },
    mounted(){
      this.setHeight();
      $(window).resize(() => {
        this.setHeight();
      });
    },
    methods:{
      setHeight() {
        let height_ = $(window).height() - 180;
        $('#preview').height(height_);
      },
      selectType(val){
        this.type = val;
        if(val === 'reback'){
          this.$router.push('./formGenerator')
        }
      },
      viewInMobile(){
        this.$router.push('./viewInMobile')
      },
    }
  }
</script>

<style scoped lang="scss">
  #preview {
    background: url("../../../assets/images/preview-bg.png");
    background-size: 100% 100%;
    padding: 80px 0;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    #PC {
      width: 850px;
      height: 750px;
      margin:0 auto;
      border: 1px dashed #41a4dd;
      padding: 10px;
      background: #FFFFFF;
    }
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
    box-shadow: 1px 2px 20px rgba(0, 0, 0, 0.2);
    -webkit-box-shadow: 1px 2px 20px rgba(0, 0, 0, 0.2);
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
      #formpreview_mobile{
        height: 500px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
        }

        &::-webkit-scrollbar-button {
          height: 0;
          background-color: #eee;
        }

        &::-webkit-scrollbar-track {
          background: #eee;
        }

        &::-webkit-scrollbar-thumb {
          background: #c8d2ee;
        }
        iframe {
          border: none;
          outline: none;
          height: 499px;
          width: 100%;
          overflow: auto;
          background: none;
        }
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
  .form-viewport-opt {
    position: absolute;
    top: 106px;
    right: -41px;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 1px 0px 5px rgba(0, 0, 0, 0.3);
    transition: right ease-in-out 0.5s;
    -webkit-transition: right ease-in-out 0.5s;
    -moz-transition: right ease-in-out 0.5s;
    -o-transition: right ease-in-out 0.5s;
    z-index: 1001;
    a{
      display: block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #999;
      font-size: 25px;
      cursor: pointer;
    }
  }
  .active {
    background-color: #409EFF;
    color: #fff;
    i{
      color: #FFFFFF;
    }
  }
</style>