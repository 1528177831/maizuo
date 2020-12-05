<template>
  <ul>
    <router-link to="/film/nowplaying" tag="li" active-class="active">正在热映</router-link>
    <router-link to="/film/comingsoon" tag="li" active-class="active">即将上映</router-link>
  </ul>

</template>

<script>

</script>

<style lang="scss" scoped>
  ul {
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: flex;
    li{
      flex: 1;
    }
  }
  .active {
    color: blue;
    border-bottom: 3px solid blue;
  }
</style>
