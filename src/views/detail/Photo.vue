<template>
    <div class="myphoto">
      <slot></slot>
    </div>
</template>

<script>
export default {
  props: ['list'],
  methods: {
    handleClick (index) {
      this.$emit('event', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  .myphoto{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    z-index: 10;
  }
</style>
