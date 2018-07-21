<template>
  <div id="login">

    <div class="loadingMain" v-if="!underWay">
      <div class="loadingTran"></div>
      <div class="loadingBoss"></div>
      <div class="loadingTitle">Loading.....</div>
    </div>

    <div class="container" v-if="underWay">

      <div class="login_main" v-if="!isMessage">
        <div class="beijing"></div>
        <div class="logo">
          <img src="../assets/images/maotou.png" alt="">
        </div>
        <div class="slogan">
          <img src="../assets/images/slogan.png" style="width: 100%" alt="">
        </div>
        <div class="login_type">
          <div @click="sweepCode">
            <div>
              <img src="../assets/images/dd1.png" alt="">
            </div>
            <div style="color:#6a8dfb;">钉钉 - 扫码</div>
            <div>一键登录</div>
          </div>
          <div @click="messageLogin">
            <div><img src="../assets/images/sj.png" alt=""></div>
            <div style="color:#fb4699;">手机号</div>
            <div>快速登录</div>
          </div>
          <div>
            <div><img src="../assets/images/weixin2.png" alt=""></div>
            <div style="color: #58d788">微信 - 扫码</div>
            <div>一键登录</div>
          </div>
        </div>
      </div>

      <div v-if="isMessage" class="messageLogin">
        <div class="top">
          <div class="beijing"></div>
          <div class="logo">
            <img src="../assets/images/maotou.png" alt="">
          </div>
          <div class="slogan">
            <img src="../assets/images/slogan.png" style="width: 100%" alt="">
          </div>
        </div>
        <div class="formItem" v-if="loginModel==2">
          <el-input placeholder="请输入手机号" v-model="phone">
            <template slot="append">
              <span class="china">中国</span> +86
            </template>
          </el-input>
          <el-input placeholder="请输入4位短信验证码" @keyup.enter.native="sureLogin(phone, identifyingCode)"
                    v-model="identifyingCode">

            <el-button slot="append" style="width: 102px;" size="small" v-if="!loading" type="success"
                       @click.native="phoneLogin()">
              获取验证码
            </el-button>

            <el-button slot="append" style="width: 102px;" size="small" v-if="loading" :disabled="loading"
                       type="success">发送中({{loadingNum}})
            </el-button>
          </el-input>

          <div style="display: flex;justify-content: flex-end;margin-top: 20px">
            <el-button type="text" @click="isMessage=false">更换登录方式</el-button>
          </div>

          <div class="confirmLogin">
            <el-button size="medium" type="primary" @click.native.prevent="sureLogin(phone, identifyingCode)">登 录
            </el-button>
          </div>
        </div>
        <div v-if="loginModel == 1">
          <div class="dingLogin">
            <div><img src="../assets/images/dd1.png" alt=""></div>
            <div style="color:#6a8dfb;">钉钉 - 扫码</div>
            <div>一键登录</div>
          </div>
        </div>

        <div v-if="loginModel == 3">
          <div class="dingLogin">
            <div><img src="../assets/images/weixin2.png" alt=""></div>
            <div style="color: #58d788">微信 - 扫码</div>
            <div>一键登录</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  //import NProgress from 'nprogress'
  export default {
    data() {
      return {
        urls: globalConfig.server_user,
        phone: '',
        identifyingCode: '',
        loading: false,
        underWay: true,      //登录中
        loadingNum: 60,
        // ruleForm2: {
        //   account: 'admin',
        //   checkPass: '123456'
        // },
        checked: true,
        isMessage: false,
        dingColor: false,
        weiColor: false,
        sjColor: true,
        loginModel: 2
      };
    },
    mounted() {
      if (JSON.stringify(this.$route.query) !== '{}') {
        let phone = this.$route.query.phone;
        let code = this.$route.query.code;
        this.sureLogin(phone, code);
        this.underWay = false;
      }
    },
    methods: {
      phoneLogin() {
        this.$http.post(globalConfig.server_token + 'api/v1/sms', {
          phone: this.phone,
        }).then((res) => {
          let msg = res.data.message;
          if (res.data.status === 'success') {
            this.countDown();
            this.loading = true;
            this.$message({
              message: msg,
              type: 'success'
            });
          } else {
            if (typeof msg !== 'string') {
              this.$message({
                message: res.data.message.phone[0],
                type: 'info'
              });
            } else {
              this.$message({
                message: res.data.message,
                type: 'info'
              });
            }
          }
        })
      },

      countDown() {
        new Promise((resolve, reject) => {
          let interval = setInterval(() => {
            if (this.loadingNum > 0) {
              this.loadingNum--;
            }
            if (this.loadingNum === 0) {
              this.loadingNum = 60;
              clearInterval(interval);
              this.loading = false;
            }
          }, 1000)
        })
      },

      sureLogin(a, b) {
        this.$http.post(globalConfig.server_token + 'oauth/token', {
          client_secret: globalConfig.client_secret,
          client_id: globalConfig.client_id,
          grant_type: 'password',
          username: a,
          password: b,
        }).then((res) => {
          localStorage.setItem('myData', JSON.stringify(res.data.data));
          let head = res.data.data;
          globalConfig.header.Authorization = head.token_type + ' ' + head.access_token;

          this.$http.get(globalConfig.server + "special/special/loginInfo").then((res) => {
            localStorage.setItem('personal', JSON.stringify(res.data.data));
            globalConfig.personal = res.data.data.data;
            let badge = true;
            this.$store.dispatch('badgeFlag', badge);
            this.$router.push({path: '/'});
          });
        });
      },
      sweepCode() {
        window.location.href = 'https://oapi.dingtalk.com/connect/qrconnect?appid=' + globalConfig.appId + '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + globalConfig.server_token + 'sns_login'
      },


      messageLogin() {
        this.isMessage = true;
      },
      lightDingColor() {
        this.dingColor = true;
      },
      grayDingColor() {
        this.dingColor = false;
      },
      lightWeiColor() {
        this.weiColor = true;
      },
      grayWeiColor() {
        this.weiColor = false;
      },
      lightSjColor() {
        this.sjColor = true;
      },
    }
  }

