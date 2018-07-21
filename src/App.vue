<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    created(){
      if (localStorage.myData !== undefined) {
        let head = JSON.parse(localStorage.myData);
        globalConfig.header.Authorization = head.token_type + ' ' + head.access_token;
      }
    }
  }
</script>
<style lang="scss">
  html,body{
    height: 100%;
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
      background: #6a8dfb;
    }
  }
  #app {
    padding: 10px;
    box-sizing: border-box;
    height: 100%;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  .scroll_bar{
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
  }
</style>
