<template>
  <div id="organzie">
    <div class="searchClass">
      <div class="searchCustom">
        <div>
          <i class="van-icon van-icon-search"></i>
          <input type="text" v-model="searchValue" @keyup.enter="search">
          <i v-if="searchValue.length !== 0" class="iconfont icon-cuowu-guanbi" @click="searchValue = ''"></i>
        </div>
        <p v-if="searchValue.length < 2" @click="onClose">取消</p>
        <p v-if="searchValue.length > 1" @click="search" style="color: #666666;">搜索</p>
      </div>
      <div class="notData" v-if="lists.length === 0 && this.searchValue.length < 2">请输入搜索内容(至少2位)</div>
      <div class="notData" v-if="lists.length === 0 && this.searchValue.length > 1 && showDetail">暂无相关信息</div>
      <div class="notData" v-if="lists.length === 0 && this.searchValue.length > 1 && !showDetail">
        <van-loading type="spinner" color="black"/>
      </div>
      <div class="searchContent">
        <div class="searchList" v-for="key in lists" @click="organizeSure(key)">
          <div>{{key.name}}</div>
          <div>{{key.org[0].name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "organize",
    data() {
      return {
        address: globalConfig.server_user,
        searchValue: '',
        lists: [],
        path: '',
        showDetail: true,
      }
    },
    beforeRouteEnter(to, from, next) {
      next(vm => {
        vm.path = from.path;
        vm.routerIndex(from.path);
        vm.ddRent(from.path, 'staff');
      })
    },
    activated() {
      this.close_();
    },
    watch: {
      searchValue(val) {
        let value = val.replace(/\s+/g, '');
        this.searchValue = value;
        if (value !== '') {
          if (value.length > 1) {
            this.organize(value);
          }
        } else {
          this.close_();
        }
      }
    },
    methods: {
      search() {
        this.organize(this.searchValue);
      },
      organize(val) {
        this.showDetail = false;
        this.$http.get(this.address + 'users', {
          params: {
            q: val,
            page: 1,
            per_page_number: 15,
            org_id: 1,
            is_recursion: 1,
          }
        }).then((res) => {
          if(res.data.status === 'success'){
            this.lists = res.data.data;
          }else {
            this.lists = [];
          }
        })
      },
      close_() {
        this.searchValue = '';
        this.lists = [];
      },
      // 开单人
      organizeSure(name) {
        this.$emit('selectStaff',name);
        this.searchValue = '';
        this.lists = [];
        name.activeRevise = false;
      },
      // select关闭
      onClose() {
        this.searchValue = '';
        this.lists = [];
        this.$emit('selectStaff','cancel')
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin flex {
    display: flex;
    display: -webkit-flex;
  }

  $color: #409EFF;

  .searchClass {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #ffffff;
    z-index: 999;
    .searchCustom {
      @include flex;
      align-items: center;
      padding: .1rem 0 .1rem .3rem;
      background-color: rgb(242, 242, 242);
      div {
        @include flex;
        align-items: center;
        height: 34px;
        width: 100%;
        border: 1px solid #dddddd;
        -webkit-border-radius: 4px;
        -moz-border-radius: 4px;
        border-radius: 4px;
        background-color: #FFFFFF;
        input {
          width: 98%;
          border: 0;
          height: 22px;
        }
        i {
          color: #666666;
          font-size: 1rem;
          padding: .1rem .24rem;
          margin-top: -.03rem;
        }
      }
      p {
        min-width: 50px;
        text-align: center;
        color: #06bf04;
      }
    }
    .searchContent {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
      height: 80%;
      .searchList {
        @include flex;
        justify-content: space-between;
        padding: .6rem;
        border-bottom: 1px solid #eeeeee;
        &:hover {
          background: #DDDDDD;
        }
        div:first-child {
          width: 48%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
        div:last-of-type {
          text-align: right;
          p {
            margin-bottom: .1rem;
          }
          span {
            color: #aaaaaa;
          }
        }
      }
      .searchList.city {
        align-items: center;
        div:first-child {
          line-height: .5rem;
        }
        p {
          margin-bottom: 0;
        }
      }
    }
    .van-search__input-wrap {
      padding-top: 5px;
      .van-search__input {
        height: 22px;
      }
    }
  }

  .notData {
    text-align: center;
    padding: 24px 0;
    font-size: .33rem;
    color: #b3afaf;
    @include flex;
    justify-content: center;
  }
</style>
