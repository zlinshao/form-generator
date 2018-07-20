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
//      this.getBackground();
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
            this.$router.push({path: '/main'});
          });
        });
      },
      sweepCode() {
        window.location.href = 'https://oapi.dingtalk.com/connect/qrconnect?appid=' + globalConfig.appId + '&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=' + globalConfig.server_token + 'sns_login'
      },
      //背景特效
      getBackground() {
        let canvas = document.getElementById('canvas'),
          ctx = canvas.getContext('2d'),
          w = canvas.width = window.innerWidth - 10,
          h = canvas.height = window.innerHeight - 10,
          hue = 217,
          stars = [],
          count = 0,
          maxStars = 1300;//星星数量

        //实时监测浏览器窗口的大小
        window.onresize = function () {
          w = canvas.width = window.innerWidth - 10;
          h = canvas.height = window.innerHeight - 10;
        };

        let canvas2 = document.createElement('canvas'),
          ctx2 = canvas2.getContext('2d');
        canvas2.width = 100;
        canvas2.height = 100;
        let half = canvas2.width / 2,
          gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
        gradient2.addColorStop(0.025, '#CCC');
        gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
        gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
        gradient2.addColorStop(1, 'transparent');

        ctx2.fillStyle = gradient2;
        ctx2.beginPath();
        ctx2.arc(half, half, half, 0, Math.PI * 2);
        ctx2.fill();

        // End cache

        function random(min, max) {
          if (arguments.length < 2) {
            max = min;
            min = 0;
          }

          if (min > max) {
            let hold = max;
            max = min;
            min = hold;
          }

          return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function maxOrbit(x, y) {
          let max = Math.max(x, y),
            diameter = Math.round(Math.sqrt(max * max + max * max));
          return diameter / 2;
          //星星移动范围，值越大范围越小，
        }

        let Star = function () {

          this.orbitRadius = random(maxOrbit(w, h));
          this.radius = random(60, this.orbitRadius) / 8;
          //星星大小
          this.orbitX = w / 2;
          this.orbitY = h / 2;
          this.timePassed = random(0, maxStars);
          this.speed = random(this.orbitRadius) / 50000;
          //星星移动速度
          this.alpha = random(2, 10) / 10;

          count++;
          stars[count] = this;
        };

        Star.prototype.draw = function () {
          let x = Math.sin(this.timePassed) * this.orbitRadius + this.orbitX,
            y = Math.cos(this.timePassed) * this.orbitRadius + this.orbitY,
            twinkle = random(10);

          if (twinkle === 1 && this.alpha > 0) {
            this.alpha -= 0.05;
          } else if (twinkle === 2 && this.alpha < 1) {
            this.alpha += 0.05;
          }

          ctx.globalAlpha = this.alpha;
          ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
          this.timePassed += this.speed;
        };

        for (let i = 0; i < maxStars; i++) {
          new Star();
        }

        function animation() {
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 0.5; //尾巴
          ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 2)';
          ctx.fillRect(0, 0, w, h);

          ctx.globalCompositeOperation = 'lighter';
          for (let i = 1, l = stars.length; i < l; i++) {
            stars[i].draw();
          }
          window.requestAnimationFrame(animation);
        }

        animation();
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
      switchModel(flag) {
        this.loginModel = flag;
        if (flag === 1) {
          this.dingColor = true;
          this.weiColor = false;
          this.sjColor = false;
        } else if (flag === 2) {
          this.dingColor = false;
          this.weiColor = false;
          this.sjColor = true;
        } else if (flag === 3) {
          this.dingColor = false;
          this.weiColor = true;
          this.sjColor = false;
        }
      },
      goBack() {
        this.isMessage = false;
        this.dingColor = false;
        this.weiColor = false;
      }
    }
  }

</script>

<style lang="scss" scoped>

</style>