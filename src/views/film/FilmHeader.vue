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
    position: sticky;
    top: 0rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    display: flex;
    background: #fff;
    li{
      flex: 1;
    }
  }
  .active {
    color: blue;
    border-bottom: 0.03rem solid blue;
  }
</style>