</script>

<style lang="scss" scoped>
  #login {
    height: 100%;
    .loadingMain {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
    .loadingTran, .loadingBoss {
      position: fixed;
      margin-top: -60px;
      width: 200px;
      height: 200px;
    }
    .loadingTitle {
      font-size: 30px;
      color: #DDDDDD;
      margin-top: 160px;
    }
    .loadingTran {
      transition: transform;
      animation: rotate 3s linear infinite;
      background: url("../assets/images/loading.png") no-repeat center center;
    }
    .loadingBoss {
      margin-top: -56px;
      background: url("../assets/images/loadingBoss.png") no-repeat center center;
    }

    @-webkit-keyframes rotate {
      from {
        -webkit-transform: rotate(360deg);
      }
      to {
        -webkit-transform: rotate(0deg);
      }
    }
    @-moz-keyframes rotate {
      from {
        -moz-transform: rotate(359deg);
      }
      to {
        -moz-transform: rotate(0deg);
      }
    }
    @-o-keyframes rotate {
      from {
        -o-transform: rotate(359deg);
      }
      to {
        -o-transform: rotate(0deg);
      }
    }
    @keyframes rotate {
      from {
        transform: rotate(359deg);
      }
      to {
        transform: rotate(0deg);
      }
    }

    .modal_back {
      width: 100%;
      height: 100%;
      background: #000;
      opacity: .5;
      position: fixed;
      z-index: 1000;
    }
    .modal {
      .modalContent {
        width: 400px;
        height: 400px;
        border-radius: 5px;
        background: #FFF;
        position: fixed;
        z-index: 2000;
        opacity: 1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    /*background: linear-gradient(to bottom right,#d6d6f7, #d6ebed 40%, #f4f3f6 65%);*/
    background: url("../assets/images/背景.png") no-repeat;
    background-size: 100% 100%;
    .container {
      width: 602px;
      min-height: 450px;
      border-radius: 6px;
      padding: 0;
      /*background: url("../assets/images/椭圆646.png") no-repeat;*/
      /*background-size: 100% 100%;*/
      background: #FFFFFF;
      position: absolute;
      box-sizing: border-box;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      /*border: 1px solid rgba(106, 141, 251, .12);*/
      box-shadow: 0 4px 6px 0 rgba(106, 141, 251, .2), 0 0 6px 0 rgba(106, 141, 251, .04);

      .login_main {
        .beijing {
          height: 95px;
          background: url("../assets/images/lanyuan.png") no-repeat;
          background-size: 100% 100%;
        }
        .logo {
          text-align: center;
          margin-top: -55px;
        }
        .slogan {
          width: 230px;
          margin: 10px auto 30px;
        }
        .login_type {
          width: 490px;
          height: 150px;
          margin: 55px auto;
          display: flex;
          justify-content: space-between;
          > div {
            width: 150px;
            height: 150px;
            border-radius: 5px;
            cursor: pointer;
            transition: all .5s;
            box-sizing: border-box;
            &:hover {
              margin-top: -10px;
            }
            &:nth-child(1) {
              border: 1px solid #6a8dfb;
              border-top: 4px solid #6a8dfb;
              box-shadow: 0 4px 6px 0 rgba(106, 141, 251, .2), 0 0 6px 0 rgba(106, 141, 251, .04);
            }
            &:nth-child(2) {
              border: 1px solid #fb4699;
              border-top: 4px solid #fb4699;
              box-shadow: 0 4px 6px 0 rgba(251, 56, 173, 0.2), 0 0 6px 0 rgba(106, 141, 251, .04);
            }
            &:nth-child(3) {
              border: 1px solid #58d788;
              border-top: 4px solid #58d788;
              box-shadow: 0 4px 6px 0 rgba(54, 251, 190, 0.2), 0 0 6px 0 rgba(106, 141, 251, .04);
            }
            > div {
              &:nth-child(1) {
                margin-top: 23px;
                text-align: center;
              }
              &:nth-child(2) {
                margin-top: 10px;
                font-size: 14px;
                text-align: center;
              }
              &:nth-child(3) {
                margin-top: 15px;
                font-size: 14px;
                text-align: center;
              }
            }
          }
        }
      }

      .messageLogin {
        width: 100%;
        height: 100%;

        .dingLogin {
          margin: 25px auto;
          width: 150px;
          height: 150px;
          border-radius: 5px;
          cursor: pointer;
          transition: all .5s;
          box-sizing: border-box;
          border: 1px solid #6a8dfb;
          border-top: 4px solid #6a8dfb;
          box-shadow: 0 4px 6px 0 rgba(106, 141, 251, .2), 0 0 6px 0 rgba(106, 141, 251, .04);
          &:hover {
            background: #f4f4f4;
          }
          > div {
            &:nth-child(1) {
              margin-top: 23px;
              text-align: center;
            }
            &:nth-child(2) {
              margin-top: 10px;
              font-size: 14px;
              text-align: center;
            }
            &:nth-child(3) {
              margin-top: 15px;
              font-size: 14px;
              text-align: center;
            }
          }
        }

        .top {
          width: 100%;
          height: 210px;
          background: #fcfbfc;
          box-sizing: border-box;
          .beijing {
            height: 95px;
            background: url("../assets/images/lanyuan.png") no-repeat;
            background-size: 100% 100%;
          }
          .logo {
            text-align: center;
            margin-top: -55px;
          }
          .slogan {
            width: 230px;
            margin: 10px auto 30px;
          }
          .loginType {
            width: 380px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            > div {
              cursor: pointer;
            }
          }
        }

        .formItem {
          padding: 0 50px;
        }
        .el-input__inner {
          border: none;
          border-bottom: 1px solid #f4f3f6;
          border-radius: 0;
          height: 80px;
        }

        .el-checkbox {
          color: #909399;
          margin: 18px 0;
        }
        .confirmLogin {
          margin: 20px 0 60px 0;
          .el-button--primary {
            background: #6a8dfb;
            border-color: #6a8dfb;
            width: 100%;
            &:hover {
              background: #83b2fb;
              border-color: #83b2fb;
            }
          }
        }

        .el-input-group__append, .el-input-group__prepend {
          background-color: #fff;
          border: none;
          border-bottom: 1px solid #f4f3f6;
          border-radius: 0;
          height: 60px;
          .china {
            padding: 0 30px;
            border-left: 1px solid #babbbc;
          }
          .el-button--success {
            color: #fff;
            background-color: #58d788;
            border-color: #58d788;
            &:hover {
              background-color: #7ad7a7;
              border-color: #7ad7a7;
            }
          }
        }
      }
    }
  }

</style>