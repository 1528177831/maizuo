<template>
  <div>
    <film-header></film-header>
    <router-view></router-view>
  </div>

</template>

<script>
import filmHeader from './film/FilmHeader.vue'
export default {
  components: {
    filmHeader
  }
}
</script>

<style lang="scss" scoped>

</style>
